package com.superwiss.game.playtest;



import android.annotation.SuppressLint;

import android.app.Activity;

import android.content.pm.ActivityInfo;

import android.os.Bundle;

import android.view.Gravity;

import android.view.View;

import android.view.Window;

import android.view.WindowManager;

import android.webkit.WebChromeClient;

import android.webkit.WebSettings;

import android.webkit.WebView;

import android.widget.FrameLayout;

import android.widget.TextView;
import android.widget.ImageView;

import android.os.Handler;

import android.os.Looper;

import android.util.Log;

import android.webkit.ConsoleMessage;

import android.widget.Button;

import android.widget.LinearLayout;

import android.content.pm.ApplicationInfo;



/** Trusted bundled WebView game with opt-in paired Bluetooth and HTTPS accounts. */

public final class MainActivity extends Activity {

    private WebView webView;

    private FrameLayout root;

    private BluetoothLink link;

    private LinearLayout bootOverlay;

    private TextView bootText;

    private final Handler bootHandler = new Handler(Looper.getMainLooper());

    private boolean bootReady;
    private boolean bootFailed;

    private final Runnable bootTimeout = () -> bootFailure("Startup timed out. Retry, or use Safe Mode to load with reduced graphics and sound off.");

    public void bootStage(String stage) {

        runOnUiThread(() -> {

            if (stage == null || bootFailed) return;

            Log.i("SuperWissBoot", stage);

            if (bootOverlay != null) bootOverlay.setVisibility(View.GONE);

            if ("Home screen".equals(stage)) { bootReady = true; bootHandler.removeCallbacks(bootTimeout); }

        });

    }

    public void bootFailure(String message) {

        runOnUiThread(() -> {

            bootHandler.removeCallbacks(bootTimeout);

            bootFailed = true;
            Log.e("SuperWissBoot", message);

            bootText.setText("SUPER WISS ASCENSION\n\n" + message);

            bootOverlay.setVisibility(View.VISIBLE);

        });

    }

    public void rendererLost() {
        if (webView != null) { root.removeView(webView); webView.destroy(); webView = null; }
        bootFailure("Android stopped the game renderer. Retry or use Safe Mode.");
    }
    private void restartBoot(boolean safe) {

        getIntent().putExtra("safeMode", safe);

        recreate();

    }

    private void addBootOverlay() {

        bootOverlay = new LinearLayout(this);

        bootOverlay.setOrientation(LinearLayout.VERTICAL);

        bootOverlay.setGravity(Gravity.CENTER);

        bootOverlay.setPadding(40, 20, 40, 20);

        bootOverlay.setBackgroundColor(0xff101827);

        ImageView brand = new ImageView(this);
        brand.setImageResource(R.drawable.brand_logo);
        brand.setContentDescription("Super Wiss Ascension");
        brand.setScaleType(ImageView.ScaleType.FIT_CENTER);
        int logoDp = Math.min(112, Math.max(56, getResources().getConfiguration().screenHeightDp / 4));
        int logoSize = Math.round(logoDp * getResources().getDisplayMetrics().density);
        bootOverlay.addView(brand, new LinearLayout.LayoutParams(logoSize, logoSize));

        bootText = new TextView(this);

        bootText.setTextColor(0xfff4dfac);

        bootText.setTextSize(20);

        bootText.setGravity(Gravity.CENTER);

        bootText.setText("SUPER WISS ASCENSION\n\nBoot · opening local game…");

        bootOverlay.addView(bootText);

        Button retry = new Button(this); retry.setText("Retry"); retry.setOnClickListener(v -> restartBoot(false)); bootOverlay.addView(retry);

        Button safe = new Button(this); safe.setText("Safe Mode"); safe.setOnClickListener(v -> restartBoot(true)); bootOverlay.addView(safe);

        root.addView(bootOverlay, new FrameLayout.LayoutParams(-1, -1));

    }

    volatile String apiOrigin="";

    public WebView gameView(){return webView;}

    public void nativeError(String text){try{org.json.JSONObject o=new org.json.JSONObject();o.put("type","error");o.put("text",text);nativeEvent(o);}catch(Exception ignored){}}

    public void nativeEvent(final org.json.JSONObject value){runOnUiThread(new Runnable(){public void run(){if(webView!=null)webView.evaluateJavascript("window.dispatchEvent(new CustomEvent('sw-native',{detail:JSON.parse("+org.json.JSONObject.quote(value.toString())+")}));",null);}});}

