.class Lcom/superwiss/game/playtest/BluetoothLink$Peer$2;
.super Ljava/lang/Object;
.source "BluetoothLink.java"

# interfaces
.implements Ljava/lang/Runnable;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = Lcom/superwiss/game/playtest/BluetoothLink$Peer;->start()V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic this$1:Lcom/superwiss/game/playtest/BluetoothLink$Peer;


# direct methods
.method constructor <init>(Lcom/superwiss/game/playtest/BluetoothLink$Peer;)V
    .locals 0

    .prologue
    .line 38
    iput-object p1, p0, Lcom/superwiss/game/playtest/BluetoothLink$Peer$2;->this$1:Lcom/superwiss/game/playtest/BluetoothLink$Peer;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public run()V
    .locals 5

    .prologue
    .line 38
    :try_start_0
    new-instance v1, Ljava/io/DataOutputStream;

    iget-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink$Peer$2;->this$1:Lcom/superwiss/game/playtest/BluetoothLink$Peer;

    iget-object v0, v0, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->socket:Landroid/bluetooth/BluetoothSocket;

    invoke-virtual {v0}, Landroid/bluetooth/BluetoothSocket;->getOutputStream()Ljava/io/OutputStream;

    move-result-object v0

    invoke-direct {v1, v0}, Ljava/io/DataOutputStream;-><init>(Ljava/io/OutputStream;)V

    :cond_0
    :goto_0
    iget-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink$Peer$2;->this$1:Lcom/superwiss/game/playtest/BluetoothLink$Peer;

    iget-boolean v0, v0, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->closed:Z

    if-nez v0, :cond_1

    iget-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink$Peer$2;->this$1:Lcom/superwiss/game/playtest/BluetoothLink$Peer;

    iget v0, v0, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->gen:I

    iget-object v2, p0, Lcom/superwiss/game/playtest/BluetoothLink$Peer$2;->this$1:Lcom/superwiss/game/playtest/BluetoothLink$Peer;

    iget-object v2, v2, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->this$0:Lcom/superwiss/game/playtest/BluetoothLink;

    invoke-static {v2}, Lcom/superwiss/game/playtest/BluetoothLink;->access$300(Lcom/superwiss/game/playtest/BluetoothLink;)I

    move-result v2

    if-ne v0, v2, :cond_1

    iget-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink$Peer$2;->this$1:Lcom/superwiss/game/playtest/BluetoothLink$Peer;

    iget-object v0, v0, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->outgoing:Ljava/util/concurrent/ArrayBlockingQueue;

    const-wide/16 v2, 0x2

    sget-object v4, Ljava/util/concurrent/TimeUnit;->SECONDS:Ljava/util/concurrent/TimeUnit;

    invoke-virtual {v0, v2, v3, v4}, Ljava/util/concurrent/ArrayBlockingQueue;->poll(JLjava/util/concurrent/TimeUnit;)Ljava/lang/Object;

    move-result-object v0

    check-cast v0, [B

    if-eqz v0, :cond_0

    array-length v2, v0

    invoke-virtual {v1, v2}, Ljava/io/DataOutputStream;->writeInt(I)V

    invoke-virtual {v1, v0}, Ljava/io/DataOutputStream;->write([B)V

    invoke-virtual {v1}, Ljava/io/DataOutputStream;->flush()V
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_0
    .catchall {:try_start_0 .. :try_end_0} :catchall_0

    goto :goto_0

    :catch_0
    move-exception v0

    iget-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink$Peer$2;->this$1:Lcom/superwiss/game/playtest/BluetoothLink$Peer;

    invoke-virtual {v0}, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->close()V

    :goto_1
    return-void

    :cond_1
    iget-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink$Peer$2;->this$1:Lcom/superwiss/game/playtest/BluetoothLink$Peer;

    invoke-virtual {v0}, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->close()V

    goto :goto_1

    :catchall_0
    move-exception v0

    iget-object v1, p0, Lcom/superwiss/game/playtest/BluetoothLink$Peer$2;->this$1:Lcom/superwiss/game/playtest/BluetoothLink$Peer;

    invoke-virtual {v1}, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->close()V

    throw v0
.end method
