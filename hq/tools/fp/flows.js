var D = window.HQD, Dx = HQ.D;
function txt(sel) { var el = document.querySelector(sel); return el ? (el.innerText || el.textContent).replace(/\s+\n/g, '\n').replace(/\n{2,}/g, '\n') : '(none)'; }
function el(data) { var e = document.createElement('button'); Object.keys(data).forEach(function (k) { e.dataset[k] = data[k]; }); return e; }
function set(name, val) { var i = document.querySelector('.main .content [name="' + name + '"]') || document.querySelector('#sheet [name="' + name + '"]'); if (!i) { __assert('input ' + name + ' not found', false); return; } i.value = val; }
var n0 = D.messages.length, a0 = D.auditLog.length, nt0 = D.notifications.length;

/* 1. VA sends today's report */
HQ.setUser('u-mariela'); HQ.S.lang = 'en'; HQ.go('report', {}, true);
__assert('report form present', !!document.querySelector('.main .content [name="done"]'));
set('done', 'Quartz Hill list: 150 dials\nLead #4527 appointment held by Carla'); set('blocked', ''); set('tomorrow', 'Continue Quartz Hill');
set('dials', '150'); set('conversations', '20'); set('apptsSet', '2'); set('apptsHeld', '1');
HQ.act['send-report'](el({ id: 'p-rod-2' }));
var rep = HQ.todayReport('p-rod-2');
__assert('report message pushed into ch-rodriguez kind=report', !!rep && rep.channelId === 'ch-rodriguez' && rep.kind === 'report');
__assert('report kpi stored dials=150 apptsSet=2: ' + JSON.stringify(rep && rep.report), !!rep && rep.report.kpi && rep.report.kpi.dials === 150 && rep.report.kpi.apptsSet === 2);
__assert('report at=' + (rep && rep.at) + ' screen now=' + HQ.S.screen, HQ.S.screen === 'channel');
__assert('unread for ana after report: ' + Dx.unread('ch-rodriguez', Dx.person('u-ana')), true);
HQ.go('home', {}, true); __assert('VA HOME after report:\n' + txt('.main .content').slice(0, 900), true);
HQ.setUser('u-ana'); HQ.S.lang = 'en'; HQ.go('home', {}, true); __assert('ANA HOME after report:\n' + txt('.main .content').slice(0, 1400), true);
HQ.setUser('u-charly'); HQ.S.lang = 'en'; HQ.go('home', {}, true); __assert('OWNER HOME reports line after report: ' + (txt('.main .content').match(/Reports today[^\n]*/) || [''])[0], true);
HQ.setUser('u-daniela'); HQ.S.lang = 'en'; HQ.go('inbox', {}, true); __assert('INBOX today card after report:\n' + txt('.main .content').slice(0, 700), true);

