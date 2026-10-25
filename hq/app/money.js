/* BeyondVAs HQ prototype: money. Owner hub, blocks and invoices, invoice detail, payout runs and VA statements,
   owner reports, role-aware settings. Every amount goes through HQ.h.money so visibility follows the role rules:
   bill (owner, client), pay (owner, manager, the VA's own lines), margin (owner only). */
(function () {
  var HQ = window.HQ, D = window.HQD, Dx = HQ.D, h = HQ.h, t = HQ.t, L = HQ.L, esc = HQ.esc, F = HQ.fmt, I = HQ.I, S = HQ.S;
  var isPhone = function () { return HQ.isPhone ? HQ.isPhone() : window.innerWidth <= 900; };
  var M = { client: 'all' };   /* module state: owner billing filter */

  Object.assign(HQ.T, {
    cashThisMonth: { en: 'Cash collected this month', es: 'Cobrado este mes' },
    openInvoices: { en: 'Open invoices', es: 'Facturas abiertas' }, failedInvoices: { en: 'Failed invoices', es: 'Facturas fallidas' },
    nextPayout: { en: 'Next payout run', es: 'Próxima corrida de pagos' }, marginThisMonth: { en: 'Margin this month', es: 'Margen este mes' },
    approvedWeeksOnly: { en: 'Approved weeks only · {n} weeks still waiting for approval', es: 'Solo semanas aprobadas · {n} semanas siguen pendientes de aprobación' },
    needsYou: { en: 'Needs you', es: 'Pendientes' }, retryCharge: { en: 'Retry charge', es: 'Reintentar cobro' }, openStripe: { en: 'Open in Stripe', es: 'Abrir en Stripe' },
    payNow: { en: 'Pay now', es: 'Pagar ahora' }, updateCard: { en: 'Update card', es: 'Actualizar tarjeta' }, downloadPdf: { en: 'Download PDF', es: 'Descargar PDF' },
    exportWire: { en: 'Export wire file', es: 'Exportar archivo de transferencia' }, payoneerExport: { en: 'Payoneer export', es: 'Exportar a Payoneer' },
    markReleased: { en: 'Mark released', es: 'Marcar como pagada' }, released: { en: 'Payout run marked as released', es: 'Corrida marcada como pagada' },
    chargeRetried: { en: 'Charge retried and paid (prototype)', es: 'Cobro reintentado y pagado (prototipo)' }, invoiceReceived: { en: 'Invoice received. Thank you!', es: 'Factura recibida. ¡Gracias!' },
    blocksAndInvoices: { en: 'Blocks and invoices', es: 'Bloques y facturas' }, pastBlocks: { en: 'Past blocks', es: 'Bloques anteriores' },
    invoicedOn: { en: 'Invoiced', es: 'Facturado el' }, dueBefore: { en: 'due before', es: 'vence antes del' }, paidOnDate: { en: 'Paid', es: 'Pagado el' },
    failedOnDate: { en: 'Failed', es: 'Falló el' }, hoursUsed: { en: 'Hours used', es: 'Horas usadas' }, awaitingPayment: { en: 'Awaiting payment', es: 'Pendiente de pago' },
    paidM: { en: 'Paid', es: 'Pagado' }, currentLbl: { en: 'Current', es: 'Actual' }, upcoming: { en: 'Upcoming', es: 'Próximo' }, scheduledRun: { en: 'Scheduled', es: 'Programada' },
    trueUpRule: { en: 'Approved minus scheduled hours becomes a credit or a debit on the next block, never a refund.', es: 'Las horas aprobadas menos las programadas se vuelven crédito o cargo en el siguiente bloque, nunca un reembolso.' },
    pendingTrueUp: { en: 'Pending true-ups (next invoice)', es: 'Ajustes pendientes (próxima factura)' }, trueUpsApplied: { en: 'True-ups on this invoice', es: 'Ajustes en esta factura' },
    overSchedule: { en: 'over schedule', es: 'por encima de lo programado' }, underSchedule: { en: 'under schedule', es: 'por debajo de lo programado' },
    billingEmail: { en: 'Billing email', es: 'Correo de facturación' }, noticeNote: { en: 'Two-week notice to cancel ({n} days).', es: 'Aviso de dos semanas para cancelar ({n} días).' },
    blockFormula: { en: 'scheduled hours × bill rate', es: 'horas programadas × tarifa' }, cardOnFile: { en: 'Card on file', es: 'Tarjeta registrada' },
    teamLogins: { en: 'Team logins', es: 'Accesos del equipo' }, inviteLogin: { en: 'Invite by email', es: 'Invitar por correo' },
    previewDigest: { en: 'Preview digest email', es: 'Vista previa del resumen por correo' }, period: { en: 'Period', es: 'Periodo' },
    approvedH: { en: 'Approved h', es: 'H aprobadas' }, heldHours: { en: 'Held hours', es: 'Horas retenidas' }, method: { en: 'Method', es: 'Método' },
    noStatements: { en: 'No statements yet', es: 'Aún no hay estados de cuenta' }, statementsStart: { en: 'Statements start with your first placement.', es: 'Los estados de cuenta empiezan con tu primera colocación.' },
    estimateNote: { en: 'Estimate: held hours plus tracked and scheduled hours to the end of the period. The final amount uses approved hours only.', es: 'Estimado: horas retenidas más horas registradas y programadas hasta el fin del periodo. El monto final usa solo horas aprobadas.' },
    myStatements: { en: 'My statements', es: 'Mis estados de cuenta' }, ownerOnly: { en: 'Only the owner sees this screen.', es: 'Solo el propietario ve esta pantalla.' },
    billingOwnerClient: { en: 'Billing is for the owner and client logins. Payouts and pay rates are in Payouts.', es: 'La facturación es para el propietario y los accesos de clientes. Los pagos y tarifas de VA están en Pagos.' },
    notForClients: { en: 'Payouts are internal. Your blocks and invoices are in Billing.', es: 'Los pagos son internos. Tus bloques y facturas están en Facturación.' },
    notForApplicants: { en: 'This opens once you are accepted.', es: 'Esto se abre cuando seas aceptada o aceptado.' },
    marginNote: { en: 'Margin = (bill rate − pay rate) × approved hours. Computed on the fly, never stored.', es: 'Margen = (tarifa al cliente − tarifa del VA) × horas aprobadas. Se calcula al momento, nunca se guarda.' },
    revenue: { en: 'Revenue', es: 'Ingreso' }, cost: { en: 'Cost', es: 'Costo' }, monthEst: { en: 'Month est.', es: 'Est. mensual' }, churn: { en: 'Churn', es: 'Rotación' },
    churnNote: { en: '{n} of {m} seats replaced under the fit guarantee; the seat kept its start date and guarantee windows.', es: '{n} de {m} puestos reemplazados bajo la garantía de ajuste; el puesto conservó su fecha de inicio y sus ventanas de garantía.' },
    funnel: { en: 'Pipeline funnel', es: 'Embudo de reclutamiento' }, capacity: { en: 'Capacity', es: 'Capacidad' }, capacityNote: { en: 'bench × 40 h a week', es: 'banca × 40 h por semana' },
    exportCsv: { en: 'Export CSV', es: 'Exportar CSV' }, cashThisMonthShort: { en: 'Cash this month', es: 'Efectivo este mes' },
    stageActive: { en: 'Active', es: 'Activo' }, stagePlaced: { en: 'Placed', es: 'Colocado' }, applicants: { en: 'applicants', es: 'candidatos' },
    tierRates: { en: 'Tiers and bill rates', es: 'Niveles y tarifas al cliente' }, payBand: { en: 'Pay band', es: 'Banda de pago' }, blockLength: { en: 'Block length', es: 'Duración del bloque' },
    weeksPrepaid: { en: '{n} weeks, prepaid', es: '{n} semanas, prepagado' }, paydays: { en: 'Paydays', es: 'Días de pago' }, paydaysVal: { en: '5th and 20th of the month', es: '5 y 20 de cada mes' },
    holidaySetsInUse: { en: 'Holiday sets in use', es: 'Calendarios de feriados en uso' }, datesSeeded: { en: '{n} dates loaded', es: '{n} fechas cargadas' }, notLoaded: { en: 'not loaded yet', es: 'aún sin cargar' },
    templates: { en: 'Notification templates', es: 'Plantillas de notificación' },
    tplReminder: { en: 'Missing report reminder (7 PM client time)', es: 'Recordatorio de reporte faltante (7 PM hora del cliente)' },
    tplAck: { en: 'Escalation acknowledgment (1 business day)', es: 'Acuse de escalación (1 día hábil)' },
    tplDigest: { en: 'Client email digest (30 minutes unread)', es: 'Resumen por correo al cliente (30 minutos sin leer)' },
    tplStatement: { en: 'Payday statement ready', es: 'Estado de cuenta listo' }, tplApproved: { en: 'Week approved', es: 'Semana aprobada' },
    tplBlock: { en: 'Block paid or failed', es: 'Bloque pagado o fallido' }, tplPause: { en: 'Placement paused for an unpaid block', es: 'Colocación pausada por bloque sin pagar' },
    tplCheckpoint: { en: 'Checkpoint due', es: 'Punto de control por vencer' }, edit: { en: 'Edit', es: 'Editar' },
    mfa: { en: 'Two-step sign-in (MFA)', es: 'Verificación en dos pasos (MFA)' }, mfaNote: { en: 'Required for the owner and managers. Not in the prototype.', es: 'Obligatoria para propietario y gerentes. No está en el prototipo.' },
    signOut: { en: 'Sign out', es: 'Cerrar sesión' }, pushNotifs: { en: 'Push notifications', es: 'Notificaciones push' }, availabilityWindow: { en: 'Availability window', es: 'Ventana de disponibilidad' },
    nReportMissing: { en: 'Missing report at 7 PM', es: 'Reporte faltante a las 7 PM' }, nMentions: { en: 'Mentions and direct messages', es: 'Menciones y mensajes directos' },
    nPayday: { en: 'Payday statements', es: 'Estados de cuenta' }, nInbox: { en: 'Inbox: approvals, missing reports, escalations', es: 'Bandeja: aprobaciones, reportes faltantes, escalaciones' },
    nDigest: { en: 'Email digest after 30 minutes', es: 'Resumen por correo a los 30 minutos' }, nBlock: { en: 'Block paid or failed', es: 'Bloque pagado o fallido' },
    recentChanges: { en: 'Recent money changes', es: 'Cambios recientes de dinero' }, referrals: { en: 'Referrals', es: 'Referidos' },
    referrer: { en: 'Referrer', es: 'Referente' }, notYourInvoice: { en: 'This invoice belongs to another account.', es: 'Esta factura pertenece a otra cuenta.' }, yourReferral: { en: 'Your referral credit', es: 'Tu crédito por referido' },
    noBlocks: { en: 'No blocks yet', es: 'Aún no hay bloques' }, onFirstInvoice: { en: 'on the first invoice', es: 'en la primera factura' },
    pausesIfUnpaid: { en: '{va} pauses on {date} if unpaid.', es: '{va} se pausa el {date} si no se paga.' }, weekOf: { en: 'Week of', es: 'Semana del' },
    viewStatement: { en: 'View statement', es: 'Ver estado de cuenta' }, nVAs: { en: '{n} VAs', es: '{n} VAs' }, readOnlyRun: { en: 'Read-only for managers. The owner releases the run.', es: 'Solo lectura para gerentes. El propietario libera la corrida.' },
    weeksPending: { en: 'weeks awaiting approval · true-ups and payouts wait on them', es: 'semanas pendientes de aprobación · los ajustes y pagos esperan' },
    invoicesMissing: { en: 'VA invoices not uploaded for the {date} run', es: 'facturas de VA sin subir para la corrida del {date}' },
    messageClient: { en: 'Message {name}', es: 'Escribir a {name}' }, firstInvoice: { en: 'First invoice', es: 'Primera factura' }, lines: { en: 'Lines', es: 'Líneas' },
    qty: { en: 'Qty', es: 'Cant.' }, description: { en: 'Description', es: 'Descripción' }, issued: { en: 'Issued', es: 'Emitida' }, trackedH: { en: 'Tracked h', es: 'H registradas' },
    estimateTotal: { en: 'estimated total', es: 'total estimado' }, billed: { en: 'Billed', es: 'Facturado' }, auditNote: { en: 'Rates, placements, payouts and hours edits are logged.', es: 'Tarifas, colocaciones, pagos y ediciones de horas quedan registrados.' },
    credited: { en: 'Credited', es: 'Acreditado' }
  });

  /* ---------- helpers ---------- */
  function role() { return HQ.role(); }
  function invoices() { return D.invoices || []; }
  function blocks() { return D.blocks || []; }
  function runs() { return (D.payoutRuns || []).slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; }); }
  function inv(id) { return invoices().filter(function (x) { return x.id === id; })[0] || null; }
  function blk(id) { return blocks().filter(function (x) { return x.id === id; })[0] || null; }
  function month(iso) { return (iso || '').slice(0, 7); }
  function hrs(x) { return F.hdec(x || 0) + ' ' + t('hoursShort'); }
  function lnk(label, screen, id) { return '<a href="#" data-go="' + esc(screen) + '" data-id="' + esc(id) + '">' + label + '</a>'; }
  function range(a, b) {
    if (!a || !b) return F.date(a || b);
    var es = HQ.lang() === 'es', da = +a.slice(8, 10), db = +b.slice(8, 10);
    if (a.slice(0, 7) === b.slice(0, 7)) return es ? da + '–' + F.date(b) : F.date(a) + '–' + db;
    return F.date(a) + ' – ' + F.date(b);
  }
  function clientBlocks(cid) { return blocks().filter(function (b) { return b.clientId === cid; }).sort(function (a, b) { return a.start < b.start ? 1 : -1; }); }
  function vasOfBlock(b) { return (b.placementIds || []).map(function (id) { var pl = Dx.placement(id); return pl ? Dx.person(pl.vaId) : null; }).filter(Boolean); }
  function vaLine(b) { var pls = (b.placementIds || []).map(Dx.placement).filter(Boolean); return pls.map(function (pl) { var va = Dx.person(pl.vaId); return (va ? Dx.vaLabel(va) : '') + ' · ' + Dx.tierShort(pl.tier); }).join(', '); }
  function blockChip(b) { var m = { paid: ['good', t('paidM')], current: ['blue', t('currentLbl')], upcoming: ['blue', t('upcoming')], open: ['warn', t('awaitingPayment')], failed: ['bad', t('failed')] }; var x = m[b.status] || ['', b.status]; return h.chip(x[1], x[0], true); }
  function invChip(i) { return i.status === 'paid' ? h.chip(t('paid'), 'good', true) : i.status === 'failed' ? h.chip(t('failed'), 'bad', true) : h.chip(t('awaitingPayment'), 'warn', true); }
  /* the paid date lives on the invoice (seed blocks only carry paid: true); a retried charge stamps both */
  function paidOnOf(b, i) { return (i && i.paidOn) || (b && b.paidOn) || null; }
  /* net true-up on an invoice: positive = credit to the client, negative = debit */
  function trueUpTxt(i) { return esc(t('trueUp')) + ': <span class="muted">' + esc(i.trueUp > 0 ? t('credit') : t('debit')) + '</span> ' + h.money('bill', Math.abs(i.trueUp)); }
  function runChip(r) { return r.status === 'paid' ? h.chip(t('paid'), 'good', true) : h.chip(t('scheduledRun'), 'blue', true); }
  function approvalsIn(placementId, from, to) { return (D.weekApprovals || []).filter(function (w) { return w.placementId === placementId && w.weekStart >= from && w.weekStart <= to; }); }
  /* hours inside a block: approved (locked weeks), tracked (every entry in the block), pending = tracked − approved */
  function blockHours(b) {
    var ids = b.placementIds || []; var approved = 0, tracked = 0;
    ids.forEach(function (id) { approvalsIn(id, b.start, b.end).forEach(function (w) { if (w.status === 'approved') approved += w.approvedHours || 0; }); });
    (D.timeEntries || []).forEach(function (e) { if (ids.indexOf(e.placementId) >= 0 && e.date >= b.start && e.date <= b.end) tracked += (e.minutes || 0) / 60; });
    return { approved: approved, tracked: tracked, pending: Math.max(0, tracked - approved) };
  }
  function pendingWeeks() { return (D.weekApprovals || []).filter(function (w) { return w.status === 'pending'; }); }
  function trueUpsFor(invId) { return (D.trueUps || []).filter(function (x) { return x.appliedToInvoice === invId; }); }
  function pendingTrueUps(cid) { return (D.trueUps || []).filter(function (x) { return !x.appliedToInvoice && (!cid || x.clientId === cid); }); }
  function trueUpRow(x) {
    var pl = Dx.placement(x.placementId), va = pl ? Dx.person(pl.vaId) : null; var over = x.deltaHours >= 0;
    return h.li({ title: esc(t('weekOf')) + ' ' + esc(F.date(x.weekStart)) + (va ? ' · ' + esc(Dx.vaLabel(va)) : ''), sub: hrs(x.approvedHours) + ' ' + esc(t('approvedHours')) + ' · ' + hrs(x.scheduledHours) + ' ' + esc(t('scheduled').toLowerCase()) + ' · ' + hrs(Math.abs(x.deltaHours)) + ' ' + esc(over ? t('overSchedule') : t('underSchedule')), trail: h.money('bill', Math.abs(x.amount || 0)) + ' <span class="muted">' + esc(over ? t('debit') : t('credit')) + '</span>' });
  }
  function runById(id) { return runs().filter(function (r) { return r.id === id || r.date === id; })[0] || null; }
  function findLine(id) { var out = null; runs().forEach(function (r) { r.lines.forEach(function (l) { if (l.statementId === id || l.id === id) out = { run: r, line: l }; }); }); return out; }
  function canSeeLine(line) { var m = HQ.me(); return m.role === 'owner' || m.role === 'manager' || (m.role === 'va' && line.vaId === m.id); }
  function marginThisMonth() {
    var mo = month(Dx.today()); var total = 0;
    Dx.activePlacements().forEach(function (pl) { (D.weekApprovals || []).forEach(function (w) { if (w.placementId === pl.id && w.status === 'approved' && month(w.weekStart) === mo) total += (pl.billRate - pl.payRate) * (w.approvedHours || 0); }); });
    return total;
  }
  function plLabel(pl) { var cl = Dx.client(pl.clientId); return esc(cl ? cl.name : '') + ' · ' + esc(Dx.tierShort(pl.tier)); }
  function toggle(label, on) { return '<button class="toggle ' + (on ? 'on' : '') + '" data-act="flip-toggle" style="border:0;background:transparent;padding:6px 0;width:100%;justify-content:space-between;text-align:left"><span>' + esc(label) + '</span><i></i></button>'; }
  function editBtn() { return h.btn(esc(t('edit')), 'toast', 'btn-ghost btn-sm', { msg: t('prototypeOnly') }); }
  function toastBtn(label, kind) { return h.btn(label, 'toast', kind || 'btn-ghost btn-sm', { msg: t('prototypeOnly') }); }
  function gate(title, sub) { return { title: title, body: h.empty(t('nothingHere'), sub) }; }
  function failedCard(i, viewer) {
    var b = blk(i.blockId), cl = Dx.client(i.clientId), va = b ? vasOfBlock(b)[0] : null;
    var s = '<div class="card alert"><div class="card-head"><h3>' + (viewer.role === 'owner' ? esc(cl ? cl.name : '') + ' · ' : '') + esc(i.number) + '</h3>' + invChip(i) + '</div>';
    s += '<div class="row wrap" style="gap:14px;margin-bottom:8px"><span class="money">' + h.money('bill', i.amount) + '</span><span class="small muted">' + (b ? esc(t('block')) + ' ' + esc(range(b.start, b.end)) + ' · ' : '') + esc(t('failedOnDate')) + ' ' + esc(F.date(i.failedOn)) + (i.retryOn ? ' · ' + esc(t('retryOn')) + ' ' + esc(F.date(i.retryOn)) : '') + '</span></div>';
    if (i.failReason) s += '<p class="small" style="margin-bottom:8px">' + esc(L(i.failReason)) + '</p>';
    s += h.note(esc(t('pauseWarning')) + (va && b ? ' ' + esc(t('pausesIfUnpaid', { va: Dx.vaLabel(va), date: F.date(b.start) })) : ''), 'warn');
    s += '<div class="row wrap" style="gap:8px;margin-top:12px">';
    if (viewer.role === 'owner') s += h.btn(esc(t('retryCharge')), 'retry-charge', 'btn-gold btn-sm', { id: i.id }) + toastBtn(esc(t('openStripe'))) + (cl && cl.channelId ? h.go(esc(t('messageClient', { name: (Dx.person(cl.contactId) || {}).first || cl.name })), 'channel', { id: cl.channelId }, 'btn-ghost btn-sm') : '');
    else s += h.btn(esc(t('payNow')), 'retry-charge', 'btn-gold btn-sm', { id: i.id }) + toastBtn(esc(t('updateCard')));
    s += h.go(esc(t('invoice')), 'invoice', { id: i.id }, 'btn-ghost btn-sm') + '</div></div>';
    return s;
  }
  function sideHtml() {
    if (isPhone() || role() !== 'owner') return null;
    var s = '<div class="side-head"><h2>' + esc(t('money')) + '</h2></div><div class="side-body"><div class="sgroup">' + esc(t('blocks')) + '</div>';
    s += '<button class="srow ' + (M.client === 'all' && S.screen === 'billing' ? 'active' : '') + '" data-act="bill-filter" data-v="all"><span class="hash">$</span><div class="grow"><div class="name">' + esc(t('all')) + '</div></div></button>';
    (D.clients || []).forEach(function (c) {
      var nxt = clientBlocks(c.id).filter(function (b) { return b.status !== 'paid' && b.status !== 'current'; }).slice(-1)[0] || clientBlocks(c.id)[0];
      s += '<button class="srow ' + (M.client === c.id && S.screen === 'billing' ? 'active' : '') + '" data-act="bill-filter" data-v="' + c.id + '"><span class="hash">' + esc(c.name.charAt(0)) + '</span><div class="grow"><div class="name">' + esc(c.name) + '</div><div class="prev">' + (nxt ? blockChip(nxt) + ' ' + esc(range(nxt.start, nxt.end)) : '') + '</div></div></button>';
    });
    s += '<div class="sgroup">' + esc(t('more')) + '</div>';
    [['payouts', 'money'], ['reports', 'chart'], ['settings', 'gear'], ['audit', 'doc']].forEach(function (x) { s += '<button class="srow ' + (S.screen === x[0] ? 'active' : '') + '" data-go="' + x[0] + '"><span class="hash">' + I[x[1]].replace('<svg', '<svg width="18" height="18" style="fill:none;stroke:currentColor;stroke-width:1.8"') + '</span><div class="grow"><div class="name">' + esc(t(x[0])) + '</div></div></button>'; });
    return s + '</div>';
  }
  function auditPane() {
    var rows = (D.auditLog || []).filter(function (a) { return /^(rate|invoice|payout)\./.test(a.action); }).sort(function (a, b) { return a.at < b.at ? 1 : -1; });
    var s = '<h3>' + esc(t('recentChanges')) + '</h3><div class="list">';
    if (!rows.length) s += h.empty(t('nothingHere'));
    rows.forEach(function (a) { var by = Dx.person(a.by); s += h.li({ title: esc(F.date(HQ.isoDate(a.at), 'long')) + ' · ' + esc(by ? by.first : a.by), sub: esc(L(a.detail)) }); });
    return s + '</div><div style="margin-top:10px">' + h.go(esc(t('auditLog')), 'audit', {}, 'btn-ghost btn-sm') + '</div>';
  }

  /* ---------- Money hub (owner) ---------- */
  HQ.V.money = function (p) {
    var r = role();
    if (r === 'client') return HQ.V.billing(p);
    if (r === 'va' || r === 'manager') return HQ.V.payouts(p);
    if (r !== 'owner') return gate(t('money'), t('notForApplicants'));
    var mo = month(Dx.today());
    var paid = invoices().filter(function (i) { return i.status === 'paid' && month(i.paidOn) === mo; });
    var open = invoices().filter(function (i) { return i.status === 'open'; }), failed = invoices().filter(function (i) { return i.status === 'failed'; });
    var sum = function (xs) { return xs.reduce(function (n, i) { return n + (i.amount || 0); }, 0); };
    var next = runs().filter(function (x) { return x.status === 'scheduled'; }).slice(-1)[0];
    var pend = pendingWeeks();
    var s = '<div class="kpis" style="margin-bottom:14px">' + h.kpi(h.money('bill', sum(paid)), t('cashThisMonth'), 'good') + h.kpi(h.money('bill', sum(open)), t('openInvoices') + ' · ' + open.length) + h.kpi(h.money('bill', sum(failed)), t('failedInvoices') + ' · ' + failed.length, failed.length ? 'bad' : '') + h.kpi(h.money('margin', marginThisMonth()), t('marginThisMonth'), 'gold') + '</div>';
    s += '<p class="small muted" style="margin:-6px 0 14px">' + esc(t('approvedWeeksOnly', { n: pend.length })) + '</p>';

    /* needs you */
    s += h.sec(t('needsYou'));
    var ny = '';
    failed.forEach(function (i) { ny += failedCard(i, HQ.me()); });
    var rows = '';
    if (pend.length) rows += h.li({ lead: '<span class="hash">' + I.hours.replace('<svg', '<svg width="18" height="18" style="fill:none;stroke:currentColor;stroke-width:1.8"') + '</span>', title: pend.length + ' ' + esc(t('weeksPending')), sub: esc(pend.map(function (w) { var pl = Dx.placement(w.placementId); var va = pl ? Dx.person(pl.vaId) : null; return (va ? va.first : '') + ' · ' + range(w.weekStart, w.weekEnd); }).join(' · ')), go: 'week', params: { id: pend[0].id } });
    var lastPaid = runs().filter(function (x) { return x.status === 'paid'; })[0];
    if (lastPaid) { var miss = lastPaid.lines.filter(function (l) { return !l.invoiceUploaded; }); if (miss.length) rows += h.li({ lead: '<span class="hash">' + I.doc.replace('<svg', '<svg width="18" height="18" style="fill:none;stroke:currentColor;stroke-width:1.8"') + '</span>', title: miss.length + ' ' + esc(t('invoicesMissing', { date: F.date(lastPaid.date) })), sub: esc(miss.map(function (l) { var va = Dx.person(l.vaId); return va ? va.first : ''; }).join(', ')), go: 'payouts', params: { id: lastPaid.id } }); }
    if (rows) ny += '<div class="card flat tight"><div class="list">' + rows + '</div></div>';
    s += ny ? '<div class="stack">' + ny + '</div>' : h.card(h.empty(t('allCaughtUp')), 'flat');

    /* this block */
    var b0 = D.block || {}; var cur = blocks().filter(function (b) { return b.status === 'current'; }); var nxtB = blocks().filter(function (b) { return b.start === (D.nextBlock || {}).start; });
    var billed = sum(cur), cost = 0, margin = 0;
    s += h.sec(t('thisBlock') + ' · ' + range(b0.start, b0.end), lnk(esc(t('marginPerPlacement')), 'reports', '')) + '<div class="card flat tight"><div class="list">';
    cur.forEach(function (b) {
      (b.placementIds || []).forEach(function (pid) {
        var pl = Dx.placement(pid); if (!pl || pl.status !== 'active') return; var va = Dx.person(pl.vaId), cl = Dx.client(pl.clientId);
        var c = b.scheduledHours * pl.payRate, m = b.amount - c; cost += c; margin += m;
        s += h.li({ lead: h.avatar(va, 'sm'), title: esc(va ? va.name : '') + ' <span class="small muted">· ' + esc(cl ? cl.name : '') + '</span>', sub: hrs(b.scheduledHours) + ' × ' + h.money('bill', b.billRate, { rate: true }) + ' · ' + esc(t('payRate').toLowerCase()) + ' ' + h.money('pay', pl.payRate, { rate: true }), trail: h.money('bill', b.amount) + '<br><span class="muted">' + esc(t('margin').toLowerCase()) + ' ' + h.money('margin', m) + '</span>', go: 'placement', params: { id: pl.id } });
      });
    });
    if (!cur.length) s += h.empty(t('noBlocks'));
    s += '</div><div class="kpis" style="margin-top:10px">' + h.kpi(h.money('bill', billed), t('billed')) + h.kpi(h.money('pay', cost), t('cost')) + h.kpi(h.money('margin', margin), t('margin') + (billed ? ' · ' + F.pct(margin / billed * 100) : ''), 'gold') + '</div>';
    var nxtPaid = nxtB.filter(function (b) { return b.status === 'upcoming' || b.status === 'paid'; }).length;
    s += '<p class="small muted" style="margin-top:10px">' + esc(t('nextBlock')) + ' ' + esc(range((D.nextBlock || {}).start, (D.nextBlock || {}).end)) + ' · ' + esc(t('invoicedOn').toLowerCase()) + ' ' + esc(F.date((D.nextBlock || {}).invoicedOn)) + ' · ' + nxtPaid + ' / ' + nxtB.length + ' ' + esc(t('paidM').toLowerCase()) + (next ? ' · ' + esc(t('nextPayout').toLowerCase()) + ' ' + esc(F.date(next.date)) : '') + '</p></div>';

    /* next payout */
    if (next) s += h.sec(t('nextPayout')) + '<div class="card flat tight">' + h.li({ lead: '<span class="hash">' + I.money.replace('<svg', '<svg width="18" height="18" style="fill:none;stroke:currentColor;stroke-width:1.8"') + '</span>', title: esc(F.date(next.date, 'long')) + ' · ' + esc(t('nVAs', { n: next.lines.length })), sub: esc(t('period')) + ' ' + esc(range(next.periodStart, next.periodEnd)) + ' · ' + esc(t('estimated')), trail: h.money('pay', next.totalAmount), go: 'payouts', params: { id: next.id } }) + '</div>';

    s += h.sec(t('more')) + '<div class="card flat tight"><div class="list">';
    [['billing', 'money'], ['payouts', 'money'], ['reports', 'chart'], ['settings', 'gear'], ['audit', 'doc']].forEach(function (x) { s += h.li({ lead: '<span class="hash">' + I[x[1]].replace('<svg', '<svg width="18" height="18" style="fill:none;stroke:currentColor;stroke-width:1.8"') + '</span>', title: esc(t(x[0])), go: x[0] }); });
    s += '</div></div>';
    /* the audit summary goes under the body: a sidebar plus a right pane would squeeze the main column */
    return { title: t('money'), sub: esc(F.date(Dx.today(), 'full')), body: s + '<div class="card flat tight" style="margin-top:16px">' + auditPane() + '</div>', side: sideHtml() };
  };

  /* ---------- Billing: owner (all clients) and client (own blocks) ---------- */
  HQ.V.billing = function (p) {
    var viewer = HQ.me(), r = viewer.role;
    if (r === 'client') return clientBilling(viewer);
    if (r !== 'owner') return gate(t('billing'), r === 'applicant' ? t('notForApplicants') : t('billingOwnerClient'));
    var want = p && (p.client || p.id); if (want && (want === 'all' || Dx.client(want))) M.client = want;
    var opts = [{ v: 'all', l: t('all') }].concat((D.clients || []).map(function (c) { return { v: c.id, l: c.name.split(' ').slice(0, 2).join(' ') }; }));
    var s = h.seg(opts, M.client, 'bill-filter') + '<div style="height:12px"></div>';
    var list = blocks().filter(function (b) { return M.client === 'all' || b.clientId === M.client; }).sort(function (a, b) { return a.start < b.start ? 1 : -1; });
    var cur = list.filter(function (b) { return b.status === 'current'; }), failed = invoices().filter(function (i) { return i.status === 'failed' && (M.client === 'all' || i.clientId === M.client); });
    s += '<div class="kpis" style="margin-bottom:14px">' + h.kpi(h.money('bill', cur.reduce(function (n, b) { return n + b.amount; }, 0)), t('thisBlock') + ' · ' + range((D.block || {}).start, (D.block || {}).end)) + h.kpi(list.filter(function (b) { return b.status === 'upcoming'; }).length + ' / ' + list.filter(function (b) { return b.start === (D.nextBlock || {}).start; }).length, t('nextBlock') + ' ' + t('paidM').toLowerCase()) + h.kpi(failed.length, t('failedInvoices'), failed.length ? 'bad' : '') + '</div>';
    failed.forEach(function (i) { s += failedCard(i, viewer) + '<div style="height:12px"></div>'; });
    s += h.sec(t('blocksAndInvoices'));
    if (!list.length) s += h.empty(t('noBlocks'));
    else s += h.table([{ l: t('client_') }, { l: t('block') }, { l: t('hours') }, { l: t('amount'), num: true }, { l: t('status') }, { l: t('invoice') }], list.map(function (b) {
      var cl = Dx.client(b.clientId), i = inv(b.invoiceId);
      var po = paidOnOf(b, i);
      return [esc(cl ? cl.name : '') + '<span class="sub">' + esc(vaLine(b)) + '</span>', esc(range(b.start, b.end)), hrs(b.scheduledHours) + '<span class="sub">× ' + h.money('bill', b.billRate, { rate: true }) + '</span>', h.money('bill', b.amount), blockChip(b) + (po ? '<span class="sub">' + esc(t('paidOnDate')) + ' ' + esc(F.date(po)) + '</span>' : i && i.retryOn ? '<span class="sub">' + esc(t('retryOn')) + ' ' + esc(F.date(i.retryOn)) + '</span>' : ''), i ? lnk(esc(i.number), 'invoice', i.id) + (i.trueUp ? '<span class="sub">' + trueUpTxt(i) + '</span>' : '') : '—'];
    }));
    var pt = pendingTrueUps(M.client === 'all' ? null : M.client);
    if (pt.length) { s += h.sec(t('pendingTrueUp')) + '<div class="card flat tight"><div class="list">' + pt.map(trueUpRow).join('') + '</div><p class="small muted" style="margin-top:8px">' + esc(t('trueUpRule')) + '</p></div>'; }
    var refs = (D.referrals || []).filter(function (x) { return M.client === 'all' || x.referrerId === M.client || x.referredId === M.client; });
    if (refs.length) { s += h.sec(t('referrals')) + '<div class="card flat tight"><div class="list">' + refs.map(function (x) { var a = HQ.get(x.referrerId), b = HQ.get(x.referredId); return h.li({ title: esc(a ? a.name : x.referrerId) + ' → ' + esc(b ? b.name : x.referredId), sub: esc(L(x.bonusNote)), trail: (x.credit != null ? h.money('bill', x.credit) + ' ' : '') + h.statusChip(x.status) }); }).join('') + '</div></div>'; }
    return { title: t('billing'), sub: esc(t('blockFormula')), body: s, side: sideHtml(), wide: true };
  };

  function clientBilling(viewer) {
    var cl = Dx.client(viewer.clientId); if (!cl) return gate(t('billing'), t('noBlocks'));
    var all = clientBlocks(cl.id); if (!all.length) return gate(t('billing'), t('noBlocks'));
    var cur = all.filter(function (b) { return b.status === 'current'; })[0], nxt = all.filter(function (b) { return b.start > (cur ? cur.end : Dx.today()); }).slice(-1)[0];
    var past = all.filter(function (b) { return b !== cur && b !== nxt && b.start <= Dx.today(); });
    var s = '';
    if (cur) {
      var i = inv(cur.invoiceId), bh = blockHours(cur);
      s += '<div class="card"><div class="card-head"><h3>' + esc(t('thisBlock')) + ' · ' + esc(range(cur.start, cur.end)) + '</h3>' + blockChip(cur) + '</div>';
      s += '<div class="row wrap" style="gap:14px"><span class="money">' + h.money('bill', cur.amount) + '</span><span class="small muted">' + hrs(cur.scheduledHours) + ' × ' + h.money('bill', cur.billRate, { rate: true }) + ' · ' + esc(vaLine(cur)) + '</span></div>';
      var cp = paidOnOf(cur, i);
      s += '<p class="small muted" style="margin:6px 0 10px">' + (i ? esc(t('invoice')) + ' ' + lnk(esc(i.number), 'invoice', i.id) : '') + (cp ? (i ? ' · ' : '') + esc(t('paidOnDate')) + ' ' + esc(F.date(cp)) : '') + '</p>';
      s += '<div class="row between wrap small" style="margin-bottom:4px;gap:4px 12px"><span class="b">' + esc(t('hoursUsed')) + '</span><span class="num">' + hrs(bh.approved) + ' ' + esc(t('approvedHours')) + ' · ' + hrs(bh.pending) + ' ' + esc(t('pendingHours')) + ' · ' + hrs(cur.scheduledHours) + ' ' + esc(t('scheduled').toLowerCase()) + '</span></div>' + h.progress(bh.tracked / cur.scheduledHours * 100, 'good');
      var pt = pendingTrueUps(cl.id);
      s += '<p class="small muted" style="margin-top:10px">' + esc(t('trueUpRule')) + '</p>';
      if (pt.length) s += '<div class="list" style="margin-top:6px">' + pt.map(trueUpRow).join('') + '</div>';
      s += '</div>';
    }
    if (nxt) {
      var ni = inv(nxt.invoiceId);
      if (ni && ni.status === 'failed') s += '<div style="height:12px"></div>' + failedCard(ni, viewer);
      else {
        s += '<div style="height:12px"></div><div class="card"><div class="card-head"><h3>' + esc(t('nextBlock')) + ' · ' + esc(range(nxt.start, nxt.end)) + '</h3>' + blockChip(nxt) + '</div>';
        var np = paidOnOf(nxt, ni);
        s += '<div class="row wrap" style="gap:14px"><span class="money">' + h.money('bill', ni ? ni.amount : nxt.amount) + '</span><span class="small muted">' + hrs(nxt.scheduledHours) + ' × ' + h.money('bill', nxt.billRate, { rate: true }) + (ni && ni.trueUp ? ' · ' + trueUpTxt(ni) : '') + '</span></div>';
        s += '<p class="small muted" style="margin-top:6px">' + (ni ? esc(t('invoicedOn')) + ' ' + esc(F.date(ni.issuedOn)) + ' · ' + esc(t('dueBefore')) + ' ' + esc(F.date(ni.dueOn)) + ' · ' + lnk(esc(ni.number), 'invoice', ni.id) : '') + (np ? (ni ? ' · ' : '') + esc(t('paidOnDate')) + ' ' + esc(F.date(np)) : '') + '</p>';
        s += '<div class="row wrap" style="gap:8px;margin-top:12px">' + (nxt.status === 'open' ? h.btn(esc(t('payNow')), 'retry-charge', 'btn-gold btn-sm', { id: ni ? ni.id : '' }) : '') + toastBtn(esc(t('updateCard'))) + '</div>';
        if (nxt.status === 'open') s += '<div style="margin-top:10px">' + h.note(esc(t('pauseWarning')), 'warn') + '</div>';
        s += '</div>';
      }
    }
    s += h.sec(t('pastBlocks')) + '<div class="card flat tight"><div class="list">';
    if (!past.length) s += h.empty(t('nothingHere'));
    past.forEach(function (b) { var i = inv(b.invoiceId), po = paidOnOf(b, i); s += h.li({ title: esc(range(b.start, b.end)) + ' <span class="small muted">· ' + hrs(b.scheduledHours) + '</span>', sub: (i ? esc(i.number) + ' · ' : '') + (po ? esc(t('paidOnDate')) + ' ' + esc(F.date(po)) : esc(t('awaitingPayment'))) + (i && i.setupFee ? ' · ' + esc(t('setupFee')) + ' ' + h.money('bill', (D.rates || {}).setupFee) : ''), trail: h.money('bill', i ? i.amount : b.amount) + ' ' + blockChip(b), go: 'invoice', params: { id: i ? i.id : '' } }); });
    s += '</div></div>';
    var first = invoices().filter(function (i) { return i.clientId === cl.id && i.setupFee; })[0];
    var refs = (D.referrals || []).filter(function (x) { return x.referrerId === cl.id; });
    s += h.sec(t('billing')) + '<div class="card flat tight"><div class="list">';
    s += h.li({ title: esc(t('setupFee')), sub: esc(t('paidOnDate')) + ' ' + esc(F.date(cl.setupFeePaidOn)) + (first ? ' · ' + esc(t('onFirstInvoice')) + ' ' + lnk(esc(first.number), 'invoice', first.id) : ''), trail: h.money('bill', (D.rates || {}).setupFee) });
    s += h.li({ title: esc(t('billingEmail')), sub: esc(cl.billingEmail), trail: editBtn() });
    s += h.li({ title: esc(t('cardOnFile')), sub: 'Stripe · ' + esc((cl.stripeCustomer || '').replace(/^(.{4}).*(.{4})$/, '$1••••$2')), trail: toastBtn(esc(t('updateCard'))) });
    /* the referred team is another client: never name it on a client screen */
    refs.forEach(function (x) { s += h.li({ title: esc(t('yourReferral')), sub: x.appliedOn ? esc(t('credited')) + ' ' + esc(F.date(x.appliedOn)) : esc(t('pending')), trail: (x.credit != null ? h.money('bill', x.credit) + ' ' : '') + h.statusChip(x.status) }); });
    s += '</div><p class="small muted" style="margin-top:8px">' + esc(t('noticeNote', { n: (D.rates || {}).noticeDays || 14 })) + '</p></div>';
    return { title: t('billing'), sub: esc(cl.name), body: s };
  }

  /* ---------- Invoice detail (owner, the client's own logins) ---------- */
  HQ.V.invoice = function (p) {
    var viewer = HQ.me(), i = inv(p.id);
    if (!i) return gate(t('invoice'), '');
    if (!(viewer.role === 'owner' || (viewer.role === 'client' && i.clientId === viewer.clientId))) return gate(t('invoice'), viewer.role === 'applicant' ? t('notForApplicants') : viewer.role === 'client' ? t('notYourInvoice') : t('billingOwnerClient'));
    var cl = Dx.client(i.clientId), b = blk(i.blockId);
    var s = '<div class="card"><div class="card-head"><h3>' + esc(i.number) + (viewer.role === 'owner' && cl ? ' · ' + esc(cl.name) : '') + '</h3>' + invChip(i) + '</div>';
    s += '<div class="row wrap" style="gap:14px"><span class="money">' + h.money('bill', i.amount) + '</span><span class="small muted">' + (b ? esc(t('block')) + ' ' + esc(range(b.start, b.end)) + ' · ' + esc(vaLine(b)) : '') + '</span></div>';
    s += '<p class="small muted" style="margin-top:6px">' + esc(t('issued')) + ' ' + esc(F.date(i.issuedOn)) + ' · ' + esc(t('due')) + ' ' + esc(F.date(i.dueOn)) + (i.paidOn ? ' · ' + esc(t('paidOnDate')) + ' ' + esc(F.date(i.paidOn)) : '') + (i.failedOn ? ' · ' + esc(t('failedOnDate')) + ' ' + esc(F.date(i.failedOn)) : '') + (i.retryOn ? ' · ' + esc(t('retryOn')) + ' ' + esc(F.date(i.retryOn)) : '') + '</p>';
    if (i.failReason) s += '<div style="margin-top:10px">' + h.note(esc(L(i.failReason)), 'bad') + '</div>';
    s += '</div><div style="height:12px"></div>';
    s += h.table([{ l: t('description') }, { l: t('qty'), num: true }, { l: t('amount'), num: true }], (i.lines || []).map(function (l) {
      var desc = L(l.desc);
      /* a referral-credit line names the referred team, which is another client: a client login sees only the generic label */
      if (viewer.role === 'client' && l.amount < 0 && /referral|referido/i.test(desc)) desc = t('referralCredit');
      return [esc(desc), F.hdec(l.qty), h.money('bill', l.amount)];
    }).concat([{ cells: ['<b>' + esc(t('total')) + '</b>', '', '<b>' + h.money('bill', i.amount) + '</b>'] }]));
    var tus = trueUpsFor(i.id);
    if (tus.length) s += h.sec(t('trueUpsApplied')) + '<div class="card flat tight"><div class="list">' + tus.map(trueUpRow).join('') + '</div><p class="small muted" style="margin-top:8px">' + esc(t('trueUpRule')) + '</p></div>';
    s += '<div class="row wrap" style="gap:8px;margin-top:16px">';
    if (i.status === 'failed') s += h.btn(esc(viewer.role === 'owner' ? t('retryCharge') : t('payNow')), 'retry-charge', 'btn-gold btn-sm', { id: i.id }) + (viewer.role === 'client' ? toastBtn(esc(t('updateCard'))) : '');
    if (viewer.role === 'owner') s += toastBtn(esc(t('openStripe')));
    s += toastBtn(esc(t('downloadPdf'))) + h.go(esc(t('billing')), 'billing', {}, 'btn-ghost btn-sm') + '</div>';
    return { title: t('invoice') + ' ' + esc(i.number), sub: cl ? esc(cl.name) : '', body: s, side: sideHtml() };
  };

  /* ---------- Payouts: runs (owner, manager read-only) and the VA's own statements ---------- */
  HQ.V.payouts = function (p) {
    var viewer = HQ.me(), r = viewer.role;
    if (r === 'client') return gate(t('payouts'), t('notForClients'));
    if (r === 'applicant') return gate(t('payouts'), t('notForApplicants'));
    if (r === 'va') return vaPayouts(viewer);
    var all = runs(); if (!all.length) return gate(t('payouts'), '');
    var run = runById(p.id) || all.filter(function (x) { return x.status === 'paid'; })[0] || all[0];
    var s = h.seg(all.slice().reverse().map(function (x) { return { v: x.id, l: F.date(x.date) + (x.status === 'scheduled' ? ' ·' : '') }; }), run.id, 'pick-run') + '<div style="height:12px"></div>';
    s += '<div class="kpis" style="margin-bottom:14px">' + h.kpi(h.money('pay', run.totalAmount), (run.estimated ? t('estimateTotal') : t('total'))) + h.kpi(run.lines.length, t('vas')) + h.kpi(hrs(run.lines.reduce(function (n, l) { return n + l.hours; }, 0)), t('approvedH')) + h.kpi(run.lines.filter(function (l) { return l.invoiceUploaded; }).length + ' / ' + run.lines.length, t('invoiceUploaded')) + '</div>';
    s += '<div class="row wrap" style="gap:10px;margin-bottom:12px">' + runChip(run) + '<span class="small muted">' + esc(t('period')) + ' ' + esc(range(run.periodStart, run.periodEnd)) + (run.paidOn ? ' · ' + esc(t('paidOnDate')) + ' ' + esc(F.date(run.paidOn)) : '') + '</span></div>';
    if (!run.lines.length) s += h.empty(t('nothingHere'));
    else s += h.table([{ l: t('va_') }, { l: t('placement') }, { l: t('hours'), num: true }, { l: t('rate'), num: true }, { l: t('bonus'), num: true }, { l: t('amount'), num: true }, { l: t('method') }, { l: t('statement') }, { l: t('invoice') }], run.lines.map(function (l) {
      var va = Dx.person(l.vaId), pl = Dx.placement(l.placementId);
      var held = l.pendingHours || l.heldHours;
      return [h.person(va), pl ? lnk(plLabel(pl), 'placement', pl.id) : '—', hrs(l.hours) + (held ? '<span class="sub">' + esc(t('heldHours').toLowerCase()) + ' ' + hrs(held) + '</span>' : ''), h.money('pay', l.rate, { rate: true }), l.bonus ? h.money('pay', l.bonus) : '—', h.money('pay', l.amount), esc(l.rail === 'mercury' ? 'Mercury' : 'Payoneer'), l.statementId ? lnk(esc(t('view')), 'statement', l.statementId) : h.chip(t('estimated'), 'blue'), l.invoiceUploaded ? h.chip(t('invoiceUploaded'), 'good', true) : h.chip(t('pending'), 'warn', true)];
    }));
    var notes = run.lines.filter(function (l) { return l.pendingNote || l.heldNote || l.bonusNote || l.note; });
    if (notes.length) s += '<div class="card flat tight" style="margin-top:12px"><div class="list">' + notes.map(function (l) { var va = Dx.person(l.vaId); return h.li({ lead: h.avatar(va, 'sm'), title: esc(va ? va.first : ''), sub: [l.bonusNote, l.pendingNote, l.heldNote, l.note].filter(Boolean).map(function (n) { return esc(L(n)); }).join('<br>') }); }).join('') + '</div></div>';
    if (run.note) s += '<div style="margin-top:10px">' + h.note(esc(L(run.note))) + '</div>';
    if (run.estimated) s += '<p class="small muted" style="margin-top:10px">' + esc(t('estimateNote')) + '</p>';
    s += '<div class="row wrap" style="gap:8px;margin-top:16px">' + toastBtn(I.doc + esc(t('exportWire')), 'btn-blue btn-sm') + toastBtn(esc(t('payoneerExport'))) + (r === 'owner' && run.status === 'scheduled' ? h.btn(esc(t('markReleased')), 'mark-released', 'btn-gold btn-sm', { id: run.id }) : '') + '</div>';
    if (r === 'manager') s += '<p class="small muted" style="margin-top:8px">' + esc(t('readOnlyRun')) + '</p>';
    return { title: t('payoutRun'), sub: esc(F.date(run.date, 'full')), body: s, side: sideHtml(), wide: true };
  };

  function vaPayouts(viewer) {
    var mine = []; runs().forEach(function (r) { r.lines.forEach(function (l) { if (l.vaId === viewer.id) mine.push({ run: r, line: l }); }); });
    var next = runs().filter(function (x) { return x.status === 'scheduled'; }).slice(-1)[0];
    var nl = next ? mine.filter(function (x) { return x.run === next; })[0] : null;
    var s = '';
    if (next) {
      s += '<div class="card accent"><div class="card-head"><h3>' + esc(t('nextPayday')) + '</h3>' + h.chip(F.date(next.date, 'long'), 'gold') + '</div>';
      if (nl) s += '<div class="row wrap" style="gap:14px"><span class="money">' + h.money('pay', nl.line.amount) + '</span><span class="small muted">' + esc(t('estimated')) + ' · ' + hrs(nl.line.hours) + ' × ' + h.money('pay', nl.line.rate, { rate: true }) + (nl.line.bonus ? ' + ' + h.money('pay', nl.line.bonus) : '') + '</span></div><p class="small muted" style="margin-top:8px">' + esc(t('estimateNote')) + '</p>';
      else s += '<p class="small muted">' + esc(F.daysUntil(next.date) + ' ' + t('days')) + ' · ' + esc(t('statementsStart')) + '</p>';
      s += '</div>';
    }
    var paid = mine.filter(function (x) { return x.run.status === 'paid'; });
    s += h.sec(t('myStatements')) + '<div class="card flat tight"><div class="list">';
    if (!paid.length) s += h.empty(t('noStatements'), t('statementsStart'));
    paid.forEach(function (x) { var l = x.line, pl = Dx.placement(l.placementId); s += h.li({ lead: '<span class="hash">' + I.money.replace('<svg', '<svg width="18" height="18" style="fill:none;stroke:currentColor;stroke-width:1.8"') + '</span>', title: esc(F.date(x.run.date, 'long')) + (pl ? ' <span class="small muted">· ' + plLabel(pl) + '</span>' : ''), sub: esc(range(x.run.periodStart, x.run.periodEnd)) + ' · ' + hrs(l.hours) + ' × ' + h.money('pay', l.rate, { rate: true }) + (l.bonus ? ' + ' + esc(t('bonus').toLowerCase()) + ' ' + h.money('pay', l.bonus) : '') + ' · ' + esc(l.rail === 'mercury' ? 'Mercury' : 'Payoneer'), trail: h.money('pay', l.amount) + '<br>' + (l.invoiceUploaded ? h.chip(t('invoiceUploaded'), 'good', true) : h.chip(t('uploadInvoice'), 'warn', true)), go: 'statement', params: { id: l.statementId || l.id } }); });
    s += '</div></div>';
    return { title: t('myPay'), sub: esc(viewer.name), body: s };
  }

  /* ---------- One VA statement ---------- */
  HQ.V.statement = function (p) {
    var viewer = HQ.me(), hit = findLine(p.id);
    if (!hit) return gate(t('statement'), '');
    if (!canSeeLine(hit.line)) return gate(t('statement'), viewer.role === 'client' ? t('notForClients') : t('notForApplicants'));
    var r = hit.run, l = hit.line, va = Dx.person(l.vaId), pl = Dx.placement(l.placementId);
    var s = '<div class="card"><div class="card-head"><div class="row" style="gap:10px">' + h.avatar(va) + '<div><h3 style="margin:0">' + esc(va ? Dx.vaLabel(va) : '') + '</h3><div class="small muted">' + (pl ? lnk(plLabel(pl), 'placement', pl.id) : '') + '</div></div></div>' + runChip(r) + '</div>';
    s += '<div class="kpis">' + h.kpi(hrs(l.hours), t('approvedH')) + h.kpi(h.money('pay', l.rate, { rate: true }), t('payRate')) + h.kpi(l.bonus ? h.money('pay', l.bonus) : '—', t('bonus')) + h.kpi(h.money('pay', l.amount), r.estimated ? t('estimated') : t('amount'), 'gold') + '</div>';
    s += '<p class="small muted" style="margin-top:10px">' + esc(t('payoutRun')) + ' ' + esc(F.date(r.date, 'long')) + ' · ' + esc(t('period')) + ' ' + esc(range(r.periodStart, r.periodEnd)) + ' · ' + esc(l.rail === 'mercury' ? 'Mercury' : 'Payoneer') + (r.paidOn ? ' · ' + esc(t('paidOnDate')) + ' ' + esc(F.date(r.paidOn)) : '') + '</p>';
    [l.bonusNote, l.pendingNote, l.heldNote, l.note].filter(Boolean).forEach(function (n) { s += '<div style="margin-top:8px">' + h.note(esc(L(n))) + '</div>'; });
    if (l.pendingHours || l.heldHours) s += '<p class="small muted" style="margin-top:8px">' + esc(t('heldHours')) + ': ' + hrs(l.pendingHours || l.heldHours) + '</p>';
    if (r.estimated) s += '<p class="small muted" style="margin-top:8px">' + esc(t('estimateNote')) + '</p>';
    s += '<div class="row wrap" style="gap:8px;margin-top:14px">' + (l.invoiceUploaded ? h.chip(t('invoiceUploaded'), 'good', true) : (viewer.role === 'va' && !r.estimated ? h.btn(I.clip + esc(t('uploadInvoice')), 'upload-invoice', 'btn-gold btn-sm', { id: l.id }) : h.chip(t('pending'), 'warn', true)));
    s += toastBtn(esc(t('downloadPdf'))) + h.go(esc(t('payouts')), 'payouts', viewer.role === 'va' ? {} : { id: r.id }, 'btn-ghost btn-sm') + '</div></div>';
    return { title: t('statement'), sub: esc(F.date(r.date, 'full')), body: s };
  };

  /* ---------- Reports (owner only) ---------- */
  HQ.V.reports = function () {
    if (role() !== 'owner') return gate(t('reports'), t('ownerOnly'));
    var b0 = D.block || {}; var act = Dx.activePlacements(); var tot = { sch: 0, ap: 0, rev: 0, cost: 0, mo: 0 };
    var rows = act.map(function (pl) {
      var va = Dx.person(pl.vaId), cl = Dx.client(pl.clientId); var ap = 0, tr = 0;
      approvalsIn(pl.id, b0.start, b0.end).forEach(function (w) { if (w.status === 'approved') ap += w.approvedHours || 0; tr += w.trackedHours || 0; });
      var sch = pl.hoursPerWeek * ((D.rates || {}).blockWeeks || 2), rev = ap * pl.billRate, cost = ap * pl.payRate, mg = rev - cost, mo = (pl.billRate - pl.payRate) * pl.hoursPerWeek * 52 / 12;
      tot.sch += sch; tot.ap += ap; tot.rev += rev; tot.cost += cost; tot.mo += mo;
      return [lnk(esc(va ? va.first : ''), 'placement', pl.id) + '<span class="sub">' + esc(cl ? cl.name : '') + ' · ' + esc(Dx.tierShort(pl.tier)) + '</span>', hrs(sch), hrs(ap) + (tr > ap ? '<span class="sub">' + hrs(tr - ap) + ' ' + esc(t('pendingHours')) + '</span>' : ''), h.money('bill', pl.billRate, { rate: true }), h.money('pay', pl.payRate, { rate: true }), h.money('bill', rev), h.money('pay', cost), h.money('margin', mg), rev ? F.pct(mg / rev * 100) : '—', h.money('margin', mo)];
    });
    rows.push({ cells: ['<b>' + esc(t('total')) + '</b>', hrs(tot.sch), hrs(tot.ap), '', '', '<b>' + h.money('bill', tot.rev) + '</b>', '<b>' + h.money('pay', tot.cost) + '</b>', '<b>' + h.money('margin', tot.rev - tot.cost) + '</b>', tot.rev ? F.pct((tot.rev - tot.cost) / tot.rev * 100) : '—', '<b>' + h.money('margin', tot.mo) + '</b>'] });
    /* utilization over every approval week */
    var u = { tr: 0, sch: 0 }; var util = act.map(function (pl) { var a = { tr: 0, sch: 0 }; (D.weekApprovals || []).forEach(function (w) { if (w.placementId === pl.id) { a.tr += w.trackedHours || 0; a.sch += w.scheduledHours || 0; } }); u.tr += a.tr; u.sch += a.sch; return { pl: pl, a: a }; });
    var ended = (D.placements || []).filter(function (x) { return x.status === 'ended'; });
    var bench = Dx.vas().filter(function (v) { return v.status === 'bench'; });
    var apps = D.applications || []; var stages = ['draft', 'submitted', 'scored', 'interview', 'trial', 'offer', 'active', 'placed', 'talent_pool'];
    var stLbl = { draft: t('draft'), submitted: t('submitted'), scored: t('scored'), interview: t('interview'), trial: t('trial'), offer: t('offer'), active: t('stageActive'), placed: t('stagePlaced'), talent_pool: t('talentPool') };
    var counts = stages.map(function (st) { return apps.filter(function (a) { return a.stage === st; }).length; }); var mx = Math.max.apply(null, counts.concat([1]));
    var mo = month(Dx.today()); var sum = function (xs) { return xs.reduce(function (n, i) { return n + (i.amount || 0); }, 0); };
    var paidI = invoices().filter(function (i) { return i.status === 'paid' && month(i.paidOn) === mo; }), openI = invoices().filter(function (i) { return i.status === 'open'; }), failI = invoices().filter(function (i) { return i.status === 'failed'; });

    var s = '<div class="kpis" style="margin-bottom:14px">' + h.kpi(h.money('margin', tot.rev - tot.cost), t('margin') + ' · ' + t('thisBlock').toLowerCase(), 'gold') + h.kpi(u.sch ? F.pct(u.tr / u.sch * 100) : '—', t('utilization')) + h.kpi(act.length, t('activePlacements')) + h.kpi(bench.length, t('onBench')) + h.kpi(apps.length, t('inPipeline')) + h.kpi(hrs(bench.length * 40), t('capacity')) + '</div>';
    s += h.sec(t('marginPerPlacement') + ' · ' + range(b0.start, b0.end), toastBtn(esc(t('exportCsv'))));
    s += h.table([{ l: t('placement') }, { l: t('scheduled'), num: true }, { l: t('approved'), num: true }, { l: t('billRate'), num: true }, { l: t('payRate'), num: true }, { l: t('revenue'), num: true }, { l: t('cost'), num: true }, { l: t('margin'), num: true }, { l: '%', num: true }, { l: t('monthEst'), num: true }], rows);
    s += '<p class="small muted" style="margin-top:8px">' + esc(t('marginNote')) + ' ' + esc(t('approvedWeeksOnly', { n: pendingWeeks().length })) + '</p>';
    s += h.sec(t('utilization')) + '<div class="card flat tight"><div class="list">';
    if (!util.length) s += h.empty(t('nothingHere'));
    util.forEach(function (x) { var va = Dx.person(x.pl.vaId); var pct = x.a.sch ? x.a.tr / x.a.sch * 100 : 0; s += h.li({ lead: h.avatar(va, 'sm'), title: esc(va ? va.first : '') + ' <span class="small muted">· ' + plLabel(x.pl) + '</span>', sub: h.progress(pct, pct >= 95 ? 'good' : '') , trail: '<span class="num b">' + F.pct(pct) + '</span><br><span class="muted">' + hrs(x.a.tr) + ' / ' + hrs(x.a.sch) + '</span>' }); });
    s += '</div><p class="small muted" style="margin-top:8px"><b>' + esc(t('churn')) + ':</b> ' + esc(t('churnNote', { n: ended.length, m: (D.placements || []).length })) + (ended[0] && ended[0].endReason ? ' ' + esc(L(ended[0].endReason)) + '.' : '') + '</p></div>';
    s += '<div class="grid2" style="margin-top:4px"><div>' + h.sec(t('funnel'), '<span class="small muted">' + apps.length + ' ' + esc(t('applicants')) + '</span>') + '<div class="card flat tight"><div class="list">';
    stages.forEach(function (st, i) { s += h.li({ title: esc(stLbl[st]), sub: h.progress(counts[i] / mx * 100, 'gold'), trail: '<span class="num b">' + counts[i] + '</span>', go: 'pipeline', params: { stage: st } }); });
    s += '</div></div></div><div>' + h.sec(t('bench')) + '<div class="card flat tight"><div class="list">';
    if (!bench.length) s += h.empty(t('nothingHere'));
    bench.forEach(function (v) { s += h.li({ lead: h.avatar(v, 'sm'), title: esc(v.name), sub: esc(Dx.tierShort(v.tier)) + ' · ' + esc(v.country) + ' · ' + esc(t('certified')) + ' ' + esc(F.date(v.certifiedOn)), go: 'person', params: { id: v.id } }); });
    s += '</div><p class="small muted" style="margin-top:8px">' + esc(t('capacity')) + ': ' + hrs(bench.length * 40) + ' · ' + esc(t('capacityNote')) + '</p></div></div></div>';
    s += h.sec(t('cashThisMonthShort')) + '<div class="kpis">' + h.kpi(h.money('bill', sum(paidI)), t('paid') + ' · ' + paidI.length, 'good') + h.kpi(h.money('bill', sum(openI)), t('awaitingPayment') + ' · ' + openI.length) + h.kpi(h.money('bill', sum(failI)), t('failed') + ' · ' + failI.length, failI.length ? 'bad' : '') + '</div>';
    var pulse = D.pulse || [];
    if (pulse.length) { s += h.sec(t('pulse')) + '<div class="card flat tight"><div class="list">'; (D.clients || []).forEach(function (c) { var ps = pulse.filter(function (x) { return x.clientId === c.id; }).sort(function (a, b) { return a.month < b.month ? 1 : -1; }); s += h.li({ title: esc(c.name), sub: ps.length ? esc(ps[0].comment) : esc(t('nothingHere')), trail: ps.map(function (x) { return '<span class="num b">' + x.score + '</span><span class="muted">/5 ' + esc(x.month.slice(5)) + '</span>'; }).join(' · ') }); }); s += '</div></div>'; }
    return { title: t('reports'), sub: esc(F.date(Dx.today(), 'full')), body: s, side: sideHtml(), wide: true };
  };

  /* ---------- Settings (role-aware) ---------- */
  HQ.V.settings = function () {
    var m = HQ.me(), r = m.role, R = D.rates || { tiers: {} };
    var s = '';
    if (r === 'owner') {
      s += h.sec(t('tierRates'), editBtn()) + h.table([{ l: t('tier') }, { l: t('billRate'), num: true }], Object.keys(R.tiers || {}).map(function (k) { return [esc(L(R.tiers[k].label)), h.money('bill', R.tiers[k].bill, { rate: true })]; }));
      s += '<div class="card flat tight" style="margin-top:12px"><div class="list">';
      s += h.li({ title: esc(t('payBand')), sub: h.money('pay', (R.payBand || {}).min, { rate: true }) + ' – ' + h.money('pay', (R.payBand || {}).max, { rate: true }), trail: editBtn() });
      s += h.li({ title: esc(t('setupFee')), sub: h.money('bill', R.setupFee), trail: editBtn() });
      s += h.li({ title: esc(t('blockLength')), sub: esc(t('weeksPrepaid', { n: R.blockWeeks })), trail: editBtn() });
      s += h.li({ title: esc(t('paydays')), sub: esc(t('paydaysVal')), trail: editBtn() });
      s += h.li({ title: esc(t('noticeNote', { n: R.noticeDays })), sub: '', trail: editBtn() });
      s += '</div></div>';
      var sets = {}; (D.clients || []).forEach(function (c) { sets[c.holidaySet || 'US'] = 1; }); Dx.vas().forEach(function (v) { if (v.status !== 'inactive' && v.country) sets[v.country] = 1; });
      s += h.sec(t('holidaySetsInUse')) + '<div class="row wrap" style="gap:6px">' + Object.keys(sets).map(function (k) { var n = (D.holidaySets || {})[k]; return h.chip(k + ' · ' + (n ? t('datesSeeded', { n: n.length }) : t('notLoaded')), n ? (k === 'US' ? 'blue' : 'gold') : ''); }).join('') + '</div>';
      s += h.sec(t('templates')) + '<div class="card flat tight"><div class="list">' + ['tplReminder', 'tplAck', 'tplDigest', 'tplStatement', 'tplApproved', 'tplBlock', 'tplPause', 'tplCheckpoint'].map(function (k) { return h.li({ title: esc(t(k)), sub: 'EN · ES', trail: editBtn() }); }).join('') + '</div></div>';
    }
    if (r === 'client') {
      var cl = Dx.client(m.clientId) || {};
      s += h.sec(t('billing')) + '<div class="card flat tight"><div class="list">';
      s += h.li({ title: esc(t('billingEmail')), sub: esc(cl.billingEmail || ''), trail: editBtn() });
      s += h.li({ title: esc(t('cardOnFile')), sub: 'Stripe · ' + esc((cl.stripeCustomer || '').replace(/^(.{4}).*(.{4})$/, '$1••••$2')), trail: toastBtn(esc(t('updateCard'))) });
      s += '</div></div>' + h.sec(t('teamLogins'), toastBtn(esc(t('inviteLogin')))) + '<div class="card flat tight"><div class="list">';
      (cl.logins || []).forEach(function (id) { var p = Dx.person(id); if (p) s += h.li({ lead: h.avatar(p, 'sm'), title: esc(p.name) + (p.id === m.id ? ' <span class="tiny muted">(' + (HQ.lang() === 'es' ? 'tú' : 'you') + ')</span>' : ''), sub: esc(L(p.title)) + ' · ' + esc(p.email || '') + (cl.contactId === p.id ? ' · ' + esc(t('billing').toLowerCase()) : '') }); });
      s += '</div></div>';
      s += h.sec(t('notifications'), toastBtn(esc(t('previewDigest')))) + '<div class="card flat tight">' + toggle(t('nDigest'), true) + toggle(t('nBlock'), true) + '</div>';
    }
    if (r === 'va') {
      s += h.sec(t('notifications')) + '<div class="card flat tight">' + toggle(t('pushNotifs'), true) + toggle(t('nReportMissing'), true) + toggle(t('nMentions'), true) + toggle(t('nPayday'), true) + '</div>';
      s += h.sec(t('profile')) + '<div class="card flat tight"><div class="list">';
      s += h.li({ title: esc(t('whatsapp')), sub: esc(m.whatsapp || '+504 9xxx-xxxx'), trail: editBtn() });
      if (m.availability) s += h.li({ title: esc(t('availabilityWindow')), sub: esc(F.ampm(m.availability.from) + ' – ' + F.ampm(m.availability.to) + ' ' + F.tz(m.availability.tz)), trail: editBtn() });
      s += '</div></div>';
    }
    if (r === 'manager') s += h.sec(t('notifications')) + '<div class="card flat tight">' + toggle(t('pushNotifs'), true) + toggle(t('nInbox'), true) + toggle(t('nMentions'), true) + toggle(t('nReportMissing'), true) + '</div>';
    /* shared */
    s += h.sec(t('settings')) + '<div class="card flat tight stack">';
    s += '<div class="row between wrap"><span class="b">' + esc(t('language')) + '</span>' + h.seg([{ v: 'en', l: 'English' }, { v: 'es', l: 'Español' }], HQ.lang(), 'set-lang') + '</div>';
    s += '<div class="row between wrap"><span class="b">' + esc(t('theme')) + '</span>' + h.seg([{ v: 'auto', l: t('auto') }, { v: 'light', l: t('light') }, { v: 'dark', l: t('dark') }], S.theme, 'set-theme') + '</div>';
    s += '<div class="row between wrap"><span class="b">' + esc(t('timezone')) + '</span><span class="small muted">' + esc(m.tz) + ' · ' + esc(F.tz(m.tz)) + ' · ' + esc(F.time(HQ.now().toISOString(), m.tz)) + '</span></div>';
    if (HQ.isStaff()) s += '<div class="row between wrap"><span class="b">' + esc(t('mfa')) + '</span>' + h.chip(t('required'), 'good', true) + '</div><p class="small muted">' + esc(t('mfaNote')) + '</p>';
    if (r === 'owner') s += '<div class="row between wrap"><span class="b">' + esc(t('auditLog')) + '</span>' + h.go(esc(t('open')), 'audit', {}, 'btn-ghost btn-sm') + '</div><p class="small muted">' + esc(t('auditNote')) + '</p>';
    s += '<div class="row between wrap"><span class="b">' + esc(t('switchUser')) + '</span>' + h.btn(esc(m.name), 'open-picker', 'btn-ghost btn-sm') + '</div>';
    s += '<div class="row between wrap"><span class="b">' + esc(t('signOut')) + '</span>' + h.btn(esc(t('signOut')), 'open-picker', 'btn-danger btn-sm') + '</div></div>';
    s += '<p class="proto" style="margin-top:18px">' + esc(t('prototype')) + '</p>';
    return { title: t('settings'), sub: esc(m.name) + ' · ' + esc(t(r)), body: s, side: r === 'owner' ? sideHtml() : null };
  };

  /* ---------- actions ---------- */
  Object.assign(HQ.act, {
    'bill-filter': function (el) { M.client = el.dataset.v || 'all'; if (S.screen !== 'billing') HQ.go('billing', {}); else { S.params = {}; HQ.render(); } },
    'pick-run': function (el) { S.params = { id: el.dataset.v }; HQ.render(); },
    'retry-charge': function (el) {
      var i = inv(el.dataset.id); if (!i) { HQ.toast(t('prototypeOnly')); return; }
      i.status = 'paid'; i.paidOn = Dx.today(); i.failedOn = null; i.retryOn = null;
      var b = blk(i.blockId); if (b) { b.status = b.start <= Dx.today() ? 'current' : 'upcoming'; b.paidOn = Dx.today(); }
      HQ.toast(t('chargeRetried')); HQ.render();
    },
    'mark-released': function (el) { var r = runById(el.dataset.id); if (r) { r.status = 'paid'; r.paidOn = Dx.today(); r.estimated = false; r.lines.forEach(function (l) { if (!l.statementId) l.statementId = l.id; }); } HQ.toast(t('released')); HQ.render(); },
    'upload-invoice': function (el) { var hit = findLine(el.dataset.id); if (hit && canSeeLine(hit.line)) hit.line.invoiceUploaded = true; HQ.toast(t('invoiceReceived')); HQ.render(); },
    'flip-toggle': function (el) { el.classList.toggle('on'); HQ.toast(t('prototypeOnly')); }
  });
})();
