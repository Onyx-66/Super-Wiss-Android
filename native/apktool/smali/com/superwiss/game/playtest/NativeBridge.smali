.class public final Lcom/superwiss/game/playtest/NativeBridge;
.super Ljava/lang/Object;
.source "NativeBridge.java"


# instance fields
.field private final activity:Lcom/superwiss/game/playtest/MainActivity;

.field private final link:Lcom/superwiss/game/playtest/BluetoothLink;


# direct methods
.method constructor <init>(Lcom/superwiss/game/playtest/MainActivity;Lcom/superwiss/game/playtest/BluetoothLink;)V
    .locals 0

    .prologue
    .line 13
    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    iput-object p1, p0, Lcom/superwiss/game/playtest/NativeBridge;->activity:Lcom/superwiss/game/playtest/MainActivity;

    iput-object p2, p0, Lcom/superwiss/game/playtest/NativeBridge;->link:Lcom/superwiss/game/playtest/BluetoothLink;

    return-void
.end method

.method static synthetic access$000(Lcom/superwiss/game/playtest/NativeBridge;)Lcom/superwiss/game/playtest/MainActivity;
    .locals 1

    .prologue
    .line 11
    iget-object v0, p0, Lcom/superwiss/game/playtest/NativeBridge;->activity:Lcom/superwiss/game/playtest/MainActivity;

    return-object v0
.end method

.method static synthetic access$100(Lcom/superwiss/game/playtest/NativeBridge;)Lcom/superwiss/game/playtest/BluetoothLink;
    .locals 1

    .prologue
    .line 11
    iget-object v0, p0, Lcom/superwiss/game/playtest/NativeBridge;->link:Lcom/superwiss/game/playtest/BluetoothLink;

    return-object v0
.end method

.method private allowed()Z
    .locals 2

    .prologue
    .line 22
    sget v0, Landroid/os/Build$VERSION;->SDK_INT:I

    const/16 v1, 0x1f

    if-lt v0, v1, :cond_0

    iget-object v0, p0, Lcom/superwiss/game/playtest/NativeBridge;->activity:Lcom/superwiss/game/playtest/MainActivity;

    const-string v1, "android.permission.BLUETOOTH_CONNECT"

    invoke-virtual {v0, v1}, Lcom/superwiss/game/playtest/MainActivity;->checkSelfPermission(Ljava/lang/String;)I

    move-result v0

    if-nez v0, :cond_1

    :cond_0
    const/4 v0, 0x1

    :goto_0
    return v0

    :cond_1
    iget-object v0, p0, Lcom/superwiss/game/playtest/NativeBridge;->activity:Lcom/superwiss/game/playtest/MainActivity;

    const-string v1, "Allow Nearby devices before hosting or joining."

    invoke-virtual {v0, v1}, Lcom/superwiss/game/playtest/MainActivity;->nativeError(Ljava/lang/String;)V

    const/4 v0, 0x0

    goto :goto_0
.end method


# virtual methods
.method public capabilities()Ljava/lang/String;
    .locals 1
    .annotation runtime Landroid/webkit/JavascriptInterface;
    .end annotation

    .prologue
    .line 14
    const-string v0, "{\"bluetooth\":true,\"share\":true,\"haptics\":true,\"protocol\":4}"

    return-object v0
.end method

.method public devices()V
    .locals 1
    .annotation runtime Landroid/webkit/JavascriptInterface;
    .end annotation

    .prologue
    .line 16
    iget-object v0, p0, Lcom/superwiss/game/playtest/NativeBridge;->link:Lcom/superwiss/game/playtest/BluetoothLink;

    invoke-virtual {v0}, Lcom/superwiss/game/playtest/BluetoothLink;->devices()V

    return-void
.end method

.method public haptic(Ljava/lang/String;)V
    .locals 2
    .annotation runtime Landroid/webkit/JavascriptInterface;
    .end annotation

    .prologue
    .line 26
    iget-object v0, p0, Lcom/superwiss/game/playtest/NativeBridge;->activity:Lcom/superwiss/game/playtest/MainActivity;

    new-instance v1, Lcom/superwiss/game/playtest/NativeBridge$4;

    invoke-direct {v1, p0}, Lcom/superwiss/game/playtest/NativeBridge$4;-><init>(Lcom/superwiss/game/playtest/NativeBridge;)V

    invoke-virtual {v0, v1}, Lcom/superwiss/game/playtest/MainActivity;->runOnUiThread(Ljava/lang/Runnable;)V

    return-void
