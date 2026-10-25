/* BeyondVAs HQ prototype: people. Owner's clients and client detail, staff directory and person, own profile,
   recruiting pipeline and applicant card, bench, academy and cohorts, documents, onboarding, applicant tests. */
(function () {
  var HQ = window.HQ, D = window.HQD, Dx = HQ.D, h = HQ.h, t = HQ.t, L = HQ.L, esc = HQ.esc, F = HQ.fmt, I = HQ.I, S = HQ.S;

  Object.assign(HQ.T, {
    notForRole: { en: 'Not available for your role', es: 'No disponible para tu rol' }, notForRoleSub: { en: 'This screen belongs to the BeyondVAs team.', es: 'Esta pantalla es del equipo de BeyondVAs.' },
    message: { en: 'Message', es: 'Escribir' }, edit: { en: 'Edit', es: 'Editar' }, email: { en: 'Email', es: 'Correo' }, localTime: { en: 'Local time', es: 'Hora local' },
    newClient: { en: 'New client', es: 'Nuevo cliente' }, newClientNote: { en: 'A new client starts with the one-time setup step. Not in the prototype.', es: 'Un cliente nuevo empieza con el paso de configuración única. No está en el prototipo.' },
    brokerage: { en: 'Brokerage', es: 'Corredora' }, dueLbl: { en: 'Due', es: 'Por pagar' }, contacts: { en: 'Contacts and logins', es: 'Contactos y accesos' }, billingEmail: { en: 'Billing email', es: 'Correo de facturación' },
    stripeCustomer: { en: 'Stripe customer', es: 'Cliente en Stripe' }, tracker: { en: 'Tracker workspace', es: 'Espacio en el tracker' }, openChannel: { en: 'Open channel', es: 'Abrir canal' },
    perWeek: { en: '/week', es: '/semana' }, hoursPerWeek: { en: 'h/week', es: 'h/semana' }, clientSince: { en: 'Client since', es: 'Cliente desde' }, noPulse: { en: 'Not asked yet', es: 'Aún sin preguntar' },
    referral: { en: 'Referral', es: 'Referido' }, referred: { en: 'Referred', es: 'Refirió a' }, activeSeats: { en: 'active placements', es: 'colocaciones activas' }, searchPeople: { en: 'Search…', es: 'Buscar…' },
    newPerson: { en: 'New person', es: 'Nueva persona' }, noPeople: { en: 'Nobody here', es: 'Nadie aquí' }, level: { en: 'Level', es: 'Nivel' }, industries: { en: 'Industries', es: 'Industrias' },
    availability: { en: 'Availability', es: 'Disponibilidad' }, placementHistory: { en: 'Past placements', es: 'Colocaciones anteriores' }, noActivePlacement: { en: 'No active placement', es: 'Sin colocación activa' },
    currentRate: { en: 'Current pay rate', es: 'Tarifa actual' }, academyProgress: { en: 'Academy progress', es: 'Progreso en la academia' }, supervisedDialing: { en: 'Supervised dialing', es: 'Marcación supervisada' },
    scoredCalls: { en: 'scored', es: 'evaluadas' }, avgScore: { en: 'Avg', es: 'Prom.' }, coach: { en: 'Coach', es: 'Coach' }, benchDays: { en: '{n} days on the bench', es: '{n} días en banca' },
    visibleToClients: { en: 'Your profile is visible to clients looking for a VA.', es: 'Tu perfil está visible para los clientes que buscan un VA.' }, updateAvailability: { en: 'Update availability', es: 'Actualizar disponibilidad' },
    myApplication: { en: 'My application', es: 'Mi solicitud' }, replyBy: { en: 'We reply by {date}', es: 'Te respondemos antes del {date}' }, confirm: { en: 'Confirm', es: 'Confirmar' },
    nothingForNow: { en: 'Nothing to do for now', es: 'Nada que hacer por ahora' }, whatToPrepare: { en: 'What to prepare', es: 'Qué preparar' }, howItWorks: { en: 'How BeyondVAs works', es: 'Cómo funciona BeyondVAs' },
    howItWorksText: { en: 'Academy (5 foundation modules, then the ISA track) → certification → bench → placement with a US real estate team. Paydays on the 5th and 20th.', es: 'Academia (5 módulos base, luego la ruta ISA) → certificación → banca → colocación con un equipo de bienes raíces de EE. UU. Pagos los días 5 y 20.' },
    academyLocked: { en: 'Unlocks when you are accepted', es: 'Se desbloquea cuando te acepten' }, links: { en: 'Links', es: 'Enlaces' }, noOneHere: { en: 'No one here', es: 'Nadie aquí' },
    daysInStage: { en: '{n} d in stage', es: '{n} d en etapa' }, replyDue: { en: 'Reply by', es: 'Responder antes del' }, replyOverdue: { en: 'Reply overdue', es: 'Respuesta vencida' }, cohort: { en: 'Cohort', es: 'Cohorte' },
    newApplicant: { en: 'New applicant', es: 'Nuevo candidato' }, answers: { en: 'Answers', es: 'Respuestas' }, spokenEnglish: { en: 'Spoken English', es: 'Inglés hablado' }, spanish: { en: 'Spanish', es: 'Español' },
    presence: { en: 'Presence', es: 'Presencia' }, followedBrief: { en: 'Followed the brief', es: 'Siguió las instrucciones' }, accomplishment: { en: 'Accomplishment', es: 'Logros' }, setup: { en: 'Setup', es: 'Equipo' },
    typingTest: { en: 'Typing', es: 'Mecanografía' }, writtenEnglish: { en: 'Written English', es: 'Inglés escrito' }, mockCall: { en: 'Mock call', es: 'Llamada simulada' }, notScored: { en: 'not scored', es: 'sin calificar' },
    stageHistory: { en: 'Stage history', es: 'Historial de etapas' }, scheduleInterview: { en: 'Schedule interview', es: 'Agendar entrevista' }, interviewToast: { en: 'Interview slot sent as a calendar event (prototype).', es: 'Horario de entrevista enviado como evento de calendario (prototipo).' },
    emailTemplate: { en: 'Email template', es: 'Plantilla de correo' }, movedTo: { en: 'Moved to {stage}', es: 'Movido a {stage}' }, noteSaved: { en: 'Note added', es: 'Nota agregada' }, noteText: { en: 'Note', es: 'Nota' },
    englishLevel: { en: 'English level', es: 'Nivel de inglés' }, experience: { en: 'Experience', es: 'Experiencia' }, otherCommitments: { en: 'Other commitments', es: 'Otros compromisos' },
    whyRealEstate: { en: 'Why real estate', es: 'Por qué bienes raíces' }, introVideo: { en: 'Intro video', es: 'Video de presentación' }, callMode: { en: 'Call mode', es: 'Modo llamada' },
    callModeNote: { en: 'Call mode hides surnames so you can share your screen with a client.', es: 'El modo llamada oculta los apellidos para compartir pantalla con un cliente.' }, matchClient: { en: 'Match with a client', es: 'Comparar con un cliente' },
    noClientSel: { en: 'No client', es: 'Sin cliente' }, coversShift: { en: 'Covers the shift', es: 'Cubre el turno' }, partialShift: { en: 'Partial overlap', es: 'Cobertura parcial' }, clientHours: { en: 'Client hours', es: 'Horario del cliente' },
    proposeToClient: { en: 'Propose to client', es: 'Proponer a un cliente' }, proposeToast: { en: 'A draft placement would open here, prefilled (prototype).', es: 'Aquí se abriría un borrador de colocación ya prellenado (prototipo).' },
    videoToast: { en: 'The intro video is a placeholder in the prototype.', es: 'En el prototipo el video de presentación es un marcador.' }, nobodyBench: { en: 'Nobody on the bench', es: 'Nadie en banca' }, certifiedOn: { en: 'Certified on', es: 'Certificación' },
    isaTrack: { en: 'ISA track', es: 'Ruta ISA' }, notRequired: { en: 'not required for your role', es: 'no requerida para tu rol' }, lessonsDone: { en: '{d} of {n} lessons', es: '{d} de {n} lecciones' },
    markDone: { en: 'Mark as done', es: 'Marcar como completada' }, lessonDone: { en: 'Lesson marked as done', es: 'Lección completada' }, allDone: { en: 'All done', es: 'Todo completado' },
    video: { en: 'Video', es: 'Video' }, text: { en: 'Reading', es: 'Lectura' }, quiz: { en: 'Quiz', es: 'Cuestionario' }, signoff: { en: 'Sign-off', es: 'Aprobación' }, task: { en: 'Task', es: 'Tarea' }, min: { en: 'min', es: 'min' },
    graduation: { en: 'Graduation', es: 'Graduación' }, tasks: { en: 'Tasks', es: 'Tareas' }, certify: { en: 'Certify', es: 'Certificar' }, remind: { en: 'Remind', es: 'Recordar' },
    remindToast: { en: 'Reminder DM drafted in Spanish (prototype).', es: 'Recordatorio redactado en español (prototipo).' }, allVas: { en: 'All VAs', es: 'Todos los VAs' },
    certifyNote: { en: 'Certify is enabled when every module and onboarding task is done; the VA moves to the bench.', es: 'Certificar se habilita cuando todos los módulos y tareas de incorporación están completos; el VA pasa a banca.' },
    needsAttention: { en: 'Needs attention', es: 'Requiere atención' }, expiringSoon: { en: 'Expiring within 60 days', es: 'Vence en menos de 60 días' }, nothingExpiring: { en: 'Nothing expiring in 60 days', es: 'Nada vence en 60 días' },
    w8benRule: { en: 'A W-8BEN expires at the end of the third calendar year after it is signed. Reminders go out 60 days before any expiry.', es: 'El W-8BEN vence al final del tercer año calendario después de la firma. Los recordatorios salen 60 días antes de cualquier vencimiento.' },
    requestDoc: { en: 'Request document', es: 'Pedir documento' }, uploadToast: { en: 'Upload is not in the prototype.', es: 'Subir archivos no está en el prototipo.' }, holder: { en: 'Holder', es: 'Titular' },
    type: { en: 'Type', es: 'Tipo' }, noExpiry: { en: 'no expiry', es: 'sin vencimiento' }, archived: { en: 'Archived', es: 'Archivado' }, inDays: { en: 'in {n} days', es: 'en {n} días' }, placed: { en: 'Placed', es: 'Con cliente' },
    inactive: { en: 'Inactive', es: 'Inactivo' }, expired: { en: 'Expired', es: 'Vencido' }, tPay: { en: 'Pay', es: 'Pago' }, tClient: { en: 'Client', es: 'Cliente' }, tHr: { en: 'HR', es: 'RR. HH.' }, tTech: { en: 'Tech', es: 'Tecnología' }, taskProgress: { en: '{d} of {n} tasks', es: '{d} de {n} tareas' }, unlocksBench: { en: 'All 8 tasks done makes you bench-ready.', es: 'Con las 8 tareas listas pasas a banca.' },
    markDoneTask: { en: 'Mark done', es: 'Marcar hecha' }, taskDone: { en: 'Task marked done', es: 'Tarea marcada como hecha' }, yourBuddy: { en: 'Your buddy', es: 'Tu buddy' }, noTasks: { en: 'No onboarding tasks', es: 'Sin tareas de incorporación' },
    onboardingLocked: { en: 'Onboarding starts when you accept the offer.', es: 'La incorporación empieza cuando aceptes la oferta.' }, rejected: { en: 'Rejected', es: 'Rechazado' }, mbps: { en: 'Mbps down / up', es: 'Mbps bajada / subida' },
    typingTestT: { en: 'Typing test', es: 'Prueba de mecanografía' }, writtenTestT: { en: 'Written English', es: 'Inglés escrito' }, mockCallT: { en: 'Mock call', es: 'Llamada simulada' }, startTest: { en: 'Start', es: 'Empezar' },
    received: { en: 'Received', es: 'Recibido' }, scheduledT: { en: 'Scheduled', es: 'Agendada' }, pickSlot: { en: 'Pick a slot', es: 'Elegir horario' }, slotNote: { en: 'Times in Honduras time.', es: 'Horas en hora de Honduras.' }, slotSaved: { en: 'Slot saved', es: 'Horario guardado' },
    testReceived: { en: 'Received. Results are not shown to applicants.', es: 'Recibido. Los resultados no se muestran a los candidatos.' }, neverScored: { en: 'Scores are never shown here; the team reviews them.', es: 'Aquí nunca se muestran puntajes; el equipo los revisa.' },
    typingDesc: { en: 'Type a short passage for one minute.', es: 'Escribe un pasaje corto durante un minuto.' }, writtenDesc: { en: 'Answer a client email in English.', es: 'Responde un correo de un cliente en inglés.' },
    mockDesc: { en: 'A 5-minute call with Daniela during your interview.', es: 'Una llamada de 5 minutos con Daniela durante tu entrevista.' }, testStatus: { en: 'Test status', es: 'Estado de las pruebas' }, nextCheckpoint: { en: 'Next checkpoint', es: 'Próximo punto de control' },
    track1: { en: 'Foundation', es: 'Base' }, modulesN: { en: '{n} modules', es: '{n} módulos' }, lessonsBtn: { en: 'Lessons', es: 'Lecciones' }, currentModule: { en: 'Current module', es: 'Módulo actual' },
    isaTrackNote: { en: 'The ISA track ({n} modules) is for ISA VAs; it ends with supervised dialing and the ISA certification.', es: 'La ruta ISA ({n} módulos) es para VAs ISA; termina con la marcación supervisada y la certificación ISA.' },
    afterCert: { en: 'After the foundation, ISA VAs continue with the ISA track ({n} modules).', es: 'Después de la base, los VAs ISA siguen con la ruta ISA ({n} módulos).' }, showTrack: { en: 'Show the ISA track', es: 'Ver la ruta ISA' },
    srcWebsite: { en: 'website', es: 'sitio web' }, srcJobBoard: { en: 'job board', es: 'bolsa de empleo' }, srcReferral: { en: 'referral', es: 'referido' }
  });

  /* ---------- helpers ---------- */
  var MODS = function () { return (D.academyModules || []).slice().sort(function (a, b) { return a.order - b.order; }); };
  /* seed values that are plain English words, rendered in the viewer's language */
  var LEVELS = { 'ISA certified': { en: 'ISA certified', es: 'Certificado ISA' }, 'Certified': { en: 'Certified', es: 'Certificado' }, 'In academy': { en: 'In academy', es: 'En academia' } };
  var EQUIP = { 'none': { en: 'none', es: 'ninguno' }, 'none yet': { en: 'none yet', es: 'aún no' }, 'mobile hotspot': { en: 'mobile hotspot', es: 'hotspot móvil' }, 'second provider': { en: 'second provider', es: 'segundo proveedor' } };
  var INDUSTRIES = { 'Real estate': { en: 'Real estate', es: 'Bienes raíces' }, 'Marketing': { en: 'Marketing', es: 'Marketing' }, 'Insurance': { en: 'Insurance', es: 'Seguros' }, 'Accounting': { en: 'Accounting', es: 'Contabilidad' }, 'Hospitality': { en: 'Hospitality', es: 'Hotelería' } };
  function lvl(x) { return LEVELS[x] ? L(LEVELS[x]) : (x || ''); }
  function eqv(x) { return EQUIP[x] ? L(EQUIP[x]) : (x || '—'); }
  function ind(x) { return INDUSTRIES[x] ? L(INDUSTRIES[x]) : x; }
  var SOURCES = { 'website': 'srcWebsite', 'job-board': 'srcJobBoard', 'referral': 'srcReferral' };
  function srcT(x) { return SOURCES[x] ? t(SOURCES[x]) : (x || ''); }
  var STAGES = ['draft', 'submitted', 'scored', 'interview', 'trial', 'offer', 'active', 'placed', 'talent_pool'];
  var STAGE_T = { draft: 'draft', submitted: 'submitted', scored: 'scored', interview: 'interview', trial: 'trial', offer: 'offer', active: 'active', placed: 'placed', talent_pool: 'talentPool' };
  function stageT(s) { return t(STAGE_T[s] || s); }
  function deny(key) { return { title: t(key), body: h.empty(t('notForRole'), t('notForRoleSub')) }; }
  function ico(name, size) { return (I[name] || I.doc).replace('<svg', '<svg width="' + (size || 18) + '" height="' + (size || 18) + '" style="fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round"'); }
  function tile(name, cls) { return '<span class="hash ' + (cls || '') + '">' + ico(name) + '</span>'; }
  function localNow(p) { return F.time(HQ.now().toISOString(), p.tz) + ' ' + F.tz(p.tz); }
  function daysSince(iso) { return -F.daysUntil(iso); }
  /* "country · zone"; the zone label is dropped when it repeats the country code (HN · HN) */
  function cty(country, tz) { var z = F.tz(tz); return (country || '') + (z && z !== country ? ' · ' + z : ''); }
  var TOPIC_T = { pay: 'tPay', client: 'tClient', hr: 'tHr', tech: 'tTech' };
  function monthLabel(ym) { var s = new Date(ym + '-01T12:00:00Z').toLocaleDateString(F.locale(), { month: 'long', year: 'numeric', timeZone: 'UTC' }); return s.charAt(0).toUpperCase() + s.slice(1); }
  function kv(label, value) { return '<div class="row between" style="gap:12px;padding:6px 0;border-bottom:1px solid var(--line-2)"><span class="small muted">' + esc(label) + '</span><span class="right" style="min-width:0">' + value + '</span></div>'; }
  function chips(arr, kind) { return (arr || []).map(function (x) { return h.chip(x, kind || ''); }).join(' '); }
  /* a clock window stored in one zone, shown in the viewer's zone with the other zone small when it differs */
  function span(from, to, tz) {
    var mine = HQ.me().tz || tz; var s = F.ampm(F.clock(from, tz, mine)) + '–' + F.ampm(F.clock(to, tz, mine)) + ' ' + F.tz(mine);
    if (tz && tz !== mine) s += ' <span class="tiny muted">(' + F.ampm(from) + '–' + F.ampm(to) + ' ' + F.tz(tz) + ')</span>';
    return s;
  }
  function appOf(id) { return (D.applications || []).filter(function (a) { return a.id === id || a.personId === id; })[0] || null; }
  function lessonsOf(mid) { return (D.academyLessons || []).filter(function (l) { return l.moduleId === mid; }).sort(function (a, b) { return a.order - b.order; }); }
  function requiredMods(p) { return MODS().filter(function (m) { return !m.track || (p && p.tier === 'isa'); }); }
  function modProgress(pid, m) { var pg = (D.academyProgress || {})[pid] || {}; var ls = lessonsOf(m.id); var done = ls.filter(function (l) { return pg[l.id] && pg[l.id].done; }).length; return { done: done, total: ls.length, pct: ls.length ? Math.round(done * 100 / ls.length) : 0 }; }
  function academyDone(p) { return requiredMods(p).every(function (m) { var x = modProgress(p.id, m); return x.done === x.total; }); }
  function obSummary(pid) { var op = (D.onboardingProgress || {})[pid]; if (!op) return null; var defs = D.onboardingTaskDefs || []; return { done: defs.filter(function (d) { return op[d.id] && op[d.id].status === 'done'; }).length, total: defs.length }; }
  function docsOf(id) { return (D.documents || []).filter(function (d) { return d.ownerId === id; }); }
  /* HQ.D.person(id) returns any indexed object (clients too); this one answers only for people */
  function personOnly(id) { var o = Dx.person(id); return o && o.role ? o : null; }
  function nextBlockOf(cl) { return (D.blocks || []).filter(function (b) { return b.clientId === cl.id && D.nextBlock && b.start === D.nextBlock.start; })[0] || null; }
  /* Paid / Due / Failed from a block's status and paid flag (HQD.blocks) */
  function blockState(b) { return b.status === 'failed' ? 'failed' : (b.status === 'open' || b.paid === false) ? 'open' : 'paid'; }
  function blockChip(b) { if (!b) return ''; var st = blockState(b); return h.chip(st === 'failed' ? t('failed') : st === 'open' ? t('dueLbl') : t('paid'), st === 'failed' ? 'bad' : st === 'open' ? 'warn' : 'good', true); }
  function dmWith(pid) { var m = HQ.me(); return (D.channels || []).filter(function (c) { return c.kind === 'dm' && c.members.indexOf(m.id) >= 0 && c.members.indexOf(pid) >= 0; })[0] || null; }
  function msgBtn(p, kind) { var dm = dmWith(p.id); return dm ? h.go(ico('chat', 16) + esc(t('message')), 'channel', { id: dm.id }, kind || 'btn-ghost btn-sm') : h.btn(ico('chat', 16) + esc(t('message')), 'toast', kind || 'btn-ghost btn-sm', { msg: t('prototypeOnly') }); }
  /* a date with its year when it is not this year's (document expiries run to 2032) */
  function dateY(iso) { var y = iso.slice(0, 4); return F.date(iso) + (y !== Dx.today().slice(0, 4) ? ', ' + y : ''); }
  function expiryText(d) { if (!d.expiresOn) return t('noExpiry'); var n = F.daysUntil(d.expiresOn); return esc(dateY(d.expiresOn)) + (n >= 0 && n <= 60 ? ' <span class="chip warn">' + esc(t('inDays', { n: n })) + '</span>' : ''); }
  function docRow(d, withOwner) {
    var who = withOwner ? (Dx.person(d.ownerId) || Dx.client(d.ownerId) || {}).name : null;
    return h.li({ lead: tile('doc'), title: esc(L(d.title)) + (who ? ' <span class="small muted">· ' + esc(who) + '</span>' : ''), sub: (d.signedOn ? t('signed') + ' ' + F.date(d.signedOn) + ' · ' : '') + (d.expiresOn ? t('expires') + ' ' + expiryText(d) : esc(t('noExpiry'))), trail: h.statusChip(d.status) });
  }
  function docButtons(d) { return d.status === 'missing' ? h.btn(esc(d.type === 'w8ben' || d.type === 'contractor-agreement' || d.type === 'confidentiality' ? t('sign') : t('upload')), 'toast', 'btn-gold btn-sm', { msg: t('uploadToast') }) : ''; }
  function payHistoryHtml(p) {
    if (!Dx.can('pay') || !(p.payHistory || []).length) return '';
    var s = h.sec(t('payHistory')) + '<div class="card flat tight">' + kv(t('currentRate'), h.money('pay', p.payRate, { rate: true }) || '—') + '<div class="list">';
    p.payHistory.slice().reverse().forEach(function (x) { s += h.li({ title: h.money('pay', x.rate, { rate: true }), sub: esc(F.date(x.from, 'long')) + (x.reason ? ' · ' + esc(L(x.reason)) : '') }); });
    return s + '</div><div class="hint small muted" style="margin-top:8px">' + esc(t('onlyOwnerChanges')) + '</div></div>';
  }
  function documentsHtml(p) { var ds = docsOf(p.id); return h.sec(t('documents'), h.go(esc(t('seeAll')), 'documents', {}, 'btn-ghost btn-sm')) + '<div class="card flat tight"><div class="list">' + (ds.length ? ds.map(function (d) { return docRow(d); }).join('') : h.empty(t('nothingHere'))) + '</div></div>'; }
  /* Two tracks: foundation (modules without a track) and the ISA track (track: 'isa') */
  function trackMods(track) { return MODS().filter(function (m) { return (m.track === 'isa') === (track === 'isa'); }); }
  function trackProgress(pid, track) { var d = 0, n = 0; trackMods(track).forEach(function (m) { var x = modProgress(pid, m); d += x.done; n += x.total; }); return { done: d, total: n, pct: n ? Math.round(d * 100 / n) : 0 }; }
  function hasIsa(p) { return p.tier === 'isa' || trackProgress(p.id, 'isa').done > 0; }
  function currentModule(p) { return requiredMods(p).filter(function (m) { var x = modProgress(p.id, m); return x.done < x.total; })[0] || null; }
  function trackBar(label, x) { return '<div style="padding:5px 0"><div class="row between small"><span class="b">' + esc(label) + '</span><span class="muted num">' + x.done + '/' + x.total + ' · ' + x.pct + '%</span></div>' + h.progress(x.pct, x.pct === 100 ? 'good' : '') + '</div>'; }
  function academyHtml(p, link) {
    var s = h.sec(t('academyProgress'), link || '') + '<div class="card flat tight">';
    if (p.certifiedOn) s += h.note(ico('school', 14) + ' ' + esc(t('certifiedOn')) + ' ' + esc(F.date(p.certifiedOn, 'long')) + (p.tier === 'isa' ? ' · ' + esc(t('isaCertified')) : ''), 'good') + '<div style="height:8px"></div>';
    s += trackBar(t('track1') + ' · ' + t('modulesN', { n: trackMods('core').length }), trackProgress(p.id, 'core'));
    if (hasIsa(p)) s += trackBar(t('isaTrack') + ' · ' + t('modulesN', { n: trackMods('isa').length }), trackProgress(p.id, 'isa'));
    var cur = currentModule(p); if (cur) { var x = modProgress(p.id, cur); s += kv(t('currentModule'), esc(t('module') + ' ' + cur.order + ' · ' + L(cur.title)) + ' <span class="small muted num">' + x.done + '/' + x.total + '</span>'); }
    return s + '</div>';
  }
  function dialingHtml(vaId) {
    var rows = (D.supervisedDialing || []).filter(function (x) { return x.vaId === vaId; }); if (!rows.length) return '';
    return h.sec(t('supervisedDialing')) + h.table([{ l: t('date') }, { l: t('dials'), num: true }, { l: t('scoredCalls'), num: true }, { l: t('avgScore'), num: true }, { l: t('notes') }], rows.map(function (r) { return [esc(F.date(r.date)), r.dials, r.scoredCalls, r.avgScore, '<span class="small">' + esc(L(r.note)) + '</span>']; }));
  }
  function equipmentHtml(p) {
    var e = p.equipment; if (!e) return '';
    return h.sec(t('equipment')) + '<div class="card flat tight">' + kv(t('internet'), '<span class="num">' + esc(e.down + ' / ' + e.up) + '</span> ' + esc(t('mbps'))) + kv(t('backup'), esc(eqv(e.backupInternet))) + kv(t('power'), esc(eqv(e.power))) + kv(t('computer'), esc(e.computer)) + kv(t('headset'), esc(eqv(e.headset))) + '</div>';
  }
  function placementCard(pl, viewer) {
    var cl = Dx.client(pl.clientId), va = Dx.person(pl.vaId);
    var s = '<div class="card"><div class="card-head"><h3>' + esc(viewer.role === 'va' ? cl.name : Dx.vaLabel(va, viewer) + ' · ' + cl.name) + '</h3>' + h.statusChip(pl.status) + '</div>';
    s += '<div class="small muted" style="margin-bottom:8px">' + esc(Dx.tierShort(pl.tier)) + ' · ' + pl.hoursPerWeek + ' ' + esc(t('hoursPerWeek')) + ' · ' + esc(t('since')) + ' ' + esc(F.date(pl.start, 'long')) + '</div>';
    if (pl.status === 'active') s += '<div style="margin-bottom:8px">' + h.statusPill(pl) + '</div>';
    s += kv(t('schedule'), span(pl.schedule.from, pl.schedule.to, pl.schedule.tz));
    if (Dx.can('pay')) s += kv(t('payRate'), h.money('pay', pl.payRate, { rate: true }));
    if (Dx.can('bill')) s += kv(t('billRate'), h.money('bill', pl.billRate, { rate: true }));
    var open = (pl.checkpoints || []).filter(function (c) { return !c.done; })[0];
    if (open) s += kv(t('nextCheckpoint'), esc(t('dayN') + ' ' + open.day) + ' · ' + esc(F.date(open.due, 'long')));
    s += '<div class="row wrap" style="gap:8px;margin-top:12px">' + h.go(esc(t('placement')), 'placement', { id: pl.id }, 'btn-blue btn-sm') + h.go(esc(t('hours')), 'week', { id: pl.id }, 'btn-ghost btn-sm') + (HQ.channelForPlacement(pl.id) ? h.go(esc(t('openChannel')), 'channel', { id: HQ.channelForPlacement(pl.id).id }, 'btn-ghost btn-sm') : '') + '</div></div>';
    return s;
  }
  function personHeader(p, viewer) {
    var pl = p.role === 'va' ? Dx.placementForVa(p.id) : null; var live = pl && HQ.status(pl).live;
    var s = '<div class="card"><div class="row" style="gap:14px;align-items:flex-start">' + h.avatar(p, 'xl', live ? 'live' : '') + '<div class="grow"><h2 style="font-size:24px">' + esc(p.name) + '</h2><div class="small muted">' + esc(p.title ? L(p.title) : (p.role === 'va' ? Dx.tierShort(p.tier) + ' · ' + lvl(p.level) : t(p.role))) + '</div>';
    s += '<div class="row wrap" style="gap:6px;margin-top:8px">' + (p.status ? h.statusChip(p.status) : '') + (p.english ? h.chip(t('english') + ' ' + p.english, 'blue') : '') + h.chip((p.lang === 'es' ? 'Español' : 'English'), '') + '</div></div></div>';
    s += '<div style="margin-top:12px">' + kv(t('city'), esc((p.city || '') + (p.country ? ' · ' + p.country : ''))) + kv(t('timezone'), esc(F.tz(p.tz)) + ' <span class="small muted">· ' + esc(localNow(p)) + ' ' + esc(t('localTime').toLowerCase()) + '</span>');
    if (viewer.role !== 'client' || p.id === viewer.id) { if (p.email) s += kv(t('email'), esc(p.email)); if (p.whatsapp) s += kv(t('whatsapp'), esc(p.whatsapp)); }
    if (p.availability) s += kv(t('availability'), span(p.availability.from, p.availability.to, p.availability.tz));
    if (p.buddyId && Dx.person(p.buddyId)) s += kv(t('buddy'), h.go(esc(Dx.person(p.buddyId).name), viewer.role === 'va' ? 'channels' : 'person', { id: p.buddyId }, 'btn-ghost btn-sm'));
    s += '</div>';
    if (p.skills) s += '<div style="margin-top:12px"><div class="small muted" style="margin-bottom:4px">' + esc(t('skills')) + '</div>' + chips(p.skills) + '</div>';
    if (p.industries) s += '<div style="margin-top:8px"><div class="small muted" style="margin-bottom:4px">' + esc(t('industries')) + '</div>' + chips(p.industries.map(ind), 'blue') + '</div>';
    return s + '</div>';
  }

  /* ---------- clients (owner's tab) ---------- */
  HQ.V.clients = function () {
    if (!HQ.isStaff()) return deny('clients');
    var viewer = HQ.me();
    var s = '<div class="field" style="margin-bottom:10px"><input class="inp" id="clq" placeholder="' + esc(t('searchPeople')) + '" aria-label="' + esc(t('search')) + '"></div><div class="list" id="cllist">';
    (D.clients || []).forEach(function (cl) {
      var pls = Dx.placementForClient(cl.id); var vas = pls.map(function (pl) { return Dx.person(pl.vaId).first; }); var b = nextBlockOf(cl); var un = cl.channelId ? Dx.unread(cl.channelId, viewer) : 0;
      var lead = pls.length ? h.avatar(pls[0].vaId, '', HQ.status(pls[0]).live ? 'live' : '') : tile('briefcase');
      s += h.li({ lead: lead, title: esc(cl.name) + ' ' + h.chip(cl.state) + ' ' + h.badge(un, 'blue'), sub: esc(cl.brokerage + ' · ' + cl.city) + (vas.length ? ' · VA ' + esc(vas.join(', ')) : ' · ' + esc(t('noActivePlacement'))), trail: (b ? '<div>' + blockChip(b) + '</div>' + (Dx.can('bill') ? '<div class="tiny muted">' + esc(t('nextBlock')) + ' ' + h.money('bill', b.amount, { cents: false }) + '</div>' : '') : ''), go: 'client', params: { id: cl.id }, cls: 'clrow' });
    });
    if (!(D.clients || []).length) s += h.empty(t('nothingHere'));
    s += '</div>';
    return { title: t('clients'), sub: esc((D.clients || []).length + ' · ' + t('nextBlock') + ' ' + F.date(D.nextBlock.start) + '–' + F.date(D.nextBlock.end)), body: s, actions: h.btn(I.plus + esc(t('newClient')), 'toast', 'btn-gold btn-sm', { msg: t('newClientNote') }),
      after: function () { var q = document.getElementById('clq'); if (!q) return; q.addEventListener('input', function () { var v = q.value.toLowerCase(); document.querySelectorAll('#cllist .clrow').forEach(function (r) { r.style.display = r.textContent.toLowerCase().indexOf(v) >= 0 ? '' : 'none'; }); }); } };
  };

  /* ---------- client detail (staff) ---------- */
  HQ.V.client = function (p) {
    if (!HQ.isStaff()) return deny('client_');
    var viewer = HQ.me(); var cl = Dx.client(p.id); if (!cl || !cl.brokerage) return { title: t('client_'), body: h.empty(t('nothingHere')) };
    var pls = Dx.placementsOf(viewer).filter(function (x) { return x.clientId === cl.id; });
    var s = '<div class="card"><div class="row" style="gap:14px;align-items:flex-start">' + tile('briefcase') + '<div class="grow"><h2 style="font-size:24px">' + esc(cl.name) + '</h2><div class="small muted">' + esc(cl.brokerage + ' · ' + cl.city + ' · ' + cl.state) + '</div></div></div><div style="margin-top:12px">';
    s += kv(t('clientSince'), esc(F.date(cl.since, 'long'))) + kv(t('timezone'), esc(F.tz(cl.tz)) + ' <span class="small muted">· ' + esc(F.time(HQ.now().toISOString(), cl.tz)) + '</span>') + kv(t('billingEmail'), esc(cl.billingEmail));
    if (Dx.can('bill')) s += kv(t('stripeCustomer'), esc(cl.stripeCustomer)) + kv(t('setupFee'), h.money('bill', D.rates.setupFee, { cents: false }) + ' <span class="small muted">· ' + esc(t('paid')) + ' ' + esc(F.date(cl.setupFeePaidOn)) + '</span>');
    s += kv(t('tracker'), esc(cl.trackerWorkspace)) + kv(t('scopeCard'), h.go(esc(cl.scopePreset), 'scope', { id: (pls[0] || {}).id || cl.id }, 'btn-ghost btn-sm')) + kv(t('telemarketingFile'), h.go(esc(t('open')), 'telemarketing', { id: cl.id }, 'btn-ghost btn-sm'));
    s += '</div><div class="row wrap" style="gap:8px;margin-top:12px">' + (cl.channelId ? h.go(ico('chat', 16) + esc(t('openChannel')) + ' ' + h.badge(Dx.unread(cl.channelId, viewer), 'blue'), 'channel', { id: cl.channelId }, 'btn-blue btn-sm') : '') + (Dx.can('bill') ? h.go(esc(t('billing')), 'billing', { id: cl.id }, 'btn-ghost btn-sm') : '') + '</div>';
    if (cl.notes) s += '<div class="note" style="margin-top:12px">' + esc(L(cl.notes)) + '</div>';
    s += '</div>';
    /* contacts */
    s += h.sec(t('contacts')) + '<div class="card flat tight"><div class="list">' + (cl.logins || []).map(function (id) { var u = Dx.person(id); if (!u) return ''; return h.li({ lead: h.avatar(u), title: esc(u.name) + (id === cl.contactId ? ' ' + h.chip(t('client_'), 'blue') : ''), sub: esc(L(u.title)) + ' · ' + esc(u.email), trail: msgBtn(u) }); }).join('') + '</div></div>';
    /* placements with rates */
    s += h.sec(t('placements'));
    if (!pls.length) s += h.empty(t('noActivePlacement'));
    pls.sort(function (a, b) { return (a.status === 'active' ? 0 : 1) - (b.status === 'active' ? 0 : 1); }).forEach(function (pl) {
      s += placementCard(pl, viewer);
      if (Dx.can('margin') && pl.status === 'active') s += '<div class="note" style="margin:-6px 0 12px">' + esc(t('margin')) + ': ' + h.money('margin', pl.billRate - pl.payRate, { rate: true }) + ' · ' + h.money('margin', (pl.billRate - pl.payRate) * pl.hoursPerWeek, { cents: false }) + esc(t('perWeek')) + '</div>';
    });
    /* blocks */
    var bl = (D.blocks || []).filter(function (b) { return b.clientId === cl.id && (b.status === 'current' || b.start === D.nextBlock.start); });
    if (bl.length) s += h.sec(t('blocks'), h.go(esc(t('money')), 'money', {}, 'btn-ghost btn-sm')) + '<div class="card flat tight"><div class="list">' + bl.map(function (b) { var inv = (D.invoices || []).filter(function (x) { return x.id === b.invoiceId; })[0]; return h.li({ lead: tile('money'), title: esc(F.date(b.start) + '–' + F.date(b.end)) + ' ' + (b.status === 'current' ? h.chip(t('currentBlock'), 'blue') : ''), sub: b.scheduledHours + ' h' + (Dx.can('bill') ? ' × ' + h.money('bill', b.billRate, { rate: true }) + ' = ' + h.money('bill', b.amount, { cents: false }) : '') + (inv && inv.retryOn ? ' · ' + esc(t('retryOn')) + ' ' + esc(F.date(inv.retryOn)) : ''), trail: blockChip(b), go: inv && Dx.can('bill') ? 'invoice' : null, params: inv ? { id: inv.id } : null }); }).join('') + '</div></div>';
    /* pulse */
    var pulse = (D.pulse || []).filter(function (x) { return x.clientId === cl.id; });
    s += h.sec(t('pulse')) + '<div class="card flat tight"><div class="list">' + (pulse.length ? pulse.map(function (x) { return h.li({ lead: '<span class="kpi ' + (x.score >= 4 ? 'good' : x.score <= 2 ? 'bad' : '') + '" style="padding:4px 10px"><span class="v" style="font-size:22px">' + x.score + '</span></span>', title: esc(monthLabel(x.month)), sub: esc(x.comment) + ' <span class="tiny muted">· ' + esc(F.date(x.answeredOn)) + '</span>' }); }).join('') : h.empty(t('noPulse'))) + '</div></div>';
    /* documents and referral */
    var cds = docsOf(cl.id);
    s += h.sec(t('documents')) + '<div class="card flat tight"><div class="list">' + (cds.length ? cds.map(function (d) { return docRow(d); }).join('') : h.empty(t('nothingHere'))) + '</div></div>';
    var refs = (D.referrals || []).filter(function (r) { return r.referrerId === cl.id || r.referredId === cl.id; });
    if (refs.length || cl.referredBy) s += h.sec(t('referral')) + '<div class="card flat tight">' + (cl.referredBy && Dx.client(cl.referredBy) ? kv(t('referredBy'), esc(Dx.client(cl.referredBy).name)) : '') + refs.map(function (r) { var other = Dx.client(r.referrerId === cl.id ? r.referredId : r.referrerId) || Dx.person(r.referrerId === cl.id ? r.referredId : r.referrerId); return kv(r.referrerId === cl.id ? t('referred') : t('referredBy'), esc(other ? other.name : '') + ' ' + h.statusChip(r.status) + (r.credit ? ' ' + h.money('bill', r.credit, { cents: false }) : '') + (Dx.can('bill') ? '<div class="tiny muted">' + esc(L(r.bonusNote)) + '</div>' : '')); }).join('') + '</div>';
    return { title: esc(cl.name), sub: esc(cl.brokerage + ' · ' + cl.state), body: s };
  };

  /* ---------- people directory (staff) ---------- */
  HQ.V.people = function (p) {
    if (!HQ.isStaff()) return deny('people');
    var viewer = HQ.me(); var seg = p.seg || 'vas';
    var s = h.seg([{ v: 'vas', l: t('vas') }, { v: 'clients', l: t('clients') }, { v: 'pipeline', l: t('pipeline') }, { v: 'bench', l: t('bench') }], seg, 'people-seg') + '<div class="list" style="margin-top:10px">';
    var rows = [];
    if (seg === 'vas' || seg === 'bench') {
      var order = { placed: 0, onboarding: 1, bench: 2, inactive: 3 };
      Dx.vas().filter(function (v) { return seg === 'vas' || v.status === 'bench'; }).sort(function (a, b) { return (order[a.status] || 0) - (order[b.status] || 0) || a.first.localeCompare(b.first); }).forEach(function (v) {
        var pl = Dx.placementForVa(v.id); var st = pl ? HQ.status(pl) : null; var cl = pl ? Dx.client(pl.clientId) : null;
        rows.push(h.li({ lead: h.avatar(v, '', st && st.live ? 'live' : ''), title: esc(v.name) + ' <span class="small muted">· ' + esc(Dx.tierShort(v.tier)) + '</span>', sub: esc(cty(v.country, v.tz) + ' · ' + t('english') + ' ' + (v.english || '—')) + (cl ? ' · ' + esc(cl.name) : v.status === 'bench' && v.certifiedOn ? ' · ' + esc(t('benchDays', { n: daysSince(v.certifiedOn) })) : v.cohort ? ' · ' + esc(t('cohort') + ' ' + v.cohort) : ''), trail: h.statusChip(v.status), go: 'person', params: { id: v.id } }));
      });
      if (seg === 'bench') rows.push('<div style="margin-top:10px">' + h.go(esc(t('bench')) + ' · ' + esc(t('callMode')), 'bench', {}, 'btn-blue btn-sm') + '</div>');
    } else if (seg === 'clients') {
      (D.clients || []).forEach(function (cl) { var n = Dx.placementForClient(cl.id).length; rows.push(h.li({ lead: tile('briefcase'), title: esc(cl.name), sub: esc(cl.city + ' · ' + cl.state + ' · ' + n + ' ' + t('activeSeats')), trail: h.badge(cl.channelId ? Dx.unread(cl.channelId, viewer) : 0, 'blue'), go: 'client', params: { id: cl.id } })); });
    } else {
      (D.applications || []).slice().sort(function (a, b) { return STAGES.indexOf(b.stage) - STAGES.indexOf(a.stage); }).forEach(function (a) { var ap = Dx.person(a.personId); if (!ap) return; var late = a.expectedReplyBy && F.daysUntil(a.expectedReplyBy) < 0; rows.push(h.li({ lead: h.avatar(ap), title: esc(ap.name), sub: esc(cty(a.answers.country, ap.tz)) + (a.expectedReplyBy ? ' · ' + esc(t('replyDue')) + ' ' + esc(F.date(a.expectedReplyBy)) : ''), trail: h.chip(stageT(a.stage), late ? 'bad' : a.stage === 'talent_pool' ? '' : 'blue', true), go: 'applicant', params: { id: a.id } })); });
      rows.push('<div style="margin-top:10px">' + h.go(esc(t('pipeline')), 'pipeline', {}, 'btn-blue btn-sm') + '</div>');
    }
    s += (rows.length ? rows.join('') : h.empty(t('noPeople'))) + '</div>';
    return { title: t('people'), body: s, actions: h.btn(I.plus + esc(t('newPerson')), 'toast', 'btn-ghost btn-sm', { msg: t('prototypeOnly') }) };
  };

  /* ---------- person (staff view of a VA) ---------- */
  HQ.V.person = function (p) {
    var viewer = HQ.me(); var per = Dx.person(p.id);
    if (!HQ.isStaff()) {
      if (per && per.id === viewer.id) return HQ.V.profile();
      /* a VA may open a colleague (buddy, manager): name, role, city and local time only; never pay, documents or contact details */
      if (viewer.role === 'va' && per && per.role && per.role !== 'client' && per.role !== 'applicant' && per.status !== 'inactive') {
        var cs = '<div class="card"><div class="row" style="gap:14px;align-items:flex-start">' + h.avatar(per, 'xl') + '<div class="grow"><h2 style="font-size:24px">' + esc(per.name) + '</h2><div class="small muted">' + esc(per.title ? L(per.title) : Dx.tierShort(per.tier) + ' · ' + lvl(per.level)) + '</div>' + (per.id === viewer.buddyId ? '<div style="margin-top:8px">' + h.chip(t('yourBuddy'), 'gold') + '</div>' : '') + '</div></div>';
        cs += '<div style="margin-top:12px">' + kv(t('city'), esc((per.city || '') + (per.country ? ' · ' + per.country : ''))) + kv(t('timezone'), esc(F.tz(per.tz)) + ' <span class="small muted">· ' + esc(localNow(per)) + ' ' + esc(t('localTime').toLowerCase()) + '</span>') + '</div>';
        if (per.skills) cs += '<div style="margin-top:12px"><div class="small muted" style="margin-bottom:4px">' + esc(t('skills')) + '</div>' + chips(per.skills) + '</div>';
        cs += '<div class="row wrap" style="gap:8px;margin-top:14px">' + msgBtn(per, 'btn-blue btn-sm') + h.go(esc(t('channels')), 'channels', {}, 'btn-ghost btn-sm') + '</div></div>';
        return { title: esc(per.name), sub: esc(per.role === 'va' ? Dx.tierShort(per.tier) : t(per.role)), body: cs };
      }
      return deny('people');
    }
    if (!per || !per.role) return { title: t('people'), body: h.empty(t('nothingHere')) };
    if (per.role === 'applicant') return HQ.V.applicant({ id: per.id });
    var s = personHeader(per, viewer) + '<div class="row wrap" style="gap:8px;margin:10px 0">' + msgBtn(per) + (per.role === 'va' ? h.btn(esc(t('edit')), 'toast', 'btn-ghost btn-sm', { msg: t('prototypeOnly') }) : '') + '</div>';
    if (per.role === 'va') {
      var pls = (D.placements || []).filter(function (x) { return x.vaId === per.id; });
      var act = pls.filter(function (x) { return x.status === 'active' || x.status === 'paused'; }); var past = pls.filter(function (x) { return x.status === 'ended'; });
      s += h.sec(t('placement'));
      if (act.length) act.forEach(function (pl) { s += placementCard(pl, viewer); });
      else { var ob = obSummary(per.id); s += '<div class="card flat tight">' + h.empty(t('noActivePlacement'), per.status === 'bench' && per.certifiedOn ? t('benchDays', { n: daysSince(per.certifiedOn) }) : per.status === 'onboarding' && ob ? t('taskProgress', { d: ob.done, n: ob.total }) : '') + (per.status === 'bench' ? '<div class="row" style="justify-content:center">' + h.go(esc(t('bench')), 'bench', {}, 'btn-blue btn-sm') + '</div>' : per.status === 'onboarding' ? '<div class="row" style="justify-content:center">' + h.go(esc(t('cohorts')), 'cohorts', {}, 'btn-blue btn-sm') + '</div>' : '') + '</div>'; }
      if (past.length) s += h.sec(t('placementHistory')) + '<div class="card flat tight"><div class="list">' + past.map(function (pl) { return h.li({ lead: tile('briefcase'), title: esc(Dx.client(pl.clientId).name) + ' <span class="small muted">· ' + esc(Dx.tierShort(pl.tier)) + '</span>', sub: esc(F.date(pl.start) + '–' + F.date(pl.end)) + (pl.endReason ? ' · ' + esc(L(pl.endReason)) : ''), trail: h.statusChip(pl.status), go: 'placement', params: { id: pl.id } }); }).join('') + '</div></div>';
      var extras = payHistoryHtml(per) + documentsHtml(per);
      s += equipmentHtml(per) + academyHtml(per, h.go(esc(t('cohorts')), 'cohorts', {}, 'btn-ghost btn-sm')) + dialingHtml(per.id);
      var ths = (D.threads || []).filter(function (x) { return x.vaId === per.id; });
      if (ths.length) s += h.sec(t('supportThreads')) + '<div class="card flat tight"><div class="list">' + ths.map(function (th) { return h.li({ lead: tile('lock'), title: esc(L(th.title)), sub: esc(t(TOPIC_T[th.topic] || 'topic')), trail: h.statusChip(th.status), go: 'channel', params: { id: th.id } }); }).join('') + '</div></div>';
      var au = (D.auditLog || []).filter(function (x) { return x.target === per.id; });
      if (au.length) s += h.sec(t('auditLog')) + '<div class="card flat tight"><div class="timeline">' + au.map(function (a) { return '<div class="tl"><div class="when">' + esc(F.date(HQ.isoDate(a.at), 'long')) + ' · ' + esc((Dx.person(a.by) || { first: a.by }).first) + '</div>' + esc(L(a.detail)) + '</div>'; }).join('') + '</div></div>';
      if (HQ.isPhone()) s += extras;
      return { title: esc(per.name), sub: esc(Dx.tierShort(per.tier) + ' · ' + t(per.status)), body: s, pane: HQ.isPhone() ? null : extras };
    }
    return { title: esc(per.name), sub: esc(L(per.title) || t(per.role)), body: s };
  };

  /* ---------- own profile ---------- */
  HQ.V.profile = function () {
    var me = HQ.me(); var s = personHeader(me, me);
    s += '<div class="row wrap" style="gap:8px;margin:10px 0">' + h.btn(esc(t('edit')), 'toast', 'btn-ghost btn-sm', { msg: t('prototypeOnly') }) + h.go(esc(t('settings')), 'settings', {}, 'btn-ghost btn-sm') + '</div>';
    if (me.role === 'va') {
      var pl = Dx.placementForVa(me.id);
      if (pl) s += h.sec(t('placement')) + placementCard(pl, me);
      else if (me.status === 'bench') s += '<div class="card accent"><h3>' + esc(t('onBench')) + '</h3><div class="small">' + (me.certifiedOn ? esc(t('certifiedOn') + ' ' + F.date(me.certifiedOn, 'long') + ' · ' + t('benchDays', { n: daysSince(me.certifiedOn) })) : '') + '</div><div class="small muted" style="margin:6px 0 10px">' + esc(t('visibleToClients')) + '</div>' + h.btn(esc(t('updateAvailability')), 'toast', 'btn-gold btn-sm', { msg: t('prototypeOnly') }) + '</div>';
      else if (me.status !== 'inactive') { var ob = obSummary(me.id); s += '<div class="card accent"><h3>' + esc(t('onboarding')) + '</h3>' + (ob ? '<div class="small">' + esc(t('taskProgress', { d: ob.done, n: ob.total })) + '</div>' + h.progress(ob.done * 100 / ob.total, 'gold') : '') + '<div class="row wrap" style="gap:8px;margin-top:10px">' + h.go(esc(t('onboarding')), 'onboarding', {}, 'btn-gold btn-sm') + h.go(esc(t('academy')), 'academy', {}, 'btn-ghost btn-sm') + '</div></div>'; }
      s += payHistoryHtml(me) + equipmentHtml(me) + documentsHtml(me) + academyHtml(me, h.go(esc(t('academy')), 'academy', {}, 'btn-ghost btn-sm'));
      s += h.sec(t('links')) + '<div class="card flat tight"><div class="list">' + h.li({ lead: tile('money'), title: esc(t('payouts')), go: 'payouts' }) + h.li({ lead: tile('school'), title: esc(t('academy')), go: 'academy' }) + h.li({ lead: tile('lock'), title: esc(t('support')), go: 'support' }) + h.li({ lead: tile('calendar'), title: esc(t('calendar')), go: 'calendar' }) + '</div></div>';
      return { title: t('me'), sub: esc(me.name), body: s };
    }
    if (me.role === 'applicant') {
      var app = appOf(me.id);
      if (app) {
        var STEPS = ['submitted', 'scored', 'interview', 'trial', 'offer']; var idx = STEPS.indexOf(app.stage); if (app.stage === 'active' || app.stage === 'placed') idx = STEPS.length; if (app.stage === 'draft') idx = -1;
        s += h.sec(t('myApplication')) + '<div class="card"><div class="steps">' + STEPS.map(function (st, i) { return '<div class="step ' + (i < idx ? 'done' : i === idx ? 'now' : '') + '"><span class="n">' + (i < idx ? '✓' : i + 1) + '</span><div><div class="t">' + esc(stageT(st)) + '</div></div></div>'; }).join('') + '</div>' + (app.stage === 'talent_pool' ? '<div class="note" style="margin-top:10px">' + esc(stageT('talent_pool')) + '</div>' : '') + (app.expectedReplyBy ? '<div class="small muted" style="margin-top:10px">' + esc(t('replyBy', { date: F.date(app.expectedReplyBy, 'long') })) + '</div>' : '') + '</div>';
        s += h.sec(t('nextStep')) + '<div class="card accent"><p>' + esc(L(app.nextStep) || t('nothingForNow')) + '</p>' + (app.interviewAt ? '<div class="row wrap" style="gap:8px;margin-top:10px"><span class="chip blue">' + esc(F.date(HQ.isoDate(app.interviewAt), 'long')) + ' · ' + F.time2(app.interviewAt, 'America/Tegucigalpa') + '</span>' + h.btn(esc(t('confirm')), 'toast', 'btn-gold btn-sm', { msg: t('prototypeOnly') }) + '</div>' : '') + '</div>';
      }
      s += h.sec(t('tests'), h.go(esc(t('open')), 'tests', {}, 'btn-ghost btn-sm')) + '<div class="card flat tight"><div class="list">' + testRows(app) + '</div></div>';
      s += h.sec(t('whatToPrepare')) + '<div class="card flat tight"><div class="list">' + (D.onboardingTaskDefs || []).slice(0, 5).map(function (d) { return h.li({ lead: tile(d.kind === 'upload' ? 'doc' : 'check'), title: esc(L(d.title)) }); }).join('') + '</div></div>';
      s += h.sec(t('howItWorks')) + '<div class="note">' + esc(t('howItWorksText')) + '</div>';
      s += h.sec(t('academy')) + '<button class="card flat tight" style="width:100%;text-align:left;cursor:pointer;color:inherit" data-go="academy"><div class="row" style="gap:8px"><span class="lock">' + I.lock + '</span><b>' + esc(t('academyLocked')) + '</b></div><div class="small muted" style="margin-top:6px">' + trackMods('core').map(function (m) { return esc(L(m.title)); }).join(' · ') + '</div></button>';
      return { title: t('me'), sub: esc(me.name), body: s };
    }
    if (me.role === 'client') { var cl = Dx.clientOf(me); if (cl) s += h.sec(t('client_')) + '<div class="card flat tight">' + kv(t('client_'), esc(cl.name)) + kv(t('brokerage'), esc(cl.brokerage)) + kv(t('billingEmail'), esc(cl.billingEmail)) + '</div>'; }
    return { title: t('profile'), sub: esc(me.name), body: s };
  };

  /* ---------- recruiting pipeline (staff) ---------- */
  function appCard(a) {
    var ap = Dx.person(a.personId); if (!ap) return '';
    var last = (a.stageHistory || [])[a.stageHistory.length - 1]; var days = last ? daysSince(HQ.isoDate(last.at)) : 0; var late = a.expectedReplyBy && F.daysUntil(a.expectedReplyBy) < 0;
    var s = '<button class="kcard" data-go="applicant" data-id="' + a.id + '"><div class="row between"><span class="t">' + esc(ap.name) + '</span>' + (a.total != null ? '<span class="chip ' + (a.total >= 25 ? 'good' : '') + '">' + a.total + '/30</span>' : '') + '</div>';
    s += '<div class="s">' + esc(a.answers.city + ', ' + cty(a.answers.country, ap.tz)) + '</div><div class="s">' + esc(t('english') + ': ' + (ap.english || (a.answers.englishLevel || '—').slice(0, 44))) + '</div><div class="s">' + esc(t('daysInStage', { n: days })) + ' · ' + esc(srcT(a.source)) + (a.cohort ? ' · ' + esc(a.cohort) : '') + '</div>';
    if (a.expectedReplyBy) s += '<div style="margin-top:6px">' + h.chip((late ? t('replyOverdue') : t('replyDue')) + ' ' + F.date(a.expectedReplyBy), late ? 'bad' : 'warn', true) + '</div>';
    return s + '</button>';
  }
  HQ.V.pipeline = function (p) {
    if (!HQ.isStaff()) return deny('recruiting');
    var apps = D.applications || []; var only = p.filter || 'all';
    var s = '<div class="row between wrap" style="margin-bottom:10px">' + h.seg([{ v: 'all', l: t('all') }, { v: 'overdue', l: t('replyOverdue') }], only, 'pipeline-filter') + '<span class="small muted">' + esc(t('applicantsByStage', { n: apps.length })) + '</span></div><div class="kanban">';
    STAGES.forEach(function (st) {
      var col = apps.filter(function (a) { return a.stage === st && (only === 'all' || (a.expectedReplyBy && F.daysUntil(a.expectedReplyBy) < 0)); });
      s += '<div class="kcol"><h4><span>' + esc(stageT(st)) + '</span><span>' + col.length + '</span></h4>' + (col.length ? col.map(appCard).join('') : '<div class="empty" style="padding:14px">' + esc(t('noOneHere')) + '</div>') + '</div>';
    });
    s += '</div>';
    var side = HQ.isPhone() ? null : '<div class="side-head"><h2>' + esc(t('recruiting')) + '</h2></div><div class="side-body">' + STAGES.map(function (st) { var n = apps.filter(function (a) { return a.stage === st; }).length; return '<div class="srow"><span class="hash">' + n + '</span><div class="grow"><div class="name">' + esc(stageT(st)) + '</div></div></div>'; }).join('') + '</div>';
    return { title: t('recruiting'), wide: true, body: s, side: side, actions: h.btn(I.plus + esc(t('newApplicant')), 'toast', 'btn-ghost btn-sm', { msg: t('prototypeOnly') }) };
  };

  /* ---------- applicant card (staff) ---------- */
  var SCORE_KEYS = [['spokenEnglish', 'spokenEnglish'], ['spanish', 'spanish'], ['presence', 'presence'], ['followedBrief', 'followedBrief'], ['accomplishment', 'accomplishment'], ['setup', 'setup']];
  HQ.V.applicant = function (p) {
    var viewer = HQ.me(); var a = appOf(p.id);
    if (!HQ.isStaff()) return a && a.personId === viewer.id ? HQ.V.profile() : deny('recruiting');
    if (!a) return { title: t('applicant'), body: h.empty(t('nothingHere')) };
    var ap = Dx.person(a.personId); var ans = a.answers || {}; var sc = a.scores || {}; var late = a.expectedReplyBy && F.daysUntil(a.expectedReplyBy) < 0;
    var ni = STAGES.indexOf(a.stage); var next = (a.stage === 'talent_pool' || a.stage === 'placed') ? null : STAGES[ni + 1];
    var s = '<div class="card"><div class="row" style="gap:14px;align-items:flex-start">' + h.avatar(ap, 'xl') + '<div class="grow"><h2 style="font-size:24px">' + esc(ap.name) + '</h2><div class="small muted">' + esc(ans.city + ', ' + cty(ans.country, ap.tz) + ' · ' + localNow(ap)) + '</div><div class="row wrap" style="gap:6px;margin-top:8px">' + h.chip(stageT(a.stage), 'blue', true) + h.chip(t('source') + ' ' + srcT(a.source)) + (a.cohort ? h.chip(t('cohort') + ' ' + a.cohort, 'gold') : '') + (a.referredBy && Dx.person(a.referredBy) ? h.chip(t('referredBy') + ' ' + Dx.person(a.referredBy).first, 'good') : '') + '</div></div></div>';
    s += '<div style="margin-top:12px">' + kv(t('submitted'), esc(a.submittedOn ? F.date(a.submittedOn, 'long') : '—')) + kv(t('replyDue'), a.expectedReplyBy ? h.chip(F.date(a.expectedReplyBy, 'long'), late ? 'bad' : 'warn', true) : '—') + (a.interviewAt ? kv(t('interview'), esc(F.date(HQ.isoDate(a.interviewAt), 'long')) + ' · ' + F.time2(a.interviewAt, ap.tz)) : '') + kv(t('whatsapp'), esc(ans.whatsapp || '—')) + '</div>';
    s += '<div class="note gold" style="margin-top:12px"><b>' + esc(t('nextStep')) + '</b> · ' + esc(L(a.nextStep)) + '</div>';
    s += '<div class="row wrap" style="gap:8px;margin-top:12px">' + (next ? h.btn(ico('chev', 16) + esc(t('moveTo') + ' ' + stageT(next)), 'app-move', 'btn-gold btn-sm', { id: a.id, stage: next }) : '') + h.btn(I.plus + esc(t('addNote')), 'app-note', 'btn-ghost btn-sm', { id: a.id }) + h.btn(I.calendar + esc(t('scheduleInterview')), 'toast', 'btn-ghost btn-sm', { msg: t('interviewToast') }) + h.btn(esc(t('emailTemplate')), 'toast', 'btn-ghost btn-sm', { msg: t('prototypeOnly') }) + (a.stage !== 'talent_pool' ? h.btn(esc(t('talentPool')), 'app-move', 'btn-ghost btn-sm', { id: a.id, stage: 'talent_pool' }) : '') + '</div></div>';
    /* scores */
    var sv = function (v) { return v == null ? '<span class="muted">' + esc(t('notScored')) + '</span>' : '<span class="num">' + v + '</span>'; };
    s += h.sec(t('scores')) + '<div class="card flat tight">' + SCORE_KEYS.map(function (k) { return kv(t(k[1]), sv(sc[k[0]]) + (sc[k[0]] != null ? '<span class="muted">/5</span>' : '')); }).join('') + kv(t('total'), '<b class="num">' + (a.total != null ? a.total + '/30' : '—') + '</b>') + kv(t('typingTest'), sv(sc.typingWpm) + (sc.typingWpm != null ? ' WPM' : '')) + kv(t('writtenEnglish'), sv(sc.writtenEnglish) + (sc.writtenEnglish != null ? '<span class="muted">/5</span>' : '')) + kv(t('mockCall'), sv(sc.mockCall) + (sc.mockCall != null ? '<span class="muted">/5</span>' : '')) + '</div>';
    /* answers */
    var ff = function (label, v) { return v ? '<div style="padding:6px 0;border-bottom:1px solid var(--line-2)"><div class="small muted">' + esc(label) + '</div><div>' + esc(v) + '</div></div>' : ''; };
    s += h.sec(t('answers')) + '<div class="card flat tight">' + ff(t('englishLevel'), ans.englishLevel) + ff(t('experience'), ans.experience) + ff(t('availability'), ans.availability) + ff(t('internet'), ans.internet ? ans.internet.down + ' / ' + ans.internet.up + ' ' + t('mbps') + ' · ' + t('backup') + ': ' + (ans.internet.backup || '—') : null) + ff(t('power'), ans.power) + ff(t('computer'), ans.computer) + ff(t('headset'), ans.headset) + ff(t('otherCommitments'), ans.otherCommitments) + ff(t('whyRealEstate'), ans.whyRealEstate) + '<div style="padding:8px 0">' + h.btn(ico('camera', 16) + esc(t('introVideo')), 'toast', 'btn-ghost btn-sm', { msg: t('videoToast') }) + '</div></div>';
    /* notes and stage history */
    s += h.sec(t('notes')) + '<div class="card flat tight">' + ((a.notes || []).length ? '<div class="timeline">' + a.notes.slice().reverse().map(function (n) { var by = Dx.person(n.by); return '<div class="tl"><div class="when">' + esc(by ? by.first : n.by) + ' · ' + esc(F.date(HQ.isoDate(n.at), 'long')) + ' ' + F.time(n.at, viewer.tz) + '</div>' + esc(n.text) + '</div>'; }).join('') + '</div>' : h.empty(t('nothingHere'))) + '</div>';
    s += h.sec(t('stageHistory')) + '<div class="card flat tight">' + ((a.stageHistory || []).length ? '<div class="timeline">' + a.stageHistory.slice().reverse().map(function (x) { var by = Dx.person(x.by); return '<div class="tl"><div class="when">' + esc(F.date(HQ.isoDate(x.at), 'long')) + ' · ' + esc(by ? by.first : x.by) + '</div>' + esc(stageT(x.stage)) + '</div>'; }).join('') + '</div>' : h.empty(t('nothingHere'))) + '</div>';
    return { title: esc(ap.name), sub: esc(stageT(a.stage) + ' · ' + ans.country), body: s };
  };

  /* ---------- bench (call mode) ---------- */
  HQ.V.bench = function (p) {
    var viewer = HQ.me();
    if (!HQ.isStaff() && !(viewer.role === 'va' && viewer.status === 'bench')) return deny('bench');
    var call = p.call === '1'; var cl = p.client ? Dx.client(p.client) : null;
    var list = Dx.vas().filter(function (v) { return v.status === 'bench' && (HQ.isStaff() || v.id === viewer.id); });
    var fitOf = function (v) { if (!cl) return null; var pl = Dx.placementForClient(cl.id)[0]; var from = pl ? pl.schedule.from : '08:00', to = pl ? pl.schedule.to : '17:00'; var a = F.clock(from, cl.tz, v.availability.tz), b = F.clock(to, cl.tz, v.availability.tz); return { from: from, to: to, ok: v.availability.from <= a && v.availability.to >= b }; };
    if (cl) list.sort(function (a, b) { return (fitOf(b).ok ? 1 : 0) - (fitOf(a).ok ? 1 : 0); });
    var s = '';
    if (HQ.isStaff()) s += '<div class="card flat tight stack" style="margin-bottom:12px"><div class="row between wrap"><span class="small b">' + esc(t('matchClient')) + '</span>' + h.seg([{ v: '', l: t('noClientSel') }].concat((D.clients || []).map(function (c) { return { v: c.id, l: c.name }; })), p.client || '', 'bench-client', { call: call ? '1' : '' }) + '</div><div class="row between wrap"><span class="small muted">' + esc(t('callModeNote')) + '</span><button class="toggle ' + (call ? 'on' : '') + '" data-act="bench-call" data-client="' + esc(p.client || '') + '" data-call="' + (call ? '' : '1') + '" style="border:0;background:transparent"><i></i>' + esc(t('callMode')) + '</button></div></div>';
    if (!list.length) s += h.empty(t('nobodyBench'));
    s += '<div class="' + (call ? 'stack' : 'grid2') + '">';
    list.forEach(function (v) {
      var fit = fitOf(v); var name = call ? v.first : v.name;
      var c = '<div class="card" ' + (call ? 'style="padding:22px"' : '') + '><div class="row" style="gap:14px;align-items:flex-start">' + h.avatar(v, call ? 'xl' : 'lg') + '<div class="grow"><h3 style="margin:0;font-size:' + (call ? '24px' : '17px') + '">' + esc(name) + '</h3><div class="small muted">' + esc(Dx.tierShort(v.tier) + ' · ' + cty(v.country, v.tz)) + '</div><div class="row wrap" style="gap:6px;margin-top:6px">' + h.chip(t('english') + ' ' + v.english, 'blue') + (v.tier === 'isa' ? h.chip(t('isaCertified'), 'gold') : h.chip(t('certified'), 'good')) + '</div></div></div>';
      c += '<div style="margin-top:10px">' + kv(t('availability'), span(v.availability.from, v.availability.to, v.availability.tz)) + (fit ? kv(t('clientHours'), span(fit.from, fit.to, cl.tz) + ' ' + h.chip(fit.ok ? t('coversShift') : t('partialShift'), fit.ok ? 'good' : 'warn', true)) : '') + kv(t('certifiedOn'), esc(F.date(v.certifiedOn, 'long')) + ' <span class="tiny muted">· ' + esc(t('benchDays', { n: daysSince(v.certifiedOn) })) + '</span>') + '</div>';
      c += '<div style="margin-top:8px">' + chips(v.skills) + '</div>';
      c += '<div class="row wrap" style="gap:8px;margin-top:12px">' + h.btn(ico('camera', 16) + esc(t('watchVideo')), 'toast', 'btn-ghost btn-sm', { msg: t('videoToast') }) + (HQ.isStaff() ? h.btn(esc(t('proposeToClient')), 'toast', 'btn-gold btn-sm', { msg: t('proposeToast') }) + (call ? '' : h.go(esc(t('profile')), 'person', { id: v.id }, 'btn-ghost btn-sm')) : h.btn(esc(t('updateAvailability')), 'toast', 'btn-gold btn-sm', { msg: t('prototypeOnly') })) + '</div></div>';
      s += c;
    });
    return { title: t('bench'), sub: esc(list.length + ' · ' + t('certified')), body: s + '</div>' };
  };

  /* ---------- academy (own) and cohorts (staff) ---------- */
  function lessonRow(l, pg, own) {
    var st = pg[l.id]; var done = st && st.done;
    return h.li({ lead: '<span class="hash" style="' + (done ? 'background:var(--good-soft);color:var(--good-fg)' : '') + '">' + ico(done ? 'check' : l.kind === 'video' ? 'camera' : l.kind === 'quiz' ? 'steps' : l.kind === 'signoff' ? 'shield' : l.kind === 'task' ? 'check' : 'doc') + '</span>', title: esc(L(l.title)), sub: esc(t(l.kind) + ' · ' + l.minutes + ' ' + t('min')) + (done ? ' · ' + esc(F.date(HQ.isoDate(st.at))) + (st.score != null ? ' · ' + esc(t('score')) + ' ' + st.score + '%' : '') : '') + (l.summary ? '<div style="margin-top:2px">' + esc(L(l.summary)) + '</div>' : ''), trail: done ? h.chip(t('done'), 'good', true) : (own ? h.btn(esc(t('markDone')), 'lesson-done', 'btn-blue btn-sm', { id: l.id }) : h.chip(t('pending'), 'warn', true)) });
  }
  /* One module card; lessons are listed only for the open module, the others get a Lessons button (14 modules would be too long expanded) */
  function moduleCard(m, me, pg, open, own) {
    var x = modProgress(me.id, m); var req = !m.track || me.tier === 'isa';
    var s = '<div class="card" style="margin-top:12px" id="mod-' + esc(m.id) + '"><div class="card-head"><h3>' + esc(t('module') + ' ' + m.order + ' · ' + L(m.title)) + '</h3>' + (x.pct === 100 ? h.chip(t('done'), 'good', true) : m.track ? h.chip(t('isaTrack'), 'gold') : '') + '</div>';
    if (m.description) s += '<div class="small muted" style="margin-bottom:8px">' + esc(L(m.description)) + '</div>';
    s += h.progress(x.pct, x.pct === 100 ? 'good' : '') + '<div class="row between wrap" style="margin-top:6px"><span class="small muted">' + esc(t('lessonsDone', { d: x.done, n: x.total })) + (m.minutes ? ' · ' + m.minutes + ' ' + esc(t('min')) : '') + (req ? '' : ' · ' + esc(t('notRequired'))) + '</span>' + (open ? '' : h.go(esc(t('lessonsBtn')), 'academy', { mod: m.id }, 'btn-ghost btn-sm')) + '</div>';
    if (open) s += '<div class="list" style="margin-top:6px">' + lessonsOf(m.id).map(function (l) { return lessonRow(l, pg, own); }).join('') + '</div>';
    return s + '</div>';
  }
  function ownAcademy(me, openId) {
    var pg = (D.academyProgress || {})[me.id] || {}; var s = '';
    if (academyDone(me)) s += h.note(ico('school', 14) + ' <b>' + esc(t('allDone')) + '</b>' + (me.certifiedOn ? ' · ' + esc(t('certifiedOn')) + ' ' + esc(F.date(me.certifiedOn, 'long')) : '') + (me.tier === 'isa' ? ' · ' + esc(t('isaCertified')) : ''), 'good');
    var cur = currentModule(me); var open = openId || (cur ? cur.id : null); var isaMods = trackMods('isa');
    var openIsIsa = isaMods.some(function (m) { return m.id === open; });
    s += h.sec(t('track1') + ' · ' + t('modulesN', { n: trackMods('core').length }), '<span class="small muted num">' + (function (x) { return x.done + '/' + x.total; })(trackProgress(me.id, 'core')) + '</span>');
    trackMods('core').forEach(function (m) { s += moduleCard(m, me, pg, m.id === open, true); });
    if (isaMods.length) {
      s += h.sec(t('isaTrack') + ' · ' + t('modulesN', { n: isaMods.length }), '<span class="small muted num">' + (function (x) { return x.done + '/' + x.total; })(trackProgress(me.id, 'isa')) + '</span>');
      if (hasIsa(me) || openIsIsa) isaMods.forEach(function (m) { s += moduleCard(m, me, pg, m.id === open, true); });
      else s += '<div class="card flat tight"><div class="row between wrap"><span class="small muted">' + esc(t('isaTrackNote', { n: isaMods.length })) + ' · ' + esc(t('notRequired')) + '</span>' + h.go(esc(t('showTrack')), 'academy', { mod: isaMods[0].id }, 'btn-ghost btn-sm') + '</div></div>';
    }
    return s + dialingHtml(me.id);
  }
  function staffAcademy() {
    var s = ''; var tp = function (x) { return '<span class="' + (x.pct === 100 ? 'chip good' : x.pct ? 'chip warn' : 'muted') + '">' + x.done + '/' + x.total + ' · ' + x.pct + '%</span>'; };
    if (!(D.cohorts || []).length) s += h.empty(t('noOneHere'));
    (D.cohorts || []).forEach(function (c) {
      s += '<div class="card" style="margin-bottom:12px"><div class="card-head"><h3>' + esc(t('cohort')) + ' ' + esc(c.id) + '</h3><span class="small muted">' + esc(F.date(c.start, 'long')) + ' → ' + esc(t('graduation')) + ' ' + esc(F.date(c.graduation, 'long')) + '</span></div>';
      s += h.table([{ l: t('name') }, { l: t('track1') }, { l: t('isaTrack') }, { l: t('currentModule') }, { l: t('tasks'), num: true }, { l: t('buddy') }, { l: '' }], c.members.map(function (id) {
        var m = Dx.person(id); if (!m) return []; var ob = obSummary(id); var ready = m.role === 'va' && academyDone(m) && ob && ob.done === ob.total; var cur = currentModule(m);
        return [h.go(esc(m.name), m.role === 'applicant' ? 'applicant' : 'person', { id: id }, 'btn-ghost btn-sm'), tp(trackProgress(id, 'core')), hasIsa(m) ? tp(trackProgress(id, 'isa')) : '<span class="muted">—</span>', cur ? '<span class="small">' + esc(t('module') + ' ' + cur.order) + '</span>' : h.chip(t('allDone'), 'good'), ob ? ob.done + '/' + ob.total : '—', m.buddyId && Dx.person(m.buddyId) ? esc(Dx.person(m.buddyId).first) : '—', '<div class="row" style="gap:6px">' + h.btn(esc(t('certify')), 'toast', 'btn-gold btn-sm', { msg: t('prototypeOnly') }, ready ? '' : 'disabled') + h.btn(esc(t('remind')), 'toast', 'btn-ghost btn-sm', { msg: t('remindToast') }) + '</div>'];
      }));
      s += '</div>';
    });
    s += h.note(esc(t('certifyNote'))) + h.sec(t('allVas')) + '<div class="card flat tight"><div class="list">' + Dx.vas().filter(function (v) { return v.status !== 'inactive'; }).map(function (v) { var done = requiredMods(v).reduce(function (n, m) { return n + modProgress(v.id, m).done; }, 0), total = requiredMods(v).reduce(function (n, m) { return n + modProgress(v.id, m).total; }, 0); return h.li({ lead: h.avatar(v), title: esc(v.name), sub: esc(t('lessonsDone', { d: done, n: total })) + (v.certifiedOn ? ' · ' + esc(t('certifiedOn')) + ' ' + esc(F.date(v.certifiedOn)) : ''), trail: h.statusChip(v.status), go: 'person', params: { id: v.id } }); }).join('') + '</div></div>';
    return s;
  }
  HQ.V.academy = function (p) {
    var me = HQ.me(); p = p || {};
    if (HQ.isStaff()) return { title: t('cohorts'), body: staffAcademy() };
    var after = function () { if (p.mod) { var el = document.getElementById('mod-' + p.mod); if (el) el.scrollIntoView({ block: 'start' }); } };
    if (me.role === 'va') return { title: t('academy'), sub: esc(me.name), body: ownAcademy(me, p.mod), after: after };
    if (me.role === 'applicant') {
      var app = appOf(me.id); var unlocked = app && (app.stage === 'offer' || app.stage === 'active' || app.stage === 'placed');
      if (unlocked) return { title: t('academy'), body: ownAcademy(me, p.mod), after: after };
      return { title: t('academy'), body: '<div class="card flat"><div class="row" style="gap:8px"><span class="lock">' + I.lock + '</span><b>' + esc(t('academyLocked')) + '</b></div><div class="list" style="margin-top:10px;opacity:.55">' + trackMods('core').map(function (m) { return h.li({ lead: tile('school'), title: esc(t('module') + ' ' + m.order + ' · ' + L(m.title)), sub: esc(lessonsOf(m.id).length + ' ' + t('lessons')) }); }).join('') + '</div><div class="small muted" style="margin-top:10px">' + esc(t('afterCert', { n: trackMods('isa').length })) + '</div></div>' };
    }
    return deny('academy');
  };
  HQ.V.cohorts = function () { return HQ.isStaff() ? HQ.V.academy() : deny('cohorts'); };

  /* ---------- documents ---------- */
  HQ.V.documents = function (p) {
    var me = HQ.me();
    if (me.role === 'client') return deny('documents');
    if (me.role === 'applicant') return { title: t('documents'), body: h.note(esc(t('onboardingLocked'))) + h.sec(t('whatToPrepare')) + '<div class="card flat tight"><div class="list">' + (D.onboardingTaskDefs || []).slice(0, 5).map(function (d) { return h.li({ lead: tile('doc'), title: esc(L(d.title)), trail: h.chip(t('pending'), 'warn', true) }); }).join('') + '</div></div>' };
    if (me.role === 'va') {
      var ds = docsOf(me.id);
      return { title: t('documents'), body: '<div class="card flat tight"><div class="list">' + (ds.length ? ds.map(function (d) { return docRow(d).replace('<div class="right small">', '<div class="right small">' + docButtons(d) + ' '); }).join('') : h.empty(t('nothingHere'))) + '</div></div>' + h.note(esc(t('w8benRule'))) + '<div class="row wrap" style="gap:8px;margin-top:12px">' + h.btn(I.clip + esc(t('upload')), 'toast', 'btn-gold btn-sm', { msg: t('uploadToast') }) + h.go(esc(t('onboarding')), 'onboarding', {}, 'btn-ghost btn-sm') + '</div>' };
    }
    var seg = p.seg || 'attention'; var all = (D.documents || []).filter(function (d) { return d.status !== 'archived'; });
    var attn = all.filter(function (d) { return d.status === 'expiring' || d.status === 'missing' || d.status === 'expired'; });
    var list = seg === 'attention' ? attn : seg === 'people' ? all.filter(function (d) { return !!personOnly(d.ownerId); }) : seg === 'clients' ? all.filter(function (d) { return !personOnly(d.ownerId); }) : all;
    var ord = { expired: 0, missing: 1, expiring: 2, valid: 3 }; list = list.slice().sort(function (a, b) { return (ord[a.status] || 9) - (ord[b.status] || 9); });
    var s = h.seg([{ v: 'attention', l: t('needsAttention') + ' (' + attn.length + ')' }, { v: 'all', l: t('all') }, { v: 'people', l: t('people') }, { v: 'clients', l: t('clients') }], seg, 'docs-seg') + '<div style="margin-top:10px">';
    var docBtn = function (d) { return h.btn(esc(d.status === 'missing' ? t('requestDoc') : t('upload')), 'toast', 'btn-ghost btn-sm', { msg: d.status === 'missing' ? t('prototypeOnly') : t('uploadToast') }); };
    var holder = function (d) { var o = Dx.person(d.ownerId) || { name: d.ownerId }; return h.go(esc(o.name), personOnly(d.ownerId) ? 'person' : 'client', { id: d.ownerId }, 'btn-ghost btn-sm'); };
    if (!list.length) s += h.empty(t('nothingExpiring'));
    /* six columns do not fit a phone: rows there, the table on desktop */
    else if (HQ.isPhone()) s += '<div class="card flat tight"><div class="list">' + list.map(function (d) { return h.li({ lead: tile('doc'), title: esc(L(d.title)), sub: '<div style="margin:2px 0 4px">' + holder(d) + '</div>' + (d.signedOn ? esc(t('signed') + ' ' + F.date(d.signedOn)) + ' · ' : '') + esc(t('expires')) + ' ' + expiryText(d), trail: h.statusChip(d.status) + '<div style="margin-top:6px">' + docBtn(d) + '</div>' }); }).join('') + '</div></div>';
    else s += h.table([{ l: t('holder') }, { l: t('type') }, { l: t('signed') }, { l: t('expires') }, { l: t('status') }, { l: '' }], list.map(function (d) { return [holder(d), esc(L(d.title)), esc(d.signedOn ? F.date(d.signedOn) : '—'), expiryText(d), h.statusChip(d.status), docBtn(d)]; }));
    return { title: t('documents'), body: s + '</div>' + h.note(esc(t('w8benRule'))), actions: h.btn(I.plus + esc(t('requestDoc')), 'toast', 'btn-gold btn-sm', { msg: t('prototypeOnly') }) };
  };

  /* ---------- onboarding ---------- */
  HQ.V.onboarding = function () {
    var me = HQ.me(); var defs = D.onboardingTaskDefs || [];
    if (me.role === 'client') return deny('onboarding');
    if (HQ.isStaff()) {
      var ppl = Dx.vas().filter(function (v) { var ob = obSummary(v.id); return ob && (v.status === 'onboarding' || ob.done < ob.total); });
      return { title: t('onboarding'), body: '<div class="card flat tight"><div class="list">' + (ppl.length ? ppl.map(function (v) { var ob = obSummary(v.id); return h.li({ lead: h.avatar(v), title: esc(v.name), sub: esc(t('taskProgress', { d: ob.done, n: ob.total })) + (v.buddyId ? ' · ' + esc(t('buddy')) + ' ' + esc(Dx.person(v.buddyId).first) : ''), trail: '<div style="width:90px">' + h.progress(ob.done * 100 / ob.total, ob.done === ob.total ? 'good' : 'gold') + '</div>', go: 'person', params: { id: v.id } }); }).join('') : h.empty(t('noTasks'))) + '</div></div>' };
    }
    var op = (D.onboardingProgress || {})[me.id];
    if (!op) return { title: t('onboarding'), body: h.empty(t('noTasks'), me.role === 'applicant' ? t('onboardingLocked') : '') };
    var ob = obSummary(me.id);
    var s = '<div class="card accent"><div class="row between"><h3 style="margin:0">' + esc(t('taskProgress', { d: ob.done, n: ob.total })) + '</h3>' + (ob.done === ob.total ? h.chip(t('done'), 'good', true) : '') + '</div>' + h.progress(ob.done * 100 / ob.total, 'gold') + '<div class="small muted" style="margin-top:6px">' + esc(t('unlocksBench')) + '</div></div>';
    s += '<div class="card flat tight" style="margin-top:12px"><div class="list">' + defs.map(function (d) {
      var x = op[d.id] || { status: 'pending' }; var done = x.status === 'done';
      return h.li({ lead: '<span class="hash" style="' + (done ? 'background:var(--good-soft);color:var(--good-fg)' : '') + '">' + ico(done ? 'check' : d.kind === 'upload' ? 'clip' : d.kind === 'link' ? 'doc' : 'phone') + '</span>', title: esc(L(d.title)), sub: (done ? esc(t('done') + ' ' + F.date(x.at)) : x.due ? esc(t('due') + ' ' + F.date(x.due, 'long')) : '') + (x.note ? ' · ' + esc(L(x.note)) : ''), trail: done ? h.chip(t('done'), 'good', true) : x.status === 'rejected' ? h.chip(t('rejected'), 'bad', true) : (d.kind === 'check' ? h.btn(esc(t('markDoneTask')), 'ob-done', 'btn-blue btn-sm', { id: d.id }) : h.btn(esc(d.kind === 'link' ? t('sign') : t('upload')), 'ob-done', 'btn-gold btn-sm', { id: d.id })) });
    }).join('') + '</div></div>';
    var bud = me.buddyId ? Dx.person(me.buddyId) : null;
    if (bud) s += h.sec(t('yourBuddy')) + '<div class="card flat tight"><div class="row between wrap"><div class="row" style="gap:10px">' + h.avatar(bud) + '<div><div class="b" style="color:var(--fg)">' + esc(bud.name) + '</div><div class="small muted">' + esc(Dx.tierShort(bud.tier) + ' · ' + bud.city) + '</div></div></div>' + msgBtn(bud) + '</div></div>';
    return { title: t('onboarding'), sub: esc(me.name), body: s };
  };

  /* ---------- tests (applicant; staff see status) ---------- */
  function testStatus(app, key) {
    var m = ((D.testState || {})[app.personId] || {})[key]; if (m) return m;
    var sc = app.scores || {};
    if (key === 'typing') return sc.typingWpm != null ? 'received' : 'pending';
    if (key === 'written') return sc.writtenEnglish != null ? 'received' : 'pending';
    return sc.mockCall != null ? 'received' : app.interviewAt ? 'scheduled' : 'pending';
  }
  function testChip(st) { return h.chip(st === 'received' ? t('received') : st === 'scheduled' ? t('scheduledT') : t('pending'), st === 'received' ? 'good' : st === 'scheduled' ? 'blue' : 'warn', true); }
  var TESTS = [{ k: 'typing', title: 'typingTestT', desc: 'typingDesc', min: 10 }, { k: 'written', title: 'writtenTestT', desc: 'writtenDesc', min: 20 }, { k: 'mock', title: 'mockCallT', desc: 'mockDesc', min: 15 }];
  function testRows(app) { if (!app) return h.empty(t('nothingHere')); return TESTS.map(function (x) { return h.li({ lead: tile(x.k === 'mock' ? 'phone' : 'steps'), title: esc(t(x.title)), sub: esc(x.min + ' ' + t('min')), trail: testChip(testStatus(app, x.k)) }); }).join(''); }
  HQ.V.tests = function () {
    var me = HQ.me();
    if (HQ.isStaff()) return { title: t('testStatus'), body: ((D.applications || []).length ? h.table([{ l: t('name') }, { l: t('stage') }, { l: t('typingTest') }, { l: t('writtenEnglish') }, { l: t('mockCall') }], (D.applications || []).map(function (a) { var ap = Dx.person(a.personId); return [h.go(esc(ap ? ap.name : a.personId), 'applicant', { id: a.id }, 'btn-ghost btn-sm'), esc(stageT(a.stage)), testChip(testStatus(a, 'typing')), testChip(testStatus(a, 'written')), testChip(testStatus(a, 'mock'))]; })) : h.empty(t('noOneHere'))) + h.note(esc(t('neverScored'))) };
    if (me.role !== 'applicant') return deny('tests');
    var app = appOf(me.id); if (!app) return { title: t('tests'), body: h.empty(t('nothingHere')) };
    var s = '<div class="stack">' + TESTS.map(function (x) {
      var st = testStatus(app, x.k); var slot = ((D.testState || {})[me.id] || {})[x.k + 'Slot'];
      var btn = st === 'received' ? '' : x.k === 'mock' ? h.btn(I.calendar + esc(t('pickSlot')), 'test-slot', 'btn-gold btn-sm', { id: app.id }) : h.btn(ico('chev', 16) + esc(t('startTest')), 'test-start', 'btn-gold btn-sm', { id: app.id, key: x.k });
      var when = x.k === 'mock' && st === 'scheduled' ? (slot ? esc(slot) : app.interviewAt ? esc(F.date(HQ.isoDate(app.interviewAt), 'long')) + ' · ' + F.time2(app.interviewAt, 'America/Tegucigalpa') : '') : '';
      return '<div class="card"><div class="card-head"><h3>' + esc(t(x.title)) + '</h3>' + testChip(st) + '</div><div class="small muted">' + esc(t(x.desc)) + ' · ' + esc(x.min + ' ' + t('min')) + '</div>' + (when ? '<div class="small" style="margin-top:6px">' + when + '</div>' : '') + (btn ? '<div style="margin-top:12px">' + btn + '</div>' : '') + '</div>';
    }).join('') + '</div>' + h.note(esc(t('neverScored')), '');
    return { title: t('tests'), sub: esc(me.name), body: s };
  };

  /* ---------- actions ---------- */
  function setTest(pid, key, val) { D.testState = D.testState || {}; D.testState[pid] = D.testState[pid] || {}; D.testState[pid][key] = val; }
  function goParams(screen, params) { S.params = params; HQ.render(); }
  Object.assign(HQ.act, {
    'people-seg': function (el) { goParams('people', { seg: el.dataset.v }); },
    'docs-seg': function (el) { goParams('documents', { seg: el.dataset.v }); },
    'pipeline-filter': function (el) { goParams('pipeline', { filter: el.dataset.v }); },
    'bench-client': function (el) { goParams('bench', { client: el.dataset.v, call: el.dataset.call || '' }); },
    'bench-call': function (el) { goParams('bench', { client: el.dataset.client || '', call: el.dataset.call || '' }); },
    'app-move': function (el) {
      var a = appOf(el.dataset.id); if (!a) return; var st = el.dataset.stage; if (!st || st === a.stage) return;
      a.stage = st; a.stageHistory.push({ stage: st, at: new Date(HQ.now().getTime() + 60000).toISOString(), by: HQ.me().id });
      HQ.toast(t('movedTo', { stage: stageT(st) })); HQ.render();
    },
    'app-note': function (el) { HQ.sheet('<div class="field"><textarea class="inp" name="text" rows="4" placeholder="' + esc(t('noteText')) + '"></textarea></div><div class="row" style="gap:8px">' + h.btn(esc(t('save')), 'app-note-save', 'btn-gold', { id: el.dataset.id }) + h.btn(esc(t('cancel')), 'close-sheet', 'btn-ghost') + '</div>', t('addNote')); },
    'app-note-save': function (el) {
      var a = appOf(el.dataset.id); var v = HQ.formVals(document.getElementById('sheet')); if (!a || !(v.text || '').trim()) return;
      a.notes.push({ by: HQ.me().id, at: new Date(HQ.now().getTime() + 60000).toISOString(), text: v.text.trim() }); HQ.closeSheet(); HQ.toast(t('noteSaved')); HQ.render();
    },
    'lesson-done': function (el) { var me = HQ.me(); D.academyProgress = D.academyProgress || {}; var pg = D.academyProgress[me.id] = D.academyProgress[me.id] || {}; pg[el.dataset.id] = { done: true, at: new Date(HQ.now().getTime() + 60000).toISOString() }; HQ.toast(t('lessonDone')); HQ.render(); },
    'ob-done': function (el) { var me = HQ.me(); var op = (D.onboardingProgress || {})[me.id]; if (!op) return; op[el.dataset.id] = { status: 'done', at: Dx.today(), note: null }; HQ.toast(t('taskDone')); HQ.render(); },
    'test-start': function (el) { var a = appOf(el.dataset.id); if (!a) return; setTest(a.personId, el.dataset.key, 'received'); HQ.toast(t('testReceived')); HQ.render(); },
    'test-slot': function (el) {
      var opts = ['2026-10-22 10:00', '2026-10-22 14:00', '2026-10-23 10:00'].map(function (x) { var d = x.split(' '); return '<option value="' + esc(F.date(d[0], 'long') + ' · ' + F.ampm(d[1]) + ' HN') + '">' + esc(F.date(d[0], 'long') + ' · ' + F.ampm(d[1]) + ' HN') + '</option>'; }).join('');
      HQ.sheet(h.field(t('pickSlot'), '<select class="inp" name="slot">' + opts + '</select>', t('slotNote')) + '<div class="row" style="gap:8px">' + h.btn(esc(t('confirm')), 'test-slot-save', 'btn-gold', { id: el.dataset.id }) + h.btn(esc(t('cancel')), 'close-sheet', 'btn-ghost') + '</div>', t('mockCallT'));
    },
    'test-slot-save': function (el) { var a = appOf(el.dataset.id); var v = HQ.formVals(document.getElementById('sheet')); if (!a) return; setTest(a.personId, 'mock', 'scheduled'); setTest(a.personId, 'mockSlot', v.slot); HQ.closeSheet(); HQ.toast(t('slotSaved')); HQ.render(); }
  });
})();
