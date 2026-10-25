/* BeyondVAs HQ prototype: hours. Tracked time per placement, the Monday approval that locks a week,
   manual edits with a reason, the placements list and page (role-aware), and the outage log.
   Screens: hours, week, placements, placement, outages. Global: HQ.pendingWeeks(). */
(function () {
  var HQ = window.HQ, D = window.HQD, Dx = HQ.D, h = HQ.h, t = HQ.t, L = HQ.L, esc = HQ.esc, F = HQ.fmt, I = HQ.I, S = HQ.S;
  ['timeEntries', 'outages', 'weekApprovals', 'blocks', 'auditLog', 'messages'].forEach(function (k) { D[k] = D[k] || []; });
  var isPhone = function () { return HQ.isPhone ? HQ.isPhone() : window.innerWidth <= 900; };

  Object.assign(HQ.T, {
    weeksToApprove: { en: 'Weeks to approve', es: 'Semanas por aprobar' }, recentApproved: { en: 'Recently approved', es: 'Aprobadas recientemente' },
    thisWeekSoFar: { en: 'This week so far', es: 'Esta semana hasta ahora' }, notYetApprovable: { en: 'Can be approved next Monday', es: 'Se podrá aprobar el próximo lunes' },
    weekInProgress: { en: 'Week in progress', es: 'Semana en curso' }, overdueDays: { en: '{n} days overdue', es: '{n} días de retraso' }, dueOn: { en: 'Due {date}', es: 'Vence el {date}' },
    flagsN: { en: '{n} flags', es: '{n} alertas' }, flag1: { en: '1 flag', es: '1 alerta' }, flagsOpen: { en: '{n} to resolve', es: '{n} por resolver' }, noFlags: { en: 'No flags', es: 'Sin alertas' },
    approvedByOn: { en: 'Approved by {name} · {date}', es: 'Aprobada por {name} · {date}' }, lockedNote: { en: 'Locked. An approved week is never edited; a correction goes on the next week with a reason.', es: 'Bloqueada. Una semana aprobada no se edita; una corrección va en la siguiente semana con su motivo.' },
    approveRecords: { en: 'Approving records who approved and when, locks the week and posts a note in the client channel.', es: 'Aprobar registra quién aprobó y cuándo, bloquea la semana y publica una nota en el canal del cliente.' },
    resolveFirst: { en: 'Resolve every flag before approving.', es: 'Resuelve todas las alertas antes de aprobar.' }, approveAllClean: { en: 'Approve all without flags', es: 'Aprobar todas sin alertas' },
    noneClean: { en: 'Every pending week still has an open flag.', es: 'Todas las semanas pendientes tienen una alerta abierta.' }, weeksApprovedN: { en: '{n} weeks approved', es: '{n} semanas aprobadas' },
    allApproved: { en: 'Nothing to approve', es: 'Nada por aprobar' }, allApprovedSub: { en: 'Every closed week is approved and locked.', es: 'Todas las semanas cerradas están aprobadas y bloqueadas.' },
    entries: { en: 'Entries', es: 'Registros' }, nightlyImport: { en: 'nightly import', es: 'importación nocturna' }, editEntry: { en: 'Edit', es: 'Editar' },
    keep: { en: 'Keep', es: 'Mantener' }, trim: { en: 'Trim', es: 'Recortar' }, askVa: { en: 'Ask {name}', es: 'Preguntar a {name}' }, flagKept: { en: 'Flag resolved: the hours stay as tracked.', es: 'Alerta resuelta: las horas quedan como se registraron.' },
    resolved: { en: 'Resolved', es: 'Resuelta' }, toResolve: { en: 'To resolve', es: 'Por resolver' }, overSchedLbl: { en: 'Over schedule', es: 'Horas de más' }, explain: { en: 'Explain', es: 'Explicar' },
    minutes: { en: 'Minutes', es: 'Minutos' }, change: { en: 'Change', es: 'Cambio' }, reasonMin: { en: 'Reason (at least 10 characters)', es: 'Motivo (mínimo 10 caracteres)' },
    reasonTooShort: { en: 'Write a reason of at least 10 characters.', es: 'Escribe un motivo de al menos 10 caracteres.' }, entrySaved: { en: 'Entry corrected and logged in the audit trail', es: 'Registro corregido y anotado en la auditoría' },
    beforeLbl: { en: 'Before', es: 'Antes' }, toApprove: { en: 'To approve', es: 'Por aprobar' }, hoursApprovedMonday: { en: 'Hours are approved every Monday for the previous week.', es: 'Las horas se aprueban cada lunes para la semana anterior.' },
    screenshots: { en: 'Screenshots', es: 'Capturas' }, hubstaffToast: { en: 'In the real app this opens Hubstaff. Screenshots never live in HQ.', es: 'En la app real esto abre Hubstaff. Las capturas nunca viven en HQ.' },
    logOutage: { en: 'Log an outage', es: 'Reportar un corte' }, outageLog: { en: 'Outage log', es: 'Bitácora de cortes' }, noOutages: { en: 'No outages logged', es: 'Sin cortes registrados' },
    noOutagesSub: { en: 'Power and internet outages are logged here so the client status stays truthful.', es: 'Los cortes de luz e internet se registran aquí para que el estado del cliente sea veraz.' },
    cause: { en: 'Cause', es: 'Causa' }, powerOut: { en: 'Power', es: 'Luz' }, internetOut: { en: 'Internet', es: 'Internet' }, startedAt: { en: 'Started at', es: 'Empezó a las' },
    stillOngoing: { en: 'Still ongoing', es: 'Sigue ahora' }, endedAt: { en: 'Ended at', es: 'Terminó a las' }, outageNoteHint: { en: 'Internal note, Spanish is fine. The client sees only the time and the cause.', es: 'Nota interna, puede ir en español. El cliente solo ve la hora y la causa.' },
    outageSaved: { en: 'Outage logged and posted in the client channel', es: 'Corte registrado y publicado en el canal del cliente' }, loggedBy: { en: 'logged by', es: 'registrado por' },
    timesInYourZone: { en: 'Times in your zone ({tz})', es: 'Horas en tu zona ({tz})' }, ongoing: { en: 'ongoing', es: 'en curso' },
    noTrackedTime: { en: 'No tracked time this week', es: 'Sin tiempo registrado esta semana' }, notPlacedHours: { en: 'Hours appear once you are placed with a client.', es: 'Las horas aparecen cuando tengas cliente.' },
    noPlacementYet: { en: 'No active placement', es: 'Sin colocación activa' }, declareDay: { en: 'Declare an unavailable day', es: 'Declarar un día no disponible' },
    fxOutage: { en: 'Power or internet outage: {n} min were not tracked and are not billed.', es: 'Corte de luz o internet: {n} min no se registraron y no se cobran.' },
    fxOver: { en: 'Finished past the scheduled time; BeyondVAs reviews the extra minutes before approving.', es: 'Terminó después del horario; BeyondVAs revisa los minutos extra antes de aprobar.' },
    fxLow: { en: 'A quiet stretch was reviewed and explained by BeyondVAs.', es: 'BeyondVAs revisó un tramo de poca actividad y quedó explicado.' },
    fxEdit: { en: 'An entry was corrected by BeyondVAs before approval.', es: 'BeyondVAs corrigió un registro antes de aprobar.' },
    fxUnder: { en: 'Fewer hours than scheduled; only tracked hours are billed and the difference is credited.', es: 'Menos horas de las programadas; solo se cobran las horas registradas y la diferencia se acredita.' },
    underSchedLbl: { en: 'Under schedule', es: 'Horas de menos' },
    pendingReview: { en: 'Pending review', es: 'Pendiente de revisión' }, approvedByBV: { en: 'Approved by BeyondVAs · {date}', es: 'Aprobadas por BeyondVAs · {date}' },
    trueUpNote: { en: 'Approved minus scheduled hours become a credit or a charge on the next block, never a refund.', es: 'La diferencia entre horas aprobadas y programadas pasa como crédito o cargo al siguiente bloque, nunca como reembolso.' },
    lastBlock: { en: 'Last block', es: 'Bloque anterior' }, hPerWeek: { en: 'h/week', es: 'h/semana' }, monFri: { en: 'Mon–Fri', es: 'lun–vie' },
    chain: { en: 'Replacement chain', es: 'Cadena de reemplazo' }, replacesLbl: { en: 'Replaces', es: 'Reemplaza a' }, replacedByLbl: { en: 'Replaced by', es: 'Reemplazada por' },
    withYouSince: { en: 'With you since {date}', es: 'Contigo desde el {date}' }, fitUntil: { en: 'Fit window until', es: 'Ventana de ajuste hasta' }, replUntil: { en: 'Replacement window until', es: 'Ventana de reemplazo hasta' },
    daysLeft: { en: '{n} days left', es: 'faltan {n} días' }, guarantees: { en: 'Guarantees', es: 'Garantías' }, cpNext: { en: 'Next checkpoint', es: 'Próximo punto de control' },
    cpDay: { en: 'Day {n} checkpoint', es: 'Punto de control del día {n}' }, scheduleCp: { en: 'Schedule', es: 'Agendar' }, scheduleToast: { en: 'A calendar event would be created here (prototype).', es: 'Aquí se crearía un evento de calendario (prototipo).' },
    pauseP: { en: 'Pause', es: 'Pausar' }, endP: { en: 'End', es: 'Terminar' }, pauseToast: { en: 'Pause, end, replace and offboarding are later steps, not in the prototype.', es: 'Pausar, terminar, reemplazar y el cierre son pasos posteriores, no están en el prototipo.' },
    chanLink: { en: 'Open channel', es: 'Abrir canal' }, messageVa: { en: 'Message {name}', es: 'Escribir a {name}' }, marginPerHour: { en: 'Margin per hour', es: 'Margen por hora' },
    allReports: { en: 'All reports', es: 'Todos los reportes' }, noReportYet: { en: 'No report yet', es: 'Aún sin reporte' }, yourTime: { en: 'your time', es: 'tu hora' },
    newPlacement: { en: 'New placement', es: 'Nueva colocación' }, newPlacementToast: { en: 'Creating a placement is a later step, not in the prototype.', es: 'Crear una colocación es un paso posterior, no está en el prototipo.' },
    staffOnly: { en: 'This screen belongs to the BeyondVAs team.', es: 'Esta pantalla es del equipo de BeyondVAs.' }, bothZones: { en: 'Stored in the client\'s zone; shown in yours.', es: 'Se guarda en la zona del cliente; se muestra en la tuya.' },
    approvalLbl: { en: 'Approval', es: 'Aprobación' }, weekLbl: { en: 'Week {range}', es: 'Semana {range}' }, hoursOf: { en: 'Hours · {name}', es: 'Horas · {name}' },
    outageSince: { en: 'Outage: {cause} since {time}', es: 'Corte: {cause} desde las {time}' }, outageWindow: { en: 'Outage: {cause} {from}–{to} · {min} min', es: 'Corte: {cause} {from}–{to} · {min} min' },
    weekApprovedMsg: { en: 'Week {range} approved · {h} h', es: 'Semana {range} aprobada · {h} h' }, viewAsPick: { en: 'View as {name}', es: 'Ver como {name}' },
    otherWeeks: { en: 'Other weeks', es: 'Otras semanas' },
    hoursApprovedLbl: { en: 'Approved', es: 'Aprobadas' }, weekApprovedLbl: { en: 'Approved', es: 'Aprobada' }
  });

  /* ---------- helpers ---------- */
  function me() { return HQ.me(); }
  function ico(name, px) { return (I[name] || '').replace('<svg', '<svg width="' + (px || 16) + '" height="' + (px || 16) + '" style="fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;vertical-align:-3px"'); }
  function newId(p) { return p + '-' + Math.random().toString(36).slice(2, 8); }
  function nowIso() { return new Date(HQ.now().getTime() + 60000).toISOString(); }
  function addDays(iso, n) { var d = new Date(iso + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); }
  function weekStartOf(iso) { var d = new Date(iso + 'T12:00:00Z'); return addDays(iso, -((d.getUTCDay() + 6) % 7)); }
  function dayNum(iso) { return new Date(iso + 'T12:00:00Z').getUTCDate(); }
  function rangeLbl(a, b) {
    var sameMonth = a.slice(0, 7) === b.slice(0, 7);
    if (!sameMonth) return F.date(a) + ' – ' + F.date(b);
    return HQ.lang() === 'es' ? dayNum(a) + '–' + F.date(b) : F.date(a) + '–' + dayNum(b);
  }
  function hdecH(x) { return F.hdec(x || 0) + ' h'; }
  function viewerTz() { return (me() && me().tz) || 'America/Los_Angeles'; }
  function canSee(pl, v) { if (!pl || !pl.schedule) return false; if (v.role === 'owner' || v.role === 'manager') return true; if (v.role === 'va') return pl.vaId === v.id; if (v.role === 'client') return pl.clientId === v.clientId; return false; }
  function entriesOf(pid, from, to) { return D.timeEntries.filter(function (e) { return e.placementId === pid && e.date >= from && e.date <= to; }).sort(function (a, b) { return a.date === b.date ? (a.start < b.start ? -1 : 1) : (a.date < b.date ? -1 : 1); }); }
  function entryById(id) { return D.timeEntries.filter(function (e) { return e.id === id; })[0] || null; }
  /* minutes of an entry: as imported, or the running count for an entry still open (minutes null, end null) */
  function entryMin(e) { if (e.minutes != null) return e.minutes; if (e.end) return Math.max(0, toMin(e.end) - toMin(e.start)); return Math.max(0, toMin(nowHHMM(e.tz || 'America/Los_Angeles')) - toMin(e.start)); }
  function sumMin(list) { return list.reduce(function (n, e) { return n + entryMin(e); }, 0); }
  function weeksOf(pid) { return D.weekApprovals.filter(function (w) { return w.placementId === pid; }).sort(function (a, b) { return a.weekStart < b.weekStart ? 1 : -1; }); }
  function waFor(pid, ws) { return D.weekApprovals.filter(function (w) { return w.placementId === pid && w.weekStart === ws; })[0] || null; }
  function waById(id) { return D.weekApprovals.filter(function (w) { return w.id === id; })[0] || null; }
  /* a flag counts as resolved once the manager kept or trimmed it; every flag of a locked week is resolved */
  function unresolved(wa) { return wa.status === 'approved' ? [] : (wa.flags || []).filter(function (f) { return !f.resolved; }); }
  function flagText(f) { return L(f.note || f.text); }
  function overdueDays(wa) { if (wa.status !== 'pending') return 0; var n = -F.daysUntil(wa.dueOn); return n > 0 ? n : 0; }
  function byDay(list) { var days = [], map = {}; list.forEach(function (e) { if (!map[e.date]) { map[e.date] = { date: e.date, entries: [] }; days.push(map[e.date]); } map[e.date].entries.push(e); }); return days; }
  function conv(hhmm, fromTz, date) { return F.ampm(F.clock(hhmm, fromTz, viewerTz(), date)); }
  function rangeClk(e) {
    var tz = e.tz || 'America/Los_Angeles', mine = viewerTz();
    var s = conv(e.start, tz, e.date) + '–' + (e.end ? conv(e.end, tz, e.date) : '<span class="chip good" style="font-size:11px;padding:1px 7px">' + esc(t('inProgressNow')) + '</span>');
    if (tz !== mine) s += ' <span class="tiny muted">(' + F.ampm(e.start) + (e.end ? '–' + F.ampm(e.end) : '') + ' ' + F.tz(tz) + ')</span>';
    return s;
  }
  function daysLbl(d) { return d === 'Mon-Fri' ? t('monFri') : esc(d || ''); }
  function schedLine(pl, tz) { var sc = pl.schedule; return daysLbl(sc.days) + ' · ' + F.ampm(F.clock(sc.from, sc.tz, tz)) + '–' + F.ampm(F.clock(sc.to, sc.tz, tz)) + ' ' + F.tz(tz); }
  function flagKindLbl(k) { return k === 'outage' ? t('outage') : k === 'low-activity' ? t('lowActivity') : k === 'manual-edit' ? t('manualEdit') : k === 'over-schedule' ? t('overSchedLbl') : k === 'under-schedule' ? t('underSchedLbl') : k; }
  function flagChip(kind, resolved) { return h.chip(flagKindLbl(kind), resolved ? 'warn' : 'bad', true); }
  /* the client's plain-words version of a flag (no activity %, no edit reasons) */
  function flagPlain(kind, pl, date) {
    if (kind === 'outage') { var o = D.outages.filter(function (x) { return x.placementId === pl.id && date && HQ.isoDate(x.at) === date; })[0]; return t('fxOutage', { n: o && o.minutes != null ? o.minutes : '—' }); }
    if (kind === 'over-schedule') return t('fxOver'); if (kind === 'under-schedule') return t('fxUnder'); if (kind === 'low-activity') return t('fxLow'); return t('fxEdit');
  }
  function prevBlock() { return { start: addDays(D.block.start, -14), end: addDays(D.block.start, -1) }; }
  function blockHours(pl, blk) {
    var ws = weekStartOf(blk.start), approved = 0, pending = 0, scheduled = 0, weeks = [];
    while (ws <= blk.end) {
      var wa = waFor(pl.id, ws), we = addDays(ws, 6), tracked = sumMin(entriesOf(pl.id, ws, we)) / 60;
      if (wa && wa.status === 'approved') approved += wa.approvedHours; else pending += tracked;
      scheduled += wa ? wa.scheduledHours : pl.hoursPerWeek;
      weeks.push({ ws: ws, we: we, wa: wa, tracked: tracked }); ws = addDays(ws, 7);
    }
    return { scheduled: scheduled, approved: approved, pending: pending, weeks: weeks };
  }
  function blockBar(bh) {
    var tot = Math.max(bh.scheduled, bh.approved + bh.pending, 1), a = bh.approved / tot * 100, p = bh.pending / tot * 100;
    return '<div class="progress" style="display:flex;height:10px"><i style="width:' + a + '%;background:var(--good);border-radius:0"></i><i style="width:' + p + '%;background:var(--blue);opacity:.45;border-radius:0"></i></div>' +
      '<div class="row between wrap small muted" style="margin-top:6px"><span><b style="color:var(--good-fg)">' + hdecH(bh.approved) + '</b> ' + esc(t('approvedHours')) + ' · <b style="color:var(--blue)">' + hdecH(bh.pending) + '</b> ' + esc(t('pendingHours')) + '</span><span>' + hdecH(bh.scheduled) + ' ' + esc(t('scheduled').toLowerCase()) + '</span></div>';
  }
  function approvalLine(wa, v) {
    if (!wa) return h.chip(t('weekInProgress'), 'blue', true) + ' <span class="small muted">' + esc(t('notYetApprovable')) + '</span>';
    if (wa.status === 'approved') {
      var when = F.date(HQ.isoDate(wa.approvedAt), 'long');
      return '<span class="lock">' + I.lock + esc(v.role === 'client' ? t('approvedByBV', { date: when }) : t('approvedByOn', { name: (Dx.person(wa.approvedBy) || { first: '—' }).first, date: when })) + '</span>';
    }
    var od = overdueDays(wa);
    if (v.role === 'client') return h.chip(t('pendingReview'), 'warn', true);
    return (od ? h.chip(t('overdueDays', { n: od }), 'bad', true) : h.chip(t('pending'), 'warn', true)) + ' <span class="small muted">' + esc(t('dueOn', { date: F.date(wa.dueOn, 'long') })) + '</span>';
  }
  /* three tiles stay on one row on the phone: the value shrinks with the viewport instead of wrapping */
  function kpis(list) { return '<div class="grid2" style="grid-template-columns:repeat(' + list.length + ',1fr);gap:8px">' + list.map(function (k) { return h.kpi('<span style="font-size:clamp(17px,5.5vw,28px);white-space:nowrap">' + k[0] + '</span>', k[1], k[2]); }).join('') + '</div>'; }
  function dmWith(vaId) { var m = me(); return (D.channels || []).filter(function (c) { return c.kind === 'dm' && c.members.indexOf(m.id) >= 0 && c.members.indexOf(vaId) >= 0; })[0] || null; }
  /* a VA explains a flag to the manager: in their DM when one exists, otherwise in a new private support thread */
  function explainBtn() { var mgr = Dx.people().filter(function (p) { return p.role === 'manager'; })[0]; var dm = mgr ? dmWith(mgr.id) : null; return dm ? h.go(ico('chat') + ' ' + esc(t('explain')), 'channel', { id: dm.id }, 'btn-ghost btn-sm') : h.btn(ico('lock') + ' ' + esc(t('explain')), 'open-thread', 'btn-ghost btn-sm'); }
  function hubstaffBtn(small) { return h.btn(ico('camera') + ' ' + esc(t(small ? 'screenshots' : 'viewScreenshots')), 'toast', 'btn-ghost btn-sm', { msg: t('hubstaffToast') }); }
  function audit(action, target, detail) { D.auditLog.push({ id: newId('al'), at: nowIso(), by: me().id, action: action, target: target, detail: detail }); }
  function systemMsg(pl, text) { var ch = HQ.channelForPlacement(pl.id); if (ch) D.messages.push({ id: newId('msg'), channelId: ch.id, authorId: 'system', at: nowIso(), kind: 'system', audience: 'all', text: text }); }
  function toMin(hhmm) { var p = hhmm.split(':'); return (+p[0]) * 60 + (+p[1]); }
  function nowHHMM(tz) { var p = new Intl.DateTimeFormat('en-US', { timeZone: tz, hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(HQ.now()); var hh = (+p.filter(function (x) { return x.type === 'hour'; })[0].value) % 24, mm = +p.filter(function (x) { return x.type === 'minute'; })[0].value; return (hh < 10 ? '0' : '') + hh + ':' + (mm < 10 ? '0' : '') + mm; }
  /* the instant of a wall-clock time in a zone, as an ISO string carrying that zone's real offset on that date (DST-aware) */
  function isoAt(date, hhmm, tz) {
    var guess = Date.parse(date + 'T' + hhmm + ':00Z');
    var parts = new Intl.DateTimeFormat('en-US', { timeZone: tz, hour: 'numeric', minute: 'numeric', hour12: false, year: 'numeric', month: 'numeric', day: 'numeric' }).formatToParts(new Date(guess));
    var g = {}; parts.forEach(function (x) { g[x.type] = +x.value; });
    var local = Date.UTC(g.year, g.month - 1, g.day, g.hour % 24, g.minute);
    var offMin = Math.round((local - guess) / 60000), sign = offMin < 0 ? '-' : '+', a = Math.abs(offMin), hh = Math.floor(a / 60), mm = a % 60;
    return date + 'T' + hhmm + ':00' + sign + (hh < 10 ? '0' : '') + hh + ':' + (mm < 10 ? '0' : '') + mm;
  }

  HQ.pendingWeeks = function () { return D.weekApprovals.filter(function (w) { return w.status === 'pending'; }).sort(function (a, b) { return a.dueOn < b.dueOn ? -1 : a.dueOn > b.dueOn ? 1 : (a.placementId < b.placementId ? -1 : 1); }); };

  /* one time entry as a list row (staff and VA see activity and flags; clients see minutes and plain words) */
  function entryRow(e, pl, v, wa) {
    var isa = pl.tier === 'isa', locked = wa && wa.status === 'approved', staff = HQ.isStaff(), sub, mins = entryMin(e);
    if (v.role === 'client') sub = e.flag ? '<span class="small">' + esc(flagPlain(e.flag, pl, e.date)) + '</span>' : (e.note && !e.end ? '' : '');
    else {
      sub = (e.activity != null ? esc(F.pct(e.activity) + ' ' + t('activity')) : '<span class="muted">' + esc(t('inProgressNow')) + '</span>') + (isa && e.onCallMinutes != null ? ' · ' + F.hrs(e.onCallMinutes) + ' ' + esc(t('onCall')) : '') + ' · <span class="tiny">' + esc(e.edit ? t('manualEdit') : t('nightlyImport')) + '</span>';
      if (e.flag) sub += '<div style="margin-top:4px">' + flagChip(e.flag, true) + '</div>';
      if (e.note) sub += '<div class="tiny" style="margin-top:3px">' + esc(L(e.note)) + '</div>';
      if (e.edit) { var ed = e.edit; sub += '<div class="tiny muted" style="margin-top:3px">' + esc(t('beforeLbl')) + ': ' + (ed.originalStart ? esc(F.ampm(ed.originalStart)) + '–' : '') + (ed.originalEnd ? esc(F.ampm(ed.originalEnd)) : '') + (ed.originalMinutes != null ? ' · ' + F.hrs(ed.originalMinutes) + ' → ' + F.hrs(mins) : '') + ' · ' + esc((Dx.person(ed.by) || { first: '' }).first) + ' · ' + esc(L(ed.reason)) + '</div>'; }
    }
    sub += '<div class="row wrap" style="gap:6px;margin-top:6px">' + hubstaffBtn(true) + (staff && !locked && e.end ? h.btn(ico('doc') + ' ' + esc(t('editEntry')), 'edit-entry', 'btn-ghost btn-sm', { id: e.id }) : '') + '</div>';
    return h.li({ lead: '<span class="hash">' + ico('hours', 18) + '</span>', title: rangeClk(e), sub: sub, trail: '<span class="num b" style="color:var(--fg)">' + F.hrs(mins) + '</span>' });
  }
  function dayRows(entries, pl, v, wa) {
    if (!entries.length) return h.empty(t('noTrackedTime'), '');
    return byDay(entries).map(function (d) { return '<div class="sgroup" style="padding-left:0">' + esc(F.date(d.date, 'long')) + '<span class="num">' + F.hrs(sumMin(d.entries)) + '</span></div><div class="list">' + d.entries.map(function (e) { return entryRow(e, pl, v, wa); }).join('') + '</div>'; }).join('');
  }
  function thisWeekRows() {
    var ws = weekStartOf(Dx.today());
    return Dx.activePlacements().map(function (pl) {
      var va = Dx.person(pl.vaId), cl = Dx.client(pl.clientId), st = HQ.status(pl), mins = sumMin(entriesOf(pl.id, ws, addDays(ws, 6)));
      return h.li({ lead: h.avatar(va, '', st.live ? 'live' : ''), title: esc(va.first) + ' <span class="small muted">· ' + esc(cl.name) + '</span>', sub: h.statusPill(pl), trail: '<span class="num b" style="color:var(--fg)">' + F.hrs(mins) + '</span><br><span class="tiny muted">/ ' + pl.hoursPerWeek + ' h</span>', go: 'placement', params: { id: pl.id } });
    }).join('') || h.empty(t('nothingHere'), '');
  }
  function weekRow(wa, v, compact) {
    var pl = Dx.placement(wa.placementId), va = Dx.person(pl.vaId), cl = Dx.client(pl.clientId), od = overdueDays(wa), open = unresolved(wa).length;
    var hrs = hdecH(wa.status === 'approved' ? wa.approvedHours : wa.trackedHours) + ' / ' + hdecH(wa.scheduledHours);
    var flags = (wa.flags || []).length ? t(wa.flags.length === 1 ? 'flag1' : 'flagsN', { n: wa.flags.length }) + (open ? ' · <span style="color:var(--bad-fg)">' + esc(t('flagsOpen', { n: open })) + '</span>' : '') : t('noFlags');
    var trail = wa.status === 'approved' ? h.chip(t('weekApprovedLbl'), 'good', true) : od ? h.chip(t('overdueDays', { n: od }), 'bad', true) : h.chip(t('pending'), 'warn', true);
    if (compact) return h.li({ title: esc(rangeLbl(wa.weekStart, wa.weekEnd)) + ' <span class="small muted num">· ' + hrs + '</span>', sub: flags, trail: trail, go: 'week', params: { id: wa.id } });
    return h.li({ lead: h.avatar(va), title: esc(va.name) + ' <span class="small muted">· ' + esc(cl.name) + '</span>', sub: rangeLbl(wa.weekStart, wa.weekEnd) + ' · ' + hrs + ' · ' + flags, trail: trail, go: 'week', params: { id: wa.id } });
  }

  /* ---------- hours (role-aware) ---------- */
  HQ.V.hours = function (p) {
    var v = me();
    if (HQ.isStaff()) return staffHours(p, v);
    if (v.role === 'va') return vaHours(p, v);
    if (v.role === 'client') return clientHours(p, v);
    return { title: t('hours'), body: h.empty(t('nothingHere'), t('notPlacedHours')) };
  };
  function staffHours(p, v) {
    var pend = HQ.pendingWeeks(); var clean = pend.filter(function (w) { return !unresolved(w).length; });
    var s = h.sec(t('weeksToApprove'), '<span class="small muted">' + pend.length + '</span>');
    s += '<div class="card flat tight"><div class="list">' + (pend.length ? pend.map(function (w) { return weekRow(w, v); }).join('') : h.empty(t('allApproved'), t('allApprovedSub'))) + '</div>';
    if (pend.length) s += '<div class="row wrap" style="gap:8px;margin-top:10px">' + h.btn(ico('check') + ' ' + esc(t('approveAllClean')) + (clean.length ? ' (' + clean.length + ')' : ''), 'approve-all-clean', 'btn-gold btn-sm') + '<span class="small muted">' + esc(t('approveRecords')) + '</span></div>';
    s += '</div>';
    s += h.sec(t('recentApproved'));
    Dx.activePlacements().forEach(function (pl) {
      var va = Dx.person(pl.vaId), cl = Dx.client(pl.clientId), done = weeksOf(pl.id).filter(function (w) { return w.status === 'approved'; }).slice(0, 3);
      s += '<div class="sgroup" style="padding-left:0">' + esc(va.first + ' · ' + cl.name) + h.go(esc(t('placement')), 'placement', { id: pl.id }, 'btn-ghost btn-sm') + '</div><div class="card flat tight"><div class="list">' + (done.length ? done.map(function (w) { return weekRow(w, v); }).join('') : h.empty(t('nothingHere'), '')) + '</div></div>';
    });
    var wk = h.sec(t('thisWeekSoFar'), '<span class="small muted">' + esc(rangeLbl(weekStartOf(Dx.today()), addDays(weekStartOf(Dx.today()), 6))) + '</span>') + '<div class="card flat tight"><div class="list">' + thisWeekRows() + '</div></div>';
    var out = { title: t('hours'), sub: esc(t('hoursApprovedMonday')), actions: '<button class="iconbtn" data-go="outages" aria-label="' + esc(t('outages')) + '">' + I.alert + '</button>' };
    if (isPhone()) out.body = s + wk; else { out.body = s; out.pane = '<div style="padding:16px">' + wk + '</div>'; }
    return out;
  }
  function vaHours(p, v) {
    var pl = Dx.placementForVa(v.id);
    if (!pl) return { title: t('myHours'), body: h.empty(t('noPlacementYet'), t('notPlacedHours')) };
    var cl = Dx.client(pl.clientId), thisWs = weekStartOf(Dx.today());
    var opts = [{ v: thisWs, l: t('thisWeek') }]; weeksOf(pl.id).forEach(function (w) { if (w.weekStart !== thisWs) opts.push({ v: w.weekStart, l: rangeLbl(w.weekStart, w.weekEnd) }); });
    var ws = p.w && opts.some(function (o) { return o.v === p.w; }) ? p.w : thisWs, we = addDays(ws, 6), wa = waFor(pl.id, ws), entries = entriesOf(pl.id, ws, we), tracked = sumMin(entries);
    var s = h.seg(opts, ws, 'hours-week') + '<div class="card" style="margin-top:12px"><div class="card-head"><h3>' + esc(t('weekLbl', { range: rangeLbl(ws, we) })) + '</h3><span class="num b">' + F.hrs(tracked) + ' <span class="muted small">/ ' + pl.hoursPerWeek + ' h</span></span></div>';
    s += h.progress(tracked / 60 / pl.hoursPerWeek * 100, 'gold') + '<div style="margin:10px 0 4px">' + approvalLine(wa, v) + (wa ? ' ' + h.go(esc(t('view')), 'week', { id: wa.id }, 'btn-ghost btn-sm') : '') + '</div>';
    s += '<p class="tiny muted" style="margin-bottom:6px">' + esc(t('timesInYourZone', { tz: F.tz(v.tz) })) + ' · ' + esc(cl.name) + ' ' + esc(F.tz(cl.tz)) + '</p>' + dayRows(entries, pl, v, wa) + '</div>';
    if (wa && (wa.flags || []).length) s += '<div class="card" style="margin-top:12px"><h3>' + esc(t('flagged')) + '</h3><div class="list">' + wa.flags.map(function (f) { var ok = f.resolved || wa.status === 'approved'; return h.li({ lead: '<span class="hash">' + ico('flag', 18) + '</span>', title: flagChip(f.kind, ok) + (f.date ? ' <span class="small muted">' + esc(F.date(f.date, 'long')) + '</span>' : ''), sub: esc(flagText(f)) + (ok ? '' : '<div style="margin-top:6px">' + explainBtn() + '</div>'), trail: ok ? h.chip(t('resolved'), 'good') : h.chip(t('toResolve'), 'warn') }); }).join('') + '</div></div>';
    var bh = blockHours(pl, D.block);
    s += '<div class="card" style="margin-top:12px"><div class="card-head"><h3>' + esc(t('hoursThisBlock')) + '</h3><span class="small muted">' + esc(rangeLbl(D.block.start, D.block.end)) + '</span></div>' + kpis([[hdecH(bh.approved), t('hoursApprovedLbl'), 'good'], [hdecH(bh.pending), t('pending'), 'gold'], [hdecH(bh.scheduled), t('scheduled')]]) + '<div style="margin-top:10px">' + blockBar(bh) + '</div><p class="small muted" style="margin-top:8px">' + esc(t('hoursApprovedMonday')) + '</p></div>';
    s += '<div class="row wrap" style="gap:8px;margin-top:14px">' + h.go(ico('alert') + ' ' + esc(t('logOutage')), 'outages', { add: '1' }, 'btn-gold btn-sm') + hubstaffBtn() + h.go(ico('calendar') + ' ' + esc(t('declareDay')), 'timeoff', {}, 'btn-ghost btn-sm') + h.go(esc(t('placement')), 'placement', { id: pl.id }, 'btn-ghost btn-sm') + '</div>';
    return { title: t('myHours'), sub: esc(cl.name), body: s };
  }
  function clientHours(p, v) {
    var pls = Dx.placementForClient(v.clientId);
    if (!pls.length) return { title: t('hours'), body: h.empty(t('nothingHere'), '') };
    var blk = p.b === 'last' ? prevBlock() : D.block;
    var s = h.seg([{ v: 'this', l: t('thisBlock') + ' · ' + rangeLbl(D.block.start, D.block.end) }, { v: 'last', l: t('lastBlock') + ' · ' + rangeLbl(prevBlock().start, prevBlock().end) }], p.b === 'last' ? 'last' : 'this', 'hours-block');
    pls.forEach(function (pl) {
      var va = Dx.person(pl.vaId), bh = blockHours(pl, blk);
      s += '<div class="card" style="margin-top:12px"><div class="row" style="gap:10px">' + h.avatar(va, '', HQ.status(pl).live ? 'live' : '') + '<div class="grow"><div class="b" style="color:var(--fg)">' + esc(Dx.vaLabel(va, v)) + ' · ' + esc(Dx.tierShort(pl.tier)) + '</div><div class="small muted">' + esc(schedLine(pl, v.tz)) + '</div></div></div><div style="margin-top:12px">' + kpis([[hdecH(bh.approved), t('hoursApprovedLbl'), 'good'], [hdecH(bh.pending), t('pending'), 'gold'], [hdecH(bh.scheduled), t('scheduled')]]) + '</div><div style="margin-top:10px">' + blockBar(bh) + '</div><p class="small muted" style="margin-top:8px">' + esc(t('hoursApprovedMonday')) + ' ' + esc(t('trueUpNote')) + '</p></div>';
      bh.weeks.forEach(function (w) {
        if (w.ws > Dx.today()) return;
        var entries = entriesOf(pl.id, w.ws, w.we);
        s += '<div class="card" style="margin-top:12px"><div class="card-head"><h3>' + esc(t('weekLbl', { range: rangeLbl(w.ws, w.we) })) + '</h3><span class="num b">' + hdecH(w.wa && w.wa.status === 'approved' ? w.wa.approvedHours : w.tracked) + '</span></div><div style="margin-bottom:8px">' + approvalLine(w.wa, v) + '</div>' + dayRows(entries, pl, v, w.wa) + '</div>';
      });
    });
    s += '<div class="row wrap" style="gap:8px;margin-top:14px">' + hubstaffBtn() + h.btn(ico('flag') + ' ' + esc(t('escalate')), 'open-escalate', 'btn-red btn-sm', { id: pls[0].id }) + '</div><p class="tiny muted" style="margin-top:10px">' + esc(t('screenshotsNote')) + '</p>';
    return { title: t('hours'), sub: esc(t('hoursApprovedMonday')), body: s };
  }

  /* ---------- week (the approval screen) ---------- */
  HQ.V.week = function (p) {
    var v = me(); var wa = waById(p.id);
    if (!wa) { var pl0 = Dx.placement(p.id); if (pl0 && pl0.schedule) { var ws0 = weeksOf(pl0.id); wa = ws0.filter(function (w) { return w.status === 'pending'; })[0] || ws0[0] || null; } }
    var pl = wa ? Dx.placement(wa.placementId) : null;
    if (!wa || !canSee(pl, v)) return { title: t('week'), body: h.empty(t('nothingHere'), '') };
    var cl = Dx.client(pl.clientId), va = Dx.person(pl.vaId), staff = HQ.isStaff(), locked = wa.status === 'approved', open = unresolved(wa), isa = pl.tier === 'isa';
    var entries = entriesOf(pl.id, wa.weekStart, wa.weekEnd), tracked = sumMin(entries) / 60;
    var s = '<div class="card"><div class="row" style="gap:12px">' + h.avatar(va) + '<div class="grow"><div class="b" style="color:var(--fg)">' + esc(Dx.vaLabel(va, v)) + ' <span class="muted">· ' + esc(cl.name) + '</span></div><div class="small muted">' + esc(Dx.tierShort(pl.tier)) + ' · ' + pl.hoursPerWeek + ' ' + esc(t('hPerWeek')) + ' · ' + esc(schedLine(pl, cl.tz)) + '</div></div></div>';
    if (v.role !== 'client') { var pay = h.money('pay', pl.payRate, { rate: true }), bill = h.money('bill', pl.billRate, { rate: true }); if (pay || bill) s += '<div class="row wrap small muted" style="gap:14px;margin-top:8px">' + (pay ? '<span>' + esc(t('payRate')) + ' ' + pay + '</span>' : '') + (bill ? '<span>' + esc(t('billRate')) + ' ' + bill + '</span>' : '') + '</div>'; }
    s += '<div style="margin-top:10px">' + approvalLine(wa, v) + '</div>';
    s += '<div style="margin-top:12px">' + kpis([[hdecH(wa.scheduledHours), t('scheduled')], [hdecH(tracked), t('tracked')], locked ? [hdecH(wa.approvedHours), t('hoursApprovedLbl'), 'good'] : [hdecH(tracked), t('toApprove'), 'gold']]) + '</div>';
    if (locked) s += '<div style="margin-top:10px">' + h.note('<span class="lock" style="color:inherit">' + I.lock + esc(t('lockedNote')) + '</span>', 'good') + '</div>';
    s += '</div>';
    /* entries by day */
    s += h.sec(t('entries'), '<span class="tiny muted">' + esc(t('timesInYourZone', { tz: F.tz(v.tz) })) + (v.tz !== cl.tz ? ' · ' + esc(cl.name) + ' ' + esc(F.tz(cl.tz)) : '') + '</span>') + '<div class="card flat tight">' + dayRows(entries, pl, v, wa) + '</div>';
    /* flags */
    s += h.sec(t('flagged'), (wa.flags || []).length ? '<span class="small muted">' + wa.flags.length + (open.length ? ' · <span style="color:var(--bad-fg)">' + esc(t('flagsOpen', { n: open.length })) + '</span>' : '') + '</span>' : '') + '<div class="card flat tight"><div class="list">';
    if (!(wa.flags || []).length) s += h.empty(t('noFlags'), '');
    (wa.flags || []).forEach(function (f, i) {
      var ok = f.resolved || locked, sub = v.role === 'client' ? esc(flagPlain(f.kind, pl, f.date)) : esc(flagText(f));
      if (staff && !ok) { var dm = dmWith(va.id); sub += '<div class="row wrap" style="gap:6px;margin-top:8px">' + h.btn(ico('check') + ' ' + esc(t('keep')), 'flag-keep', 'btn-blue btn-sm', { id: wa.id, i: i }) + (f.entryId && entryById(f.entryId) ? h.btn(ico('doc') + ' ' + esc(t('trim')), 'edit-entry', 'btn-ghost btn-sm', { id: f.entryId }) : '') + (dm ? h.go(ico('chat') + ' ' + esc(t('askVa', { name: va.first })), 'channel', { id: dm.id }, 'btn-ghost btn-sm') : '') + '</div>'; }
      s += h.li({ lead: '<span class="hash">' + ico('flag', 18) + '</span>', title: flagChip(f.kind, ok) + (f.date ? ' <span class="small muted">' + esc(F.date(f.date, 'long')) + '</span>' : ''), sub: sub, trail: ok ? h.chip(t('resolved'), 'good') : h.chip(t('toResolve'), 'warn') });
    });
    s += '</div></div>';
    /* outages in the week */
    var outs = D.outages.filter(function (o) { return o.placementId === pl.id && HQ.isoDate(o.at) >= wa.weekStart && HQ.isoDate(o.at) <= wa.weekEnd; });
    if (outs.length) s += h.sec(t('outages'), h.go(esc(t('seeAll')), 'outages', {}, 'btn-ghost btn-sm')) + '<div class="card flat tight"><div class="list">' + outs.map(function (o) { return outageRow(o, v); }).join('') + '</div></div>';
    /* approve */
    if (staff && !locked) s += '<div class="card" style="margin-top:16px;position:sticky;bottom:0">' + h.btn(ico('lock', 18) + ' ' + esc(t('approveAndLock')) + ' · ' + hdecH(tracked), 'approve-week', 'btn-gold btn-lg btn-block', { id: wa.id }, open.length ? 'disabled' : '') + '<p class="small muted" style="margin-top:8px;text-align:center">' + esc(open.length ? t('resolveFirst') : t('approveRecords')) + '</p></div>';
    var pane = '<div style="padding:16px"><div class="sgroup" style="padding-left:0">' + esc(t('placement')) + '</div><div class="card flat tight">' + h.person(va, Dx.tierShort(pl.tier)) + '<div style="margin:10px 0">' + h.statusPill(pl) + '</div><div class="row wrap" style="gap:6px">' + h.go(esc(t('placement')), 'placement', { id: pl.id }, 'btn-ghost btn-sm') + (HQ.channelForPlacement(pl.id) ? h.go(esc(t('chanLink')), 'channel', { id: HQ.channelForPlacement(pl.id).id }, 'btn-ghost btn-sm') : '') + '</div></div><div class="sgroup" style="padding-left:0">' + esc(t('otherWeeks')) + '</div><div class="card flat tight"><div class="list">' + weeksOf(pl.id).filter(function (w) { return w.id !== wa.id; }).slice(0, 4).map(function (w) { return weekRow(w, v, true); }).join('') + '</div></div></div>';
    return { title: t('weekLbl', { range: rangeLbl(wa.weekStart, wa.weekEnd) }), sub: esc(Dx.vaLabel(va, v) + ' · ' + cl.name), body: s, pane: staff && !isPhone() ? pane : null, actions: HQ.channelForPlacement(pl.id) ? '<button class="iconbtn" data-go="channel" data-id="' + HQ.channelForPlacement(pl.id).id + '" aria-label="' + esc(t('chanLink')) + '">' + I.chat + '</button>' : '' };
  };

  /* ---------- placements (staff list) ---------- */
  HQ.V.placements = function (p) {
    var v = me();
    if (!HQ.isStaff()) return { title: t('placements'), body: h.empty(t('nothingHere'), t('staffOnly')) };
    var f = p.f || 'all'; var list = (D.placements || []).filter(function (pl) { return f === 'all' || pl.status === f; });
    var s = h.seg([{ v: 'all', l: t('all') }, { v: 'active', l: t('active') }, { v: 'ended', l: t('ended') }], f, 'placements-filter') + '<div class="card flat tight" style="margin-top:12px"><div class="list">';
    if (!list.length) s += h.empty(t('nothingHere'), '');
    list.forEach(function (pl) {
      var va = Dx.person(pl.vaId), cl = Dx.client(pl.clientId), next = (pl.checkpoints || []).filter(function (c) { return !c.done; })[0];
      var sub = esc(Dx.tierShort(pl.tier)) + ' · ' + pl.hoursPerWeek + ' ' + esc(t('hPerWeek')) + ' · ' + esc(t('start')) + ' ' + esc(F.date(pl.start)) + (pl.end ? ' – ' + esc(F.date(pl.end)) : '');
      if (next) sub += ' · ' + esc(t('cpNext')) + ': ' + esc(t('dayN')) + ' ' + next.day + ' · ' + esc(F.date(next.due)) + (F.daysUntil(next.due) < 0 ? ' <span style="color:var(--bad-fg)">(' + esc(t('overdue').toLowerCase()) + ')</span>' : '');
      if (pl.fitWindowEnds) sub += ' · ' + esc(t('fitUntil')) + ' ' + esc(F.date(pl.fitWindowEnds));
      var bill = h.money('bill', pl.billRate, { rate: true }); if (bill) sub += ' · ' + esc(t('billRate')) + ' ' + bill;
      if (pl.replaces || pl.replacedBy) sub += '<div style="margin-top:4px">' + h.chip((pl.replaces ? pl.replaces + ' → ' : '') + pl.id + (pl.replacedBy ? ' → ' + pl.replacedBy : ''), 'blue') + '</div>';
      s += h.li({ lead: h.avatar(va, '', HQ.status(pl).live ? 'live' : ''), title: esc(cl.name) + ' <span class="small muted">· ' + esc(va.name) + '</span>', sub: sub, trail: h.statusChip(pl.status), go: 'placement', params: { id: pl.id } });
    });
    s += '</div></div><div style="margin-top:12px">' + h.btn(I.plus + esc(t('newPlacement')), 'toast', 'btn-ghost btn-sm', { msg: t('newPlacementToast') }) + '</div>';
    return { title: t('placements'), sub: list.length + ' · ' + esc(t(f)), body: s };
  };

  /* ---------- placement (role-aware page) ---------- */
  function cpTimeline(pl, staff) {
    var first = true;
    return '<div class="timeline">' + (pl.checkpoints || []).map(function (c) {
      var chip, act = '';
      if (c.done) chip = h.chip(t('done') + ' · ' + F.date(c.done), 'good', true);
      else { var n = F.daysUntil(c.due); chip = n < 0 ? h.chip(t('overdue'), 'bad', true) : h.chip(t('dueOn', { date: F.date(c.due) }) + (n <= 30 ? ' · ' + t('daysLeft', { n: n }) : ''), 'blue', true); if (staff && first && pl.status === 'active') act = ' ' + h.btn(ico('calendar') + ' ' + esc(t('scheduleCp')), 'toast', 'btn-ghost btn-sm', { msg: t('scheduleToast') }); first = false; }
      return '<div class="tl"><div class="when">' + esc(F.date(c.due, 'long')) + '</div><b>' + esc(t('cpDay', { n: c.day })) + '</b> ' + chip + act + '</div>';
    }).join('') + '</div>';
  }
  function guaranteeCard(pl, v) {
    var staff = HQ.isStaff(), s = '<div class="card"><h3>' + esc(t('guarantees')) + '</h3><div class="stack" style="gap:6px">';
    s += '<div class="row between"><span class="muted small">' + esc(t('seatSince')) + '</span><span class="b">' + esc(F.date(pl.seatStart, 'long')) + '</span></div>';
    if (pl.fitWindowEnds) { var n = F.daysUntil(pl.fitWindowEnds); s += '<div class="row between"><span class="muted small">' + esc(t('fitGuarantee')) + ' · ' + esc(t('fitUntil').toLowerCase()) + '</span><span class="b">' + esc(F.date(pl.fitWindowEnds, 'long')) + (n >= 0 ? ' <span class="small muted">(' + esc(t('daysLeft', { n: n })) + ')</span>' : '') + '</span></div>'; }
    if (pl.replacementWindowEnds) s += '<div class="row between"><span class="muted small">' + esc(t('replacementGuarantee')) + ' · ' + esc(t('replUntil').toLowerCase()) + '</span><span class="b">' + esc(F.date(pl.replacementWindowEnds, 'long')) + '</span></div>';
    if (staff && (pl.replaces || pl.replacedBy)) {
      var chain = []; var cur = pl; while (cur && cur.replaces && Dx.placement(cur.replaces)) cur = Dx.placement(cur.replaces);
      while (cur) { chain.push(cur); cur = cur.replacedBy ? Dx.placement(cur.replacedBy) : null; }
      s += '<div class="muted small" style="margin-top:6px">' + esc(t('chain')) + '</div><div class="row wrap" style="gap:6px">' + chain.map(function (c) { var cva = Dx.person(c.vaId); return h.go(esc(cva ? cva.first : c.id) + ' <span class="tiny" style="opacity:.8">' + esc(c.id) + '</span>', 'placement', { id: c.id }, c.id === pl.id ? 'btn-blue btn-sm' : 'btn-ghost btn-sm'); }).join('<span class="muted">→</span>') + '</div>';
      if (pl.endReason) s += '<div class="small muted">' + esc(L(pl.endReason)) + '</div>';
    }
    return s + '</div></div>';
  }
  function expectationsCard(pl, v) {
    var lang = HQ.lang(), other = lang === 'es' ? 'en' : 'es', ex = pl.expectations || {};
    var s = '<div class="card"><h3>' + esc(t('expectations')) + '</h3><p>' + esc(ex[lang] || ex.en || '') + '</p>';
    if (v.role !== 'client' && ex[other]) s += '<details style="margin-top:8px"><summary class="small muted" style="cursor:pointer">' + (other === 'en' ? 'English' : 'Español') + '</summary><p class="small muted" style="margin-top:6px">' + esc(ex[other]) + '</p></details>';
    return s + '</div>';
  }
  function scheduleCard(pl, v) {
    var cl = Dx.client(pl.clientId), va = Dx.person(pl.vaId), zones = [v.tz];
    [cl.tz, va && va.tz].forEach(function (z) { if (z && zones.indexOf(z) < 0) zones.push(z); });
    var s = '<div class="card"><h3>' + esc(t('schedule')) + '</h3><div class="b" style="font-size:17px;color:var(--fg)">' + esc(schedLine(pl, zones[0])) + '</div>';
    s += zones.slice(1).map(function (z) { return '<div class="small muted">' + esc(schedLine(pl, z)) + ' · ' + esc(z === cl.tz ? t('clientTime') : t('vaTime')) + '</div>'; }).join('');
    return s + '<div class="tiny muted" style="margin-top:6px">' + esc(t('bothZones')) + '</div></div>';
  }
  function hoursCard(pl, v) {
    var bh = blockHours(pl, D.block), last = HQ.lastReportFor(pl.id), ch = HQ.channelForPlacement(pl.id);
    var s = '<div class="card"><div class="card-head"><h3>' + esc(t('hoursThisBlock')) + '</h3>' + h.go(esc(t('hours')), 'hours', {}, 'btn-ghost btn-sm') + '</div>' + blockBar(bh);
    s += '<div class="row between wrap" style="margin-top:12px;gap:8px"><span class="small"><span class="muted">' + esc(t('lastReport')) + ':</span> ' + (last ? esc(F.dayLabel(HQ.isoDate(last.at))) + ' · ' + F.time(last.at, v.tz) : esc(t('noReportYet'))) + '</span>' + (ch ? h.go(esc(t('allReports')), 'channel', { id: ch.id }, 'btn-ghost btn-sm') : '') + '</div></div>';
    return s;
  }
  function ratesCard(pl, va, v) {
    var pay = h.money('pay', pl.payRate, { rate: true }), bill = h.money('bill', pl.billRate, { rate: true }), mg = h.money('margin', pl.billRate - pl.payRate, { rate: true });
    if (!pay && !bill && !mg) return '';
    var s = '<div class="card"><h3>' + esc(t('rate')) + '</h3><div class="stack" style="gap:6px">';
    if (pay) s += '<div class="row between"><span class="muted small">' + esc(t('payRate')) + '</span>' + pay + '</div>';
    if (bill) s += '<div class="row between"><span class="muted small">' + esc(t('billRate')) + '</span>' + bill + '</div>';
    if (mg) s += '<div class="row between"><span class="muted small">' + esc(t('marginPerHour')) + '</span>' + mg + '</div>';
    if (pay && va && (va.payHistory || []).length) s += '<div class="muted small" style="margin-top:6px">' + esc(t('payHistory')) + '</div>' + va.payHistory.map(function (ph) { return '<div class="small"><span class="muted">' + esc(F.date(ph.from)) + '</span> · ' + h.money('pay', ph.rate, { rate: true }) + (ph.reason ? ' <span class="muted">· ' + esc(L(ph.reason)) + '</span>' : '') + '</div>'; }).join('');
    return s + '</div></div>';
  }
  HQ.V.placement = function (p) {
    var v = me(); var pl = p.id ? Dx.placement(p.id) : null;
    if (!pl || !pl.schedule) { if (v.role === 'client') pl = Dx.placementForClient(v.clientId)[0]; else if (v.role === 'va') pl = Dx.placementForVa(v.id); else if (HQ.isStaff() && !p.id) return HQ.V.placements(p); }
    if (!pl || !canSee(pl, v)) return { title: t('placement'), body: h.empty(v.role === 'va' ? t('noPlacementYet') : t('nothingHere'), v.role === 'va' ? t('notPlacedHours') : '') };
    var cl = Dx.client(pl.clientId), va = Dx.person(pl.vaId), staff = HQ.isStaff(), ch = HQ.channelForPlacement(pl.id), st = HQ.status(pl);
    var s = '<div class="card"><div class="row" style="gap:12px;align-items:flex-start">' + h.avatar(va, 'lg', st.live ? 'live' : '') + '<div class="grow"><h2 style="font-size:22px">' + esc(Dx.vaLabel(va, v)) + ' <span class="muted small">· ' + esc(Dx.tierShort(pl.tier)) + '</span></h2><div class="small muted">' + (v.role === 'client' ? esc(t('withYouSince', { date: F.date(pl.start, 'long') })) : esc(cl.name) + ' · ' + esc(cl.city) + ' · ' + esc(t('since').toLowerCase()) + ' ' + esc(F.date(pl.start))) + ' · ' + pl.hoursPerWeek + ' ' + esc(t('hPerWeek')) + '</div><div style="margin-top:8px">' + (pl.status === 'active' ? h.statusPill(pl) : h.statusChip(pl.status)) + '</div></div></div>';
    var btns = '';
    if (staff) {
      (cl.logins || [cl.contactId]).forEach(function (lid) { var lp = Dx.person(lid); if (lp) btns += h.btn(ico('eye') + ' ' + esc(cl.logins && cl.logins.length > 1 ? t('viewAsPick', { name: lp.first }) : t('viewAsClient')), 'view-as', 'btn-blue btn-sm', { id: lid }); });
      if (ch) btns += h.go(ico('chat') + ' ' + esc(t('chanLink')), 'channel', { id: ch.id }, 'btn-ghost btn-sm');
      if (pl.status === 'active') btns += h.btn(esc(t('pauseP')), 'toast', 'btn-ghost btn-sm', { msg: t('pauseToast') }) + h.btn(esc(t('endP')), 'toast', 'btn-danger btn-sm', { msg: t('pauseToast') });
    } else if (v.role === 'client') { if (ch) btns += h.go(ico('chat') + ' ' + esc(t('messageVa', { name: va.first })), 'channel', { id: ch.id }, 'btn-blue btn-sm'); btns += h.btn(ico('flag') + ' ' + esc(t('escalate')), 'open-escalate', 'btn-red btn-sm', { id: pl.id }); }
    else if (ch) btns += h.go(ico('chat') + ' ' + esc(t('chanLink')), 'channel', { id: ch.id }, 'btn-blue btn-sm');
    s += '<div class="row wrap" style="gap:8px;margin-top:12px">' + btns + '</div></div>';
    s += '<div class="stack" style="margin-top:12px">' + scheduleCard(pl, v) + expectationsCard(pl, v);
    s += '<div class="card"><h3>' + esc(t('checkpoints')) + '</h3>' + cpTimeline(pl, staff) + '</div>' + guaranteeCard(pl, v);
    if (v.role !== 'client') s += ratesCard(pl, va, v);
    s += hoursCard(pl, v);
    var links = h.go(ico('shield') + ' ' + esc(t('scopeCard')), 'scope', { id: pl.id }, 'btn-ghost btn-sm');
    if (v.role === 'client') links += h.go(ico('money') + ' ' + esc(t('invoices')), 'billing', {}, 'btn-ghost btn-sm') + h.go(ico('report') + ' ' + esc(t('reports')), 'report', {}, 'btn-ghost btn-sm');
    if (staff) links += h.go(ico('hours') + ' ' + esc(t('hours')), 'week', { id: pl.id }, 'btn-ghost btn-sm') + h.go(ico('report') + ' ' + esc(t('reports')), 'report', {}, 'btn-ghost btn-sm') + h.go(ico('shield') + ' ' + esc(t('compliance')), 'compliance', {}, 'btn-ghost btn-sm') + h.go(ico('user') + ' ' + esc(va.first), 'person', { id: va.id }, 'btn-ghost btn-sm');
    if (v.role === 'va') { var bud = Dx.person(va.buddyId); if (bud) links += h.go(ico('people') + ' ' + esc(t('buddy')) + ': ' + esc(bud.first), 'person', { id: bud.id }, 'btn-ghost btn-sm'); links += h.go(ico('money') + ' ' + esc(t('payouts')), 'payouts', {}, 'btn-ghost btn-sm'); }
    s += '<div class="row wrap" style="gap:8px">' + links + '</div></div>';
    return { title: v.role === 'client' ? t('myVA') : t('placement'), sub: esc(v.role === 'client' ? va.first + ' · ' + Dx.tierShort(pl.tier) : va.name + ' · ' + cl.name), body: s };
  };

  /* ---------- outages ---------- */
  function outageRow(o, v) {
    var pl = Dx.placement(o.placementId), cl = pl ? Dx.client(pl.clientId) : null, va = Dx.person(o.vaId), by = Dx.person(o.reportedBy);
    var sub = esc(F.date(HQ.isoDate(o.at), 'long')) + ' · ' + F.time2(o.at, cl ? cl.tz : null) + ' · ' + (o.minutes != null ? F.hrs(o.minutes) : '<span class="chip warn" style="font-size:11px">' + esc(t('ongoing')) + '</span>');
    if (v.role !== 'client') sub += (o.note ? '<div class="small" style="margin-top:3px">' + esc(L(o.note)) + '</div>' : '') + '<div class="tiny muted">' + esc(t('loggedBy')) + ' ' + esc(by ? by.first : '—') + (cl ? ' · ' + esc(cl.name) : '') + '</div>';
    return h.li({ lead: '<span class="hash">' + ico(o.cause === 'power' ? 'alert' : 'globe', 18) + '</span>', title: esc(o.cause === 'power' ? t('powerOut') : t('internetOut')) + ' <span class="small muted">· ' + esc(Dx.vaLabel(va, v)) + '</span>', sub: sub, trail: o.ongoing ? h.chip(t('ongoing'), 'warn', true) : '' });
  }
  HQ.V.outages = function (p) {
    var v = me(), list = D.outages.filter(function (o) { var pl = Dx.placement(o.placementId); return pl && canSee(pl, v); }).sort(function (a, b) { return Date.parse(b.at) - Date.parse(a.at); });
    var canAdd = v.role === 'va' ? !!Dx.placementForVa(v.id) : HQ.isStaff();
    var s = '<div class="card flat tight"><div class="list">' + (list.length ? list.map(function (o) { return outageRow(o, v); }).join('') : h.empty(t('noOutages'), t('noOutagesSub'))) + '</div></div>';
    if (canAdd) s += '<div style="margin-top:12px">' + h.btn(I.plus + esc(t('logOutage')), 'log-outage', 'btn-gold') + '</div>';
    return { title: t('outageLog'), sub: esc(t('screenshotsNote')), body: s, after: function () { if (p.add && canAdd && !document.getElementById('sheet')) HQ.act['log-outage'](); } };
  };
  function outageSheet() {
    var v = me(), pls = v.role === 'va' ? [Dx.placementForVa(v.id)].filter(Boolean) : Dx.activePlacements();
    if (!pls.length) { HQ.toast(t('notPlacedHours')); return; }
    var sel = pls.length > 1 ? h.field(t('placement'), '<select class="inp" name="pid">' + pls.map(function (pl) { return '<option value="' + pl.id + '">' + esc(Dx.person(pl.vaId).name + ' · ' + Dx.client(pl.clientId).name) + '</option>'; }).join('') + '</select>') : '<input type="hidden" name="pid" value="' + pls[0].id + '">';
    var s = sel + h.field(t('cause'), h.seg([{ v: 'internet', l: t('internetOut') }, { v: 'power', l: t('powerOut') }], 'internet', 'out-cause') + '<input type="hidden" name="cause" value="internet">');
    s += '<div class="grid2">' + h.field(t('date'), '<input class="inp" type="date" name="date" value="' + Dx.today() + '">') + h.field(t('startedAt'), '<input class="inp" type="time" name="start" value="' + nowHHMM(v.tz) + '">', t('timesInYourZone', { tz: F.tz(v.tz) })) + '</div>';
    s += '<div class="field"><label class="row" style="gap:8px;cursor:pointer"><input type="checkbox" name="ongoing" id="out-ongoing" checked> ' + esc(t('stillOngoing')) + '</label></div>';
    s += '<div id="out-endwrap" hidden>' + h.field(t('endedAt'), '<input class="inp" type="time" name="end" value="' + nowHHMM(v.tz) + '">') + '</div>';
    s += h.field(t('notes'), '<textarea class="inp" name="note" rows="2"></textarea>', t('outageNoteHint'));
    s += '<div id="out-err" class="note bad" hidden></div><div class="row" style="gap:8px;margin-top:4px">' + h.btn(I.send + esc(t('send')), 'save-outage', 'btn-gold') + h.btn(esc(t('cancel')), 'close-sheet', 'btn-ghost') + '</div>';
    HQ.sheet(s, t('logOutage'));
    var cb = document.getElementById('out-ongoing'), wrap = document.getElementById('out-endwrap');
    if (cb && wrap) cb.addEventListener('change', function () { wrap.hidden = cb.checked; });
  }

  /* ---------- manual edit sheet ---------- */
  function editSheet(id) {
    var e = entryById(id); if (!e) return; var pl = Dx.placement(e.placementId), wa = waFor(pl.id, weekStartOf(e.date));
    if (wa && wa.status === 'approved') { HQ.toast(t('lockedNote')); return; }
    var s = '<p class="small muted" style="margin-bottom:10px">' + esc(F.date(e.date, 'long')) + ' · ' + esc(Dx.person(pl.vaId).name) + ' · ' + esc(F.tz(e.tz)) + '</p>';
    s += '<div class="grid2">' + h.field(t('start'), '<input class="inp" type="time" name="start" id="ed-start" value="' + esc(e.start) + '">') + h.field(t('end'), '<input class="inp" type="time" name="end" id="ed-end" value="' + esc(e.end || '') + '">') + '</div>';
    s += h.field(t('minutes'), '<input class="inp num" type="number" inputmode="numeric" min="0" max="900" name="minutes" id="ed-min" value="' + e.minutes + '"><div class="hint">' + esc(t('change')) + ': <span id="ed-delta" class="num">0 min</span> · ' + esc(t('beforeLbl').toLowerCase()) + ' ' + F.hrs(e.minutes) + '</div>');
    s += h.field(t('reasonMin'), '<textarea class="inp" name="reason" id="ed-reason" rows="3"></textarea>');
    s += '<div id="ed-err" class="note bad" hidden></div><div class="row" style="gap:8px">' + h.btn(ico('check') + ' ' + esc(t('save')), 'save-entry', 'btn-gold', { id: e.id }) + h.btn(esc(t('cancel')), 'close-sheet', 'btn-ghost') + '</div>';
    HQ.sheet(s, t('editEntry') + ' · ' + F.date(e.date));
    var mi = document.getElementById('ed-min'), st = document.getElementById('ed-start'), en = document.getElementById('ed-end');
    function upd() { var d = (+mi.value || 0) - e.minutes; var el = document.getElementById('ed-delta'); if (el) { el.textContent = (d > 0 ? '+' : '') + d + ' min'; el.style.color = d < 0 ? 'var(--bad-fg)' : d > 0 ? 'var(--good-fg)' : ''; } }
    /* moving the clock shifts the minutes by the same amount, capped at the new span (the tracker never counts more than the span) */
    function fromClock() { if (st.value && en.value) { var span = toMin(en.value) - toMin(st.value), was = toMin(e.end) - toMin(e.start); if (span >= 0) { mi.value = Math.max(0, Math.min(span, entryMin(e) + span - was)); upd(); } } }
    if (mi) mi.addEventListener('input', upd); if (st && en) { st.addEventListener('change', fromClock); en.addEventListener('change', fromClock); }
  }
  function approve(wa) {
    var pl = Dx.placement(wa.placementId), va = Dx.person(pl.vaId), entries = entriesOf(pl.id, wa.weekStart, wa.weekEnd), hrs = Math.round(sumMin(entries) / 60 * 100) / 100;
    wa.trackedHours = hrs; wa.approvedHours = hrs; wa.status = 'approved'; wa.overdue = false; wa.approvedBy = me().id; wa.approvedAt = nowIso(); wa.lockedAt = wa.approvedAt;
    var rng = { en: rangeLbl(wa.weekStart, wa.weekEnd), es: rangeLbl(wa.weekStart, wa.weekEnd) };
    audit('hours.approved', pl.id, { en: 'Week of ' + rng.en + ' approved for ' + va.first + ' (' + pl.id + '): ' + F.hdec(hrs) + ' h, ' + (wa.flags || []).length + ' flags resolved. Locked.', es: 'Semana del ' + rng.es + ' aprobada para ' + va.first + ' (' + pl.id + '): ' + F.hdec(hrs) + ' h, ' + (wa.flags || []).length + ' alertas resueltas. Bloqueada.' });
    systemMsg(pl, { en: HQ.T.weekApprovedMsg.en.replace('{range}', rng.en).replace('{h}', F.hdec(hrs)), es: HQ.T.weekApprovedMsg.es.replace('{range}', rng.es).replace('{h}', F.hdec(hrs)) });
    /* the true-up for the next block (approved minus scheduled hours), and a note to the VA */
    D.trueUps = D.trueUps || []; var delta = Math.round((hrs - wa.scheduledHours) * 100) / 100;
    if (!D.trueUps.some(function (x) { return x.placementId === pl.id && x.weekStart === wa.weekStart; })) D.trueUps.push({ id: 'tu-' + pl.id + '-' + wa.weekStart, clientId: pl.clientId, placementId: pl.id, weekStart: wa.weekStart, scheduledHours: wa.scheduledHours, approvedHours: hrs, deltaHours: delta, amount: Math.round(Math.abs(delta) * pl.billRate * 100) / 100, appliedToInvoice: null });
    D.notifications = D.notifications || [];
    D.notifications.push({ id: newId('nt'), userId: pl.vaId, at: nowIso(), kind: 'message', read: false, text: { en: me().first + ' approved your hours for ' + rng.en + ': ' + F.hdec(hrs) + ' h. The week is now locked.', es: me().first + ' aprobó tus horas de ' + rng.es + ': ' + F.hdec(hrs) + ' h. La semana queda bloqueada.' }, link: { screen: 'week', id: wa.id } });
  }

  /* ---------- actions ---------- */
  Object.assign(HQ.act, {
    'hours-week': function (el) { HQ.go('hours', { w: el.dataset.v }, true); },
    'hours-block': function (el) { HQ.go('hours', { b: el.dataset.v }, true); },
    'placements-filter': function (el) { HQ.go('placements', { f: el.dataset.v }, true); },
    'approve-week': function (el) {
      var wa = waById(el.dataset.id); if (!wa || !Dx.can('approve')) return;
      if (unresolved(wa).length) { HQ.toast(t('resolveFirst')); return; }
      if (wa.status === 'approved') { HQ.toast(t('lockedNote')); return; }
      approve(wa); HQ.toast(t('weekApproved')); HQ.render();
    },
    'approve-all-clean': function () {
      if (!Dx.can('approve')) return; var clean = HQ.pendingWeeks().filter(function (w) { return !unresolved(w).length; });
      if (!clean.length) { HQ.toast(t('noneClean')); return; }
      clean.forEach(approve); HQ.toast(t('weeksApprovedN', { n: clean.length })); HQ.render();
    },
    'flag-keep': function (el) {
      var wa = waById(el.dataset.id); if (!wa || !Dx.can('approve') || wa.status === 'approved') return; var f = (wa.flags || [])[+el.dataset.i]; if (!f) return;
      f.resolved = true; f.resolvedBy = me().id; f.resolvedAt = nowIso(); var pl = Dx.placement(wa.placementId), when = f.date ? ', ' + F.date(f.date) : '';
      audit('hours.flag', pl.id, { en: 'Flag kept as tracked (' + flagKindLbl(f.kind) + when + '): ' + flagText(f), es: 'Alerta mantenida como se registró (' + flagKindLbl(f.kind) + when + '): ' + flagText(f) });
      HQ.toast(t('flagKept')); HQ.render();
    },
    'edit-entry': function (el) { if (!Dx.can('approve')) return; editSheet(el.dataset.id); },
    'save-entry': function (el) {
      var e = entryById(el.dataset.id); if (!e || !Dx.can('approve')) return; var f = HQ.formVals(document.getElementById('sheet')); var err = document.getElementById('ed-err');
      var reason = (f.reason || '').trim(); if (reason.length < 10) { if (err) { err.hidden = false; err.textContent = t('reasonTooShort'); } var r = document.getElementById('ed-reason'); if (r) { r.classList.add('err'); r.focus(); } return; }
      var mins = Math.max(0, Math.round(+f.minutes || 0)); var pl = Dx.placement(e.placementId), wa = waFor(pl.id, weekStartOf(e.date));
      var was = entryMin(e), delta = mins - was, sign = delta > 0 ? '+' : '';
      var changed = delta !== 0 || (f.start && f.start !== e.start) || (f.end && f.end !== e.end);
      e.edit = { by: me().id, at: nowIso(), originalStart: e.start, originalEnd: e.end, originalMinutes: was, reason: reason };
      e.start = f.start || e.start; e.end = f.end || e.end; e.minutes = mins; e.flag = 'manual-edit'; e.note = reason;
      if (wa) {
        if (changed) (wa.flags || []).forEach(function (fl) { if (fl.entryId === e.id) { fl.resolved = true; fl.resolvedBy = me().id; } });
        wa.flags = wa.flags || []; wa.flags.push({ kind: 'manual-edit', entryId: e.id, date: e.date, resolved: true, resolvedBy: me().id, note: { en: 'Entry edited by ' + me().first + ' (' + sign + delta + ' min): ' + reason, es: 'Registro editado por ' + me().first + ' (' + sign + delta + ' min): ' + reason } });
        wa.trackedHours = Math.round(sumMin(entriesOf(pl.id, wa.weekStart, wa.weekEnd)) / 60 * 100) / 100;
      }
      audit('hours.edit', pl.id, { en: F.date(e.date) + ' entry for ' + Dx.person(pl.vaId).first + ' changed by ' + sign + delta + ' min (' + F.hrs(was) + ' → ' + F.hrs(mins) + '). Reason: ' + reason, es: 'Registro del ' + F.date(e.date) + ' de ' + Dx.person(pl.vaId).first + ' cambiado ' + sign + delta + ' min (' + F.hrs(was) + ' → ' + F.hrs(mins) + '). Motivo: ' + reason });
      HQ.closeSheet(); HQ.toast(t('entrySaved')); HQ.render();
    },
    'log-outage': function () { outageSheet(); },
    'out-cause': function (el) { var seg = el.parentNode; Array.prototype.forEach.call(seg.querySelectorAll('button'), function (b) { b.classList.toggle('active', b === el); b.setAttribute('aria-selected', b === el); }); var inp = document.querySelector('#sheet [name="cause"]'); if (inp) inp.value = el.dataset.v; },
    'save-outage': function () {
      var v = me(), f = HQ.formVals(document.getElementById('sheet')), pl = Dx.placement(f.pid); if (!pl || !canSee(pl, v)) return;
      var cl = Dx.client(pl.clientId), ctz = cl.tz, date = f.date || Dx.today(), err = document.getElementById('out-err');
      if (!/^\d\d:\d\d$/.test(f.start || '')) { if (err) { err.hidden = false; err.textContent = t('required'); } return; }
      var startC = F.clock(f.start, v.tz, ctz, date), minutes = null, endC = null;
      if (!f.ongoing && /^\d\d:\d\d$/.test(f.end || '')) { endC = F.clock(f.end, v.tz, ctz, date); minutes = toMin(endC) - toMin(startC); if (minutes < 0) minutes += 1440; }
      var cause = f.cause === 'power' ? 'power' : 'internet', causeT = { en: cause === 'power' ? 'power' : 'internet', es: cause === 'power' ? 'luz' : 'internet' };
      D.outages.push({ id: newId('out'), vaId: pl.vaId, placementId: pl.id, at: isoAt(date, startC, ctz), minutes: minutes, cause: cause, reportedBy: v.id, entryId: null, ongoing: minutes == null, note: (f.note || '').trim() || null });
      var txt = {};
      ['en', 'es'].forEach(function (lg) { var tpl = HQ.T[minutes == null ? 'outageSince' : 'outageWindow'][lg]; txt[lg] = tpl.replace('{cause}', causeT[lg]).replace('{time}', F.ampm(startC) + ' ' + F.tz(ctz)).replace('{from}', F.ampm(startC)).replace('{to}', (endC ? F.ampm(endC) : '') + ' ' + F.tz(ctz)).replace('{min}', minutes); });
      systemMsg(pl, txt);
      HQ.closeSheet(); HQ.toast(t('outageSaved')); if (S.screen === 'outages') HQ.go('outages', {}, true); else HQ.render();
    }
  });
})();
