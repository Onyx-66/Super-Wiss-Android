.class public final Lcom/superwiss/game/playtest/MainActivity;
.super Landroid/app/Activity;
.source "MainActivity.java"


# instance fields
.field volatile apiOrigin:Ljava/lang/String;

.field private link:Lcom/superwiss/game/playtest/BluetoothLink;

.field private root:Landroid/widget/FrameLayout;

.field private webView:Landroid/webkit/WebView;


# direct methods
.method public constructor <init>()V
    .locals 1

    .prologue
    .line 20
    invoke-direct {p0}, Landroid/app/Activity;-><init>()V

    .line 24
    const-string v0, ""

    iput-object v0, p0, Lcom/superwiss/game/playtest/MainActivity;->apiOrigin:Ljava/lang/String;

    return-void
.end method

.method static synthetic access$000(Lcom/superwiss/game/playtest/MainActivity;)Landroid/webkit/WebView;
    .locals 1

    .prologue
    .line 20
    iget-object v0, p0, Lcom/superwiss/game/playtest/MainActivity;->webView:Landroid/webkit/WebView;

    return-object v0
.end method

.method private immersive()V
    .locals 2

    .prologue
    .line 77
    invoke-virtual {p0}, Lcom/superwiss/game/playtest/MainActivity;->getWindow()Landroid/view/Window;

    move-result-object v0

    invoke-virtual {v0}, Landroid/view/Window;->getDecorView()Landroid/view/View;

    move-result-object v0

    const/16 v1, 0x1706

    invoke-virtual {v0, v1}, Landroid/view/View;->setSystemUiVisibility(I)V

    .line 81
    return-void
.end method


# virtual methods
.method public gameView()Landroid/webkit/WebView;
    .locals 1

    .prologue
    .line 25
    iget-object v0, p0, Lcom/superwiss/game/playtest/MainActivity;->webView:Landroid/webkit/WebView;

    return-object v0
.end method

.method public nativeError(Ljava/lang/String;)V
    .locals 3

    .prologue
    .line 26
    :try_start_0
    new-instance v0, Lorg/json/JSONObject;

    invoke-direct {v0}, Lorg/json/JSONObject;-><init>()V

    const-string v1, "type"

    const-string v2, "error"

    invoke-virtual {v0, v1, v2}, Lorg/json/JSONObject;->put(Ljava/lang/String;Ljava/lang/Object;)Lorg/json/JSONObject;

    const-string v1, "text"

    invoke-virtual {v0, v1, p1}, Lorg/json/JSONObject;->put(Ljava/lang/String;Ljava/lang/Object;)Lorg/json/JSONObject;

    invoke-virtual {p0, v0}, Lcom/superwiss/game/playtest/MainActivity;->nativeEvent(Lorg/json/JSONObject;)V
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_0

    :goto_0
    return-void

    :catch_0
    move-exception v0

    goto :goto_0
.end method

.method public nativeEvent(Lorg/json/JSONObject;)V
    .locals 1

    .prologue
    .line 27
    new-instance v0, Lcom/superwiss/game/playtest/MainActivity$1;

    invoke-direct {v0, p0, p1}, Lcom/superwiss/game/playtest/MainActivity$1;-><init>(Lcom/superwiss/game/playtest/MainActivity;Lorg/json/JSONObject;)V

    invoke-virtual {p0, v0}, Lcom/superwiss/game/playtest/MainActivity;->runOnUiThread(Ljava/lang/Runnable;)V

    return-void
.end method

.method public onBackPressed()V
    .locals 3

    .prologue
    .line 84
    iget-object v0, p0, Lcom/superwiss/game/playtest/MainActivity;->webView:Landroid/webkit/WebView;

    if-nez v0, :cond_0

    invoke-virtual {p0}, Lcom/superwiss/game/playtest/MainActivity;->finish()V

    .line 86
    :goto_0
    return-void

    .line 85
    :cond_0
    iget-object v0, p0, Lcom/superwiss/game/playtest/MainActivity;->webView:Landroid/webkit/WebView;

    const-string v1, "Boolean(window.NativeShell && window.NativeShell.back && window.NativeShell.back())"

    new-instance v2, Lcom/superwiss/game/playtest/BackResult;

    invoke-direct {v2, p0}, Lcom/superwiss/game/playtest/BackResult;-><init>(Landroid/app/Activity;)V

    invoke-virtual {v0, v1, v2}, Landroid/webkit/WebView;->evaluateJavascript(Ljava/lang/String;Landroid/webkit/ValueCallback;)V

    goto :goto_0
