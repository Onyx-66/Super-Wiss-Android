.class Lcom/superwiss/game/playtest/MainActivity$2;
.super Ljava/lang/Object;
.source "MainActivity.java"

# interfaces
.implements Lcom/superwiss/game/playtest/BluetoothLink$Listener;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = Lcom/superwiss/game/playtest/MainActivity;->onCreate(Landroid/os/Bundle;)V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic this$0:Lcom/superwiss/game/playtest/MainActivity;


# direct methods
.method constructor <init>(Lcom/superwiss/game/playtest/MainActivity;)V
    .locals 0

    .prologue
    .line 50
    iput-object p1, p0, Lcom/superwiss/game/playtest/MainActivity$2;->this$0:Lcom/superwiss/game/playtest/MainActivity;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public event(Lorg/json/JSONObject;)V
    .locals 1

    .prologue
    .line 50
    iget-object v0, p0, Lcom/superwiss/game/playtest/MainActivity$2;->this$0:Lcom/superwiss/game/playtest/MainActivity;

    invoke-virtual {v0, p1}, Lcom/superwiss/game/playtest/MainActivity;->nativeEvent(Lorg/json/JSONObject;)V

    return-void
.end method
