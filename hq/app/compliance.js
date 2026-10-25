/* BeyondVAs HQ prototype: compliance and quality (scope cards, telemarketing file, call QA), tickets and escalations,
   private support threads, the audit log and the client's Help tab. */
(function () {
  var HQ = window.HQ, D = window.HQD, Dx = HQ.D, h = HQ.h, t = HQ.t, L = HQ.L, esc = HQ.esc, F = HQ.fmt, I = HQ.I, S = HQ.S;
  var isPhone = function () { return HQ.isPhone ? HQ.isPhone() : window.innerWidth <= 900; };
  ['tickets', 'scopeAcks', 'callQA', 'auditLog', 'notifications', 'messages', 'threads', 'replacements', 'offboarding', 'pulse', 'telemarketingFiles'].forEach(function (k) { D[k] = D[k] || []; });

  Object.assign(HQ.T, {
    somethingWrong: { en: 'Something wrong?', es: '¿Algo anda mal?' },
    escalateNote: { en: 'We acknowledge within 1 business day and fix within 5 days.', es: 'Acusamos recibo en 1 día hábil y lo resolvemos en 5 días.' },
    justAsk: { en: 'Just a question? Message {name}', es: '¿Solo una pregunta? Escríbele a {name}' },
    msgTo: { en: 'Message {name}', es: 'Escribir a {name}' },
    openTickets: { en: 'Open tickets', es: 'Tickets abiertos' }, noTickets: { en: 'No open tickets', es: 'Sin tickets abiertos' },
    yourVA: { en: 'Your VA', es: 'Tu VA' }, guarantees: { en: 'Guarantees', es: 'Garantías' },
    fitEndsOn: { en: 'Fit window ends', es: 'La ventana de ajuste termina' }, replEnds: { en: 'Replacement window ends', es: 'La ventana de reemplazo termina' },
    inDays: { en: 'in {n} days', es: 'en {n} días' }, daysAgo: { en: '{n} days ago', es: 'hace {n} días' },
    helpHowItWorks: { en: 'How hours, blocks, true-ups and paydays work', es: 'Cómo funcionan las horas, los bloques, los ajustes y los pagos' },
    hw1: { en: 'Hours are tracked in Hubstaff and approved every Monday for the previous week; screenshots stay in Hubstaff.', es: 'Las horas se registran en Hubstaff y se aprueban cada lunes para la semana anterior; las capturas se quedan en Hubstaff.' },
    hw2: { en: 'You prepay two-week blocks: scheduled hours × your tier rate, invoiced 5 business days before the block starts.', es: 'Pagas bloques de dos semanas por adelantado: horas programadas × la tarifa del nivel, facturados 5 días hábiles antes de que inicie el bloque.' },
    hw3: { en: 'Approved minus scheduled hours becomes a credit or debit on the next block, never a refund.', es: 'La diferencia entre horas aprobadas y programadas se vuelve crédito o cargo en el siguiente bloque, nunca un reembolso.' },
    hw4: { en: 'Your VA is paid by BeyondVAs on the 5th and 20th from approved hours; it never changes what you are billed.', es: 'BeyondVAs paga a tu VA los días 5 y 20 según las horas aprobadas; eso nunca cambia lo que se te factura.' },
    hw5: { en: 'Two weeks\' notice to cancel. A block unpaid when it starts pauses the placement and both sides are told.', es: 'Dos semanas de aviso para cancelar. Un bloque sin pagar al iniciar pausa la colocación y se avisa a ambas partes.' },
    helpContacts: { en: 'Contacts', es: 'Contactos' }, teamLogins: { en: 'Team logins', es: 'Accesos del equipo' }, inviteLogin: { en: 'Invite by email', es: 'Invitar por correo' },
    billingContact: { en: 'Billing contact', es: 'Contacto de facturación' },
    askChangeScope: { en: 'Ask to change scope', es: 'Pedir un cambio de alcance' }, callingHours: { en: 'Calling hours', es: 'Horario de llamadas' },
    ackBy: { en: '{name} acknowledged on {date}', es: '{name} confirmó el {date}' }, ackPending: { en: 'Not acknowledged yet', es: 'Aún sin confirmar' },
    youAcked: { en: 'You acknowledged this card on {date}.', es: 'Confirmaste esta tarjeta el {date}.' },
    ackAsk: { en: 'Read both lists. Tapping the button records your name, the card version and the time.', es: 'Lee ambas listas. Al tocar el botón se registra tu nombre, la versión de la tarjeta y la hora.' },
    ackThanks: { en: 'Thanks. Your acknowledgment is recorded.', es: 'Gracias. Tu confirmación quedó registrada.' },
    scopeNoPlacement: { en: 'Your scope card arrives with your first placement.', es: 'Tu tarjeta de alcance llega con tu primera colocación.' },
    publishScope: { en: 'Publish to client scope card', es: 'Publicar en la tarjeta del cliente' },
    scopeCards: { en: 'Scope cards', es: 'Tarjetas de alcance' }, telemarketingFiles: { en: 'Telemarketing files', es: 'Expedientes de telemarketing' },
    scrubDue: { en: 'Next scrub due', es: 'Próxima depuración' }, scrubOverdue: { en: 'Scrub overdue', es: 'Depuración vencida' }, noScrub: { en: 'No scrub on file', es: 'Sin depuración registrada' },
    logScrub: { en: 'Log a scrub', es: 'Registrar depuración' }, scrubDate: { en: 'Scrub date', es: 'Fecha de la depuración' },
    scrubLogged: { en: 'Scrub logged. Outbound allowed for 31 days.', es: 'Depuración registrada. Salientes permitidas por 31 días.' },
    scrubRule: { en: 'Outbound calling is blocked when the last Do-Not-Call scrub is older than 31 days.', es: 'Las llamadas salientes se bloquean cuando la última depuración No Llamar tiene más de 31 días.' },
    noOutboundSeat: { en: 'No outbound calling from this seat', es: 'Sin llamadas salientes desde este puesto' },
    listSource: { en: 'List source', es: 'Origen de la lista' }, scripts: { en: 'Scripts', es: 'Guiones' }, script: { en: 'Script', es: 'Guion' },
    noScripts: { en: 'No scripts: no outbound calling from this seat.', es: 'Sin guiones: no hay llamadas salientes desde este puesto.' },
    approvedOn: { en: 'Approved on', es: 'Aprobado el' }, byWho: { en: 'By', es: 'Por' }, version: { en: 'Version', es: 'Versión' },
    consentPractice: { en: 'Consent practice', es: 'Práctica de consentimiento' }, addendum: { en: 'Telemarketing addendum', es: 'Adenda de telemarketing' },
    notSigned: { en: 'Not signed', es: 'Sin firmar' }, recordingDisclosure: { en: 'Recording disclosure', es: 'Aviso de grabación' },
    editAudit: { en: 'Every edit here is written to the audit log.', es: 'Cada edición aquí queda en el registro de auditoría.' },
    crId: { en: 'ID in 30 s', es: 'Identificación en 30 s' }, crScript: { en: 'Script', es: 'Guion' }, crDnc: { en: 'DNC / opt-out', es: 'DNC / exclusión' }, crRec: { en: 'Recording', es: 'Grabación' }, crHand: { en: 'Handoff', es: 'Traspaso' },
    lead: { en: 'Lead', es: 'Lead' }, weekScore: { en: 'Week score', es: 'Puntaje de la semana' }, callsScored: { en: '{n} of 3 calls scored', es: '{n} de 3 llamadas evaluadas' },
    scoreCall: { en: 'Score a call', es: 'Evaluar una llamada' }, reviewedBy: { en: 'Reviewed by', es: 'Revisado por' }, callScored: { en: 'Call scored', es: 'Llamada evaluada' },
    qaRule: { en: 'Three recorded calls per ISA per week, each criterion 0 to 2 (total out of 10). Pass or fail is the manager\'s call; two failing weeks open a coaching ticket. Recordings stay in the dialer.', es: 'Tres llamadas grabadas por ISA por semana, cada criterio de 0 a 2 (total sobre 10). Aprobar o reprobar lo decide la gerencia; dos semanas reprobadas abren un ticket de coaching. Las grabaciones se quedan en el marcador.' },
    qaCoaching: { en: 'Two failing weeks in a row: open a coaching ticket.', es: 'Dos semanas reprobadas seguidas: abre un ticket de coaching.' },
    qaNotIsa: { en: 'Call QA applies to ISA placements only.', es: 'La calidad de llamadas aplica solo a colocaciones ISA.' },
    qaNone: { en: 'No calls scored yet', es: 'Aún no hay llamadas evaluadas' }, weekResult: { en: 'Week result', es: 'Resultado de la semana' }, undecided: { en: 'Not decided yet', es: 'Aún sin decidir' },
    kEscalation: { en: 'Escalation', es: 'Escalación' }, kReplacement: { en: 'Replacement', es: 'Reemplazo' }, kTech: { en: 'Tech', es: 'Tecnología' }, kCoaching: { en: 'Coaching', es: 'Coaching' },
    opened: { en: 'Opened', es: 'Abierto' }, openedBy: { en: 'by', es: 'por' }, ackOverdue: { en: 'Acknowledgment overdue', es: 'Acuse atrasado' }, fixOverdue: { en: 'Fix window passed', es: 'Plazo de solución vencido' },
    ackNow: { en: 'Acknowledge', es: 'Confirmar recibido' }, ticketUpdate: { en: 'Add update', es: 'Agregar actualización' }, closeTicket: { en: 'Close ticket', es: 'Cerrar ticket' },
    ticketAcked: { en: 'Acknowledged. The client sees the time stamp.', es: 'Confirmado. El cliente ve la hora.' }, updateAdded: { en: 'Update added', es: 'Actualización agregada' }, ticketClosed: { en: 'Ticket closed', es: 'Ticket cerrado' },
    writeUpdate: { en: 'What happened?', es: '¿Qué pasó?' }, timeline: { en: 'Timeline', es: 'Línea de tiempo' }, summary: { en: 'Summary', es: 'Resumen' }, closedOn: { en: 'Closed', es: 'Cerrado' },
    replacementChain: { en: 'Replacement chain', es: 'Cadena de reemplazo' }, offboardingList: { en: 'Offboarding checklist', es: 'Lista de salida' },
    requested: { en: 'Requested', es: 'Solicitado' }, candidatesShown: { en: 'Candidates shown', es: 'Candidatos presentados' }, newStart: { en: 'New start', es: 'Nuevo inicio' }, bizDays: { en: 'business days', es: 'días hábiles' },
    escCategory: { en: 'What is it about?', es: '¿De qué se trata?' }, cQuality: { en: 'Quality of work', es: 'Calidad del trabajo' }, cHours: { en: 'Hours or availability', es: 'Horas o disponibilidad' },
    cComm: { en: 'Communication', es: 'Comunicación' }, cScope: { en: 'Out of scope', es: 'Fuera del alcance' }, cOther: { en: 'Other', es: 'Otro' },
    escWho: { en: '{a} and {b} get this; your VA is not notified by HQ.', es: '{a} y {b} lo reciben; HQ no avisa a tu VA.' }, escNeedText: { en: 'Tell us what is wrong first.', es: 'Cuéntanos primero qué está pasando.' },
    upTo500: { en: 'Up to 500 characters', es: 'Hasta 500 caracteres' }, escOpenedFrom: { en: 'Escalation opened from HQ.', es: 'Escalación abierta desde HQ.' },
    when: { en: 'When', es: 'Cuándo' }, who: { en: 'Who', es: 'Quién' }, what: { en: 'What', es: 'Qué' }, detail: { en: 'Detail', es: 'Detalle' },
    auditOwnerOnly: { en: 'Only the owner can open the audit log.', es: 'Solo el propietario puede abrir el registro de auditoría.' },
    myThreads: { en: 'My private threads', es: 'Mis hilos privados' }, newThread: { en: 'New private thread', es: 'Nuevo hilo privado' }, topic: { en: 'Topic', es: 'Tema' },
    tPay: { en: 'Pay', es: 'Pago' }, tClient: { en: 'Client', es: 'Cliente' }, tHr: { en: 'HR', es: 'RR. HH.' }, tTech: { en: 'Tech', es: 'Tecnología' },
    title: { en: 'Title', es: 'Título' }, firstMessage: { en: 'First message', es: 'Primer mensaje' }, needTitleMsg: { en: 'Add a title and a first message.', es: 'Agrega un título y un primer mensaje.' },
    threadCreated: { en: 'Thread created. Only you, Daniela and Charly can read it.', es: 'Hilo creado. Solo tú, Daniela y Charly pueden leerlo.' }, noThreads: { en: 'No open topics', es: 'Sin temas abiertos' },
    supportClient: { en: 'Support threads are for VAs. Use Help or Escalate.', es: 'Los hilos de soporte son para VAs. Usa Ayuda o Escalar.' },
    pulseScores: { en: 'Client pulse', es: 'Pulso de clientes' }, latestComment: { en: 'Latest comments', es: 'Últimos comentarios' },
    helpStaff: { en: 'Tickets, compliance and support threads live under More.', es: 'Tickets, cumplimiento e hilos de soporte están en Más.' },
    helpApplicant: { en: 'Questions about your application? Daniela replies in your recruiting messages.', es: '¿Dudas sobre tu solicitud? Daniela responde en tus mensajes de reclutamiento.' },
    helpVa: { en: 'Your private support thread is the fastest way to reach Daniela.', es: 'Tu hilo privado de apoyo es la forma más rápida de llegar a Daniela.' },
    openChannel: { en: 'Open channel', es: 'Abrir canal' }, thisWeekQa: { en: 'this week', es: 'esta semana' }, lastWeekQa: { en: 'last scored week', es: 'última semana evaluada' },
    stateLbl: { en: 'State', es: 'Estado (EE. UU.)' }, dateLbl: { en: 'Date', es: 'Fecha' }
  });

  /* ---------- helpers ---------- */
  function newId(prefix) { return prefix + '-' + Math.random().toString(36).slice(2, 8); }
  function nowIso() { return new Date(HQ.now().getTime() + 60000).toISOString(); }
  function ico(name, size) { return (I[name] || '').replace('<svg', '<svg width="' + (size || 16) + '" height="' + (size || 16) + '" style="fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;vertical-align:-3px"'); }
  function addDays(iso, n) { var d = new Date(iso + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); }
  function addBusinessDays(date, n) { var x = new Date(date.getTime()); var k = 0; while (k < n) { x.setUTCDate(x.getUTCDate() + 1); var dow = x.getUTCDay(); if (dow !== 0 && dow !== 6) k++; } return x; }
  function weekStartOf(iso) { var d = new Date(iso + 'T12:00:00Z'); var dow = (d.getUTCDay() + 6) % 7; d.setUTCDate(d.getUTCDate() - dow); return d.toISOString().slice(0, 10); }
  function weekLabel(ws) { return F.date(ws) + '–' + F.date(addDays(ws, 6)); }
  function monthLabel(m) { var s = new Date(m + '-15T12:00:00Z').toLocaleDateString(F.locale(), { month: 'short', year: 'numeric', timeZone: 'UTC' }); return s.charAt(0).toUpperCase() + s.slice(1); }
  function isPast(iso) { return !!iso && Date.parse(iso) < HQ.now().getTime(); }
  function when(iso) { var v = HQ.me(); if (!iso) return '—'; var s = new Date(iso).toLocaleDateString(F.locale(), { weekday: 'short', month: 'short', day: 'numeric', timeZone: v.tz }); return s.charAt(0).toUpperCase() + s.slice(1) + ' · ' + F.time(iso, v.tz) + ' ' + F.tz(v.tz); }
  function who(id, viewer) { viewer = viewer || HQ.me(); var p = typeof id === 'string' ? Dx.person(id) : id; if (!p) return id === 'system' ? 'HQ' : '…'; if (p.role === 'va') return Dx.vaLabel(p, viewer); if ((p.role === 'owner' || p.role === 'manager') && viewer.role === 'client') return p.first + ' · BeyondVAs'; return p.name; }
  function block(title, inner, cls) { return '<div class="card ' + (cls || '') + '"><h3>' + esc(title) + '</h3>' + inner + '</div>'; }
  function msgBtn(personId, label, kind) {
    var v = HQ.me(); var p = Dx.person(personId); var dm = D.channels.filter(function (c) { return c.kind === 'dm' && c.members.indexOf(v.id) >= 0 && c.members.indexOf(personId) >= 0; })[0];
    var lbl = ico('chat') + ' ' + esc(label || t('msgTo', { name: p ? p.first : '' }));
    return dm ? h.go(lbl, 'channel', { id: dm.id }, kind || 'btn-ghost btn-sm') : h.btn(lbl, 'toast', kind || 'btn-ghost btn-sm', { msg: t('prototypeOnly') });
  }
  function canSeePlacement(pl, v) { if (!pl) return false; if (HQ.isStaff()) return true; if (v.role === 'va') return pl.vaId === v.id; if (v.role === 'client') return pl.clientId === v.clientId; return false; }
  function canSeeClient(cl, v) { if (!cl) return false; if (HQ.isStaff()) return true; if (v.role === 'client') return cl.id === v.clientId; if (v.role === 'va') return Dx.placementsOf(v).some(function (p) { return p.clientId === cl.id; }); return false; }
  function audit(action, target, detail) { D.auditLog.push({ id: newId('al'), at: nowIso(), by: HQ.me().id, action: action, target: target, detail: detail }); }
  function ver(v) { v = String(v == null ? '' : v); return /^v/i.test(v) ? v : 'v' + v; }

  /* scope cards and telemarketing */
  function scopeFor(cl) { var sc = D.scopeCards || {}; return (cl && sc[cl.scopePreset]) || sc['default']; }
  function ackFor(plId) { return D.scopeAcks.filter(function (a) { return a.placementId === plId; }).sort(function (a, b) { return Date.parse(b.acknowledgedAt) - Date.parse(a.acknowledgedAt); })[0] || null; }
  function tmFile(clientId) { return D.telemarketingFiles.filter(function (f) { return f.clientId === clientId; })[0] || null; }
  function scrubState(f) {
    if (!f) return { blocked: true, days: null, reason: 'none' };
    if (!f.outboundAllowed) return { blocked: true, days: null, reason: 'seat' };
    if (!f.lastScrubOn) return { blocked: true, days: null, reason: 'none' };
    var days = -F.daysUntil(f.lastScrubOn); return { blocked: days > 31, days: days, reason: days > 31 ? 'stale' : 'ok' };
  }
  function outboundChip(f) { var st = scrubState(f); return h.chip(st.blocked ? t('outboundBlocked') : t('outboundOk'), st.blocked ? 'bad' : 'good', true); }
  function scrubLine(f) { var st = scrubState(f); if (st.reason === 'seat') return t('noOutboundSeat'); if (!f || !f.lastScrubOn) return t('noScrub'); return t('lastScrub') + ' ' + F.date(f.lastScrubOn, 'long') + ' · ' + t('daysAgo', { n: st.days }) + (st.blocked ? ' · ' + t('scrubOverdue') : ' · ' + t('scrubDue') + ' ' + F.date(f.scrubDueOn)); }
  function scopeCardHtml(sc) {
    var li = function (x) { return '<li>' + esc(L(x)) + '</li>'; };
    var s = '<div class="card"><div class="card-head"><h3>' + esc(L(sc.title)) + '</h3>' + h.chip(t('version') + ' ' + sc.version, 'blue') + '</div>';
    s += '<div class="scope-list"><div><b class="small" style="color:var(--good-fg)">' + ico('check') + ' ' + esc(t('allowed')) + '</b><ul>' + sc.allowed.map(li).join('') + '</ul></div>';
    s += '<div><b class="small" style="color:var(--bad-fg)">' + ico('x') + ' ' + esc(t('notAllowed')) + '</b><ul>' + sc.notAllowed.map(li).join('') + '</ul></div></div>';
    s += '<div class="small" style="margin:12px 0"><b>' + esc(t('callingHours')) + ':</b> ' + esc(L(sc.callingHours)) + '</div>';
    s += h.note(esc(L(sc.notes)), '');
    if (sc.counselReview === 'pending') s += '<div style="margin-top:8px">' + h.note(ico('alert') + ' ' + esc(t('counselPending')), 'warn') + '</div>';
    return s + '</div>';
  }
  function ackHtml(pl, sc, v) {
    var ack = ackFor(pl.id); var cur = ack && ack.version === sc.version; var va = Dx.person(pl.vaId);
    if (v.role === 'va' && pl.vaId === v.id) {
      if (cur) return h.note(ico('check') + ' ' + esc(t('youAcked', { date: F.date(HQ.isoDate(ack.acknowledgedAt), 'long') })), 'good');
      return '<div class="card accent"><p class="small" style="margin-bottom:10px">' + esc(t('ackAsk')) + '</p>' + h.btn(ico('check', 18) + ' ' + esc(t('acknowledge')), 'ack-scope', 'btn-gold btn-lg btn-block', { id: pl.id }) + '</div>';
    }
    var chip = cur ? h.chip(t('ackBy', { name: who(va, v), date: F.date(HQ.isoDate(ack.acknowledgedAt)) }), 'good', true) : h.chip(t('ackPending'), 'warn', true);
    var right = HQ.isStaff() ? h.btn(esc(t('publishScope')), 'toast', 'btn-ghost btn-sm', { msg: t('prototypeOnly') }) : (v.role === 'client' ? msgBtn('u-daniela', t('askChangeScope')) : '');
    return '<div class="row between wrap" style="gap:8px">' + chip + right + '</div>';
  }
  function tmSummary(cl, v) {
    var f = tmFile(cl.id); if (!f) return '';
    var s = '<div class="card"><div class="card-head"><h3>' + esc(t('telemarketingFile')) + '</h3>' + outboundChip(f) + '</div><div class="list">';
    s += h.li({ title: esc(t('lastScrub')), sub: esc(scrubLine(f)) });
    s += h.li({ title: esc(t('scripts')), sub: f.scripts.length ? f.scripts.map(function (sc) { return esc(L(sc.name) + ' ' + ver(sc.version) + (sc.status === 'draft' ? ' · ' + t('draft') : '')); }).join(' · ') : esc(t('noScripts')) });
    s += h.li({ title: esc(t('recordingDisclosure')), sub: esc(L(f.recordingDisclosure)) });
    s += '</div><div style="margin-top:10px">' + h.go(esc(t('open')) + ' ' + esc(t('telemarketingFile').toLowerCase()), 'telemarketing', { id: cl.id }, 'btn-ghost btn-sm') + '</div></div>';
    return s;
  }

  /* tickets */
  function ticketsFor(v) { var all = D.tickets; if (HQ.isStaff()) return all; if (v.role === 'client') return all.filter(function (k) { return k.clientId === v.clientId; }); if (v.role === 'va') return all.filter(function (k) { return k.vaId === v.id; }); return []; }
  function ticketById(id) { return D.tickets.filter(function (k) { return k.id === id; })[0] || null; }
  function kindChip(kind) { var m = { escalation: ['kEscalation', 'bad'], replacement: ['kReplacement', 'gold'], tech: ['kTech', 'blue'], coaching: ['kCoaching', 'warn'] }; var x = m[kind]; return x ? h.chip(t(x[0]), x[1]) : h.chip(kind); }
  function slaChips(k) {
    if (k.status === 'closed') return h.statusChip('closed');
    var s = k.ackAt ? h.chip(t('acknowledgedAt') + ' ' + F.time(k.ackAt, HQ.me().tz), 'good', true) : (isPast(k.ackDueAt) ? h.chip(t('ackOverdue'), 'bad', true) : h.chip(t('slaAck') + ' ' + F.dayLabel(HQ.isoDate(k.ackDueAt)), 'warn', true));
    return s + ' ' + (isPast(k.fixDueAt) ? h.chip(t('fixOverdue'), 'bad', true) : h.chip(t('slaFix') + ' ' + F.date(HQ.isoDate(k.fixDueAt)), 'blue'));
  }
  function ticketRow(k, v) {
    var cl = Dx.client(k.clientId), va = Dx.person(k.vaId);
    var sub = [cl ? cl.name : null, va ? who(va, v) : null, t('opened') + ' ' + F.date(HQ.isoDate(k.openedAt))].filter(Boolean).join(' · ');
    return h.li({ lead: h.avatar(va || Dx.person(k.openedBy)), title: esc(L(k.title)) + ' <span class="tiny muted">' + esc(k.id) + '</span>', sub: esc(sub) + '<div class="row wrap" style="gap:6px;margin-top:5px">' + kindChip(k.kind) + h.statusChip(k.status) + slaChips(k) + '</div>', go: 'ticket', params: { id: k.id } });
  }
  /* A plan line or timeline entry that carries a $ amount is a payout detail (a reimbursement, a credit on the VA's
     payday): owner, manager and the VA see it, the client projection leaves it out (APP-CONTRACT rule 1). */
  function hasMoney(s) { return /\$\s?\d/.test(s || ''); }
  function clientSafe(items, v, pick) { return v.role === 'client' ? items.filter(function (x) { return !hasMoney(L(pick ? pick(x) : x)); }) : items; }
  function timelineHtml(items, v) {
    if (!items.length) return h.empty(t('nothingHere'), '');
    return '<div class="timeline">' + items.map(function (e) { return '<div class="tl"><div class="when">' + esc(when(e.at)) + ' · ' + esc(who(e.by, v)) + '</div><div>' + esc(L(e.text)) + '</div></div>'; }).join('') + '</div>';
  }

  /* ---------- Help (the client's tab; other roles get a short page) ---------- */
  HQ.V.help = function () {
    var v = HQ.me(); var mgr = Dx.person('u-daniela'), own = Dx.person('u-charly');
    if (v.role !== 'client') {
      var s0 = '<div class="card stack">';
      if (v.role === 'va') { var pv = Dx.placementForVa(v.id); s0 += '<p class="small">' + esc(t('helpVa')) + '</p><div class="list">' + h.li({ lead: '<span class="hash">' + ico('lock', 18) + '</span>', title: esc(t('support')), go: 'support' }) + (pv ? h.li({ lead: '<span class="hash">' + ico('briefcase', 18) + '</span>', title: esc(t('placement')), sub: esc(Dx.client(pv.clientId).name), go: 'placement', params: { id: pv.id } }) + h.li({ lead: '<span class="hash">' + ico('shield', 18) + '</span>', title: esc(t('scopeCard')), go: 'scope', params: { id: pv.id } }) : '') + '</div>'; }
      else if (v.role === 'applicant') s0 += '<p class="small">' + esc(t('helpApplicant')) + '</p>';
      else s0 += '<p class="small">' + esc(t('helpStaff')) + '</p><div class="list">' + h.li({ lead: '<span class="hash">' + ico('flag', 18) + '</span>', title: esc(t('tickets')), go: 'tickets' }) + h.li({ lead: '<span class="hash">' + ico('shield', 18) + '</span>', title: esc(t('compliance')), go: 'compliance' }) + h.li({ lead: '<span class="hash">' + ico('lock', 18) + '</span>', title: esc(t('supportThreads')), go: 'support' }) + '</div>';
      s0 += '<div class="row wrap" style="gap:8px">' + (v.id !== mgr.id ? msgBtn(mgr.id) : '') + (v.id !== own.id ? msgBtn(own.id) : '') + '</div></div>';
      return { title: t('help'), body: s0 };
    }
    var cl = Dx.client(v.clientId); var pls = Dx.placementForClient(cl.id); var pl = pls[0];
    var s = '<div class="stack">';
    s += '<div class="card alert"><h3>' + esc(t('somethingWrong')) + '</h3>' + (pl ? h.btn(ico('flag', 20) + ' ' + esc(t('escalate')), 'open-escalate', 'btn-danger btn-lg btn-block', { id: pl.id }) : h.empty(t('nothingHere'), '')) + '<p class="small muted" style="margin:10px 0">' + esc(t('escalateNote')) + '</p>' + msgBtn(mgr.id, t('justAsk', { name: mgr.first })) + '</div>';
    var open = ticketsFor(v).filter(function (k) { return k.status !== 'closed'; });
    s += '<div class="card"><div class="card-head"><h3>' + esc(t('openTickets')) + '</h3>' + h.go(esc(t('seeAll')), 'tickets', {}, 'btn-ghost btn-sm') + '</div>' + (open.length ? '<div class="list">' + open.map(function (k) { return ticketRow(k, v); }).join('') + '</div>' : '<p class="small muted">' + esc(t('noTickets')) + '</p>') + '</div>';
    s += '<div class="card"><div class="list">';
    pls.forEach(function (p) { var va = Dx.person(p.vaId); s += h.li({ lead: h.avatar(va), title: esc(t('yourVA')) + ' · ' + esc(who(va, v)), sub: esc(Dx.tierShort(p.tier) + ' · ' + t('since') + ' ' + F.date(p.start, 'long')), go: 'placement', params: { id: p.id } }); s += h.li({ lead: '<span class="hash">' + ico('shield', 18) + '</span>', title: esc(t('scopeCard')), sub: esc(L(scopeFor(cl).title)), go: 'scope', params: { id: p.id } }); });
    s += '</div></div>';
    s += '<div class="card"><h3>' + esc(t('guarantees')) + '</h3><div class="list">';
    pls.forEach(function (p) { var va = Dx.person(p.vaId); s += h.li({ title: esc(t('fitGuarantee')) + ' <span class="small muted">· ' + esc(who(va, v)) + '</span>', sub: esc(t('fitEndsOn') + ' ' + F.date(p.fitWindowEnds, 'long') + ' · ' + t('inDays', { n: F.daysUntil(p.fitWindowEnds) })), trail: h.chip(F.date(p.fitWindowEnds), 'gold') }); s += h.li({ title: esc(t('replacementGuarantee')), sub: esc(t('replEnds') + ' ' + F.date(p.replacementWindowEnds, 'long') + ' · ' + t('seatSince') + ' ' + F.date(p.seatStart, 'long')), trail: h.chip(F.date(p.replacementWindowEnds), 'blue') }); });
    s += '</div></div>';
    s += '<div class="card"><h3>' + esc(t('helpHowItWorks')) + '</h3><ol class="small" style="padding-left:20px;line-height:1.6">' + ['hw1', 'hw2', 'hw3', 'hw4', 'hw5'].map(function (k) { return '<li>' + esc(t(k)) + '</li>'; }).join('') + '</ol></div>';
    s += '<div class="card"><h3>' + esc(t('helpContacts')) + '</h3><div class="list">' + [mgr, own].map(function (p) { return h.li({ lead: h.avatar(p), title: esc(who(p, v)), sub: esc(L(p.title) + ' · ' + p.city), trail: msgBtn(p.id) }); }).join('') + '</div></div>';
    s += '<div class="card"><div class="card-head"><h3>' + esc(t('teamLogins')) + '</h3>' + h.btn(ico('plus') + ' ' + esc(t('inviteLogin')), 'toast', 'btn-ghost btn-sm', { msg: t('prototypeOnly') }) + '</div><div class="list">' + (cl.logins || []).map(function (id) { var p = Dx.person(id); return p ? h.li({ lead: h.avatar(p), title: esc(p.name) + (p.id === v.id ? ' <span class="tiny muted">(' + (HQ.lang() === 'es' ? 'tú' : 'you') + ')</span>' : ''), sub: esc(L(p.title) + ' · ' + p.email) }) : ''; }).join('') + '</div><p class="tiny muted" style="margin-top:8px">' + esc(t('billingContact')) + ': ' + esc(cl.billingEmail) + '</p></div>';
    return { title: t('help'), sub: esc(cl.name), body: s + '</div>' };
  };

  /* ---------- Compliance (role-aware) ---------- */
  HQ.V.compliance = function () {
    var v = HQ.me();
    if (v.role === 'client') { var cpl = Dx.placementForClient(v.clientId)[0]; if (!cpl) return { title: t('compliance'), body: h.empty(t('nothingHere'), '') }; var r = HQ.V.scope({ id: cpl.id }); r.title = t('scopeCard'); return r; }
    if (v.role === 'va') { var vpl = Dx.placementForVa(v.id); if (!vpl) return { title: t('scopeCard'), body: h.empty(t('nothingHere'), t('scopeNoPlacement')) }; var r2 = HQ.V.scope({ id: vpl.id }); r2.title = t('scopeCard'); return r2; }
    if (!HQ.isStaff()) return { title: t('compliance'), body: h.empty(t('nothingHere'), '') };
    var pls = Dx.activePlacements(); var s = ''; var ph = isPhone();
    /* on a phone the status chip goes under the text, so the title keeps its width (the trail would squeeze it) */
    var under = function (chip) { return ph ? '<div style="margin-top:5px">' + chip + '</div>' : ''; };
    s += h.sec(t('scopeCards')) + '<div class="card flat tight"><div class="list">' + (pls.length ? pls.map(function (pl) {
      var va = Dx.person(pl.vaId), cl = Dx.client(pl.clientId), sc = scopeFor(cl), ack = ackFor(pl.id); var cur = ack && ack.version === sc.version;
      var chip = cur ? h.chip(t('acknowledged'), 'good', true) : h.chip(t('ackPending'), 'warn', true);
      return h.li({ lead: h.avatar(va), title: esc(va.name) + ' <span class="small muted">· ' + esc(cl.name) + '</span>', sub: esc(L(sc.title) + ' · ' + t('version') + ' ' + sc.version) + under(chip), trail: ph ? '' : chip, go: 'scope', params: { id: pl.id } });
    }).join('') : h.empty(t('nothingHere'), '')) + '</div></div>';
    s += h.sec(t('telemarketingFiles')) + '<div class="card flat tight"><div class="list">' + D.clients.map(function (cl) { var f = tmFile(cl.id); var chip = outboundChip(f); return h.li({ lead: '<span class="hash">' + esc(cl.state) + '</span>', title: esc(cl.name), sub: esc(scrubLine(f)) + under(chip), trail: ph ? '' : chip, go: 'telemarketing', params: { id: cl.id } }); }).join('') + '</div><p class="tiny muted" style="margin:8px 4px 2px">' + esc(t('scrubRule')) + '</p></div>';
    var isas = pls.filter(function (pl) { return pl.tier === 'isa'; }); var cur = weekStartOf(Dx.today());
    s += h.sec(t('callQA')) + '<div class="card flat tight"><div class="list">' + (isas.length ? isas.map(function (pl) {
      var va = Dx.person(pl.vaId); var weeks = D.callQA.filter(function (w) { return w.vaId === va.id; }).sort(function (a, b) { return a.weekStart < b.weekStart ? 1 : -1; }); var cw = weeks.filter(function (w) { return w.weekStart === cur; })[0]; var last = weeks.filter(function (w) { return w.weekStart !== cur; })[0];
      var chip = last ? h.chip(last.pass ? t('pass') : t('fail'), last.pass ? 'good' : 'bad', true) : h.chip(t('pending'), 'warn', true);
      return h.li({ lead: h.avatar(va), title: esc(va.name) + ' <span class="small muted">· ' + esc(Dx.client(pl.clientId).name) + '</span>', sub: esc(t('callsScored', { n: cw ? cw.calls.length : 0 }) + ' ' + t('thisWeekQa') + (last ? ' · ' + t('lastWeekQa') + ' ' + weekLabel(last.weekStart) + ': ' + last.weekScore + '/10' : '')) + under(chip), trail: ph ? '' : chip, go: 'callqa', params: { id: va.id } });
    }).join('') : h.empty(t('qaNone'), '')) + '</div></div>';
    var months = []; D.pulse.forEach(function (p) { if (months.indexOf(p.month) < 0) months.push(p.month); }); months.sort();
    s += h.sec(t('pulseScores')) + '<div class="card flat tight">' + h.table([{ l: t('client_') }].concat(months.map(function (m) { return { l: monthLabel(m), num: true }; })), D.clients.map(function (cl) { return [esc(cl.name)].concat(months.map(function (m) { var r = D.pulse.filter(function (p) { return p.clientId === cl.id && p.month === m; })[0]; return r ? '<b>' + r.score + '</b><span class="tiny muted"> / 5</span>' : '<span class="muted">—</span>'; })); }));
    s += '<div class="list" style="margin-top:6px">' + D.clients.map(function (cl) { var last = D.pulse.filter(function (p) { return p.clientId === cl.id; }).sort(function (a, b) { return a.month < b.month ? 1 : -1; })[0]; return last ? h.li({ title: esc(cl.name) + ' <span class="small muted">· ' + esc(monthLabel(last.month)) + ' · ' + last.score + '/5</span>', sub: esc(last.comment || '') }) : ''; }).join('') + '</div></div>';
    if (v.role === 'owner') s += '<div style="margin-top:16px">' + h.go(ico('doc') + ' ' + esc(t('auditLog')), 'audit', {}, 'btn-ghost') + '</div>';
    return { title: t('compliance'), body: s };
  };

  /* ---------- Scope card page ---------- */
  HQ.V.scope = function (p) {
    var v = HQ.me(); var pl = Dx.placement(p.id);
    if (!canSeePlacement(pl, v)) return { title: t('scopeCard'), body: h.empty(t('nothingHere'), '') };
    var cl = Dx.client(pl.clientId), va = Dx.person(pl.vaId), sc = scopeFor(cl);
    var s = '<div class="stack">' + scopeCardHtml(sc) + ackHtml(pl, sc, v);
    /* the telemarketing summary is always shown when a file exists: a blocked seat is worth stating too */
    if (tmFile(cl.id)) s += tmSummary(cl, v);
    s += '<div class="row wrap" style="gap:8px">' + h.go(ico('briefcase') + ' ' + esc(t('placement')), 'placement', { id: pl.id }, 'btn-ghost btn-sm') + (v.role === 'client' ? '' : h.go(esc(t('compliance')), 'compliance', {}, 'btn-ghost btn-sm')) + '</div></div>';
    return { title: t('scopeCard'), sub: esc(cl.name + ' · ' + who(va, v) + ' · ' + Dx.tierShort(pl.tier) + ' · ' + t('stateLbl') + ' ' + cl.state), body: s };
  };

  /* ---------- Telemarketing file ---------- */
  HQ.V.telemarketing = function (p) {
    var v = HQ.me(); var cl = Dx.client(p.id);
    if (!canSeeClient(cl, v)) return { title: t('telemarketingFile'), body: h.empty(t('nothingHere'), '') };
    var f = tmFile(cl.id); if (!f) return { title: t('telemarketingFile'), sub: esc(cl.name), body: h.empty(t('nothingHere'), '') };
    var st = scrubState(f); var s = '<div class="stack">';
    s += '<div class="card"><div class="card-head"><h3>' + esc(t('lastScrub')) + '</h3>' + outboundChip(f) + '</div><div class="kpis">' + h.kpi(f.lastScrubOn ? F.date(f.lastScrubOn) : '—', t('lastScrub'), st.blocked ? 'bad' : 'good') + h.kpi(f.scrubDueOn ? F.date(f.scrubDueOn) : '—', t('scrubDue'), f.scrubDueOn && isPast(f.scrubDueOn + 'T23:59:00Z') ? 'bad' : '') + '</div>';
    s += '<p class="small muted" style="margin:10px 0">' + esc(scrubLine(f)) + '</p>' + h.note(esc(t('scrubRule')), st.blocked ? 'bad' : '');
    if (HQ.isStaff() && f.outboundAllowed) s += '<div style="margin-top:10px">' + h.btn(ico('check', 18) + ' ' + esc(t('logScrub')), 'open-scrub', 'btn-gold', { id: cl.id }) + '</div>';
    s += '</div>';
    if (f.notes) s += h.note(esc(L(f.notes)), '');
    s += block(t('listSource'), '<p class="small">' + esc(L(f.listSource)) + '</p>');
    s += block(t('scripts'), f.scripts.length ? h.table([{ l: t('script') }, { l: t('version') }, { l: t('approvedOn') }, { l: t('byWho') }, { l: t('status') }], f.scripts.map(function (sc) { return [esc(L(sc.name)), esc(ver(sc.version)), sc.approvedOn ? esc(F.date(sc.approvedOn)) : '—', sc.approvedBy ? esc(who(sc.approvedBy, v)) : '—', sc.status === 'draft' ? h.chip(t('draft'), 'warn') : h.chip(t('approved'), 'good')]; })) : '<p class="small muted">' + esc(t('noScripts')) + '</p>');
    s += block(t('consentPractice'), '<p class="small">' + esc(L(f.consentPractice)) + '</p>');
    s += block(t('callingHours'), '<p class="small">' + esc(L(f.callingHours)) + '</p>');
    s += block(t('addendum'), f.addendumSignedOn ? h.chip(t('signed') + ' ' + F.date(f.addendumSignedOn, 'long'), 'good', true) : h.chip(t('notSigned'), 'bad', true));
    s += block(t('recordingDisclosure'), '<p class="small">' + esc(L(f.recordingDisclosure)) + '</p>');
    s += '<div class="row wrap" style="gap:8px">' + h.go(esc(t('scopeCard')), 'scope', { id: (Dx.placementForClient(cl.id)[0] || {}).id || '' }, 'btn-ghost btn-sm') + (HQ.isStaff() ? h.go(esc(t('compliance')), 'compliance', {}, 'btn-ghost btn-sm') : '') + '</div>';
    if (HQ.isStaff()) s += '<p class="tiny muted">' + esc(t('editAudit')) + '</p>';
    return { title: t('telemarketingFile'), sub: esc(cl.name + ' · ' + cl.state), body: s + '</div>' };
  };

  /* ---------- Call QA ---------- */
  var CRIT = [['identification', 'crId'], ['script', 'crScript'], ['dnc', 'crDnc'], ['recording', 'crRec'], ['handoff', 'crHand']];
  HQ.V.callqa = function (p) {
    var v = HQ.me(); var va = Dx.person(p.id) || (v.role === 'va' ? v : null);
    if (!va || va.role !== 'va' || !(HQ.isStaff() || va.id === v.id)) return { title: t('callQA'), body: h.empty(t('nothingHere'), '') };
    if (va.tier !== 'isa') return { title: t('callQA'), sub: esc(va.name), body: h.empty(t('qaNone'), t('qaNotIsa')) };
    var weeks = D.callQA.filter(function (w) { return w.vaId === va.id; }).sort(function (a, b) { return a.weekStart < b.weekStart ? 1 : -1; });
    var cur = weekStartOf(Dx.today()); var pl = Dx.placementForVa(va.id);
    if (pl && !weeks.some(function (w) { return w.weekStart === cur; })) weeks.unshift({ id: null, vaId: va.id, placementId: pl.id, weekStart: cur, calls: [], weekScore: null, pass: null, virtual: true });
    if (!weeks.length) return { title: t('callQA'), sub: esc(va.name), body: h.empty(t('qaNone'), t('qaRule')) };
    var ws = p.week || weeks[0].weekStart; var w = weeks.filter(function (x) { return x.weekStart === ws; })[0] || weeks[0];
    var s = '<div class="stack">' + h.seg(weeks.map(function (x) { return { v: x.weekStart, l: weekLabel(x.weekStart) }; }), w.weekStart, 'qa-week', { id: va.id });
    var real = weeks.filter(function (x) { return x.pass !== null && x.pass !== undefined; });
    if (real.length >= 2 && !real[0].pass && !real[1].pass) s += h.note(ico('alert') + ' ' + esc(t('qaCoaching')), 'bad');
    s += '<div class="card"><div class="card-head"><h3>' + esc(weekLabel(w.weekStart)) + '</h3>' + (w.pass === true ? h.chip(t('pass'), 'good', true) : w.pass === false ? h.chip(t('fail'), 'bad', true) : h.chip(t('undecided'), 'warn', true)) + '</div>';
    s += '<div class="kpis">' + h.kpi(w.weekScore != null ? w.weekScore + '<span class="small muted">/10</span>' : '—', t('weekScore'), w.pass === false ? 'bad' : w.pass ? 'good' : '') + h.kpi(w.calls.length + '<span class="small muted">/3</span>', t('callsScored', { n: w.calls.length }).replace(/^\d+ /, '')) + '</div>';
    if (w.reviewedBy) s += '<p class="small muted" style="margin-top:10px">' + esc(t('reviewedBy') + ' ' + who(w.reviewedBy, v) + ' · ' + F.date(w.reviewedOn, 'long')) + '</p>';
    if (HQ.isStaff() && w.calls.length < 3) s += '<div style="margin-top:10px">' + h.btn(ico('plus', 18) + ' ' + esc(t('scoreCall')), 'open-score', 'btn-gold', { id: va.id, week: w.weekStart }) + '</div>';
    s += '</div>';
    if (w.calls.length) {
      s += '<div class="card">' + h.table([{ l: t('dateLbl') }, { l: t('lead') }].concat(CRIT.map(function (c) { return { l: t(c[1]), num: true }; })).concat([{ l: t('total'), num: true }]), w.calls.map(function (c) { return [esc(F.date(c.date, 'long')), esc(c.leadRef)].concat(CRIT.map(function (k) { var x = c.scores[k[0]]; return x === 0 ? '<b style="color:var(--bad-fg)">0</b>' : x === 1 ? '<span style="color:var(--warn-fg)">1</span>' : '2'; })).concat(['<b>' + c.total + '</b>']); })) + '</div>';
      s += '<div class="card"><h3>' + esc(t('notes')) + '</h3><div class="list">' + w.calls.map(function (c) { return h.li({ lead: '<span class="hash">' + c.total + '</span>', title: esc(F.date(c.date, 'long') + ' · ' + c.leadRef), sub: esc(L(c.notes)) }); }).join('') + '</div></div>';
    } else s += h.empty(t('qaNone'), '');
    s += h.note(esc(t('qaRule')), '') + '</div>';
    return { title: t('callQA'), sub: esc(va.name + (pl ? ' · ' + Dx.client(pl.clientId).name : '')), body: s };
  };

  /* ---------- Tickets ---------- */
  HQ.V.tickets = function (p) {
    var v = HQ.me(); var all = ticketsFor(v); var f = p.f || 'open';
    if (v.role === 'applicant') return { title: t('tickets'), body: h.empty(t('nothingHere'), '') };
    var list = (f === 'open' ? all.filter(function (k) { return k.status !== 'closed'; }) : all.slice()).sort(function (a, b) { if ((a.status === 'closed') !== (b.status === 'closed')) return a.status === 'closed' ? 1 : -1; return Date.parse(b.openedAt) - Date.parse(a.openedAt); });
    var s = '<div class="row between wrap" style="margin-bottom:10px;gap:8px">' + h.seg([{ v: 'open', l: t('open_') }, { v: 'all', l: t('all') }], f, 'tickets-filter') + '<span class="small muted">' + list.length + '</span></div>';
    s += '<div class="card flat tight"><div class="list">' + (list.length ? list.map(function (k) { return ticketRow(k, v); }).join('') : h.empty(t('noTickets'), v.role === 'client' ? t('escalateNote') : '')) + '</div></div>';
    if (v.role === 'client') { var cpl = Dx.placementForClient(v.clientId)[0]; if (cpl) s += '<div style="margin-top:14px">' + h.btn(ico('flag', 18) + ' ' + esc(t('escalate')), 'open-escalate', 'btn-red', { id: cpl.id }) + '</div>'; }
    return { title: t('tickets'), body: s };
  };

  HQ.V.ticket = function (p) {
    var v = HQ.me(); var k = ticketById(p.id);
    if (!k || ticketsFor(v).indexOf(k) < 0) return { title: t('tickets'), body: h.empty(t('nothingHere'), '') };
    var cl = Dx.client(k.clientId), va = Dx.person(k.vaId), pl = Dx.placement(k.placementId), ch = pl ? HQ.channelForPlacement(pl.id) : null;
    var s = '<div class="stack"><div class="row wrap" style="gap:6px">' + kindChip(k.kind) + h.statusChip(k.status) + '<span class="tiny muted">' + esc(k.id) + '</span></div>';
    s += '<div class="card"><div class="list">';
    s += h.li({ lead: '<span class="hash">' + ico('flag', 18) + '</span>', title: esc(t('opened')), sub: esc(when(k.openedAt) + ' · ' + t('openedBy') + ' ' + who(k.openedBy, v)) });
    /* the SLA chips sit under the time, not in the trail, so the rows stay one column on a phone */
    var under = function (chip) { return '<div style="margin-top:5px">' + chip + '</div>'; };
    s += h.li({ lead: '<span class="hash">' + ico('hours', 18) + '</span>', title: esc(t('slaAck')), sub: esc(when(k.ackDueAt)) + under(k.ackAt ? h.chip(t('acknowledgedAt') + ' ' + F.time(k.ackAt, v.tz), 'good', true) : (isPast(k.ackDueAt) && k.status !== 'closed' ? h.chip(t('overdue'), 'bad', true) : h.chip(t('pending'), 'warn', true))) });
    s += h.li({ lead: '<span class="hash">' + ico('check', 18) + '</span>', title: esc(t('slaFix')), sub: esc(when(k.fixDueAt)) + under(k.status === 'closed' ? h.chip(t('closedOn') + ' ' + F.date(HQ.isoDate(k.closedAt)), '', true) : (isPast(k.fixDueAt) ? h.chip(t('overdue'), 'bad', true) : h.chip(t('inDays', { n: F.daysUntil(HQ.isoDate(k.fixDueAt)) }), 'blue'))) });
    s += '</div></div>';
    var plan = clientSafe(k.plan || [], v);
    s += '<div class="card"><h3>' + esc(t('summary')) + '</h3><p class="small">' + esc(L(k.summary)) + '</p>' + (plan.length ? '<h3 style="margin-top:14px">' + esc(t('plan')) + '</h3><ul class="small" style="padding-left:20px;line-height:1.6">' + plan.map(function (x) { return '<li>' + esc(L(x)) + '</li>'; }).join('') + '</ul>' : '') + '</div>';
    var btns = '';
    if (k.status !== 'closed') {
      if (HQ.isStaff() && !k.ackAt) btns += h.btn(ico('check', 18) + ' ' + esc(t('ackNow')), 'ticket-ack', 'btn-gold', { id: k.id });
      btns += h.btn(ico('plus', 18) + ' ' + esc(t('ticketUpdate')), 'open-update', 'btn-blue', { id: k.id });
      if (HQ.isStaff() || v.role === 'client') btns += h.btn(esc(t('closeTicket')), 'ticket-close', 'btn-ghost', { id: k.id });
    }
    if (pl) btns += h.go(ico('briefcase') + ' ' + esc(t('placement')), 'placement', { id: pl.id }, 'btn-ghost');
    if (ch) btns += h.go(ico('chat') + ' ' + esc(t('openChannel')), 'channel', { id: ch.id }, 'btn-ghost');
    s += '<div class="row wrap" style="gap:8px">' + btns + '</div>';
    s += '<div class="card"><h3>' + esc(t('timeline')) + '</h3>' + timelineHtml(clientSafe(k.timeline || [], v, function (e) { return e.text; }), v) + '</div>';
    if (k.kind === 'replacement') {
      /* a replacement record links by ticket id when it has one, else by the seat it replaced */
      D.replacements.filter(function (r) { return r.ticketId ? r.ticketId === k.id : (!!k.placementId && r.fromPlacementId === k.placementId); }).forEach(function (r) {
        var from = Dx.placement(r.fromPlacementId), to = Dx.placement(r.toPlacementId);
        var steps = [{ t: esc(t('requested')), s: esc(F.date(r.requestedOn, 'long') + (from ? ' · ' + who(from.vaId, v) : '')), st: 'done' }, { t: esc(t('candidatesShown')), s: esc(F.date(r.candidatesShownOn, 'long') + ' · ' + r.businessDaysToCandidates + ' ' + t('bizDays')), st: 'done' }, { t: esc(t('newStart')), s: esc(F.date(r.newStart, 'long') + (to ? ' · ' + who(to.vaId, v) : '')), st: to && to.status === 'active' ? 'done' : 'now' }];
        s += '<div class="card"><h3>' + esc(t('replacementChain')) + '</h3><p class="small muted" style="margin-bottom:8px">' + esc(L(r.seat)) + '</p><div class="steps">' + steps.map(function (x, i) { return '<div class="step ' + x.st + '"><div class="n">' + (x.st === 'done' ? ico('check', 14) : i + 1) + '</div><div><div class="t">' + x.t + '</div><div class="s">' + x.s + '</div></div></div>'; }).join('') + '</div>' + h.note(esc(L(r.reason)), '') + (to ? '<div style="margin-top:10px">' + h.go(esc(t('placement')) + ' ' + esc(who(to.vaId, v)), 'placement', { id: to.id }, 'btn-ghost btn-sm') + '</div>' : '') + '</div>';
      });
      if (HQ.isStaff()) D.offboarding.filter(function (o) { return o.placementId === k.placementId; }).forEach(function (o) {
        var done = o.items.filter(function (i) { return i.done; }).length;
        s += '<div class="card"><div class="card-head"><h3>' + esc(t('offboardingList')) + '</h3>' + h.chip(done + ' / ' + o.items.length, done === o.items.length ? 'good' : 'warn') + '</div>' + h.progress(100 * done / o.items.length, 'good') + '<div class="list" style="margin-top:8px">' + o.items.map(function (i) { return h.li({ lead: '<span class="hash" style="color:' + (i.done ? 'var(--good-fg)' : 'var(--fg-3)') + '">' + ico(i.done ? 'check' : 'hours', 18) + '</span>', title: esc(L(i.title)), sub: (i.done ? esc(when(i.at) + ' · ' + who(i.by, v)) : esc(t('pending'))) + (i.note ? '<div class="tiny muted" style="margin-top:3px">' + esc(L(i.note)) + '</div>' : '') }); }).join('') + '</div></div>';
      });
    }
    var pane = null;
    if (!isPhone() && pl) { var st = HQ.status(pl); pane = '<div class="card flat tight"><div class="row" style="gap:10px;margin-bottom:8px"><span class="' + (st.live ? 'live' : '') + '" style="display:inline-flex">' + h.avatar(va, 'lg') + '</span><div><div class="b">' + esc(who(va, v)) + '</div><div class="small muted">' + esc(Dx.tierShort(pl.tier) + (cl ? ' · ' + cl.name : '')) + '</div></div></div>' + h.statusPill(pl) + '<div class="small muted" style="margin-top:8px">' + esc(t('schedule')) + ': ' + esc(F.ampm(pl.schedule.from) + '–' + F.ampm(pl.schedule.to) + ' ' + F.tz(pl.schedule.tz)) + '</div>' + (pl.fitWindowEnds ? '<div class="small muted">' + esc(t('fitGuarantee')) + ' · ' + esc(t('until') + ' ' + F.date(pl.fitWindowEnds)) + '</div>' : '') + '</div>'; }
    return { title: esc(L(k.title)), sub: esc([cl ? cl.name : null, va ? who(va, v) : null].filter(Boolean).join(' · ')), body: s + '</div>', pane: pane };
  };

  /* ---------- Audit log (owner) ---------- */
  function targetLink(id) {
    if (!id) return ''; var o = HQ.get(id);
    if (!o) return ticketById(id) ? h.go(esc(id), 'ticket', { id: id }, 'btn-ghost btn-sm') : esc(id);
    var screen = o.role ? 'person' : o.tier ? 'placement' : o.scopePreset ? 'client' : o.topic ? 'channel' : null;
    return screen ? h.go(esc(o.name || id), screen, { id: id }, 'btn-ghost btn-sm') : esc(id);
  }
  HQ.V.audit = function () {
    var v = HQ.me();
    if (v.role !== 'owner') return { title: t('auditLog'), body: h.empty(t('nothingHere'), t('auditOwnerOnly')) };
    var rows = D.auditLog.slice().sort(function (a, b) { return Date.parse(b.at) - Date.parse(a.at); });
    var s = '<div class="card flat tight">' + h.table([{ l: t('when') }, { l: t('who') }, { l: t('what') }, { l: t('detail') }], rows.map(function (r) { return ['<span class="num small" style="white-space:nowrap">' + esc(when(r.at)) + '</span>', esc(who(r.by, v)), h.chip(r.action, 'blue') + '<span class="sub">' + targetLink(r.target) + '</span>', '<span class="small">' + esc(L(r.detail)) + '</span>']; })) + '</div>';
    return { title: t('auditLog'), sub: rows.length + ' ' + esc(HQ.lang() === 'es' ? 'entradas' : 'entries'), body: s, wide: true };
  };

  /* ---------- Support threads ---------- */
  var TOPICS = { pay: 'tPay', client: 'tClient', hr: 'tHr', tech: 'tTech' };
  function threadRow(th, v) {
    var last = Dx.lastMessage(th.id); var un = Dx.unread(th.id, v); var va = Dx.person(th.vaId);
    return h.li({ lead: '<span class="hash">' + ico('lock', 18) + '</span>', title: (v.role === 'va' ? '' : esc(va ? va.name : '') + ' · ') + esc(L(th.title)), sub: '<div class="row wrap" style="gap:6px;margin-top:4px">' + h.chip(t(TOPICS[th.topic] || 'topic'), 'blue') + h.statusChip(th.status) + (last ? '<span class="tiny muted">' + esc(F.rel(last.at)) + '</span>' : '') + '</div>', trail: h.badge(un), go: 'channel', params: { id: th.id } });
  }
  HQ.V.support = function (p) {
    var v = HQ.me(); var f = p.f || 'open';
    if (v.role === 'client' || v.role === 'applicant') return { title: t('support'), body: h.empty(t('nothingHere'), v.role === 'client' ? t('supportClient') : ''), actions: '' };
    var ths = D.threads.filter(function (th) { return v.role === 'va' ? th.vaId === v.id : (v.role === 'owner' || th.assignedTo === v.id); });
    if (f === 'open') ths = ths.filter(function (th) { return th.status === 'open'; });
    var s = '<div class="row between wrap" style="margin-bottom:10px;gap:8px">' + h.seg([{ v: 'open', l: t('open_') }, { v: 'all', l: t('all') }], f, 'support-filter') + (v.role === 'va' ? h.btn(ico('plus', 18) + ' ' + esc(t('newThread')), 'open-thread', 'btn-gold btn-sm') : '') + '</div>';
    s += '<div class="card flat tight"><div class="list">' + (ths.length ? ths.map(function (th) { return threadRow(th, v); }).join('') : h.empty(t('noThreads'), '')) + '</div></div>';
    s += '<p class="tiny muted" style="margin-top:10px">' + esc(v.role === 'va' ? t('privateWithManager') : t('threadNote')) + '</p>';
    return { title: v.role === 'va' ? t('myThreads') : t('supportThreads'), body: s };
  };

  /* ---------- actions ---------- */
  var CATS = [['quality', 'cQuality'], ['hours', 'cHours'], ['comm', 'cComm'], ['scope', 'cScope'], ['other', 'cOther']];
  Object.assign(HQ.act, {
    'open-escalate': function (el) {
      var pl = Dx.placement(el.dataset.id); if (!pl) { HQ.toast(t('prototypeOnly')); return; }
      var mgr = Dx.person('u-daniela'), own = Dx.person('u-charly');
      var s = '<p class="small muted" style="margin-bottom:12px">' + esc(t('escalateNote')) + '</p>';
      /* the fork: a question goes to a conversation, a problem becomes a ticket */
      s += '<div style="margin-bottom:14px">' + msgBtn(mgr.id, t('justAsk', { name: mgr.first }), 'btn-ghost btn-sm') + '</div>';
      s += h.field(t('escCategory'), '<select class="inp" name="cat">' + CATS.map(function (c) { return '<option value="' + c[0] + '">' + esc(t(c[1])) + '</option>'; }).join('') + '</select>');
      s += h.field(t('whatHappened'), '<textarea class="inp" name="text" rows="4" maxlength="500" placeholder="' + esc(HQ.lang() === 'es' ? 'Cuéntanos qué pasó y desde cuándo' : 'Tell us what happened and since when') + '"></textarea>', t('upTo500'));
      s += '<div id="esc-err" class="note bad" hidden style="margin-bottom:10px"></div>';
      s += '<div class="row wrap" style="gap:8px">' + h.btn(ico('send', 18) + ' ' + esc(t('send')), 'send-escalation', 'btn-gold', { id: pl.id }) + h.btn(ico('clip') + ' ' + esc(t('attach')), 'toast', 'btn-ghost', { msg: t('prototypeOnly') }) + h.btn(esc(t('cancel')), 'close-sheet', 'btn-ghost') + '</div>';
      s += '<p class="tiny muted" style="margin-top:12px">' + esc(t('escWho', { a: mgr.first, b: own.first })) + '</p>';
      HQ.sheet(s, t('escalate'));
    },
    'send-escalation': function (el) {
      var v = HQ.me(); var pl = Dx.placement(el.dataset.id); var vals = HQ.formVals(document.getElementById('sheet')); var text = (vals.text || '').trim();
      var err = document.getElementById('esc-err'); if (!text) { if (err) { err.hidden = false; err.textContent = t('escNeedText'); } return; }
      var cl = Dx.client(pl.clientId), va = Dx.person(pl.vaId); var now = new Date(Date.parse(nowIso())); var cat = CATS.filter(function (c) { return c[0] === vals.cat; })[0] || CATS[4];
      var id = 'tk-' + ('000' + (D.tickets.length + 10)).slice(-4);
      var k = { id: id, kind: 'escalation', category: cat[0], clientId: cl.id, placementId: pl.id, vaId: pl.vaId, openedBy: v.id, openedAt: nowIso(), ackDueAt: addBusinessDays(now, 1).toISOString(), ackAt: null, fixDueAt: addBusinessDays(now, 5).toISOString(), status: 'open', closedAt: null,
        title: { en: HQ.T[cat[1]].en, es: HQ.T[cat[1]].es }, summary: text, plan: [], timeline: [{ at: nowIso(), by: v.id, text: { en: HQ.T.escOpenedFrom.en, es: HQ.T.escOpenedFrom.es } }] };
      D.tickets.push(k);
      var ch = HQ.channelForPlacement(pl.id);
      if (ch) D.messages.push({ id: newId('msg'), channelId: ch.id, authorId: 'system', at: nowIso(), kind: 'system', audience: 'internal', text: { en: 'Escalation opened by ' + v.first + ' · ticket ' + id + ' · ' + HQ.T[cat[1]].en, es: 'Escalación abierta por ' + v.first + ' · ticket ' + id + ' · ' + HQ.T[cat[1]].es } });
      var due = F.date(HQ.isoDate(k.ackDueAt), 'long');
      ['u-daniela', 'u-charly'].forEach(function (uid) { D.notifications.push({ id: newId('nt'), userId: uid, at: nowIso(), kind: 'ticket', read: false, text: { en: v.name + ' (' + cl.name + ') tapped Escalate: ' + HQ.T[cat[1]].en + ' on ' + (va ? va.first : '') + '\'s seat. Acknowledge by ' + due + ' (1 business day).', es: v.name + ' (' + cl.name + ') pulsó Escalar: ' + HQ.T[cat[1]].es + ' en el puesto de ' + (va ? va.first : '') + '. Responder antes del ' + due + ' (1 día hábil).' }, link: { screen: 'ticket', id: id } }); });
      audit('ticket.opened', id, { en: 'Escalation opened on placement ' + pl.id + ': ' + HQ.T[cat[1]].en + '.', es: 'Escalación abierta en la colocación ' + pl.id + ': ' + HQ.T[cat[1]].es + '.' });
      HQ.closeSheet(); HQ.toast(t('ticketOpened') + ' ' + t('escWho', { a: (Dx.person('u-daniela') || {}).first || '', b: (Dx.person('u-charly') || {}).first || '' }), 4500); HQ.go('ticket', { id: id });
    },
    'ack-scope': function (el) {
      var v = HQ.me(); var pl = Dx.placement(el.dataset.id); if (!pl) return; var sc = scopeFor(Dx.client(pl.clientId));
      D.scopeAcks.push({ placementId: pl.id, vaId: v.id, version: sc.version, acknowledgedAt: nowIso() });
      audit('scope.acknowledged', pl.id, { en: sc.title.en + ' v' + sc.version + ' acknowledged.', es: sc.title.es + ' v' + sc.version + ' aceptada.' });
      HQ.toast(t('ackThanks')); HQ.render();
    },
    'open-scrub': function (el) {
      var s = h.field(t('scrubDate'), '<input class="inp" type="date" name="date" value="' + Dx.today() + '" max="' + Dx.today() + '">', t('scrubRule'));
      s += '<div class="row wrap" style="gap:8px">' + h.btn(ico('check', 18) + ' ' + esc(t('logScrub')), 'save-scrub', 'btn-gold', { id: el.dataset.id }) + h.btn(esc(t('cancel')), 'close-sheet', 'btn-ghost') + '</div>';
      HQ.sheet(s, t('logScrub'));
    },
    'save-scrub': function (el) {
      var f = tmFile(el.dataset.id); var vals = HQ.formVals(document.getElementById('sheet')); var d = vals.date; if (!f || !/^\d{4}-\d{2}-\d{2}$/.test(d || '')) return;
      f.lastScrubOn = d; f.scrubDueOn = addDays(d, 31);
      audit('telemarketing.scrubbed', f.clientId, { en: 'Do-Not-Call scrub logged for ' + d + '; next due ' + f.scrubDueOn + '.', es: 'Depuración No Llamar registrada el ' + d + '; próxima el ' + f.scrubDueOn + '.' });
      HQ.closeSheet(); HQ.toast(t('scrubLogged')); HQ.render();
    },
    'qa-week': function (el) { HQ.go('callqa', { id: el.dataset.id, week: el.dataset.v }, true); },
    'open-score': function (el) {
      var sel = function (name) { return '<select class="inp" name="' + name + '"><option value="2">2</option><option value="1">1</option><option value="0">0</option></select>'; };
      var s = '<div class="grid2">' + h.field(t('dateLbl'), '<input class="inp" type="date" name="date" value="' + Dx.today() + '">') + h.field(t('lead'), '<input class="inp" name="lead" placeholder="Lead #4491">') + '</div>';
      s += '<div class="grid3" style="grid-template-columns:repeat(auto-fit,minmax(110px,1fr))">' + CRIT.map(function (c) { return h.field(t(c[1]), sel(c[0])); }).join('') + '</div>';
      s += h.field(t('notes'), '<textarea class="inp" name="notes" rows="3"></textarea>');
      s += h.field(t('weekResult'), '<select class="inp" name="result"><option value="pending">' + esc(t('undecided')) + '</option><option value="pass">' + esc(t('pass')) + '</option><option value="fail">' + esc(t('fail')) + '</option></select>', t('qaRule'));
      s += '<div class="row wrap" style="gap:8px">' + h.btn(ico('check', 18) + ' ' + esc(t('save')), 'save-score', 'btn-gold', { id: el.dataset.id, week: el.dataset.week }) + h.btn(esc(t('cancel')), 'close-sheet', 'btn-ghost') + '</div>';
      HQ.sheet(s, t('scoreCall'));
    },
    'save-score': function (el) {
      var v = HQ.me(); var vals = HQ.formVals(document.getElementById('sheet')); var vaId = el.dataset.id, ws = el.dataset.week; var pl = Dx.placementForVa(vaId);
      var w = D.callQA.filter(function (x) { return x.vaId === vaId && x.weekStart === ws; })[0];
      if (!w) { w = { id: 'qa-' + vaId.replace(/^u-/, '') + '-' + ws, vaId: vaId, placementId: pl ? pl.id : null, weekStart: ws, calls: [], weekScore: null, pass: null, reviewedBy: null, reviewedOn: null }; D.callQA.push(w); }
      var scores = {}; var total = 0; CRIT.forEach(function (c) { scores[c[0]] = +vals[c[0]] || 0; total += scores[c[0]]; });
      w.calls.push({ date: vals.date || Dx.today(), leadRef: (vals.lead || '').trim() || '—', scores: scores, total: total, notes: { en: (vals.notes || '').trim(), es: (vals.notes || '').trim() } });
      w.weekScore = Math.round(10 * w.calls.reduce(function (n, c) { return n + c.total; }, 0) / w.calls.length) / 10;
      w.pass = vals.result === 'pass' ? true : vals.result === 'fail' ? false : null; w.reviewedBy = v.id; w.reviewedOn = Dx.today();
      audit('qa.scored', vaId, { en: 'Call QA scored for week of ' + ws + ': ' + total + '/10.', es: 'QA de llamada evaluada para la semana del ' + ws + ': ' + total + '/10.' });
      HQ.closeSheet(); HQ.toast(t('callScored')); HQ.go('callqa', { id: vaId, week: ws }, true);
    },
    'tickets-filter': function (el) { HQ.go('tickets', { f: el.dataset.v }, true); },
    'support-filter': function (el) { HQ.go('support', { f: el.dataset.v }, true); },
    'ticket-ack': function (el) {
      var v = HQ.me(); var k = ticketById(el.dataset.id); if (!k || k.ackAt) return;
      k.ackAt = nowIso(); if (k.status === 'open') k.status = 'in-progress';
      k.timeline.push({ at: nowIso(), by: v.id, text: { en: 'Acknowledged.', es: 'Confirmada.' } });
      var opener = Dx.person(k.openedBy); if (opener) D.notifications.push({ id: newId('nt'), userId: opener.id, at: nowIso(), kind: 'ticket', read: false, text: { en: v.first + ' acknowledged your ticket ' + k.id + '.', es: v.first + ' confirmó tu ticket ' + k.id + '.' }, link: { screen: 'ticket', id: k.id } });
      HQ.toast(t('ticketAcked')); HQ.render();
    },
    'open-update': function (el) {
      var s = h.field(t('writeUpdate'), '<textarea class="inp" name="text" rows="4"></textarea>');
      s += '<div class="row wrap" style="gap:8px">' + h.btn(ico('send', 18) + ' ' + esc(t('ticketUpdate')), 'ticket-update', 'btn-gold', { id: el.dataset.id }) + h.btn(esc(t('cancel')), 'close-sheet', 'btn-ghost') + '</div>';
      HQ.sheet(s, t('ticketUpdate'));
    },
    'ticket-update': function (el) {
      var v = HQ.me(); var k = ticketById(el.dataset.id); var vals = HQ.formVals(document.getElementById('sheet')); var text = (vals.text || '').trim(); if (!k || !text) return;
      k.timeline.push({ at: nowIso(), by: v.id, text: text }); if (k.status === 'open' && HQ.isStaff()) k.status = 'in-progress';
      HQ.closeSheet(); HQ.toast(t('updateAdded')); HQ.render();
    },
    'ticket-close': function (el) {
      var v = HQ.me(); var k = ticketById(el.dataset.id); if (!k || k.status === 'closed') return;
      k.status = 'closed'; k.closedAt = nowIso(); k.timeline.push({ at: nowIso(), by: v.id, text: { en: 'Ticket closed.', es: 'Ticket cerrado.' } });
      audit('ticket.closed', k.id, { en: 'Ticket ' + k.id + ' closed.', es: 'Ticket ' + k.id + ' cerrado.' });
      HQ.toast(t('ticketClosed')); HQ.render();
    },
    'open-thread': function () {
      var s = h.field(t('topic'), '<select class="inp" name="topic">' + Object.keys(TOPICS).map(function (k) { return '<option value="' + k + '">' + esc(t(TOPICS[k])) + '</option>'; }).join('') + '</select>');
      s += h.field(t('title'), '<input class="inp" name="title" maxlength="80">');
      s += h.field(t('firstMessage'), '<textarea class="inp" name="text" rows="4"></textarea>', t('privateWithManager'));
      s += '<div id="th-err" class="note bad" hidden style="margin-bottom:10px"></div>';
      s += '<div class="row wrap" style="gap:8px">' + h.btn(ico('send', 18) + ' ' + esc(t('send')), 'create-thread', 'btn-gold') + h.btn(esc(t('cancel')), 'close-sheet', 'btn-ghost') + '</div>';
      HQ.sheet(s, t('newThread'));
    },
    'create-thread': function () {
      var v = HQ.me(); var vals = HQ.formVals(document.getElementById('sheet')); var title = (vals.title || '').trim(), text = (vals.text || '').trim();
      var err = document.getElementById('th-err'); if (!title || !text) { if (err) { err.hidden = false; err.textContent = t('needTitleMsg'); } return; }
      var th = { id: newId('th'), vaId: v.id, topic: vals.topic || 'other', assignedTo: 'u-daniela', status: 'open', title: title };
      D.threads.push(th); D.messages.push({ id: newId('msg'), threadId: th.id, authorId: v.id, at: nowIso(), kind: 'text', text: text, lang: HQ.lang() });
      D.notifications.push({ id: newId('nt'), userId: 'u-daniela', at: nowIso(), kind: 'message', read: false, text: { en: v.first + ' opened a support thread: ' + title, es: v.first + ' abrió un hilo de soporte: ' + title }, link: { screen: 'channel', id: th.id } });
      HQ.closeSheet(); HQ.toast(t('threadCreated')); HQ.go('channel', { id: th.id });
    }
  });
})();
