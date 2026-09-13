# CFL Daily PWA v2 — Full Screen Fix

इस version में GitHub PWA का extra top header हटा दिया गया है। App खुलने के बाद केवल Apps Script वाला CFL login/form दिखाई देगा।

## Existing GitHub repository update
1. ZIP extract करें।
2. पुराने repository की root files को इस ZIP की files से replace/upload करें।
3. GitHub में **Add file → Upload files** से सभी files/folders upload करें।
4. `assets` folder भी पूरा upload करें।
5. **Commit changes** करें।
6. Settings → Pages में branch `main` और `/(root)` पहले जैसा रहने दें।
7. 1–3 मिनट बाद GitHub Pages URL खोलें।

## अगर पुराना header फिर भी दिखे
पुराना Service Worker/cache हो सकता है। इनमें से कोई एक करें:
- Chrome में GitHub PWA page खोलकर **Ctrl+Shift+R** करें।
- Mobile में installed पुराना app एक बार remove करके GitHub Pages URL दोबारा खोलें और Install करें।
- या Chrome Site Settings → Storage → Clear site data करके reload करें।

## Apps Script URL
`config.js` में आपका existing deployment URL पहले से set है।

## क्या बदला
- Extra GitHub green header हटाया।
- Full viewport iframe बनाया।
- Loading के समय केवल short green splash दिखता है, app load होते ही गायब हो जाता है।
- PWA cache version v2 किया ताकि पुराने UI से conflict कम हो।
- Mobile safe-area और full-screen standalone mode support रखा।
