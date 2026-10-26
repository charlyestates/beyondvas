/* BeyondVAs HQ prototype: compliance and quality seed data (scope cards, telemarketing files, call QA,
   tickets, replacements, offboarding, client pulse, audit log, referrals).
   Scope cards are BeyondVAs house rules for unlicensed assistants, pending counsel review: not legal advice.
   Names are fictional placeholders. Ids for people, clients, placements and channels come from core.js. */
window.HQD = window.HQD || {};

/* ---------- Scope cards (one preset per client state) ---------- */
HQD.scopeCards = {
  CA: {
    state: 'CA',
    title: { en: 'California scope card', es: 'Tarjeta de alcance: California' },
    allowed: [
      { en: 'Inbound calls, texts and emails from leads and clients', es: 'Llamadas, mensajes y correos entrantes de leads y clientes' },
      { en: 'Admin, transaction coordination and marketing support', es: 'Administración, coordinación de transacciones y apoyo de marketing' },
      { en: 'Outbound calls only to numbers on a list scrubbed within the last 31 days', es: 'Llamadas salientes solo a números de una lista depurada en los últimos 31 días' },
      { en: "Calling between 8 AM and 9 PM in the lead's local time", es: 'Llamar entre 8 AM y 9 PM en la hora local del lead' },
      { en: 'Say the company name within the first 30 seconds of every call', es: 'Decir el nombre de la empresa en los primeros 30 segundos de cada llamada' },
      { en: 'Record a call only after the lead agrees to the recording', es: 'Grabar una llamada solo después de que el lead acepte la grabación' }
    ],
    notAllowed: [
      { en: 'Calling any number that is not on the scrubbed list', es: 'Llamar a cualquier número que no esté en la lista depurada' },
      { en: 'Calling before 8 AM or after 9 PM local time', es: 'Llamar antes de las 8 AM o después de las 9 PM hora local' },
      { en: 'Calling back anyone who asked not to be called; log the opt-out the same day', es: 'Volver a llamar a quien pidió no ser contactado; registrar la exclusión el mismo día' },
      { en: 'Recording without consent', es: 'Grabar sin consentimiento' },
      { en: 'Discussing price, commission or contract terms: hand off to a licensed agent', es: 'Hablar de precio, comisión o términos del contrato: pasar a un agente con licencia' }
    ],
    callingHours: { en: "8 AM to 9 PM local time, inside the client's calling hours from the telemarketing file", es: '8 AM a 9 PM hora local, dentro del horario de llamadas del cliente en el expediente de telemarketing' },
    notes: { en: "BeyondVAs house rules for unlicensed assistants, not legal advice. Outbound is blocked automatically when the client's last DNC scrub is older than 31 days.", es: 'Reglas internas de BeyondVAs para asistentes sin licencia, no es asesoría legal. Las llamadas salientes se bloquean automáticamente cuando la última depuración DNC del cliente tiene más de 31 días.' },
    version: '2026-10',
    counselReview: 'pending'
  },
  TX: {
    state: 'TX',
    title: { en: 'Texas scope card', es: 'Tarjeta de alcance: Texas' },
    allowed: [
      { en: 'Inbound calls, texts and emails from leads and clients', es: 'Llamadas, mensajes y correos entrantes de leads y clientes' },
      { en: 'Admin and transaction coordination: Dotloop, listing paperwork, MLS data entry', es: 'Administración y coordinación de transacciones: Dotloop, papeleo de listados, captura en el MLS' },
      { en: 'Marketing support: social posts, email campaigns, CRM cleanup', es: 'Apoyo de marketing: publicaciones en redes, campañas de correo, limpieza del CRM' },
      { en: "Scheduling and calendar management for the client's agents", es: 'Agenda y manejo de calendario para los agentes del cliente' }
    ],
    notAllowed: [
      { en: 'Cold calling by an unlicensed assistant', es: 'Llamadas en frío por un asistente sin licencia' },
      { en: 'Soliciting listings or buyers by phone, text or door-knock lists', es: 'Captar listados o compradores por teléfono, mensajes o listas de visitas puerta a puerta' },
      { en: 'Discussing price, commission or contract terms: hand off to a licensed agent', es: 'Hablar de precio, comisión o términos del contrato: pasar a un agente con licencia' }
    ],
    callingHours: { en: 'Not applicable: no outbound sales calls on Texas accounts', es: 'No aplica: sin llamadas salientes de ventas en cuentas de Texas' },
    notes: { en: 'BeyondVAs house rules for unlicensed assistants, not legal advice. Texas accounts are inbound and admin only, so the telemarketing file stays empty.', es: 'Reglas internas de BeyondVAs para asistentes sin licencia, no es asesoría legal. Las cuentas de Texas son solo entrante y administración, así que el expediente de telemarketing queda vacío.' },
    version: '2026-10',
    counselReview: 'pending'
  },
  FL: {
    state: 'FL',
    title: { en: 'Florida scope card', es: 'Tarjeta de alcance: Florida' },
    allowed: [
      { en: 'Inbound calls, texts and emails from leads and clients', es: 'Llamadas, mensajes y correos entrantes de leads y clientes' },
      { en: 'Admin, transaction coordination and marketing support', es: 'Administración, coordinación de transacciones y apoyo de marketing' },
      { en: "Outbound sales calls only when all four hold: signed telemarketing addendum, client registration confirmed, list scrubbed within 31 days, inside the client's calling hours", es: 'Llamadas salientes de ventas solo cuando se cumplen las cuatro condiciones: adenda de telemarketing firmada, registro del cliente confirmado, lista depurada en los últimos 31 días y dentro del horario de llamadas del cliente' },
      { en: 'Say the company name within the first 30 seconds of every call', es: 'Decir el nombre de la empresa en los primeros 30 segundos de cada llamada' }
    ],
    notAllowed: [
      { en: 'Any outbound sales call before the addendum is signed and the registration is confirmed', es: 'Cualquier llamada saliente de ventas antes de firmar la adenda y confirmar el registro' },
      { en: 'Calling any number that is not on the scrubbed list', es: 'Llamar a cualquier número que no esté en la lista depurada' },
      { en: "Calling outside the client's calling hours", es: 'Llamar fuera del horario de llamadas del cliente' },
      { en: 'Calling back anyone who asked not to be called; log the opt-out the same day', es: 'Volver a llamar a quien pidió no ser contactado; registrar la exclusión el mismo día' },
      { en: 'Discussing price, commission or contract terms: hand off to a licensed agent', es: 'Hablar de precio, comisión o términos del contrato: pasar a un agente con licencia' }
    ],
    callingHours: { en: "The client's calling hours as written in its telemarketing file; nothing outside them", es: 'El horario de llamadas del cliente tal como está en su expediente de telemarketing; nada fuera de él' },
    notes: { en: 'BeyondVAs house rules for unlicensed assistants, not legal advice. Florida accounts start inbound and admin; outbound opens only when the telemarketing file is complete.', es: 'Reglas internas de BeyondVAs para asistentes sin licencia, no es asesoría legal. Las cuentas de Florida empiezan con entrante y administración; las salientes se abren solo cuando el expediente de telemarketing está completo.' },
    version: '2026-10',
    counselReview: 'pending'
  },
  default: {
    state: null,
    title: { en: 'Default scope card (state not yet reviewed)', es: 'Tarjeta de alcance predeterminada (estado aún sin revisar)' },
    allowed: [
      { en: 'Inbound calls, texts and emails from leads and clients', es: 'Llamadas, mensajes y correos entrantes de leads y clientes' },
      { en: 'Admin, transaction coordination and marketing support', es: 'Administración, coordinación de transacciones y apoyo de marketing' }
    ],
    notAllowed: [
      { en: "Any outbound sales calling or texting until this state's card is reviewed", es: 'Cualquier llamada o mensaje saliente de ventas hasta que se revise la tarjeta de este estado' },
      { en: 'Discussing price, commission or contract terms: hand off to a licensed agent', es: 'Hablar de precio, comisión o términos del contrato: pasar a un agente con licencia' }
    ],
    callingHours: { en: "No outbound calling until this state's card is reviewed", es: 'Sin llamadas salientes hasta que se revise la tarjeta de este estado' },
    notes: { en: 'BeyondVAs house rules for unlicensed assistants, not legal advice. Applies to every state without its own preset.', es: 'Reglas internas de BeyondVAs para asistentes sin licencia, no es asesoría legal. Aplica a todo estado que no tenga su propia tarjeta.' },
    version: '2026-10',
    counselReview: 'pending'
  }
};

