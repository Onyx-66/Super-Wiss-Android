.class Lcom/superwiss/game/playtest/MainActivity$1;
.super Ljava/lang/Object;
.source "MainActivity.java"

# interfaces
.implements Ljava/lang/Runnable;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = Lcom/superwiss/game/playtest/MainActivity;->nativeEvent(Lorg/json/JSONObject;)V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic this$0:Lcom/superwiss/game/playtest/MainActivity;

.field final synthetic val$value:Lorg/json/JSONObject;


# direct methods
.method constructor <init>(Lcom/superwiss/game/playtest/MainActivity;Lorg/json/JSONObject;)V
    .locals 0
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "()V"
        }
    .end annotation

    .prologue
    .line 27
    iput-object p1, p0, Lcom/superwiss/game/playtest/MainActivity$1;->this$0:Lcom/superwiss/game/playtest/MainActivity;

    iput-object p2, p0, Lcom/superwiss/game/playtest/MainActivity$1;->val$value:Lorg/json/JSONObject;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public run()V
    .locals 3

    .prologue
    .line 27
    iget-object v0, p0, Lcom/superwiss/game/playtest/MainActivity$1;->this$0:Lcom/superwiss/game/playtest/MainActivity;

    invoke-static {v0}, Lcom/superwiss/game/playtest/MainActivity;->access$000(Lcom/superwiss/game/playtest/MainActivity;)Landroid/webkit/WebView;

    move-result-object v0

    if-eqz v0, :cond_0

    iget-object v0, p0, Lcom/superwiss/game/playtest/MainActivity$1;->this$0:Lcom/superwiss/game/playtest/MainActivity;

    invoke-static {v0}, Lcom/superwiss/game/playtest/MainActivity;->access$000(Lcom/superwiss/game/playtest/MainActivity;)Landroid/webkit/WebView;

    move-result-object v0

    new-instance v1, Ljava/lang/StringBuilder;

    invoke-direct {v1}, Ljava/lang/StringBuilder;-><init>()V

    const-string v2, "window.dispatchEvent(new CustomEvent(\'sw-native\',{detail:JSON.parse("

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    move-result-object v1

    iget-object v2, p0, Lcom/superwiss/game/playtest/MainActivity$1;->val$value:Lorg/json/JSONObject;

    invoke-virtual {v2}, Lorg/json/JSONObject;->toString()Ljava/lang/String;

    move-result-object v2

    invoke-static {v2}, Lorg/json/JSONObject;->quote(Ljava/lang/String;)Ljava/lang/String;

    move-result-object v2

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    move-result-object v1

    const-string v2, ")}));"

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    move-result-object v1

    invoke-virtual {v1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v1

    const/4 v2, 0x0

    invoke-virtual {v0, v1, v2}, Landroid/webkit/WebView;->evaluateJavascript(Ljava/lang/String;Landroid/webkit/ValueCallback;)V

    :cond_0
    return-void
.end method
