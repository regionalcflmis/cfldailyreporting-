(() => {
  'use strict';
  const cfg = window.CFL_PWA_CONFIG || {};
  const appUrl = String(cfg.appUrl || '').replace(/\/$/, '');
  const timeoutMs = Number(cfg.loadTimeoutMs || 45000);
  const version = String(cfg.version || '3');
  const frame = document.getElementById('appFrame');
  const splash = document.getElementById('splash');
  const offlinePanel = document.getElementById('offlinePanel');
  const errorPanel = document.getElementById('errorPanel');
  const installBtn = document.getElementById('installBtn');
  const loadingText = document.getElementById('loadingText');
  let timer = null;
  let installPrompt = null;

  function requestedPage() {
    const q = new URLSearchParams(location.search);
    return String(q.get('page') || cfg.startPage || '').trim();
  }

  function buildUrl(force) {
    if (!appUrl) return '';
    const params = [];
    const page = requestedPage();
    if (page) params.push('page=' + encodeURIComponent(page));
    params.push('pwa=1');
    params.push('pwaVersion=' + encodeURIComponent(version));
    if (force) params.push('_=' + Date.now());
    return appUrl + (appUrl.includes('?') ? '&' : '?') + params.join('&');
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
    setTimeout(() => { splash.hidden = true; }, 180);
  }

  function openApp(force = false) {
    clearTimeout(timer);
    if (!navigator.onLine) {
      splash.hidden = true;
      errorPanel.hidden = true;
      offlinePanel.hidden = false;
      return;
    }
    const url = buildUrl(force);
    if (!url) {
      splash.hidden = true;
      errorPanel.hidden = false;
      return;
    }
    showSplash('CFL ऐप खुल रहा है…');
    frame.src = url;
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
  document.getElementById('directBtn').addEventListener('click', () => {
    location.href = buildUrl(true);
  });

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
        const reg = await navigator.serviceWorker.register('./service-worker.js?v=3');
        reg.update().catch(() => {});
      } catch (e) {
        console.warn('Service worker registration failed', e);
      }
    });
  }

  openApp(false);
})();