/* ---------- Scope acknowledgments (one per active placement) ---------- */
HQD.scopeAcks = [
  { placementId: 'p-rod-2',  vaId: 'u-mariela', version: '2026-10', acknowledgedAt: '2026-10-02T08:14:00-07:00' },
  { placementId: 'p-lone-1', vaId: 'u-jose',    version: '2026-10', acknowledgedAt: '2026-10-02T09:03:00-05:00' },
  { placementId: 'p-sun-1',  vaId: 'u-andrea',  version: '2026-10', acknowledgedAt: '2026-10-01T09:32:00-04:00' }
];

/* ---------- Telemarketing files (one per client) ---------- */
HQD.telemarketingFiles = [
  {
    clientId: 'c-rodriguez',
    outboundAllowed: true,
    lastScrubOn: '2026-10-06',
    scrubDueOn: '2026-11-06',
    listSource: { en: "Circle prospecting lists built from the client's title-company farm data plus expired listings from the MLS; the client scrubs them against the national Do Not Call list before uploading to Mojo", es: 'Listas de prospección de círculo armadas con la data de la compañía de títulos del cliente más listados vencidos del MLS; el cliente las depura contra la lista nacional de No Llamar antes de subirlas a Mojo' },
    scripts: [
      { name: { en: 'Circle prospecting (neighbor preview)', es: 'Prospección de círculo (vista previa para vecinos)' }, version: 'v2', status: 'approved', approvedOn: '2026-09-10', approvedBy: 'u-ana' },
      { name: { en: 'Expired listings', es: 'Listados vencidos' }, version: 'v1', status: 'approved', approvedOn: '2026-09-24', approvedBy: 'u-ana' }
    ],
    consentPractice: { en: 'Opt-outs are honored on the spot and logged in Follow Up Boss as Do Not Call the same day; the internal DNC list is exported to the client every Friday', es: 'Las exclusiones se respetan al momento y se registran en Follow Up Boss como No Llamar el mismo día; la lista DNC interna se exporta al cliente cada viernes' },
    callingHours: { en: 'Monday to Friday, 8 AM to 6 PM Pacific (inside the 8 AM to 9 PM California window); Mariela dials during her 8 AM to 5 PM shift', es: 'Lunes a viernes, 8 AM a 6 PM hora del Pacífico (dentro de la ventana de California de 8 AM a 9 PM); Mariela marca durante su turno de 8 AM a 5 PM' },
    addendumSignedOn: '2026-08-06',
    recordingDisclosure: { en: 'Mariela says the call is recorded within the first 30 seconds; if the lead objects, recording stops and the call continues without it', es: 'Mariela avisa que la llamada se graba en los primeros 30 segundos; si el lead se opone, se detiene la grabación y la llamada sigue sin ella' },
    notes: { en: 'Only ISA account with outbound calling today (Mariela, p-rod-2).', es: 'Única cuenta ISA con llamadas salientes hoy (Mariela, p-rod-2).' }
  },
  {
    clientId: 'c-lonestar',
    outboundAllowed: false,
    lastScrubOn: null,
    scrubDueOn: null,
    listSource: { en: 'None. No outbound calling on this account (Texas scope card).', es: 'Ninguna. Sin llamadas salientes en esta cuenta (tarjeta de alcance de Texas).' },
    scripts: [],
    consentPractice: { en: 'Not applicable: inbound and admin only', es: 'No aplica: solo entrante y administración' },
    callingHours: { en: "Inbound only, 9 AM to 3 PM Central (José's schedule)", es: 'Solo entrante, 9 AM a 3 PM hora central (horario de José)' },
    addendumSignedOn: null,
    recordingDisclosure: { en: 'Not applicable: no outbound calls are placed or recorded', es: 'No aplica: no se hacen ni se graban llamadas salientes' },
    notes: { en: 'Outbound stays blocked while the client is on the Texas card.', es: 'Las salientes siguen bloqueadas mientras el cliente esté en la tarjeta de Texas.' }
  },
  {
    clientId: 'c-sunshine',
    outboundAllowed: true,
    lastScrubOn: '2026-10-14',
    scrubDueOn: '2026-11-14',
    listSource: { en: 'Sphere and past-client list exported from the KW Command CRM; scrubbed by the client on October 14 for ISA work planned for later', es: 'Lista de esfera y clientes pasados exportada del CRM KW Command; depurada por el cliente el 14 de octubre para el trabajo ISA planeado más adelante' },
    scripts: [
      { name: { en: 'Sphere check-in', es: 'Contacto con la esfera' }, version: 'v0.3', status: 'draft', approvedOn: null, approvedBy: null }
    ],
    consentPractice: { en: 'Opt-outs to be logged in KW Command as Do Not Call the same day; practice confirmed with Priya, no calls placed yet', es: 'Las exclusiones se registrarán en KW Command como No Llamar el mismo día; práctica confirmada con Priya, aún no se hacen llamadas' },
    callingHours: { en: 'Monday to Friday, 9 AM to 7 PM Eastern, as set by the client', es: 'Lunes a viernes, 9 AM a 7 PM hora del Este, según lo fijó el cliente' },
    addendumSignedOn: '2026-09-26',
    recordingDisclosure: { en: 'Recording notice to be read at the top of every outbound call; the client has not picked a recording vendor, so nothing is recorded until it does', es: 'El aviso de grabación se leerá al inicio de cada llamada saliente; el cliente no ha elegido proveedor de grabación, así que nada se graba hasta que lo haga' },
    notes: { en: 'File is ready for a future ISA seat; Andrea (p-sun-1) is operations and places no sales calls. The script is still a draft.', es: 'El expediente está listo para un futuro puesto ISA; Andrea (p-sun-1) es de operaciones y no hace llamadas de ventas. El guion sigue en borrador.' }
  }
];

