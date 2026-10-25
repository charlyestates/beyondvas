window.HQD = window.HQD || {};
/* BeyondVAs HQ prototype: recruiting pipeline, academy, onboarding, documents, cohorts and supervised dialing.
   Ids for people, clients and modules come from core.js. Today is 2026-10-21. */

/* ---------- Applications (one per applicant in core.js) ---------- */
HQD.applications = [
  { id: 'app-sofia', personId: 'a-sofia', stage: 'interview', submittedOn: '2026-10-09', source: 'referral', referredBy: 'u-mariela', cohort: null, expectedReplyBy: '2026-10-23', interviewAt: '2026-10-22T10:00:00-06:00',
    answers: { country: 'HN', city: 'San Pedro Sula', tz: 'America/Tegucigalpa',
      englishLevel: 'I can hold a phone conversation with a native speaker about anything',
      experience: 'Two years as a retention agent on a US cable account (call center in San Pedro Sula), then eight months as a remote appointment setter for a solar company in Arizona. I used Five9 and HubSpot and averaged 18 set appointments a month.',
      availability: 'Pacific', internet: { down: 95, up: 20, backup: 'mobile hotspot (Tigo)' }, power: 'UPS, about 30 minutes', computer: 'Dell Latitude laptop, 16 GB, Windows 11', headset: 'Logitech H390 (USB)',
      otherCommitments: 'None. The solar campaign closed in September.', videoUrl: '(video link placeholder)',
      whyRealEstate: 'Mariela told me how the Rodriguez team works and I liked that you build a relationship with one team instead of working a queue. I am good on the phone and I want a role where setting an appointment matters to someone.',
      whatsapp: '+504 9xxx-xxxx' },
    scores: { spokenEnglish: 4, spanish: 5, presence: 4, followedBrief: 5, accomplishment: 4, setup: 4, typingWpm: 52, writtenEnglish: 4, mockCall: null }, total: 26,
    notes: [
      { by: 'u-daniela', at: '2026-10-13T15:40:00-06:00', text: 'Video muy natural, buen ritmo y sin leer. Mencionó resultados concretos (18 citas al mes en la campaña solar). Vale la pena la entrevista.' },
      { by: 'u-charly', at: '2026-10-16T09:12:00-07:00', text: 'Referral from Mariela. If the mock call goes well, she is our next ISA for the Sunshine seat when Priya adds calling.' }
    ],
    stageHistory: [ { stage: 'draft', at: '2026-10-08', by: 'a-sofia' }, { stage: 'submitted', at: '2026-10-09', by: 'a-sofia' }, { stage: 'scored', at: '2026-10-13', by: 'u-daniela' }, { stage: 'interview', at: '2026-10-16', by: 'u-daniela' } ],
    nextStep: { en: 'Interview with Daniela on Thu Oct 22, 10:00 AM Honduras time (mock call included)', es: 'Entrevista con Daniela el jueves 22 de octubre, 10:00 a. m. hora de Honduras (incluye llamada simulada)' } },

  { id: 'app-diego', personId: 'a-diego', stage: 'scored', submittedOn: '2026-10-14', source: 'job-board', referredBy: null, cohort: null, expectedReplyBy: '2026-10-23',
    answers: { country: 'GT', city: 'Guatemala City', tz: 'America/Guatemala',
      englishLevel: 'I can handle calls with a script and answer common questions',
      experience: 'Three years in back-office support for a US insurance account: claims data entry, email follow-up with policyholders, some chat support in English, few phone calls. Fast and accurate with spreadsheets.',
      availability: 'Mountain or Central', internet: { down: 150, up: 30, backup: 'second provider (fiber + cable)' }, power: 'No UPS; outages are rare in my zone', computer: 'HP ProBook, 16 GB, Windows 11', headset: 'Plantronics Blackwire 3220',
      otherCommitments: 'Saturday morning English classes, 8 to 11 AM.', videoUrl: '(video link placeholder)',
      whyRealEstate: 'I want to move from a queue of tickets to a team where I own a process end to end. Transaction coordination looks like the detail work I am good at.',
      whatsapp: '+502 5xxx-xxxx' },
    scores: { spokenEnglish: 3, spanish: 5, presence: 4, followedBrief: 4, accomplishment: 3, setup: 5, typingWpm: 61, writtenEnglish: 4, mockCall: null }, total: 24,
    notes: [
      { by: 'u-daniela', at: '2026-10-19T11:05:00-06:00', text: 'Perfil claro de admin/coordinación. El inglés hablado es correcto pero pausado; para un puesto de TC sin llamadas salientes funciona. Setup impecable.' }
    ],
    stageHistory: [ { stage: 'draft', at: '2026-10-13', by: 'a-diego' }, { stage: 'submitted', at: '2026-10-14', by: 'a-diego' }, { stage: 'scored', at: '2026-10-19', by: 'u-daniela' } ],
    nextStep: { en: 'Decide on an interview by Oct 23; candidate for an admin/TC seat', es: 'Decidir la entrevista antes del 23 de octubre; candidato para un puesto admin/TC' } },

  { id: 'app-valeria', personId: 'a-valeria', stage: 'submitted', submittedOn: '2026-10-20', source: 'website', referredBy: null, cohort: null, expectedReplyBy: '2026-10-27',
    answers: { country: 'HN', city: 'Tegucigalpa', tz: 'America/Tegucigalpa',
      englishLevel: 'I can hold a phone conversation with a native speaker about anything',
      experience: 'Four years as a bilingual executive assistant to the country manager of a logistics company: calendar, travel, vendor follow-up, Excel reports. Before that, one year at a hotel front desk.',
      availability: 'Eastern', internet: { down: 60, up: 12, backup: 'mobile hotspot' }, power: 'No UPS yet; I can buy one if selected', computer: 'Lenovo IdeaPad, 8 GB, Windows 10', headset: 'Earbuds with microphone (will upgrade)',
      otherCommitments: 'None.', videoUrl: '(video link placeholder)',
      whyRealEstate: 'I like keeping a busy person organized, and I have friends who work with US agents and love the pace. I would like an operations role where I can grow into marketing.',
      whatsapp: '+504 9xxx-xxxx' },
    scores: { spokenEnglish: null, spanish: null, presence: null, followedBrief: null, accomplishment: null, setup: null, typingWpm: null, writtenEnglish: null, mockCall: null }, total: null,
    notes: [],
    stageHistory: [ { stage: 'draft', at: '2026-10-19', by: 'a-valeria' }, { stage: 'submitted', at: '2026-10-20', by: 'a-valeria' } ],
    nextStep: { en: 'Score the video and written answers (due Oct 27)', es: 'Calificar el video y las respuestas escritas (vence el 27 de octubre)' } },

  { id: 'app-marco', personId: 'a-marco', stage: 'trial', submittedOn: '2026-09-22', source: 'website', referredBy: null, cohort: 'Nov-2026', expectedReplyBy: '2026-10-23',
    answers: { country: 'NI', city: 'Managua', tz: 'America/Managua',
      englishLevel: 'I can hold a phone conversation with a native speaker about anything',
      experience: 'Five years in outbound sales: two at a telecom call center selling upgrades, three as a remote SDR for a US software reseller (cold calls, 120+ dials a day, HubSpot sequences).',
      availability: 'Pacific', internet: { down: 40, up: 10, backup: 'mobile hotspot (Claro)' }, power: 'Frequent short outages; small inverter, about 20 minutes', computer: 'Asus laptop, 8 GB, Windows 11', headset: 'Jabra Evolve 20',
      otherCommitments: 'None.', videoUrl: '(video link placeholder)',
      whyRealEstate: "Real estate is where good outbound work pays off for the person on the other side too. I want to be the ISA who fills a team's calendar, not another quota rep.",
      whatsapp: '+505 8xxx-xxxx' },
    scores: { spokenEnglish: 4, spanish: 5, presence: 4, followedBrief: 4, accomplishment: 4, setup: 3, typingWpm: 45, writtenEnglish: 3, mockCall: 4 }, total: 24,
    notes: [
      { by: 'u-daniela', at: '2026-09-25T10:20:00-06:00', text: 'Mucha calle en ventas salientes. El inglés fluye bien aunque con acento marcado; no afecta la comprensión. Internet justo: pedirle un plan de respaldo real antes de colocarlo.' },
      { by: 'u-daniela', at: '2026-10-01T16:00:00-06:00', text: 'Entrevista y llamada simulada: manejó la objeción de "ya tengo agente" sin trabarse. Pasa a prueba a partir del lunes 12 de octubre: módulo 1 de la academia, tarea en FUB y guion de prospección grabado.' },
      { by: 'u-charly', at: '2026-10-14T08:45:00-07:00', text: 'Trial week 1 looks good. Hold him for the Nov cohort on the ISA track; make sure the internet backup is real before any placement.' }
    ],
    stageHistory: [ { stage: 'draft', at: '2026-09-21', by: 'a-marco' }, { stage: 'submitted', at: '2026-09-22', by: 'a-marco' }, { stage: 'scored', at: '2026-09-25', by: 'u-daniela' }, { stage: 'interview', at: '2026-09-30', by: 'u-daniela' }, { stage: 'trial', at: '2026-10-12', by: 'u-daniela' } ],
    nextStep: { en: 'Trial review on Fri Oct 23; offer if the FUB task and the recorded script pass', es: 'Revisión de la prueba el viernes 23 de octubre; oferta si pasa la tarea de FUB y el guion grabado' } },

  { id: 'app-camila', personId: 'a-camila', stage: 'offer', submittedOn: '2026-09-18', source: 'referral', referredBy: 'u-andrea', cohort: 'Nov-2026', expectedReplyBy: '2026-10-24',
    answers: { country: 'SV', city: 'Santa Ana', tz: 'America/El_Salvador',
      englishLevel: 'I can hold a phone conversation with a native speaker about anything',
      experience: 'Three years as a marketing assistant for a regional furniture brand: Canva, Meta and Instagram scheduling, Mailchimp newsletters, basic reporting. One year before that as a bilingual receptionist.',
      availability: 'Eastern', internet: { down: 120, up: 25, backup: 'mobile hotspot' }, power: 'UPS, about 40 minutes', computer: 'MacBook Air M1, 8 GB', headset: 'Apple EarPods (USB-C); will buy a headset',
      otherCommitments: 'None.', videoUrl: '(video link placeholder)',
      whyRealEstate: 'Andrea showed me the listing content she makes for her team and it is exactly what I did for the furniture brand, but with a faster pace and a team that notices. I want to grow into a full marketing role.',
      whatsapp: '+503 7xxx-xxxx' },
    scores: { spokenEnglish: 4, spanish: 5, presence: 5, followedBrief: 5, accomplishment: 4, setup: 4, typingWpm: 58, writtenEnglish: 5, mockCall: 4 }, total: 27,
    notes: [
      { by: 'u-daniela', at: '2026-09-22T14:30:00-06:00', text: 'Portafolio de Canva muy bueno; escribe en inglés mejor que la mayoría de las solicitantes. Referida por Andrea.' },
      { by: 'u-daniela', at: '2026-10-05T17:10:00-06:00', text: 'Prueba: calendario de contenido de una semana para un listado ficticio, entregado antes de tiempo y con copy limpio. Lista para oferta.' },
      { by: 'u-charly', at: '2026-10-16T13:20:00-07:00', text: 'Offer sent at $5.50/hr, ops tier, Nov cohort. Reply due Oct 24.' }
    ],
    stageHistory: [ { stage: 'draft', at: '2026-09-17', by: 'a-camila' }, { stage: 'submitted', at: '2026-09-18', by: 'a-camila' }, { stage: 'scored', at: '2026-09-22', by: 'u-daniela' }, { stage: 'interview', at: '2026-09-28', by: 'u-daniela' }, { stage: 'trial', at: '2026-09-29', by: 'u-daniela' }, { stage: 'offer', at: '2026-10-16', by: 'u-charly' } ],
    nextStep: { en: 'Waiting for the signed offer (due Oct 24); then onboarding tasks and the Nov 3 cohort', es: 'Esperando la oferta firmada (vence el 24 de octubre); luego las tareas de onboarding y la cohorte del 3 de noviembre' } },

  { id: 'app-jorge', personId: 'a-jorge', stage: 'talent_pool', submittedOn: '2026-08-24', source: 'job-board', referredBy: null, cohort: null, expectedReplyBy: '2027-01-12',
    answers: { country: 'HN', city: 'Comayagua', tz: 'America/Tegucigalpa',
      englishLevel: 'I can handle calls with a script and answer common questions',
      experience: 'Two years as a social media coordinator for a university (posts, event graphics, basic video editing) and freelance Canva work for small businesses.',
      availability: 'Part-time', internet: { down: 30, up: 6, backup: 'none' }, power: 'No UPS; outages about once a week', computer: 'Acer Aspire, 8 GB, Windows 10', headset: 'HyperX gaming headset',
      otherCommitments: 'Finishing my degree; classes Monday to Thursday until 1 PM through December.', videoUrl: '(video link placeholder)',
      whyRealEstate: 'I want to use my design skills for a team where content brings in real clients, and real estate marketing moves fast.',
      whatsapp: '+504 3xxx-xxxx' },
    scores: { spokenEnglish: 3, spanish: 5, presence: 4, followedBrief: 3, accomplishment: 4, setup: 3, typingWpm: 40, writtenEnglish: 3, mockCall: 3 }, total: 22,
    notes: [
      { by: 'u-daniela', at: '2026-09-02T15:50:00-06:00', text: 'Buen ojo para el diseño, pero solo puede medio tiempo hasta diciembre y el internet no da para un puesto completo. Lo pasamos a la bolsa de talento; retomar en enero cuando termine la carrera.' }
    ],
    stageHistory: [ { stage: 'draft', at: '2026-08-23', by: 'a-jorge' }, { stage: 'submitted', at: '2026-08-24', by: 'a-jorge' }, { stage: 'scored', at: '2026-08-27', by: 'u-daniela' }, { stage: 'interview', at: '2026-09-02', by: 'u-daniela' }, { stage: 'talent_pool', at: '2026-09-04', by: 'u-daniela' } ],
    nextStep: { en: 'Re-contact in January 2027 for a full-time ops seat once classes end; ask for a new speed test', es: 'Recontactar en enero de 2027 para un puesto de operaciones a tiempo completo cuando terminen las clases; pedir una nueva prueba de velocidad' } },

  { id: 'app-paola', personId: 'a-paola', stage: 'draft', submittedOn: null, source: 'website', referredBy: null, cohort: null, expectedReplyBy: null,
    answers: { country: 'HN', city: 'Tegucigalpa', tz: 'America/Tegucigalpa',
      englishLevel: 'I write well but speaking is harder',
      experience: 'Administrative assistant at an accounting firm for three years (invoices, client follow-up by email, filing).',
      availability: 'Mountain or Central', internet: { down: 50, up: 10, backup: null }, power: null, computer: 'Laptop', headset: null,
      otherCommitments: null, videoUrl: null, whyRealEstate: null,
      whatsapp: '+504 9xxx-xxxx' },
    scores: { spokenEnglish: null, spanish: null, presence: null, followedBrief: null, accomplishment: null, setup: null, typingWpm: null, writtenEnglish: null, mockCall: null }, total: null,
    notes: [],
    stageHistory: [ { stage: 'draft', at: '2026-10-19', by: 'a-paola' } ],
    nextStep: { en: 'Waiting for the applicant to finish and submit (started Oct 19)', es: 'En espera de que la solicitante termine y envíe su solicitud (iniciada el 19 de octubre)' } },

  { id: 'app-ricardo', personId: 'a-ricardo', stage: 'scored', submittedOn: '2026-10-12', source: 'website', referredBy: null, cohort: null, expectedReplyBy: '2026-10-20',
    answers: { country: 'CO', city: 'Bogotá', tz: 'America/Bogota',
      englishLevel: 'I write well but speaking is harder',
      experience: 'Four years in accounts payable and bookkeeping (QuickBooks, Excel, bank reconciliations) for a Colombian import company; I wrote all supplier emails in English.',
      availability: 'Eastern', internet: { down: 300, up: 100, backup: 'second provider' }, power: 'UPS, about 60 minutes; outages are rare', computer: 'Custom desktop, 32 GB, two monitors', headset: 'Logitech H390',
      otherCommitments: 'None.', videoUrl: '(video link placeholder)',
      whyRealEstate: 'I am strong with numbers and process and I want a long-term remote role. A transaction coordination or back-office seat where I keep files clean and deadlines met fits me well.',
      whatsapp: '+57 3xx xxx xxxx' },
    scores: { spokenEnglish: 2, spanish: 5, presence: 3, followedBrief: 3, accomplishment: 4, setup: 5, typingWpm: 70, writtenEnglish: 4, mockCall: null }, total: 22,
    notes: [
      { by: 'u-daniela', at: '2026-10-15T12:30:00-06:00', text: 'Excelente perfil escrito y setup de primera, pero el inglés hablado está por debajo de lo que piden los clientes para llamadas. Opciones: puesto admin sin teléfono o bolsa de talento. Charly, ¿qué prefieres?' },
      { by: 'u-charly', at: '2026-10-20T18:05:00-07:00', text: "Let's not pass yet. Lone Star has asked about a second TC after the new year and a strong written-only profile could fit. Keep him scored and revisit the first week of November." }
    ],
    stageHistory: [ { stage: 'draft', at: '2026-10-11', by: 'a-ricardo' }, { stage: 'submitted', at: '2026-10-12', by: 'a-ricardo' }, { stage: 'scored', at: '2026-10-15', by: 'u-daniela' } ],
    nextStep: { en: 'Send Ricardo a holding reply (overdue since Oct 20); revisit for a written-only admin seat in early November', es: 'Enviar a Ricardo una respuesta de espera (vencida desde el 20 de octubre); retomar para un puesto admin sin llamadas a inicios de noviembre' } }
];

