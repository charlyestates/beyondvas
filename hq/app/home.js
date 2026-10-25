/* BeyondVAs HQ prototype: home screens per role (owner Today, VA Today, client My VA, applicant My steps)
   and the manager inbox. Every number comes from the seed data in HQD. */
(function () {
  var HQ = window.HQ, D = window.HQD, Dx = HQ.D, h = HQ.h, t = HQ.t, L = HQ.L, esc = HQ.esc, F = HQ.fmt, I = HQ.I, S = HQ.S;

  Object.assign(HQ.T, {
    hello: { en: 'Hello, {n}', es: 'Hola, {n}' },
    dayOf: { en: 'day {a} of {b}', es: 'día {a} de {b}' },
    needsYou: { en: 'Needs you', es: 'Pendientes' }, nothingNeedsYou: { en: 'Nothing needs you today', es: 'No tienes pendientes hoy' },
    reportsYesterday: { en: 'Reports yesterday', es: 'Reportes de ayer' }, noReport: { en: 'no report', es: 'sin reporte' },
    retryCharge: { en: 'Retry charge', es: 'Reintentar cobro' }, messageX: { en: 'Message {n}', es: 'Escribir a {n}' },
    invoiceFailedRow: { en: '{c}: invoice {n} ({a}) failed {d} · retry {r} · {v} pauses {p} if unpaid', es: '{c}: la factura {n} ({a}) falló el {d} · reintento {r} · {v} se pausa el {p} si no se paga' },
    weekUnapproved: { en: 'Hours {w} unapproved for {v} · {h} h · {d} days overdue', es: 'Horas {w} sin aprobar de {v} · {h} h · {d} días de retraso' },
    fitEnds: { en: '{v}: fit window ends {d} ({n} days)', es: '{v}: la ventana de ajuste termina el {d} ({n} días)' },
    planCheckin: { en: 'Plan a check-in', es: 'Planear un check-in' },
    ticketRow: { en: 'Ticket {id} · {c} · fix by {d}', es: 'Ticket {id} · {c} · resolver antes del {d}' },
    missingReportRow: { en: '{v}: no report {d}', es: '{v}: sin reporte {d}' }, openChannel: { en: 'Open channel', es: 'Abrir canal' },
    billed: { en: 'Billed', es: 'Facturado' }, vaCost: { en: 'VA cost', es: 'Costo VA' },
    nextBlockInvoiced: { en: 'Next block {w} invoiced {d} · {p} of {n} paid · next payout {q}', es: 'Próximo bloque {w} facturado el {d} · {p} de {n} pagadas · próximo pago {q}' },
    benchPipeline: { en: 'Bench and pipeline', es: 'Banca y pipeline' }, certifiedShort: { en: 'certified {d}', es: 'certificación {d}' },
    applicantsByStage: { en: '{n} applicants', es: '{n} aspirantes' }, repliesDue: { en: '{n} replies due', es: '{n} respuestas por vencer' }, replies1: { en: '1 reply due', es: '1 respuesta por vencer' },
    alert1: { en: '1 alert', es: '1 alerta' }, interviews1: { en: '1 interview this week', es: '1 entrevista esta semana' }, reportsWord: { en: 'reports', es: 'reportes' }, report1: { en: 'report', es: 'reporte' },
    moduleOf: { en: 'module {a} of {b}', es: 'módulo {a} de {b}' }, tasksOf: { en: 'tasks {a}/{b}', es: 'tareas {a}/{b}' },
    clientPulse: { en: 'Client pulse', es: 'Pulso de clientes' }, notAskedYet: { en: 'not asked yet', es: 'aún no se pregunta' }, nextPulse: { en: 'Next question posts {d}', es: 'La siguiente pregunta sale el {d}' },
    comingUp: { en: 'Coming up', es: 'Próximamente' }, noEvents: { en: 'No events this week', es: 'No hay eventos esta semana' },
    todayCard: { en: 'Today', es: 'Hoy' }, reportPending: { en: 'pending · due {t}', es: 'pendiente · vence {t}' }, reportLate: { en: 'Report overdue', es: 'Reporte atrasado' },
    inboxClear: { en: 'Inbox clear', es: 'Bandeja despejada' }, needsDecision: { en: 'Needs a decision', es: 'Necesita una decisión' }, missingToday: { en: 'Missing today', es: 'Falta hoy' },
    expiringGroup: { en: 'Expiring', es: 'Por vencer' }, unreadGroup: { en: 'Unread', es: 'Sin leer' },
    approveHours: { en: 'Approve hours', es: 'Aprobar horas' }, alerts: { en: '{n} alerts', es: '{n} alertas' }, daysOverdue: { en: '{n} days overdue', es: '{n} días de retraso' },
    replyDueOn: { en: 'reply due {d}', es: 'responder antes del {d}' }, decide: { en: 'Decide', es: 'Decidir' }, respond: { en: 'Reply', es: 'Responder' },
    dayOffRequest: { en: '{v}: unavailable day {d} · {n} business days of notice', es: '{v}: día no disponible {d} · {n} días hábiles de aviso' },
    noneMissing: { en: 'Nothing missing: {y} of {n} reports came in yesterday · today {m} of {n}, due 7 PM client time', es: 'No falta ninguno: ayer llegaron {y} de {n} reportes · hoy {m} de {n}, vencen a las 7 PM hora del cliente' },
    outageRow: { en: '{v}: {k} outage · {m} min', es: '{v}: corte de {k} · {m} min' }, remind: { en: 'Remind', es: 'Recordar' }, markDayOff: { en: 'Day off', es: 'Día libre' },
    docExpires: { en: '{t} · {who} · expires {d}', es: '{t} · {who} · vence el {d}' }, docMissing: { en: '{t} · {who} · missing', es: '{t} · {who} · falta' }, request: { en: 'Request', es: 'Pedir' },
    scrubRow: { en: 'DNC scrub · {c} · due {d}', es: 'Depuración DNC · {c} · vence el {d}' }, checkpointRow: { en: 'Day-{n} checkpoint · {v} · {c} · {d}', es: 'Punto de control del día {n} · {v} · {c} · {d}' },
    scheduleIt: { en: 'Schedule', es: 'Agendar' }, qaRow: { en: 'Call QA this week · {v} · {a} of {b}', es: 'QA de llamadas esta semana · {v} · {a} de {b}' },
    inDays: { en: 'in {n} days', es: 'en {n} días' }, newMsgs: { en: '{n} new', es: '{n} nuevos' },
    recruitingCohort: { en: 'Recruiting and cohort', es: 'Reclutamiento y cohorte' }, interviewsThisWeek: { en: '{n} interviews this week', es: '{n} entrevistas esta semana' },
    proposeClient: { en: 'Propose to a client', es: 'Proponer a un cliente' }, declaredUnavailable: { en: 'Declared unavailable days', es: 'Días no disponibles declarados' },
    shiftLine: { en: 'Shift {a} ({b} {z})', es: 'Turno {a} ({b} {z})' }, reportOutage: { en: 'Report an outage', es: 'Reportar un corte' },
    onBenchHero: { en: 'On the bench · {t} {d} · your profile is visible to clients', es: 'En banca · {t} {d} · tu perfil está visible a clientes' },
    updateAvailability: { en: 'Update availability', es: 'Actualizar disponibilidad' }, continueAcademy: { en: 'Continue the academy', es: 'Continuar la academia' },
    reportToday: { en: "Today's report", es: 'Reporte de hoy' }, expectedBy: { en: 'Pending · due {t} ({u} your time)', es: 'Pendiente · vence {t} ({u} tu hora)' },
    sentAt: { en: 'Sent {t} ✓', es: 'Enviado {t} ✓' }, addUpdate: { en: 'Add an update', es: 'Agregar una actualización' }, dayOff: { en: 'Day off', es: 'Día libre' },
    sendTodayReport: { en: "Send today's report", es: 'Enviar el reporte de hoy' }, weekSoFar: { en: 'week so far', es: 'semana hasta hoy' },
    hoursAndPay: { en: 'Hours and pay', es: 'Horas y pago' }, lastWeekApproved: { en: 'approved ✓ ({n}, {d})', es: 'aprobadas ✓ ({n}, {d})' }, awaitingApproval: { en: 'awaiting approval', es: 'pendiente de aprobación' },
    lastStatement: { en: 'Last statement {d}', es: 'Último estado de cuenta {d}' }, noStatementYet: { en: 'Statements start with your first placement.', es: 'Los estados de cuenta empiezan con tu primera colocación.' },
    yourSupport: { en: 'Your support', es: 'Tu apoyo' }, onlyYou: { en: 'only you, {a} and {b}', es: 'solo tú, {a} y {b}' }, newTopic: { en: 'New topic', es: 'Nuevo tema' }, noThreads: { en: 'No open topics', es: 'Sin temas abiertos' },
    repliedOn: { en: '{n} replied {d}', es: '{n} respondió {d}' }, upNext: { en: 'Up next', es: 'Próximo' },
    hnCountdown: { en: 'declare before {d} ({n} business days)', es: 'declarar antes del {d} ({n} días hábiles)' }, clientHoliday: { en: 'client holiday · day off', es: 'feriado del cliente · día libre' },
    noReportYet: { en: 'No report yet', es: 'Aún sin reporte' }, expectedByClient: { en: 'Not yet · expected by {t}', es: 'Aún no · se espera antes de las {t}' },
    notifiedManager: { en: 'No report yet for {d} · {n} has been notified', es: 'Aún sin reporte del {d} · {n} ya recibió el aviso' },
    yesterdayReport: { en: "Yesterday's report", es: 'Reporte de ayer' }, allReports: { en: 'All reports', es: 'Todos los reportes' },
    approvedMondays: { en: 'Hours are approved every Monday.', es: 'Las horas se aprueban cada lunes.' }, screenshotsHubstaff: { en: 'Screenshots in Hubstaff', es: 'Capturas en Hubstaff' },
    weekNumbers: { en: "This week's numbers", es: 'Números de la semana' }, targetWeek: { en: 'target 6+ a week', es: 'meta 6+ por semana' },
    unreadIn: { en: '{n} unread in {c}', es: '{n} sin leer en {c}' }, nextInvoice: { en: 'Next invoice', es: 'Próxima factura' },
    failedBanner: { en: 'Next block invoice {a} did not go through · {v} pauses on {d} if unpaid', es: 'La factura del próximo bloque ({a}) no pasó · {v} se pausa el {d} si no se paga' },
    updateCard: { en: 'Update card', es: 'Actualizar tarjeta' }, includesTrueUp: { en: 'includes a {a} {k} true-up', es: 'incluye un {k} de ajuste de {a}' },
    dial1: { en: '1 dial', es: '1 llamada' }, apptSet1: { en: '1 appt set', es: '1 cita agendada' },
    somethingWrong: { en: 'Something wrong?', es: '¿Algo anda mal?' }, slaLine: { en: 'We acknowledge within 1 business day and fix within 5 days.', es: 'Acusamos recibo en 1 día hábil y lo resolvemos en 5 días.' },
    justQuestion: { en: 'Just a question? Message {n}', es: '¿Solo una pregunta? Escríbele a {n}' }, openTicket: { en: 'Open ticket', es: 'Ticket abierto' },
    fixWindowEnds: { en: 'fix window ends {d}', es: 'la ventana de corrección termina el {d}' }, workingWithYou: { en: 'with you since {d}', es: 'contigo desde el {d}' },
    yourApplication: { en: 'Your application', es: 'Tu solicitud' }, weReply: { en: 'We reply by {d}', es: 'Te respondemos antes del {d}' },
    practicalTest: { en: 'Practical test', es: 'Prueba práctica' }, nothingToDo: { en: 'Nothing to do for now: the ball is on our side.', es: 'Nada que hacer por ahora: la pelota está de nuestro lado.' },
    videoInterview: { en: 'Video interview with {n}', es: 'Entrevista por video con {n}' }, confirm: { en: 'Confirm', es: 'Confirmar' }, hnTime: { en: 'Honduras time', es: 'hora de Honduras' },
    yourTests: { en: 'Your tests', es: 'Tus pruebas' }, typingTest: { en: 'Typing', es: 'Mecanografía' }, writtenEnglish: { en: 'Written English', es: 'Inglés escrito' }, mockCall: { en: 'Mock call', es: 'Llamada simulada' },
    toSchedule: { en: 'to schedule', es: 'por agendar' }, continueApp: { en: 'Continue my application', es: 'Continuar mi solicitud' },
    whatToPrepare: { en: 'What to prepare', es: 'Qué preparar' }, prepareNote: { en: 'Only once you are accepted. Internet, power backup and headset are checked on the setup step.', es: 'Solo cuando te acepten. Internet, respaldo de energía y diadema se revisan en el paso de equipo.' },
    howItWorks: { en: 'How BeyondVAs works', es: 'Cómo funciona BeyondVAs' },
    howLine: { en: 'Academy ({m} modules) → certification → bench → placement with a US team · paydays on the {a} and {b}', es: 'Academia ({m} módulos) → certificación → banca → colocación con un equipo de EE. UU. · pagos los días {a} y {b}' },
    unlocksWhenAccepted: { en: 'Unlocks when you are accepted', es: 'Se desbloquea cuando te acepten' }, started: { en: 'started', es: 'iniciada' },
    pendingWeeksSub: { en: 'oldest unapproved week', es: 'semana más antigua sin aprobar' }, thisWeekCard: { en: 'This week', es: 'Esta semana' },
    snooze: { en: 'Snooze', es: 'Posponer' }, snoozed: { en: 'Snoozed until tomorrow (in the prototype, until you reload).', es: 'Pospuesto hasta mañana (en el prototipo, hasta que recargues).' },
    remindText: { en: 'Hi {n}, I did not see your report for {d} ({c}). Can you send it when you get a minute? If it was a day off, tell me and I will mark it.', es: 'Hola {n}, no vi tu reporte del {d} ({c}). ¿Me lo mandas en cuanto puedas? Si fue día libre, dime y lo marco.' },
    reminderSent: { en: 'Reminder sent to {n}', es: 'Recordatorio enviado a {n}' }, dayOffMarked: { en: 'Marked as a day off for {n}: no report expected.', es: 'Marcado como día libre para {n}: no se espera reporte.' },
    dayOffReason: { en: 'Marked as a day off from the inbox (no report)', es: 'Marcado como día libre desde la bandeja (sin reporte)' },
    waitingReply: { en: 'waiting for your reply · {w}', es: 'espera tu respuesta · {w}' }, supportRow: { en: 'Support · {v}', es: 'Soporte · {v}' },
    clearModeLater: { en: '"Clear the inbox" step mode (J/K, Enter) comes later.', es: 'El modo "Despejar la bandeja" paso a paso (J/K, Enter) viene más adelante.' },
    toDo: { en: 'To do', es: 'Pendientes' }, docExpiring: { en: '{t} expires {d}', es: '{t} vence el {d}' }, docMissingMine: { en: '{t} missing', es: 'Falta {t}' },
    obTaskDue: { en: 'Onboarding: {t}', es: 'Incorporación: {t}' }, todoDueOn: { en: 'due {d}', es: 'vence el {d}' },
    blockHours: { en: 'This block {w}', es: 'Este bloque {w}' }, otherUnread: { en: 'Also unread', es: 'También sin leer' },
    ackDueIn: { en: 'acknowledge by {t}', es: 'responder antes de {t}' }, ackedAt: { en: 'acknowledged {t}', es: 'respondido {t}' },
    holidayOff: { en: 'client holiday', es: 'feriado del cliente' }, declaredOff: { en: 'declared day off', es: 'día libre declarado' }
  });

  /* ---------- small helpers ---------- */
  var ME = function () { return HQ.me(); };
  function ico(n, sz) { return (I[n] || '').replace('<svg', '<svg width="' + (sz || 16) + '" height="' + (sz || 16) + '" style="fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;vertical-align:-3px"'); }
  function dayN(iso) { return +iso.slice(8, 10); }
  function range(a, b) { if (!a || !b) return ''; var sameM = a.slice(0, 7) === b.slice(0, 7); if (!sameM) return F.date(a) + ' – ' + F.date(b); return HQ.lang() === 'es' ? dayN(a) + '–' + F.date(b) : F.date(a) + '–' + dayN(b); }
  function addDays(iso, n) { var d = new Date(iso + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); }
  function dow(iso) { return new Date(iso + 'T12:00:00Z').getUTCDay(); }
  function mondayOf(iso) { var w = dow(iso); return addDays(iso, w === 0 ? -6 : 1 - w); }
  function bizDays(fromIso, toIso) { var n = 0, d = fromIso; while (d < toIso) { d = addDays(d, 1); var w = dow(d); if (w !== 0 && w !== 6) n++; } return n; }
  function clientNowMin(tz) { var p = new Intl.DateTimeFormat('en-US', { timeZone: tz, hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(HQ.now()); return (+p.filter(function (x) { return x.type === 'hour'; })[0].value % 24) * 60 + (+p.filter(function (x) { return x.type === 'minute'; })[0].value); }
  function clockIn(hhmm, fromTz, toTz) { return F.ampm(F.clock(hhmm, fromTz, toTz)); }
  function entries(plId, from, to) { return (D.timeEntries || []).filter(function (e) { return e.placementId === plId && e.date >= from && e.date <= to; }); }
  /* minutes of an entry: as imported, or the running count for an entry still open (end null), like hours.js entryMin */
  function toMin(hhmm) { var p = hhmm.split(':'); return (+p[0]) * 60 + (+p[1]); }
  function entryMinutes(e) { if (e.minutes != null) return e.minutes; if (e.end) return Math.max(0, toMin(e.end) - toMin(e.start)); return Math.max(0, clientNowMin(e.tz || 'America/Los_Angeles') - toMin(e.start)); }
  function mins(list) { return list.reduce(function (n, e) { return n + entryMinutes(e); }, 0); }
  function approvalsFor(plId) { return (D.weekApprovals || []).filter(function (w) { return w.placementId === plId; }); }
  function pendingWeeks() { return (D.weekApprovals || []).filter(function (w) { return w.status === 'pending'; }).sort(function (a, b) { return a.weekStart < b.weekStart ? -1 : 1; }); }
  function reportOn(plId, iso) { var ch = HQ.channelForPlacement(plId); if (!ch) return null; return Dx.messagesIn(ch.id).filter(function (m) { return m.kind === 'report' && HQ.isoDate(m.at) === iso; })[0] || null; }
  function isWorkday(iso) { var w = dow(iso); return w !== 0 && w !== 6; }
  /* "168 dials · 1 appt set" with singulars (es: "1 llamada · 1 cita agendada") */
  function kpiLine(k) { return (k.dials === 1 ? t('dial1') : k.dials + ' ' + t('dials').toLowerCase()) + ' · ' + (k.apptsSet === 1 ? t('apptSet1') : k.apptsSet + ' ' + t('apptsSet').toLowerCase()); }
  function pastDeadline(cl) { return clientNowMin(cl.tz) >= 19 * 60; }
  function yesterdayIso() { var d = addDays(Dx.today(), -1); while (!isWorkday(d)) d = addDays(d, -1); return d; }
  /* Why no report is expected on a day: weekend, the client's holiday set, or a declared (approved) unavailable day. null = a report is expected. */
  function offReason(pl, iso) {
    if (!isWorkday(iso)) return 'weekend';
    var cl = Dx.client(pl.clientId) || {}; if (((D.holidaySets || {})[cl.holidaySet] || []).some(function (x) { return x.date === iso; })) return 'holiday';
    if ((D.unavailableDays || []).some(function (u) { return u.vaId === pl.vaId && u.date === iso && u.status === 'approved'; })) return 'declared';
    return null;
  }
  function offChip(reason) { return h.chip(reason === 'holiday' ? t('holidayOff') : reason === 'declared' ? t('declaredOff') : t('dayOff'), ''); }
  var snoozed = {}; /* inbox rows hidden by Snooze / Day off during this session; keyed by row key */
  function dmWith(a, b) { return (D.channels || []).filter(function (c) { return c.kind === 'dm' && c.members.indexOf(a) >= 0 && c.members.indexOf(b) >= 0; })[0] || null; }
  function newId(prefix) { return prefix + '-' + Math.random().toString(36).slice(2, 8); }
  function nowIso() { return new Date(HQ.now().getTime() + 60000).toISOString(); }
  function waitingThreads(mgrId) {
    /* open support threads whose last message is the VA's: the manager owes a reply */
    return (D.threads || []).filter(function (th) { return th.status === 'open' && th.assignedTo === mgrId; }).map(function (th) { var last = Dx.lastMessage(th.id); return last && last.authorId === th.vaId ? { th: th, last: last } : null; }).filter(Boolean);
  }
  function blockOf(plId, blk) { return (D.blocks || []).filter(function (b) { return b.placementIds.indexOf(plId) >= 0 && b.start === blk.start; })[0]; }
  function invoiceOf(blockId) { return (D.invoices || []).filter(function (i) { return i.blockId === blockId; })[0]; }
  function nextRun() { return (D.payoutRuns || []).filter(function (r) { return r.status !== 'paid'; }).sort(function (a, b) { return a.date < b.date ? -1 : 1; })[0] || null; }
  function lastPaidRun() { return (D.payoutRuns || []).filter(function (r) { return r.status === 'paid'; }).sort(function (a, b) { return a.date < b.date ? 1 : -1; })[0] || null; }
  function lineFor(run, vaId) { return run ? (run.lines || []).filter(function (l) { return l.vaId === vaId; })[0] : null; }
  function canSeeEvent(ev, v) {
    var a = ev.audience; if (a === 'all') return true; if (!a) return false;
    if (v.role === 'owner' || v.role === 'manager') return true;
    if (a.role) return a.role === v.role; if (a.userId) return a.userId === v.id; if (a.clientId) return v.clientId === a.clientId;
    if (a.channelId) { var c = Dx.channel(a.channelId); return !!c && (c.members === 'everyone' ? v.role === 'va' : c.members.indexOf(v.id) >= 0); }
    return false;
  }
  function upcoming(v, days, max) {
    var end = addDays(Dx.today(), days);
    return (D.events || []).filter(function (e) { return e.date >= Dx.today() && e.date <= end && canSeeEvent(e, v); }).sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : (a.time || '') < (b.time || '') ? -1 : 1; }).slice(0, max || 6);
  }
  function eventRow(e, v) {
    var when = F.dayLabel(e.date); if (e.time) when += ' · ' + clockIn(e.time, e.tz, v.tz) + (e.tz !== v.tz ? ' <span class="tiny muted">(' + F.ampm(e.time) + ' ' + F.tz(e.tz) + ')</span>' : '');
    return h.li({ lead: '<span class="hash ' + (e.kind === 'holiday' ? 'ann' : '') + '">' + ico({ payday: 'money', holiday: 'calendar', deadline: 'flag', checkpoint: 'flag', interview: 'user', training: 'school', social: 'sparkle', timeoff: 'calendar', meeting: 'people' }[e.kind] || 'calendar', 18) + '</span>', title: esc(L(e.title)), sub: when, go: 'event', params: { id: e.id } });
  }
  function kv(l, v) { return '<div class="row between" style="padding:6px 0;border-bottom:1px solid var(--line-2);gap:12px"><span class="small muted">' + esc(l) + '</span><span class="right">' + v + '</span></div>'; }
  function chRow(c, v) {
    var last = Dx.lastMessage(c.id), un = Dx.unread(c.id, v); var who = last ? Dx.person(last.authorId) : null;
    var prev = last ? (last.kind === 'report' ? t('dailyReport') : (who ? (v.role === 'client' && who.role === 'va' ? who.first : who.first) + ': ' : '') + (last.kind === 'system' ? L(last.text) : (typeof last.text === 'string' ? last.text : L(last.text)))) : '';
    var pl = c.kind === 'client' ? Dx.placement(c.placementId) : null; var tick = pl ? (HQ.todayReport(pl.id) ? h.chip('✓ ' + F.time(HQ.todayReport(pl.id).at, v.tz), 'good') : '') : '';
    var gold = c.kind === 'dm' || c.kind === 'thread' || (c.kind === 'client' && v.role === 'client');
    return h.li({ lead: c.kind === 'dm' ? h.avatar(c.members.filter(function (m) { return m !== v.id; })[0]) : pl ? h.avatar(pl.vaId) : '<span class="hash ' + (c.kind === 'announcements' ? 'ann' : '') + '">#</span>', title: esc(Dx.channelName(c, v).replace(/^#/, '')), sub: esc(prev.replace(/\s+/g, ' ').slice(0, 90)), trail: (last ? '<span class="muted">' + F.rel(last.at) + '</span> ' : '') + h.badge(un, gold ? 'gold' : 'blue') + (tick ? ' ' + tick : ''), go: 'channel', params: { id: c.id } });
  }
  function unreadRows(v, max) { return Dx.channelsFor(v).filter(function (c) { return Dx.unread(c.id, v) > 0; }).sort(function (a, b) { var ga = a.kind === 'dm' || a.kind === 'thread' ? 0 : 1, gb = b.kind === 'dm' || b.kind === 'thread' ? 0 : 1; return ga - gb; }).slice(0, max || 5).map(function (c) { return chRow(c, v); }).join(''); }
  function reportState(pl, v) {
    var cl = Dx.client(pl.clientId), r = HQ.todayReport(pl.id);
    if (r) return h.chip('✓ ' + F.time(r.at, v.tz), 'good');
    var off = offReason(pl, Dx.today()); if (off) return offChip(off);
    if (pastDeadline(cl)) return h.chip(t('noReport'), 'bad', true);
    return h.chip(t('reportPending', { t: clockIn('19:00', cl.tz, v.tz) + ' ' + F.tz(v.tz) }), 'warn');
  }
  function academyState(id) {
    var pg = (D.academyProgress || {})[id] || {}; var lessons = D.academyLessons || []; var done = lessons.filter(function (l) { return pg[l.id] && pg[l.id].done; }).length;
    var cur = lessons.filter(function (l) { return !(pg[l.id] && pg[l.id].done); })[0]; var mods = D.academyModules || [];
    return { done: done, total: lessons.length, module: cur ? mods.filter(function (m) { return m.id === cur.moduleId; })[0] : null, modCount: mods.length };
  }
  function obState(id) { var op = (D.onboardingProgress || {})[id] || {}; var defs = D.onboardingTaskDefs || []; return { done: defs.filter(function (d) { return op[d.id] && op[d.id].status === 'done'; }).length, total: defs.length }; }

  /* ---------- inbox model (manager) ---------- */
  function inboxGroups(v) {
    var today = Dx.today(), g = { decide: [], missing: [], expiring: [], unread: [] }, n = 0;
    /* needs a decision: weeks to approve, applications waiting on a reply, support threads waiting on the manager, open tickets, unavailable-day requests */
    pendingWeeks().forEach(function (w) { var pl = Dx.placement(w.placementId), va = Dx.person(pl.vaId), cl = Dx.client(pl.clientId); var late = -F.daysUntil(w.dueOn); var fl = (w.flags || []).filter(function (f) { return !f.resolved; }).length;
      g.decide.push({ key: 'week:' + w.id, urgent: true, lead: h.avatar(va), title: esc(t('approveHours')) + ' · ' + esc(va.name) + ' <span class="small muted">· ' + esc(cl.name) + '</span>', sub: esc(range(w.weekStart, w.weekEnd)) + ' · ' + F.hdec(w.trackedHours) + ' h · ' + esc(t(fl === 1 ? 'alert1' : 'alerts', { n: fl })) + (late > 0 ? ' · <span style="color:var(--bad)">' + esc(t('daysOverdue', { n: late })) + '</span>' : ''), go: 'week', id: w.id, btn: t('approve') }); });
    (D.applications || []).filter(function (a) { return a.expectedReplyBy && ['active', 'placed', 'talent_pool', 'draft'].indexOf(a.stage) < 0; }).sort(function (a, b) { return a.expectedReplyBy < b.expectedReplyBy ? -1 : 1; }).forEach(function (a) { var p = Dx.person(a.personId); var dd = F.daysUntil(a.expectedReplyBy);
      g.decide.push({ key: 'app:' + a.id, urgent: dd <= 0, lead: h.avatar(p), title: esc(p.name) + ' <span class="small muted">· ' + esc(t(a.stage) || a.stage) + '</span>', sub: esc(t('replyDueOn', { d: F.date(a.expectedReplyBy, 'long') })) + (dd < 0 ? ' · <span style="color:var(--bad)">' + esc(t('overdue')) + '</span>' : ''), go: 'applicant', id: a.id, btn: t('respond') }); });
    waitingThreads(v.id).forEach(function (x) { var va = Dx.person(x.th.vaId);
      g.decide.push({ key: 'thread:' + x.th.id, urgent: true, lead: '<span class="hash">' + ico('lock', 18) + '</span>', title: esc(t('supportRow', { v: va ? va.name : '' })) + ' <span class="small muted">· ' + esc(L(x.th.title)) + '</span>', sub: esc(t('waitingReply', { w: F.rel(x.last.at) })), go: 'channel', id: x.th.id, btn: t('respond') }); });
    (D.tickets || []).filter(function (k) { return k.status !== 'closed'; }).forEach(function (k) { var va = Dx.person(k.vaId), cl = Dx.client(k.clientId); var fix = HQ.isoDate(k.fixDueAt);
      g.decide.push({ key: 'ticket:' + k.id, urgent: !k.ackAt || F.daysUntil(fix) <= 1, lead: '<span class="hash">' + ico('flag', 18) + '</span>', title: esc(L(k.title)), sub: esc((cl ? cl.name : (va ? va.name : '')) + ' · ' + k.id) + ' · ' + (k.ackAt ? esc(t('ackedAt', { t: '\u0001' })).replace('\u0001', F.time2(k.ackAt, cl ? cl.tz : null)) : '<span style="color:var(--bad)">' + esc(t('ackDueIn', { t: '\u0001' })).replace('\u0001', F.time2(k.ackDueAt, cl ? cl.tz : null)) + '</span>') + ' · ' + esc(t('fixWindowEnds', { d: F.dayLabel(fix) })), go: 'ticket', id: k.id, btn: t('open') }); });
    (D.unavailableDays || []).filter(function (u) { return u.status === 'pending'; }).forEach(function (u) { var va = Dx.person(u.vaId);
      g.decide.push({ key: 'ud:' + u.id, urgent: true, lead: h.avatar(va), title: esc(t('dayOffRequest', { v: va.name, d: F.date(u.date, 'long'), n: u.businessDaysNotice })), sub: esc(L(u.reason)), go: 'timeoff', id: u.id, btn: t('decide') }); });
    /* missing today: reports past the 7 PM deadline today, yesterday's gaps (not on weekends, client holidays or declared days), outages today */
    var pls = Dx.activePlacements(), y = yesterdayIso();
    pls.forEach(function (pl) { var va = Dx.person(pl.vaId), cl = Dx.client(pl.clientId), ch = HQ.channelForPlacement(pl.id);
      [today, y].forEach(function (d) { if (offReason(pl, d) || reportOn(pl.id, d) || (d === today && !pastDeadline(cl))) return;
        g.missing.push({ key: 'missing:' + pl.id + ':' + d, urgent: true, lead: h.avatar(va), title: esc(t('missingReportRow', { v: va.name, d: F.dayLabel(d) })), sub: esc(cl.name), go: 'channel', id: ch.id, va: va.id, pl: pl.id, date: d, remind: true }); }); });
    (D.outages || []).filter(function (o) { return HQ.isoDate(o.at) === today; }).forEach(function (o) { var va = Dx.person(o.vaId); g.missing.push({ key: 'outage:' + o.id, urgent: true, lead: h.avatar(va), title: esc(t('outageRow', { v: va.name, k: t(o.cause === 'power' ? 'power' : 'internet'), m: o.minutes })), sub: esc(L(o.note)), go: 'outages', id: o.id, btn: t('open') }); });
    /* expiring: documents within 60 days or missing, DNC scrubs due within 30 days, checkpoints within 14 days, call QA this week; "urgent" (counted as due today) when within 7 days */
    (D.documents || []).filter(function (d) { return d.status === 'expiring' || d.status === 'missing'; }).forEach(function (d) { var who = Dx.person(d.ownerId) || Dx.client(d.ownerId); var nm = who ? who.name : d.ownerId; var dd = d.expiresOn ? F.daysUntil(d.expiresOn) : null;
      var due = d.status === 'missing' ? ((D.onboardingProgress || {})[d.ownerId] && D.onboardingProgress[d.ownerId].ob3 && D.onboardingProgress[d.ownerId].ob3.due) || null : d.expiresOn; var dn = due ? F.daysUntil(due) : 99;
      g.expiring.push({ key: 'doc:' + d.id, urgent: dn <= 7, lead: Dx.person(d.ownerId) ? h.avatar(d.ownerId) : '<span class="hash">' + ico('doc', 18) + '</span>', title: d.status === 'missing' ? esc(t('docMissing', { t: L(d.title), who: nm })) : esc(t('docExpires', { t: L(d.title), who: nm, d: F.date(d.expiresOn) })), sub: due ? esc(t('inDays', { n: dn })) + (dd == null ? ' · ' + esc(t('due')) + ' ' + esc(F.date(due)) : '') : '', go: 'documents', id: d.ownerId, btn: t('request') }); });
    (D.telemarketingFiles || []).filter(function (f) { return f.scrubDueOn && F.daysUntil(f.scrubDueOn) <= 30; }).forEach(function (f) { var cl = Dx.client(f.clientId); var dn = F.daysUntil(f.scrubDueOn);
      g.expiring.push({ key: 'scrub:' + f.clientId, urgent: dn <= 7, lead: '<span class="hash">' + ico('shield', 18) + '</span>', title: esc(t('scrubRow', { c: cl.name, d: F.date(f.scrubDueOn) })), sub: esc(t('inDays', { n: dn })) + ' · ' + esc(t('lastScrub')) + ' ' + esc(F.date(f.lastScrubOn)), go: 'telemarketing', id: f.clientId, btn: t('open') }); });
    pls.forEach(function (pl) { (pl.checkpoints || []).filter(function (c) { return !c.done && F.daysUntil(c.due) <= 14; }).forEach(function (c) { var va = Dx.person(pl.vaId), cl = Dx.client(pl.clientId); var dn = F.daysUntil(c.due);
      g.expiring.push({ key: 'cp:' + pl.id + ':' + c.day, urgent: dn <= 7, lead: h.avatar(va), title: esc(t('checkpointRow', { n: c.day, v: va.name, c: cl.name, d: F.date(c.due, 'long') })), sub: esc(t('inDays', { n: dn })), go: 'placement', id: pl.id, btn: t('scheduleIt') }); }); });
    pls.filter(function (pl) { return pl.tier === 'isa'; }).forEach(function (pl) { var wk = mondayOf(today); var qa = (D.callQA || []).filter(function (q) { return q.placementId === pl.id && q.weekStart === wk; })[0]; var done = qa ? qa.calls.length : 0; if (done >= 3) return; var va = Dx.person(pl.vaId);
      g.expiring.push({ key: 'qa:' + pl.id + ':' + wk, urgent: false, lead: h.avatar(va), title: esc(t('qaRow', { v: va.name, a: done, b: 3 })), sub: esc(range(wk, addDays(wk, 6))), go: 'callqa', id: pl.id, btn: t('open') }); });
    Dx.channelsFor(v).filter(function (c) { return Dx.unread(c.id, v) > 0; }).forEach(function (c) { g.unread.push({ urgent: false, ch: c }); });
    ['decide', 'missing', 'expiring'].forEach(function (k) { g[k] = g[k].filter(function (r) { return !snoozed[r.key]; }); g[k].sort(function (a, b) { return (b.urgent ? 1 : 0) - (a.urgent ? 1 : 0); }); n += g[k].filter(function (r) { return r.urgent; }).length; });
    g.count = n; return g;
  }
  HQ.inboxCount = function () { var m = Dx.people().filter(function (p) { return p.role === 'manager'; })[0]; return m ? inboxGroups(m).count : 0; };
  function inboxRow(r) {
    var btns = '';
    if (r.remind) btns = h.btn(esc(t('remind')), 'inbox-remind', 'btn-gold btn-sm', { va: r.va, pl: r.pl, date: r.date }) + h.btn(esc(t('markDayOff')), 'inbox-dayoff', 'btn-ghost btn-sm', { va: r.va, date: r.date, key: r.key });
    else if (r.btn) btns = h.go(esc(r.btn), r.go, { id: r.id }, (r.urgent ? 'btn-gold' : 'btn-ghost') + ' btn-sm');
    btns += h.btn(esc(t('snooze')), 'inbox-snooze', 'btn-ghost btn-sm', { key: r.key }, 'style="color:var(--fg-3)"');
    return '<div class="li" style="align-items:flex-start;flex-wrap:wrap"><button class="row grow" style="border:0;background:transparent;padding:0;text-align:left;gap:12px;color:inherit;min-width:200px" data-go="' + esc(r.go) + '" data-id="' + esc(r.id) + '">' + r.lead + '<div class="grow"><div class="t">' + r.title + '</div>' + (r.sub ? '<div class="s">' + r.sub + '</div>' : '') + '</div></button><div class="row wrap" style="gap:6px;flex:none">' + btns + '</div></div>';
  }
  function groupCard(title, rows, v, emptyLine) {
    var s = '<div class="card"><div class="card-head"><h3>' + esc(title) + '</h3>' + h.badge(rows.length, 'soft') + '</div>';
    if (!rows.length) s += emptyLine ? '<p class="small muted">' + esc(emptyLine) + '</p>' : h.empty(t('allCaughtUp'), '');
    else s += '<div class="list">' + rows.map(function (r) { return r.ch ? chRow(r.ch, v) : inboxRow(r); }).join('') + '</div>';
    return s + '</div>';
  }

  /* ---------- manager inbox ---------- */
  HQ.V.inbox = function () {
    var v = ME(); if (!HQ.isStaff()) return HQ.V.home();
    var g = inboxGroups(v); var pls = Dx.activePlacements(); var y = yesterdayIso();
    var s = '<div class="card"><div class="card-head"><h3>' + esc(t('todayCard')) + ' · ' + esc(F.date(Dx.today(), 'long')) + '</h3><span class="small muted">' + esc(F.time(HQ.now().toISOString(), v.tz)) + ' ' + esc(F.tz(v.tz)) + '</span></div><div class="list">';
    pls.forEach(function (pl) { var va = Dx.person(pl.vaId), cl = Dx.client(pl.clientId), st = HQ.status(pl); s += h.li({ lead: '<span class="' + (st.live ? 'live' : '') + '" style="display:inline-block">' + h.avatar(va) + '</span>', title: esc(va.name) + ' <span class="small muted">· ' + esc(cl.name) + '</span>', sub: h.statusPill(pl) + '<div style="margin-top:4px">' + reportState(pl, v) + '</div>', go: 'placement', params: { id: pl.id } }); });
    s += '</div></div>';
    var oldest = pendingWeeks()[0];
    s += groupCard(t('needsDecision'), g.decide, v);
    var sent = pls.filter(function (pl) { return !!HQ.todayReport(pl.id); }).length, ysent = pls.filter(function (pl) { return !!reportOn(pl.id, y); }).length;
    s += groupCard(t('missingToday'), g.missing, v, t('noneMissing', { y: ysent, n: pls.length, m: sent }));
    s += groupCard(t('expiringGroup'), g.expiring, v);
    s += groupCard(t('unreadGroup'), g.unread, v);
    s += '<p class="tiny muted" style="margin:-4px 4px 12px">' + esc(t('clearModeLater')) + '</p>';
    /* yesterday's reports */
    s += '<div class="card"><div class="card-head"><h3>' + esc(t('reportsYesterday')) + ' · ' + esc(F.date(y, 'long')) + '</h3>' + h.go(esc(t('seeAll')), 'report', {}, 'btn-ghost btn-sm') + '</div><div class="list">';
    pls.forEach(function (pl) { var va = Dx.person(pl.vaId), cl = Dx.client(pl.clientId), r = reportOn(pl.id, y), ch = HQ.channelForPlacement(pl.id); s += h.li({ lead: h.avatar(va), title: esc(va.name) + ' <span class="small muted">· ' + esc(cl.name) + '</span> ' + (r ? h.chip('✓ ' + F.time(r.at, cl.tz) + ' ' + F.tz(cl.tz), 'good') : h.chip(t('noReport'), 'bad', true)), sub: r && r.report && r.report.kpi ? esc(kpiLine(r.report.kpi)) : (r ? esc((r.report.done || [])[0] || '') : ''), go: 'channel', params: { id: ch.id } }); });
    s += '</div></div>';
    /* recruiting and cohort */
    var apps = D.applications || []; var wkEnd = addDays(mondayOf(Dx.today()), 6); var ivs = apps.filter(function (a) { return a.interviewAt && HQ.isoDate(a.interviewAt) >= mondayOf(Dx.today()) && HQ.isoDate(a.interviewAt) <= wkEnd; }).length; var dueR = apps.filter(function (a) { return a.expectedReplyBy && F.daysUntil(a.expectedReplyBy) <= 0 && ['active', 'placed', 'talent_pool'].indexOf(a.stage) < 0; }).length;
    s += '<div class="card"><div class="card-head"><h3>' + esc(t('recruitingCohort')) + '</h3>' + h.go(esc(t('recruiting')), 'pipeline', {}, 'btn-ghost btn-sm') + '</div><div class="row wrap" style="gap:6px">' + h.chip(t(ivs === 1 ? 'interviews1' : 'interviewsThisWeek', { n: ivs }), 'blue') + h.chip(t(dueR === 1 ? 'replies1' : 'repliesDue', { n: dueR }), dueR ? 'warn' : '') + h.chip(t('applicantsByStage', { n: apps.length })) + '</div><div class="list" style="margin-top:8px">';
    Dx.vas().filter(function (p) { return p.status === 'onboarding'; }).forEach(function (p) { var ac = academyState(p.id), ob = obState(p.id), bd = Dx.person(p.buddyId); s += h.li({ lead: h.avatar(p), title: esc(p.name) + ' <span class="small muted">· ' + esc(p.cohort || '') + '</span>', sub: esc(t('tasksOf', { a: ob.done, b: ob.total }) + ' · ' + (ac.module ? t('moduleOf', { a: ac.module.order, b: ac.modCount }) : t('done')) + (bd ? ' · ' + t('buddy').toLowerCase() + ' ' + bd.first : '')), trail: h.progress(ac.done / ac.total * 100, 'gold').replace('class="progress', 'style="width:70px" class="progress'), go: 'cohorts', params: { id: p.cohort || '' } }); });
    s += '</div></div>';
    /* bench */
    s += '<div class="card"><div class="card-head"><h3>' + esc(t('bench')) + '</h3>' + h.go(esc(t('proposeClient')), 'bench', {}, 'btn-ghost btn-sm') + '</div><div class="list">';
    var bench = Dx.vas().filter(function (p) { return p.status === 'bench'; });
    if (!bench.length) s += h.empty(t('nothingHere'), ''); bench.forEach(function (p) { s += h.li({ lead: h.avatar(p), title: esc(p.name) + ' <span class="small muted">· ' + esc(Dx.tierShort(p.tier)) + '</span>', sub: esc(p.country + ' · ' + F.ampm(p.availability.from) + '–' + F.ampm(p.availability.to) + ' ' + F.tz(p.availability.tz) + ' · ' + t('english') + ' ' + p.english + (p.certifiedOn ? ' · ' + t('certifiedShort', { d: F.date(p.certifiedOn) }) : '')), go: 'bench', params: { id: p.id } }); });
    s += '</div></div>';
    /* this week */
    var evs = upcoming(v, 7, 8);
    var week = '<div class="card"><div class="card-head"><h3>' + esc(t('thisWeekCard')) + '</h3>' + h.go(esc(t('declaredUnavailable')), 'timeoff', {}, 'btn-ghost btn-sm') + '</div>' + (evs.length ? '<div class="list">' + evs.map(function (e) { return eventRow(e, v); }).join('') + '</div>' : h.empty(t('noEvents'), '')) + '</div>';
    var pane = HQ.isPhone() ? null : week; if (HQ.isPhone()) s += week;
    return { title: t('inbox'), sub: esc(v.first + ' · ' + F.date(Dx.today(), 'full')), body: s, pane: pane, actions: oldest ? (HQ.isPhone() ? '<button class="iconbtn" data-go="week" data-id="' + esc(oldest.id) + '" aria-label="' + esc(t('approveHours')) + '" title="' + esc(t('approveHours')) + '" style="background:var(--btn-gold);color:var(--btn-gold-fg)">' + ico('check', 20) + '</button>' : h.go(ico('check', 18) + esc(t('approveHours')), 'week', { id: oldest.id }, 'btn-gold btn-sm')) : '' };
  };

  /* ---------- owner Today ---------- */
  function ownerHome(v) {
    var pls = Dx.activePlacements(), blk = D.block, nb = D.nextBlock, y = yesterdayIso();
    var dayIdx = -F.daysUntil(blk.start) + 1, len = Math.round((Date.parse(blk.end) - Date.parse(blk.start)) / 86400000) + 1;
    var sent = pls.filter(function (pl) { return !!HQ.todayReport(pl.id); }).length, ysent = pls.filter(function (pl) { return !!reportOn(pl.id, y); }).length;
    var nbInv = pls.map(function (pl) { var b = blockOf(pl.id, nb); return b ? invoiceOf(b.id) : null; }).filter(Boolean); var paidN = nbInv.filter(function (i) { return i.status === 'paid'; }).length; var run = nextRun();
    /* 1 today bar */
    var s = '<div class="card"><div class="card-head"><h3>' + esc(F.date(Dx.today(), 'long')) + ' · ' + esc(t('block')) + ' ' + esc(range(blk.start, blk.end)) + '</h3><span class="small muted">' + esc(t('dayOf', { a: dayIdx, b: len })) + '</span></div><div class="row wrap" style="gap:14px">';
    pls.forEach(function (pl) { var va = Dx.person(pl.vaId), cl = Dx.client(pl.clientId), st = HQ.status(pl); s += '<button class="row" style="gap:8px;border:0;background:transparent;padding:0;color:inherit;text-align:left" data-go="placement" data-id="' + pl.id + '"><span class="' + (st.live ? 'live' : '') + '" style="display:inline-block">' + h.avatar(va) + '</span><span><span class="b" style="color:var(--fg)">' + esc(va.first) + '</span><br><span class="tiny muted">' + esc(F.hrs(st.minutesToday) + ' · ' + F.time(HQ.now().toISOString(), cl.tz) + ' ' + F.tz(cl.tz)) + '</span></span></button>'; });
    s += '</div><div class="row wrap small muted" style="gap:12px;margin-top:12px"><span>' + esc(t('reportsToday')) + ' <b class="num" style="color:var(--fg)">' + sent + '/' + pls.length + '</b></span><span>' + esc(t('reportsYesterday')) + ' <b class="num" style="color:var(--fg)">' + ysent + '/' + pls.length + '</b></span><span>' + esc(t('nextBlock')) + ' ' + esc(range(nb.start, nb.end)) + ' · ' + esc(t('invoice').toLowerCase()) + ' ' + esc(F.date(nb.invoicedOn)) + '</span></div></div>';
    /* 2 needs you */
    var rows = [];
    (D.invoices || []).filter(function (i) { return i.status === 'failed'; }).forEach(function (i) { var cl = Dx.client(i.clientId), b = (D.blocks || []).filter(function (x) { return x.id === i.blockId; })[0], pl = b ? Dx.placement(b.placementIds[0]) : null, va = pl ? Dx.person(pl.vaId) : null, ct = cl ? Dx.person(cl.contactId) : null, ch = pl ? HQ.channelForPlacement(pl.id) : null;
      rows.push({ cls: 'alert', html: esc(t('invoiceFailedRow', { c: cl.name, n: i.number, a: '\u0001', d: F.date(i.failedOn), r: F.date(i.retryOn), v: va ? va.first : '', p: F.date(i.dueOn) })).replace('\u0001', h.money('bill', i.amount)), btns: h.btn(esc(t('retryCharge')), 'retry-charge', 'btn-gold btn-sm', { id: i.id }) + (ch && ct ? h.go(esc(t('messageX', { n: ct.first })), 'channel', { id: ch.id }, 'btn-ghost btn-sm') : '') + h.go(esc(t('invoice')), 'invoice', { id: i.id }, 'btn-ghost btn-sm') }); });
    pendingWeeks().forEach(function (w) { var pl = Dx.placement(w.placementId), va = Dx.person(pl.vaId), cl = Dx.client(pl.clientId); rows.push({ cls: '', text: cl.name + ' · ' + t('weekUnapproved', { w: range(w.weekStart, w.weekEnd), v: va.first, h: F.hdec(w.trackedHours), d: -F.daysUntil(w.dueOn) }), btns: h.go(esc(t('open')), 'week', { id: w.id }, 'btn-blue btn-sm') }); });
    pls.filter(function (pl) { return pl.fitWindowEnds && F.daysUntil(pl.fitWindowEnds) <= 30; }).forEach(function (pl) { var va = Dx.person(pl.vaId); rows.push({ cls: '', text: t('fitEnds', { v: va.first, d: F.date(pl.fitWindowEnds), n: F.daysUntil(pl.fitWindowEnds) }), btns: h.go(esc(t('planCheckin')), 'placement', { id: pl.id }, 'btn-ghost btn-sm') }); });
    pls.forEach(function (pl) { if (reportOn(pl.id, y) || offReason(pl, y)) return; var va = Dx.person(pl.vaId), ch = HQ.channelForPlacement(pl.id); rows.push({ cls: '', text: t('missingReportRow', { v: va.first, d: F.dayLabel(y) }), btns: h.go(esc(t('openChannel')), 'channel', { id: ch.id }, 'btn-ghost btn-sm') }); });
    (D.tickets || []).filter(function (k) { return k.status !== 'closed' && k.clientId; }).forEach(function (k) { var cl = Dx.client(k.clientId); rows.push({ cls: k.ackAt ? '' : 'alert', html: esc(t('ticketRow', { id: k.id, c: cl.name, d: F.date(HQ.isoDate(k.fixDueAt)) }) + ' · ' + L(k.title)) + ' <span class="small muted">· ' + (k.ackAt ? esc(t('ackedAt', { t: '\u0001' })).replace('\u0001', F.time2(k.ackAt, cl.tz)) : esc(t('ackDueIn', { t: '\u0001' })).replace('\u0001', F.time2(k.ackDueAt, cl.tz))) + '</span>', btns: h.go(esc(t('open')), 'ticket', { id: k.id }, 'btn-ghost btn-sm') }); });
    s += '<div class="card"><div class="card-head"><h3>' + esc(t('needsYou')) + '</h3>' + h.badge(rows.length, 'soft') + '</div>';
    s += rows.length ? '<div class="list">' + rows.map(function (r) { return '<div class="li" style="flex-wrap:wrap"><div class="grow" style="min-width:220px">' + (r.cls ? ico('alert', 16) + ' ' : '') + (r.html || esc(r.text)) + '</div><div class="row" style="gap:6px;flex:none">' + r.btns + '</div></div>'; }).join('') + '</div>' : h.empty(t('nothingNeedsYou'), '');
    s += '</div>';
    /* 3 this block (money gated) */
    var tb = 0, tp = 0; var mrows = pls.map(function (pl) { var va = Dx.person(pl.vaId), cl = Dx.client(pl.clientId); var hrs = pl.hoursPerWeek * D.rates.blockWeeks, bill = hrs * pl.billRate, pay = hrs * pl.payRate; tb += bill; tp += pay; return [h.avatar(va, 'sm') + ' ' + esc(va.first) + '<span class="sub">' + esc(cl.name) + '</span>', '<span class="num">' + hrs + ' h × ' + h.money('bill', pl.billRate, { rate: true }) + '</span>', h.money('bill', bill), h.money('pay', pay), h.money('margin', bill - pay)]; });
    s += '<div class="card"><div class="card-head"><h3>' + esc(t('thisBlock')) + ' · ' + esc(range(blk.start, blk.end)) + '</h3>' + h.go(esc(t('marginPerPlacement')), 'money', {}, 'btn-ghost btn-sm') + '</div>';
    s += '<div class="kpis" style="margin-bottom:10px">' + h.kpi(h.money('bill', tb, { cents: false }), t('billed')) + h.kpi(h.money('pay', tp, { cents: false }), t('vaCost')) + h.kpi(h.money('margin', tb - tp, { cents: false }) + (Dx.can('margin') ? ' <span class="small muted">(' + F.pct((tb - tp) / tb * 100) + ')</span>' : ''), t('margin'), 'gold') + '</div>';
    s += h.table([{ l: t('va_') }, { l: t('scheduled'), num: true }, { l: t('billed'), num: true }, { l: t('vaCost'), num: true }, { l: t('margin'), num: true }], mrows);
    s += '<p class="small muted" style="margin-top:8px">' + esc(t('nextBlockInvoiced', { w: range(nb.start, nb.end), d: F.date(nb.invoicedOn), p: paidN, n: nbInv.length, q: run ? F.date(run.date) : '—' })) + '</p></div>';
    /* 4 chat */
    var un = unreadRows(v, 5);
    s += '<div class="card"><div class="card-head"><h3>' + esc(t('chat')) + '</h3>' + h.go(esc(t('seeAll')), 'channels', {}, 'btn-ghost btn-sm') + '</div>' + (un ? '<div class="list">' + un + '</div>' : h.empty(t('allCaughtUp'), '')) + '</div>';
    /* 5 bench and pipeline */
    var apps = D.applications || []; var byStage = {}; apps.forEach(function (a) { byStage[a.stage] = (byStage[a.stage] || 0) + 1; }); var dueR = apps.filter(function (a) { return a.expectedReplyBy && F.daysUntil(a.expectedReplyBy) <= 0 && ['active', 'placed', 'talent_pool'].indexOf(a.stage) < 0; }).length;
    s += '<div class="card"><div class="card-head"><h3>' + esc(t('benchPipeline')) + '</h3>' + h.go(esc(t('recruiting')), 'pipeline', {}, 'btn-ghost btn-sm') + '</div><div class="list">';
    Dx.vas().filter(function (p) { return p.status === 'bench'; }).forEach(function (p) { s += h.li({ lead: h.avatar(p), title: esc(p.name) + ' <span class="small muted">· ' + esc(Dx.tierShort(p.tier)) + '</span>', sub: esc(p.certifiedOn ? t('certifiedShort', { d: F.date(p.certifiedOn) }) : ''), trail: h.chip(t('bench'), 'gold'), go: 'bench', params: { id: p.id } }); });
    Dx.vas().filter(function (p) { return p.status === 'onboarding'; }).forEach(function (p) { var ac = academyState(p.id), ob = obState(p.id); s += h.li({ lead: h.avatar(p), title: esc(p.name) + ' <span class="small muted">· ' + esc(p.cohort || '') + '</span>', sub: esc((ac.module ? t('moduleOf', { a: ac.module.order, b: ac.modCount }) : t('done')) + ' · ' + t('tasksOf', { a: ob.done, b: ob.total })), trail: h.chip(t('onboarding'), 'blue'), go: 'cohorts', params: {} }); });
    s += '</div><div class="row wrap" style="gap:6px;margin-top:10px">' + h.chip(t('applicantsByStage', { n: apps.length }), 'blue') + Object.keys(byStage).map(function (k) { var kk = k === 'talent_pool' ? 'talentPool' : k; return h.chip((HQ.T[kk] ? t(kk) : k) + ' ' + byStage[k]); }).join('') + h.chip(t(dueR === 1 ? 'replies1' : 'repliesDue', { n: dueR }), dueR ? 'warn' : '') + '</div></div>';
    /* 6 client pulse */
    var mon = Dx.today().slice(0, 7); var nxt = addDays(mon + '-01', 32).slice(0, 7) + '-01';
    s += '<div class="card"><div class="card-head"><h3>' + esc(t('clientPulse')) + ' · ' + esc(new Date(mon + '-15T12:00:00Z').toLocaleDateString(F.locale(), { month: 'long', timeZone: 'UTC' })) + '</h3>' + h.go(esc(t('reports')), 'reports', {}, 'btn-ghost btn-sm') + '</div><div class="row wrap" style="gap:8px">';
    (D.clients || []).forEach(function (cl) { var p = (D.pulse || []).filter(function (x) { return x.clientId === cl.id && x.month === mon; })[0]; s += h.kpi(p ? p.score + '<span class="small muted">/5</span>' : '—', cl.name + (p ? '' : ' · ' + t('notAskedYet')), p && p.score >= 4 ? 'good' : p ? 'bad' : ''); });
    s += '</div><p class="small muted" style="margin-top:8px">' + esc(t('nextPulse', { d: F.date(nxt, 'long') })) + '</p></div>';
    /* 7 coming up */
    var evs = upcoming(v, 21, 6);
    var up = '<div class="card"><div class="card-head"><h3>' + esc(t('comingUp')) + '</h3>' + h.go(esc(t('calendar')), 'calendar', {}, 'btn-ghost btn-sm') + '</div>' + (evs.length ? '<div class="list">' + evs.map(function (e) { return eventRow(e, v); }).join('') + '</div>' : h.empty(t('noEvents'), '')) + '</div>';
    if (HQ.isPhone()) s += up;
    return { title: t('today'), sub: esc(t('hello', { n: v.first })), body: s, pane: HQ.isPhone() ? null : up, actions: HQ.isPhone() ? '<button class="iconbtn" data-go="announce" aria-label="' + esc(t('postAnnouncement')) + '" title="' + esc(t('postAnnouncement')) + '" style="background:var(--btn-gold);color:var(--btn-gold-fg)">' + ico('bell', 20) + '</button>' : h.go(ico('bell', 18) + esc(t('postAnnouncement')), 'announce', {}, 'btn-gold btn-sm') };
  }

  /* ---------- VA Today ---------- */
  function vaHome(v) {
    var pl = Dx.placementForVa(v.id), cl = pl ? Dx.client(pl.clientId) : null, s = '';
    var mgr = Dx.people().filter(function (p) { return p.role === 'manager'; })[0], own = Dx.people().filter(function (p) { return p.role === 'owner'; })[0];
    /* 1 hero */
    s += '<div class="card accent"><div class="row" style="gap:12px;align-items:flex-start"><span class="' + (pl && HQ.status(pl).live ? 'live' : '') + '" style="display:inline-block">' + h.avatar(v, 'lg') + '</span><div class="grow"><h2 style="font-size:24px">' + esc(t('hello', { n: v.first })) + '</h2>';
    if (pl) {
      s += '<div class="small muted">' + esc(cl.name + ' · ' + Dx.tierShort(pl.tier)) + '</div><div class="small" style="margin-top:4px">' + esc(t('shiftLine', { a: clockIn(pl.schedule.from, pl.schedule.tz, v.tz) + '–' + clockIn(pl.schedule.to, pl.schedule.tz, v.tz), b: F.ampm(pl.schedule.from) + '–' + F.ampm(pl.schedule.to), z: F.tz(pl.schedule.tz) })) + '</div><div style="margin-top:8px">' + h.statusPill(pl) + '</div>';
      s += '<div class="row wrap" style="gap:6px;margin-top:10px">' + h.btn(ico('eye') + esc(t('viewScreenshots')), 'toast', 'btn-ghost btn-sm', { msg: t('screenshotsNote') }) + h.go(ico('alert') + esc(t('reportOutage')), 'outages', {}, 'btn-ghost btn-sm') + h.go(esc(t('placement')), 'placement', { id: pl.id }, 'btn-ghost btn-sm') + '</div>';
    } else if (v.status === 'bench') {
      s += '<div class="small">' + esc(t('onBenchHero', { t: v.tier === 'isa' ? t('isaCertified') : t('certified'), d: v.certifiedOn ? F.date(v.certifiedOn) : '' })) + '</div><div class="row wrap" style="gap:6px;margin-top:10px">' + h.btn(esc(t('updateAvailability')), 'toast', 'btn-gold btn-sm', { msg: t('prototypeOnly') }) + h.go(esc(t('bench')), 'bench', { id: v.id }, 'btn-ghost btn-sm') + '</div>';
    } else {
      var ac = academyState(v.id), ob = obState(v.id), bd = Dx.person(v.buddyId);
      s += '<div class="small">' + esc(t('tasksOf', { a: ob.done, b: ob.total }) + ' · ' + (ac.module ? t('moduleOf', { a: ac.module.order, b: ac.modCount }) : t('done')) + (bd ? ' · ' + t('buddy') + ' ' + bd.first : '')) + '</div>' + h.progress(ac.done / ac.total * 100, 'gold').replace('class="progress', 'style="margin-top:8px" class="progress') + '<div class="row wrap" style="gap:6px;margin-top:10px">' + h.go(esc(t('continueAcademy')), 'academy', {}, 'btn-gold btn-sm') + h.go(esc(t('onboarding')), 'onboarding', {}, 'btn-ghost btn-sm') + '</div>';
    }
    s += '</div></div></div>';
    /* 2 today's report */
    if (pl) {
      var r = HQ.todayReport(pl.id), wk = mondayOf(Dx.today()), off = offReason(pl, Dx.today());
      s += '<div class="card' + (r ? ' good' : '') + '"><div class="card-head"><h3>' + esc(t('reportToday')) + '</h3>' + (r ? h.chip(t('sent'), 'good', true) : off ? offChip(off) : pastDeadline(cl) ? h.chip(t('reportLate'), 'bad', true) : h.chip(t('pending'), 'warn', true)) + '</div>';
      if (r) { var k = r.report && r.report.kpi; s += '<p class="small">' + esc(t('sentAt', { t: F.time(r.at, v.tz) })) + (k ? ' · ' + esc(kpiLine(k)) : '') + '</p><div class="row wrap" style="gap:6px;margin-top:10px">' + h.go(esc(t('addUpdate')), 'report', { again: '1' }, 'btn-ghost btn-sm') + '</div>'; }
      else s += '<p class="small muted">' + esc(off ? t('reportDueBy') : t('expectedBy', { t: F.ampm('19:00') + ' ' + F.tz(cl.tz), u: clockIn('19:00', cl.tz, v.tz) })) + '</p>' + h.go(ico('report', 18) + esc(t('sendTodayReport')), 'report', {}, 'btn-gold btn-block btn-lg').replace('class="btn', 'style="margin-top:12px" class="btn');
      var wkReps = []; for (var i = 0; i < 5; i++) { var d = addDays(wk, i); if (d > Dx.today()) break; wkReps.push(reportOn(pl.id, d) ? '✓' : offReason(pl, d) ? '○' : '·'); }
      s += '<p class="tiny muted" style="margin-top:10px">' + esc(t('weekSoFar')) + ' ' + wkReps.join(' ') + '</p></div>';
      /* 3 client channel first, then anything else unread (DMs, #team, support) */
      var ch = HQ.channelForPlacement(pl.id); var others = Dx.channelsFor(v).filter(function (c) { return c.id !== (ch && ch.id) && Dx.unread(c.id, v) > 0; }).slice(0, 4);
      if (ch) s += '<div class="card tight"><div class="list">' + chRow(ch, v) + (others.length ? '<div class="sgroup" style="padding-left:4px">' + esc(t('otherUnread')) + '</div>' + others.map(function (c) { return chRow(c, v); }).join('') : '') + '</div></div>';
      /* 4 hours and pay */
      var days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'], daysEn = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']; var perDay = pl.hoursPerWeek / 5 * 60;
      s += '<div class="card"><div class="card-head"><h3>' + esc(t('hoursAndPay')) + '</h3>' + h.go(esc(t('myHours')), 'hours', {}, 'btn-ghost btn-sm') + '</div>';
      for (var j = 0; j < 5; j++) { var dj = addDays(wk, j); var m = mins(entries(pl.id, dj, dj)); s += '<div class="row" style="gap:10px;padding:3px 0"><span class="small muted" style="width:36px">' + (HQ.lang() === 'es' ? days : daysEn)[j] + '</span><div class="grow">' + h.progress(m / perDay * 100, dj === Dx.today() ? 'gold' : 'good') + '</div><span class="small num" style="width:56px;text-align:right">' + (dj > Dx.today() ? '—' : F.hrs(m)) + '</span></div>'; }
      /* hours this block: approved (locked weeks) vs pending (open weeks plus this week's tracked time); no money here */
      var blk = D.block, appr = 0, pend = 0;
      approvalsFor(pl.id).filter(function (w) { return w.weekStart >= blk.start && w.weekStart <= blk.end; }).forEach(function (w) { if (w.status === 'approved') appr += w.approvedHours * 60; else pend += w.trackedHours * 60; });
      pend += mins(entries(pl.id, wk, Dx.today()).filter(function (e) { return !approvalsFor(pl.id).some(function (w) { return w.weekStart <= e.date && w.weekEnd >= e.date; }); }));
      s += '<div class="row wrap small" style="gap:8px;margin-top:10px"><span class="muted">' + esc(t('blockHours', { w: range(blk.start, blk.end) })) + '</span>' + h.chip(F.hrs(appr) + ' ' + t('approvedHours'), 'good', true) + h.chip(F.hrs(pend) + ' ' + t('pendingHours'), 'blue', true) + '<span class="muted">' + esc(t('scheduled').toLowerCase()) + ' ' + esc(pl.hoursPerWeek * D.rates.blockWeeks + ' h') + '</span></div>';
      var lw = approvalsFor(pl.id).filter(function (w) { return w.weekStart === addDays(wk, -7); })[0];
      if (lw) s += '<p class="small" style="margin-top:8px">' + esc(t('lastWeek')) + ' ' + F.hdec(lw.trackedHours) + ' h · ' + (lw.status === 'approved' ? '<span style="color:var(--good-fg)">' + esc(t('lastWeekApproved', { n: (Dx.person(lw.approvedBy) || {}).first || '', d: F.date(HQ.isoDate(lw.approvedAt)) })) + '</span>' : '<span style="color:var(--warn-fg)">' + esc(t('awaitingApproval')) + '</span>') + '</p>';
      var run = nextRun(), ln = lineFor(run, v.id), last = lastPaidRun(), ll = lineFor(last, v.id);
      if (run) s += '<p class="small" style="margin-top:6px">' + esc(t('nextPayday')) + ' <b>' + esc(F.date(run.date, 'long')) + '</b>' + (ln ? ' · ' + esc(t('estimated')) + ' ' + h.money('pay', ln.amount) + ' <span class="muted">(' + F.hdec(ln.hours) + ' h × ' + h.money('pay', ln.rate, { rate: true }) + ')</span>' : '') + '</p>';
      if (ll) s += '<p class="small" style="margin-top:6px">' + esc(t('lastStatement', { d: F.date(last.date) })) + ' · ' + h.money('pay', ll.amount) + ' ' + h.go(esc(t('view')), 'statement', { id: ll.id }, 'btn-ghost btn-sm') + '</p>';
      s += '</div>';
    } else {
      var run2 = nextRun(); s += '<div class="card"><div class="card-head"><h3>' + esc(t('hoursAndPay')) + '</h3></div><p class="small muted">' + esc(t('noStatementYet')) + (run2 ? ' ' + esc(t('nextPayday')) + ' ' + esc(F.date(run2.date, 'long')) + '.' : '') + '</p></div>';
    }
    /* 5 support */
    var ths = Dx.channelsFor(v).filter(function (c) { return c.kind === 'thread'; });
    s += '<div class="card"><div class="card-head"><h3>' + ico('lock') + ' ' + esc(t('yourSupport')) + '</h3><span class="tiny muted">' + esc(t('onlyYou', { a: mgr ? mgr.first : '', b: own ? own.first : '' })) + '</span></div>';
    s += ths.length ? '<div class="list">' + ths.map(function (c) { var last = Dx.lastMessage(c.id), who = last ? Dx.person(last.authorId) : null; return h.li({ lead: '<span class="hash">' + ico('lock', 16) + '</span>', title: esc(L(c.name)), sub: last ? esc(t('repliedOn', { n: who ? who.first : '', d: F.dayLabel(HQ.isoDate(last.at)).toLowerCase() })) : '', trail: h.badge(Dx.unread(c.id, v), 'gold') + ' ' + h.statusChip(c.status), go: 'channel', params: { id: c.id } }); }).join('') + '</div>' : '<p class="small muted">' + esc(t('noThreads')) + '</p>';
    s += '<div style="margin-top:10px">' + h.btn(I.plus + esc(t('newTopic')), 'open-thread', 'btn-ghost btn-sm') + '</div></div>';
    /* 5b to do: own documents expiring or missing, onboarding tasks still open (from the seed, with their due dates) */
    var todo = [];
    (D.documents || []).filter(function (d) { return d.ownerId === v.id && (d.status === 'expiring' || d.status === 'missing'); }).forEach(function (d) { todo.push(h.li({ lead: '<span class="hash">' + ico('doc', 18) + '</span>', title: esc(d.status === 'missing' ? t('docMissingMine', { t: L(d.title) }) : t('docExpiring', { t: L(d.title), d: F.date(d.expiresOn, 'long') })), sub: d.expiresOn ? esc(t('inDays', { n: F.daysUntil(d.expiresOn) })) : '', trail: h.statusChip(d.status), go: 'documents', params: { id: v.id } })); });
    var obp = (D.onboardingProgress || {})[v.id] || {};
    (D.onboardingTaskDefs || []).filter(function (d) { return obp[d.id] && obp[d.id].status !== 'done'; }).forEach(function (d) { var st = obp[d.id]; todo.push(h.li({ lead: '<span class="hash">' + ico(d.kind === 'upload' ? 'clip' : d.kind === 'link' ? 'doc' : 'check', 18) + '</span>', title: esc(t('obTaskDue', { t: L(d.title) })), sub: esc((st.due ? t('todoDueOn', { d: F.date(st.due, 'long') }) : '') + (st.note ? ' · ' + L(st.note) : '')), trail: h.statusChip(st.status), go: 'onboarding', params: { id: d.id } })); });
    if (todo.length) s += '<div class="card"><div class="card-head"><h3>' + esc(t('toDo')) + '</h3>' + h.badge(todo.length, 'soft') + '</div><div class="list">' + todo.join('') + '</div></div>';
    /* 6 up next */
    var rows = [];
    if (pl) (pl.checkpoints || []).filter(function (c) { return !c.done; }).slice(0, 1).forEach(function (c) { rows.push(h.li({ lead: '<span class="hash">' + ico('flag', 18) + '</span>', title: esc(t('checkpoint') + ' ' + t('dayN').toLowerCase() + ' ' + c.day), sub: esc(F.date(c.due, 'long')), go: 'placement', params: { id: pl.id } })); });
    upcoming(v, 30, 4).forEach(function (e) { rows.push(eventRow(e, v)); });
    var hn = (D.holidaySets || {})[v.country] || []; var nextHn = hn.filter(function (x) { return x.date > Dx.today() && !(D.events || []).some(function (e) { return e.kind === 'holiday' && e.date === x.date && e.date <= addDays(Dx.today(), 30); }); })[0];
    if (nextHn) { var declareBy = nextHn.date; while (bizDays(declareBy, nextHn.date) < 10) declareBy = addDays(declareBy, -1); rows.push(h.li({ lead: '<span class="hash ann">' + ico('calendar', 18) + '</span>', title: esc(L(nextHn.name)) + ' <span class="small muted">· ' + esc(t('hnHoliday')) + '</span>', sub: esc(F.date(nextHn.date, 'long') + ' · ' + t('hnCountdown', { d: F.date(declareBy), n: bizDays(Dx.today(), nextHn.date) })), go: 'timeoff', params: {} })); }
    if (cl) { var us = ((D.holidaySets || {})[cl.holidaySet] || []).filter(function (x) { return x.date > Dx.today(); })[0]; if (us) rows.push(h.li({ lead: '<span class="hash">' + ico('calendar', 18) + '</span>', title: esc(L(us.name)), sub: esc(F.date(us.date, 'long') + ' · ' + t('clientHoliday')), go: 'calendar', params: {} })); }
    if (pl && pl.tier === 'isa') { var wk2 = mondayOf(Dx.today()); var qa = (D.callQA || []).filter(function (q) { return q.placementId === pl.id && q.weekStart === wk2; })[0]; rows.push(h.li({ lead: '<span class="hash">' + ico('phone', 18) + '</span>', title: esc(t('callQA')), sub: esc((qa ? qa.calls.length : 0) + ' / 3 · ' + t('thisWeek').toLowerCase()), go: 'callqa', params: { id: pl.id } })); }
    s += '<div class="card"><div class="card-head"><h3>' + esc(t('upNext')) + '</h3>' + h.go(esc(t('calendar')), 'calendar', {}, 'btn-ghost btn-sm') + '</div>' + (rows.length ? '<div class="list">' + rows.join('') + '</div>' : h.empty(t('noEvents'), '')) + '</div>';
    /* 7 academy (bench and onboarding only) */
    if (!pl) {
      var pg = (D.academyProgress || {})[v.id] || {};
      s += '<div class="card"><div class="card-head"><h3>' + esc(t('academy')) + '</h3>' + h.go(esc(t('open')), 'academy', {}, 'btn-ghost btn-sm') + '</div><div class="list">';
      (D.academyModules || []).forEach(function (m) { var ls = (D.academyLessons || []).filter(function (l) { return l.moduleId === m.id; }); var dn = ls.filter(function (l) { return pg[l.id] && pg[l.id].done; }).length; s += h.li({ lead: '<span class="hash">' + m.order + '</span>', title: esc(L(m.title)), sub: dn + '/' + ls.length + ' ' + esc(t('lessons')) + (m.track === 'isa' ? ' · ISA' : ''), trail: h.progress(ls.length ? dn / ls.length * 100 : 0, dn === ls.length ? 'good' : 'gold').replace('class="progress', 'style="width:70px" class="progress'), go: 'academy', params: { id: m.id } }); });
      s += '</div></div>';
    }
    return { title: t('today'), sub: esc(F.date(Dx.today(), 'full') + ' · ' + F.time(HQ.now().toISOString(), v.tz) + ' ' + F.tz(v.tz)), body: s, pane: HQ.isPhone() ? null : '<div class="card"><div class="card-head"><h3>' + esc(t('notifications')) + '</h3></div>' + (Dx.notificationsFor(v).slice(0, 5).map(function (n) { return h.li({ title: esc(L(n.text)), sub: F.rel(n.at), go: n.link && n.link.screen, params: n.link && n.link.id ? { id: n.link.id } : {} }); }).join('') || h.empty(t('allCaughtUp'), '')) + '</div>' };
  }

  /* ---------- client My VA ---------- */
  function clientHome(v) {
    var cl = Dx.client(v.clientId); var pls = cl ? Dx.placementForClient(cl.id) : []; var pl = pls[0]; var s = '';
    var mgr = Dx.people().filter(function (p) { return p.role === 'manager'; })[0];
    if (!pl) return { title: t('myVA'), body: h.empty(t('nothingHere'), '') };
    var va = Dx.person(pl.vaId), ch = HQ.channelForPlacement(pl.id), nm = Dx.vaLabel(va, v);
    /* 0 open ticket */
    (D.tickets || []).filter(function (k) { return k.clientId === cl.id && k.status !== 'closed'; }).forEach(function (k) { s += '<div class="card alert"><div class="card-head"><h3>' + esc(t('openTicket')) + ' · ' + esc(k.id) + '</h3>' + h.statusChip(k.status) + '</div><p class="small">' + esc(L(k.title)) + '</p><p class="small muted" style="margin-top:4px">' + (k.ackAt ? esc(t('acknowledgedAt')) + ' ' + esc(F.date(HQ.isoDate(k.ackAt), 'long')) + ' · ' + F.time2(k.ackAt, cl.tz) : esc(t('slaAck')) + ' ' + esc(F.date(HQ.isoDate(k.ackDueAt), 'long')) + ' · ' + F.time2(k.ackDueAt, cl.tz)) + ' · ' + esc(t('fixWindowEnds', { d: F.date(HQ.isoDate(k.fixDueAt), 'long') })) + '</p><div style="margin-top:10px">' + h.go(esc(t('open')), 'ticket', { id: k.id }, 'btn-ghost btn-sm') + '</div></div>'; });
    /* 1 hero */
    var st = HQ.status(pl);
    s += '<div class="card accent"><div class="row" style="gap:12px;align-items:flex-start"><span class="' + (st.live ? 'live' : '') + '" style="display:inline-block">' + h.avatar(va, 'lg') + '</span><div class="grow"><h2 style="font-size:24px">' + esc(nm + ' · ' + Dx.tierShort(pl.tier)) + '</h2><div class="small muted">' + esc(t('workingWithYou', { d: F.date(pl.start) })) + '</div><div style="margin-top:8px">' + h.statusPill(pl) + '</div><div class="small" style="margin-top:6px">' + esc(t('schedule') + ' ' + F.ampm(pl.schedule.from) + '–' + F.ampm(pl.schedule.to) + ' ' + F.tz(pl.schedule.tz) + ' · ' + (pl.schedule.days === 'Mon-Fri' ? t('monFri') : pl.schedule.days)) + '</div>';
    s += '<div class="row wrap" style="gap:6px;margin-top:10px">' + (ch ? h.go(ico('chat') + esc(t('messageX', { n: nm })), 'channel', { id: ch.id }, 'btn-gold btn-sm') : '') + h.btn(ico('eye') + esc(t('screenshotsHubstaff')), 'toast', 'btn-ghost btn-sm', { msg: t('screenshotsNote') }) + h.go(esc(t('scopeCard')), 'scope', { id: pl.id }, 'btn-ghost btn-sm') + '</div></div></div></div>';
    /* 2 today's report */
    var r = HQ.todayReport(pl.id), y = yesterdayIso(), yr = reportOn(pl.id, y);
    s += '<div class="card"><div class="card-head"><h3>' + esc(t('reportToday')) + '</h3>' + h.go(esc(t('allReports')), 'report', {}, 'btn-ghost btn-sm') + '</div>';
    if (r) { var k = r.report || {}; s += (k.kpi ? '<div class="kpis" style="margin-bottom:8px">' + h.kpi(k.kpi.dials, t('dials')) + h.kpi(k.kpi.conversations, t('conversations')) + h.kpi(k.kpi.apptsSet, t('apptsSet'), 'gold') + h.kpi(k.kpi.apptsHeld, t('apptsHeld'), 'good') + '</div>' : '') + '<ul class="small" style="margin:0;padding-left:18px">' + (k.done || []).slice(0, 3).map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul><p class="tiny muted" style="margin-top:6px">' + esc(t('sent')) + ' ' + F.time(r.at, v.tz) + '</p>'; }
    else if (offReason(pl, Dx.today())) s += '<p class="small muted">' + offChip(offReason(pl, Dx.today())) + '</p>';
    else if (pastDeadline(cl)) s += '<p class="small muted">' + esc(t('notifiedManager', { d: F.date(Dx.today(), 'long'), n: mgr ? mgr.first : '' })) + '</p>';
    else s += '<p class="small muted">' + esc(t('expectedByClient', { t: F.ampm('19:00') + ' ' + F.tz(cl.tz) })) + '</p>';
    if (yr) s += '<div class="list" style="margin-top:8px">' + h.li({ lead: '<span class="hash">' + ico('report', 18) + '</span>', title: esc(t('yesterdayReport')), sub: esc(((yr.report || {}).done || [])[0] || ''), trail: h.chip('✓ ' + F.time(yr.at, v.tz), 'good'), go: 'channel', params: { id: ch.id } }) + '</div>';
    s += '</div>';
    /* 3 hours this block */
    var blk = D.block; var appr = 0, pend = 0;
    approvalsFor(pl.id).filter(function (w) { return w.weekStart >= blk.start && w.weekStart <= blk.end; }).forEach(function (w) { if (w.status === 'approved') appr += w.approvedHours * 60; else pend += w.trackedHours * 60; });
    pend += mins(entries(pl.id, mondayOf(Dx.today()), Dx.today()).filter(function (e) { return !approvalsFor(pl.id).some(function (w) { return w.weekStart <= e.date && w.weekEnd >= e.date; }); }));
    var sched = pl.hoursPerWeek * D.rates.blockWeeks * 60;
    s += '<div class="card"><div class="card-head"><h3>' + esc(t('hours') + ' · ' + range(blk.start, blk.end)) + '</h3>' + h.go(esc(t('open')), 'hours', {}, 'btn-ghost btn-sm') + '</div>';
    s += '<div class="progress" style="height:12px;display:flex"><i style="width:' + Math.min(100, appr / sched * 100) + '%;background:var(--good);border-radius:999px 0 0 999px"></i><i style="width:' + Math.min(100 - appr / sched * 100, pend / sched * 100) + '%;background:var(--blue)"></i></div>';
    s += '<div class="row wrap small" style="gap:12px;margin-top:8px"><span>' + h.chip(F.hrs(appr) + ' ' + t('approvedHours'), 'good', true) + '</span><span>' + h.chip(F.hrs(pend) + ' ' + t('pendingHours'), 'blue', true) + '</span><span class="muted">' + esc(t('scheduled').toLowerCase()) + ' ' + F.hrs(sched) + '</span></div>';
    s += '<p class="tiny muted" style="margin-top:8px">' + esc(t('approvedMondays')) + ' · ' + h.btn(esc(t('viewScreenshots')), 'toast', 'btn-ghost btn-sm', { msg: t('screenshotsNote') }) + '</p></div>';
    /* 4 this week's numbers (ISA) */
    if (pl.tier === 'isa') { var wk = mondayOf(Dx.today()); var tot = { dials: 0, conversations: 0, apptsSet: 0, apptsHeld: 0 }; var n = 0;
      for (var i = 0; i < 5; i++) { var rr = reportOn(pl.id, addDays(wk, i)); if (rr && rr.report && rr.report.kpi) { n++; Object.keys(tot).forEach(function (kk) { tot[kk] += rr.report.kpi[kk] || 0; }); } }
      s += '<div class="card"><div class="card-head"><h3>' + esc(t('weekNumbers')) + '</h3><span class="tiny muted">' + esc(range(wk, addDays(wk, 4)) + ' · ' + n + ' ' + t(n === 1 ? 'report1' : 'reportsWord')) + '</span></div><div class="kpis">' + h.kpi(tot.dials, t('dials')) + h.kpi(tot.conversations, t('conversations')) + h.kpi(tot.apptsSet, t('apptsSet'), 'gold') + h.kpi(tot.apptsHeld, t('apptsHeld'), 'good') + '</div><p class="tiny muted" style="margin-top:6px">' + esc(t('targetWeek')) + '</p></div>'; }
    /* 5 chat */
    if (ch) s += '<div class="card tight"><div class="list">' + chRow(ch, v) + '</div></div>';
    /* 6 next invoice */
    var nb = D.nextBlock, b = blockOf(pl.id, nb), inv = b ? invoiceOf(b.id) : null;
    if (inv) { s += '<div class="card' + (inv.status === 'failed' ? ' alert' : '') + '"><div class="card-head"><h3>' + esc(t('nextInvoice')) + '</h3>' + h.statusChip(inv.status) + '</div>';
      if (inv.status === 'failed') s += h.note(esc(t('failedBanner', { a: '\u0001', v: nm, d: F.date(inv.dueOn) })).replace('\u0001', h.money('bill', inv.amount)), 'gold').replace('class="note', 'style="margin-bottom:10px" class="note');
      s += '<div class="row wrap" style="gap:12px"><span class="money">' + h.money('bill', inv.amount) + '</span><span class="small muted">' + esc(range(b.start, b.end) + ' · ' + b.scheduledHours + ' h') + (inv.paidOn ? ' · ' + esc(t('paid') + ' ' + F.date(inv.paidOn)) : '') + (inv.trueUp ? ' · ' + esc(t('includesTrueUp', { a: '\u0001', k: inv.trueUp > 0 ? t('credit') : t('debit') })).replace('\u0001', h.money('bill', Math.abs(inv.trueUp))) : '') + '</span></div>';
      s += '<div class="row wrap" style="gap:6px;margin-top:10px">' + h.go(esc(t('invoice') + ' ' + inv.number), 'invoice', { id: inv.id }, 'btn-ghost btn-sm') + (inv.status === 'failed' ? h.btn(esc(t('updateCard')), 'toast', 'btn-gold btn-sm', { msg: t('prototypeOnly') }) : '') + h.go(esc(t('billing')), 'billing', {}, 'btn-ghost btn-sm') + '</div></div>'; }
    /* 7 something wrong */
    s += '<div class="card"><div class="card-head"><h3>' + esc(t('somethingWrong')) + '</h3></div><p class="small muted">' + esc(t('slaLine')) + '</p><div class="row wrap" style="gap:8px;margin-top:10px"><button class="btn btn-red" data-act="open-escalate" data-id="' + pl.id + '">' + ico('flag', 18) + esc(t('escalate')) + '</button>' + (ch && mgr ? h.go(esc(t('justQuestion', { n: mgr.first })), 'channel', { id: ch.id }, 'btn-ghost btn-sm') : '') + h.go(esc(t('help')), 'help', {}, 'btn-ghost btn-sm') + '</div></div>';
    return { title: t('myVA'), sub: esc(cl.name), body: s };
  }

  /* ---------- applicant My steps ---------- */
  var STEPS = ['submitted', 'scored', 'interview', 'trial', 'offer'];
  function applicantHome(v) {
    var a = (D.applications || []).filter(function (x) { return x.personId === v.id; })[0]; var s = '';
    var mgr = Dx.people().filter(function (p) { return p.role === 'manager'; })[0];
    if (!a) return { title: t('steps'), body: h.empty(t('nothingHere'), '') };
    var idx = STEPS.indexOf(a.stage); var accepted = ['offer', 'active', 'placed'].indexOf(a.stage) >= 0; var hist = {}; (a.stageHistory || []).forEach(function (x) { hist[x.stage] = x.at; });
    s += '<div class="card"><div class="card-head"><h3>' + esc(t('yourApplication')) + '</h3>' + (a.expectedReplyBy ? h.chip(t('weReply', { d: F.date(a.expectedReplyBy, 'long') }), 'blue') : '') + '</div><div class="steps">';
    STEPS.forEach(function (st, i) { var lbl = st === 'trial' ? t('practicalTest') : t(st); var cls = i < idx || accepted && i <= idx ? 'done' : i === idx ? 'now' : ''; s += '<div class="step ' + cls + '"><span class="n">' + (cls === 'done' ? '✓' : i + 1) + '</span><div><div class="t">' + esc(lbl) + '</div>' + (hist[st] ? '<div class="s">' + esc(F.date(HQ.isoDate(hist[st]), 'long')) + '</div>' : '') + '</div></div>'; });
    s += '</div></div>';
    /* next step */
    s += '<div class="card accent"><div class="card-head"><h3>' + esc(t('nextStep')) + '</h3></div>';
    if (a.interviewAt && HQ.isoDate(a.interviewAt) >= Dx.today()) s += '<p class="b" style="color:var(--fg)">' + esc(t('videoInterview', { n: mgr ? mgr.first : '' })) + '</p><p class="small muted">' + esc(F.date(HQ.isoDate(a.interviewAt), 'long')) + ' · ' + F.time2(a.interviewAt, 'America/Tegucigalpa') + '</p><div style="margin-top:10px">' + h.btn(ico('check', 18) + esc(t('confirm')), 'toast', 'btn-gold btn-sm', { msg: t('prototypeOnly') }) + '</div>';
    else if (a.stage === 'draft') s += '<p class="small">' + esc(L(a.nextStep)) + '</p><div style="margin-top:10px">' + h.go(esc(t('continueApp')), 'tests', {}, 'btn-gold btn-sm') + '</div>';
    else s += '<p class="small">' + esc(L(a.nextStep)) + '</p><p class="tiny muted" style="margin-top:6px">' + esc(t('nothingToDo')) + '</p>';
    s += '</div>';
    /* tests, never scored */
    var sc = a.scores || {}; var tRow = function (lbl, state, kind) { return h.li({ lead: '<span class="hash">' + ico('steps', 18) + '</span>', title: esc(lbl), trail: h.chip(state, kind, true), go: 'tests', params: {} }); };
    s += '<div class="card"><div class="card-head"><h3>' + esc(t('yourTests')) + '</h3>' + h.go(esc(t('tests')), 'tests', {}, 'btn-ghost btn-sm') + '</div><div class="list">' + tRow(t('typingTest'), sc.typingWpm != null ? t('submitted') : t('pending'), sc.typingWpm != null ? 'good' : 'warn') + tRow(t('writtenEnglish'), sc.writtenEnglish != null ? t('submitted') : t('pending'), sc.writtenEnglish != null ? 'good' : 'warn') + tRow(t('mockCall'), sc.mockCall != null ? t('done') : a.interviewAt ? t('scheduled') : t('toSchedule'), sc.mockCall != null ? 'good' : a.interviewAt ? 'blue' : 'warn') + '</div></div>';
    /* what to prepare (document names from the onboarding task definitions) */
    s += '<div class="card"><div class="card-head"><h3>' + esc(t('whatToPrepare')) + '</h3></div><ul class="small" style="margin:0;padding-left:18px">' + (D.onboardingTaskDefs || []).slice(0, 5).map(function (d) { return '<li>' + esc(L(d.title)) + '</li>'; }).join('') + '</ul><p class="tiny muted" style="margin-top:8px">' + esc(t('prepareNote')) + '</p></div>';
    /* how it works */
    s += '<div class="card"><div class="card-head"><h3>' + esc(t('howItWorks')) + '</h3></div><p class="small">' + esc(t('howLine', { m: (D.academyModules || []).length, a: D.rates.paydays[0], b: D.rates.paydays[1] })) + '</p></div>';
    /* academy: locked until accepted */
    var pg = (D.academyProgress || {})[v.id] || {};
    s += '<div class="card" style="' + (accepted ? '' : 'opacity:.7') + '"><div class="card-head"><h3>' + (accepted ? '' : ico('lock') + ' ') + esc(t('academy')) + '</h3>' + (accepted ? h.go(esc(t('open')), 'academy', {}, 'btn-ghost btn-sm') : h.chip(t('unlocksWhenAccepted'), 'gold')) + '</div><div class="list">';
    (D.academyModules || []).forEach(function (m) { var ls = (D.academyLessons || []).filter(function (l) { return l.moduleId === m.id; }); var dn = ls.filter(function (l) { return pg[l.id] && pg[l.id].done; }).length; s += h.li({ lead: '<span class="hash">' + m.order + '</span>', title: esc(L(m.title)), sub: accepted ? dn + '/' + ls.length + ' ' + esc(t('lessons')) : '', go: accepted ? 'academy' : null, params: accepted ? { id: m.id } : {} }); });
    s += '</div></div>';
    return { title: t('steps'), sub: esc(v.name), body: s };
  }

  /* ---------- actions (manager inbox) ---------- */
  Object.assign(HQ.act, {
    /* Posponer: hides the row for this session (the real app would snooze it until tomorrow). */
    'inbox-snooze': function (el) { snoozed[el.dataset.key] = true; HQ.toast(t('snoozed')); HQ.render(); },
    /* Recordar: a prefilled Spanish DM from the manager to the VA, posted into their direct-message channel (created if they have none), then opens it. */
    'inbox-remind': function (el) {
      var me = HQ.me(), va = Dx.person(el.dataset.va), pl = Dx.placement(el.dataset.pl); if (!va || !pl) return;
      var cl = Dx.client(pl.clientId) || {}; var dm = dmWith(me.id, va.id);
      if (!dm) { dm = { id: newId('dm'), kind: 'dm', members: [me.id, va.id] }; D.channels.push(dm); }
      D.messages.push({ id: newId('msg'), channelId: dm.id, authorId: me.id, at: nowIso(), kind: 'text', lang: 'es', text: HQ.T.remindText.es.replace('{n}', va.first).replace('{d}', F.date(el.dataset.date, 'long')).replace('{c}', cl.name || '') });
      Dx.markRead(dm.id, me); HQ.toast(t('reminderSent', { n: va.first })); HQ.go('channel', { id: dm.id });
    },
    /* Día libre: records an approved unavailable day for that date (so no report is expected) and clears the row. */
    'inbox-dayoff': function (el) {
      var me = HQ.me(), va = Dx.person(el.dataset.va); if (!va) return;
      D.unavailableDays = D.unavailableDays || [];
      D.unavailableDays.push({ id: newId('ud'), vaId: va.id, date: el.dataset.date, declaredOn: Dx.today(), businessDaysNotice: 0, status: 'approved', approvedBy: me.id, approvedOn: Dx.today(), reason: { en: HQ.T.dayOffReason.en, es: HQ.T.dayOffReason.es } });
      snoozed[el.dataset.key] = true; HQ.toast(t('dayOffMarked', { n: va.first })); HQ.render();
    }
  });

  /* ---------- dispatcher ---------- */
  HQ.V.home = function () {
    var v = ME(); if (!v) return { title: t('home'), body: h.empty(t('nothingHere'), '') };
    if (v.role === 'owner') return ownerHome(v);
    if (v.role === 'manager') return HQ.V.inbox();
    if (v.role === 'va') return vaHome(v);
    if (v.role === 'client') return clientHome(v);
    return applicantHome(v);
  };
})();
