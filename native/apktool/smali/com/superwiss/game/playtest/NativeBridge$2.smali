.class Lcom/superwiss/game/playtest/NativeBridge$2;
.super Ljava/lang/Object;
.source "NativeBridge.java"

# interfaces
.implements Ljava/lang/Runnable;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = Lcom/superwiss/game/playtest/NativeBridge;->openBluetoothSettings()V
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
    .line 23
    iput-object p1, p0, Lcom/superwiss/game/playtest/NativeBridge$2;->this$0:Lcom/superwiss/game/playtest/NativeBridge;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public run()V
    .locals 3

    .prologue
    .line 23
    :try_start_0
    iget-object v0, p0, Lcom/superwiss/game/playtest/NativeBridge$2;->this$0:Lcom/superwiss/game/playtest/NativeBridge;

    invoke-static {v0}, Lcom/superwiss/game/playtest/NativeBridge;->access$000(Lcom/superwiss/game/playtest/NativeBridge;)Lcom/superwiss/game/playtest/MainActivity;

    move-result-object v0

    new-instance v1, Landroid/content/Intent;

    const-string v2, "android.settings.BLUETOOTH_SETTINGS"

    invoke-direct {v1, v2}, Landroid/content/Intent;-><init>(Ljava/lang/String;)V

    invoke-virtual {v0, v1}, Lcom/superwiss/game/playtest/MainActivity;->startActivity(Landroid/content/Intent;)V
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_0

    :goto_0
    return-void

    :catch_0
    move-exception v0

    iget-object v0, p0, Lcom/superwiss/game/playtest/NativeBridge$2;->this$0:Lcom/superwiss/game/playtest/NativeBridge;

    invoke-static {v0}, Lcom/superwiss/game/playtest/NativeBridge;->access$000(Lcom/superwiss/game/playtest/NativeBridge;)Lcom/superwiss/game/playtest/MainActivity;

    move-result-object v0

    const-string v1, "Open Android Settings \u2192 Bluetooth to pair phones."

    invoke-virtual {v0, v1}, Lcom/superwiss/game/playtest/MainActivity;->nativeError(Ljava/lang/String;)V

    goto :goto_0
.end method