/* ---------- Academy lessons (3 per module; m5 is the ISA track) ---------- */
HQD.academyLessons = [
  { id: 'm1-l1', moduleId: 'm1', order: 1, kind: 'video',   minutes: 12, title: { en: 'Who we are and who our clients are', es: 'Quiénes somos y quiénes son nuestros clientes' } },
  { id: 'm1-l2', moduleId: 'm1', order: 2, kind: 'text',    minutes: 10, title: { en: 'Hours, blocks, paydays and the time tracker', es: 'Horas, bloques, días de pago y el rastreador de tiempo' } },
  { id: 'm1-l3', moduleId: 'm1', order: 3, kind: 'quiz',    minutes: 8,  title: { en: 'Module 1 check', es: 'Evaluación del módulo 1' } },
  { id: 'm2-l1', moduleId: 'm2', order: 1, kind: 'video',   minutes: 18, title: { en: 'Google Workspace and 1Password setup', es: 'Configuración de Google Workspace y 1Password' } },
  { id: 'm2-l2', moduleId: 'm2', order: 2, kind: 'video',   minutes: 20, title: { en: 'Follow Up Boss basics', es: 'Fundamentos de Follow Up Boss' } },
  { id: 'm2-l3', moduleId: 'm2', order: 3, kind: 'task',    minutes: 25, title: { en: 'Install Hubstaff and track a 15-minute test session', es: 'Instala Hubstaff y registra una sesión de prueba de 15 minutos' } },
  { id: 'm3-l1', moduleId: 'm3', order: 1, kind: 'video',   minutes: 22, title: { en: 'The transaction from listing to closing', es: 'La transacción desde el listado hasta el cierre' } },
  { id: 'm3-l2', moduleId: 'm3', order: 2, kind: 'text',    minutes: 15, title: { en: 'Vocabulary: 60 terms you will hear every day', es: 'Vocabulario: 60 términos que escucharás todos los días' } },
  { id: 'm3-l3', moduleId: 'm3', order: 3, kind: 'quiz',    minutes: 10, title: { en: 'Module 3 check', es: 'Evaluación del módulo 3' } },
  { id: 'm4-l1', moduleId: 'm4', order: 1, kind: 'video',   minutes: 15, title: { en: 'Writing to your client: tone, brevity, follow-through', es: 'Cómo escribirle a tu cliente: tono, brevedad y seguimiento' } },
  { id: 'm4-l2', moduleId: 'm4', order: 2, kind: 'task',    minutes: 30, title: { en: 'Write three sample daily reports', es: 'Escribe tres reportes diarios de ejemplo' } },
  { id: 'm4-l3', moduleId: 'm4', order: 3, kind: 'signoff', minutes: 15, title: { en: 'Channel etiquette sign-off with your manager', es: 'Visto bueno de etiqueta en canales con tu gerente' } },
  { id: 'm5-l1', moduleId: 'm5', order: 1, kind: 'video',   minutes: 25, title: { en: 'Scripts: circle prospecting, expireds and FSBOs', es: 'Guiones: prospección de círculo, expirados y FSBO' } },
  { id: 'm5-l2', moduleId: 'm5', order: 2, kind: 'text',    minutes: 15, title: { en: 'Calling rules: Do-Not-Call, consent, recording disclosure and state limits', es: 'Reglas de llamadas: Do-Not-Call, consentimiento, aviso de grabación y límites por estado' } },
  { id: 'm5-l3', moduleId: 'm5', order: 3, kind: 'signoff', minutes: 20, title: { en: 'Supervised dialing sign-off', es: 'Visto bueno de marcación supervisada' } }
];