    @Override public void onRequestPermissionsResult(int code,String[] permissions,int[] grants){super.onRequestPermissionsResult(code,permissions,grants);if(code==410){if(grants.length>0&&grants[0]==0)link.devices();else nativeError("Nearby devices permission denied. Offline play still works.");}}





    @SuppressLint("SetJavaScriptEnabled") // Only trusted, bundled game code can run.

    @Override protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);

        requestWindowFeature(Window.FEATURE_NO_TITLE);

        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR_LANDSCAPE);

        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON | WindowManager.LayoutParams.FLAG_FULLSCREEN);

        root = new FrameLayout(this);

        root.setBackgroundColor(0xff171923);

        root.setOnApplyWindowInsetsListener(new SafeInsets());

        setContentView(root);



        addBootOverlay();

        try { webView = new WebView(this); }

        catch (RuntimeException e) { bootFailure("Android WebView could not start: " + e.getMessage()); return; }

        webView.setBackgroundColor(0xff171923);

        webView.setVerticalScrollBarEnabled(false);

        webView.setHorizontalScrollBarEnabled(false);

        webView.setOverScrollMode(View.OVER_SCROLL_NEVER);

        root.addView(webView, 0, new FrameLayout.LayoutParams(-1, -1));

        WebView.setWebContentsDebuggingEnabled((getApplicationInfo().flags & ApplicationInfo.FLAG_DEBUGGABLE) != 0);

        webView.setWebChromeClient(new WebChromeClient() {

            @Override public boolean onConsoleMessage(ConsoleMessage m) {

                Log.println(m.messageLevel() == ConsoleMessage.MessageLevel.ERROR ? Log.ERROR : Log.INFO,

                    "SuperWissJS", m.message() + " @ " + m.sourceId() + ":" + m.lineNumber());

                return true;

            }

        });

        webView.setWebViewClient(new OfflineClient(this));

        link=new BluetoothLink(new BluetoothLink.Listener(){public void event(org.json.JSONObject e){nativeEvent(e);}});

        webView.addJavascriptInterface(new NativeBridge(this,link),"WissNative");

        WebSettings settings = webView.getSettings();

        settings.setJavaScriptEnabled(true);

        settings.setDomStorageEnabled(true);

        settings.setMediaPlaybackRequiresUserGesture(true);

        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);

        settings.setAllowFileAccess(false);

        settings.setAllowContentAccess(false);

        settings.setSupportZoom(false);

        settings.setBuiltInZoomControls(false);

        settings.setTextZoom(100);

        immersive();

        // Stream APK files; never copy the entire media bundle into Java strings.

        // Keep the original HTTPS origin so existing localStorage saves survive upgrades.

        bootHandler.postDelayed(bootTimeout, 45000);

        webView.loadUrl(OfflineClient.ORIGIN + "/game.html" + (getIntent().getBooleanExtra("safeMode", false) ? "?safe=1" : ""));

    }

    @SuppressWarnings("deprecation")

    private void immersive() {

        getWindow().getDecorView().setSystemUiVisibility(

            View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY | View.SYSTEM_UI_FLAG_FULLSCREEN |

            View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN |

            View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_LAYOUT_STABLE);

    }

    @SuppressWarnings("deprecation")

    @Override public void onBackPressed() {

        if (webView == null) { finish(); return; }

        webView.evaluateJavascript("Boolean(window.NativeShell && window.NativeShell.back && window.NativeShell.back())", new BackResult(this));

    }

    @Override protected void onPause() {

        if (webView != null) {

            webView.evaluateJavascript("window.dispatchEvent(new Event('native-pause'));", null);

            webView.onPause();

        }

        if(link!=null)link.stop();

        super.onPause();

    }

    @Override protected void onResume() {

        super.onResume();

        if (webView != null) {

            webView.onResume();

            webView.evaluateJavascript("window.dispatchEvent(new Event('native-resume'));", null);

        }

        immersive();

    }

    @Override public void onWindowFocusChanged(boolean hasFocus) {

        super.onWindowFocusChanged(hasFocus);

        if (hasFocus) immersive();

    }

    @Override protected void onDestroy() {

        bootHandler.removeCallbacksAndMessages(null);

        if(link!=null)link.stop();

        if (webView != null) {

            webView.removeJavascriptInterface("WissNative");

            root.removeView(webView);

            webView.stopLoading();

            webView.destroy();

            webView = null;

        }

        super.onDestroy();

    }

}

