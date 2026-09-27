#!/usr/bin/env python3
"""Deterministic v1/v2 signer for the public QA playtest only.
This is a fallback for this build environment, not a substitute for Android's
apksigner on release machines. Reference: AOSP APK Signature Scheme v2.
Usage: python sign_playtest.py unsigned.apk qa.p12 password output.apk
"""
import base64, hashlib, io, struct, sys, zipfile
from pathlib import Path
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives.serialization import pkcs12,pkcs7
P=lambda n:struct.pack('<I',n)
LP=lambda b:P(len(b))+b

def sign(source,p12,password,target):
    key,certificate,_=pkcs12.load_key_and_certificates(Path(p12).read_bytes(),password.encode())
    with zipfile.ZipFile(source) as z:
        data={i.filename:(z.read(i),i.compress_type) for i in z.infolist() if not i.is_dir() and not i.filename.upper().startswith('META-INF/')}
    def b64hash(b):return base64.b64encode(hashlib.sha256(b).digest()).decode()
    def line(key,value):
        # Fold manifest lines without splitting UTF-8 characters; all bundled names are ASCII.
        text=(key+': '+value).encode('ascii');parts=[text[:70]];text=text[70:]
        while text:parts.append(b' '+text[:69]);text=text[69:]
        return b'\r\n'.join(parts)+b'\r\n'
    main=b'Manifest-Version: 1.0\r\nCreated-By: Super Wiss QA\r\n\r\n'
    sections={name:line('Name',name)+line('SHA-256-Digest',b64hash(v[0]))+b'\r\n' for name,v in sorted(data.items())}
    mf=main+b''.join(sections.values())
    sf=(b'Signature-Version: 1.0\r\nCreated-By: Super Wiss QA\r\nX-Android-APK-Signed: 2\r\n'+line('SHA-256-Digest-Manifest',b64hash(mf))+b'\r\n')
    sf+=b''.join(line('Name',name)+line('SHA-256-Digest',b64hash(section))+b'\r\n' for name,section in sections.items())
    signature=pkcs7.PKCS7SignatureBuilder().set_data(sf).add_signer(certificate,key,hashes.SHA256()).sign(serialization.Encoding.DER,[pkcs7.PKCS7Options.DetachedSignature,pkcs7.PKCS7Options.Binary,pkcs7.PKCS7Options.NoAttributes])
    data.update({'META-INF/MANIFEST.MF':(mf,zipfile.ZIP_DEFLATED),'META-INF/SUPERWIS.SF':(sf,zipfile.ZIP_DEFLATED),'META-INF/SUPERWIS.RSA':(signature,zipfile.ZIP_DEFLATED)})
    stream=io.BytesIO()
    with zipfile.ZipFile(stream,'w',allowZip64=False) as z:
        for name,(body,compression) in sorted(data.items(),key=lambda item:(0 if item[0]=='META-INF/MANIFEST.MF' else 1 if item[0].startswith('META-INF/') else 2,item[0])):
            if name=='resources.arsc':compression=zipfile.ZIP_STORED
            info=zipfile.ZipInfo(name,date_time=(2026,9,24,0,0,0));info.compress_type=compression;info.external_attr=0o644<<16
            if compression==zipfile.ZIP_STORED:
                start=stream.tell()+30+len(name.encode('utf-8'))
                n=(-start)%4
                if n:info.extra=struct.pack('<HH',0xd935,n)+b'\0'*n
            z.writestr(info,body)
    blob=stream.getvalue();end=blob.rfind(b'PK\x05\x06');central=struct.unpack_from('<I',blob,end+16)[0]
    parts=[blob[:central],blob[central:end],blob[end:]];pieces=[]
    for part in parts:
        for at in range(0,len(part),1024*1024):
            chunk=part[at:at+1024*1024];pieces.append(hashlib.sha256(b'\xa5'+P(len(chunk))+chunk).digest())
    digest=hashlib.sha256(b'\x5a'+P(len(pieces))+b''.join(pieces)).digest()
    cert=certificate.public_bytes(serialization.Encoding.DER)
    public=key.public_key().public_bytes(serialization.Encoding.DER,serialization.PublicFormat.SubjectPublicKeyInfo)
    signed_data=LP(LP(P(0x0103)+LP(digest)))+LP(LP(cert))+LP(b'')
    rsa=key.sign(signed_data,padding.PKCS1v15(),hashes.SHA256())
    signer=LP(signed_data)+LP(LP(P(0x0103)+LP(rsa)))+LP(public)
    v2=LP(LP(signer));pair=P(0x7109871a)+v2
    body=struct.pack('<Q',len(pair))+pair;size=len(body)+24
    block=struct.pack('<Q',size)+body+struct.pack('<Q',size)+b'APK Sig Block 42'
    eocd=bytearray(blob[end:]);struct.pack_into('<I',eocd,16,central+len(block))
    signed=blob[:central]+block+blob[central:end]+eocd
    Path(target).write_bytes(signed)
    print(f'Signed QA APK: {target}; {len(signed)} bytes; SHA256 {hashlib.sha256(signed).hexdigest()}')
if __name__=='__main__':
    if len(sys.argv)!=5:raise SystemExit(__doc__)
    sign(*sys.argv[1:])
