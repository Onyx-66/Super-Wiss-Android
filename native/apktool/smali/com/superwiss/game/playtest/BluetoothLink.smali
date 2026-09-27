.class public final Lcom/superwiss/game/playtest/BluetoothLink;
.super Ljava/lang/Object;
.source "BluetoothLink.java"


# annotations
.annotation system Ldalvik/annotation/MemberClasses;
    value = {
        Lcom/superwiss/game/playtest/BluetoothLink$Listener;,
        Lcom/superwiss/game/playtest/BluetoothLink$Peer;
    }
.end annotation


# static fields
.field private static final SERVICES:[Ljava/util/UUID;


# instance fields
.field private volatile generation:I

.field private final listener:Lcom/superwiss/game/playtest/BluetoothLink$Listener;

.field private final listeners:Ljava/util/List;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Ljava/util/List",
            "<",
            "Landroid/bluetooth/BluetoothServerSocket;",
            ">;"
        }
    .end annotation
.end field

.field private final peers:Ljava/util/Map;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Ljava/util/Map",
            "<",
            "Ljava/lang/String;",
            "Lcom/superwiss/game/playtest/BluetoothLink$Peer;",
            ">;"
        }
    .end annotation
.end field

.field private volatile pending:Landroid/bluetooth/BluetoothSocket;


