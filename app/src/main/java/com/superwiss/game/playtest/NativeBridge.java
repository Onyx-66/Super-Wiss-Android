package com.superwiss.game.playtest;
import android.webkit.JavascriptInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;
import android.view.HapticFeedbackConstants;
import java.net.URI;
import org.json.*;

/** Minimal bridge available ONLY to bundled local game content. No arbitrary file access. */
public final class NativeBridge {
 private final MainActivity activity;private final BluetoothLink link;
 NativeBridge(MainActivity a,BluetoothLink l){activity=a;link=l;}
 @JavascriptInterface public void bootStage(String stage){activity.bootStage(stage);}
 @JavascriptInterface public String capabilities(){return "{\"bluetooth\":true,\"share\":true,\"haptics\":true,\"protocol\":5}";}
 @JavascriptInterface public void requestBluetooth(){activity.runOnUiThread(new Runnable(){public void run(){if(Build.VERSION.SDK_INT>=31&&activity.checkSelfPermission("android.permission.BLUETOOTH_CONNECT")!=PackageManager.PERMISSION_GRANTED)activity.requestPermissions(new String[]{"android.permission.BLUETOOTH_CONNECT"},410);else link.devices();}});}
 @JavascriptInterface public void devices(){link.devices();}
 @JavascriptInterface public void host(){if(allowed())link.host();}
 @JavascriptInterface public void join(String address){if(allowed())link.join(address);}
 @JavascriptInterface public void send(String peer,String payload){link.send(peer,payload);}
 @JavascriptInterface public void kick(String id){link.kick(id);}
 @JavascriptInterface public void stop(){link.stop();}
 private boolean allowed(){if(Build.VERSION.SDK_INT<31||activity.checkSelfPermission("android.permission.BLUETOOTH_CONNECT")==PackageManager.PERMISSION_GRANTED)return true;activity.nativeError("Allow Nearby devices before hosting or joining.");return false;}
 @JavascriptInterface public void openBluetoothSettings(){activity.runOnUiThread(new Runnable(){public void run(){try{activity.startActivity(new Intent("android.settings.BLUETOOTH_SETTINGS"));}catch(Exception e){activity.nativeError("Open Android Settings → Bluetooth to pair phones.");}}});}
 @JavascriptInterface public void setApiOrigin(String value){if(value==null||value.isEmpty()){activity.apiOrigin="";return;}try{URI u=new URI(value);if(!"https".equals(u.getScheme())||u.getHost()==null||u.getUserInfo()!=null||u.getQuery()!=null||u.getFragment()!=null||!(u.getPath()==null||u.getPath().isEmpty()||u.getPath().equals("/")))return;activity.apiOrigin="https://"+u.getRawAuthority();}catch(Exception ignored){}}
 @JavascriptInterface public void share(String value){if(value==null)return;final String text=value.substring(0,Math.min(2000,value.length()));activity.runOnUiThread(new Runnable(){public void run(){try{Intent send=new Intent(Intent.ACTION_SEND);send.setType("text/plain");send.putExtra(Intent.EXTRA_TEXT,text);activity.startActivity(Intent.createChooser(send,"Share Super Wiss challenge"));}catch(Exception e){activity.nativeError("No sharing app available.");}}});}
 @JavascriptInterface public void copy(String value){if(value==null)return;final String text=value.substring(0,Math.min(2000,value.length()));activity.runOnUiThread(new Runnable(){public void run(){try{android.content.ClipboardManager clipboard=(android.content.ClipboardManager)activity.getSystemService(android.content.Context.CLIPBOARD_SERVICE);if(clipboard!=null)clipboard.setPrimaryClip(android.content.ClipData.newPlainText("Super Wiss room",text));}catch(Exception e){activity.nativeError("Could not copy. Use Share or read the room code.");}}});}
 @JavascriptInterface public void haptic(String kind){activity.runOnUiThread(new Runnable(){public void run(){if(activity.gameView()!=null)activity.gameView().performHapticFeedback(HapticFeedbackConstants.VIRTUAL_KEY);}});}
}