/* ---------- Academy progress: personId -> lessonId -> { done, at, score (quizzes) } ---------- */
HQD.academyProgress = {
  'u-carlos': {
    'm1-l1': { done: true, at: '2026-10-06' }, 'm1-l2': { done: true, at: '2026-10-07' }, 'm1-l3': { done: true, at: '2026-10-08', score: 80 },
    'm2-l1': { done: true, at: '2026-10-08' }, 'm2-l2': { done: true, at: '2026-10-09' }, 'm2-l3': { done: true, at: '2026-10-09' },
    'm3-l1': { done: true, at: '2026-10-12' }, 'm3-l2': { done: true, at: '2026-10-13' }, 'm3-l3': { done: true, at: '2026-10-13', score: 75 },
    'm4-l1': { done: true, at: '2026-10-19' }, 'm4-l2': { done: true, at: '2026-10-20' }, 'm4-l3': { done: false, at: null }
  },
  'u-kevin': {
    'm1-l1': { done: true, at: '2026-09-21' }, 'm1-l2': { done: true, at: '2026-09-21' }, 'm1-l3': { done: true, at: '2026-09-22', score: 90 },
    'm2-l1': { done: true, at: '2026-09-22' }, 'm2-l2': { done: true, at: '2026-09-23' }, 'm2-l3': { done: true, at: '2026-09-23' },
    'm3-l1': { done: true, at: '2026-09-24' }, 'm3-l2': { done: true, at: '2026-09-24' }, 'm3-l3': { done: true, at: '2026-09-25', score: 85 },
    'm4-l1': { done: true, at: '2026-09-25' }, 'm4-l2': { done: true, at: '2026-09-28' }, 'm4-l3': { done: true, at: '2026-09-28' },
    'm5-l1': { done: true, at: '2026-09-28' }, 'm5-l2': { done: true, at: '2026-09-29' }, 'm5-l3': { done: true, at: '2026-10-09' }
  },
  'u-lucia': {
    'm1-l1': { done: true, at: '2026-09-28' }, 'm1-l2': { done: true, at: '2026-09-28' }, 'm1-l3': { done: true, at: '2026-09-29', score: 100 },
    'm2-l1': { done: true, at: '2026-09-30' }, 'm2-l2': { done: true, at: '2026-10-01' }, 'm2-l3': { done: true, at: '2026-10-02' },
    'm3-l1': { done: true, at: '2026-10-05' }, 'm3-l2': { done: true, at: '2026-10-06' }, 'm3-l3': { done: true, at: '2026-10-08', score: 95 },
    'm4-l1': { done: true, at: '2026-10-09' }, 'm4-l2': { done: true, at: '2026-10-13' }, 'm4-l3': { done: true, at: '2026-10-16' }
  },
  'u-mariela': {
    'm1-l1': { done: true, at: '2026-07-20' }, 'm1-l2': { done: true, at: '2026-07-20' }, 'm1-l3': { done: true, at: '2026-07-21', score: 95 },
    'm2-l1': { done: true, at: '2026-07-22' }, 'm2-l2': { done: true, at: '2026-07-23' }, 'm2-l3': { done: true, at: '2026-07-24' },
    'm3-l1': { done: true, at: '2026-07-27' }, 'm3-l2': { done: true, at: '2026-07-28' }, 'm3-l3': { done: true, at: '2026-07-29', score: 90 },
    'm4-l1': { done: true, at: '2026-07-30' }, 'm4-l2': { done: true, at: '2026-08-03' }, 'm4-l3': { done: true, at: '2026-08-05' },
    'm5-l1': { done: true, at: '2026-08-18' }, 'm5-l2': { done: true, at: '2026-08-19' }, 'm5-l3': { done: true, at: '2026-09-04' }
  },
  'u-jose': {
    'm1-l1': { done: true, at: '2026-07-20' }, 'm1-l2': { done: true, at: '2026-07-21' }, 'm1-l3': { done: true, at: '2026-07-22', score: 85 },
    'm2-l1': { done: true, at: '2026-07-23' }, 'm2-l2': { done: true, at: '2026-07-24' }, 'm2-l3': { done: true, at: '2026-07-27' },
    'm3-l1': { done: true, at: '2026-07-28' }, 'm3-l2': { done: true, at: '2026-07-29' }, 'm3-l3': { done: true, at: '2026-07-31', score: 90 },
    'm4-l1': { done: true, at: '2026-08-03' }, 'm4-l2': { done: true, at: '2026-08-05' }, 'm4-l3': { done: true, at: '2026-08-07' }
  },
  'u-andrea': {
    'm1-l1': { done: true, at: '2026-09-14' }, 'm1-l2': { done: true, at: '2026-09-14' }, 'm1-l3': { done: true, at: '2026-09-15', score: 100 },
    'm2-l1': { done: true, at: '2026-09-16' }, 'm2-l2': { done: true, at: '2026-09-17' }, 'm2-l3': { done: true, at: '2026-09-18' },
    'm3-l1': { done: true, at: '2026-09-21' }, 'm3-l2': { done: true, at: '2026-09-22' }, 'm3-l3': { done: true, at: '2026-09-23', score: 95 },
    'm4-l1': { done: true, at: '2026-09-24' }, 'm4-l2': { done: true, at: '2026-09-25' }, 'm4-l3': { done: true, at: '2026-09-29' }
  },
  'a-camila': {
    'm1-l1': { done: true, at: '2026-10-18' }, 'm1-l2': { done: true, at: '2026-10-20' }
  },
  'a-marco': {
    'm1-l1': { done: true, at: '2026-10-13' }, 'm1-l2': { done: true, at: '2026-10-14' }, 'm1-l3': { done: true, at: '2026-10-15', score: 80 },
    'm2-l1': { done: true, at: '2026-10-19' }
  }
};

