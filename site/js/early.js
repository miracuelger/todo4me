/* Runs before first paint: the page is dark-only; apply the saved (or browser) language to <html> to avoid a flash. */
(function () {
  var root = document.documentElement;
  var lang = null;
  try { lang = localStorage.getItem('todo4me.site.lang'); } catch (e) { /* storage blocked */ }
  if (lang !== 'en' && lang !== 'de') {
    lang = /^de\b/i.test(navigator.language || '') ? 'de' : 'en';
  }
  root.setAttribute('data-theme', 'dark');
  root.setAttribute('lang', lang);
})();