.end method

.method public host()V
    .locals 1
    .annotation runtime Landroid/webkit/JavascriptInterface;
    .end annotation

    .prologue
    .line 17
    invoke-direct {p0}, Lcom/superwiss/game/playtest/NativeBridge;->allowed()Z

    move-result v0

    if-eqz v0, :cond_0

    iget-object v0, p0, Lcom/superwiss/game/playtest/NativeBridge;->link:Lcom/superwiss/game/playtest/BluetoothLink;

    invoke-virtual {v0}, Lcom/superwiss/game/playtest/BluetoothLink;->host()V

    :cond_0
    return-void
.end method

.method public join(Ljava/lang/String;)V
    .locals 1
    .annotation runtime Landroid/webkit/JavascriptInterface;
    .end annotation

    .prologue
    .line 18
    invoke-direct {p0}, Lcom/superwiss/game/playtest/NativeBridge;->allowed()Z

    move-result v0

    if-eqz v0, :cond_0

    iget-object v0, p0, Lcom/superwiss/game/playtest/NativeBridge;->link:Lcom/superwiss/game/playtest/BluetoothLink;

    invoke-virtual {v0, p1}, Lcom/superwiss/game/playtest/BluetoothLink;->join(Ljava/lang/String;)V

    :cond_0
    return-void
.end method

.method public kick(Ljava/lang/String;)V
    .locals 1
    .annotation runtime Landroid/webkit/JavascriptInterface;
    .end annotation

    .prologue
    .line 20
    iget-object v0, p0, Lcom/superwiss/game/playtest/NativeBridge;->link:Lcom/superwiss/game/playtest/BluetoothLink;

    invoke-virtual {v0, p1}, Lcom/superwiss/game/playtest/BluetoothLink;->kick(Ljava/lang/String;)V

    return-void
.end method

.method public openBluetoothSettings()V
    .locals 2
    .annotation runtime Landroid/webkit/JavascriptInterface;
    .end annotation

    .prologue
    .line 23
    iget-object v0, p0, Lcom/superwiss/game/playtest/NativeBridge;->activity:Lcom/superwiss/game/playtest/MainActivity;

    new-instance v1, Lcom/superwiss/game/playtest/NativeBridge$2;

    invoke-direct {v1, p0}, Lcom/superwiss/game/playtest/NativeBridge$2;-><init>(Lcom/superwiss/game/playtest/NativeBridge;)V

    invoke-virtual {v0, v1}, Lcom/superwiss/game/playtest/MainActivity;->runOnUiThread(Ljava/lang/Runnable;)V

    return-void
.end method

.method public requestBluetooth()V
    .locals 2
    .annotation runtime Landroid/webkit/JavascriptInterface;
    .end annotation

    .prologue
    .line 15
    iget-object v0, p0, Lcom/superwiss/game/playtest/NativeBridge;->activity:Lcom/superwiss/game/playtest/MainActivity;

    new-instance v1, Lcom/superwiss/game/playtest/NativeBridge$1;

    invoke-direct {v1, p0}, Lcom/superwiss/game/playtest/NativeBridge$1;-><init>(Lcom/superwiss/game/playtest/NativeBridge;)V

    invoke-virtual {v0, v1}, Lcom/superwiss/game/playtest/MainActivity;->runOnUiThread(Ljava/lang/Runnable;)V

    return-void
.end method

.method public send(Ljava/lang/String;Ljava/lang/String;)V
    .locals 1
    .annotation runtime Landroid/webkit/JavascriptInterface;
    .end annotation

    .prologue
    .line 19
    iget-object v0, p0, Lcom/superwiss/game/playtest/NativeBridge;->link:Lcom/superwiss/game/playtest/BluetoothLink;

    invoke-virtual {v0, p1, p2}, Lcom/superwiss/game/playtest/BluetoothLink;->send(Ljava/lang/String;Ljava/lang/String;)V

    return-void
.end method

