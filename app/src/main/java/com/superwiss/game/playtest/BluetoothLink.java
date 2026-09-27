package com.superwiss.game.playtest;

import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothServerSocket;
import android.bluetooth.BluetoothSocket;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.concurrent.*;
import org.json.*;

/** Three authenticated RFCOMM channels form a host + 3 client star.
 * Only paired devices, no background scanning, no location permission. */
public final class BluetoothLink {
    public interface Listener { void event(JSONObject value); }
    private static final UUID[] SERVICES={UUID.fromString("9953e646-d73e-4f89-93f2-7627a5f0b401"),UUID.fromString("9953e646-d73e-4f89-93f2-7627a5f0b402"),UUID.fromString("9953e646-d73e-4f89-93f2-7627a5f0b403")};
    private final Listener listener;
    private final Map<String,Peer> peers=new ConcurrentHashMap<String,Peer>();
    private final List<BluetoothServerSocket> listeners=Collections.synchronizedList(new ArrayList<BluetoothServerSocket>());
    private volatile BluetoothSocket pending;
    private volatile int generation=0;
    public BluetoothLink(Listener listener){this.listener=listener;}
    private void post(String type,String peer,String text){try{JSONObject o=new JSONObject();o.put("type",type);o.put("peer",peer);o.put(type.equals("message")?"payload":"text",text);listener.event(o);}catch(JSONException ignored){}}
    private BluetoothAdapter adapter() throws IOException {BluetoothAdapter a=BluetoothAdapter.getDefaultAdapter();if(a==null)throw new IOException("This phone has no Bluetooth adapter.");if(!a.isEnabled())throw new IOException("Turn on Bluetooth in Android settings first.");return a;}
    public void devices(){try{JSONArray rows=new JSONArray();for(BluetoothDevice d:adapter().getBondedDevices()){JSONObject o=new JSONObject();o.put("name",d.getName()==null?"Paired device":d.getName());o.put("address",d.getAddress());rows.put(o);}JSONObject e=new JSONObject();e.put("type","devices");e.put("devices",rows);listener.event(e);}catch(SecurityException e){post("error","",safe(e));}catch(Exception e){post("error","",safe(e));}}
    public void host(){
        stop(); final int g=generation;
        for(int index=0;index<3;index++){
            final int slot=index;
            new Thread(new Runnable(){public void run(){
                while(g==generation){
                    BluetoothServerSocket ss=null;
                    try{
                        ss=adapter().listenUsingRfcommWithServiceRecord("Super Wiss Ascension "+(slot+1),SERVICES[slot]);
                        synchronized(listeners){if(g!=generation){ss.close();return;}listeners.add(ss);}
                        post("status","","Room open for paired friends");
                        BluetoothSocket socket=ss.accept();
                        if(g!=generation){socket.close();return;}
                        attach("slot"+(slot+1),socket,g);
                    }catch(SecurityException e){if(g==generation)post("error","",safe(e));return;}catch(Exception e){if(g==generation)post("error","",safe(e));return;}
                    finally{if(ss!=null){listeners.remove(ss);try{ss.close();}catch(IOException ignored){}}}
                    try{while(g==generation&&peers.containsKey("slot"+(slot+1)))Thread.sleep(120);}
                    catch(InterruptedException e){Thread.currentThread().interrupt();return;}
                }
            }},"Wiss-accept-"+slot).start();
        }
    }
    public void join(final String address){if(address==null||!address.matches("(?i)[0-9a-f]{2}(:[0-9a-f]{2}){5}")){post("error","","Select a paired host.");return;}stop();final int g=generation;new Thread(new Runnable(){public void run(){try{BluetoothAdapter a=adapter();BluetoothDevice chosen=null;for(BluetoothDevice d:a.getBondedDevices())if(address.equalsIgnoreCase(d.getAddress()))chosen=d;if(chosen==null)throw new IOException("Pair this host in Android Bluetooth settings first.");for(int i=0;i<SERVICES.length&&g==generation;i++){BluetoothSocket socket=null;try{post("status","","Connecting to host slot "+(i+1));socket=chosen.createRfcommSocketToServiceRecord(SERVICES[i]);pending=socket;if(g!=generation){socket.close();return;}socket.connect();pending=null;if(g!=generation){socket.close();return;}attach("host",socket,g);return;}catch(IOException e){pending=null;if(socket!=null)try{socket.close();}catch(IOException ignored){}}}if(g==generation)post("error","","No free host slot. Ask the host to reopen Nearby and try again.");}catch(SecurityException e){if(g==generation)post("error","",safe(e));}catch(Exception e){if(g==generation)post("error","",safe(e));}}},"Wiss-connect").start();}
    private synchronized void attach(String id,BluetoothSocket socket,int g)throws IOException{if(g!=generation){socket.close();return;}if(peers.containsKey(id)||peers.size()>=3){socket.close();return;}Peer p=new Peer(id,socket,g);peers.put(id,p);post("connected",id,"");p.start();}
    public void send(String peer,String text){if(text==null||text.length()>65536)return;byte[] bytes=text.getBytes(StandardCharsets.UTF_8);if(bytes.length==0||bytes.length>65536)return;Peer p=peers.get(peer);if(p!=null&&!p.outgoing.offer(bytes)){p.close();post("error",peer,"Bluetooth connection is congested. Match cancelled.");}}
    public void kick(String id){Peer p=peers.get(id);if(p!=null)p.close();}
    public synchronized void stop(){generation++;BluetoothSocket s=pending;pending=null;if(s!=null)try{s.close();}catch(IOException ignored){}synchronized(listeners){for(BluetoothServerSocket ss:listeners)try{ss.close();}catch(IOException ignored){}listeners.clear();}for(Peer p:peers.values())p.close();peers.clear();}
    private static String safe(Exception e){return e instanceof SecurityException?"Nearby devices permission is required. Allow it in Android settings.":"Bluetooth unavailable: "+String.valueOf(e.getMessage());}
    private final class Peer {
        final String id;final BluetoothSocket socket;final int gen;final ArrayBlockingQueue<byte[]> outgoing=new ArrayBlockingQueue<byte[]>(48);volatile boolean closed=false;Thread reader,writer;
        Peer(String id,BluetoothSocket socket,int gen){this.id=id;this.socket=socket;this.gen=gen;}
        void start(){reader=new Thread(new Runnable(){public void run(){try{DataInputStream in=new DataInputStream(socket.getInputStream());long start=System.currentTimeMillis();int count=0;while(!closed&&gen==generation){int n=in.readInt();if(n<1||n>65536)throw new IOException("Invalid frame");long t=System.currentTimeMillis();if(t-start>=1000){start=t;count=0;}if(++count>100)throw new IOException("Input rate exceeded");byte[] buf=new byte[n];in.readFully(buf);post("message",id,new String(buf,StandardCharsets.UTF_8));}}catch(Exception ignored){}finally{close();}}},"Wiss-read-"+id);
        writer=new Thread(new Runnable(){public void run(){try{DataOutputStream out=new DataOutputStream(socket.getOutputStream());while(!closed&&gen==generation){byte[] buf=outgoing.poll(2,TimeUnit.SECONDS);if(buf!=null){out.writeInt(buf.length);out.write(buf);out.flush();}}}catch(Exception ignored){}finally{close();}}},"Wiss-write-"+id);reader.start();writer.start();}
        synchronized void close(){if(closed)return;closed=true;try{socket.close();}catch(IOException ignored){}outgoing.clear();if(writer!=null)writer.interrupt();peers.remove(id,this);if(gen==generation)post("disconnected",id,"");}
    }
}
