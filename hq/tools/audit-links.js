/* Follow every data-go link (with its data-* params) rendered on the role's root screens and report the ones that land on a bare empty state. */
var me = HQ.me(); var tag = me.id;
window.__assert('innerWidth=' + window.innerWidth + ' isPhone=' + HQ.isPhone(), true);
var roots = ['home', 'inbox', 'channels', 'hours', 'people', 'money', 'clients', 'more', 'help', 'billing', 'profile', 'report', 'academy', 'tests', 'calendar', 'compliance', 'placement', 'placements', 'support', 'documents', 'notifications', 'pipeline', 'bench', 'cohorts', 'tickets', 'payouts', 'settings', 'timeoff', 'reports', 'audit', 'announce', 'onboarding', 'search', 'outages'];
var seen = {}, n = 0;
roots.forEach(function (root) {
  ['en', 'es'].forEach(function (lang) {
    HQ.S.lang = lang;
    try { HQ.go(root, {}, true); } catch (e) { window.__assert(tag + '|' + root + ' threw ' + e.message, false); return; }
    var links = Array.prototype.slice.call(document.querySelectorAll('[data-go]')).map(function (el) { var p = {}; Object.keys(el.dataset).forEach(function (k) { if (k !== 'go') p[k] = el.dataset[k]; }); return { go: el.dataset.go, p: p, label: (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 50), where: el.closest('.tabs') ? 'tabs' : el.closest('.rail') ? 'rail' : el.closest('.side') ? 'side' : el.closest('.pane') ? 'pane' : el.closest('.topbar') ? 'topbar' : 'main' } });
    links.forEach(function (l) {
      var sig = lang + '|' + l.go + '|' + JSON.stringify(l.p); if (seen[sig]) return; seen[sig] = 1; n++;
      try { HQ.go(l.go, l.p, true); } catch (e) { window.__assert(tag + '|' + lang + '|' + root + ' -> ' + l.go + ' ' + JSON.stringify(l.p) + ' threw ' + e.message, false); return; }
      var c = document.querySelector('.main .content'); var txt = c ? c.innerText.replace(/\s+/g, ' ').trim() : '';
      var h1 = document.querySelector('.main .topbar h1'); var ttl = h1 ? h1.textContent.trim() : '';
      if (ttl === 'Error' || !txt || (c.children.length === 1 && c.firstElementChild.classList.contains('empty'))) window.__assert(tag + '|' + lang + '|' + root + ' [' + l.where + ' "' + l.label + '"] -> ' + l.go + ' ' + JSON.stringify(l.p) + ' => ' + (txt || '(empty body)').slice(0, 110), false);
      try { HQ.go(root, {}, true); } catch (e) {}
    });
  });
});
window.__assert(tag + ' followed ' + n + ' links', true);
