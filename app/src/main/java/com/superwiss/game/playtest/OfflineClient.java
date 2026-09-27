package com.superwiss.game.playtest;

import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebResourceError;
import android.webkit.RenderProcessGoneDetail;
import android.net.Uri;
import android.util.Log;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.Collections;

/** APK-only HTTPS origin, with an optional explicitly configured account origin. */
public final class OfflineClient extends WebViewClient {
    public static final String ORIGIN = "https://appassets.androidplatform.net";
    private final MainActivity activity;
    public OfflineClient(MainActivity a) { activity = a; }
    private boolean local(Uri u) { return "https".equals(u.getScheme()) && "appassets.androidplatform.net".equals(u.getHost()) && u.getPort() == -1 && u.getUserInfo() == null; }
    @Override public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
        return !local(request.getUrl()) || !"/game.html".equals(request.getUrl().getPath());
    }
    private WebResourceResponse denied(int status, String reason) {
        return new WebResourceResponse("text/plain", "UTF-8", status, reason, Collections.emptyMap(), new ByteArrayInputStream(reason.getBytes(java.nio.charset.StandardCharsets.UTF_8)));
    }
    @Override public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
        Uri uri = request.getUrl();
        if (local(uri)) {
            String path = uri.getPath();
            if (path == null || path.contains("..") || path.contains("\\") || !"GET".equals(request.getMethod())) return denied(403, "Forbidden");
            path = path.substring(1);
            if (!(path.equals("game.html") || path.equals("game.js") || path.equals("boot.js") || path.equals("style.css") || path.startsWith("assets/"))) return denied(404, "Not Found");
            String mime = path.endsWith(".html") ? "text/html" : path.endsWith(".js") ? "application/javascript" : path.endsWith(".css") ? "text/css" : path.endsWith(".png") ? "image/png" : path.endsWith(".webp") ? "image/webp" : path.endsWith(".jpg") ? "image/jpeg" : path.endsWith(".svg") ? "image/svg+xml" : path.endsWith(".ogg") ? "audio/ogg" : path.endsWith(".wav") ? "audio/wav" : path.endsWith(".mp3") ? "audio/mpeg" : "application/octet-stream";
            try { return new WebResourceResponse(mime, "UTF-8", 200, "OK", Collections.singletonMap("Cache-Control", "no-cache"), activity.getAssets().open(path)); }
            catch (IOException e) { Log.e("SuperWissAssets", "Missing APK asset: " + path, e); return denied(404, "Not Found"); }
        }
        String url = uri.toString();
        if (!activity.apiOrigin.isEmpty() && url.startsWith(activity.apiOrigin + "/")) return null;
        return denied(403, "Forbidden");
    }
    @Override public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
        if (request.isForMainFrame()) activity.bootFailure("Could not open the bundled game: " + error.getDescription());
    }
    @Override public void onReceivedHttpError(WebView view, WebResourceRequest request, WebResourceResponse response) {
        if (request.isForMainFrame()) activity.bootFailure("Bundled game missing (" + response.getStatusCode() + "). Reinstall this build.");
    }
    @Override public boolean onRenderProcessGone(WebView view, RenderProcessGoneDetail detail) {
        activity.rendererLost();
        return true;
    }
}
