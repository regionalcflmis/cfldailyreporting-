# CFL Daily PWA v5 — Final Cache-Free Build

यह PWA इस exact Apps Script deployment को full-screen में खोलता है:

`https://script.google.com/macros/s/AKfycbyeTTmWOz7Rb0QoEKQZegIexx0JknfD7Oo9J3U4C9Hp3zZZ6EnzqqC6eHwHNBWGYfsZ/exec`

यह build किसी पुराने Apps Script URL या `?page=mobile` को force नहीं करता। Apps Script का current login/page जैसा है, वही दिखाई देगा।

## सबसे सुरक्षित तरीका — नया GitHub repository

पुराने PWA cache/service-worker से पूरी तरह बचने के लिए नया repository बनाना सबसे अच्छा है। उदाहरण:

`cfl-daily-app-v5`

1. GitHub → New repository.
2. Repository Public रखें (GitHub Pages के लिए आपके plan के अनुसार).
3. इस ZIP को extract करें.
4. ZIP के अंदर की सारी files repository **root** में upload करें. ZIP file अकेली upload न करें.
5. Commit changes.
6. Settings → Pages.
7. Source = Deploy from a branch.
8. Branch = `main`, folder = `/(root)`.
9. Save.
10. Pages URL खुलने में 1–5 मिनट लग सकते हैं.

फिर URL जैसे `https://USERNAME.github.io/cfl-daily-app-v5/` खुलेगा।

## अगर पुराने repository में ही replace करना है

1. पुराने PWA files हटाकर v5 की सारी files upload करें.
2. Commit करें.
3. पहले यह unique reset page खोलें:

`https://USERNAME.github.io/REPO/RESET_PWA_V5.html`

4. Reset के बाद latest app अपने-आप खुलेगा.
5. अगर पुराना installed app है तो उसे Home Screen से uninstall करके GitHub URL फिर खोलें और दुबारा install करें.

## Install on Android

Chrome में GitHub Pages URL खोलें → menu → **Install app / Add to Home screen**.

## Install on iPhone

Safari में GitHub Pages URL खोलें → Share → **Add to Home Screen**.

## Important

PWA का अपना header नहीं है. `Online / Install / Refresh` वाला पुराना bar इस build में नहीं है.

`service-worker-v5.js` `index.html`, `launch-v5.html`, manifest और reset page को cache नहीं करता. Apps Script cross-origin content कभी cache नहीं किया जाता, इसलिए backend हमेशा live रहता है.

अगर PWA में और direct Apps Script URL में अलग login screen दिखे, पहले direct Apps Script URL Incognito में check करें. PWA Apps Script के current deployed UI को ही दिखाता है.