.method public setApiOrigin(Ljava/lang/String;)V
    .locals 4
    .annotation runtime Landroid/webkit/JavascriptInterface;
    .end annotation

    .prologue
    .line 24
    if-eqz p1, :cond_0

    invoke-virtual {p1}, Ljava/lang/String;->isEmpty()Z

    move-result v0

    if-eqz v0, :cond_2

    :cond_0
    iget-object v0, p0, Lcom/superwiss/game/playtest/NativeBridge;->activity:Lcom/superwiss/game/playtest/MainActivity;

    const-string v1, ""

    iput-object v1, v0, Lcom/superwiss/game/playtest/MainActivity;->apiOrigin:Ljava/lang/String;

    :cond_1
    :goto_0
    return-void

    :cond_2
    :try_start_0
    new-instance v0, Ljava/net/URI;

    invoke-direct {v0, p1}, Ljava/net/URI;-><init>(Ljava/lang/String;)V

    const-string v1, "https"

    invoke-virtual {v0}, Ljava/net/URI;->getScheme()Ljava/lang/String;

    move-result-object v2

    invoke-virtual {v1, v2}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v1

    if-eqz v1, :cond_1

    invoke-virtual {v0}, Ljava/net/URI;->getHost()Ljava/lang/String;

    move-result-object v1

    if-eqz v1, :cond_1

    invoke-virtual {v0}, Ljava/net/URI;->getUserInfo()Ljava/lang/String;

    move-result-object v1

    if-nez v1, :cond_1

    invoke-virtual {v0}, Ljava/net/URI;->getQuery()Ljava/lang/String;

    move-result-object v1

    if-nez v1, :cond_1

    invoke-virtual {v0}, Ljava/net/URI;->getFragment()Ljava/lang/String;

    move-result-object v1

    if-nez v1, :cond_1

    invoke-virtual {v0}, Ljava/net/URI;->getPath()Ljava/lang/String;

    move-result-object v1

    if-eqz v1, :cond_3

    invoke-virtual {v0}, Ljava/net/URI;->getPath()Ljava/lang/String;

    move-result-object v1

    invoke-virtual {v1}, Ljava/lang/String;->isEmpty()Z

    move-result v1

    if-nez v1, :cond_3

    invoke-virtual {v0}, Ljava/net/URI;->getPath()Ljava/lang/String;

    move-result-object v1

    const-string v2, "/"

    invoke-virtual {v1, v2}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v1

    if-eqz v1, :cond_1

    :cond_3
    iget-object v1, p0, Lcom/superwiss/game/playtest/NativeBridge;->activity:Lcom/superwiss/game/playtest/MainActivity;

    new-instance v2, Ljava/lang/StringBuilder;

    invoke-direct {v2}, Ljava/lang/StringBuilder;-><init>()V

    const-string v3, "https://"

    invoke-virtual {v2, v3}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    move-result-object v2

    invoke-virtual {v0}, Ljava/net/URI;->getRawAuthority()Ljava/lang/String;

    move-result-object v0

    invoke-virtual {v2, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    move-result-object v0

    invoke-virtual {v0}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    iput-object v0, v1, Lcom/superwiss/game/playtest/MainActivity;->apiOrigin:Ljava/lang/String;
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_0

    goto :goto_0

    :catch_0
    move-exception v0

    goto :goto_0
.end method

.method public share(Ljava/lang/String;)V
    .locals 3
    .annotation runtime Landroid/webkit/JavascriptInterface;
    .end annotation

    .prologue
    .line 25
    if-nez p1, :cond_0

    :goto_0
    return-void

    :cond_0
    const/4 v0, 0x0

    const/16 v1, 0x7d0

    invoke-virtual {p1}, Ljava/lang/String;->length()I

    move-result v2

    invoke-static {v1, v2}, Ljava/lang/Math;->min(II)I

    move-result v1

    invoke-virtual {p1, v0, v1}, Ljava/lang/String;->substring(II)Ljava/lang/String;

    move-result-object v0

    iget-object v1, p0, Lcom/superwiss/game/playtest/NativeBridge;->activity:Lcom/superwiss/game/playtest/MainActivity;

    new-instance v2, Lcom/superwiss/game/playtest/NativeBridge$3;

    invoke-direct {v2, p0, v0}, Lcom/superwiss/game/playtest/NativeBridge$3;-><init>(Lcom/superwiss/game/playtest/NativeBridge;Ljava/lang/String;)V

    invoke-virtual {v1, v2}, Lcom/superwiss/game/playtest/MainActivity;->runOnUiThread(Ljava/lang/Runnable;)V

    goto :goto_0
.end method

.method public stop()V
    .locals 1
    .annotation runtime Landroid/webkit/JavascriptInterface;
    .end annotation

    .prologue
    .line 21
    iget-object v0, p0, Lcom/superwiss/game/playtest/NativeBridge;->link:Lcom/superwiss/game/playtest/BluetoothLink;

    invoke-virtual {v0}, Lcom/superwiss/game/playtest/BluetoothLink;->stop()V

    return-void
.end method