/* ---------- Call QA: 3 recorded calls per ISA per week, scored 0-2 on five items ---------- */
HQD.callQA = [
  {
    id: 'qa-2026-09-28', vaId: 'u-mariela', placementId: 'p-rod-2', weekStart: '2026-09-28',
    calls: [
      { date: '2026-09-29', leadRef: 'Lead #4402', scores: { identification: 2, script: 2, dnc: 2, recording: 2, handoff: 2 }, total: 10,
        notes: { en: 'Clean call: company named at 0:08, recording notice at 0:12, appointment set and handed to Ana with full notes.', es: 'Llamada limpia: empresa mencionada a los 0:08, aviso de grabación a los 0:12, cita agendada y entregada a Ana con notas completas.' } },
      { date: '2026-09-30', leadRef: 'Lead #4409', scores: { identification: 2, script: 2, dnc: 2, recording: 2, handoff: 1 }, total: 9,
        notes: { en: "Appointment set, but the handoff note in Follow Up Boss was missing the lead's preferred time.", es: 'Cita agendada, pero a la nota de entrega en Follow Up Boss le faltó la hora preferida del lead.' } },
      { date: '2026-10-02', leadRef: 'Lead #4418', scores: { identification: 2, script: 1, dnc: 2, recording: 2, handoff: 2 }, total: 9,
        notes: { en: 'Skipped the second value line of the circle script; still natural and the owner agreed to a callback.', es: 'Se saltó la segunda línea de valor del guion de círculo; aun así sonó natural y el propietario aceptó una llamada de seguimiento.' } }
    ],
    weekScore: 9.3, pass: true, reviewedBy: 'u-daniela', reviewedOn: '2026-10-05'
  },
  {
    id: 'qa-2026-10-05', vaId: 'u-mariela', placementId: 'p-rod-2', weekStart: '2026-10-05',
    calls: [
      { date: '2026-10-06', leadRef: 'Lead #4436', scores: { identification: 2, script: 2, dnc: 2, recording: 2, handoff: 2 }, total: 10,
        notes: { en: 'First live use of the expired-listings script v1: good tone, owner agreed to a call with Ana on Thursday.', es: 'Primer uso en vivo del guion de listados vencidos v1: buen tono, el propietario aceptó una llamada con Ana el jueves.' } },
      { date: '2026-10-07', leadRef: 'Lead #4441', scores: { identification: 2, script: 2, dnc: 2, recording: 2, handoff: 2 }, total: 10,
        notes: { en: 'Lead asked to be removed; Mariela confirmed, ended politely and logged the Do Not Call in Follow Up Boss within a minute.', es: 'El lead pidió que lo quitaran; Mariela confirmó, cerró con cortesía y registró el No Llamar en Follow Up Boss en menos de un minuto.' } },
      { date: '2026-10-09', leadRef: 'Lead #4449', scores: { identification: 2, script: 2, dnc: 2, recording: 1, handoff: 2 }, total: 9,
        notes: { en: 'Recording notice came at 0:26, close to the 30-second limit. Reminded her to open with it.', es: 'El aviso de grabación llegó a los 0:26, cerca del límite de 30 segundos. Se le recordó abrir con él.' } }
    ],
    weekScore: 9.7, pass: true, reviewedBy: 'u-daniela', reviewedOn: '2026-10-12'
  },
  {
    id: 'qa-2026-10-12', vaId: 'u-mariela', placementId: 'p-rod-2', weekStart: '2026-10-12',
    calls: [
      { date: '2026-10-12', leadRef: 'Lead #4471', scores: { identification: 2, script: 2, dnc: 2, recording: 2, handoff: 2 }, total: 10,
        notes: { en: 'Textbook circle call (Orangecrest): company at 0:07, disclosure at 0:10; seller consult set for Thursday 2 PM and handed to Ana with full notes.', es: 'Llamada de círculo de manual (Orangecrest): empresa a los 0:07, aviso a los 0:10; consulta de vendedor agendada para el jueves a las 2 PM y entregada a Ana con notas completas.' } },
      { date: '2026-10-14', leadRef: 'Lead #4412', scores: { identification: 2, script: 1, dnc: 2, recording: 0, handoff: 2 }, total: 7,
        notes: { en: 'No recording disclosure: Mariela went from the greeting straight into the script and the lead was never told the call was recorded; the Monday 3 PM appointment was set and handed off correctly. Reviewed with her on October 19; the disclosure line is now the first line of her opener card.', es: 'Sin aviso de grabación: Mariela pasó del saludo directo al guion y nunca le dijo al lead que la llamada se grababa; la cita del lunes a las 3 PM sí quedó agendada y entregada correctamente. Revisado con ella el 19 de octubre; la línea del aviso ahora es la primera de su tarjeta de apertura.' } },
      { date: '2026-10-16', leadRef: 'Lead #4466', scores: { identification: 2, script: 2, dnc: 2, recording: 2, handoff: 2 }, total: 10,
        notes: { en: 'Disclosure at 0:05, company at 0:09; the one appointment set on this lighter dial day, with full handoff notes in Follow Up Boss.', es: 'Aviso a los 0:05, empresa a los 0:09; la única cita agendada en este día de menos marcaciones, con notas de entrega completas en Follow Up Boss.' } }
    ],
    weekScore: 9.0, pass: true, reviewedBy: 'u-daniela', reviewedOn: '2026-10-19'
  }
];

