.class Lcom/superwiss/game/playtest/BluetoothLink$2;
.super Ljava/lang/Object;
.source "BluetoothLink.java"

# interfaces
.implements Ljava/lang/Runnable;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = Lcom/superwiss/game/playtest/BluetoothLink;->join(Ljava/lang/String;)V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic this$0:Lcom/superwiss/game/playtest/BluetoothLink;

.field final synthetic val$address:Ljava/lang/String;

.field final synthetic val$g:I


# direct methods
.method constructor <init>(Lcom/superwiss/game/playtest/BluetoothLink;Ljava/lang/String;I)V
    .locals 0
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "()V"
        }
    .end annotation

    .prologue
    .line 28
    iput-object p1, p0, Lcom/superwiss/game/playtest/BluetoothLink$2;->this$0:Lcom/superwiss/game/playtest/BluetoothLink;

    iput-object p2, p0, Lcom/superwiss/game/playtest/BluetoothLink$2;->val$address:Ljava/lang/String;

    iput p3, p0, Lcom/superwiss/game/playtest/BluetoothLink$2;->val$g:I

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public run()V
    .locals 8

    .prologue
    const/4 v2, 0x0

    .line 28
    :try_start_0
    iget-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink$2;->this$0:Lcom/superwiss/game/playtest/BluetoothLink;

    invoke-static {v0}, Lcom/superwiss/game/playtest/BluetoothLink;->access$100(Lcom/superwiss/game/playtest/BluetoothLink;)Landroid/bluetooth/BluetoothAdapter;

    move-result-object v0

    invoke-virtual {v0}, Landroid/bluetooth/BluetoothAdapter;->getBondedDevices()Ljava/util/Set;

    move-result-object v0

    invoke-interface {v0}, Ljava/util/Set;->iterator()Ljava/util/Iterator;

    move-result-object v3

    move-object v1, v2

    :goto_0
    invoke-interface {v3}, Ljava/util/Iterator;->hasNext()Z

    move-result v0

    if-eqz v0, :cond_0

    invoke-interface {v3}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v0

    check-cast v0, Landroid/bluetooth/BluetoothDevice;

    iget-object v4, p0, Lcom/superwiss/game/playtest/BluetoothLink$2;->val$address:Ljava/lang/String;

    invoke-virtual {v0}, Landroid/bluetooth/BluetoothDevice;->getAddress()Ljava/lang/String;

    move-result-object v5

    invoke-virtual {v4, v5}, Ljava/lang/String;->equalsIgnoreCase(Ljava/lang/String;)Z

    move-result v4

    if-eqz v4, :cond_7

    :goto_1
    move-object v1, v0

    goto :goto_0

    :cond_0
    if-nez v1, :cond_2

    new-instance v0, Ljava/io/IOException;

    const-string v1, "Pair this host in Android Bluetooth settings first."

    invoke-direct {v0, v1}, Ljava/io/IOException;-><init>(Ljava/lang/String;)V

    throw v0
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_0

    :catch_0
    move-exception v0

    iget v1, p0, Lcom/superwiss/game/playtest/BluetoothLink$2;->val$g:I

    iget-object v2, p0, Lcom/superwiss/game/playtest/BluetoothLink$2;->this$0:Lcom/superwiss/game/playtest/BluetoothLink;

    invoke-static {v2}, Lcom/superwiss/game/playtest/BluetoothLink;->access$300(Lcom/superwiss/game/playtest/BluetoothLink;)I

    move-result v2

    if-ne v1, v2, :cond_1

    iget-object v1, p0, Lcom/superwiss/game/playtest/BluetoothLink$2;->this$0:Lcom/superwiss/game/playtest/BluetoothLink;

    const-string v2, "error"

    const-string v3, ""

    invoke-static {v0}, Lcom/superwiss/game/playtest/BluetoothLink;->access$600(Ljava/lang/Exception;)Ljava/lang/String;

    move-result-object v0

    invoke-static {v1, v2, v3, v0}, Lcom/superwiss/game/playtest/BluetoothLink;->access$400(Lcom/superwiss/game/playtest/BluetoothLink;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V

    :cond_1
    :goto_2
    return-void

    :cond_2
    const/4 v0, 0x0

    move v3, v0

    :goto_3
    :try_start_1
    invoke-static {}, Lcom/superwiss/game/playtest/BluetoothLink;->access$000()[Ljava/util/UUID;

    move-result-object v0

    array-length v0, v0

    if-ge v3, v0, :cond_6

    iget v0, p0, Lcom/superwiss/game/playtest/BluetoothLink$2;->val$g:I

    iget-object v4, p0, Lcom/superwiss/game/playtest/BluetoothLink$2;->this$0:Lcom/superwiss/game/playtest/BluetoothLink;

    invoke-static {v4}, Lcom/superwiss/game/playtest/BluetoothLink;->access$300(Lcom/superwiss/game/playtest/BluetoothLink;)I
    :try_end_1
    .catch Ljava/lang/Exception; {:try_start_1 .. :try_end_1} :catch_0

    move-result v4

    if-ne v0, v4, :cond_6

    :try_start_2
    iget-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink$2;->this$0:Lcom/superwiss/game/playtest/BluetoothLink;

    const-string v4, "status"

    const-string v5, ""

    new-instance v6, Ljava/lang/StringBuilder;

    invoke-direct {v6}, Ljava/lang/StringBuilder;-><init>()V

    const-string v7, "Connecting to host slot "

    invoke-virtual {v6, v7}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    move-result-object v6

    add-int/lit8 v7, v3, 0x1

    invoke-virtual {v6, v7}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    move-result-object v6

    invoke-virtual {v6}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v6

    invoke-static {v0, v4, v5, v6}, Lcom/superwiss/game/playtest/BluetoothLink;->access$400(Lcom/superwiss/game/playtest/BluetoothLink;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V

    invoke-static {}, Lcom/superwiss/game/playtest/BluetoothLink;->access$000()[Ljava/util/UUID;

    move-result-object v0

    aget-object v0, v0, v3

    invoke-virtual {v1, v0}, Landroid/bluetooth/BluetoothDevice;->createRfcommSocketToServiceRecord(Ljava/util/UUID;)Landroid/bluetooth/BluetoothSocket;
    :try_end_2
    .catch Ljava/io/IOException; {:try_start_2 .. :try_end_2} :catch_3
    .catch Ljava/lang/Exception; {:try_start_2 .. :try_end_2} :catch_0

    move-result-object v0

    :try_start_3
    iget-object v4, p0, Lcom/superwiss/game/playtest/BluetoothLink$2;->this$0:Lcom/superwiss/game/playtest/BluetoothLink;

    invoke-static {v4, v0}, Lcom/superwiss/game/playtest/BluetoothLink;->access$702(Lcom/superwiss/game/playtest/BluetoothLink;Landroid/bluetooth/BluetoothSocket;)Landroid/bluetooth/BluetoothSocket;

    iget v4, p0, Lcom/superwiss/game/playtest/BluetoothLink$2;->val$g:I

    iget-object v5, p0, Lcom/superwiss/game/playtest/BluetoothLink$2;->this$0:Lcom/superwiss/game/playtest/BluetoothLink;

    invoke-static {v5}, Lcom/superwiss/game/playtest/BluetoothLink;->access$300(Lcom/superwiss/game/playtest/BluetoothLink;)I

    move-result v5

    if-eq v4, v5, :cond_4

    invoke-virtual {v0}, Landroid/bluetooth/BluetoothSocket;->close()V
    :try_end_3
    .catch Ljava/io/IOException; {:try_start_3 .. :try_end_3} :catch_1
    .catch Ljava/lang/Exception; {:try_start_3 .. :try_end_3} :catch_0

    goto :goto_2

    :catch_1
    move-exception v4

    :goto_4
    :try_start_4
    iget-object v4, p0, Lcom/superwiss/game/playtest/BluetoothLink$2;->this$0:Lcom/superwiss/game/playtest/BluetoothLink;

    const/4 v5, 0x0

    invoke-static {v4, v5}, Lcom/superwiss/game/playtest/BluetoothLink;->access$702(Lcom/superwiss/game/playtest/BluetoothLink;Landroid/bluetooth/BluetoothSocket;)Landroid/bluetooth/BluetoothSocket;
    :try_end_4
    .catch Ljava/lang/Exception; {:try_start_4 .. :try_end_4} :catch_0

    if-eqz v0, :cond_3

    :try_start_5
    invoke-virtual {v0}, Landroid/bluetooth/BluetoothSocket;->close()V
    :try_end_5
    .catch Ljava/io/IOException; {:try_start_5 .. :try_end_5} :catch_2
    .catch Ljava/lang/Exception; {:try_start_5 .. :try_end_5} :catch_0

    :cond_3
    :goto_5
    add-int/lit8 v0, v3, 0x1

    move v3, v0

    goto :goto_3

    :cond_4
    :try_start_6
    invoke-virtual {v0}, Landroid/bluetooth/BluetoothSocket;->connect()V

    iget-object v4, p0, Lcom/superwiss/game/playtest/BluetoothLink$2;->this$0:Lcom/superwiss/game/playtest/BluetoothLink;

    const/4 v5, 0x0

    invoke-static {v4, v5}, Lcom/superwiss/game/playtest/BluetoothLink;->access$702(Lcom/superwiss/game/playtest/BluetoothLink;Landroid/bluetooth/BluetoothSocket;)Landroid/bluetooth/BluetoothSocket;

    iget v4, p0, Lcom/superwiss/game/playtest/BluetoothLink$2;->val$g:I

    iget-object v5, p0, Lcom/superwiss/game/playtest/BluetoothLink$2;->this$0:Lcom/superwiss/game/playtest/BluetoothLink;

    invoke-static {v5}, Lcom/superwiss/game/playtest/BluetoothLink;->access$300(Lcom/superwiss/game/playtest/BluetoothLink;)I

    move-result v5

    if-eq v4, v5, :cond_5

    invoke-virtual {v0}, Landroid/bluetooth/BluetoothSocket;->close()V

    goto :goto_2

    :cond_5
    iget-object v4, p0, Lcom/superwiss/game/playtest/BluetoothLink$2;->this$0:Lcom/superwiss/game/playtest/BluetoothLink;

    const-string v5, "host"

    iget v6, p0, Lcom/superwiss/game/playtest/BluetoothLink$2;->val$g:I

    invoke-static {v4, v5, v0, v6}, Lcom/superwiss/game/playtest/BluetoothLink;->access$500(Lcom/superwiss/game/playtest/BluetoothLink;Ljava/lang/String;Landroid/bluetooth/BluetoothSocket;I)V
    :try_end_6
    .catch Ljava/io/IOException; {:try_start_6 .. :try_end_6} :catch_1
    .catch Ljava/lang/Exception; {:try_start_6 .. :try_end_6} :catch_0

    goto :goto_2

    :cond_6
    :try_start_7
    iget v0, p0, Lcom/superwiss/game/playtest/BluetoothLink$2;->val$g:I

    iget-object v1, p0, Lcom/superwiss/game/playtest/BluetoothLink$2;->this$0:Lcom/superwiss/game/playtest/BluetoothLink;

    invoke-static {v1}, Lcom/superwiss/game/playtest/BluetoothLink;->access$300(Lcom/superwiss/game/playtest/BluetoothLink;)I

    move-result v1

    if-ne v0, v1, :cond_1

    iget-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink$2;->this$0:Lcom/superwiss/game/playtest/BluetoothLink;

    const-string v1, "error"

    const-string v2, ""

    const-string v3, "No free host slot. Ask the host to reopen Nearby and try again."

    invoke-static {v0, v1, v2, v3}, Lcom/superwiss/game/playtest/BluetoothLink;->access$400(Lcom/superwiss/game/playtest/BluetoothLink;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V
    :try_end_7
    .catch Ljava/lang/Exception; {:try_start_7 .. :try_end_7} :catch_0

    goto/16 :goto_2

    :catch_2
    move-exception v0

    goto :goto_5

    :catch_3
    move-exception v0

    move-object v0, v2

    goto :goto_4

    :cond_7
    move-object v0, v1

    goto/16 :goto_1
.end method