/* ---------- Onboarding progress: personId -> ob1..ob8 -> { status, at, note, due? } ---------- */
HQD.onboardingProgress = {
  'u-carlos': {
    ob1: { status: 'done', at: '2026-10-07', note: null },
    ob2: { status: 'done', at: '2026-10-09', note: null },
    ob3: { status: 'pending', at: null, due: '2026-10-28', note: { en: 'Form sent Oct 14; waiting for the signed upload', es: 'Formulario enviado el 14 de octubre; en espera de la carga firmada' } },
    ob4: { status: 'pending', at: null, due: '2026-10-28', note: { en: 'E-sign link sent Oct 14', es: 'Enlace de firma electrónica enviado el 14 de octubre' } },
    ob5: { status: 'pending', at: null, due: '2026-10-28', note: { en: 'E-sign link sent Oct 14', es: 'Enlace de firma electrónica enviado el 14 de octubre' } },
    ob6: { status: 'done', at: '2026-10-08', note: { en: '35 down / 8 up; upgrade being discussed in the tech support thread', es: '35 de bajada / 8 de subida; la mejora se está viendo en el hilo de soporte técnico' } },
    ob7: { status: 'done', at: '2026-10-08', note: { en: 'Second upload accepted; the first photo was too dark', es: 'Segunda carga aceptada; la primera foto estaba muy oscura' } },
    ob8: { status: 'pending', at: null, due: '2026-10-28', note: { en: 'Waiting on the headset before the check with José, set for Tue Oct 27 at 4 PM', es: 'En espera de la diadema antes de la prueba con José, fijada para el martes 27 de octubre a las 4 PM' } }
  },
  'u-lucia': {
    ob1: { status: 'done', at: '2026-09-28', note: null },
    ob2: { status: 'done', at: '2026-09-29', note: null },
    ob3: { status: 'pending', at: null, due: '2026-10-28', note: { en: 'W-8BEN sent Oct 14; due Oct 28', es: 'W-8BEN enviado el 14 de octubre; vence el 28 de octubre' } },
    ob4: { status: 'done', at: '2026-09-29', note: null },
    ob5: { status: 'done', at: '2026-09-29', note: null },
    ob6: { status: 'done', at: '2026-09-30', note: { en: '200 down / 40 up, second provider as backup', es: '200 de bajada / 40 de subida, segundo proveedor como respaldo' } },
    ob7: { status: 'done', at: '2026-09-30', note: null },
    ob8: { status: 'done', at: '2026-10-02', note: { en: 'Checked with José (buddy)', es: 'Prueba hecha con José (buddy)' } }
  },
  'u-kevin': {
    ob1: { status: 'done', at: '2026-09-21', note: null }, ob2: { status: 'done', at: '2026-09-22', note: null }, ob3: { status: 'done', at: '2026-09-23', note: null }, ob4: { status: 'done', at: '2026-09-22', note: null },
    ob5: { status: 'done', at: '2026-09-22', note: null }, ob6: { status: 'done', at: '2026-09-23', note: { en: '80 down / 15 up, hotspot backup', es: '80 de bajada / 15 de subida, respaldo con hotspot' } }, ob7: { status: 'done', at: '2026-09-23', note: null }, ob8: { status: 'done', at: '2026-09-24', note: { en: 'Checked with Mariela (buddy)', es: 'Prueba hecha con Mariela (buddy)' } }
  },
  'u-mariela': {
    ob1: { status: 'done', at: '2026-07-20', note: null }, ob2: { status: 'done', at: '2026-07-21', note: null }, ob3: { status: 'done', at: '2026-07-22', note: null }, ob4: { status: 'done', at: '2026-07-21', note: null },
    ob5: { status: 'done', at: '2026-07-21', note: null }, ob6: { status: 'done', at: '2026-07-22', note: null }, ob7: { status: 'done', at: '2026-07-22', note: null }, ob8: { status: 'done', at: '2026-07-24', note: { en: 'Checked with José (buddy)', es: 'Prueba hecha con José (buddy)' } }
  },
  'u-jose': {
    ob1: { status: 'done', at: '2026-07-20', note: null }, ob2: { status: 'done', at: '2026-07-21', note: null }, ob3: { status: 'done', at: '2026-07-22', note: null }, ob4: { status: 'done', at: '2026-07-21', note: null },
    ob5: { status: 'done', at: '2026-07-21', note: null }, ob6: { status: 'done', at: '2026-07-22', note: { en: '48 down / 10 up, no backup; flagged for review', es: '48 de bajada / 10 de subida, sin respaldo; marcado para revisión' } }, ob7: { status: 'done', at: '2026-07-23', note: null }, ob8: { status: 'done', at: '2026-07-24', note: { en: 'Checked with Mariela (buddy)', es: 'Prueba hecha con Mariela (buddy)' } }
  },
  'u-andrea': {
    ob1: { status: 'done', at: '2026-09-14', note: null }, ob2: { status: 'done', at: '2026-09-15', note: null }, ob3: { status: 'done', at: '2026-09-16', note: null }, ob4: { status: 'done', at: '2026-09-15', note: null },
    ob5: { status: 'done', at: '2026-09-15', note: null }, ob6: { status: 'done', at: '2026-09-16', note: null }, ob7: { status: 'done', at: '2026-09-16', note: null }, ob8: { status: 'done', at: '2026-09-17', note: { en: 'Checked with Mariela (buddy)', es: 'Prueba hecha con Mariela (buddy)' } }
  }
};

