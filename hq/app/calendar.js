/* BeyondVAs HQ prototype: calendar (month grid, next 14 days, events with RSVP, two holiday sets),
   time off (unavailable days and the 10-business-day rule) and the event detail page. */
(function () {
  var HQ = window.HQ, D = window.HQD, Dx = HQ.D, h = HQ.h, t = HQ.t, L = HQ.L, esc = HQ.esc, F = HQ.fmt, I = HQ.I;
  function isPhone() { return HQ.isPhone ? HQ.isPhone() : window.innerWidth <= 900; }

  Object.assign(HQ.T, {
    everyone: { en: 'Everyone', es: 'Todos' }, allVas: { en: 'All VAs', es: 'Todos los VAs' },
    next14: { en: 'Next 14 days', es: 'Próximos 14 días' },
    noEventsSoon: { en: 'No events in the next 14 days', es: 'Sin eventos en los próximos 14 días' },
    noEventsSoonSub: { en: 'Move the month to see what comes later.', es: 'Cambia de mes para ver lo que viene después.' },
    prevMonth: { en: 'Previous month', es: 'Mes anterior' }, nextMonth: { en: 'Next month', es: 'Mes siguiente' },
    legend: { en: 'Legend', es: 'Leyenda' }, nMore: { en: '+{n} more', es: '+{n} más' },
    usHolidays: { en: 'US holidays · client calendar', es: 'Feriados de EE. UU. · calendario del cliente' },
    hnHolidays: { en: 'Honduras holidays · unavailable only if declared', es: 'Feriados de Honduras · no disponible solo si se declara' },
    addEvent: { en: 'Add event', es: 'Agregar evento' }, eventAdded: { en: 'Event added to the calendar', es: 'Evento agregado al calendario' },
    titleEn: { en: 'Title (English)', es: 'Título (inglés)' }, titleEs: { en: 'Title (Spanish)', es: 'Título (español)' },
    sameAsEnglish: { en: 'Leave it empty to reuse the English title.', es: 'Déjalo vacío para usar el título en inglés.' },
    kind: { en: 'Kind', es: 'Tipo' }, audience: { en: 'Who sees it', es: 'Quién lo ve' }, forWhom: { en: 'For', es: 'Para' },
    timeOptional: { en: 'Time (optional)', es: 'Hora (opcional)' },
    titleAndDate: { en: 'A title and a valid date are required.', es: 'Se necesitan un título y una fecha válida.' },
    going: { en: 'Going', es: 'Asisten' }, yourRsvp: { en: 'Your answer', es: 'Tu respuesta' }, rsvpSaved: { en: 'Answer saved', es: 'Respuesta guardada' },
    openLink: { en: 'Open the related screen', es: 'Abrir la pantalla relacionada' }, openPage: { en: 'Open as a page', es: 'Abrir como página' },
    declareBy: { en: 'declare by {date}', es: 'declarar antes del {date}' },
    declareDeadlinePassed: { en: 'declaration window closed', es: 'plazo para declarar cerrado' },
    myDaysOff: { en: 'My unavailable days', es: 'Mis días no disponibles' },
    noDaysOff: { en: 'No unavailable days declared', es: 'No has declarado días no disponibles' },
    noDaysOffSub: { en: 'Declare one at least 10 business days ahead.', es: 'Declara uno con al menos 10 días hábiles de anticipación.' },
    declaredOn: { en: 'Declared', es: 'Declarado el' }, bizNotice: { en: '{n} business days of notice', es: '{n} días hábiles de anticipación' },
    meetsRule: { en: 'Meets the 10-business-day rule. Your manager and your client are told in the channel.', es: 'Cumple la regla de 10 días hábiles. Se avisa a tu gerente y a tu cliente en el canal.' },
    underRule: { en: 'Under the 10-business-day rule: {name} must decide before it reaches the client.', es: 'Menos de 10 días hábiles: {name} debe decidir antes de que llegue al cliente.' },
    clientHolidayConflict: { en: '{name} is closed that day ({holiday}): no need to declare it.', es: '{name} cierra ese día ({holiday}): no hace falta declararlo.' },
    hnHolidayInfo: { en: 'Honduran holiday ({holiday}). You still need to declare it to take it off.', es: 'Feriado hondureño ({holiday}). Aun así debes declararlo para tomarlo libre.' },
    weekendNote: { en: 'That is a weekend: no hours are scheduled anyway.', es: 'Es fin de semana: no hay horas programadas de todas formas.' },
    pastDate: { en: 'Pick a date after today.', es: 'Elige una fecha posterior a hoy.' }, reasonRequired: { en: 'Write a short reason.', es: 'Escribe un motivo breve.' },
    dayOffSent: { en: 'Request sent to your manager', es: 'Solicitud enviada a tu gerente' }, dayOffAuto: { en: 'Day declared and approved', es: 'Día declarado y aprobado' },
    myClientHolidays: { en: "My client's holidays", es: 'Feriados de mi cliente' }, myCountryHolidays: { en: "My country's holidays", es: 'Feriados de mi país' },
    noClientYet: { en: "No client yet. Once placed you follow your client's holiday calendar.", es: 'Aún no tienes cliente. Cuando te coloquen seguirás el calendario de feriados de tu cliente.' },
    countrySetMissing: { en: "Only the Honduran set is in the prototype; your country's set ({c}) comes later.", es: 'En el prototipo solo está el calendario hondureño; el de tu país ({c}) viene después.' },
    noHoursThatDay: { en: 'no hours scheduled', es: 'sin horas programadas' },
    requestsToApprove: { en: 'Requests to approve', es: 'Solicitudes por aprobar' }, noRequests: { en: 'No requests waiting', es: 'No hay solicitudes pendientes' },
    declaredDays: { en: 'Declared days', es: 'Días declarados' }, decline: { en: 'Decline', es: 'Rechazar' }, declined: { en: 'Declined', es: 'Rechazado' },
    approvedToast: { en: 'Approved. The client channel gets a note.', es: 'Aprobado. Se avisa en el canal del cliente.' },
    declinedToast: { en: 'Declined. The VA is told in their support thread.', es: 'Rechazado. Se avisa al VA en su hilo de soporte.' },
    notice: { en: 'Notice', es: 'Aviso' }, approvedBy: { en: 'Approved by', es: 'Aprobado por' }, byRule: { en: 'by rule', es: 'por regla' },
    vaDaysOff: { en: 'Unavailable days of your VA', es: 'Días no disponibles de tu VA' },
    clientHolidayNote: { en: 'Your VA works your holiday calendar. Declared days appear here once BeyondVAs approves them.', es: 'Tu VA sigue tu calendario de feriados. Los días declarados aparecen aquí cuando BeyondVAs los aprueba.' },
    timeoffApplicant: { en: 'Time off starts with your first placement.', es: 'Los días libres empiezan con tu primera colocación.' },
    pendingApproval: { en: 'Awaiting approval', es: 'Pendiente de aprobación' }, dayOffFor: { en: '{name}: unavailable day', es: '{name}: día no disponible' },
    requestThisDay: { en: 'Request this day off', es: 'Pedir este día libre' }, unavailableDay: { en: 'Unavailable day', es: 'Día no disponible' }
  });

  var RULE = 10;
  var st = { month: Dx.today().slice(0, 7), US: true, HN: true };
  var KC = { holiday: 'gold', payday: 'good', deadline: 'bad', checkpoint: 'bad', timeoff: '', meeting: 'blue', training: 'blue', interview: 'blue', social: 'blue' };
  var KI = { meeting: 'people', training: 'school', interview: 'camera', social: 'sparkle', payday: 'money', holiday: 'sun', deadline: 'flag', checkpoint: 'check', timeoff: 'calendar' };
  var RSVP_KINDS = ['meeting', 'training', 'social', 'interview', 'checkpoint'];
  var TZ_OPTS = ['America/Tegucigalpa', 'America/El_Salvador', 'America/Bogota', 'America/Los_Angeles', 'America/Chicago', 'America/New_York'];

  /* ---------- dates and business days ---------- */
  function dt(iso) { return new Date(iso + 'T12:00:00Z'); }
  function toIso(d) { return d.toISOString().slice(0, 10); }
  function addDays(iso, n) { var d = dt(iso); d.setUTCDate(d.getUTCDate() + n); return toIso(d); }
  function dow(iso) { return dt(iso).getUTCDay(); }
  function isBiz(iso) { var w = dow(iso); return w !== 0 && w !== 6; }
  /* Mon–Fri days after `from` up to and including `to` (matches businessDaysNotice in the seed) */
  function bizDays(from, to) { var n = 0, d = from; if (to <= from) return 0; while (d < to) { d = addDays(d, 1); if (isBiz(d)) n++; } return n; }
  function declareBy(holiday) { var d = holiday; while (bizDays(d, holiday) < RULE) d = addDays(d, -1); return d; }
  function daysIn(ym) { var p = ym.split('-'); return new Date(Date.UTC(+p[0], +p[1], 0)).getUTCDate(); }
  function shiftMonth(ym, n) { var p = ym.split('-'); var y = +p[0], m = +p[1] - 1 + n; y += Math.floor(m / 12); m = ((m % 12) + 12) % 12; return y + '-' + (m < 9 ? '0' : '') + (m + 1); }
  function monthLabel(ym) { var s = dt(ym + '-01').toLocaleDateString(F.locale(), { month: 'long', year: 'numeric', timeZone: 'UTC' }); return s.charAt(0).toUpperCase() + s.slice(1); }
  function validDate(s) { return /^\d{4}-\d{2}-\d{2}$/.test(s || ''); }
  function newId(prefix) { return prefix + '-' + Math.random().toString(36).slice(2, 8); }
  function manager() { return Dx.people().filter(function (p) { return p.role === 'manager'; })[0]; }

  /* ---------- visibility ---------- */
  function canSee(ev, v) {
    var a = ev.audience;
    if (HQ.isStaff()) return true;
    /* billing deadlines carry invoice amounts: only who may see bill amounts */
    if (ev.link && ev.link.screen === 'billing' && !Dx.can('bill', v)) return false;
    if (a === 'all') return true;
    if (!a) return false;
    if (a.role) return v.role === a.role;
    if (a.userId) return v.id === a.userId;
    if (a.clientId) return v.role === 'client' && v.clientId === a.clientId;
    if (a.channelId) return Dx.channelsFor(v).some(function (c) { return c.id === a.channelId; });
    return false;
  }
  function visibleEvents(v) { return (D.events || []).filter(function (e) { return canSee(e, v); }); }
  function findEv(id) { return (D.events || []).filter(function (e) { return e.id === id; })[0] || null; }
  function findUd(id) { return (D.unavailableDays || []).filter(function (u) { return u.id === id; })[0] || null; }
  function onDay(ev, d) { return ev.date <= d && d <= (ev.endDate || ev.date); }
  function bySlot(a, b) { var ta = a.time || '', tb = b.time || ''; if (!ta && tb) return -1; if (ta && !tb) return 1; return ta < tb ? -1 : ta > tb ? 1 : 0; }
  function setsFor(v) { return v.role === 'client' ? ['US'] : ['US', 'HN']; }
  function setRows(k) { return (D.holidaySets && D.holidaySets[k]) || []; }
  function inSet(k, d) { return setRows(k).filter(function (x) { return x.date === d; })[0] || null; }
  function holidaysOn(d, v) {
    var out = [];
    setsFor(v).forEach(function (k) { if (!st[k]) return; var x = inSet(k, d); if (x) out.push({ set: k, date: d, name: x.name }); });
    return out;
  }
  /* unavailable days the viewer may see: staff all, a VA their own, a client their VA's approved ones */
  function udFor(v) {
    var all = D.unavailableDays || [];
    if (HQ.isStaff()) return all;
    if (v.role === 'va') return all.filter(function (u) { return u.vaId === v.id; });
    if (v.role === 'client') { var ids = Dx.placementForClient(v.clientId).map(function (p) { return p.vaId; }); return all.filter(function (u) { return ids.indexOf(u.vaId) >= 0 && u.status === 'approved'; }); }
    return [];
  }
  /* everything on one day: events, holiday-set rows (unless a holiday event already covers the day), pending declared days */
  function dayItems(d, v) {
    var evs = visibleEvents(v).filter(function (e) { return onDay(e, d); }).sort(bySlot);
    var out = evs.map(function (e) { return { ev: e, kind: e.kind }; });
    if (!evs.some(function (e) { return e.kind === 'holiday'; })) holidaysOn(d, v).forEach(function (x) { out.push({ kind: 'holiday', title: L(x.name), hol: x }); });
    udFor(v).filter(function (u) { return u.date === d && u.status === 'pending'; }).forEach(function (u) { var p = Dx.person(u.vaId); out.push({ kind: 'timeoff', title: t('dayOffFor', { name: p ? p.first : '' }) + ' · ' + t('pending').toLowerCase(), ud: u }); });
    return out;
  }

  /* ---------- small renderers ---------- */
  function ico(name, cls) { return '<span class="hash ' + (cls || '') + '">' + (I[name] || I.calendar).replace('<svg', '<svg width="18" height="18" style="fill:none;stroke:currentColor;stroke-width:1.8"') + '</span>'; }
  function kindLabel(k) { return k === 'interview' ? t('interviewEv') : k === 'timeoff' ? t('timeoff') : t(k); }
  function kindChip(k) { return h.chip(kindLabel(k), KC[k] || 'blue'); }
  function evTime(ev, v) {
    if (!ev.time) return '';
    var mine = v.tz || ev.tz; var s = '<span class="num">' + F.ampm(F.clock(ev.time, ev.tz, mine, ev.date)) + ' ' + esc(F.tz(mine)) + '</span>';
    if (ev.tz !== mine) s += ' <span class="tiny muted">(' + F.ampm(ev.time) + ' ' + esc(F.tz(ev.tz)) + ')</span>';
    return s;
  }
  function dateRange(ev, style) { return esc(F.date(ev.date, style)) + (ev.endDate ? ' – ' + esc(F.date(ev.endDate, style)) : ''); }
  function audienceLabel(ev, v) {
    var a = ev.audience;
    if (a === 'all') return t('everyone');
    if (!a) return '';
    if (a.role) return t('allVas');
    if (a.userId) { var p = Dx.person(a.userId); return p ? (p.role === 'va' ? Dx.vaLabel(p, v) : p.name) : ''; }
    if (a.clientId) { var c = Dx.client(a.clientId); return c ? c.name : ''; }
    if (a.channelId) { var ch = HQ.get(a.channelId); return ch ? Dx.channelName(ch, v) : ''; }
    return '';
  }
  function linkScreen(link) { return link.screen === 'calendar' ? 'timeoff' : link.screen === 'people' ? 'person' : link.screen; }
  function declareText(d) { var by = declareBy(d); return by < Dx.today() ? t('declareDeadlinePassed') : t('declareBy', { date: F.date(by, 'long') }); }
  function evRow(ev, v, noDate) {
    var parts = [noDate ? '' : dateRange(ev, 'long'), evTime(ev, v), esc(kindLabel(ev.kind))];
    if (ev.kind === 'holiday' && v.role === 'va' && inSet('HN', ev.date)) parts.push(esc(declareText(ev.date)));
    var mine = ev.rsvps && ev.rsvps[v.id];
    return h.li({ lead: ico(KI[ev.kind], ev.kind === 'holiday' ? 'ann' : ''), title: esc(L(ev.title)), sub: parts.filter(Boolean).join(' · '), trail: mine ? h.chip(t(mine), mine === 'yes' ? 'good' : mine === 'no' ? '' : 'warn') : '', act: 'open-event', data: { id: ev.id } });
  }
  function itemRow(it, v, d, inSheet) {
    if (it.ev) return evRow(it.ev, v, true);
    if (it.hol) {
      var hn = it.hol.set === 'HN'; var sub = hn ? t('hnHoliday') : t('usHoliday');
      if (hn && v.role === 'va') sub += ' · ' + declareText(d);
      return h.li({ lead: ico('sun', 'ann'), title: esc(it.title), sub: esc(sub), act: inSheet ? null : 'cal-day', data: { d: d } });
    }
    var p = Dx.person(it.ud.vaId);
    return h.li({ lead: h.avatar(p), title: esc(it.title), sub: esc(L(it.ud.reason)) + ' · ' + esc(t('bizNotice', { n: it.ud.businessDaysNotice })), trail: h.chip(t('pending'), 'warn', true), go: 'timeoff', params: { id: it.ud.id } });
  }
  function evDetail(ev, v) {
    var s = '<div class="row wrap" style="gap:8px;margin-bottom:10px">' + kindChip(ev.kind) + '<span class="b">' + dateRange(ev, 'long') + '</span>' + (ev.time ? '<span>' + evTime(ev, v) + '</span>' : '') + '</div>';
    s += '<div class="small muted" style="margin-bottom:10px">' + esc(t('forWhom')) + ': ' + esc(audienceLabel(ev, v)) + '</div>';
    /* a billing event's note and link carry invoice amounts: only who may see bill amounts gets them */
    var billEv = !!(ev.link && ev.link.screen === 'billing'), mayBill = Dx.can('bill', v);
    if (ev.note && !(billEv && !mayBill)) s += '<p style="margin-bottom:12px">' + esc(L(ev.note)) + '</p>';
    if (RSVP_KINDS.indexOf(ev.kind) >= 0 && v.role !== 'applicant') {
      var mine = (ev.rsvps || {})[v.id];
      s += '<div class="field"><label>' + esc(t('yourRsvp')) + '</label><div class="row wrap" style="gap:6px">' + ['yes', 'maybe', 'no'].map(function (x) { return h.btn(esc(t(x)), 'rsvp', (mine === x ? 'btn-blue' : 'btn-ghost') + ' btn-sm', { id: ev.id, v: x }); }).join('') + '</div></div>';
      var going = Object.keys(ev.rsvps || {}).filter(function (id) { return ev.rsvps[id] === 'yes' && Dx.person(id); });
      if (going.length) s += '<div class="small muted" style="margin-bottom:6px">' + esc(t('going')) + ' · ' + going.length + '</div><div class="row wrap" style="gap:10px;margin-bottom:12px">' + going.map(function (id) { var p = Dx.person(id); return '<span class="row" style="gap:6px">' + h.avatar(p, 'sm') + '<span class="small">' + esc(p.role === 'va' ? Dx.vaLabel(p, v) : p.first) + '</span></span>'; }).join('') + '</div>';
    }
    if (ev.link && ev.link.screen && !(billEv && !mayBill)) s += '<div class="row wrap" style="gap:8px;margin-top:4px">' + h.go(esc(t('openLink')), linkScreen(ev.link), { id: ev.link.id }, 'btn-ghost btn-sm') + '</div>';
    return s;
  }
  function openEventSheet(id) {
    var v = HQ.me(); var ev = findEv(id); if (!ev || !canSee(ev, v)) return;
    HQ.sheet(evDetail(ev, v) + '<div style="margin-top:10px">' + h.go(esc(t('openPage')), 'event', { id: ev.id }, 'btn-ghost btn-sm') + '</div>', L(ev.title));
  }
  function openDaySheet(d) {
    var v = HQ.me(); var items = dayItems(d, v);
    var s = items.length ? '<div class="list">' + items.map(function (it) { return itemRow(it, v, d, true); }).join('') + '</div>' : h.empty(t('nothingHere'), '');
    var extra = '';
    if (v.role === 'va' && d > Dx.today()) extra += h.btn(esc(t('requestThisDay')), 'open-dayoff', 'btn-ghost btn-sm', { date: d });
    if (HQ.isStaff()) extra += h.btn(I.plus + esc(t('addEvent')), 'open-add-event', 'btn-ghost btn-sm', { date: d });
    if (extra) s += '<div class="row wrap" style="gap:8px;margin-top:12px">' + extra + '</div>';
    HQ.sheet(s, F.date(d, 'full'));
  }

  /* ---------- the calendar screen ---------- */
  function toolbarHtml(v) {
    var s = '<div class="row between" style="margin-bottom:10px"><button class="iconbtn" data-act="cal-month" data-n="-1" aria-label="' + esc(t('prevMonth')) + '">' + I.back + '</button><h2 style="font-size:20px">' + esc(monthLabel(st.month)) + '</h2><div class="row" style="gap:4px">' + h.btn(esc(t('today')), 'cal-today', 'btn-ghost btn-sm') + '<button class="iconbtn" data-act="cal-month" data-n="1" aria-label="' + esc(t('nextMonth')) + '">' + I.chev + '</button></div></div>';
    s += '<div class="row wrap" style="gap:6px;margin-bottom:12px">' + setsFor(v).map(function (k) { return '<button class="chip ' + (k === 'US' ? 'blue' : 'gold') + '" data-act="cal-toggle" data-set="' + k + '" aria-pressed="' + !!st[k] + '" style="border:0;cursor:pointer;opacity:' + (st[k] ? 1 : 0.45) + '"><i class="dot"></i>' + esc(t(k === 'US' ? 'usHolidays' : 'hnHolidays')) + '</button>'; }).join('') + '</div>';
    if (v.role === 'va' && v.country !== 'HN') s += '<div class="note tiny" style="margin-bottom:12px">' + esc(t('countrySetMissing', { c: v.country })) + '</div>';
    return s;
  }
  function gridHtml(v) {
    var ym = st.month, n = daysIn(ym), today = Dx.today(), start = HQ.lang() === 'es' ? 1 : 0, i;
    var names = []; for (i = 0; i < 7; i++) names.push(dt(addDays('2026-10-18', (i + start) % 7)).toLocaleDateString(F.locale(), { weekday: 'short', timeZone: 'UTC' }).replace('.', ''));
    /* minmax(0,1fr) keeps the seven columns on one row: nowrap event titles would otherwise widen the 1fr tracks */
    var s = '<div class="cal" style="grid-template-columns:repeat(7,minmax(0,1fr))">' + names.map(function (x) { return '<div class="dow">' + esc(x) + '</div>'; }).join('');
    var pad = (dow(ym + '-01') - start + 7) % 7;
    for (i = 0; i < pad; i++) s += '<div class="day pad"></div>';
    for (var d = 1; d <= n; d++) {
      var dIso = ym + '-' + (d < 10 ? '0' : '') + d; var items = dayItems(dIso, v);
      s += '<div class="day ' + (dIso === today ? 'today' : '') + '" data-act="cal-day" data-d="' + dIso + '" tabindex="0" role="button" aria-label="' + esc(F.date(dIso, 'full')) + '" style="cursor:pointer;min-width:0;overflow:hidden"><div class="d">' + d + '</div>';
      items.slice(0, 3).forEach(function (it) {
        if (it.ev) s += '<button class="ev ' + esc(it.ev.kind) + '" data-act="open-event" data-id="' + esc(it.ev.id) + '" title="' + esc(L(it.ev.title)) + '">' + esc(L(it.ev.title)) + '</button>';
        else s += '<span class="ev ' + esc(it.kind) + '" title="' + esc(it.title) + '">' + esc(it.title) + '</span>';
      });
      if (items.length > 3) s += '<span class="tiny muted">' + esc(t('nMore', { n: items.length - 3 })) + '</span>';
      s += '</div>';
    }
    var tail = (7 - ((pad + n) % 7)) % 7; for (i = 0; i < tail; i++) s += '<div class="day pad"></div>';
    return s + '</div>';
  }
  function legendHtml(v) {
    var kinds = []; visibleEvents(v).forEach(function (e) { if (kinds.indexOf(e.kind) < 0) kinds.push(e.kind); });
    if (!kinds.length) return '';
    return '<div class="row wrap" style="gap:6px;margin:12px 0 4px"><span class="small muted">' + esc(t('legend')) + ':</span>' + kinds.map(kindChip).join('') + '</div>';
  }
  function agendaHtml(v) {
    var today = Dx.today(), s = '', any = false;
    for (var i = 0; i < 14; i++) {
      var d = addDays(today, i); var items = dayItems(d, v); if (!items.length) continue; any = true;
      s += '<div class="sgroup" style="padding-left:0">' + esc(F.dayLabel(d)) + '</div>' + items.map(function (it) { return itemRow(it, v, d, false); }).join('');
    }
    return any ? '<div class="list">' + s + '</div>' : h.empty(t('noEventsSoon'), t('noEventsSoonSub'));
  }
  function paneHtml(v) {
    var rows = [];
    setsFor(v).forEach(function (k) { if (!st[k]) return; setRows(k).forEach(function (x) { if (x.date >= Dx.today()) rows.push({ set: k, date: x.date, name: x.name }); }); });
    rows.sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });
    var s = '<div class="side-head"><h2>' + esc(t('holidays')) + '</h2></div><div class="side-body"><div class="list">';
    if (!rows.length) s += h.empty(t('nothingHere'), '');
    rows.slice(0, 8).forEach(function (x) { s += h.li({ lead: h.chip(x.set, x.set === 'US' ? 'blue' : 'gold'), title: esc(L(x.name)), sub: esc(F.date(x.date, 'long')) + (x.set === 'HN' && v.role === 'va' ? ' · ' + esc(declareText(x.date)) : ''), act: 'cal-day', data: { d: x.date } }); });
    s += '</div>';
    if (v.role !== 'applicant') s += '<div style="margin-top:14px">' + h.go(esc(t('timeoff')), 'timeoff', {}, 'btn-ghost btn-sm') + '</div>';
    return s + '</div>';
  }
  HQ.V.calendar = function (p) {
    p = p || {}; var v = HQ.me();
    if (p.id && findUd(p.id)) return HQ.V.timeoff(p);
    var focus = p.id ? findEv(p.id) : null; if (focus && canSee(focus, v)) st.month = focus.date.slice(0, 7); else focus = null;
    var body = toolbarHtml(v) + gridHtml(v) + legendHtml(v);
    var quick = '';
    if (HQ.isStaff()) quick += h.btn(I.plus + esc(t('addEvent')), 'open-add-event', 'btn-gold btn-sm');
    if (v.role === 'va') quick += h.btn(I.plus + esc(t('requestDayOff')), 'open-dayoff', 'btn-gold btn-sm');
    if (v.role !== 'applicant') quick += h.go(esc(t('timeoff')), 'timeoff', {}, 'btn-ghost btn-sm');
    if (quick) body += '<div class="row wrap" style="gap:8px;margin:12px 0 4px">' + quick + '</div>';
    body += h.sec(t('next14')) + agendaHtml(v);
    if (v.role === 'va' || HQ.isStaff()) body += '<p class="small muted" style="margin-top:14px">' + esc(t('tenDayRule')) + '</p>';
    var actions = HQ.isStaff() ? '<button class="iconbtn" data-act="open-add-event" aria-label="' + esc(t('addEvent')) + '">' + I.plus + '</button>' : '';
    /* a link with ?id=ev-… opens that event once; the param is cleared so the month buttons and re-renders are not pulled back to it */
    return { title: t('calendar'), sub: esc(F.date(Dx.today(), 'full')), body: body, actions: actions, pane: isPhone() ? null : paneHtml(v), after: function () { if (focus) { HQ.S.params = {}; openEventSheet(focus.id); } } };
  };

  /* ---------- event detail page (fallback for links) ---------- */
  HQ.V.event = function (p) {
    p = p || {}; var v = HQ.me();
    if (p.id && findUd(p.id)) return HQ.V.timeoff(p);
    var ev = findEv(p.id); var back = '<button class="iconbtn" data-go="calendar" aria-label="' + esc(t('calendar')) + '">' + I.calendar + '</button>';
    if (!ev || !canSee(ev, v)) return { title: t('calendar'), body: h.empty(t('nothingHere'), ''), actions: back };
    return { title: esc(L(ev.title)), sub: esc(kindLabel(ev.kind)) + ' · ' + dateRange(ev, 'long'), body: h.card(evDetail(ev, v)), actions: back };
  };

  /* ---------- time off ---------- */
  function holidayList(set, v, opts) {
    opts = opts || {};
    var rows = setRows(set).filter(function (x) { return x.date >= Dx.today(); });
    if (!rows.length) return h.empty(t('nothingHere'), '');
    /* the declare-by / no-hours text goes in the sub line: a trail chip would crush the title on a phone */
    return '<div class="list">' + rows.map(function (x) {
      var sub = esc(F.date(x.date, 'long')), trail = '';
      if (opts.declare) { var by = declareBy(x.date); var passed = by < Dx.today(); sub += ' · ' + esc(declareText(x.date)); trail = passed ? '' : h.chip(F.daysUntil(by) + ' ' + t('days'), F.daysUntil(by) <= 5 ? 'warn' : 'blue'); }
      else if (opts.off) sub += ' · ' + esc(t('noHoursThatDay'));
      return h.li({ lead: ico('sun', set === 'HN' ? 'ann' : ''), title: esc(L(x.name)), sub: sub, trail: trail });
    }).join('') + '</div>';
  }
  function udStatusChip(u) { return u.status === 'declined' ? h.chip(t('declined'), 'bad', true) : h.statusChip(u.status); }
  function udRowsVa(v) {
    var uds = udFor(v).slice().sort(function (a, b) { return a.date < b.date ? -1 : 1; });
    if (!uds.length) return h.empty(t('noDaysOff'), t('noDaysOffSub'));
    return '<div class="list">' + uds.map(function (u) { return h.li({ lead: ico('calendar'), title: esc(F.date(u.date, 'long')) + ' · ' + esc(L(u.reason)), sub: esc(t('declaredOn')) + ' ' + esc(F.date(u.declaredOn)) + ' · ' + esc(t('bizNotice', { n: u.businessDaysNotice })) + (u.status === 'pending' ? ' · ' + esc(t('pendingApproval')) : ''), trail: udStatusChip(u) }); }).join('') + '</div>';
  }
  function timeoffVa(v) {
    var pl = Dx.placementForVa(v.id); var cl = pl ? Dx.client(pl.clientId) : null;
    var s = h.sec(t('myDaysOff'), h.btn(I.plus + esc(t('requestDayOff')), 'open-dayoff', 'btn-gold btn-sm')) + h.card(udRowsVa(v), 'flat tight');
    s += '<div style="margin-top:12px">' + h.note(esc(t('tenDayRule'))) + '</div>';
    s += h.sec(t('holidays')) + '<div class="grid2">';
    s += h.card('<h3>' + esc(t('myClientHolidays')) + (cl ? ' <span class="small muted">· ' + esc(cl.name) + '</span>' : '') + '</h3>' + (cl ? holidayList(cl.holidaySet || 'US', v, { off: true }) : h.note(esc(t('noClientYet')))), 'flat tight');
    s += h.card('<h3>' + esc(t('myCountryHolidays')) + ' <span class="small muted">· HN</span></h3>' + (v.country !== 'HN' ? '<div class="note tiny" style="margin-bottom:8px">' + esc(t('countrySetMissing', { c: v.country })) + '</div>' : '') + holidayList('HN', v, { declare: true }), 'flat tight');
    return s + '</div>';
  }
  function timeoffStaff(v, focusId) {
    var uds = (D.unavailableDays || []).slice().sort(function (a, b) { return a.date < b.date ? -1 : 1; });
    var pend = uds.filter(function (u) { return u.status === 'pending'; });
    var s = h.sec(t('requestsToApprove'), h.badge(pend.length, 'gold'));
    if (!pend.length) s += h.empty(t('noRequests'), '');
    pend.forEach(function (u) {
      var p = Dx.person(u.vaId); var pl = Dx.placementForVa(u.vaId); var cl = pl ? Dx.client(pl.clientId) : null; var short = u.businessDaysNotice < RULE;
      var inner = '<div class="row between wrap" style="gap:8px;margin-bottom:8px">' + h.person(p, cl ? cl.name : '') + h.chip(t('bizNotice', { n: u.businessDaysNotice }), short ? 'bad' : 'good', true) + '</div>';
      inner += '<div class="b" style="color:var(--fg)">' + esc(F.date(u.date, 'full')) + '</div><div class="small muted" style="margin:2px 0 8px">' + esc(L(u.reason)) + ' · ' + esc(t('declaredOn')) + ' ' + esc(F.date(u.declaredOn)) + '</div>';
      if (u.note) inner += '<p class="small" style="margin-bottom:10px">' + esc(L(u.note)) + '</p>';
      inner += '<div class="row wrap" style="gap:8px">' + h.btn(I.check + esc(t('approve')), 'tod-approve', 'btn-blue btn-sm', { id: u.id }) + h.btn(I.x + esc(t('decline')), 'tod-decline', 'btn-ghost btn-sm', { id: u.id }) + '</div>';
      s += h.card(inner, u.id === focusId ? 'accent' : '');
    });
    s += h.sec(t('declaredDays'));
    s += uds.length ? h.table([{ l: t('va') }, { l: t('date') }, { l: t('reason') }, { l: t('notice'), num: true }, { l: t('status') }, { l: t('approvedBy') }], uds.map(function (u) {
      var p = Dx.person(u.vaId); var ap = u.approvedBy ? Dx.person(u.approvedBy) : null;
      return [p ? esc(p.name) : '', esc(F.date(u.date, 'long')), esc(L(u.reason)), '<span class="' + (u.businessDaysNotice < RULE ? 'b' : '') + '" style="' + (u.businessDaysNotice < RULE ? 'color:var(--bad-fg)' : '') + '">' + u.businessDaysNotice + '</span>', udStatusChip(u), ap ? esc(ap.first) + ' · ' + esc(F.date(u.approvedOn)) : (u.status === 'approved' ? esc(t('byRule')) : '—')];
    })) : h.empty(t('nothingHere'), '');
    s += h.sec(t('holidays')) + '<div class="grid2">' + h.card('<h3>' + esc(t('usHolidays')) + '</h3>' + holidayList('US', v, {}), 'flat tight') + h.card('<h3>' + esc(t('hnHolidays')) + '</h3>' + holidayList('HN', v, { declare: true }), 'flat tight') + '</div>';
    return s + '<p class="small muted" style="margin-top:14px">' + esc(t('tenDayRule')) + '</p>';
  }
  function timeoffClient(v) {
    var uds = udFor(v).slice().sort(function (a, b) { return a.date < b.date ? -1 : 1; }); var cl = Dx.client(v.clientId);
    var s = h.sec(t('vaDaysOff'));
    s += uds.length ? '<div class="list">' + uds.map(function (u) { var p = Dx.person(u.vaId); return h.li({ lead: h.avatar(p), title: esc(Dx.vaLabel(p, v)) + ' · ' + esc(F.date(u.date, 'long')), sub: esc(t('unavailableDay')) + ' · ' + esc(t('noHoursThatDay')), trail: udStatusChip(u) }); }).join('') + '</div>' : h.empty(t('nothingHere'), '');
    s += '<div style="margin-top:12px">' + h.note(esc(t('clientHolidayNote'))) + '</div>';
    s += h.sec(t('holidays'), cl ? '<span class="small muted">' + esc(cl.name) + '</span>' : '') + h.card(holidayList((cl && cl.holidaySet) || 'US', v, { off: true }), 'flat tight');
    return s;
  }
  HQ.V.timeoff = function (p) {
    p = p || {}; var v = HQ.me();
    var body = v.role === 'applicant' ? h.empty(t('nothingHere'), t('timeoffApplicant')) : v.role === 'va' ? timeoffVa(v) : v.role === 'client' ? timeoffClient(v) : timeoffStaff(v, p.id);
    return { title: t('timeoff'), sub: esc(F.date(Dx.today(), 'full')), body: body, actions: '<button class="iconbtn" data-go="calendar" aria-label="' + esc(t('calendar')) + '">' + I.calendar + '</button>' };
  };

  /* ---------- sheets: request a day off, add an event ---------- */
  function renderCalc(d, v) {
    var box = document.getElementById('dayoff-calc'); if (!box) return;
    if (!validDate(d) || d <= Dx.today()) { box.innerHTML = ''; return; }
    var n = bizDays(Dx.today(), d); var mgr = manager(); var ok = n >= RULE;
    var s = h.note('<b>' + esc(t('bizNotice', { n: n })) + '</b> · ' + esc(F.date(d, 'full')), ok ? 'good' : 'warn');
    s += '<div class="small ' + (ok ? 'muted' : '') + '"' + (ok ? '' : ' style="color:var(--warn-fg)"') + '>' + esc(ok ? t('meetsRule') : t('underRule', { name: mgr ? mgr.first : t('manager') })) + '</div>';
    if (!isBiz(d)) s += h.note(esc(t('weekendNote')));
    var pl = Dx.placementForVa(v.id); var cl = pl ? Dx.client(pl.clientId) : null;
    var us = cl ? inSet(cl.holidaySet || 'US', d) : null; if (us) s += h.note(esc(t('clientHolidayConflict', { name: cl.name, holiday: L(us.name) })), 'gold');
    var hn = inSet('HN', d); if (hn) s += h.note(esc(t('hnHolidayInfo', { holiday: L(hn.name) })), 'gold');
    box.innerHTML = s;
  }
  function openDayoff(dateVal) {
    var v = HQ.me(); if (v.role !== 'va') return;
    var s = h.field(t('date'), '<input class="inp" type="date" name="date" id="dayoff-date" min="' + addDays(Dx.today(), 1) + '" value="' + esc(dateVal || '') + '">');
    s += '<div id="dayoff-calc" class="stack" style="gap:8px;margin:-6px 0 14px"></div>';
    s += h.field(t('reason'), '<input class="inp" name="reason" placeholder="' + esc(HQ.lang() === 'es' ? 'Ej.: cita médica' : 'e.g. medical appointment') + '">');
    s += '<div id="dayoff-err" class="note bad" hidden style="margin-bottom:10px"></div>' + h.note(esc(t('tenDayRule')));
    s += '<div class="row wrap" style="gap:8px;margin-top:14px">' + h.btn(I.send + esc(t('send')), 'send-dayoff', 'btn-gold') + h.btn(esc(t('cancel')), 'close-sheet') + '</div>';
    HQ.sheet(s, t('requestDayOff'));
    var inp = document.getElementById('dayoff-date');
    if (inp) { inp.addEventListener('input', function () { renderCalc(inp.value, v); }); inp.addEventListener('change', function () { renderCalc(inp.value, v); }); renderCalc(inp.value, v); }
  }
  function pushTimeoffEvent(ud) {
    var va = Dx.person(ud.vaId); if (!va) return;
    var pl = Dx.placementForVa(ud.vaId); var ch = pl && HQ.channelForPlacement ? HQ.channelForPlacement(pl.id) : null;
    D.events.push({ id: newId('ev'), kind: 'timeoff', title: { en: va.first + ': unavailable day (approved)', es: va.first + ': día no disponible (aprobado)' }, date: ud.date, endDate: null, time: null, tz: va.tz,
      audience: ch ? { channelId: ch.id } : { userId: ud.vaId }, rsvps: {},
      note: { en: 'Declared with ' + ud.businessDaysNotice + ' business days of notice (rule: ' + RULE + '). No hours are scheduled that day; missed hours become a credit on the next block.', es: 'Declarado con ' + ud.businessDaysNotice + ' días hábiles de anticipación (regla: ' + RULE + '). No hay horas programadas ese día; las horas no trabajadas se acreditan en el siguiente bloque.' },
      link: { screen: 'calendar', id: ud.id } });
  }
  function openAddEvent(dateVal) {
    var v = HQ.me(); if (!HQ.isStaff()) return;
    var kinds = ['meeting', 'training', 'social', 'interview', 'deadline', 'checkpoint', 'holiday'];
    var aud = [{ v: 'all', l: t('everyone') }, { v: 'role:va', l: t('allVas') }];
    Dx.channelsFor(v).filter(function (c) { return c.kind === 'public' || c.kind === 'client' || c.kind === 'announcements'; }).forEach(function (c) { aud.push({ v: 'ch:' + c.id, l: Dx.channelName(c, v) }); });
    Dx.vas().filter(function (p) { return p.status !== 'inactive'; }).forEach(function (p) { aud.push({ v: 'u:' + p.id, l: p.name }); });
    var sel = function (name, opts, val) { return '<select class="inp" name="' + name + '">' + opts.map(function (o) { return '<option value="' + esc(o.v) + '"' + (o.v === val ? ' selected' : '') + '>' + esc(o.l) + '</option>'; }).join('') + '</select>'; };
    var s = h.field(t('titleEn'), '<input class="inp" name="en" placeholder="Monthly training: call QA criteria">') + h.field(t('titleEs'), '<input class="inp" name="es" placeholder="Capacitación mensual: criterios de QA de llamadas">', t('sameAsEnglish'));
    s += '<div class="grid2">' + h.field(t('kind'), sel('kind', kinds.map(function (k) { return { v: k, l: kindLabel(k) }; }), 'meeting')) + h.field(t('audience'), sel('aud', aud, 'ch:ch-team')) + '</div>';
    s += '<div class="grid2">' + h.field(t('date'), '<input class="inp" type="date" name="date" value="' + esc(validDate(dateVal) ? dateVal : addDays(Dx.today(), 1)) + '">') + h.field(t('timeOptional'), '<input class="inp" type="time" name="time">') + '</div>';
    s += h.field(t('timezone'), sel('tz', TZ_OPTS.map(function (z) { return { v: z, l: F.tz(z) + ' · ' + z.split('/')[1].replace(/_/g, ' ') }; }), v.tz));
    s += h.field(t('notes'), '<textarea class="inp" name="note" rows="3"></textarea>', t('optional'));
    s += '<div id="ev-err" class="note bad" hidden style="margin-bottom:10px"></div><div class="row wrap" style="gap:8px">' + h.btn(I.plus + esc(t('addEvent')), 'add-event', 'btn-gold') + h.btn(esc(t('cancel')), 'close-sheet') + '</div>';
    HQ.sheet(s, t('addEvent'));
  }

  /* ---------- actions ---------- */
  Object.assign(HQ.act, {
    'cal-month': function (el) { st.month = shiftMonth(st.month, +el.dataset.n || 0); HQ.render(); },
    'cal-today': function () { st.month = Dx.today().slice(0, 7); HQ.render(); },
    'cal-toggle': function (el) { var k = el.dataset.set; st[k] = !st[k]; HQ.render(); },
    'cal-day': function (el) { openDaySheet(el.dataset.d); },
    'open-event': function (el) { openEventSheet(el.dataset.id); },
    'rsvp': function (el) {
      var ev = findEv(el.dataset.id); var v = HQ.me(); if (!ev || !canSee(ev, v)) return;
      ev.rsvps = ev.rsvps || {}; ev.rsvps[v.id] = el.dataset.v;
      var inSheet = !!document.getElementById('sheet'); HQ.render(); if (inSheet) openEventSheet(ev.id); HQ.toast(t('rsvpSaved'));
    },
    'open-dayoff': function (el) { openDayoff(el.dataset.date); },
    'send-dayoff': function () {
      var v = HQ.me(); if (v.role !== 'va') return;
      var f = HQ.formVals(document.getElementById('sheet')); var err = document.getElementById('dayoff-err');
      var fail = function (m) { if (err) { err.hidden = false; err.textContent = m; } };
      if (!validDate(f.date) || f.date <= Dx.today()) return fail(t('pastDate'));
      if (!(f.reason || '').trim()) return fail(t('reasonRequired'));
      var n = bizDays(Dx.today(), f.date); var ok = n >= RULE; var reason = f.reason.trim();
      var ud = { id: newId('ud'), vaId: v.id, date: f.date, declaredOn: Dx.today(), businessDaysNotice: n, status: ok ? 'approved' : 'pending', approvedBy: null, approvedOn: ok ? Dx.today() : null,
        reason: { en: reason, es: reason },
        note: ok ? { en: 'Declared ' + n + ' business days ahead; meets the rule.', es: 'Declarado con ' + n + ' días hábiles de anticipación; cumple la regla.' } : { en: 'Only ' + n + ' business days of notice, under the ' + RULE + '-business-day rule. Needs a manager decision before it reaches the client channel.', es: 'Solo ' + n + ' días hábiles de anticipación, menos de la regla de ' + RULE + ' días hábiles. Requiere decisión de tu gerente antes de pasar al canal del cliente.' } };
      D.unavailableDays = D.unavailableDays || []; D.unavailableDays.push(ud); if (ok) pushTimeoffEvent(ud);
      /* the manager hears about a request under the rule; the VA gets a receipt either way */
      var mg = manager(), when = new Date(HQ.now().getTime() + 60000).toISOString(); D.notifications = D.notifications || [];
      if (!ok && mg) D.notifications.push({ id: newId('nt'), userId: mg.id, at: when, kind: 'approval-due', read: false, text: { en: v.first + ' asked for ' + F.date(f.date, 'long') + ' off with ' + n + ' business days of notice. Your decision is needed.', es: v.first + ' pidió libre el ' + F.date(f.date, 'long') + ' con ' + n + ' días hábiles de aviso. Se necesita tu decisión.' }, link: { screen: 'timeoff', id: ud.id } });
      D.notifications.push({ id: newId('nt'), userId: v.id, at: when, kind: 'message', read: false, text: ok ? { en: 'Your day off on ' + F.date(f.date, 'long') + ' is recorded. Your client channel gets a note.', es: 'Tu día libre del ' + F.date(f.date, 'long') + ' quedó registrado. Tu canal del cliente recibe una nota.' } : { en: 'Your request for ' + F.date(f.date, 'long') + ' is with ' + (mg ? mg.first : t('manager')) + '.', es: 'Tu solicitud del ' + F.date(f.date, 'long') + ' está con ' + (mg ? mg.first : t('manager')) + '.' }, link: { screen: 'timeoff', id: ud.id } });
      HQ.closeSheet(); HQ.toast(ok ? t('dayOffAuto') : t('dayOffSent')); HQ.go('timeoff', { id: ud.id });
    },
    'tod-approve': function (el) {
      if (!Dx.can('approve')) return; var u = findUd(el.dataset.id); if (!u) return;
      u.status = 'approved'; u.approvedBy = HQ.me().id; u.approvedOn = Dx.today(); pushTimeoffEvent(u); HQ.toast(t('approvedToast')); HQ.render();
    },
    'tod-decline': function (el) {
      if (!Dx.can('approve')) return; var u = findUd(el.dataset.id); if (!u) return;
      u.status = 'declined'; HQ.toast(t('declinedToast')); HQ.render();
    },
    'open-add-event': function (el) { openAddEvent(el.dataset.date); },
    'add-event': function () {
      var v = HQ.me(); if (!HQ.isStaff()) return;
      var f = HQ.formVals(document.getElementById('sheet')); var err = document.getElementById('ev-err');
      var en = (f.en || '').trim(), es = (f.es || '').trim();
      if (!en || !validDate(f.date)) { if (err) { err.hidden = false; err.textContent = t('titleAndDate'); } return; }
      var a = f.aud || 'all'; var audience = a === 'all' ? 'all' : a.indexOf('role:') === 0 ? { role: a.slice(5) } : a.indexOf('ch:') === 0 ? { channelId: a.slice(3) } : { userId: a.slice(2) };
      var note = (f.note || '').trim();
      D.events.push({ id: newId('ev'), kind: f.kind || 'meeting', title: { en: en, es: es || en }, date: f.date, endDate: null, time: /^\d{2}:\d{2}$/.test(f.time || '') ? f.time : null, tz: f.tz || v.tz, audience: audience, rsvps: {}, note: note ? { en: note, es: note } : null, link: null, createdBy: v.id });
      st.month = f.date.slice(0, 7); HQ.closeSheet(); HQ.toast(t('eventAdded')); HQ.go('calendar', {});
    }
  });
})();
