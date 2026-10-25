/* Dumps the visible text of selected screens (and a few sheets) for the current user so the privacy sweep can be eyeballed. */
(function () {
  var me = HQ.me(), role = me.role, out = window.__asserts;
  function strip(html) { return html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim(); }
  function dump(label) { var app = document.getElementById('app'), sh = document.getElementById('sheet'); var main = app.querySelector('.main .content'); var side = app.querySelector('.side'); var pane = app.querySelector('.pane');
    out.push('=== ' + label + ' :: ' + (document.querySelector('.topbar h1') || {}).textContent);
    out.push('MAIN: ' + strip(main ? main.innerHTML : '').slice(0, 2500));
    if (side) out.push('SIDE: ' + strip(side.innerHTML).slice(0, 800));
    if (pane) out.push('PANE: ' + strip(pane.innerHTML).slice(0, 1200));
    if (sh) out.push('SHEET: ' + strip(sh.innerHTML).slice(0, 1500)); }
  var list = {
    client: [['home'], ['hours'], ['week', 'wa-p-rod-2-2026-10-12'], ['week', 'wa-p-lone-1-2026-10-12'], ['week', 'wa-p-sun-1-2026-10-05'], ['placement'], ['ticket', 'tk-0003'], ['ticket', 'tk-0007'], ['notifications'], ['help'], ['billing'], ['settings'], ['timeoff'], ['report'], ['calendar'], ['person', 'u-mariela'], ['person', 'u-jose'], ['person', 'u-daniela'], ['scope', 'p-rod-2'], ['scope', 'p-lone-1'], ['scope', 'p-sun-1'], ['telemarketing', 'c-rodriguez'], ['telemarketing', 'c-sunshine'], ['outages'], ['tickets', null, { f: 'all' }], ['event', 'ev-0008'], ['event', 'ev-0015']],
    va: [['home'], ['hours'], ['placement'], ['profile'], ['money'], ['notifications'], ['ticket', 'tk-0007'], ['ticket', 'tk-0009'], ['support', 'th-jose-client'], ['person', 'u-mariela'], ['person', 'u-daniela'], ['person', 'u-ana'], ['bench'], ['calendar'], ['event', 'ev-0006'], ['event', 'ev-0008'], ['outages'], ['week', 'wa-p-lone-1-2026-10-12'], ['callqa', 'u-mariela'], ['scope', 'p-rod-2'], ['scope', 'p-lone-1'], ['telemarketing', 'c-rodriguez'], ['academy'], ['documents'], ['tests'], ['channel', 'ch-team'], ['channel', 'ch-announcements']],
    manager: [['inbox'], ['client', 'c-rodriguez'], ['client', 'c-lonestar'], ['money'], ['reports'], ['placement', 'p-rod-2'], ['billing'], ['invoice', 'inv-1014'], ['settings'], ['person', 'u-mariela'], ['week', 'wa-p-rod-2-2026-10-12'], ['compliance'], ['audit'], ['home']]
  }[role] || [];
  list.forEach(function (row) { var params = {}; if (row[1]) params.id = row[1]; if (row[2]) Object.keys(row[2]).forEach(function (k) { params[k] = row[2][k]; }); HQ.closeSheet(); try { HQ.go(row[0], params, true); } catch (e) { out.push('ERR ' + row[0] + ' ' + e.message); } dump(row[0] + (row[1] ? ' ' + row[1] : '')); });
  /* sheets */
  if (role === 'client') { var pl = HQ.D.placementForClient(me.clientId)[0]; if (pl && HQ.act['open-escalate']) { HQ.go('home', {}, true); HQ.act['open-escalate']({ dataset: { id: pl.id } }); dump('SHEET open-escalate'); HQ.closeSheet(); } }
  if (role === 'va' && HQ.act['open-outage']) { HQ.go('outages', {}, true); try { HQ.act['open-outage']({ dataset: {} }); dump('SHEET open-outage'); } catch (e) { out.push('ERR open-outage ' + e.message); } HQ.closeSheet(); }
  out.push('DONE ' + me.id);
})();