/* ---------- Tickets: escalation, tech, replacement, coaching ---------- */
HQD.tickets = [
  {
    id: 'tk-0007', kind: 'escalation', clientId: 'c-lonestar', placementId: 'p-lone-1', vaId: 'u-jose', openedBy: 'u-mike',
    openedAt: '2026-10-19T09:40:00-05:00', ackDueAt: '2026-10-20T09:40:00-05:00', ackAt: '2026-10-19T10:15:00-05:00', fixDueAt: '2026-10-26T09:40:00-05:00',
    status: 'in-progress', closedAt: null,
    title: { en: 'Late starts and dropped connection after power outages', es: 'Entradas tarde y conexión caída por cortes de luz' },
    summary: { en: 'José clocked in at 11:20 AM CT on Thursday, October 15 and at 11:05 AM CT on Friday, October 16 (his schedule starts at 9:00) after two morning power outages in Tegucigalpa, and on Friday Jenna had to chase him for the Mesa Dr amendment. Both outages are in the outage log with reasons; the problem was the silence, since nobody at Lone Star heard from him until he was back online. Mike escalated from the client channel on Monday; the 1-business-day acknowledgment was met and the 5-day fix window runs to October 26.', es: 'José marcó entrada a las 11:20 AM hora central el jueves 15 de octubre y a las 11:05 AM el viernes 16 (su horario empieza a las 9:00) por dos cortes de luz matutinos en Tegucigalpa, y el viernes Jenna tuvo que buscarlo por la enmienda de Mesa Dr. Ambos cortes están en el registro con su motivo; el problema fue el silencio, porque nadie en Lone Star supo de él hasta que volvió a conectarse. Mike escaló desde el canal del cliente el lunes; el acuse en 1 día hábil se cumplió y la ventana de solución de 5 días corre hasta el 26 de octubre.' },
    plan: [
      { en: 'Outage log reviewed: two power outages with reasons (Oct 15, 150 min; Oct 16, 130 min); root cause is no UPS and no backup internet; no low-activity flags', es: 'Registro de cortes revisado: dos cortes de luz con motivo (15 oct, 150 min; 16 oct, 130 min); la causa es no tener UPS ni internet de respaldo; sin alertas de baja actividad' },
      { en: 'Prepaid mobile hotspot bought on October 20 as backup internet (tested at 25 Mbps down); $38 reimbursed on the November 5 payout', es: 'Hotspot móvil prepago comprado el 20 de octubre como internet de respaldo (probado a 25 Mbps de bajada); $38 reembolsados en el pago del 5 de noviembre' },
      { en: 'Start-time check-in posted in Client · José every morning this week at 9:00 AM CT, and a message in the channel the moment he has signal if an outage happens again', es: 'Confirmación de hora de entrada publicada en Cliente · José cada mañana de esta semana a las 9:00 AM hora central, y un mensaje en el canal apenas tenga señal si vuelve a haber un corte' },
      { en: 'Outage hours show as unworked and come off the next block as a credit; review call on Friday, October 23 at 10:00 AM CT with Mike, Daniela and José; UPS quote to follow if outages continue', es: 'Las horas de los cortes quedan como no trabajadas y se descuentan del siguiente bloque como crédito; llamada de revisión el viernes 23 de octubre a las 10:00 AM hora central con Mike, Daniela y José; cotización de UPS si siguen los cortes' }
    ],
    timeline: [
      { at: '2026-10-19T09:40:00-05:00', by: 'u-mike',    text: { en: 'Escalation opened from the client channel: José offline on Thursday and Friday mornings, with the Mesa Dr repair deadline on Friday', es: 'Escalación abierta desde el canal del cliente: José sin conexión el jueves y el viernes por la mañana, con la fecha límite de reparaciones de Mesa Dr el viernes' } },
      { at: '2026-10-19T10:15:00-05:00', by: 'u-daniela', text: { en: 'Acknowledged in Client · José; fix window ends October 26', es: 'Acuse de recibo en Cliente · José; la ventana de solución termina el 26 de octubre' } },
      { at: '2026-10-19T10:40:00-05:00', by: 'u-jose',    text: { en: 'José posted the explanation and the fix in the client channel: two power outages, hotspot tomorrow, 9:00 AM CT check-in every day this week', es: 'José publicó la explicación y la solución en el canal del cliente: dos cortes de luz, hotspot mañana, confirmación a las 9:00 AM hora central todos los días de esta semana' } },
      { at: '2026-10-19T14:30:00-05:00', by: 'u-daniela', text: { en: 'Outage log reviewed with José: both outages logged with reasons; root cause is no backup internet and no UPS', es: 'Registro de cortes revisado con José: ambos cortes registrados con motivo; la causa es no tener internet de respaldo ni UPS' } },
      { at: '2026-10-20T09:00:00-05:00', by: 'u-jose',    text: { en: 'Day 1 check-in posted at 9:00 AM CT in Client · José', es: 'Confirmación del día 1 publicada a las 9:00 AM hora central en Cliente · José' } },
      { at: '2026-10-20T13:40:00-05:00', by: 'u-jose',    text: { en: 'Prepaid mobile hotspot bought and tested at 25 Mbps down', es: 'Hotspot móvil prepago comprado y probado a 25 Mbps de bajada' } },
      { at: '2026-10-20T14:30:00-05:00', by: 'u-daniela', text: { en: 'Plan posted on the ticket and shared with Mike: hotspot in place, daily check-in, outage hours credited on the next block, review call on Friday', es: 'Plan publicado en el ticket y compartido con Mike: hotspot listo, confirmación diaria, horas de los cortes acreditadas en el siguiente bloque, llamada de revisión el viernes' } },
      { at: '2026-10-20T16:00:00-05:00', by: 'u-daniela', text: { en: 'Hotspot reimbursement ($38) noted for the November 5 payout', es: 'Reembolso del hotspot ($38) anotado para el pago del 5 de noviembre' } },
      { at: '2026-10-21T08:57:00-05:00', by: 'u-jose',    text: { en: 'Day 2 check-in posted at 8:57 AM CT in Client · José', es: 'Confirmación del día 2 publicada a las 8:57 AM hora central en Cliente · José' } }
    ]
  },
  {
    id: 'tk-0003', kind: 'replacement', clientId: 'c-rodriguez', placementId: 'p-rod-1', vaId: 'u-fernanda', openedBy: 'u-ana',
    openedAt: '2026-08-28T08:30:00-07:00', ackDueAt: '2026-08-31T08:30:00-07:00', ackAt: '2026-08-28T09:05:00-07:00', fixDueAt: '2026-09-04T08:30:00-07:00',
    status: 'closed', closedAt: '2026-09-08T10:30:00-07:00',
    title: { en: 'Replacement request: appointments below target', es: 'Solicitud de reemplazo: citas por debajo de la meta' },
    summary: { en: 'After the day-14 checkpoint Fernanda was setting 2 appointments a week against a target of 6, and the coaching plan from that checkpoint did not close the gap. Ana asked for a replacement under the 90-day fit guarantee; candidates were shown in 3 business days and Mariela started on September 8.', es: 'Tras el punto de control del día 14, Fernanda agendaba 2 citas por semana frente a una meta de 6, y el plan de acompañamiento de ese punto de control no cerró la brecha. Ana pidió un reemplazo bajo la garantía de ajuste de 90 días; se presentaron candidatas en 3 días hábiles y Mariela empezó el 8 de septiembre.' },
    plan: [
      { en: 'Candidates with video, English score and availability shown within 10 business days (done in 3)', es: 'Candidatas con video, puntaje de inglés y disponibilidad presentadas en un plazo de 10 días hábiles (listo en 3)' },
      { en: 'Fernanda works through September 4; offboarding checklist completed', es: 'Fernanda trabaja hasta el 4 de septiembre; lista de salida completada' },
      { en: 'Mariela starts September 8 on the chained placement p-rod-2; fit and replacement windows keep counting from August 10', es: 'Mariela empieza el 8 de septiembre en la colocación encadenada p-rod-2; las ventanas de ajuste y reemplazo siguen contando desde el 10 de agosto' }
    ],
    timeline: [
      { at: '2026-08-28T08:30:00-07:00', by: 'u-ana',     text: { en: 'Replacement requested from the Escalate button: 2 appointments a week against a target of 6', es: 'Reemplazo solicitado desde el botón Escalar: 2 citas por semana frente a una meta de 6' } },
      { at: '2026-08-28T09:05:00-07:00', by: 'u-daniela', text: { en: 'Acknowledged; replacement workflow started, candidates due within 10 business days', es: 'Acuse de recibo; flujo de reemplazo iniciado, candidatas en un plazo de 10 días hábiles' } },
      { at: '2026-08-31T10:00:00-07:00', by: 'u-daniela', text: { en: 'Shortlist: Mariela (ISA certified, on the bench) and one candidate from the talent pool', es: 'Lista corta: Mariela (ISA certificada, en banca) y una candidata del talent pool' } },
      { at: '2026-09-02T11:00:00-07:00', by: 'u-daniela', text: { en: 'Candidates shown to Ana with video links, English scores and availability (3 business days)', es: 'Candidatas presentadas a Ana con enlaces de video, puntajes de inglés y disponibilidad (3 días hábiles)' } },
      { at: '2026-09-03T09:15:00-07:00', by: 'u-ana',     text: { en: 'Ana chose Mariela; start set for Tuesday, September 8, after Labor Day', es: 'Ana eligió a Mariela; inicio fijado para el martes 8 de septiembre, después del Labor Day' } },
      { at: '2026-09-04T17:00:00-07:00', by: 'u-daniela', text: { en: "Fernanda's last day; offboarding checklist started", es: 'Último día de Fernanda; lista de salida iniciada' } },
      { at: '2026-09-08T10:30:00-07:00', by: 'u-daniela', text: { en: 'Mariela started on p-rod-2; seat windows continue from August 10. Ticket closed.', es: 'Mariela empezó en p-rod-2; las ventanas del puesto siguen desde el 10 de agosto. Ticket cerrado.' } }
    ]
  },
  {
    id: 'tk-0009', kind: 'tech', clientId: null, placementId: null, vaId: 'u-carlos', openedBy: 'u-carlos',
    openedAt: '2026-10-14T16:00:00-06:00', ackDueAt: '2026-10-15T16:00:00-06:00', ackAt: '2026-10-14T16:30:00-06:00', fixDueAt: '2026-10-27T16:00:00-06:00',
    status: 'open', closedAt: null,
    title: { en: 'Headset needed before the buddy check', es: 'Diadema necesaria antes de la prueba con el buddy' },
    summary: { en: 'Carlos has no headset yet (laptop microphone only) and his home internet is 35 Mbps down, 8 up, with no backup. The headset and camera check with his buddy (task ob8) cannot be signed off until he has one, and without it he cannot finish the academy. He buys the headset next week, after payday at his current job; a phone data plan is active as backup since October 15.', es: 'Carlos aún no tiene diadema (solo el micrófono de la laptop) y su internet de casa da 35 Mbps de bajada y 8 de subida, sin respaldo. La prueba de diadema y cámara con su buddy (tarea ob8) no se puede firmar hasta que tenga una, y sin ella no termina la academia. Compra la diadema la próxima semana, cuando le paguen en su trabajo actual; el plan de datos del celular está activo como respaldo desde el 15 de octubre.' },
    plan: [
      { en: 'Daniela sent the two approved models (Logitech H390 or Jabra Evolve 20); Carlos buys one next week after payday at his current job', es: 'Daniela envió los dos modelos aprobados (Logitech H390 o Jabra Evolve 20); Carlos compra uno la próxima semana, cuando le paguen en su trabajo actual' },
      { en: 'Phone data plan activated on October 15 as backup internet; 35/8 Mbps is enough for an admin role', es: 'Plan de datos del celular activado el 15 de octubre como internet de respaldo; 35/8 Mbps alcanza para un rol admin' },
      { en: 'Workspace and equipment photo (task ob7) uploaded once the headset arrives', es: 'Foto del espacio de trabajo y equipo (tarea ob7) una vez que llegue la diadema' },
      { en: 'Headset and camera check with buddy José (task ob8) set for Tuesday, October 27 at 4:00 PM Honduras time; task due October 28', es: 'Prueba de diadema y cámara con su buddy José (tarea ob8) fijada para el martes 27 de octubre a las 4:00 PM hora de Honduras; la tarea vence el 28 de octubre' }
    ],
    timeline: [
      { at: '2026-10-14T16:00:00-06:00', by: 'u-carlos',  text: { en: 'Ticket opened from the tech support thread: no headset yet, internet 35/8 Mbps with no backup', es: 'Ticket abierto desde el hilo de soporte técnico: aún sin diadema, internet de 35/8 Mbps sin respaldo' } },
      { at: '2026-10-14T16:30:00-06:00', by: 'u-daniela', text: { en: 'Acknowledged; approved headset models sent and a phone data plan requested as backup', es: 'Acuse de recibo; modelos de diadema aprobados enviados y plan de datos del celular solicitado como respaldo' } },
      { at: '2026-10-15T09:10:00-06:00', by: 'u-carlos',  text: { en: 'Headset purchase moved to next week, after payday at his current job; data plan activated', es: 'Compra de la diadema movida a la próxima semana, cuando le paguen en su trabajo actual; plan de datos activado' } },
      { at: '2026-10-15T09:20:00-06:00', by: 'u-daniela', text: { en: 'Agreed; task ob8 waits for the headset and the academy cannot be completed without it', es: 'De acuerdo; la tarea ob8 espera la diadema y sin ella no se completa la academia' } },
      { at: '2026-10-20T15:25:00-06:00', by: 'u-daniela', text: { en: 'Buddy check with José scheduled for Tuesday, October 27 at 4:00 PM (task ob8 due October 28); fix date set to match. Academy otherwise on track', es: 'Prueba con el buddy José programada para el martes 27 de octubre a las 4:00 PM (la tarea ob8 vence el 28 de octubre); fecha de solución ajustada. La academia va bien por lo demás' } }
    ]
  }
];

