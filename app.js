(() => {
  const cfg = window.CFL_PWA_CONFIG || {};
  const appUrl = String(cfg.appUrl || '').replace(/\/$/, '');
  const page = cfg.startPage || 'mobile';
  const frame = document.getElementById('appFrame');
  const loading = document.getElementById('loading');
  const fallback = document.getElementById('fallback');
  const netState = document.getElementById('netState');
  const installBtn = document.getElementById('installBtn');
  let installPrompt = null;
  let loadTimer = null;

  function targetUrl(){
    if (!appUrl) return '';
    return appUrl + (appUrl.includes('?') ? '&' : '?') + 'page=' + encodeURIComponent(page) + '&pwa=1&t=' + Date.now();
  }
  function setNetwork(){
    const online = navigator.onLine;
    netState.textContent = online ? 'Online' : 'Offline';
    netState.classList.toggle('offline', !online);
  }
  function openFrame(){
    const url = targetUrl();
    fallback.hidden = true;
    loading.hidden = false;
    frame.style.opacity = '0';
    if (!url) { fallback.hidden = false; loading.hidden = true; return; }
    frame.src = url;
    clearTimeout(loadTimer);
    loadTimer = setTimeout(() => {
      if (frame.style.opacity !== '1') { loading.hidden = true; fallback.hidden = false; }
    }, 15000);
  }
  frame.addEventListener('load', () => {
    clearTimeout(loadTimer);
    loading.hidden = true;
    fallback.hidden = true;
    frame.style.opacity = '1';
  });
  document.getElementById('refreshBtn').addEventListener('click', openFrame);
  document.getElementById('retryBtn').addEventListener('click', openFrame);
  document.getElementById('openDirectBtn').addEventListener('click', () => location.href = targetUrl());
  addEventListener('online', setNetwork); addEventListener('offline', setNetwork); setNetwork();

  addEventListener('beforeinstallprompt', e => { e.preventDefault(); installPrompt = e; installBtn.hidden = false; });
  installBtn.addEventListener('click', async () => {
    if (!installPrompt) return;
    installPrompt.prompt(); await installPrompt.userChoice; installPrompt = null; installBtn.hidden = true;
  });
  addEventListener('appinstalled', () => installBtn.hidden = true);

  if ('serviceWorker' in navigator) addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js').catch(console.warn));
  openFrame();
})();
