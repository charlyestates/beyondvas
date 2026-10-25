/* In-page money matrix: runs inside debug.html via ?script= (see money-inpage.ps1). For every user x screen x lang it
   re-renders the app in place and records, per combination: a thrown view (core renders title "Error"), the
   "not in the prototype yet" placeholder, a horizontal overflow, console/uncaught errors, and a per-role leak scan of
   the rendered text (rule 1 and 2 of APP-CONTRACT.md). Results land in <pre id="asserts"> as PASS/FAIL lines. */
(function () {
  var users = ['u-charly', 'u-daniela', 'u-mariela', 'u-jose', 'u-kevin', 'u-carlos', 'u-ana', 'u-mike', 'u-priya', 'a-sofia', 'a-camila'];
  var screens = [['money', ''], ['billing', ''], ['billing', 'c-lonestar'], ['invoice', 'inv-1015'], ['invoice', 'inv-1001'], ['invoice', 'inv-1014'], ['invoice', 'inv-1006'], ['invoice', 'nope'],
    ['payouts', ''], ['payouts', 'run-2026-11-05'], ['payouts', '2026-10-20'], ['statement', 'st-2026-10-20-mariela'], ['statement', 'pl-2026-11-05-jose'], ['statement', 'st-2026-10-20-andrea'], ['statement', 'nope'],
    ['reports', ''], ['settings', '']];
  var langs = ['en', 'es'];
  var vaCommon = 'BV-10\\d\\d|margin|margen|\\$12|\\$10/|\\$8/|\\$(960|480|800|474|963|979)\\b|1,059';
  /* clients: VA surnames, any pay rate (rates always render as "$6.50/hr" or "$6.50/h"), margin, other clients.
     A bare "$6.00" is not a pay rate: it is also a true-up line amount (0.5 h x $12) on the client's own invoice. */
  var clientCommon = 'Castellanos|Andino|Molina|\\bPaz\\b|Herrera|Mej[ií]a|\\$(4\\.50|5\\.00|5\\.50|6\\.00|6\\.50|7\\.00|5|6|7|4\\.5|5\\.5|6\\.5)/h|margin|margen';
  var forbid = {
    'u-ana': clientCommon + '|Lone Star|Sunshine|Priya|Jenna',
    'u-mike': clientCommon + '|Rodriguez|Sunshine|Priya|Ana\\b',
    'u-priya': clientCommon + '|Rodriguez|Lone Star|Jenna|Mike|Ana\\b',
    'u-mariela': vaCommon + '|Lone Star|Sunshine|\\$5/|\\$5\\.5|\\$5\\.50',
    'u-jose': vaCommon + '|Rodriguez|Sunshine|\\$6/|\\$6\\.5|\\$5\\.5',
    'u-kevin': vaCommon + '|Rodriguez|Sunshine|Lone Star|\\$5/|\\$5\\.5|\\$6/|\\$6\\.5',
    'u-carlos': vaCommon + '|Rodriguez|Sunshine|Lone Star|\\$5/|\\$5\\.5|\\$6/|\\$6\\.5',
    'u-daniela': 'BV-10\\d\\d|margin|margen|\\$12/|\\$10/|\\$8/|\\$(960|480|800|474|963|979)\\b|1,059',
    'a-sofia': '\\$\\d|BV-10\\d\\d|margin|margen',
    'a-camila': '\\$\\d|BV-10\\d\\d|margin|margen',
    'u-charly': '(?!x)x'
  };
  var ce = console.error; console.error = function () { try { var a = arguments[0]; window.__errs.push('console: ' + (a && a.stack ? a.stack.split('\n').slice(0, 2).join(' ') : String(a))); } catch (e) {} ce.apply(console, arguments); };
  var n = 0, bad = 0;
  users.forEach(function (u) { screens.forEach(function (sc) { langs.forEach(function (l) {
    n++;
    HQ.S.userId = u; HQ.S.viewAs = null; HQ.S.lang = l; HQ.S.screen = sc[0]; HQ.S.params = sc[1] ? { id: sc[1] } : {}; HQ.S.hist = []; HQ.S.picker = false;
    var before = window.__errs.length;
    try { HQ.render(); } catch (e) { window.__errs.push('render: ' + (e && e.message)); }
    var app = document.getElementById('app'); var txt = app ? app.textContent : '';
    var flags = '';
    if (document.title.indexOf('Error') === 0) flags += ' VIEWERR';
    if (/not in the prototype yet/.test(txt)) flags += ' MISSING';
    if (document.documentElement.scrollWidth > window.innerWidth) flags += ' OVERFLOW(' + document.documentElement.scrollWidth + '>' + window.innerWidth + ')';
    var leak = txt.match(new RegExp(forbid[u] || '(?!x)x', 'g'));
    if (leak) { var uniq = {}; leak.forEach(function (x) { uniq[x] = 1; }); flags += ' LEAK(' + Object.keys(uniq).join('|') + ')'; }
    var errs = window.__errs.slice(before);
    if (errs.length) flags += ' ERR[' + errs.join(' ; ') + ']';
    if (flags) bad++;
    window.__assert(u + ' ' + sc[0] + ' ' + (sc[1] || '-') + ' ' + l + flags, !flags);
  }); }); });
  /* i18n: every key money.js uses, and every HQ.T entry, has en and es */
  var miss = []; Object.keys(HQ.T).forEach(function (k) { var e = HQ.T[k]; if (!e || typeof e !== 'object' || !e.en || !e.es) miss.push(k); });
  window.__assert('HQ.T entries lacking a language: ' + miss.join(','), !miss.length);
  window.__assert('SUMMARY combos=' + n + ' flagged=' + bad, !bad);
})();