/* ---------- Replacements (chained placements) ---------- */
HQD.replacements = [
  {
    id: 'rp-0001', clientId: 'c-rodriguez',
    seat: { en: 'ISA seat, Rodriguez Home Team', es: 'Puesto ISA, Rodriguez Home Team' },
    fromPlacementId: 'p-rod-1', toPlacementId: 'p-rod-2',
    requestedOn: '2026-08-28', candidatesShownOn: '2026-09-02', newStart: '2026-09-08', businessDaysToCandidates: 3,
    reason: { en: 'Appointments set stayed at 2 a week against a target of 6 after the day-14 coaching plan; the client requested a replacement under the 90-day fit guarantee (ticket tk-0003)', es: 'Las citas agendadas se quedaron en 2 por semana frente a una meta de 6 después del plan de acompañamiento del día 14; el cliente pidió un reemplazo bajo la garantía de ajuste de 90 días (ticket tk-0003)' }
  }
];

/* ---------- Offboarding checklists ---------- */
HQD.offboarding = [
  {
    placementId: 'p-rod-1', vaId: 'u-fernanda',
    items: [
      { key: 'vault',       title: { en: 'Vault user removed (1Password)', es: 'Usuario de la bóveda eliminado (1Password)' }, done: true, at: '2026-09-04T17:10:00-07:00', by: 'u-daniela' },
      { key: 'tracker',     title: { en: 'Tracker deactivated (Hubstaff)', es: 'Rastreador desactivado (Hubstaff)' }, done: true, at: '2026-09-04T17:15:00-07:00', by: 'u-daniela' },
      { key: 'seats',       title: { en: 'Client confirms seats disabled (Follow Up Boss, Google Workspace)', es: 'El cliente confirma que los accesos quedaron deshabilitados (Follow Up Boss, Google Workspace)' }, done: true, at: '2026-09-08T09:20:00-07:00', by: 'u-ana' },
      { key: 'attestation', title: { en: 'Data-return attestation signed', es: 'Declaración de devolución de datos firmada' }, done: true, at: '2026-09-07T11:45:00-07:00', by: 'u-fernanda' },
      { key: 'payout',      title: { en: 'Final payout date set (September 20)', es: 'Fecha del pago final fijada (20 de septiembre)' }, done: true, at: '2026-09-04T17:30:00-07:00', by: 'u-daniela' },
      { key: 'channel',     title: { en: 'Channel archived', es: 'Canal archivado' }, done: true, at: '2026-09-08T10:35:00-07:00', by: 'u-daniela',
        note: { en: 'The seat continued with Mariela, so Client · Mariela stays open; Fernanda was removed from it and her messages were kept.', es: 'El puesto siguió con Mariela, así que Cliente · Mariela sigue abierto; Fernanda fue retirada del canal y sus mensajes se conservaron.' } }
    ]
  }
];