/* 2. Manager approves Mariela's week: resolve both flags, then approve */
var wa = D.weekApprovals.filter(function (w) { return w.id === 'wa-p-rod-2-2026-10-12'; })[0];
HQ.go('week', { id: wa.id }, true);
HQ.act['approve-week'](el({ id: wa.id })); __assert('approve refused while flags open: status=' + wa.status, wa.status === 'pending');
HQ.act['flag-keep'](el({ id: wa.id, i: 0 })); HQ.act['flag-keep'](el({ id: wa.id, i: 1 }));
__assert('both flags resolved', wa.flags.every(function (f) { return f.resolved; }));
var m1 = D.messages.length, a1 = D.auditLog.length, nt1 = D.notifications.length, tu1 = D.trueUps.length;
HQ.act['approve-week'](el({ id: wa.id }));
__assert('week approved: status=' + wa.status + ' approvedHours=' + wa.approvedHours + ' tracked=' + wa.trackedHours + ' by=' + wa.approvedBy + ' at=' + wa.approvedAt, wa.status === 'approved' && wa.approvedHours === 41.25 && wa.approvedBy === 'u-daniela');
var sys = D.messages.slice(m1); __assert('system message posted in client channel: ' + JSON.stringify(sys.map(function (m) { return [m.channelId, m.kind, m.authorId, HQ.L(m.text)]; })), sys.length === 1 && sys[0].channelId === 'ch-rodriguez');
__assert('audit rows added: ' + JSON.stringify(D.auditLog.slice(a1).map(function (a) { return [a.action, a.by, HQ.L(a.detail)]; })), D.auditLog.length > a1);
__assert('notifications added for VA on approval: ' + (D.notifications.length - nt1), D.notifications.length > nt1);
__assert('true-up created for the approved week (41.25 vs 40): ' + (D.trueUps.length - tu1), D.trueUps.length > tu1);
__assert('pendingWeeks now=' + HQ.pendingWeeks().length + ' inboxCount=' + HQ.inboxCount(), HQ.pendingWeeks().length === 1);
__assert('payout held hours for Mariela still pendingHours=' + D.payoutRuns[3].lines[0].pendingHours, true);
HQ.go('week', { id: wa.id }, true); __assert('WEEK after approve:\n' + txt('.main .content').slice(0, 600), true);
HQ.setUser('u-charly'); HQ.S.lang = 'en'; HQ.go('billing', { client: 'c-rodriguez' }, true); __assert('OWNER BILLING rodriguez after approve (pending true-ups?):\n' + txt('.main .content').slice(0, 1600), true);
HQ.go('reports', {}, true); __assert('REPORTS after approve:\n' + txt('.main .content').slice(0, 900), true);
HQ.setUser('u-mariela'); HQ.S.lang = 'en'; HQ.go('hours', {}, true); __assert('MARIELA HOURS after approve:\n' + txt('.main .content').slice(0, 800), true);
HQ.go('channel', { id: 'ch-rodriguez' }, true); __assert('channel renders system msg: ' + (txt('.main').indexOf('approved') >= 0), txt('.main').indexOf('approved') >= 0);

/* 3. Client opens an escalation */
HQ.setUser('u-mike'); HQ.S.lang = 'en'; HQ.go('home', {}, true);
HQ.act['open-escalate'](el({ id: 'p-lone-1' }));
__assert('escalate sheet open', !!document.getElementById('sheet'));
var cat = document.querySelector('#sheet [name="cat"]'); if (cat) cat.value = 'hours'; set('text', 'Jose was offline again this morning and nobody told us.');
var k0 = D.tickets.length, m3 = D.messages.length, nt3 = D.notifications.length, a3 = D.auditLog.length;
HQ.act['send-escalation'](el({ id: 'p-lone-1' }));
var tk = D.tickets[D.tickets.length - 1];
__assert('ticket created: ' + JSON.stringify({ id: tk.id, status: tk.status, openedAt: tk.openedAt, ackDueAt: tk.ackDueAt, fixDueAt: tk.fixDueAt, cat: tk.category, by: tk.openedBy, client: tk.clientId }), D.tickets.length === k0 + 1 && tk.openedBy === 'u-mike');
__assert('ack due is next business day (Oct 22) and fix is 5 business days (Oct 28): ack=' + HQ.isoDate(tk.ackDueAt) + ' fix=' + HQ.isoDate(tk.fixDueAt), HQ.isoDate(tk.ackDueAt) === '2026-10-22' && HQ.isoDate(tk.fixDueAt) === '2026-10-28');
__assert('channel msg: ' + JSON.stringify(D.messages.slice(m3).map(function (m) { return [m.channelId, m.kind, m.authorId, m.audience, HQ.L(m.text)]; })), D.messages.length === m3 + 1);
__assert('notifications: ' + JSON.stringify(D.notifications.slice(nt3).map(function (n) { return [n.userId, n.kind, n.read, HQ.L(n.text)]; })), D.notifications.length === nt3 + 2);
__assert('audit: ' + JSON.stringify(D.auditLog.slice(a3).map(function (a) { return [a.action, a.by, a.target]; })), D.auditLog.length === a3 + 1);
__assert('screen after escalation: ' + HQ.S.screen + ' ' + JSON.stringify(HQ.S.params), HQ.S.screen === 'ticket');
__assert('TICKET screen as client:\n' + txt('.main .content').slice(0, 900), true);
HQ.go('home', {}, true); __assert('MIKE HOME after escalation:\n' + txt('.main .content').slice(0, 700), true);
HQ.setUser('u-daniela'); HQ.S.lang = 'en'; HQ.go('inbox', {}, true); __assert('inboxCount after escalation=' + HQ.inboxCount() + ' bell=' + Dx.unreadNotifs(Dx.person('u-daniela')), true);
__assert('INBOX decide group after escalation:\n' + (txt('.main .content').match(/Needs a decision[\s\S]{0,1200}/) || [''])[0], true);
HQ.go('ticket', { id: tk.id }, true); __assert('TICKET screen as manager:\n' + txt('.main .content').slice(0, 900), true);
HQ.setUser('u-jose'); HQ.S.lang = 'en'; HQ.go('channel', { id: 'ch-lonestar' }, true); __assert('VA sees escalation system msg in channel: ' + (txt('.main').indexOf(tk.id) >= 0), true);

