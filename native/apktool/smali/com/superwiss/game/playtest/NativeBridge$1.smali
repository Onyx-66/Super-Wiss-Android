.class Lcom/superwiss/game/playtest/NativeBridge$1;
.super Ljava/lang/Object;
.source "NativeBridge.java"

# interfaces
.implements Ljava/lang/Runnable;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = Lcom/superwiss/game/playtest/NativeBridge;->requestBluetooth()V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic this$0:Lcom/superwiss/game/playtest/NativeBridge;


# direct methods
.method constructor <init>(Lcom/superwiss/game/playtest/NativeBridge;)V
    .locals 0

    .prologue
    .line 15
    iput-object p1, p0, Lcom/superwiss/game/playtest/NativeBridge$1;->this$0:Lcom/superwiss/game/playtest/NativeBridge;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public run()V
    .locals 4

    .prologue
    .line 15
    sget v0, Landroid/os/Build$VERSION;->SDK_INT:I

    const/16 v1, 0x1f

    if-lt v0, v1, :cond_0

    iget-object v0, p0, Lcom/superwiss/game/playtest/NativeBridge$1;->this$0:Lcom/superwiss/game/playtest/NativeBridge;

    invoke-static {v0}, Lcom/superwiss/game/playtest/NativeBridge;->access$000(Lcom/superwiss/game/playtest/NativeBridge;)Lcom/superwiss/game/playtest/MainActivity;

    move-result-object v0

    const-string v1, "android.permission.BLUETOOTH_CONNECT"

    invoke-virtual {v0, v1}, Lcom/superwiss/game/playtest/MainActivity;->checkSelfPermission(Ljava/lang/String;)I

    move-result v0

    if-eqz v0, :cond_0

    iget-object v0, p0, Lcom/superwiss/game/playtest/NativeBridge$1;->this$0:Lcom/superwiss/game/playtest/NativeBridge;

    invoke-static {v0}, Lcom/superwiss/game/playtest/NativeBridge;->access$000(Lcom/superwiss/game/playtest/NativeBridge;)Lcom/superwiss/game/playtest/MainActivity;

    move-result-object v0

    const/4 v1, 0x1

    new-array v1, v1, [Ljava/lang/String;

    const/4 v2, 0x0

    const-string v3, "android.permission.BLUETOOTH_CONNECT"

    aput-object v3, v1, v2

    const/16 v2, 0x19a

    invoke-virtual {v0, v1, v2}, Lcom/superwiss/game/playtest/MainActivity;->requestPermissions([Ljava/lang/String;I)V

    :goto_0
    return-void

    :cond_0
    iget-object v0, p0, Lcom/superwiss/game/playtest/NativeBridge$1;->this$0:Lcom/superwiss/game/playtest/NativeBridge;

    invoke-static {v0}, Lcom/superwiss/game/playtest/NativeBridge;->access$100(Lcom/superwiss/game/playtest/NativeBridge;)Lcom/superwiss/game/playtest/BluetoothLink;

    move-result-object v0

    invoke-virtual {v0}, Lcom/superwiss/game/playtest/BluetoothLink;->devices()V

    goto :goto_0
.end method