/* ---------- Client pulse: one 1-to-5 question in each client channel on the 1st ---------- */
HQD.pulse = [
  { clientId: 'c-rodriguez', month: '2026-09', score: 5, comment: 'Daniela handled the switch fast. Candidates in three days, and Mariela starts next week. That is what I pay for.', askedOn: '2026-09-01', answeredOn: '2026-09-03' },
  { clientId: 'c-rodriguez', month: '2026-10', score: 5, comment: null, askedOn: '2026-10-01', answeredOn: '2026-10-01' },
  { clientId: 'c-lonestar',  month: '2026-09', score: 4, comment: 'Jose is careful with the paperwork and the agents like him. Two late mornings, otherwise great.', askedOn: '2026-09-01', answeredOn: '2026-09-04' },
  { clientId: 'c-lonestar',  month: '2026-10', score: 3, comment: 'Quality is fine and the agents like him. Two more late mornings in September; we need the 9 AM start to be reliable.', askedOn: '2026-10-01', answeredOn: '2026-10-03' },
  { clientId: 'c-sunshine',  month: '2026-10', score: 5, comment: "Only two days in, but Andrea's first listing posts look sharp and she is already fast on the CRM cleanup.", askedOn: '2026-10-01', answeredOn: '2026-10-05' }
];