# direct methods
.method static constructor <clinit>()V
    .locals 3

    .prologue
    .line 17
    const/4 v0, 0x3

    new-array v0, v0, [Ljava/util/UUID;

    const/4 v1, 0x0

    const-string v2, "9953e646-d73e-4f89-93f2-7627a5f0b401"

    invoke-static {v2}, Ljava/util/UUID;->fromString(Ljava/lang/String;)Ljava/util/UUID;

    move-result-object v2

    aput-object v2, v0, v1

    const/4 v1, 0x1

    const-string v2, "9953e646-d73e-4f89-93f2-7627a5f0b402"

    invoke-static {v2}, Ljava/util/UUID;->fromString(Ljava/lang/String;)Ljava/util/UUID;

    move-result-object v2

    aput-object v2, v0, v1

    const/4 v1, 0x2

    const-string v2, "9953e646-d73e-4f89-93f2-7627a5f0b403"

    invoke-static {v2}, Ljava/util/UUID;->fromString(Ljava/lang/String;)Ljava/util/UUID;

    move-result-object v2

    aput-object v2, v0, v1

    sput-object v0, Lcom/superwiss/game/playtest/BluetoothLink;->SERVICES:[Ljava/util/UUID;

    return-void
.end method

.method public constructor <init>(Lcom/superwiss/game/playtest/BluetoothLink$Listener;)V
    .locals 1

    .prologue
    .line 23
    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    .line 19
    new-instance v0, Ljava/util/concurrent/ConcurrentHashMap;

    invoke-direct {v0}, Ljava/util/concurrent/ConcurrentHashMap;-><init>()V

    iput-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink;->peers:Ljava/util/Map;

    .line 20
    new-instance v0, Ljava/util/ArrayList;

    invoke-direct {v0}, Ljava/util/ArrayList;-><init>()V

    invoke-static {v0}, Ljava/util/Collections;->synchronizedList(Ljava/util/List;)Ljava/util/List;

    move-result-object v0

    iput-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink;->listeners:Ljava/util/List;

    .line 22
    const/4 v0, 0x0

    iput v0, p0, Lcom/superwiss/game/playtest/BluetoothLink;->generation:I

    .line 23
    iput-object p1, p0, Lcom/superwiss/game/playtest/BluetoothLink;->listener:Lcom/superwiss/game/playtest/BluetoothLink$Listener;

    return-void
.end method

.method static synthetic access$000()[Ljava/util/UUID;
    .locals 1

    .prologue
    .line 15
    sget-object v0, Lcom/superwiss/game/playtest/BluetoothLink;->SERVICES:[Ljava/util/UUID;

    return-object v0
.end method

.method static synthetic access$100(Lcom/superwiss/game/playtest/BluetoothLink;)Landroid/bluetooth/BluetoothAdapter;
    .locals 1
    .annotation system Ldalvik/annotation/Throws;
        value = {
            Ljava/io/IOException;
        }
    .end annotation

    .prologue
    .line 15
    invoke-direct {p0}, Lcom/superwiss/game/playtest/BluetoothLink;->adapter()Landroid/bluetooth/BluetoothAdapter;

    move-result-object v0

    return-object v0
.end method

.method static synthetic access$200(Lcom/superwiss/game/playtest/BluetoothLink;)Ljava/util/List;
    .locals 1

    .prologue
    .line 15
    iget-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink;->listeners:Ljava/util/List;

    return-object v0
.end method

.method static synthetic access$300(Lcom/superwiss/game/playtest/BluetoothLink;)I
    .locals 1

    .prologue
    .line 15
    iget v0, p0, Lcom/superwiss/game/playtest/BluetoothLink;->generation:I

    return v0
.end method

.method static synthetic access$400(Lcom/superwiss/game/playtest/BluetoothLink;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V
    .locals 0

    .prologue
    .line 15
    invoke-direct {p0, p1, p2, p3}, Lcom/superwiss/game/playtest/BluetoothLink;->post(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V

    return-void
.end method

.method static synthetic access$500(Lcom/superwiss/game/playtest/BluetoothLink;Ljava/lang/String;Landroid/bluetooth/BluetoothSocket;I)V
    .locals 0
    .annotation system Ldalvik/annotation/Throws;
        value = {
            Ljava/io/IOException;
        }
    .end annotation

    .prologue
    .line 15
    invoke-direct {p0, p1, p2, p3}, Lcom/superwiss/game/playtest/BluetoothLink;->attach(Ljava/lang/String;Landroid/bluetooth/BluetoothSocket;I)V

    return-void
.end method

.method static synthetic access$600(Ljava/lang/Exception;)Ljava/lang/String;
    .locals 1

    .prologue
    .line 15
    invoke-static {p0}, Lcom/superwiss/game/playtest/BluetoothLink;->safe(Ljava/lang/Exception;)Ljava/lang/String;

    move-result-object v0

    return-object v0
.end method

.method static synthetic access$702(Lcom/superwiss/game/playtest/BluetoothLink;Landroid/bluetooth/BluetoothSocket;)Landroid/bluetooth/BluetoothSocket;
    .locals 0

    .prologue
    .line 15
    iput-object p1, p0, Lcom/superwiss/game/playtest/BluetoothLink;->pending:Landroid/bluetooth/BluetoothSocket;

    return-object p1
.end method

.method static synthetic access$800(Lcom/superwiss/game/playtest/BluetoothLink;)Ljava/util/Map;
    .locals 1

    .prologue
    .line 15
    iget-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink;->peers:Ljava/util/Map;

    return-object v0
.end method

.method private adapter()Landroid/bluetooth/BluetoothAdapter;
    .locals 2
    .annotation system Ldalvik/annotation/Throws;
        value = {
            Ljava/io/IOException;
        }
    .end annotation

    .prologue
    .line 25
    invoke-static {}, Landroid/bluetooth/BluetoothAdapter;->getDefaultAdapter()Landroid/bluetooth/BluetoothAdapter;

    move-result-object v0

    if-nez v0, :cond_0

    new-instance v0, Ljava/io/IOException;

    const-string v1, "This phone has no Bluetooth adapter."

    invoke-direct {v0, v1}, Ljava/io/IOException;-><init>(Ljava/lang/String;)V

    throw v0

    :cond_0
    invoke-virtual {v0}, Landroid/bluetooth/BluetoothAdapter;->isEnabled()Z

    move-result v1

    if-nez v1, :cond_1

    new-instance v0, Ljava/io/IOException;

    const-string v1, "Turn on Bluetooth in Android settings first."

    invoke-direct {v0, v1}, Ljava/io/IOException;-><init>(Ljava/lang/String;)V

    throw v0

    :cond_1
    return-object v0
.end method

.method private declared-synchronized attach(Ljava/lang/String;Landroid/bluetooth/BluetoothSocket;I)V
    .locals 3
    .annotation system Ldalvik/annotation/Throws;
        value = {
            Ljava/io/IOException;
        }
    .end annotation

    .prologue
    .line 29
    monitor-enter p0

    :try_start_0
    iget v0, p0, Lcom/superwiss/game/playtest/BluetoothLink;->generation:I

    if-eq p3, v0, :cond_0

    invoke-virtual {p2}, Landroid/bluetooth/BluetoothSocket;->close()V
    :try_end_0
    .catchall {:try_start_0 .. :try_end_0} :catchall_0

    :goto_0
    monitor-exit p0

    return-void

    :cond_0
    :try_start_1
    iget-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink;->peers:Ljava/util/Map;

    invoke-interface {v0, p1}, Ljava/util/Map;->containsKey(Ljava/lang/Object;)Z

    move-result v0

    if-nez v0, :cond_1

    iget-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink;->peers:Ljava/util/Map;

    invoke-interface {v0}, Ljava/util/Map;->size()I

    move-result v0

    const/4 v1, 0x3

    if-lt v0, v1, :cond_2

    :cond_1
    invoke-virtual {p2}, Landroid/bluetooth/BluetoothSocket;->close()V
    :try_end_1
    .catchall {:try_start_1 .. :try_end_1} :catchall_0

    goto :goto_0

    :catchall_0
    move-exception v0

    monitor-exit p0

    throw v0

    :cond_2
    :try_start_2
    new-instance v0, Lcom/superwiss/game/playtest/BluetoothLink$Peer;

    invoke-direct {v0, p0, p1, p2, p3}, Lcom/superwiss/game/playtest/BluetoothLink$Peer;-><init>(Lcom/superwiss/game/playtest/BluetoothLink;Ljava/lang/String;Landroid/bluetooth/BluetoothSocket;I)V

    iget-object v1, p0, Lcom/superwiss/game/playtest/BluetoothLink;->peers:Ljava/util/Map;

    invoke-interface {v1, p1, v0}, Ljava/util/Map;->put(Ljava/lang/Object;Ljava/lang/Object;)Ljava/lang/Object;

    const-string v1, "connected"

    const-string v2, ""

    invoke-direct {p0, v1, p1, v2}, Lcom/superwiss/game/playtest/BluetoothLink;->post(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V

    invoke-virtual {v0}, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->start()V
    :try_end_2
    .catchall {:try_start_2 .. :try_end_2} :catchall_0

    goto :goto_0
.end method

.method private post(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V
    .locals 2

    .prologue
    .line 24
    :try_start_0
    new-instance v1, Lorg/json/JSONObject;

    invoke-direct {v1}, Lorg/json/JSONObject;-><init>()V

    const-string v0, "type"

    invoke-virtual {v1, v0, p1}, Lorg/json/JSONObject;->put(Ljava/lang/String;Ljava/lang/Object;)Lorg/json/JSONObject;

    const-string v0, "peer"

    invoke-virtual {v1, v0, p2}, Lorg/json/JSONObject;->put(Ljava/lang/String;Ljava/lang/Object;)Lorg/json/JSONObject;

    const-string v0, "message"

    invoke-virtual {p1, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-eqz v0, :cond_0

    const-string v0, "payload"

    :goto_0
    invoke-virtual {v1, v0, p3}, Lorg/json/JSONObject;->put(Ljava/lang/String;Ljava/lang/Object;)Lorg/json/JSONObject;

    iget-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink;->listener:Lcom/superwiss/game/playtest/BluetoothLink$Listener;

    invoke-interface {v0, v1}, Lcom/superwiss/game/playtest/BluetoothLink$Listener;->event(Lorg/json/JSONObject;)V

    :goto_1
    return-void

    :cond_0
    const-string v0, "text"
    :try_end_0
    .catch Lorg/json/JSONException; {:try_start_0 .. :try_end_0} :catch_0

    goto :goto_0

    :catch_0
    move-exception v0

    goto :goto_1
.end method

.method private static safe(Ljava/lang/Exception;)Ljava/lang/String;
    .locals 2

    .prologue
    .line 33
    instance-of v0, p0, Ljava/lang/SecurityException;

    if-eqz v0, :cond_0

    const-string v0, "Nearby devices permission is required. Allow it in Android settings."

    :goto_0
    return-object v0

    :cond_0
    new-instance v0, Ljava/lang/StringBuilder;

    invoke-direct {v0}, Ljava/lang/StringBuilder;-><init>()V

    const-string v1, "Bluetooth unavailable: "

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    move-result-object v0

    invoke-virtual {p0}, Ljava/lang/Exception;->getMessage()Ljava/lang/String;

    move-result-object v1

    invoke-static {v1}, Ljava/lang/String;->valueOf(Ljava/lang/Object;)Ljava/lang/String;

    move-result-object v1

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    move-result-object v0

    invoke-virtual {v0}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    goto :goto_0
.end method


# virtual methods
.method public devices()V
    .locals 6

    .prologue
    .line 26
    :try_start_0
    new-instance v2, Lorg/json/JSONArray;

    invoke-direct {v2}, Lorg/json/JSONArray;-><init>()V

    invoke-direct {p0}, Lcom/superwiss/game/playtest/BluetoothLink;->adapter()Landroid/bluetooth/BluetoothAdapter;

    move-result-object v0

    invoke-virtual {v0}, Landroid/bluetooth/BluetoothAdapter;->getBondedDevices()Ljava/util/Set;

    move-result-object v0

    invoke-interface {v0}, Ljava/util/Set;->iterator()Ljava/util/Iterator;

    move-result-object v3

    :goto_0
    invoke-interface {v3}, Ljava/util/Iterator;->hasNext()Z

    move-result v0

    if-eqz v0, :cond_1

    invoke-interface {v3}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v0

    check-cast v0, Landroid/bluetooth/BluetoothDevice;

    new-instance v4, Lorg/json/JSONObject;

    invoke-direct {v4}, Lorg/json/JSONObject;-><init>()V

    const-string v5, "name"

    invoke-virtual {v0}, Landroid/bluetooth/BluetoothDevice;->getName()Ljava/lang/String;

    move-result-object v1

    if-nez v1, :cond_0

    const-string v1, "Paired device"

    :goto_1
    invoke-virtual {v4, v5, v1}, Lorg/json/JSONObject;->put(Ljava/lang/String;Ljava/lang/Object;)Lorg/json/JSONObject;

    const-string v1, "address"

    invoke-virtual {v0}, Landroid/bluetooth/BluetoothDevice;->getAddress()Ljava/lang/String;

    move-result-object v0

    invoke-virtual {v4, v1, v0}, Lorg/json/JSONObject;->put(Ljava/lang/String;Ljava/lang/Object;)Lorg/json/JSONObject;

    invoke-virtual {v2, v4}, Lorg/json/JSONArray;->put(Ljava/lang/Object;)Lorg/json/JSONArray;
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_0

    goto :goto_0

    :catch_0
    move-exception v0

    const-string v1, "error"

    const-string v2, ""

    invoke-static {v0}, Lcom/superwiss/game/playtest/BluetoothLink;->safe(Ljava/lang/Exception;)Ljava/lang/String;

    move-result-object v0

    invoke-direct {p0, v1, v2, v0}, Lcom/superwiss/game/playtest/BluetoothLink;->post(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V

    :goto_2
    return-void

    :cond_0
    :try_start_1
    invoke-virtual {v0}, Landroid/bluetooth/BluetoothDevice;->getName()Ljava/lang/String;

    move-result-object v1

    goto :goto_1

    :cond_1
    new-instance v0, Lorg/json/JSONObject;

    invoke-direct {v0}, Lorg/json/JSONObject;-><init>()V

    const-string v1, "type"

    const-string v3, "devices"

    invoke-virtual {v0, v1, v3}, Lorg/json/JSONObject;->put(Ljava/lang/String;Ljava/lang/Object;)Lorg/json/JSONObject;

    const-string v1, "devices"

    invoke-virtual {v0, v1, v2}, Lorg/json/JSONObject;->put(Ljava/lang/String;Ljava/lang/Object;)Lorg/json/JSONObject;

    iget-object v1, p0, Lcom/superwiss/game/playtest/BluetoothLink;->listener:Lcom/superwiss/game/playtest/BluetoothLink$Listener;

    invoke-interface {v1, v0}, Lcom/superwiss/game/playtest/BluetoothLink$Listener;->event(Lorg/json/JSONObject;)V
    :try_end_1
    .catch Ljava/lang/Exception; {:try_start_1 .. :try_end_1} :catch_0

    goto :goto_2
.end method

.method public host()V
    .locals 6

    .prologue
    .line 27
    invoke-virtual {p0}, Lcom/superwiss/game/playtest/BluetoothLink;->stop()V

    iget v1, p0, Lcom/superwiss/game/playtest/BluetoothLink;->generation:I

    const/4 v0, 0x0

    :goto_0
    const/4 v2, 0x3

    if-ge v0, v2, :cond_0

    new-instance v2, Ljava/lang/Thread;

    new-instance v3, Lcom/superwiss/game/playtest/BluetoothLink$1;

    invoke-direct {v3, p0, v0, v1}, Lcom/superwiss/game/playtest/BluetoothLink$1;-><init>(Lcom/superwiss/game/playtest/BluetoothLink;II)V

    new-instance v4, Ljava/lang/StringBuilder;

    invoke-direct {v4}, Ljava/lang/StringBuilder;-><init>()V

    const-string v5, "Wiss-accept-"

    invoke-virtual {v4, v5}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    move-result-object v4

    invoke-virtual {v4, v0}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    move-result-object v4

    invoke-virtual {v4}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v4

    invoke-direct {v2, v3, v4}, Ljava/lang/Thread;-><init>(Ljava/lang/Runnable;Ljava/lang/String;)V

    invoke-virtual {v2}, Ljava/lang/Thread;->start()V

    add-int/lit8 v0, v0, 0x1

    goto :goto_0

    :cond_0
    return-void
.end method

.method public join(Ljava/lang/String;)V
    .locals 3

    .prologue
    .line 28
    if-eqz p1, :cond_0

    const-string v0, "(?i)[0-9a-f]{2}(:[0-9a-f]{2}){5}"

    invoke-virtual {p1, v0}, Ljava/lang/String;->matches(Ljava/lang/String;)Z

    move-result v0

    if-nez v0, :cond_1

    :cond_0
    const-string v0, "error"

    const-string v1, ""

    const-string v2, "Select a paired host."

    invoke-direct {p0, v0, v1, v2}, Lcom/superwiss/game/playtest/BluetoothLink;->post(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V

    :goto_0
    return-void

    :cond_1
    invoke-virtual {p0}, Lcom/superwiss/game/playtest/BluetoothLink;->stop()V

    iget v0, p0, Lcom/superwiss/game/playtest/BluetoothLink;->generation:I

    new-instance v1, Ljava/lang/Thread;

    new-instance v2, Lcom/superwiss/game/playtest/BluetoothLink$2;

    invoke-direct {v2, p0, p1, v0}, Lcom/superwiss/game/playtest/BluetoothLink$2;-><init>(Lcom/superwiss/game/playtest/BluetoothLink;Ljava/lang/String;I)V

    const-string v0, "Wiss-connect"

    invoke-direct {v1, v2, v0}, Ljava/lang/Thread;-><init>(Ljava/lang/Runnable;Ljava/lang/String;)V

    invoke-virtual {v1}, Ljava/lang/Thread;->start()V

    goto :goto_0
.end method

.method public kick(Ljava/lang/String;)V
    .locals 1

    .prologue
    .line 31
    iget-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink;->peers:Ljava/util/Map;

    invoke-interface {v0, p1}, Ljava/util/Map;->get(Ljava/lang/Object;)Ljava/lang/Object;

    move-result-object v0

    check-cast v0, Lcom/superwiss/game/playtest/BluetoothLink$Peer;

    if-eqz v0, :cond_0

    invoke-virtual {v0}, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->close()V

    :cond_0
    return-void
.end method

.method public send(Ljava/lang/String;Ljava/lang/String;)V
    .locals 3

    .prologue
    const v2, 0x8000

    .line 30
    if-eqz p2, :cond_0

    invoke-virtual {p2}, Ljava/lang/String;->length()I

    move-result v0

    if-le v0, v2, :cond_1

    :cond_0
    :goto_0
    return-void

    :cond_1
    sget-object v0, Ljava/nio/charset/StandardCharsets;->UTF_8:Ljava/nio/charset/Charset;

    invoke-virtual {p2, v0}, Ljava/lang/String;->getBytes(Ljava/nio/charset/Charset;)[B

    move-result-object v1

    array-length v0, v1

    if-eqz v0, :cond_0

    array-length v0, v1

    if-gt v0, v2, :cond_0

    iget-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink;->peers:Ljava/util/Map;

    invoke-interface {v0, p1}, Ljava/util/Map;->get(Ljava/lang/Object;)Ljava/lang/Object;

    move-result-object v0

    check-cast v0, Lcom/superwiss/game/playtest/BluetoothLink$Peer;

    if-eqz v0, :cond_0

    iget-object v2, v0, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->outgoing:Ljava/util/concurrent/ArrayBlockingQueue;

    invoke-virtual {v2, v1}, Ljava/util/concurrent/ArrayBlockingQueue;->offer(Ljava/lang/Object;)Z

    move-result v1

    if-nez v1, :cond_0

    invoke-virtual {v0}, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->close()V

    const-string v0, "error"

    const-string v1, "Bluetooth connection is congested. Match cancelled."

    invoke-direct {p0, v0, p1, v1}, Lcom/superwiss/game/playtest/BluetoothLink;->post(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V

    goto :goto_0
.end method

.method public declared-synchronized stop()V
    .locals 3

    .prologue
    .line 32
    monitor-enter p0

    :try_start_0
    iget v0, p0, Lcom/superwiss/game/playtest/BluetoothLink;->generation:I

    add-int/lit8 v0, v0, 0x1

    iput v0, p0, Lcom/superwiss/game/playtest/BluetoothLink;->generation:I

    iget-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink;->pending:Landroid/bluetooth/BluetoothSocket;

    const/4 v1, 0x0

    iput-object v1, p0, Lcom/superwiss/game/playtest/BluetoothLink;->pending:Landroid/bluetooth/BluetoothSocket;
    :try_end_0
    .catchall {:try_start_0 .. :try_end_0} :catchall_0

    if-eqz v0, :cond_0

    :try_start_1
    invoke-virtual {v0}, Landroid/bluetooth/BluetoothSocket;->close()V
    :try_end_1
    .catch Ljava/io/IOException; {:try_start_1 .. :try_end_1} :catch_1
    .catchall {:try_start_1 .. :try_end_1} :catchall_0

    :cond_0
    :goto_0
    :try_start_2
    iget-object v1, p0, Lcom/superwiss/game/playtest/BluetoothLink;->listeners:Ljava/util/List;

    monitor-enter v1
    :try_end_2
    .catchall {:try_start_2 .. :try_end_2} :catchall_0

    :try_start_3
    iget-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink;->listeners:Ljava/util/List;

    invoke-interface {v0}, Ljava/util/List;->iterator()Ljava/util/Iterator;

    move-result-object v2

    :goto_1
    invoke-interface {v2}, Ljava/util/Iterator;->hasNext()Z

    move-result v0

    if-eqz v0, :cond_1

    invoke-interface {v2}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v0

    check-cast v0, Landroid/bluetooth/BluetoothServerSocket;
    :try_end_3
    .catchall {:try_start_3 .. :try_end_3} :catchall_1

    :try_start_4
    invoke-virtual {v0}, Landroid/bluetooth/BluetoothServerSocket;->close()V
    :try_end_4
    .catch Ljava/io/IOException; {:try_start_4 .. :try_end_4} :catch_0
    .catchall {:try_start_4 .. :try_end_4} :catchall_1

    goto :goto_1

    :catch_0
    move-exception v0

    goto :goto_1

    :cond_1
    :try_start_5
    iget-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink;->listeners:Ljava/util/List;

    invoke-interface {v0}, Ljava/util/List;->clear()V

    monitor-exit v1
    :try_end_5
    .catchall {:try_start_5 .. :try_end_5} :catchall_1

    :try_start_6
    iget-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink;->peers:Ljava/util/Map;

    invoke-interface {v0}, Ljava/util/Map;->values()Ljava/util/Collection;

    move-result-object v0

    invoke-interface {v0}, Ljava/util/Collection;->iterator()Ljava/util/Iterator;

    move-result-object v1

    :goto_2
    invoke-interface {v1}, Ljava/util/Iterator;->hasNext()Z

    move-result v0

    if-eqz v0, :cond_2

    invoke-interface {v1}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v0

    check-cast v0, Lcom/superwiss/game/playtest/BluetoothLink$Peer;

    invoke-virtual {v0}, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->close()V
    :try_end_6
    .catchall {:try_start_6 .. :try_end_6} :catchall_0

    goto :goto_2

    :catchall_0
    move-exception v0

    monitor-exit p0

    throw v0

    :catchall_1
    move-exception v0

    :try_start_7
    monitor-exit v1
    :try_end_7
    .catchall {:try_start_7 .. :try_end_7} :catchall_1

    :try_start_8
    throw v0

    :cond_2
    iget-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink;->peers:Ljava/util/Map;

    invoke-interface {v0}, Ljava/util/Map;->clear()V
    :try_end_8
    .catchall {:try_start_8 .. :try_end_8} :catchall_0

    monitor-exit p0

    return-void

    :catch_1
    move-exception v0

    goto :goto_0
.end method
