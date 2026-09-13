# CFL Daily PWA v3 — Exact Apps Script Deployment

यह PWA इस exact Apps Script Web App को full-screen में खोलता है:

https://script.google.com/macros/s/AKfycbyeTTmWOz7Rb0QoEKQZegIexx0JknfD7Oo9J3U4C9Hp3zZZ6EnzqqC6eHwHNBWGYfsZ/exec

## क्या बदला है
- पुराने Apps Script deployment URL को पूरी तरह हटाया गया है।
- PWA अब `/exec` root खोलता है; `?page=mobile` force नहीं करता।
- Apps Script login के बाद role/mobile routing खुद करेगा।
- PWA का अलग top header नहीं है; Apps Script app full-screen दिखता है।
- Camera और GPS iframe permissions enabled हैं।
- GitHub shell cache होता है, लेकिन Apps Script live रहता है।

## GitHub Pages पर upload
1. ZIP extract करें।
2. Repository में ZIP के अंदर की सभी files root में upload/replace करें।
3. Commit changes करें।
4. Settings > Pages > Deploy from a branch > main > /(root) > Save.
5. 1–3 मिनट बाद Pages URL खोलें।

## पुराने PWA cache को हटाना
अगर पुराना design/URL दिखे:
- Desktop: Ctrl+Shift+R
- Chrome Android: installed पुराना PWA uninstall करें, browser site data/cache clear करें, नया GitHub URL खोलें और Install app करें।

## Mobile install
Android Chrome: menu > Install app / Add to Home screen.
iPhone Safari: Share > Add to Home Screen.

## Optional deep links
GitHub PWA URL में `?page=daily`, `?page=village`, `?page=demand` आदि देने पर वही page Apps Script को pass किया जा सकता है, यदि backend route उसे support करता है।
