.class Lcom/superwiss/game/playtest/NativeBridge$4;
.super Ljava/lang/Object;
.source "NativeBridge.java"

# interfaces
.implements Ljava/lang/Runnable;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = Lcom/superwiss/game/playtest/NativeBridge;->haptic(Ljava/lang/String;)V
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
    .line 26
    iput-object p1, p0, Lcom/superwiss/game/playtest/NativeBridge$4;->this$0:Lcom/superwiss/game/playtest/NativeBridge;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public run()V
    .locals 2

    .prologue
    .line 26
    iget-object v0, p0, Lcom/superwiss/game/playtest/NativeBridge$4;->this$0:Lcom/superwiss/game/playtest/NativeBridge;

    invoke-static {v0}, Lcom/superwiss/game/playtest/NativeBridge;->access$000(Lcom/superwiss/game/playtest/NativeBridge;)Lcom/superwiss/game/playtest/MainActivity;

    move-result-object v0

    invoke-virtual {v0}, Lcom/superwiss/game/playtest/MainActivity;->gameView()Landroid/webkit/WebView;

    move-result-object v0

    if-eqz v0, :cond_0

    iget-object v0, p0, Lcom/superwiss/game/playtest/NativeBridge$4;->this$0:Lcom/superwiss/game/playtest/NativeBridge;

    invoke-static {v0}, Lcom/superwiss/game/playtest/NativeBridge;->access$000(Lcom/superwiss/game/playtest/NativeBridge;)Lcom/superwiss/game/playtest/MainActivity;

    move-result-object v0

    invoke-virtual {v0}, Lcom/superwiss/game/playtest/MainActivity;->gameView()Landroid/webkit/WebView;

    move-result-object v0

    const/4 v1, 0x1

    invoke-virtual {v0, v1}, Landroid/webkit/WebView;->performHapticFeedback(I)Z

    :cond_0
    return-void
.end method
