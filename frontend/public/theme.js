// Runs before the page paints, so a dark-mode visitor never sees a white flash.
(function () {
  try {
    var t = localStorage.getItem('theme') || 'system';
    var dark = t === 'dark' || (t === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
    if (dark) document.documentElement.classList.add('dark');
    // The intro (src/components/Intro.jsx) plays on the first page of a visit; hold the page behind it from the start.
    if (!sessionStorage.getItem('introSeen') && !matchMedia('(prefers-reduced-motion: reduce)').matches) document.documentElement.classList.add('intro-on');
  } catch (e) {}
})();
