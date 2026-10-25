/* Privacy sweep: renders every screen for the current user and scans #app (+ any sheet) for forbidden strings. */
(function () {
  var D = window.HQD, me = HQ.me(), role = me.role;
  var out = window.__asserts;
  var myClient = me.clientId || null;
  var ids = function (arr) { return (arr || []).map(function (x) { return x.id; }); };
  var stIds = []; (D.payoutRuns || []).forEach(function (r) { (r.lines || []).forEach(function (l) { if (l.statementId) stIds.push(l.statementId); }); });
  var matrix = [
    ['home'], ['more'], ['notifications'], ['missing'], ['channels'], ['report'], ['announce'], ['inbox'],
    ['people'], ['people', null, { seg: 'clients' }], ['people', null, { seg: 'pipeline' }], ['people', null, { seg: 'bench' }],
    ['clients'], ['profile'], ['pipeline'], ['bench'], ['bench', null, { client: 'c-sunshine', call: '1' }], ['academy'], ['cohorts'], ['documents'], ['onboarding'], ['tests'],
    ['hours'], ['placements'], ['placement'], ['outages'], ['money'], ['billing'], ['payouts'], ['reports'], ['settings'],
    ['calendar'], ['timeoff'], ['compliance'], ['tickets'], ['tickets', null, { f: 'all' }], ['audit'], ['support'], ['support', null, { f: 'all' }], ['help'],
    ['search', null, { q: 'pay' }], ['search', null, { q: 'Castellanos' }], ['search', null, { q: 'margin' }], ['search', null, { q: 'Lone Star' }], ['search', null, { q: 'rate' }], ['search', null, { q: 'hotspot' }], ['search', null, { q: 'tarifa' }], ['search', null, { q: 'Sof' }]
  ];
  var withIds = {
    channel: ids(D.channels), person: ids(D.people), client: ids(D.clients), applicant: ids(D.applications).concat(['a-sofia', 'a-camila', 'a-diego']),
    placement: ids(D.placements), week: ids(D.weekApprovals).concat(ids(D.placements)), invoice: ids(D.invoices), statement: stIds, payouts: ids(D.payoutRuns),
    ticket: ids(D.tickets), support: ids(D.threads), event: ids(D.events), calendar: ids(D.events).concat(ids(D.unavailableDays)), timeoff: ids(D.unavailableDays),
    scope: ids(D.placements), telemarketing: ids(D.clients), callqa: ['u-mariela', 'u-kevin', 'u-jose', 'u-andrea'], report: ids(D.placements), billing: ids(D.clients), academy: ['m1', 'm5']
  };
  Object.keys(withIds).forEach(function (sc) { withIds[sc].forEach(function (id) { matrix.push([sc, id]); }); });

  var P = []; // [name, regex]
  function add(n, r) { P.push([n, r]); }
  var surn = 'Castellanos|Andino|Molina|Herrera|Mej[ií]a|Fernanda Ortiz';
  if (role === 'client') {
    add('va-surname', new RegExp('\\b(' + surn + ')\\b'));
    add('va-surname-Paz', /\bPaz\b/);
    add('va-surname-Ortiz', /\bOrtiz\b/);
    add('pay-rate', /\$(6\.50|5\.00|5\.50|6\.00|6\.5|5\.5)\b|\$6\b(?![\d,])|\$5\b(?![\d,])|payRate|Pay rate|Tarifa del VA|tarifa de pago|pay rate|tarifa de la VA/i);
    add('margin', /\bmargins?\b|\bmargen\b|\bmárgenes\b/i);
    var others = { 'c-rodriguez': 'Rodriguez Home Team|Rodr[ií]guez', 'c-lonestar': 'Lone Star', 'c-sunshine': 'Sunshine Coast' };
    Object.keys(others).forEach(function (c) { if (c !== myClient) add('other-client:' + c, new RegExp(others[c])); });
    add('applicant-name', /\b(Sof[ií]a|Lagos|Diego Fuentes|Fuentes|Valeria|N[uú][ñn]ez|Marco Pineda|Pineda|Camila|Rivas|Jorge Zelaya|Zelaya|Paola|Mendieta|Ricardo|Ochoa)\b/);
    add('support-title', /Pay statement question|Morning start times|Headset and internet upgrade|Bench period and first placement|Pregunta sobre el estado de pago|Horario de entrada en Lone Star|Diadema y mejora de internet|Periodo en banca/i);
    add('activity-pct', /(activity|actividad)[^<]{0,25}\d{1,3}\s?%|\d{1,3}\s?%[^<]{0,25}(activity|actividad)/i);
    add('manual-edit-reason', /forgot to clock out|olvid[oó] (detener|marcar)|21:47|idle after|inactiva despu[eé]s|manual-edit|Manual edit|Edici[oó]n manual|edit reason|originalEnd/i);
    var ownVa = { 'c-rodriguez': 'Mariela', 'c-lonestar': 'José', 'c-sunshine': 'Andrea' }[myClient];
    var vaFirst = ['Mariela', 'José', 'Andrea', 'Kevin', 'Lucía', 'Carlos'].filter(function (n) { return n !== ownVa; });
    add('other-va-firstname', new RegExp('\\b(' + vaFirst.join('|') + ')\\b'));
    add('va-contact', /\+50[345] |\+57 |(mariela|jose|andrea|kevin|lucia|carlos|fernanda)@example\.com|Logitech|Jabra|UPS \d+ min|hotspot/i);
    add('stripe-tracker', /cus_[A-Z]|Hubstaff: /);
    add('payout-amount', /\$(404|315|308|523\.50|328\.75|286\.50|297\.50|519|189|788\.13|360\.50|647\.63|326\.25|1,?027|852\.25|845\.25|773|1,?796)\b/);
  } else if (role === 'va') {
    add('bill-rate', /\$(12|10|8)(\.00)?\s?(\/|por |per |an? )\s?(hr|h\b|hora|hour)|bill ?rate|tarifa de factur|billRate|\$(12|10|8)\.00\b/i);
    add('block-amount', /\$(960|480|800|560|979|1,?059|474|963|460)(\.00)?\b/);
    add('invoice-no', /\bBV-\d{4}\b|\binv-\d{4}\b|Stripe/);
    add('margin', /\bmargins?\b|\bmargen\b|\bmárgenes\b/i);
    var myRate = me.payRate; var rates = ['$6.50', '$5.00', '$5.50', '$6.00', '$6.5', '$5.5', '$5/', '$6/'];
    var mineStr = myRate == null ? [] : ['$' + myRate.toFixed(2), '$' + myRate, '$' + myRate + '/'];
    var otherRates = rates.filter(function (r) { return mineStr.indexOf(r) < 0; }).map(function (r) { return r.replace(/[$.\/]/g, '\\$&'); });
    add('other-va-pay', new RegExp('(' + otherRates.join('|') + ')(?![\\d])'));
    var amounts = { 'u-mariela': ['286\\.50', '523\\.50', '404', '788\\.13'], 'u-jose': ['326\\.25', '297\\.50', '328\\.75', '315', '360\\.50'], 'u-andrea': ['308', '647\\.63'], 'u-fernanda': ['519', '189'] };
    var oa = []; Object.keys(amounts).forEach(function (v) { if (v !== me.id) oa = oa.concat(amounts[v]); });
    add('other-va-payout', new RegExp('\\$(' + oa.join('|') + '|1,?027|852\\.25|845\\.25|773|1,?796)\\b'));
    var myPl = D.placements.filter(function (p) { return p.vaId === me.id && p.status === 'active'; })[0];
    var chOthers = { 'ch-rodriguez': 'Client · Mariela|Cliente · Mariela', 'ch-lonestar': 'Client · José|Cliente · José', 'ch-sunshine': 'Client · Andrea|Cliente · Andrea' };
    Object.keys(chOthers).forEach(function (c) { if (!myPl || D.channels.filter(function (x) { return x.id === c; })[0].placementId !== myPl.id) add('other-client-channel:' + c, new RegExp(chOthers[c])); });
    var clOthers = { 'c-rodriguez': 'Rodriguez Home Team', 'c-lonestar': 'Lone Star', 'c-sunshine': 'Sunshine Coast' };
    Object.keys(clOthers).forEach(function (c) { if (!myPl || myPl.clientId !== c) add('other-client-name:' + c, new RegExp(clOthers[c])); });
    add('applicant-notes', /Offer sent at|Video muy natural|Perfil claro|talent pool|bolsa de talento|typingWpm|mockCall/i);
    add('other-va-docs', /(mariela-castellanos|jose-andino|andrea-molina|kevin-paz|lucia-herrera|carlos-mejia|fernanda-ortiz)-[a-z0-9-]+\.pdf/i);
  } else if (role === 'manager') {
    add('margin', /\bmargins?\b|\bmargen\b|\bmárgenes\b|gross profit|utilidad bruta/i);
    add('bill-rate', /\$(12|10|8)(\.00)?\s?(\/|por |per |an? )\s?(hr|h\b|hora|hour)|bill ?rate|tarifa de factur|billRate/i);
    add('block-amount', /\$(960|480|800|560|979|1,?059|474|963|460)(\.00)?\b/);
    add('invoice-no', /\bBV-\d{4}\b/);
  }

  function strip(html) { return html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' '); }
  function snip(s, m) { var i = m.index; return s.slice(Math.max(0, i - 70), Math.min(s.length, i + m[0].length + 70)).replace(/\|/g, '/'); }
  var seen = {};
  function scan(screen, id, extra) {
    var app = document.getElementById('app'); var sheet = document.getElementById('sheet');
    var html = (app ? app.innerHTML : '') + (sheet ? sheet.innerHTML : '');
    var text = strip(html);
    html = html.replace(/ style="[^"]*"/g, '').replace(/ class="[^"]*"/g, '').replace(/<svg[\s\S]*?<\/svg>/g, '');
    var h1 = document.querySelector('.topbar h1'); var title = h1 ? h1.textContent.trim() : '?';
    var denied = /class="empty"/.test(html);
    out.push('SCREEN|' + screen + '|' + (id || '') + '|' + (extra ? JSON.stringify(extra) : '') + '|title=' + title.replace(/\|/g, '/') + (denied ? '|EMPTY' : ''));
    P.forEach(function (pr) {
      var re = new RegExp(pr[1].source, pr[1].flags.replace('g', '') + 'g'); var m, n = 0, first = null, vis = true;
      while ((m = re.exec(text)) && n < 50) { n++; if (!first) first = snip(text, m); }
      if (!n) { var re2 = new RegExp(pr[1].source, pr[1].flags.replace('g', '') + 'g'); while ((m = re2.exec(html)) && n < 50) { n++; if (!first) { first = snip(html, m); vis = false; } } }
      if (n) out.push('HIT|' + screen + '|' + (id || '') + '|' + pr[0] + '|' + n + '|' + (vis ? 'TEXT' : 'HTMLONLY') + '|' + first);
    });
  }
  var errBase = window.__errs.length;
  matrix.forEach(function (row) {
    var screen = row[0], id = row[1], extra = row[2] || {};
    var params = {}; if (id) params.id = id; Object.keys(extra).forEach(function (k) { params[k] = extra[k]; });
    try { HQ.closeSheet(); HQ.S.hist = []; HQ.go(screen, params, true); } catch (e) { out.push('ERR|' + screen + '|' + (id || '') + '|' + (e && e.message)); }
    if (window.__errs.length > errBase) { out.push('ERR|' + screen + '|' + (id || '') + '|' + window.__errs.slice(errBase).join(' ; ')); errBase = window.__errs.length; }
    var h1 = document.querySelector('.topbar h1'); if (h1 && h1.textContent.trim() === 'Error') out.push('ERR|' + screen + '|' + (id || '') + '|view threw: ' + strip(document.querySelector('.note.bad') ? document.querySelector('.note.bad').innerHTML : ''));
    scan(screen, id, row[2]);
  });
  out.push('DONE|' + me.id + '|' + role + '|' + matrix.length + ' renders');
})();
