package com.superwiss.game.playtest;
import android.app.Activity;
import android.webkit.ValueCallback;

/** The game gets first refusal: pause, close dialog, or return to the lobby. */
public final class BackResult implements ValueCallback<String> {
    private final Activity activity;
    public BackResult(Activity activity) { this.activity=activity; }
    @Override public void onReceiveValue(String value) {
        if (!"true".equals(value)) activity.finish();
    }
}