/* 4. VA requests a day off: 10 business days (auto) and 9 (pending) */
HQ.setUser('u-andrea'); HQ.S.lang = 'en'; HQ.go('timeoff', {}, true);
__assert('ANDREA TIMEOFF before:\n' + txt('.main .content').slice(0, 900), true);
var u0 = D.unavailableDays.length, e0 = D.events.length, nt4 = D.notifications.length;
HQ.act['open-dayoff'](el({})); __assert('dayoff sheet', !!document.getElementById('sheet'));
set('date', '2026-11-04'); var di = document.getElementById('dayoff-date'); if (di) di.dispatchEvent(new Event('input'));
__assert('calc box: ' + txt('#dayoff-calc'), true);
set('reason', 'Family event'); HQ.act['send-dayoff']();
var ud1 = D.unavailableDays[D.unavailableDays.length - 1];
__assert('Nov 4 request: ' + JSON.stringify({ date: ud1.date, notice: ud1.businessDaysNotice, status: ud1.status, approvedBy: ud1.approvedBy, approvedOn: ud1.approvedOn }), D.unavailableDays.length === u0 + 1 && ud1.businessDaysNotice === 10 && ud1.status === 'approved');
__assert('event pushed for auto-approved day: ' + (D.events.length - e0) + ' ' + JSON.stringify(D.events.slice(e0).map(function (e) { return [e.kind, e.date, JSON.stringify(e.audience)]; })), D.events.length === e0 + 1);
HQ.go('timeoff', {}, true);
HQ.act['open-dayoff'](el({})); set('date', '2026-11-03'); set('reason', 'Dentist'); HQ.act['send-dayoff']();
var ud2 = D.unavailableDays[D.unavailableDays.length - 1];
__assert('Nov 3 request: ' + JSON.stringify({ date: ud2.date, notice: ud2.businessDaysNotice, status: ud2.status }), ud2.businessDaysNotice === 9 && ud2.status === 'pending');
__assert('notifications added for manager on pending request: ' + (D.notifications.length - nt4), D.notifications.length > nt4);
__assert('ANDREA TIMEOFF after:\n' + txt('.main .content').slice(0, 1200), true);
HQ.setUser('u-daniela'); HQ.S.lang = 'en'; HQ.go('inbox', {}, true); __assert('inboxCount after dayoff=' + HQ.inboxCount(), true);
__assert('INBOX decide after dayoff:\n' + (txt('.main .content').match(/Needs a decision[\s\S]{0,1500}/) || [''])[0], true);
HQ.go('timeoff', { id: ud2.id }, true); __assert('STAFF TIMEOFF after:\n' + txt('.main .content').slice(0, 1600), true);
HQ.act['tod-approve'](el({ id: ud2.id })); __assert('approved pending: status=' + ud2.status + ' by=' + ud2.approvedBy + ' events=' + D.events.length, ud2.status === 'approved' && ud2.approvedBy === 'u-daniela');
HQ.setUser('u-priya'); HQ.S.lang = 'en'; HQ.go('timeoff', {}, true); __assert('PRIYA TIMEOFF (sees Andrea days):\n' + txt('.main .content').slice(0, 700), true);
HQ.go('home', {}, true); __assert('PRIYA HOME up next / off days:\n' + txt('.main .content').slice(0, 500), true);