/* ---------- Documents (people and clients) ---------- */
HQD.documents = [
  /* Mariela (placed, ISA) */
  { id: 'doc-mariela-id',   ownerId: 'u-mariela', type: 'id',                   title: { en: 'Government ID', es: 'Documento de identidad' },                      signedOn: '2026-07-20', expiresOn: '2031-03-15', status: 'valid', fileName: 'mariela-castellanos-id.pdf' },
  { id: 'doc-mariela-pol',  ownerId: 'u-mariela', type: 'police-record',        title: { en: 'Police record', es: 'Antecedentes penales' },                         signedOn: '2026-07-21', expiresOn: null, status: 'valid', fileName: 'mariela-castellanos-antecedentes.pdf' },
  { id: 'doc-mariela-w8',   ownerId: 'u-mariela', type: 'w8ben',                title: { en: 'Form W-8BEN', es: 'Formulario W-8BEN' },                              signedOn: '2026-07-22', expiresOn: '2029-12-31', status: 'valid', fileName: 'mariela-castellanos-w8ben.pdf' },
  { id: 'doc-mariela-ca',   ownerId: 'u-mariela', type: 'contractor-agreement', title: { en: 'Independent contractor agreement', es: 'Contrato de contratista independiente' }, signedOn: '2026-07-21', expiresOn: null, status: 'valid', fileName: 'mariela-castellanos-contractor-agreement.pdf' },
  { id: 'doc-mariela-conf', ownerId: 'u-mariela', type: 'confidentiality',      title: { en: 'Confidentiality addendum', es: 'Adenda de confidencialidad' },         signedOn: '2026-07-21', expiresOn: null, status: 'valid', fileName: 'mariela-castellanos-confidentiality.pdf' },
  /* José (placed, admin); ID expires within 60 days */
  { id: 'doc-jose-id',      ownerId: 'u-jose', type: 'id',                   title: { en: 'Government ID', es: 'Documento de identidad' },                      signedOn: '2026-07-20', expiresOn: '2026-12-05', status: 'expiring', fileName: 'jose-andino-id.pdf' },
  { id: 'doc-jose-pol',     ownerId: 'u-jose', type: 'police-record',        title: { en: 'Police record', es: 'Antecedentes penales' },                         signedOn: '2026-07-21', expiresOn: null, status: 'valid', fileName: 'jose-andino-antecedentes.pdf' },
  { id: 'doc-jose-w8',      ownerId: 'u-jose', type: 'w8ben',                title: { en: 'Form W-8BEN', es: 'Formulario W-8BEN' },                              signedOn: '2026-07-22', expiresOn: '2029-12-31', status: 'valid', fileName: 'jose-andino-w8ben.pdf' },
  { id: 'doc-jose-ca',      ownerId: 'u-jose', type: 'contractor-agreement', title: { en: 'Independent contractor agreement', es: 'Contrato de contratista independiente' }, signedOn: '2026-07-21', expiresOn: null, status: 'valid', fileName: 'jose-andino-contractor-agreement.pdf' },
  { id: 'doc-jose-conf',    ownerId: 'u-jose', type: 'confidentiality',      title: { en: 'Confidentiality addendum', es: 'Adenda de confidencialidad' },         signedOn: '2026-07-21', expiresOn: null, status: 'valid', fileName: 'jose-andino-confidentiality.pdf' },
  /* Andrea (placed, ops) */
  { id: 'doc-andrea-id',    ownerId: 'u-andrea', type: 'id',                   title: { en: 'Government ID', es: 'Documento de identidad' },                      signedOn: '2026-09-14', expiresOn: '2029-08-20', status: 'valid', fileName: 'andrea-molina-id.pdf' },
  { id: 'doc-andrea-pol',   ownerId: 'u-andrea', type: 'police-record',        title: { en: 'Police record', es: 'Antecedentes penales' },                         signedOn: '2026-09-15', expiresOn: null, status: 'valid', fileName: 'andrea-molina-antecedentes.pdf' },
  { id: 'doc-andrea-w8',    ownerId: 'u-andrea', type: 'w8ben',                title: { en: 'Form W-8BEN', es: 'Formulario W-8BEN' },                              signedOn: '2026-09-16', expiresOn: '2029-12-31', status: 'valid', fileName: 'andrea-molina-w8ben.pdf' },
  { id: 'doc-andrea-ca',    ownerId: 'u-andrea', type: 'contractor-agreement', title: { en: 'Independent contractor agreement', es: 'Contrato de contratista independiente' }, signedOn: '2026-09-15', expiresOn: null, status: 'valid', fileName: 'andrea-molina-contractor-agreement.pdf' },
  { id: 'doc-andrea-conf',  ownerId: 'u-andrea', type: 'confidentiality',      title: { en: 'Confidentiality addendum', es: 'Adenda de confidencialidad' },         signedOn: '2026-09-15', expiresOn: null, status: 'valid', fileName: 'andrea-molina-confidentiality.pdf' },
  /* Kevin (bench, ISA) */
  { id: 'doc-kevin-id',     ownerId: 'u-kevin', type: 'id',                   title: { en: 'Government ID', es: 'Documento de identidad' },                      signedOn: '2026-09-21', expiresOn: '2030-01-10', status: 'valid', fileName: 'kevin-paz-id.pdf' },
  { id: 'doc-kevin-pol',    ownerId: 'u-kevin', type: 'police-record',        title: { en: 'Police record', es: 'Antecedentes penales' },                         signedOn: '2026-09-22', expiresOn: null, status: 'valid', fileName: 'kevin-paz-antecedentes.pdf' },
  { id: 'doc-kevin-w8',     ownerId: 'u-kevin', type: 'w8ben',                title: { en: 'Form W-8BEN', es: 'Formulario W-8BEN' },                              signedOn: '2026-09-23', expiresOn: '2029-12-31', status: 'valid', fileName: 'kevin-paz-w8ben.pdf' },
  { id: 'doc-kevin-ca',     ownerId: 'u-kevin', type: 'contractor-agreement', title: { en: 'Independent contractor agreement', es: 'Contrato de contratista independiente' }, signedOn: '2026-09-22', expiresOn: null, status: 'valid', fileName: 'kevin-paz-contractor-agreement.pdf' },
  { id: 'doc-kevin-conf',   ownerId: 'u-kevin', type: 'confidentiality',      title: { en: 'Confidentiality addendum', es: 'Adenda de confidencialidad' },         signedOn: '2026-09-22', expiresOn: null, status: 'valid', fileName: 'kevin-paz-confidentiality.pdf' },
  /* Lucía (bench, admin); W-8BEN missing */
  { id: 'doc-lucia-id',     ownerId: 'u-lucia', type: 'id',                   title: { en: 'Government ID', es: 'Documento de identidad' },                      signedOn: '2026-09-28', expiresOn: '2032-06-30', status: 'valid', fileName: 'lucia-herrera-id.pdf' },
  { id: 'doc-lucia-pol',    ownerId: 'u-lucia', type: 'police-record',        title: { en: 'Police record', es: 'Antecedentes penales' },                         signedOn: '2026-09-29', expiresOn: null, status: 'valid', fileName: 'lucia-herrera-antecedentes.pdf' },
  { id: 'doc-lucia-w8',     ownerId: 'u-lucia', type: 'w8ben',                title: { en: 'Form W-8BEN', es: 'Formulario W-8BEN' },                              signedOn: null, expiresOn: null, status: 'missing', fileName: null },
  { id: 'doc-lucia-ca',     ownerId: 'u-lucia', type: 'contractor-agreement', title: { en: 'Independent contractor agreement', es: 'Contrato de contratista independiente' }, signedOn: '2026-09-29', expiresOn: null, status: 'valid', fileName: 'lucia-herrera-contractor-agreement.pdf' },
  { id: 'doc-lucia-conf',   ownerId: 'u-lucia', type: 'confidentiality',      title: { en: 'Confidentiality addendum', es: 'Adenda de confidencialidad' },         signedOn: '2026-09-29', expiresOn: null, status: 'valid', fileName: 'lucia-herrera-confidentiality.pdf' },
  /* Carlos (onboarding): ID and police record only so far */
  { id: 'doc-carlos-id',    ownerId: 'u-carlos', type: 'id',            title: { en: 'Government ID', es: 'Documento de identidad' }, signedOn: '2026-10-07', expiresOn: '2028-11-02', status: 'valid', fileName: 'carlos-mejia-id.pdf' },
  { id: 'doc-carlos-pol',   ownerId: 'u-carlos', type: 'police-record', title: { en: 'Police record', es: 'Antecedentes penales' },    signedOn: '2026-10-09', expiresOn: null, status: 'valid', fileName: 'carlos-mejia-antecedentes.pdf' },
  /* Fernanda (inactive since 2026-09-04): archived */
  { id: 'doc-fernanda-id',   ownerId: 'u-fernanda', type: 'id',                   title: { en: 'Government ID', es: 'Documento de identidad' },                      signedOn: '2026-07-20', expiresOn: '2029-05-18', status: 'archived', fileName: 'fernanda-ortiz-id.pdf' },
  { id: 'doc-fernanda-pol',  ownerId: 'u-fernanda', type: 'police-record',        title: { en: 'Police record', es: 'Antecedentes penales' },                         signedOn: '2026-07-21', expiresOn: null, status: 'archived', fileName: 'fernanda-ortiz-antecedentes.pdf' },
  { id: 'doc-fernanda-w8',   ownerId: 'u-fernanda', type: 'w8ben',                title: { en: 'Form W-8BEN', es: 'Formulario W-8BEN' },                              signedOn: '2026-07-22', expiresOn: '2029-12-31', status: 'archived', fileName: 'fernanda-ortiz-w8ben.pdf' },
  { id: 'doc-fernanda-ca',   ownerId: 'u-fernanda', type: 'contractor-agreement', title: { en: 'Independent contractor agreement', es: 'Contrato de contratista independiente' }, signedOn: '2026-07-21', expiresOn: null, status: 'archived', fileName: 'fernanda-ortiz-contractor-agreement.pdf' },
  { id: 'doc-fernanda-conf', ownerId: 'u-fernanda', type: 'confidentiality',      title: { en: 'Confidentiality addendum', es: 'Adenda de confidencialidad' },         signedOn: '2026-07-21', expiresOn: null, status: 'archived', fileName: 'fernanda-ortiz-confidentiality.pdf' },
  /* Clients */
  { id: 'doc-rodriguez-agr',  ownerId: 'c-rodriguez', type: 'client-agreement',       title: { en: 'Client service agreement', es: 'Contrato de servicios del cliente' },   signedOn: '2026-08-06', expiresOn: null, status: 'valid', fileName: 'rodriguez-home-team-client-agreement.pdf' },
  { id: 'doc-rodriguez-data', ownerId: 'c-rodriguez', type: 'data-addendum',          title: { en: 'Data processing addendum', es: 'Adenda de tratamiento de datos' },     signedOn: '2026-08-06', expiresOn: null, status: 'valid', fileName: 'rodriguez-home-team-data-addendum.pdf' },
  { id: 'doc-rodriguez-tele', ownerId: 'c-rodriguez', type: 'telemarketing-addendum', title: { en: 'Telemarketing addendum', es: 'Adenda de telemarketing' },             signedOn: '2026-08-06', expiresOn: null, status: 'valid', fileName: 'rodriguez-home-team-telemarketing-addendum.pdf' },
  { id: 'doc-lonestar-agr',   ownerId: 'c-lonestar',  type: 'client-agreement',       title: { en: 'Client service agreement', es: 'Contrato de servicios del cliente' },   signedOn: '2026-08-14', expiresOn: null, status: 'valid', fileName: 'lone-star-realty-client-agreement.pdf' },
  { id: 'doc-lonestar-data',  ownerId: 'c-lonestar',  type: 'data-addendum',          title: { en: 'Data processing addendum', es: 'Adenda de tratamiento de datos' },     signedOn: '2026-08-14', expiresOn: null, status: 'valid', fileName: 'lone-star-realty-data-addendum.pdf' },
  { id: 'doc-sunshine-agr',   ownerId: 'c-sunshine',  type: 'client-agreement',       title: { en: 'Client service agreement', es: 'Contrato de servicios del cliente' },   signedOn: '2026-09-26', expiresOn: null, status: 'valid', fileName: 'sunshine-coast-client-agreement.pdf' },
  { id: 'doc-sunshine-data',  ownerId: 'c-sunshine',  type: 'data-addendum',          title: { en: 'Data processing addendum', es: 'Adenda de tratamiento de datos' },     signedOn: '2026-09-26', expiresOn: null, status: 'valid', fileName: 'sunshine-coast-data-addendum.pdf' },
  { id: 'doc-sunshine-tele',  ownerId: 'c-sunshine',  type: 'telemarketing-addendum', title: { en: 'Telemarketing addendum', es: 'Adenda de telemarketing' },             signedOn: '2026-09-26', expiresOn: null, status: 'valid', fileName: 'sunshine-coast-telemarketing-addendum.pdf' }
];

