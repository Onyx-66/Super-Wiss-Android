"""Compile-time public API signatures only. NOT an SDK and NEVER packaged in DEX.
Prefer the official Android SDK android.jar in ordinary Android Studio builds.
This fallback's descriptors are checked by source review and bytecode inventory;
Android runtime compatibility still requires real-device testing.
"""
from pathlib import Path
import sys
root=Path(sys.argv[1]);root.mkdir(parents=True,exist_ok=True)
classes={
'android.annotation.SuppressLint':'public @interface SuppressLint { String[] value(); }',
'android.webkit.JavascriptInterface':'@java.lang.annotation.Retention(java.lang.annotation.RetentionPolicy.RUNTIME) @java.lang.annotation.Target(java.lang.annotation.ElementType.METHOD) public @interface JavascriptInterface {}',
'android.content.ClipData':'public class ClipData {public static ClipData newPlainText(CharSequence label,CharSequence text){return null;}}',
'android.content.ClipboardManager':'public class ClipboardManager {public void setPrimaryClip(ClipData data){}}',
'android.content.Context':'public abstract class Context { public Object getSystemService(String name){return null;} public android.content.res.AssetManager getAssets(){return null;} public void startActivity(Intent i){} public int checkSelfPermission(String p){return 0;} }',
'android.content.Intent':'public class Intent {public static final String ACTION_SEND="android.intent.action.SEND",EXTRA_TEXT="android.intent.extra.TEXT";public Intent(String a){}public Intent setType(String t){return this;}public Intent putExtra(String k,String v){return this;}public static Intent createChooser(Intent i,CharSequence title){return null;}}',
'android.content.res.AssetManager':'public final class AssetManager {public java.io.InputStream open(String p)throws java.io.IOException{return null;}}',
'android.content.pm.ActivityInfo':'public class ActivityInfo {public static final int SCREEN_ORIENTATION_SENSOR_LANDSCAPE=6;}',
'android.content.pm.PackageManager':'public abstract class PackageManager {public static final int PERMISSION_GRANTED=0;}',
'android.app.Activity':'public class Activity extends android.content.Context {protected void onCreate(android.os.Bundle b){}protected void onPause(){}protected void onResume(){}protected void onDestroy(){}public void onWindowFocusChanged(boolean v){}public void onBackPressed(){}public void onRequestPermissionsResult(int c,String[] p,int[] g){}public boolean requestWindowFeature(int n){return false;}public void setRequestedOrientation(int n){}public android.view.Window getWindow(){return null;}public void setContentView(android.view.View v){}public void finish(){}public void runOnUiThread(Runnable r){}public void requestPermissions(String[] p,int c){}}',
'android.os.Bundle':'public class Bundle {}',
'android.os.Build':'public class Build {public static class VERSION {public static int SDK_INT;}}',
'android.view.Gravity':'public class Gravity {public static final int CENTER=17;}',
'android.view.HapticFeedbackConstants':'public class HapticFeedbackConstants {public static final int VIRTUAL_KEY=1;}',
'android.view.View':'public class View {public static final int OVER_SCROLL_NEVER=2,SYSTEM_UI_FLAG_IMMERSIVE_STICKY=4096,SYSTEM_UI_FLAG_FULLSCREEN=4,SYSTEM_UI_FLAG_HIDE_NAVIGATION=2,SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN=1024,SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION=512,SYSTEM_UI_FLAG_LAYOUT_STABLE=256;public View(android.content.Context c){}public void setBackgroundColor(int c){}public void setVerticalScrollBarEnabled(boolean v){}public void setHorizontalScrollBarEnabled(boolean v){}public void setOverScrollMode(int m){}public void setSystemUiVisibility(int f){}public void setPadding(int l,int t,int r,int b){}public void setOnApplyWindowInsetsListener(OnApplyWindowInsetsListener l){}public boolean performHapticFeedback(int a){return false;}public interface OnApplyWindowInsetsListener {WindowInsets onApplyWindowInsets(View v,WindowInsets i);}}',
'android.view.ViewGroup':'public abstract class ViewGroup extends View {public ViewGroup(android.content.Context c){super(c);}public void addView(View v,LayoutParams p){}public void removeView(View v){}public static class LayoutParams {public LayoutParams(int w,int h){}}}',
'android.view.Window':'public abstract class Window {public static final int FEATURE_NO_TITLE=1;public abstract void addFlags(int flags);public abstract View getDecorView();}',
'android.view.WindowManager':'public interface WindowManager {public static class LayoutParams {public static final int FLAG_KEEP_SCREEN_ON=128,FLAG_FULLSCREEN=1024;}}',
'android.view.WindowInsets':'public final class WindowInsets {public int getSystemWindowInsetLeft(){return 0;}public int getSystemWindowInsetTop(){return 0;}public int getSystemWindowInsetRight(){return 0;}public int getSystemWindowInsetBottom(){return 0;}public DisplayCutout getDisplayCutout(){return null;}}',
'android.view.DisplayCutout':'public final class DisplayCutout {public int getSafeInsetLeft(){return 0;}public int getSafeInsetTop(){return 0;}public int getSafeInsetRight(){return 0;}public int getSafeInsetBottom(){return 0;}}',
'android.widget.FrameLayout':'public class FrameLayout extends android.view.ViewGroup {public FrameLayout(android.content.Context c){super(c);}public static class LayoutParams extends android.view.ViewGroup.LayoutParams {public LayoutParams(int w,int h){super(w,h);}}}',
'android.widget.TextView':'public class TextView extends android.view.View {public TextView(android.content.Context c){super(c);}public void setText(CharSequence s){}public void setGravity(int g){}}',
'android.webkit.WebView':'public class WebView extends android.view.ViewGroup {public WebView(android.content.Context c){super(c);}public void setWebChromeClient(WebChromeClient c){}public void setWebViewClient(WebViewClient c){}public WebSettings getSettings(){return null;}public void loadDataWithBaseURL(String b,String d,String m,String e,String h){}public void evaluateJavascript(String s,ValueCallback<String> c){}public void onPause(){}public void onResume(){}public void stopLoading(){}public void destroy(){}public void addJavascriptInterface(Object o,String n){}public void removeJavascriptInterface(String n){}}',
'android.webkit.WebChromeClient':'public class WebChromeClient {}',
'android.webkit.WebViewClient':'public class WebViewClient {public boolean shouldOverrideUrlLoading(WebView w,WebResourceRequest r){return false;}public WebResourceResponse shouldInterceptRequest(WebView w,WebResourceRequest r){return null;}}',
'android.webkit.WebResourceRequest':'public interface WebResourceRequest {android.net.Uri getUrl();}',
'android.webkit.WebResourceResponse':'public class WebResourceResponse {public WebResourceResponse(String m,String e,java.io.InputStream i){}}',
'android.webkit.ValueCallback':'public interface ValueCallback<T> {void onReceiveValue(T value);}',
'android.webkit.WebSettings':'public abstract class WebSettings {public static final int MIXED_CONTENT_NEVER_ALLOW=1;public abstract void setJavaScriptEnabled(boolean b);public abstract void setDomStorageEnabled(boolean b);public abstract void setMediaPlaybackRequiresUserGesture(boolean b);public abstract void setMixedContentMode(int m);public abstract void setAllowFileAccess(boolean b);public abstract void setAllowContentAccess(boolean b);public abstract void setSupportZoom(boolean b);public abstract void setBuiltInZoomControls(boolean b);public abstract void setTextZoom(int n);}',
'android.net.Uri':'public abstract class Uri {public abstract String toString();}',
'android.bluetooth.BluetoothAdapter':'public final class BluetoothAdapter {public static BluetoothAdapter getDefaultAdapter(){return null;}public boolean isEnabled(){return false;}public java.util.Set<BluetoothDevice> getBondedDevices(){return null;}public BluetoothServerSocket listenUsingRfcommWithServiceRecord(String n,java.util.UUID u)throws java.io.IOException{return null;}}',
'android.bluetooth.BluetoothDevice':'public final class BluetoothDevice {public String getName(){return null;}public String getAddress(){return null;}public BluetoothSocket createRfcommSocketToServiceRecord(java.util.UUID u)throws java.io.IOException{return null;}}',
'android.bluetooth.BluetoothSocket':'public final class BluetoothSocket implements java.io.Closeable {public void connect()throws java.io.IOException{}public void close()throws java.io.IOException{}public java.io.InputStream getInputStream()throws java.io.IOException{return null;}public java.io.OutputStream getOutputStream()throws java.io.IOException{return null;}}',
'android.bluetooth.BluetoothServerSocket':'public final class BluetoothServerSocket implements java.io.Closeable {public BluetoothSocket accept()throws java.io.IOException{return null;}public void close()throws java.io.IOException{}}',
'org.json.JSONException':'public class JSONException extends Exception {public JSONException(String s){super(s);}}',
'org.json.JSONObject':'public class JSONObject {public JSONObject(){}public JSONObject put(String k,Object v)throws JSONException{return this;}public JSONObject put(String k,int v)throws JSONException{return this;}public JSONObject put(String k,boolean v)throws JSONException{return this;}public String toString(){return "";}public static String quote(String s){return "";}}',
'org.json.JSONArray':'public class JSONArray {public JSONArray(){}public JSONArray put(Object o){return this;}}',
}
for name,body in classes.items():
 package,cls=name.rsplit('.',1);p=root/Path(name.replace('.','/')+'.java');p.parent.mkdir(parents=True,exist_ok=True);p.write_text('package '+package+';\n'+body+'\n')
print('Generated',len(classes),'compile-only public API signatures')
