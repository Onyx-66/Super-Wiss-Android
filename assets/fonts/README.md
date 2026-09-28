# Optional pixel font inputs

No font binaries are included in this delivery. The game makes no font/CDN requests.
The UI declares **Pixelify Sans, weight 700** for headings and **VT323, weight 400** for body copy.
Until those families are installed/packaged, the explicit fallback is Courier New / monospace.
This means the shipped default has the new typography hierarchy and gradient, but not the exact
selected font shapes on a stock Android device.

On your development machine, `python scripts/install-fonts.py` fetches the selected Latin WOFF2
subsets from Google Fonts; review their licenses before redistribution. Then `npm run build`
embeds them in the single HTML preview and copies them into Android assets. This optional command
is not run by the normal build. See `docs/FONT-SETUP.md`.
