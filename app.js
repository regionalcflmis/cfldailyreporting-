(() => {
  const cfg = window.CFL_PWA_CONFIG || {};
  const appUrl = String(cfg.appUrl || '').replace(/\/$/, '');
  const page = String(cfg.startPage || 'mobile');
  const timeoutMs = Number(cfg.loadTimeoutMs || 30000);
  const frame = document.getElementById('appFrame');
  const splash = document.getElementById('splash');
  const offlinePanel = document.getElementById('offlinePanel');
  const errorPanel = document.getElementById('errorPanel');
  const installBtn = document.getElementById('installBtn');
  const loadingText = document.getElementById('loadingText');
  let timer = null;
  let installPrompt = null;

  function buildUrl() {
    if (!appUrl) return '';
    const sep = appUrl.includes('?') ? '&' : '?';
    return appUrl + sep + 'page=' + encodeURIComponent(page) + '&pwa=1&v=2';
  }

  function showSplash(text) {
    loadingText.textContent = text || 'ऐप खुल रहा है…';
    splash.hidden = false;
    splash.classList.remove('hide');
    errorPanel.hidden = true;
    offlinePanel.hidden = true;
    frame.classList.remove('ready');
  }

  function hideSplash() {
    frame.classList.add('ready');
    splash.classList.add('hide');
    setTimeout(() => { splash.hidden = true; }, 220);
  }

  function openApp(force) {
    clearTimeout(timer);
    if (!navigator.onLine) {
      splash.hidden = true;
      errorPanel.hidden = true;
      offlinePanel.hidden = false;
      return;
    }
    const url = buildUrl();
    if (!url) {
      splash.hidden = true;
      errorPanel.hidden = false;
      return;
    }
    showSplash('ऐप खुल रहा है…');
    frame.src = force ? url + '&t=' + Date.now() : url;
    timer = setTimeout(() => {
      if (!frame.classList.contains('ready')) {
        splash.hidden = true;
        errorPanel.hidden = false;
      }
    }, timeoutMs);
  }

  frame.addEventListener('load', () => {
    clearTimeout(timer);
    hideSplash();
  });

  document.getElementById('retryBtn').addEventListener('click', () => openApp(true));
  document.getElementById('reloadBtn').addEventListener('click', () => openApp(true));
  document.getElementById('directBtn').addEventListener('click', () => { location.href = buildUrl(); });

  addEventListener('offline', () => {
    offlinePanel.hidden = false;
    errorPanel.hidden = true;
  });
  addEventListener('online', () => {
    offlinePanel.hidden = true;
    openApp(true);
  });

  addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    installPrompt = e;
    installBtn.hidden = false;
  });
  installBtn.addEventListener('click', async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    await installPrompt.userChoice;
    installPrompt = null;
    installBtn.hidden = true;
  });
  addEventListener('appinstalled', () => { installBtn.hidden = true; });

  if ('serviceWorker' in navigator) {
    addEventListener('load', async () => {
      try {
        const reg = await navigator.serviceWorker.register('./service-worker.js?v=2');
        reg.update().catch(() => {});
      } catch (e) {
        console.warn('Service worker registration failed', e);
      }
    });
  }

  openApp(false);
})();