/* ---------- Audit log: rates, placements, payouts, hours edits, documents, certifications ---------- */
HQD.auditLog = [
  { id: 'al-0001', at: '2026-09-03T10:20:00-06:00', by: 'u-daniela', action: 'placement.created', target: 'p-rod-2',
    detail: { en: 'Placement p-rod-2 created for Mariela at Rodriguez Home Team as the chained replacement for p-rod-1; seat start stays August 10.', es: 'Colocación p-rod-2 creada para Mariela en Rodriguez Home Team como reemplazo encadenado de p-rod-1; el inicio del puesto sigue siendo el 10 de agosto.' } },
  { id: 'al-0002', at: '2026-09-14T09:05:00-06:00', by: 'u-daniela', action: 'hours.approved', target: 'p-rod-2',
    detail: { en: 'Week of September 7 to 13 approved for p-rod-2: 32.0 hours (4-day week after Labor Day). Week locked.', es: 'Semana del 7 al 13 de septiembre aprobada para p-rod-2: 32.0 horas (semana de 4 días después del Labor Day). Semana bloqueada.' } },
  { id: 'al-0003', at: '2026-09-26T11:30:00-07:00', by: 'u-charly', action: 'document.uploaded', target: 'c-sunshine',
    detail: { en: 'Client agreement and Florida telemarketing addendum uploaded for Sunshine Coast Partners, signed September 26.', es: 'Contrato de cliente y adenda de telemarketing de Florida subidos para Sunshine Coast Partners, firmados el 26 de septiembre.' } },
  { id: 'al-0004', at: '2026-09-26T14:05:00-06:00', by: 'u-daniela', action: 'placement.created', target: 'p-sun-1',
    detail: { en: 'Placement p-sun-1 created for Andrea at Sunshine Coast Partners: operations tier, 40 hours a week, start October 1.', es: 'Colocación p-sun-1 creada para Andrea en Sunshine Coast Partners: nivel operaciones, 40 horas por semana, inicio el 1 de octubre.' } },
  { id: 'al-0005', at: '2026-10-01T09:32:00-04:00', by: 'u-andrea', action: 'scope.acknowledged', target: 'p-sun-1',
    detail: { en: 'Andrea acknowledged the Florida scope card, version 2026-10, for p-sun-1.', es: 'Andrea aceptó la tarjeta de alcance de Florida, versión 2026-10, para p-sun-1.' } },
  { id: 'al-0006', at: '2026-10-01T08:45:00-07:00', by: 'u-charly', action: 'rate.pay_changed', target: 'u-mariela',
    detail: { en: 'Pay rate for Mariela changed from $6.00 to $6.50 per hour from October 1. Reason: day-30 review at Rodriguez Home Team.', es: 'Tarifa de pago de Mariela cambiada de $6.00 a $6.50 por hora desde el 1 de octubre. Motivo: revisión del día 30 en Rodriguez Home Team.' } },
  { id: 'al-0007', at: '2026-10-02T09:03:00-05:00', by: 'u-jose', action: 'scope.acknowledged', target: 'p-lone-1',
    detail: { en: 'José acknowledged the Texas scope card, version 2026-10, for p-lone-1.', es: 'José aceptó la tarjeta de alcance de Texas, versión 2026-10, para p-lone-1.' } },
  { id: 'al-0008', at: '2026-10-02T08:14:00-07:00', by: 'u-mariela', action: 'scope.acknowledged', target: 'p-rod-2',
    detail: { en: 'Mariela acknowledged the California scope card, version 2026-10, for p-rod-2.', es: 'Mariela aceptó la tarjeta de alcance de California, versión 2026-10, para p-rod-2.' } },
  { id: 'al-0009', at: '2026-10-09T15:40:00-06:00', by: 'u-carlos', action: 'document.uploaded', target: 'u-carlos',
    detail: { en: 'Police record uploaded by Carlos (onboarding task ob2); the government ID was uploaded on October 7 (ob1). Both pending manager review.', es: 'Antecedentes penales subidos por Carlos (tarea de onboarding ob2); el documento de identidad se subió el 7 de octubre (ob1). Ambos pendientes de revisión de la gerente.' } },
  { id: 'al-0010', at: '2026-10-09T15:40:00-06:00', by: 'u-daniela', action: 'academy.certified', target: 'u-kevin',
    detail: { en: 'Kevin certified on the ISA track (module 5 sign-off and supervised-dialing log complete); status set to bench.', es: 'Kevin certificado en la ruta ISA (firma del módulo 5 y bitácora de marcación supervisada completas); estado cambiado a banca.' } },
  { id: 'al-0011', at: '2026-10-12T09:48:00-06:00', by: 'u-daniela', action: 'hours.edited', target: 'p-sun-1',
    detail: { en: "Andrea's October 9 afternoon entry shortened from 21:47 to 18:00 ET (3 h 47 min). Reason: VA forgot to clock out and confirmed she stopped at 18:00.", es: 'Registro de la tarde del 9 de octubre de Andrea acortado de 21:47 a 18:00 hora del Este (3 h 47 min). Motivo: la VA olvidó marcar la salida y confirmó que terminó a las 18:00.' } },
  { id: 'al-0012', at: '2026-10-12T09:35:00-06:00', by: 'u-daniela', action: 'hours.approved', target: 'p-lone-1',
    detail: { en: 'Week of October 5 to 11 approved for p-lone-1: 29.5 hours. Week locked.', es: 'Semana del 5 al 11 de octubre aprobada para p-lone-1: 29.5 horas. Semana bloqueada.' } },
  { id: 'al-0013', at: '2026-10-16T15:00:00-06:00', by: 'u-daniela', action: 'academy.certified', target: 'u-lucia',
    detail: { en: 'Lucía certified (admin track, 12 of 12 lessons); status set to bench. Signed W-8BEN (task ob3) still pending, due October 28.', es: 'Lucía certificada (ruta administrativa, 12 de 12 lecciones); estado cambiado a banca. El W-8BEN firmado (tarea ob3) sigue pendiente, vence el 28 de octubre.' } },
  { id: 'al-0014', at: '2026-10-19T10:12:00-05:00', by: 'system', action: 'invoice.retry_scheduled', target: 'c-lonestar',
    detail: { en: 'Stripe reported the card declined on invoice BV-1015 ($474) for the Lone Star Realty Group block October 26 to November 8. Retry scheduled for October 22; Mike and Jenna notified in Client · José. The placement pauses if the block is unpaid on October 26.', es: 'Stripe reportó la tarjeta rechazada en la factura BV-1015 ($474) del bloque del 26 de octubre al 8 de noviembre de Lone Star Realty Group. Reintento programado para el 22 de octubre; Mike y Jenna notificados en Cliente · José. La colocación se pausa si el bloque sigue sin pagar el 26 de octubre.' } },
  { id: 'al-0015', at: '2026-10-19T09:40:00-05:00', by: 'u-mike', action: 'ticket.opened', target: 'tk-0007',
    detail: { en: 'Escalation tk-0007 opened by Mike Turner from Client · José: late starts and dropped connection after power outages.', es: 'Escalación tk-0007 abierta por Mike Turner desde Cliente · José: entradas tarde y conexión caída por cortes de luz.' } },
  { id: 'al-0016', at: '2026-10-20T15:00:00-06:00', by: 'u-daniela', action: 'payout.adjustment_noted', target: 'u-jose',
    detail: { en: "One-time reimbursement of $38 for a prepaid mobile hotspot added to José's November 5 payout (ticket tk-0007).", es: 'Reembolso único de $38 por un hotspot móvil prepago agregado al pago de José del 5 de noviembre (ticket tk-0007).' } }
];

/* ---------- Referrals ---------- */
HQD.referrals = [
  { id: 'rf-0001', kind: 'client', referrerId: 'c-rodriguez', referredId: 'c-lonestar', status: 'credited', credit: 500,
    bonusNote: { en: '$500 referral credit applied as a line on invoice BV-1006 (Rodriguez Home Team, September 14 to 27 block), issued September 4.', es: 'Crédito de referido de $500 aplicado como línea en la factura BV-1006 (Rodriguez Home Team, bloque del 14 al 27 de septiembre), emitida el 4 de septiembre.' },
    appliedOn: '2026-09-04' },
  { id: 'rf-0002', kind: 'va', referrerId: 'u-mariela', referredId: 'a-sofia', status: 'pending', credit: null,
    bonusNote: { en: 'Referral bonus for Mariela is set once Sofía is certified and placed; Sofía is at the interview stage (interview with Daniela on October 22).', es: 'El bono de referido para Mariela se fija cuando Sofía esté certificada y colocada; Sofía está en la etapa de entrevista (entrevista con Daniela el 22 de octubre).' },
    appliedOn: null }
];
