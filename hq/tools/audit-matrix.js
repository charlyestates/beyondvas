/* Audit matrix: every screen x the current user (from ?user=) x lang en/es. Records problems as FAIL lines. */
var VIEWAS = '__VIEWAS__';
var errs = [];
var origErr = console.error;
console.error = function () { errs.push(Array.prototype.slice.call(arguments).map(function (a) { return a && a.stack ? String(a.message) + ' @ ' + String(a.stack).split('\n').slice(1, 3).join(' | ').replace(/https?:[^\s)]*\//g, '').replace(/file:[^\s)]*\//g, '') : String(a); }).join(' ')); };
var me = HQ.S.userId;
if (VIEWAS && VIEWAS.indexOf('__') < 0) HQ.S.viewAs = VIEWAS;
var tag = me + (HQ.S.viewAs ? '>' + HQ.S.viewAs : '');
var lineIds = []; (HQD.payoutRuns || []).forEach(function (r) { (r.lines || []).forEach(function (l) { if (l.id) lineIds.push(l.id); }); });
var chans = HQ.D.channelsFor(HQ.me()).map(function (c) { return c.id; });
var screens = Object.keys(HQ.V).filter(function (s) { return s !== 'missing'; });
var variants = {
  channel: chans.concat(['ch-rodriguez', 'th-mariela-pay', 'dm-charly-daniela', 'nope']).map(function (id) { return { id: id }; }),
  person: ['u-mariela', 'u-jose', 'u-daniela', 'u-charly', 'u-kevin', 'u-carlos', 'u-lucia', 'u-ana', 'a-sofia', 'u-fernanda', me].map(function (id) { return { id: id }; }),
  client: ['c-rodriguez', 'c-lonestar', 'c-sunshine', 'u-ana'].map(function (id) { return { id: id }; }),
  placement: ['p-rod-1', 'p-rod-2', 'p-lone-1', 'p-sun-1'].map(function (id) { return { id: id }; }),
  applicant: ['app-sofia', 'app-camila', 'app-diego', 'a-sofia'].map(function (id) { return { id: id }; }),
  week: ['wa-p-rod-2-2026-10-12', 'wa-p-sun-1-2026-10-12', 'wa-p-lone-1-2026-10-12', 'wa-p-rod-2-2026-09-28', 'p-rod-2', 'p-sun-1'].map(function (id) { return { id: id }; }),
  invoice: ['inv-1001', 'inv-1008', 'inv-1016'].map(function (id) { return { id: id }; }),
  statement: lineIds.slice(0, 6).map(function (id) { return { id: id }; }),
  event: ['ev-0001', 'ev-0010', 'ev-0020', 'ev-0038', 'ud-0001'].map(function (id) { return { id: id }; }),
  timeoff: ['ud-0001', 'ud-0002'].map(function (id) { return { id: id }; }),
  ticket: ['tk-0007', 'tk-0003', 'tk-0009'].map(function (id) { return { id: id }; }),
  scope: ['p-rod-2', 'p-lone-1', 'p-sun-1', 'p-rod-1'].map(function (id) { return { id: id }; }),
  telemarketing: ['c-rodriguez', 'c-lonestar', 'c-sunshine'].map(function (id) { return { id: id }; }),
  callqa: ['u-mariela', 'u-kevin', 'u-jose'].map(function (id) { return { id: id }; }),
  support: [{ f: 'all' }],
  tickets: [{ f: 'all' }],
  search: [{ q: 'lead' }, { q: 'cita' }],
  academy: [{ mod: 'm3' }, { mod: 'm6' }],
  billing: [{ id: 'c-rodriguez' }, { client: 'all' }],
  payouts: [{ id: 'run-2026-11-05' }, { id: 'run-2026-10-20' }],
  hours: [{ b: 'last' }, { id: 'p-rod-2' }],
  people: [{ seg: 'clients' }, { seg: 'pipeline' }, { seg: 'bench' }],
  pipeline: [{ filter: 'overdue' }],
  documents: [{ seg: 'all' }, { seg: 'people' }, { seg: 'clients' }],
  placements: [{ f: 'ended' }, { f: 'active' }],
  report: [{ id: 'p-rod-2' }, { id: 'p-lone-1' }],
  calendar: [{ id: 'ev-0001' }, { id: 'ud-0001' }],
  money: [{ id: 'c-lonestar' }]
};
var n = 0, fails = 0;
function rec(line) { window.__assert(line, false); fails++; }
function check(lang, screen, params) {
  HQ.S.lang = lang; errs.length = 0; var e0 = window.__errs.length;
  var pid = Object.keys(params).map(function (k) { return k + '=' + params[k]; }).join('&');
  var key = tag + '|' + lang + '|' + screen + (pid ? '?' + pid : '');
  try { HQ.go(screen, params, true); } catch (e) { rec(key + '|THROW|' + (e && e.message)); return; }
  n++;
  var h1 = document.querySelector('.main .topbar h1'); var ttl = h1 ? h1.textContent.trim() : '';
  var content = document.querySelector('.main .content'); var txt = content ? content.innerText.replace(/\s+/g, ' ').trim() : '';
  var html = content ? content.innerHTML : '';
  if (ttl === 'Error') { var nb = content.querySelector('.note.bad'); rec(key + '|RENDER-ERROR|' + (nb ? nb.textContent.trim() : '') + ' :: ' + (errs[0] || '')); }
  if (errs.length) rec(key + '|CONSOLE-ERROR|' + errs.join(' // '));
  if (window.__errs.length > e0) rec(key + '|UNCAUGHT|' + window.__errs.slice(e0).join(' // '));
  if (/not in the prototype yet/i.test(txt)) rec(key + '|NOT-IN-PROTO|' + txt.slice(0, 120));
  if (!txt) rec(key + '|EMPTY-BODY|' + html.slice(0, 160).replace(/\s+/g, ' '));
  else if (content && content.children.length === 1 && content.firstElementChild.classList.contains('empty')) rec(key + '|EMPTY-ONLY|' + txt.slice(0, 140));
  if (!ttl) rec(key + '|NO-TITLE|');
  /* link and action targets in the rendered DOM */
  var bad = {};
  document.querySelectorAll('[data-go]').forEach(function (el) { var g = el.getAttribute('data-go'); if (!HQ.V[g]) bad['go:' + g] = 1; });
  document.querySelectorAll('[data-act]').forEach(function (el) { var a = el.getAttribute('data-act'); if (!HQ.act[a]) bad['act:' + a] = 1; });
  var bk = Object.keys(bad); if (bk.length) rec(key + '|BAD-TARGET|' + bk.join(','));
  /* raw i18n keys leaking: a text node that equals a known key name in camelCase with no spaces, e.g. "nothingHere" */
  var m = txt.match(/\b[a-z]+[A-Z][A-Za-z]+\b/g); if (m) { var leak = m.filter(function (w) { return HQ.T[w]; }); if (leak.length) rec(key + '|RAW-KEY|' + leak.slice(0, 5).join(',')); }
  if (/undefined|NaN|\[object Object\]/.test(txt)) rec(key + '|UNDEFINED-TEXT|' + (txt.match(/.{0,40}(undefined|NaN|\[object Object\]).{0,40}/) || [''])[0]);
  if (lang === 'es' && / Screen "/.test(txt)) rec(key + '|EN-ONLY|');
}
['en', 'es'].forEach(function (lang) {
  screens.forEach(function (sc) {
    check(lang, sc, {});
    (variants[sc] || []).forEach(function (p) { check(lang, sc, p); });
  });
});
/* MORE and NAV targets for this role */
var role = HQ.role();
(HQ.MORE[role] || []).forEach(function (sc) { if (!HQ.V[sc]) rec(tag + '|MORE|' + sc + ' missing on HQ.V'); if (!HQ.T[sc]) rec(tag + '|MORE|' + sc + ' has no label in HQ.T'); });
HQ.navFor(role).forEach(function (nv) { if (!HQ.V[nv.screen]) rec(tag + '|NAV|' + nv.screen + ' missing on HQ.V'); if (!HQ.T[nv.key]) rec(tag + '|NAV|' + nv.key + ' has no label'); if (!HQ.I[nv.icon]) rec(tag + '|NAV|' + nv.icon + ' no icon'); });
console.error = origErr;
window.__assert(tag + ' rendered ' + n + ' views, ' + fails + ' problems', true);
