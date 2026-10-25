/* Action smoke: for the current user, render every screen (en), invoke every data-act on it, then every data-act inside any sheet it opened. Records thrown/console errors. */
var VIEWAS = '__VIEWAS__';
var errs = [];
var origErr = console.error;
console.error = function () { errs.push(Array.prototype.slice.call(arguments).map(function (a) { return a && a.stack ? String(a.message) + ' @ ' + String(a.stack).split('\n').slice(1, 3).join(' | ').replace(/file:[^\s)]*\//g, '') : String(a); }).join(' ')); };
var me = HQ.S.userId; if (VIEWAS && VIEWAS.indexOf('__') < 0) HQ.S.viewAs = VIEWAS;
var tag = me + (HQ.S.viewAs ? '>' + HQ.S.viewAs : '');
var SKIP = { 'pick-user': 1, 'open-picker': 1, 'close-picker': 1, 'toggle-lang': 1, 'set-lang': 1, 'toggle-theme': 1, 'set-theme': 1, 'back': 1, 'view-as': 1, 'exit-view': 1, 'close-sheet': 1 };
var chans = HQ.D.channelsFor(HQ.me()).map(function (c) { return c.id; });
var screens = Object.keys(HQ.V).filter(function (s) { return s !== 'missing'; });
var variants = {
  channel: chans.map(function (id) { return { id: id }; }),
  person: ['u-mariela', 'u-kevin', 'u-carlos', me].map(function (id) { return { id: id }; }),
  client: ['c-rodriguez', 'c-lonestar'].map(function (id) { return { id: id }; }),
  placement: ['p-rod-2', 'p-lone-1', 'p-sun-1'].map(function (id) { return { id: id }; }),
  applicant: ['app-sofia', 'app-camila'].map(function (id) { return { id: id }; }),
  week: ['wa-p-rod-2-2026-10-12', 'wa-p-sun-1-2026-10-12', 'p-rod-2'].map(function (id) { return { id: id }; }),
  invoice: ['inv-1001', 'inv-1008'].map(function (id) { return { id: id }; }),
  event: ['ev-0001', 'ev-0010', 'ud-0001'].map(function (id) { return { id: id }; }),
  ticket: ['tk-0007', 'tk-0003', 'tk-0009'].map(function (id) { return { id: id }; }),
  scope: ['p-rod-2', 'p-lone-1'].map(function (id) { return { id: id }; }),
  telemarketing: ['c-rodriguez', 'c-lonestar'].map(function (id) { return { id: id }; }),
  callqa: ['u-mariela', 'u-kevin'].map(function (id) { return { id: id }; }),
  payouts: [{ id: 'run-2026-11-05' }],
  people: [{ seg: 'clients' }, { seg: 'pipeline' }, { seg: 'bench' }],
  documents: [{ seg: 'all' }]
};
var n = 0, fails = 0, seen = {};
function rec(line) { window.__assert(line, false); fails++; }
function fire(key, el, where) {
  var a = el.getAttribute('data-act'); if (SKIP[a]) return;
  var sig = a + ':' + JSON.stringify(el.dataset); if (seen[key + sig]) return; seen[key + sig] = 1;
  errs.length = 0; var e0 = window.__errs.length; n++;
  var fn = HQ.act[a]; if (!fn) { rec(key + '|NO-ACT|' + a + ' ' + where); return; }
  try { fn(el, { preventDefault: function () {}, target: el, key: '', shiftKey: false }); } catch (e) { rec(key + '|ACT-THROW|' + a + ' ' + JSON.stringify(el.dataset) + ' ' + where + ' :: ' + (e && e.message) + ' @ ' + String(e && e.stack).split('\n').slice(1, 2).join('').replace(/file:[^\s)]*\//g, '')); }
  if (errs.length) rec(key + '|ACT-CONSOLE|' + a + ' ' + where + ' :: ' + errs.join(' // '));
  if (window.__errs.length > e0) rec(key + '|ACT-UNCAUGHT|' + a + ' :: ' + window.__errs.slice(e0).join(' // '));
  var h1 = document.querySelector('.main .topbar h1'); if (h1 && h1.textContent.trim() === 'Error') { var nb = document.querySelector('.main .content .note.bad'); rec(key + '|ACT-RENDER-ERROR|' + a + ' ' + where + ' :: ' + (nb ? nb.textContent.trim() : '')); }
  if (/not in the prototype yet/i.test(document.querySelector('.main .content').innerText)) rec(key + '|ACT-NOT-IN-PROTO|' + a + ' -> ' + HQ.S.screen);
}
function run(screen, params) {
  var pid = Object.keys(params).map(function (k) { return k + '=' + params[k]; }).join('&');
  var key = tag + '|en|' + screen + (pid ? '?' + pid : '');
  HQ.S.lang = 'en'; HQ.closeSheet();
  try { HQ.go(screen, params, true); } catch (e) { return; }
  var acts = Array.prototype.slice.call(document.querySelectorAll('.main [data-act], .side [data-act], .pane [data-act]'));
  acts.forEach(function (el) {
    if (!document.body.contains(el)) { /* re-render replaced it: find a twin */ var twin = document.querySelector('[data-act="' + el.getAttribute('data-act') + '"]'); if (!twin) return; el = twin; }
    fire(key, el, 'on screen');
    var sheet = document.getElementById('sheet');
    if (sheet) {
      var inner = Array.prototype.slice.call(sheet.querySelectorAll('[data-act]'));
      inner.forEach(function (b) { if (document.body.contains(b)) fire(key, b, 'in sheet ' + el.getAttribute('data-act')); var s2 = document.getElementById('sheet'); if (s2 && s2 !== sheet) { HQ.closeSheet(); } });
      HQ.closeSheet();
    }
    if (HQ.S.screen !== screen) { HQ.closeSheet(); try { HQ.go(screen, params, true); } catch (e) {} }
  });
}
screens.forEach(function (sc) { run(sc, {}); (variants[sc] || []).forEach(function (p) { run(sc, p); }); });
console.error = origErr;
window.__assert(tag + ' fired ' + n + ' actions, ' + fails + ' problems', true);
