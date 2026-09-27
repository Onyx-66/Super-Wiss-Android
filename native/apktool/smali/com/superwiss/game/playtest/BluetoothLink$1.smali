.class Lcom/superwiss/game/playtest/BluetoothLink$1;
.super Ljava/lang/Object;
.source "BluetoothLink.java"

# interfaces
.implements Ljava/lang/Runnable;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = Lcom/superwiss/game/playtest/BluetoothLink;->host()V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic this$0:Lcom/superwiss/game/playtest/BluetoothLink;

.field final synthetic val$g:I

.field final synthetic val$slot:I


# direct methods
.method constructor <init>(Lcom/superwiss/game/playtest/BluetoothLink;II)V
    .locals 0
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "()V"
        }
    .end annotation

    .prologue
    .line 27
    iput-object p1, p0, Lcom/superwiss/game/playtest/BluetoothLink$1;->this$0:Lcom/superwiss/game/playtest/BluetoothLink;

    iput p2, p0, Lcom/superwiss/game/playtest/BluetoothLink$1;->val$slot:I

    iput p3, p0, Lcom/superwiss/game/playtest/BluetoothLink$1;->val$g:I

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public run()V
    .locals 5

    .prologue
    .line 27
    const/4 v1, 0x0

    :try_start_0
    iget-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink$1;->this$0:Lcom/superwiss/game/playtest/BluetoothLink;

    invoke-static {v0}, Lcom/superwiss/game/playtest/BluetoothLink;->access$100(Lcom/superwiss/game/playtest/BluetoothLink;)Landroid/bluetooth/BluetoothAdapter;

    move-result-object v0

    new-instance v2, Ljava/lang/StringBuilder;

    invoke-direct {v2}, Ljava/lang/StringBuilder;-><init>()V

    const-string v3, "Super Wiss Nightfall "

    invoke-virtual {v2, v3}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    move-result-object v2

    iget v3, p0, Lcom/superwiss/game/playtest/BluetoothLink$1;->val$slot:I

    add-int/lit8 v3, v3, 0x1

    invoke-virtual {v2, v3}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    move-result-object v2

    invoke-virtual {v2}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v2

    invoke-static {}, Lcom/superwiss/game/playtest/BluetoothLink;->access$000()[Ljava/util/UUID;

    move-result-object v3

    iget v4, p0, Lcom/superwiss/game/playtest/BluetoothLink$1;->val$slot:I

    aget-object v3, v3, v4

    invoke-virtual {v0, v2, v3}, Landroid/bluetooth/BluetoothAdapter;->listenUsingRfcommWithServiceRecord(Ljava/lang/String;Ljava/util/UUID;)Landroid/bluetooth/BluetoothServerSocket;

    move-result-object v1

    iget-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink$1;->this$0:Lcom/superwiss/game/playtest/BluetoothLink;

    invoke-static {v0}, Lcom/superwiss/game/playtest/BluetoothLink;->access$200(Lcom/superwiss/game/playtest/BluetoothLink;)Ljava/util/List;

    move-result-object v2

    monitor-enter v2
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_1
    .catchall {:try_start_0 .. :try_end_0} :catchall_1

    :try_start_1
    iget v0, p0, Lcom/superwiss/game/playtest/BluetoothLink$1;->val$g:I

    iget-object v3, p0, Lcom/superwiss/game/playtest/BluetoothLink$1;->this$0:Lcom/superwiss/game/playtest/BluetoothLink;

    invoke-static {v3}, Lcom/superwiss/game/playtest/BluetoothLink;->access$300(Lcom/superwiss/game/playtest/BluetoothLink;)I

    move-result v3

    if-eq v0, v3, :cond_1

    invoke-virtual {v1}, Landroid/bluetooth/BluetoothServerSocket;->close()V

    monitor-exit v2
    :try_end_1
    .catchall {:try_start_1 .. :try_end_1} :catchall_0

    if-eqz v1, :cond_0

    iget-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink$1;->this$0:Lcom/superwiss/game/playtest/BluetoothLink;

    invoke-static {v0}, Lcom/superwiss/game/playtest/BluetoothLink;->access$200(Lcom/superwiss/game/playtest/BluetoothLink;)Ljava/util/List;

    move-result-object v0

    invoke-interface {v0, v1}, Ljava/util/List;->remove(Ljava/lang/Object;)Z

    :try_start_2
    invoke-virtual {v1}, Landroid/bluetooth/BluetoothServerSocket;->close()V
    :try_end_2
    .catch Ljava/io/IOException; {:try_start_2 .. :try_end_2} :catch_4

    :cond_0
    :goto_0
    return-void

    :cond_1
    :try_start_3
    iget-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink$1;->this$0:Lcom/superwiss/game/playtest/BluetoothLink;

    invoke-static {v0}, Lcom/superwiss/game/playtest/BluetoothLink;->access$200(Lcom/superwiss/game/playtest/BluetoothLink;)Ljava/util/List;

    move-result-object v0

    invoke-interface {v0, v1}, Ljava/util/List;->add(Ljava/lang/Object;)Z

    monitor-exit v2
    :try_end_3
    .catchall {:try_start_3 .. :try_end_3} :catchall_0

    :try_start_4
    iget-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink$1;->this$0:Lcom/superwiss/game/playtest/BluetoothLink;

    const-string v2, "status"

    const-string v3, ""

    const-string v4, "Listening for paired friends"

    invoke-static {v0, v2, v3, v4}, Lcom/superwiss/game/playtest/BluetoothLink;->access$400(Lcom/superwiss/game/playtest/BluetoothLink;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V

    invoke-virtual {v1}, Landroid/bluetooth/BluetoothServerSocket;->accept()Landroid/bluetooth/BluetoothSocket;

    move-result-object v0

    iget v2, p0, Lcom/superwiss/game/playtest/BluetoothLink$1;->val$g:I

    iget-object v3, p0, Lcom/superwiss/game/playtest/BluetoothLink$1;->this$0:Lcom/superwiss/game/playtest/BluetoothLink;

    invoke-static {v3}, Lcom/superwiss/game/playtest/BluetoothLink;->access$300(Lcom/superwiss/game/playtest/BluetoothLink;)I

    move-result v3

    if-eq v2, v3, :cond_3

    invoke-virtual {v0}, Landroid/bluetooth/BluetoothSocket;->close()V
    :try_end_4
    .catch Ljava/lang/Exception; {:try_start_4 .. :try_end_4} :catch_1
    .catchall {:try_start_4 .. :try_end_4} :catchall_1

    if-eqz v1, :cond_0

    iget-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink$1;->this$0:Lcom/superwiss/game/playtest/BluetoothLink;

    invoke-static {v0}, Lcom/superwiss/game/playtest/BluetoothLink;->access$200(Lcom/superwiss/game/playtest/BluetoothLink;)Ljava/util/List;

    move-result-object v0

    invoke-interface {v0, v1}, Ljava/util/List;->remove(Ljava/lang/Object;)Z

    :try_start_5
    invoke-virtual {v1}, Landroid/bluetooth/BluetoothServerSocket;->close()V
    :try_end_5
    .catch Ljava/io/IOException; {:try_start_5 .. :try_end_5} :catch_0

    goto :goto_0

    :catch_0
    move-exception v0

    goto :goto_0

    :catchall_0
    move-exception v0

    :try_start_6
    monitor-exit v2
    :try_end_6
    .catchall {:try_start_6 .. :try_end_6} :catchall_0

    :try_start_7
    throw v0
    :try_end_7
    .catch Ljava/lang/Exception; {:try_start_7 .. :try_end_7} :catch_1
    .catchall {:try_start_7 .. :try_end_7} :catchall_1

    :catch_1
    move-exception v0

    :try_start_8
    iget v2, p0, Lcom/superwiss/game/playtest/BluetoothLink$1;->val$g:I

    iget-object v3, p0, Lcom/superwiss/game/playtest/BluetoothLink$1;->this$0:Lcom/superwiss/game/playtest/BluetoothLink;

    invoke-static {v3}, Lcom/superwiss/game/playtest/BluetoothLink;->access$300(Lcom/superwiss/game/playtest/BluetoothLink;)I

    move-result v3

    if-ne v2, v3, :cond_2

    iget-object v2, p0, Lcom/superwiss/game/playtest/BluetoothLink$1;->this$0:Lcom/superwiss/game/playtest/BluetoothLink;

    const-string v3, "error"

    const-string v4, ""

    invoke-static {v0}, Lcom/superwiss/game/playtest/BluetoothLink;->access$600(Ljava/lang/Exception;)Ljava/lang/String;

    move-result-object v0

    invoke-static {v2, v3, v4, v0}, Lcom/superwiss/game/playtest/BluetoothLink;->access$400(Lcom/superwiss/game/playtest/BluetoothLink;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V
    :try_end_8
    .catchall {:try_start_8 .. :try_end_8} :catchall_1

    :cond_2
    if-eqz v1, :cond_0

    iget-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink$1;->this$0:Lcom/superwiss/game/playtest/BluetoothLink;

    invoke-static {v0}, Lcom/superwiss/game/playtest/BluetoothLink;->access$200(Lcom/superwiss/game/playtest/BluetoothLink;)Ljava/util/List;

    move-result-object v0

    invoke-interface {v0, v1}, Ljava/util/List;->remove(Ljava/lang/Object;)Z

    :try_start_9
    invoke-virtual {v1}, Landroid/bluetooth/BluetoothServerSocket;->close()V
    :try_end_9
    .catch Ljava/io/IOException; {:try_start_9 .. :try_end_9} :catch_2

    goto :goto_0

    :catch_2
    move-exception v0

    goto :goto_0

    :cond_3
    :try_start_a
    iget-object v2, p0, Lcom/superwiss/game/playtest/BluetoothLink$1;->this$0:Lcom/superwiss/game/playtest/BluetoothLink;

    new-instance v3, Ljava/lang/StringBuilder;

    invoke-direct {v3}, Ljava/lang/StringBuilder;-><init>()V

    const-string v4, "slot"

    invoke-virtual {v3, v4}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    move-result-object v3

    iget v4, p0, Lcom/superwiss/game/playtest/BluetoothLink$1;->val$slot:I

    add-int/lit8 v4, v4, 0x1

    invoke-virtual {v3, v4}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    move-result-object v3

    invoke-virtual {v3}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v3

    iget v4, p0, Lcom/superwiss/game/playtest/BluetoothLink$1;->val$g:I

    invoke-static {v2, v3, v0, v4}, Lcom/superwiss/game/playtest/BluetoothLink;->access$500(Lcom/superwiss/game/playtest/BluetoothLink;Ljava/lang/String;Landroid/bluetooth/BluetoothSocket;I)V
    :try_end_a
    .catch Ljava/lang/Exception; {:try_start_a .. :try_end_a} :catch_1
    .catchall {:try_start_a .. :try_end_a} :catchall_1

    if-eqz v1, :cond_0

    iget-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink$1;->this$0:Lcom/superwiss/game/playtest/BluetoothLink;

    invoke-static {v0}, Lcom/superwiss/game/playtest/BluetoothLink;->access$200(Lcom/superwiss/game/playtest/BluetoothLink;)Ljava/util/List;

    move-result-object v0

    invoke-interface {v0, v1}, Ljava/util/List;->remove(Ljava/lang/Object;)Z

    :try_start_b
    invoke-virtual {v1}, Landroid/bluetooth/BluetoothServerSocket;->close()V
    :try_end_b
    .catch Ljava/io/IOException; {:try_start_b .. :try_end_b} :catch_3

    goto/16 :goto_0

    :catch_3
    move-exception v0

    goto/16 :goto_0

    :catchall_1
    move-exception v0

    if-eqz v1, :cond_4

    iget-object v2, p0, Lcom/superwiss/game/playtest/BluetoothLink$1;->this$0:Lcom/superwiss/game/playtest/BluetoothLink;

    invoke-static {v2}, Lcom/superwiss/game/playtest/BluetoothLink;->access$200(Lcom/superwiss/game/playtest/BluetoothLink;)Ljava/util/List;

    move-result-object v2

    invoke-interface {v2, v1}, Ljava/util/List;->remove(Ljava/lang/Object;)Z

    :try_start_c
    invoke-virtual {v1}, Landroid/bluetooth/BluetoothServerSocket;->close()V
    :try_end_c
    .catch Ljava/io/IOException; {:try_start_c .. :try_end_c} :catch_5

    :cond_4
    :goto_1
    throw v0

    :catch_4
    move-exception v0

    goto/16 :goto_0

    :catch_5
    move-exception v1

    goto :goto_1
.end method
