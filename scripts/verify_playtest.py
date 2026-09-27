#!/usr/bin/env python3
"""Read-only structural/v2 verification. Does not import the signer.
Also verifies CRC, DEX checksums, v1 manifest entry hashes and tamper rejection.
Not the official Android apksigner; no device runtime is exercised here.
"""
import base64,hashlib,io,json,struct,sys,zipfile,zlib
from pathlib import Path
from cryptography import x509
from cryptography.hazmat.primitives import hashes,serialization
from cryptography.hazmat.primitives.asymmetric import padding
class Reader:
    def __init__(self,data):self.data=data;self.p=0
    def u32(self):
        if self.p+4>len(self.data):raise ValueError('truncated uint32')
        n=int.from_bytes(self.data[self.p:self.p+4],'little');self.p+=4;return n
    def take(self,n):
        if self.p+n>len(self.data):raise ValueError('truncated field')
        b=self.data[self.p:self.p+n];self.p+=n;return b
    def lp(self):return self.take(self.u32())
    def done(self):assert self.p==len(self.data),'trailing data'

def verify(data):
    data=bytes(data)
    end=data.rfind(b'PK\x05\x06');assert end>=0
    assert end+22+int.from_bytes(data[end+20:end+22],'little')==len(data),'EOCD trailing data'
    central=int.from_bytes(data[end+16:end+20],'little');central_size=int.from_bytes(data[end+12:end+16],'little')
    assert central+central_size==end
    assert data[central-16:central]==b'APK Sig Block 42'
    size=int.from_bytes(data[central-24:central-16],'little');begin=central-size-8
    assert int.from_bytes(data[begin:begin+8],'little')==size
    cursor=begin+8;v2=None
    while cursor<central-24:
        n=int.from_bytes(data[cursor:cursor+8],'little');cursor+=8
        assert n>=4 and cursor+n<=central-24
        ident=int.from_bytes(data[cursor:cursor+4],'little')
        if ident==0x7109871a:v2=data[cursor+4:cursor+n]
        cursor+=n
    assert v2 is not None and cursor==central-24
    outer=Reader(v2);signers=Reader(outer.lp());outer.done()
    single=Reader(signers.lp());signers.done()
    signed_data=single.lp();sigs=Reader(single.lp());public_der=single.lp();single.done()
    sig=Reader(sigs.lp());sigs.done();alg=sig.u32();signature=sig.lp();sig.done();assert alg==0x0103
    public=serialization.load_der_public_key(public_der)
    public.verify(signature,signed_data,padding.PKCS1v15(),hashes.SHA256())
    sd=Reader(signed_data);digests=Reader(sd.lp());certs=Reader(sd.lp());attrs=sd.lp();sd.done()
    d=Reader(digests.lp());digests.done();assert d.u32()==alg;expected=d.lp();d.done()
    cert=x509.load_der_x509_certificate(certs.lp());certs.done();assert not attrs
    assert cert.public_key().public_bytes(serialization.Encoding.DER,serialization.PublicFormat.SubjectPublicKeyInfo)==public_der
    eocd=bytearray(data[end:]);eocd[16:20]=begin.to_bytes(4,'little')
    digest_chunks=[]
    for section in (data[:begin],data[central:end],bytes(eocd)):
        at=0
        while at<len(section):
            chunk=section[at:at+(1<<20)];at+=len(chunk)
            digest_chunks.append(hashlib.sha256(bytes([165])+len(chunk).to_bytes(4,'little')+chunk).digest())
    calculated=hashlib.sha256(bytes([90])+len(digest_chunks).to_bytes(4,'little')+b''.join(digest_chunks)).digest()
    assert calculated==expected,'APK content digest mismatch'
    return {'v2_signature':'valid RSA-SHA256','content_digest':'valid','certificate_sha256':cert.fingerprint(hashes.SHA256()).hex(),'central_directory':central,'signing_block_offset':begin}

def checks(path):
    data=Path(path).read_bytes();report=verify(data);report['file']=Path(path).name;report['bytes']=len(data);report['sha256']=hashlib.sha256(data).hexdigest()
    with zipfile.ZipFile(io.BytesIO(data)) as z:
        assert z.testzip() is None;report['zip_crc']='valid'
        assert '__TEST' not in z.read('assets/game.html').decode()
        assert len(z.namelist())==len(set(z.namelist()))
        manifest=z.read('META-INF/MANIFEST.MF').replace(b'\r\n ',b'')
        for s in manifest.split(b'\r\n\r\n')[1:]:
            if not s:continue
            fields=dict(x.split(b': ',1) for x in s.split(b'\r\n') if x)
            assert base64.b64decode(fields[b'SHA-256-Digest'])==hashlib.sha256(z.read(fields[b'Name'].decode())).digest()
        assert b'X-Android-APK-Signed: 2' in z.read('META-INF/SUPERWIS.SF')
        report['v1_entry_digests']='valid; X-Android-APK-Signed: 2 present'
        dex=z.read('classes.dex');assert dex.startswith(b'dex\n');assert hashlib.sha1(dex[32:]).digest()==dex[12:32];assert zlib.adler32(dex[12:])&0xffffffff==int.from_bytes(dex[8:12],'little');report['dex_checksums']='valid'
        stored=[]
        for i in z.infolist():
            if i.compress_type==zipfile.ZIP_STORED:
                n,x=struct.unpack_from('<HH',data,i.header_offset+26);offset=i.header_offset+30+n+x;assert offset%4==0;stored.append(i.filename)
        report['aligned_stored_entries']=stored
        rejected=[]
        for name in ['classes.dex','assets/game.html','resources.arsc']:
            i=z.getinfo(name);n,x=struct.unpack_from('<HH',data,i.header_offset+26);pos=i.header_offset+30+n+x+min(10,i.compress_size-1);changed=bytearray(data);changed[pos]^=1
            try:verify(changed)
            except (AssertionError,ValueError):rejected.append(name)
            else:raise AssertionError('tampering was accepted')
        report['tamper_rejections']=rejected
    return report
if __name__=='__main__':
    report=checks(sys.argv[1]);print(json.dumps(report,indent=2))
