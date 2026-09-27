.class Lcom/superwiss/game/playtest/BluetoothLink$Peer$1;
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
    .line 37
    iput-object p1, p0, Lcom/superwiss/game/playtest/BluetoothLink$Peer$1;->this$1:Lcom/superwiss/game/playtest/BluetoothLink$Peer;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public run()V
    .locals 12

    .prologue
    const/4 v1, 0x0

    .line 37
    :try_start_0
    new-instance v6, Ljava/io/DataInputStream;

    iget-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink$Peer$1;->this$1:Lcom/superwiss/game/playtest/BluetoothLink$Peer;

    iget-object v0, v0, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->socket:Landroid/bluetooth/BluetoothSocket;

    invoke-virtual {v0}, Landroid/bluetooth/BluetoothSocket;->getInputStream()Ljava/io/InputStream;

    move-result-object v0

    invoke-direct {v6, v0}, Ljava/io/DataInputStream;-><init>(Ljava/io/InputStream;)V

    invoke-static {}, Ljava/lang/System;->currentTimeMillis()J

    move-result-wide v4

    move v0, v1

    :goto_0
    iget-object v2, p0, Lcom/superwiss/game/playtest/BluetoothLink$Peer$1;->this$1:Lcom/superwiss/game/playtest/BluetoothLink$Peer;

    iget-boolean v2, v2, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->closed:Z

    if-nez v2, :cond_3

    iget-object v2, p0, Lcom/superwiss/game/playtest/BluetoothLink$Peer$1;->this$1:Lcom/superwiss/game/playtest/BluetoothLink$Peer;

    iget v2, v2, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->gen:I

    iget-object v3, p0, Lcom/superwiss/game/playtest/BluetoothLink$Peer$1;->this$1:Lcom/superwiss/game/playtest/BluetoothLink$Peer;

    iget-object v3, v3, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->this$0:Lcom/superwiss/game/playtest/BluetoothLink;

    invoke-static {v3}, Lcom/superwiss/game/playtest/BluetoothLink;->access$300(Lcom/superwiss/game/playtest/BluetoothLink;)I

    move-result v3

    if-ne v2, v3, :cond_3

    invoke-virtual {v6}, Ljava/io/DataInputStream;->readInt()I

    move-result v7

    const/4 v2, 0x1

    if-lt v7, v2, :cond_0

    const v2, 0x8000

    if-le v7, v2, :cond_1

    :cond_0
    new-instance v0, Ljava/io/IOException;

    const-string v1, "Invalid frame"

    invoke-direct {v0, v1}, Ljava/io/IOException;-><init>(Ljava/lang/String;)V

    throw v0
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_0
    .catchall {:try_start_0 .. :try_end_0} :catchall_0

    :catch_0
    move-exception v0

    iget-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink$Peer$1;->this$1:Lcom/superwiss/game/playtest/BluetoothLink$Peer;

    invoke-virtual {v0}, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->close()V

    :goto_1
    return-void

    :cond_1
    :try_start_1
    invoke-static {}, Ljava/lang/System;->currentTimeMillis()J

    move-result-wide v2

    sub-long v8, v2, v4

    const-wide/16 v10, 0x3e8

    cmp-long v8, v8, v10

    if-ltz v8, :cond_4

    move v0, v1

    :goto_2
    add-int/lit8 v0, v0, 0x1

    const/16 v4, 0x64

    if-le v0, v4, :cond_2

    new-instance v0, Ljava/io/IOException;

    const-string v1, "Input rate exceeded"

    invoke-direct {v0, v1}, Ljava/io/IOException;-><init>(Ljava/lang/String;)V

    throw v0
    :try_end_1
    .catch Ljava/lang/Exception; {:try_start_1 .. :try_end_1} :catch_0
    .catchall {:try_start_1 .. :try_end_1} :catchall_0

    :catchall_0
    move-exception v0

    iget-object v1, p0, Lcom/superwiss/game/playtest/BluetoothLink$Peer$1;->this$1:Lcom/superwiss/game/playtest/BluetoothLink$Peer;

    invoke-virtual {v1}, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->close()V

    throw v0

    :cond_2
    :try_start_2
    new-array v4, v7, [B

    invoke-virtual {v6, v4}, Ljava/io/DataInputStream;->readFully([B)V

    iget-object v5, p0, Lcom/superwiss/game/playtest/BluetoothLink$Peer$1;->this$1:Lcom/superwiss/game/playtest/BluetoothLink$Peer;

    iget-object v5, v5, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->this$0:Lcom/superwiss/game/playtest/BluetoothLink;

    const-string v7, "message"

    iget-object v8, p0, Lcom/superwiss/game/playtest/BluetoothLink$Peer$1;->this$1:Lcom/superwiss/game/playtest/BluetoothLink$Peer;

    iget-object v8, v8, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->id:Ljava/lang/String;

    new-instance v9, Ljava/lang/String;

    sget-object v10, Ljava/nio/charset/StandardCharsets;->UTF_8:Ljava/nio/charset/Charset;

    invoke-direct {v9, v4, v10}, Ljava/lang/String;-><init>([BLjava/nio/charset/Charset;)V

    invoke-static {v5, v7, v8, v9}, Lcom/superwiss/game/playtest/BluetoothLink;->access$400(Lcom/superwiss/game/playtest/BluetoothLink;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V
    :try_end_2
    .catch Ljava/lang/Exception; {:try_start_2 .. :try_end_2} :catch_0
    .catchall {:try_start_2 .. :try_end_2} :catchall_0

    move-wide v4, v2

    goto :goto_0

    :cond_3
    iget-object v0, p0, Lcom/superwiss/game/playtest/BluetoothLink$Peer$1;->this$1:Lcom/superwiss/game/playtest/BluetoothLink$Peer;

    invoke-virtual {v0}, Lcom/superwiss/game/playtest/BluetoothLink$Peer;->close()V

    goto :goto_1

    :cond_4
    move-wide v2, v4

    goto :goto_2
.end method