.end method

.method protected onCreate(Landroid/os/Bundle;)V
    .locals 8
    .annotation build Landroid/annotation/SuppressLint;
        value = {
            "SetJavaScriptEnabled"
        }
    .end annotation

    .prologue
    const/4 v5, -0x1

    const v2, -0xe8e6dd

    const/4 v4, 0x1

    const/4 v3, 0x0

    .line 33
    invoke-super {p0, p1}, Landroid/app/Activity;->onCreate(Landroid/os/Bundle;)V

    .line 34
    invoke-virtual {p0, v4}, Lcom/superwiss/game/playtest/MainActivity;->requestWindowFeature(I)Z

    .line 35
    const/4 v0, 0x6

    invoke-virtual {p0, v0}, Lcom/superwiss/game/playtest/MainActivity;->setRequestedOrientation(I)V

    .line 36
    invoke-virtual {p0}, Lcom/superwiss/game/playtest/MainActivity;->getWindow()Landroid/view/Window;

    move-result-object v0

    const/16 v1, 0x480

    invoke-virtual {v0, v1}, Landroid/view/Window;->addFlags(I)V

    .line 37
    new-instance v0, Landroid/widget/FrameLayout;

    invoke-direct {v0, p0}, Landroid/widget/FrameLayout;-><init>(Landroid/content/Context;)V

    iput-object v0, p0, Lcom/superwiss/game/playtest/MainActivity;->root:Landroid/widget/FrameLayout;

    .line 38
    iget-object v0, p0, Lcom/superwiss/game/playtest/MainActivity;->root:Landroid/widget/FrameLayout;

    invoke-virtual {v0, v2}, Landroid/widget/FrameLayout;->setBackgroundColor(I)V

    .line 39
    iget-object v0, p0, Lcom/superwiss/game/playtest/MainActivity;->root:Landroid/widget/FrameLayout;

    new-instance v1, Lcom/superwiss/game/playtest/SafeInsets;

    invoke-direct {v1}, Lcom/superwiss/game/playtest/SafeInsets;-><init>()V

    invoke-virtual {v0, v1}, Landroid/widget/FrameLayout;->setOnApplyWindowInsetsListener(Landroid/view/View$OnApplyWindowInsetsListener;)V

    .line 40
    iget-object v0, p0, Lcom/superwiss/game/playtest/MainActivity;->root:Landroid/widget/FrameLayout;

    invoke-virtual {p0, v0}, Lcom/superwiss/game/playtest/MainActivity;->setContentView(Landroid/view/View;)V

    .line 42
    new-instance v0, Landroid/webkit/WebView;

    invoke-direct {v0, p0}, Landroid/webkit/WebView;-><init>(Landroid/content/Context;)V

    iput-object v0, p0, Lcom/superwiss/game/playtest/MainActivity;->webView:Landroid/webkit/WebView;

    .line 43
    iget-object v0, p0, Lcom/superwiss/game/playtest/MainActivity;->webView:Landroid/webkit/WebView;

    invoke-virtual {v0, v2}, Landroid/webkit/WebView;->setBackgroundColor(I)V

    .line 44
    iget-object v0, p0, Lcom/superwiss/game/playtest/MainActivity;->webView:Landroid/webkit/WebView;

    invoke-virtual {v0, v3}, Landroid/webkit/WebView;->setVerticalScrollBarEnabled(Z)V

    .line 45
    iget-object v0, p0, Lcom/superwiss/game/playtest/MainActivity;->webView:Landroid/webkit/WebView;

    invoke-virtual {v0, v3}, Landroid/webkit/WebView;->setHorizontalScrollBarEnabled(Z)V

    .line 46
    iget-object v0, p0, Lcom/superwiss/game/playtest/MainActivity;->webView:Landroid/webkit/WebView;

    const/4 v1, 0x2

    invoke-virtual {v0, v1}, Landroid/webkit/WebView;->setOverScrollMode(I)V

    .line 47
    iget-object v0, p0, Lcom/superwiss/game/playtest/MainActivity;->root:Landroid/widget/FrameLayout;

    iget-object v1, p0, Lcom/superwiss/game/playtest/MainActivity;->webView:Landroid/webkit/WebView;

    new-instance v2, Landroid/widget/FrameLayout$LayoutParams;

    invoke-direct {v2, v5, v5}, Landroid/widget/FrameLayout$LayoutParams;-><init>(II)V

    invoke-virtual {v0, v1, v2}, Landroid/widget/FrameLayout;->addView(Landroid/view/View;Landroid/view/ViewGroup$LayoutParams;)V

    .line 48
    iget-object v0, p0, Lcom/superwiss/game/playtest/MainActivity;->webView:Landroid/webkit/WebView;

    new-instance v1, Landroid/webkit/WebChromeClient;

    invoke-direct {v1}, Landroid/webkit/WebChromeClient;-><init>()V

    invoke-virtual {v0, v1}, Landroid/webkit/WebView;->setWebChromeClient(Landroid/webkit/WebChromeClient;)V

    .line 49
    iget-object v0, p0, Lcom/superwiss/game/playtest/MainActivity;->webView:Landroid/webkit/WebView;

    new-instance v1, Lcom/superwiss/game/playtest/OfflineClient;

    invoke-direct {v1, p0}, Lcom/superwiss/game/playtest/OfflineClient;-><init>(Lcom/superwiss/game/playtest/MainActivity;)V

    invoke-virtual {v0, v1}, Landroid/webkit/WebView;->setWebViewClient(Landroid/webkit/WebViewClient;)V

    .line 50
    new-instance v0, Lcom/superwiss/game/playtest/BluetoothLink;

    new-instance v1, Lcom/superwiss/game/playtest/MainActivity$2;

    invoke-direct {v1, p0}, Lcom/superwiss/game/playtest/MainActivity$2;-><init>(Lcom/superwiss/game/playtest/MainActivity;)V

    invoke-direct {v0, v1}, Lcom/superwiss/game/playtest/BluetoothLink;-><init>(Lcom/superwiss/game/playtest/BluetoothLink$Listener;)V

    iput-object v0, p0, Lcom/superwiss/game/playtest/MainActivity;->link:Lcom/superwiss/game/playtest/BluetoothLink;

    .line 51
    iget-object v0, p0, Lcom/superwiss/game/playtest/MainActivity;->webView:Landroid/webkit/WebView;

    new-instance v1, Lcom/superwiss/game/playtest/NativeBridge;

    iget-object v2, p0, Lcom/superwiss/game/playtest/MainActivity;->link:Lcom/superwiss/game/playtest/BluetoothLink;

    invoke-direct {v1, p0, v2}, Lcom/superwiss/game/playtest/NativeBridge;-><init>(Lcom/superwiss/game/playtest/MainActivity;Lcom/superwiss/game/playtest/BluetoothLink;)V

    const-string v2, "WissNative"

    invoke-virtual {v0, v1, v2}, Landroid/webkit/WebView;->addJavascriptInterface(Ljava/lang/Object;Ljava/lang/String;)V

    .line 52
    iget-object v0, p0, Lcom/superwiss/game/playtest/MainActivity;->webView:Landroid/webkit/WebView;

    invoke-virtual {v0}, Landroid/webkit/WebView;->getSettings()Landroid/webkit/WebSettings;

    move-result-object v0

    .line 53
    invoke-virtual {v0, v4}, Landroid/webkit/WebSettings;->setJavaScriptEnabled(Z)V

    .line 54
    invoke-virtual {v0, v4}, Landroid/webkit/WebSettings;->setDomStorageEnabled(Z)V

    .line 55
    invoke-virtual {v0, v4}, Landroid/webkit/WebSettings;->setMediaPlaybackRequiresUserGesture(Z)V

    .line 56
    invoke-virtual {v0, v4}, Landroid/webkit/WebSettings;->setMixedContentMode(I)V

    .line 57
    invoke-virtual {v0, v3}, Landroid/webkit/WebSettings;->setAllowFileAccess(Z)V

    .line 58
    invoke-virtual {v0, v3}, Landroid/webkit/WebSettings;->setAllowContentAccess(Z)V

    .line 59
    invoke-virtual {v0, v3}, Landroid/webkit/WebSettings;->setSupportZoom(Z)V

    .line 60
    invoke-virtual {v0, v3}, Landroid/webkit/WebSettings;->setBuiltInZoomControls(Z)V

    .line 61
    const/16 v1, 0x64

    invoke-virtual {v0, v1}, Landroid/webkit/WebSettings;->setTextZoom(I)V

    .line 62
    invoke-direct {p0}, Lcom/superwiss/game/playtest/MainActivity;->immersive()V

    .line 63
    :try_start_0
    invoke-virtual {p0}, Lcom/superwiss/game/playtest/MainActivity;->getAssets()Landroid/content/res/AssetManager;

    move-result-object v0

    const-string v1, "game.html"

    invoke-virtual {v0, v1}, Landroid/content/res/AssetManager;->open(Ljava/lang/String;)Ljava/io/InputStream;
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_2

    move-result-object v6

    .line 64
    :try_start_1
    new-instance v0, Ljava/util/Scanner;

    const-string v1, "UTF-8"

    invoke-direct {v0, v6, v1}, Ljava/util/Scanner;-><init>(Ljava/io/InputStream;Ljava/lang/String;)V

    const-string v1, "\\A"

    invoke-virtual {v0, v1}, Ljava/util/Scanner;->useDelimiter(Ljava/lang/String;)Ljava/util/Scanner;
    :try_end_1
    .catch Ljava/lang/Throwable; {:try_start_1 .. :try_end_1} :catch_1
    .catch Ljava/lang/Exception; {:try_start_1 .. :try_end_1} :catch_2

    move-result-object v7

    .line 65
    :try_start_2
    invoke-virtual {v7}, Ljava/util/Scanner;->next()Ljava/lang/String;

    move-result-object v2

    .line 67
    iget-object v0, p0, Lcom/superwiss/game/playtest/MainActivity;->webView:Landroid/webkit/WebView;

    const-string v1, "https://appassets.androidplatform.net/"

    const-string v3, "text/html"

    const-string v4, "UTF-8"

    const/4 v5, 0x0

    invoke-virtual/range {v0 .. v5}, Landroid/webkit/WebView;->loadDataWithBaseURL(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V
    :try_end_2
    .catch Ljava/lang/Throwable; {:try_start_2 .. :try_end_2} :catch_0
    .catch Ljava/lang/Exception; {:try_start_2 .. :try_end_2} :catch_2

    .line 68
    if-eqz v7, :cond_0

    :try_start_3
    invoke-virtual {v7}, Ljava/util/Scanner;->close()V
    :try_end_3
    .catch Ljava/lang/Throwable; {:try_start_3 .. :try_end_3} :catch_1
    .catch Ljava/lang/Exception; {:try_start_3 .. :try_end_3} :catch_2

    :cond_0
    if-eqz v6, :cond_1

    :try_start_4
    invoke-virtual {v6}, Ljava/io/InputStream;->close()V
    :try_end_4
    .catch Ljava/lang/Exception; {:try_start_4 .. :try_end_4} :catch_2

    .line 74
    :cond_1
    :goto_0
    return-void

    .line 63
    :catch_0
    move-exception v0

    if-eqz v7, :cond_2

    :try_start_5
    invoke-virtual {v7}, Ljava/util/Scanner;->close()V
    :try_end_5
    .catch Ljava/lang/Throwable; {:try_start_5 .. :try_end_5} :catch_3
    .catch Ljava/lang/Exception; {:try_start_5 .. :try_end_5} :catch_2

    :cond_2
    :goto_1
    :try_start_6
    throw v0
    :try_end_6
    .catch Ljava/lang/Throwable; {:try_start_6 .. :try_end_6} :catch_1
    .catch Ljava/lang/Exception; {:try_start_6 .. :try_end_6} :catch_2

    :catch_1
    move-exception v0

    if-eqz v6, :cond_3

    :try_start_7
    invoke-virtual {v6}, Ljava/io/InputStream;->close()V
    :try_end_7
    .catch Ljava/lang/Throwable; {:try_start_7 .. :try_end_7} :catch_4
    .catch Ljava/lang/Exception; {:try_start_7 .. :try_end_7} :catch_2

    :cond_3
    :goto_2
    :try_start_8
    throw v0
    :try_end_8
    .catch Ljava/lang/Exception; {:try_start_8 .. :try_end_8} :catch_2

    .line 68
    :catch_2
    move-exception v0

    .line 69
    new-instance v0, Landroid/widget/TextView;

    invoke-direct {v0, p0}, Landroid/widget/TextView;-><init>(Landroid/content/Context;)V

    .line 70
    const-string v1, "Super Wiss could not load its bundled game. Please reinstall this APK."

    invoke-virtual {v0, v1}, Landroid/widget/TextView;->setText(Ljava/lang/CharSequence;)V

    .line 71
    const/16 v1, 0x11

    invoke-virtual {v0, v1}, Landroid/widget/TextView;->setGravity(I)V

    .line 72
    invoke-virtual {p0, v0}, Lcom/superwiss/game/playtest/MainActivity;->setContentView(Landroid/view/View;)V

    goto :goto_0

    .line 63
    :catch_3
    move-exception v1

    :try_start_9
    invoke-virtual {v0, v1}, Ljava/lang/Throwable;->addSuppressed(Ljava/lang/Throwable;)V
    :try_end_9
    .catch Ljava/lang/Throwable; {:try_start_9 .. :try_end_9} :catch_1
    .catch Ljava/lang/Exception; {:try_start_9 .. :try_end_9} :catch_2

    goto :goto_1

    :catch_4
    move-exception v1

    :try_start_a
    invoke-virtual {v0, v1}, Ljava/lang/Throwable;->addSuppressed(Ljava/lang/Throwable;)V
    :try_end_a
    .catch Ljava/lang/Exception; {:try_start_a .. :try_end_a} :catch_2

    goto :goto_2
.end method

.method protected onDestroy()V
    .locals 2

    .prologue
    .line 108
    iget-object v0, p0, Lcom/superwiss/game/playtest/MainActivity;->link:Lcom/superwiss/game/playtest/BluetoothLink;

    if-eqz v0, :cond_0

    iget-object v0, p0, Lcom/superwiss/game/playtest/MainActivity;->link:Lcom/superwiss/game/playtest/BluetoothLink;

    invoke-virtual {v0}, Lcom/superwiss/game/playtest/BluetoothLink;->stop()V

    .line 109
    :cond_0
    iget-object v0, p0, Lcom/superwiss/game/playtest/MainActivity;->webView:Landroid/webkit/WebView;

    if-eqz v0, :cond_1

    .line 110
    iget-object v0, p0, Lcom/superwiss/game/playtest/MainActivity;->webView:Landroid/webkit/WebView;

    const-string v1, "WissNative"

    invoke-virtual {v0, v1}, Landroid/webkit/WebView;->removeJavascriptInterface(Ljava/lang/String;)V

    .line 111
    iget-object v0, p0, Lcom/superwiss/game/playtest/MainActivity;->root:Landroid/widget/FrameLayout;

    iget-object v1, p0, Lcom/superwiss/game/playtest/MainActivity;->webView:Landroid/webkit/WebView;

    invoke-virtual {v0, v1}, Landroid/widget/FrameLayout;->removeView(Landroid/view/View;)V

    .line 112
    iget-object v0, p0, Lcom/superwiss/game/playtest/MainActivity;->webView:Landroid/webkit/WebView;

    invoke-virtual {v0}, Landroid/webkit/WebView;->stopLoading()V

    .line 113
    iget-object v0, p0, Lcom/superwiss/game/playtest/MainActivity;->webView:Landroid/webkit/WebView;

    invoke-virtual {v0}, Landroid/webkit/WebView;->destroy()V

    .line 114
    const/4 v0, 0x0

    iput-object v0, p0, Lcom/superwiss/game/playtest/MainActivity;->webView:Landroid/webkit/WebView;

    .line 116
    :cond_1
    invoke-super {p0}, Landroid/app/Activity;->onDestroy()V

    .line 117
    return-void
.end method

.method protected onPause()V
    .locals 3

    .prologue
    .line 88
    iget-object v0, p0, Lcom/superwiss/game/playtest/MainActivity;->webView:Landroid/webkit/WebView;

    if-eqz v0, :cond_0

    .line 89
    iget-object v0, p0, Lcom/superwiss/game/playtest/MainActivity;->webView:Landroid/webkit/WebView;

    const-string v1, "window.dispatchEvent(new Event(\'native-pause\'));"

    const/4 v2, 0x0

    invoke-virtual {v0, v1, v2}, Landroid/webkit/WebView;->evaluateJavascript(Ljava/lang/String;Landroid/webkit/ValueCallback;)V

    .line 90
    iget-object v0, p0, Lcom/superwiss/game/playtest/MainActivity;->webView:Landroid/webkit/WebView;

    invoke-virtual {v0}, Landroid/webkit/WebView;->onPause()V

    .line 92
    :cond_0
    iget-object v0, p0, Lcom/superwiss/game/playtest/MainActivity;->link:Lcom/superwiss/game/playtest/BluetoothLink;

    if-eqz v0, :cond_1

    iget-object v0, p0, Lcom/superwiss/game/playtest/MainActivity;->link:Lcom/superwiss/game/playtest/BluetoothLink;

    invoke-virtual {v0}, Lcom/superwiss/game/playtest/BluetoothLink;->stop()V

    .line 93
    :cond_1
    invoke-super {p0}, Landroid/app/Activity;->onPause()V

    .line 94
    return-void
.end method

.method public onRequestPermissionsResult(I[Ljava/lang/String;[I)V
    .locals 1

    .prologue
    .line 28
    invoke-super {p0, p1, p2, p3}, Landroid/app/Activity;->onRequestPermissionsResult(I[Ljava/lang/String;[I)V

    const/16 v0, 0x19a

    if-ne p1, v0, :cond_0

    array-length v0, p3

    if-lez v0, :cond_1

    const/4 v0, 0x0

    aget v0, p3, v0

    if-nez v0, :cond_1

    iget-object v0, p0, Lcom/superwiss/game/playtest/MainActivity;->link:Lcom/superwiss/game/playtest/BluetoothLink;

    invoke-virtual {v0}, Lcom/superwiss/game/playtest/BluetoothLink;->devices()V

    :cond_0
    :goto_0
    return-void

    :cond_1
    const-string v0, "Nearby devices permission denied. Offline play still works."

    invoke-virtual {p0, v0}, Lcom/superwiss/game/playtest/MainActivity;->nativeError(Ljava/lang/String;)V

    goto :goto_0
.end method

.method protected onResume()V
    .locals 3

    .prologue
    .line 96
    invoke-super {p0}, Landroid/app/Activity;->onResume()V

    .line 97
    iget-object v0, p0, Lcom/superwiss/game/playtest/MainActivity;->webView:Landroid/webkit/WebView;

    if-eqz v0, :cond_0

    .line 98
    iget-object v0, p0, Lcom/superwiss/game/playtest/MainActivity;->webView:Landroid/webkit/WebView;

    invoke-virtual {v0}, Landroid/webkit/WebView;->onResume()V

    .line 99
    iget-object v0, p0, Lcom/superwiss/game/playtest/MainActivity;->webView:Landroid/webkit/WebView;

    const-string v1, "window.dispatchEvent(new Event(\'native-resume\'));"

    const/4 v2, 0x0

    invoke-virtual {v0, v1, v2}, Landroid/webkit/WebView;->evaluateJavascript(Ljava/lang/String;Landroid/webkit/ValueCallback;)V

    .line 101
    :cond_0
    invoke-direct {p0}, Lcom/superwiss/game/playtest/MainActivity;->immersive()V

    .line 102
    return-void
.end method

.method public onWindowFocusChanged(Z)V
    .locals 0

    .prologue
    .line 104
    invoke-super {p0, p1}, Landroid/app/Activity;->onWindowFocusChanged(Z)V

    .line 105
    if-eqz p1, :cond_0

    invoke-direct {p0}, Lcom/superwiss/game/playtest/MainActivity;->immersive()V

    .line 106
    :cond_0
    return-void
.end method
