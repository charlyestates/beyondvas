function sheetVals(o) { var sh = document.getElementById('sheet'); Object.keys(o).forEach(function (k) { var el = sh.querySelector('[name="' + k + '"]'); if (el) el.value = o[k]; }); }
function btn(act) { return document.querySelector('[data-act="' + act + '"]'); }
function sbtn(act) { return document.querySelector('#sheet [data-act="' + act + '"]'); }
function mainText() { return document.querySelector('.main').innerText; }
function as(u, lg, screen, params) { HQ.S.userId = u; HQ.S.lang = lg; HQ.S.viewAs = null; HQ.S.hist = []; HQ.S.picker = false; HQ.S.screen = screen; HQ.S.params = params || {}; HQ.render(); }
/* 1. a client escalates from Help */
as('u-ana', 'en', 'help');
var n0 = HQD.tickets.length, m0 = HQD.messages.length, nt0 = HQD.notifications.length;
HQ.act['open-escalate'](btn('open-escalate'));
__assert('escalate sheet opens with textarea', !!document.getElementById('sheet') && !!document.querySelector('#sheet textarea[name="text"]'));
HQ.act['send-escalation'](sbtn('send-escalation'));
__assert('empty text blocked', HQD.tickets.length === n0 && !document.getElementById('esc-err').hidden);
sheetVals({ text: 'Mariela missed two follow-ups this week', cat: 'comm' });
HQ.act['send-escalation'](sbtn('send-escalation'));
var k = HQD.tickets[HQD.tickets.length - 1];
__assert('ticket created', HQD.tickets.length === n0 + 1 && k.kind === 'escalation' && k.openedBy === 'u-ana' && k.status === 'open' && k.placementId === 'p-rod-2' && !k.ackAt);
__assert('ack due +1 business day ' + k.ackDueAt, k.ackDueAt.slice(0, 10) === '2026-10-22');
__assert('fix due +5 business days ' + k.fixDueAt, k.fixDueAt.slice(0, 10) === '2026-10-28');
__assert('system message posted in client channel', HQD.messages.length === m0 + 1 && HQD.messages[m0].kind === 'system' && HQD.messages[m0].channelId === 'ch-rodriguez' && !!HQD.messages[m0].text.en && !!HQD.messages[m0].text.es);
__assert('notifications for daniela and charly', HQD.notifications.length === nt0 + 2 && HQD.notifications.slice(-2).map(function (n) { return n.userId; }).sort().join() === 'u-charly,u-daniela');
__assert('went to ticket', HQ.S.screen === 'ticket' && HQ.S.params.id === k.id);
__assert('toast shown', !!document.getElementById('toast'));
__assert('sheet closed', !document.getElementById('sheet'));
__assert('ticket renders summary', mainText().indexOf('Mariela missed two follow-ups') >= 0);
__assert('client ticket shows no surname', mainText().indexOf('Castellanos') < 0);
__assert('client ticket list shows new ticket', (as('u-ana', 'en', 'tickets'), mainText().indexOf(k.id) >= 0));
/* 2. staff acknowledges, updates, closes */
as('u-daniela', 'es', 'ticket', { id: k.id });
__assert('ack button for staff', !!btn('ticket-ack'));
HQ.act['ticket-ack'](btn('ticket-ack'));
__assert('acked', !!k.ackAt && k.status === 'in-progress' && !btn('ticket-ack'));
HQ.act['open-update'](btn('open-update')); sheetVals({ text: 'Llamé a Ana y revisamos el plan' }); HQ.act['ticket-update'](sbtn('ticket-update'));
__assert('update added to timeline', k.timeline[k.timeline.length - 1].text === 'Llamé a Ana y revisamos el plan' && mainText().indexOf('revisamos el plan') >= 0);
HQ.act['ticket-close'](btn('ticket-close')); __assert('closed', k.status === 'closed' && !!k.closedAt && !btn('ticket-close'));
/* 3. log a scrub */
as('u-daniela', 'es', 'telemarketing', { id: 'c-rodriguez' });
HQ.act['open-scrub'](btn('open-scrub')); sheetVals({ date: '2026-10-20' }); HQ.act['save-scrub'](sbtn('save-scrub'));
var f = HQD.telemarketingFiles.filter(function (x) { return x.clientId === 'c-rodriguez'; })[0];
__assert('scrub saved', f.lastScrubOn === '2026-10-20' && f.scrubDueOn === '2026-11-20' && mainText().indexOf('20 nov') >= 0);
__assert('no scrub button on a blocked seat', (as('u-daniela', 'es', 'telemarketing', { id: 'c-lonestar' }), !btn('open-scrub')));
/* 4. score a call */
as('u-daniela', 'en', 'callqa', { id: 'u-mariela' });
__assert('score button on current week', !!btn('open-score'));
HQ.act['open-score'](btn('open-score')); sheetVals({ date: '2026-10-20', lead: 'Lead #4601', identification: '2', script: '1', dnc: '2', recording: '2', handoff: '2', notes: 'ok', result: 'pending' }); HQ.act['save-score'](sbtn('save-score'));
var w = HQD.callQA.filter(function (x) { return x.vaId === 'u-mariela' && x.weekStart === '2026-10-19'; })[0];
__assert('call scored', !!w && w.calls.length === 1 && w.calls[0].total === 9 && w.weekScore === 9 && w.pass === null);
__assert('callqa shows the call', HQ.S.screen === 'callqa' && mainText().indexOf('Lead #4601') >= 0);
__assert('past week shows 3 calls', (as('u-daniela', 'en', 'callqa', { id: 'u-mariela', week: '2026-10-12' }), mainText().indexOf('Lead #4471') >= 0 && mainText().indexOf('Lead #4466') >= 0 && mainText().indexOf('Pass') >= 0));
/* 5. VA creates a private thread */
as('u-kevin', 'es', 'support');
var t0 = HQD.threads.length; HQ.act['open-thread'](btn('open-thread')); HQ.act['create-thread'](sbtn('create-thread'));
__assert('thread needs title and text', HQD.threads.length === t0 && !document.getElementById('th-err').hidden);
sheetVals({ topic: 'client', title: 'Pregunta sobre banca', text: 'Hola Daniela, ¿cuándo hay un cliente?' }); HQ.act['create-thread'](sbtn('create-thread'));
var th = HQD.threads[HQD.threads.length - 1];
__assert('thread created', HQD.threads.length === t0 + 1 && th.vaId === 'u-kevin' && th.status === 'open' && th.assignedTo === 'u-daniela');
__assert('went to the thread', HQ.S.screen === 'channel' && HQ.S.params.id === th.id && mainText().indexOf('cuándo hay un cliente') >= 0);
__assert('thread listed for the VA', (as('u-kevin', 'es', 'support'), mainText().indexOf('Pregunta sobre banca') >= 0));
__assert('thread listed for the manager', (as('u-daniela', 'es', 'support'), mainText().indexOf('Pregunta sobre banca') >= 0));
/* 6. VA acknowledges the scope card */
HQD.scopeAcks = HQD.scopeAcks.filter(function (a) { return a.vaId !== 'u-mariela'; });
as('u-mariela', 'es', 'compliance');
__assert('ack button shown when not acknowledged', !!btn('ack-scope'));
__assert('staff overview shows pending', (as('u-daniela', 'es', 'compliance'), mainText().indexOf('Aún sin confirmar') >= 0));
as('u-mariela', 'es', 'compliance');
HQ.act['ack-scope'](btn('ack-scope'));
__assert('ack recorded', HQD.scopeAcks.some(function (a) { return a.vaId === 'u-mariela' && a.placementId === 'p-rod-2' && a.version === '2026-10'; }) && !btn('ack-scope') && mainText().indexOf('Confirmaste esta tarjeta') >= 0);
/* 7. filters */
__assert('tickets all filter shows closed', (as('u-charly', 'en', 'tickets', { f: 'all' }), mainText().indexOf('tk-0003') >= 0));
__assert('tickets open filter hides closed', (as('u-charly', 'en', 'tickets'), mainText().indexOf('tk-0003') < 0));
__assert('audit has new rows', (as('u-charly', 'en', 'audit'), mainText().indexOf('ticket.opened') >= 0 && mainText().indexOf('telemarketing.scrubbed') >= 0 && mainText().indexOf('qa.scored') >= 0));