/* ---------- Cohorts ---------- */
HQD.cohorts = [
  { id: 'Oct-2026', start: '2026-10-06', graduation: '2026-10-30', members: ['u-carlos'] },
  { id: 'Nov-2026', start: '2026-11-03', graduation: '2026-11-27', members: ['a-camila', 'a-marco'] }
];

/* ---------- Supervised dialing log (ISA track) ---------- */
HQD.supervisedDialing = [
  { id: 'sd-kevin-1', vaId: 'u-kevin', date: '2026-09-29', dials: 62,  scoredCalls: 3, avgScore: 5.8, coach: 'u-daniela', note: { en: 'First live session: slow to identify himself and the team in the first 30 seconds; good energy.', es: 'Primera sesión en vivo: tarda en identificarse y en nombrar al equipo en los primeros 30 segundos; buena energía.' } },
  { id: 'sd-kevin-2', vaId: 'u-kevin', date: '2026-09-30', dials: 78,  scoredCalls: 3, avgScore: 6.4, coach: 'u-daniela', note: { en: 'Identification fixed; still reading the script word for word.', es: 'Identificación corregida; todavía lee el guion palabra por palabra.' } },
  { id: 'sd-kevin-3', vaId: 'u-kevin', date: '2026-10-01', dials: 85,  scoredCalls: 3, avgScore: 7.0, coach: 'u-daniela', note: { en: 'More natural delivery; handled two "not interested" objections without rushing to hang up.', es: 'Entrega más natural; manejó dos objeciones de "no me interesa" sin apurarse a colgar.' } },
  { id: 'sd-kevin-4', vaId: 'u-kevin', date: '2026-10-02', dials: 90,  scoredCalls: 4, avgScore: 7.3, coach: 'u-daniela', note: { en: 'Recording disclosure on every scored call; one opt-out request not noted in the CRM.', es: 'Aviso de grabación en todas las llamadas calificadas; una solicitud de no llamar quedó sin anotar en el CRM.' } },
  { id: 'sd-kevin-5', vaId: 'u-kevin', date: '2026-10-06', dials: 104, scoredCalls: 4, avgScore: 8.1, coach: 'u-daniela', note: { en: 'Set his first practice appointment; Do-Not-Call and opt-out handling correct.', es: 'Agendó su primera cita de práctica; manejo correcto de Do-Not-Call y de solicitudes de no llamar.' } },
  { id: 'sd-kevin-6', vaId: 'u-kevin', date: '2026-10-08', dials: 110, scoredCalls: 4, avgScore: 8.6, coach: 'u-daniela', note: { en: 'Clean appointment handoff; signed off for the ISA certification.', es: 'Transferencia limpia de la cita; aprobado para la certificación ISA.' } },
  { id: 'sd-mariela-1', vaId: 'u-mariela', date: '2026-08-25', dials: 70,  scoredCalls: 3, avgScore: 7.2, coach: 'u-daniela', note: { en: 'Strong phone presence from day one; needs the identification line exactly as written in the script.', es: 'Presencia telefónica fuerte desde el primer día; necesita la línea de identificación tal como está en el guion.' } },
  { id: 'sd-mariela-2', vaId: 'u-mariela', date: '2026-08-27', dials: 88,  scoredCalls: 3, avgScore: 7.8, coach: 'u-daniela', note: { en: 'Identification on time; good pace; one call ran long after a clear no.', es: 'Identificación a tiempo; buen ritmo; una llamada se alargó después de un no claro.' } },
  { id: 'sd-mariela-3', vaId: 'u-mariela', date: '2026-09-01', dials: 102, scoredCalls: 4, avgScore: 8.4, coach: 'u-daniela', note: { en: 'Two practice appointments; recording disclosure and opt-out notes all correct.', es: 'Dos citas de práctica; aviso de grabación y notas de no llamar correctos.' } },
  { id: 'sd-mariela-4', vaId: 'u-mariela', date: '2026-09-03', dials: 115, scoredCalls: 4, avgScore: 8.9, coach: 'u-daniela', note: { en: 'Ready for the Rodriguez seat; signed off.', es: 'Lista para el puesto en Rodriguez; aprobada.' } }
];
