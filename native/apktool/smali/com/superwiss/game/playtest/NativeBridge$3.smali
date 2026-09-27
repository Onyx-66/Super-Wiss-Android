.class Lcom/superwiss/game/playtest/NativeBridge$3;
.super Ljava/lang/Object;
.source "NativeBridge.java"

# interfaces
.implements Ljava/lang/Runnable;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = Lcom/superwiss/game/playtest/NativeBridge;->share(Ljava/lang/String;)V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic this$0:Lcom/superwiss/game/playtest/NativeBridge;

.field final synthetic val$text:Ljava/lang/String;


# direct methods
.method constructor <init>(Lcom/superwiss/game/playtest/NativeBridge;Ljava/lang/String;)V
    .locals 0
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "()V"
        }
    .end annotation

    .prologue
    .line 25
    iput-object p1, p0, Lcom/superwiss/game/playtest/NativeBridge$3;->this$0:Lcom/superwiss/game/playtest/NativeBridge;

    iput-object p2, p0, Lcom/superwiss/game/playtest/NativeBridge$3;->val$text:Ljava/lang/String;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public run()V
    .locals 3

    .prologue
    .line 25
    :try_start_0
    new-instance v0, Landroid/content/Intent;

    const-string v1, "android.intent.action.SEND"

    invoke-direct {v0, v1}, Landroid/content/Intent;-><init>(Ljava/lang/String;)V

    const-string v1, "text/plain"

    invoke-virtual {v0, v1}, Landroid/content/Intent;->setType(Ljava/lang/String;)Landroid/content/Intent;

    const-string v1, "android.intent.extra.TEXT"

    iget-object v2, p0, Lcom/superwiss/game/playtest/NativeBridge$3;->val$text:Ljava/lang/String;

    invoke-virtual {v0, v1, v2}, Landroid/content/Intent;->putExtra(Ljava/lang/String;Ljava/lang/String;)Landroid/content/Intent;

    iget-object v1, p0, Lcom/superwiss/game/playtest/NativeBridge$3;->this$0:Lcom/superwiss/game/playtest/NativeBridge;

    invoke-static {v1}, Lcom/superwiss/game/playtest/NativeBridge;->access$000(Lcom/superwiss/game/playtest/NativeBridge;)Lcom/superwiss/game/playtest/MainActivity;

    move-result-object v1

    const-string v2, "Share Super Wiss challenge"

    invoke-static {v0, v2}, Landroid/content/Intent;->createChooser(Landroid/content/Intent;Ljava/lang/CharSequence;)Landroid/content/Intent;

    move-result-object v0

    invoke-virtual {v1, v0}, Lcom/superwiss/game/playtest/MainActivity;->startActivity(Landroid/content/Intent;)V
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_0

    :goto_0
    return-void

    :catch_0
    move-exception v0

    iget-object v0, p0, Lcom/superwiss/game/playtest/NativeBridge$3;->this$0:Lcom/superwiss/game/playtest/NativeBridge;

    invoke-static {v0}, Lcom/superwiss/game/playtest/NativeBridge;->access$000(Lcom/superwiss/game/playtest/NativeBridge;)Lcom/superwiss/game/playtest/MainActivity;

    move-result-object v0

    const-string v1, "No sharing app available."

    invoke-virtual {v0, v1}, Lcom/superwiss/game/playtest/MainActivity;->nativeError(Ljava/lang/String;)V

    goto :goto_0
.end method
