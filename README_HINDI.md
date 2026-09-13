# CFL Daily PWA — GitHub Pages Setup

यह package existing Google Apps Script web app को installable PWA shell में खोलता है। Apps Script backend/database वही रहेगा।

## GitHub पर upload
1. ZIP extract करें।
2. GitHub.com पर नया repository बनाएं, उदाहरण: `cfl-daily-pwa`.
3. Repository में **Add file → Upload files** चुनें।
4. इस folder के अंदर की सभी files/folders upload करें (`index.html`, `manifest.webmanifest`, `service-worker.js`, `assets` आदि)। ZIP file अकेली upload न करें।
5. **Commit changes** दबाएं।
6. Repository में **Settings → Pages** खोलें।
7. **Build and deployment → Source = Deploy from a branch**.
8. Branch = **main**, Folder = **/(root)**, फिर **Save**.
9. 1–3 मिनट में GitHub Pages URL मिलेगा, जैसे `https://USERNAME.github.io/cfl-daily-pwa/`.

## Android में install
1. GitHub Pages URL Chrome में खोलें।
2. ऊपर Install button दिखे तो उसे दबाएं, या Chrome menu → **Add to Home screen / Install app**.
3. App home screen से standalone खुलेगा।

## iPhone/iPad
Safari में GitHub Pages URL खोलें → Share → **Add to Home Screen**.

## Apps Script URL बदलना हो
`config.js` में `appUrl` बदलें और GitHub पर file update करें।

## Important
- GitHub Pages केवल PWA shell/static files host करता है।
- Login, master mapping, Google Sheets data, camera submission और admin logic अभी भी Apps Script backend से चलता है।
- Offline mode में shell खुलेगा लेकिन live Google Sheet forms/data बिना internet के नहीं चलेंगे।
- Apps Script में `setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)` होना जरूरी है; current v21 code में यह enabled है।
