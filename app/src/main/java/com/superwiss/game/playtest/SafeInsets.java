package com.superwiss.game.playtest;

import android.os.Build;
import android.view.DisplayCutout;
import android.view.View;
import android.view.WindowInsets;

/** Keep the play area and thumb controls clear of display cutouts and system bars. */
public final class SafeInsets implements View.OnApplyWindowInsetsListener {
    @SuppressWarnings("deprecation")
    @Override public WindowInsets onApplyWindowInsets(View view, WindowInsets insets) {
        int left=insets.getSystemWindowInsetLeft(), top=insets.getSystemWindowInsetTop();
        int right=insets.getSystemWindowInsetRight(), bottom=insets.getSystemWindowInsetBottom();
        if (Build.VERSION.SDK_INT >= 28) {
            DisplayCutout cutout=insets.getDisplayCutout();
            if (cutout != null) {
                left=Math.max(left,cutout.getSafeInsetLeft()); top=Math.max(top,cutout.getSafeInsetTop());
                right=Math.max(right,cutout.getSafeInsetRight()); bottom=Math.max(bottom,cutout.getSafeInsetBottom());
            }
        }
        view.setPadding(left,top,right,bottom);
        return insets;
    }
}
