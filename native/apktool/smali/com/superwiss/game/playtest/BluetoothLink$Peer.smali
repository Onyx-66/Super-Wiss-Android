.class final Lcom/superwiss/game/playtest/BluetoothLink$Peer;
.super Ljava/lang/Object;
.source "BluetoothLink.java"


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = Lcom/superwiss/game/playtest/BluetoothLink;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x12
    name = "Peer"
.end annotation


# instance fields
.field volatile closed:Z

.field final gen:I

.field final id:Ljava/lang/String;

.field final outgoing:Ljava/util/concurrent/ArrayBlockingQueue;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Ljava/util/concurrent/ArrayBlockingQueue",
            "<[B>;"
        }
    .end annotation
.end field

.field reader:Ljava/lang/Thread;

.field final socket:Landroid/bluetooth/BluetoothSocket;

.field final synthetic this$0:Lcom/superwiss/game/playtest/BluetoothLink;

.field writer:Ljava/lang/Thread;


# direct methods
.method constructor <init>(Lcom/superwiss/game/playtest/BluetoothLink;Ljava/lang/String;Landroid/bluetooth/BluetoothSocket;I)V
    .locals 2

    .prologue
    .line 36
    iput-object p1, p0, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->this$0:Lcom/superwiss/game/playtest/BluetoothLink;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    .line 35
    new-instance v0, Ljava/util/concurrent/ArrayBlockingQueue;

    const/16 v1, 0x30

    invoke-direct {v0, v1}, Ljava/util/concurrent/ArrayBlockingQueue;-><init>(I)V

    iput-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->outgoing:Ljava/util/concurrent/ArrayBlockingQueue;

    const/4 v0, 0x0

    iput-boolean v0, p0, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->closed:Z

    .line 36
    iput-object p2, p0, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->id:Ljava/lang/String;

    iput-object p3, p0, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->socket:Landroid/bluetooth/BluetoothSocket;

    iput p4, p0, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->gen:I

    return-void
.end method


# virtual methods
.method declared-synchronized close()V
    .locals 4

    .prologue
    .line 39
    monitor-enter p0

    :try_start_0
    iget-boolean v0, p0, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->closed:Z
    :try_end_0
    .catchall {:try_start_0 .. :try_end_0} :catchall_0

    if-eqz v0, :cond_1

    :cond_0
    :goto_0
    monitor-exit p0

    return-void

    :cond_1
    const/4 v0, 0x1

    :try_start_1
    iput-boolean v0, p0, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->closed:Z
    :try_end_1
    .catchall {:try_start_1 .. :try_end_1} :catchall_0

    :try_start_2
    iget-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->socket:Landroid/bluetooth/BluetoothSocket;

    invoke-virtual {v0}, Landroid/bluetooth/BluetoothSocket;->close()V
    :try_end_2
    .catch Ljava/io/IOException; {:try_start_2 .. :try_end_2} :catch_0
    .catchall {:try_start_2 .. :try_end_2} :catchall_0

    :goto_1
    :try_start_3
    iget-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->outgoing:Ljava/util/concurrent/ArrayBlockingQueue;

    invoke-virtual {v0}, Ljava/util/concurrent/ArrayBlockingQueue;->clear()V

    iget-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->writer:Ljava/lang/Thread;

    if-eqz v0, :cond_2

    iget-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->writer:Ljava/lang/Thread;

    invoke-virtual {v0}, Ljava/lang/Thread;->interrupt()V

    :cond_2
    iget-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->this$0:Lcom/superwiss/game/playtest/BluetoothLink;

    invoke-static {v0}, Lcom/superwiss/game/playtest/BluetoothLink;->access$800(Lcom/superwiss/game/playtest/BluetoothLink;)Ljava/util/Map;

    move-result-object v0

    iget-object v1, p0, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->id:Ljava/lang/String;

    invoke-interface {v0, v1, p0}, Ljava/util/Map;->remove(Ljava/lang/Object;Ljava/lang/Object;)Z

    iget v0, p0, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->gen:I

    iget-object v1, p0, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->this$0:Lcom/superwiss/game/playtest/BluetoothLink;

    invoke-static {v1}, Lcom/superwiss/game/playtest/BluetoothLink;->access$300(Lcom/superwiss/game/playtest/BluetoothLink;)I

    move-result v1

    if-ne v0, v1, :cond_0

    iget-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->this$0:Lcom/superwiss/game/playtest/BluetoothLink;

    const-string v1, "disconnected"

    iget-object v2, p0, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->id:Ljava/lang/String;

    const-string v3, ""

    invoke-static {v0, v1, v2, v3}, Lcom/superwiss/game/playtest/BluetoothLink;->access$400(Lcom/superwiss/game/playtest/BluetoothLink;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V
    :try_end_3
    .catchall {:try_start_3 .. :try_end_3} :catchall_0

    goto :goto_0

    :catchall_0
    move-exception v0

    monitor-exit p0

    throw v0

    :catch_0
    move-exception v0

    goto :goto_1
.end method

.method start()V
    .locals 4

    .prologue
    .line 37
    new-instance v0, Ljava/lang/Thread;

    new-instance v1, Lcom/superwiss/game/playtest/BluetoothLink$Peer$1;

    invoke-direct {v1, p0}, Lcom/superwiss/game/playtest/BluetoothLink$Peer$1;-><init>(Lcom/superwiss/game/playtest/BluetoothLink$Peer;)V

    new-instance v2, Ljava/lang/StringBuilder;

    invoke-direct {v2}, Ljava/lang/StringBuilder;-><init>()V

    const-string v3, "Wiss-read-"

    invoke-virtual {v2, v3}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    move-result-object v2

    iget-object v3, p0, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->id:Ljava/lang/String;

    invoke-virtual {v2, v3}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    move-result-object v2

    invoke-virtual {v2}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v2

    invoke-direct {v0, v1, v2}, Ljava/lang/Thread;-><init>(Ljava/lang/Runnable;Ljava/lang/String;)V

    iput-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->reader:Ljava/lang/Thread;

    .line 38
    new-instance v0, Ljava/lang/Thread;

    new-instance v1, Lcom/superwiss/game/playtest/BluetoothLink$Peer$2;

    invoke-direct {v1, p0}, Lcom/superwiss/game/playtest/BluetoothLink$Peer$2;-><init>(Lcom/superwiss/game/playtest/BluetoothLink$Peer;)V

    new-instance v2, Ljava/lang/StringBuilder;

    invoke-direct {v2}, Ljava/lang/StringBuilder;-><init>()V

    const-string v3, "Wiss-write-"

    invoke-virtual {v2, v3}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    move-result-object v2

    iget-object v3, p0, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->id:Ljava/lang/String;

    invoke-virtual {v2, v3}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    move-result-object v2

    invoke-virtual {v2}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v2

    invoke-direct {v0, v1, v2}, Ljava/lang/Thread;-><init>(Ljava/lang/Runnable;Ljava/lang/String;)V

    iput-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->writer:Ljava/lang/Thread;

    iget-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->reader:Ljava/lang/Thread;

    invoke-virtual {v0}, Ljava/lang/Thread;->start()V

    iget-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->writer:Ljava/lang/Thread;

    invoke-virtual {v0}, Ljava/lang/Thread;->start()V

    return-void
.end method
