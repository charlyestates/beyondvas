/* BeyondVAs HQ prototype: core seed data (people, clients, placements, channels, rates).
   All other seed files reference these ids exactly. Names are fictional placeholders. */
window.HQD = window.HQD || {};

HQD.today = '2026-10-21';            // Wednesday
HQD.block = { id: 'blk-2026-10-12', start: '2026-10-12', end: '2026-10-25' };
HQD.nextBlock = { id: 'blk-2026-10-26', start: '2026-10-26', end: '2026-11-08', invoicedOn: '2026-10-19' };

HQD.rates = {
  tiers: {
    admin: { bill: 8,  label: { en: 'Admin / transaction coordination', es: 'Administración / coordinación de transacciones' } },
    ops:   { bill: 10, label: { en: 'Operations / marketing', es: 'Operaciones / marketing' } },
    isa:   { bill: 12, label: { en: 'ISA (inside sales)', es: 'ISA (ventas internas)' } }
  },
  setupFee: 499,
  payBand: { min: 4.5, max: 7 },
  blockWeeks: 2,
  paydays: [5, 20],
  noticeDays: 14
};

HQD.people = [
  { id: 'u-charly',   role: 'owner',   name: 'Charly',               first: 'Charly',   initials: 'CH', lang: 'en', tz: 'America/Los_Angeles', country: 'US', city: 'Palmdale, CA',
    title: { en: 'Founder', es: 'Fundador' }, email: 'charly@example.com' },
  { id: 'u-daniela',  role: 'manager', name: 'Daniela Reyes',        first: 'Daniela',  initials: 'DR', lang: 'es', tz: 'America/Tegucigalpa', country: 'HN', city: 'Tegucigalpa',
    title: { en: 'Operations manager, Honduras', es: 'Gerente de operaciones, Honduras' }, email: 'daniela@example.com', whatsapp: '+504 9xxx-xxxx' },

  /* VAs */
  { id: 'u-mariela',  role: 'va', status: 'placed', name: 'Mariela Castellanos', first: 'Mariela', initials: 'MC', lang: 'es', tz: 'America/Tegucigalpa', country: 'HN', city: 'San Pedro Sula',
    tier: 'isa', level: 'ISA certified', english: 'B2+', skills: ['Follow Up Boss', 'Mojo dialer', 'Google Workspace', 'Canva'], industries: ['Real estate'],
    buddyId: 'u-jose', startedWithUs: '2026-07-20', payRate: 6.5, payHistory: [{ from: '2026-07-20', rate: 6 }, { from: '2026-10-01', rate: 6.5, reason: { en: 'Day-30 review at Rodriguez Home Team', es: 'Revisión del día 30 en Rodriguez Home Team' } }],
    whatsapp: '+504 9xxx-xxxx', email: 'mariela@example.com', availability: { from: '07:00', to: '19:00', tz: 'America/Tegucigalpa' },
    equipment: { down: 112, up: 24, backupInternet: 'mobile hotspot', power: 'UPS 45 min', computer: 'Lenovo laptop, 16 GB', headset: 'Logitech H390' } },
  { id: 'u-jose',     role: 'va', status: 'placed', name: 'José Andino',          first: 'José',     initials: 'JA', lang: 'es', tz: 'America/Tegucigalpa', country: 'HN', city: 'Tegucigalpa',
    tier: 'admin', level: 'Certified', english: 'B2', skills: ['Dotloop', 'Google Workspace', 'Follow Up Boss', 'Excel'], industries: ['Real estate'],
    buddyId: 'u-mariela', startedWithUs: '2026-07-20', payRate: 5, payHistory: [{ from: '2026-07-20', rate: 5 }],
    whatsapp: '+504 9xxx-xxxx', email: 'jose@example.com', availability: { from: '07:00', to: '17:00', tz: 'America/Tegucigalpa' },
    equipment: { down: 48, up: 10, backupInternet: 'none', power: 'none', computer: 'HP desktop, 8 GB', headset: 'Jabra Evolve 20' } },
  { id: 'u-andrea',   role: 'va', status: 'placed', name: 'Andrea Molina',        first: 'Andrea',   initials: 'AM', lang: 'es', tz: 'America/El_Salvador', country: 'SV', city: 'San Salvador',
    tier: 'ops', level: 'Certified', english: 'C1', skills: ['Canva', 'Meta Ads', 'Mailchimp', 'Google Workspace', 'Notion'], industries: ['Real estate', 'Marketing'],
    buddyId: 'u-mariela', startedWithUs: '2026-09-14', payRate: 5.5, payHistory: [{ from: '2026-09-14', rate: 5.5 }],
    whatsapp: '+503 7xxx-xxxx', email: 'andrea@example.com', availability: { from: '07:00', to: '18:00', tz: 'America/El_Salvador' },
    equipment: { down: 95, up: 20, backupInternet: 'mobile hotspot', power: 'UPS 30 min', computer: 'MacBook Air', headset: 'Apple EarPods' } },
  { id: 'u-kevin',    role: 'va', status: 'bench',  name: 'Kevin Paz',             first: 'Kevin',    initials: 'KP', lang: 'es', tz: 'America/Tegucigalpa', country: 'HN', city: 'Tegucigalpa',
    tier: 'isa', level: 'ISA certified', english: 'B2+', skills: ['Follow Up Boss', 'CallTools', 'Google Workspace'], industries: ['Real estate', 'Insurance'],
    buddyId: 'u-mariela', startedWithUs: '2026-09-21', certifiedOn: '2026-10-09', payRate: null, payHistory: [],
    whatsapp: '+504 3xxx-xxxx', email: 'kevin@example.com', availability: { from: '07:00', to: '20:00', tz: 'America/Tegucigalpa' },
    equipment: { down: 80, up: 15, backupInternet: 'mobile hotspot', power: 'UPS 20 min', computer: 'Dell laptop, 16 GB', headset: 'Logitech H390' } },
  { id: 'u-lucia',    role: 'va', status: 'bench',  name: 'Lucía Herrera',         first: 'Lucía',    initials: 'LH', lang: 'es', tz: 'America/Bogota', country: 'CO', city: 'Medellín',
    tier: 'admin', level: 'Certified', english: 'B2', skills: ['Google Workspace', 'Dotloop', 'QuickBooks', 'Canva'], industries: ['Real estate', 'Accounting'],
    buddyId: 'u-jose', startedWithUs: '2026-09-28', certifiedOn: '2026-10-16', payRate: null, payHistory: [],
    whatsapp: '+57 3xx xxx xxxx', email: 'lucia@example.com', availability: { from: '07:00', to: '16:00', tz: 'America/Bogota' },
    equipment: { down: 200, up: 40, backupInternet: 'second provider', power: 'none', computer: 'Lenovo laptop, 8 GB', headset: 'Jabra Evolve 20' } },
  { id: 'u-carlos',   role: 'va', status: 'onboarding', name: 'Carlos Mejía',      first: 'Carlos',   initials: 'CM', lang: 'es', tz: 'America/Tegucigalpa', country: 'HN', city: 'La Ceiba',
    tier: 'admin', level: 'In academy', english: 'B1+', skills: ['Google Workspace', 'Excel'], industries: ['Hospitality'],
    buddyId: 'u-jose', startedWithUs: '2026-10-06', cohort: 'Oct-2026', payRate: null, payHistory: [],
    whatsapp: '+504 8xxx-xxxx', email: 'carlos@example.com', availability: { from: '08:00', to: '17:00', tz: 'America/Tegucigalpa' },
    equipment: { down: 35, up: 8, backupInternet: 'none', power: 'none', computer: 'Acer laptop, 8 GB', headset: 'none yet' } },
  { id: 'u-fernanda', role: 'va', status: 'inactive', name: 'Fernanda Ortiz',      first: 'Fernanda', initials: 'FO', lang: 'es', tz: 'America/Tegucigalpa', country: 'HN', city: 'Tegucigalpa',
    tier: 'isa', level: 'ISA certified', english: 'B2', skills: ['Follow Up Boss', 'Google Workspace'], industries: ['Real estate'],
    buddyId: null, startedWithUs: '2026-07-20', endedOn: '2026-09-04', payRate: null, payHistory: [{ from: '2026-07-20', rate: 6 }],
    email: 'fernanda@example.com' },

  /* Client logins */
  { id: 'u-ana',   role: 'client', clientId: 'c-rodriguez', name: 'Ana Rodriguez', first: 'Ana',   initials: 'AR', lang: 'en', tz: 'America/Los_Angeles', country: 'US', city: 'Riverside, CA', title: { en: 'Team leader', es: 'Líder de equipo' }, email: 'ana@example.com' },
  { id: 'u-mike',  role: 'client', clientId: 'c-lonestar',  name: 'Mike Turner',   first: 'Mike',  initials: 'MT', lang: 'en', tz: 'America/Chicago',     country: 'US', city: 'Austin, TX',   title: { en: 'Broker-owner', es: 'Broker propietario' }, email: 'mike@example.com' },
  { id: 'u-jenna', role: 'client', clientId: 'c-lonestar',  name: 'Jenna Ortiz',   first: 'Jenna', initials: 'JO', lang: 'en', tz: 'America/Chicago',     country: 'US', city: 'Austin, TX',   title: { en: 'Office manager', es: 'Gerente de oficina' }, email: 'jenna@example.com' },
  { id: 'u-priya', role: 'client', clientId: 'c-sunshine',  name: 'Priya Shah',    first: 'Priya', initials: 'PS', lang: 'en', tz: 'America/New_York',    country: 'US', city: 'Tampa, FL',    title: { en: 'Team leader', es: 'Líder de equipo' }, email: 'priya@example.com' },

  /* Applicants (details live in pipeline.js) */
  { id: 'a-sofia',   role: 'applicant', status: 'applicant', name: 'Sofía Lagos',      first: 'Sofía',   initials: 'SL', lang: 'es', tz: 'America/Tegucigalpa', country: 'HN', city: 'San Pedro Sula' },
  { id: 'a-diego',   role: 'applicant', status: 'applicant', name: 'Diego Fuentes',    first: 'Diego',   initials: 'DF', lang: 'es', tz: 'America/Guatemala',   country: 'GT', city: 'Guatemala City' },
  { id: 'a-valeria', role: 'applicant', status: 'applicant', name: 'Valeria Núñez',    first: 'Valeria', initials: 'VN', lang: 'es', tz: 'America/Tegucigalpa', country: 'HN', city: 'Tegucigalpa' },
  { id: 'a-marco',   role: 'applicant', status: 'applicant', name: 'Marco Pineda',     first: 'Marco',   initials: 'MP', lang: 'es', tz: 'America/Managua',     country: 'NI', city: 'Managua' },
  { id: 'a-camila',  role: 'applicant', status: 'applicant', name: 'Camila Rivas',     first: 'Camila',  initials: 'CR', lang: 'es', tz: 'America/El_Salvador', country: 'SV', city: 'Santa Ana' },
  { id: 'a-jorge',   role: 'applicant', status: 'applicant', name: 'Jorge Zelaya',     first: 'Jorge',   initials: 'JZ', lang: 'es', tz: 'America/Tegucigalpa', country: 'HN', city: 'Comayagua' },
  { id: 'a-paola',   role: 'applicant', status: 'applicant', name: 'Paola Mendieta',   first: 'Paola',   initials: 'PM', lang: 'es', tz: 'America/Tegucigalpa', country: 'HN', city: 'Tegucigalpa' },
  { id: 'a-ricardo', role: 'applicant', status: 'applicant', name: 'Ricardo Ochoa',    first: 'Ricardo', initials: 'RO', lang: 'es', tz: 'America/Bogota',       country: 'CO', city: 'Bogotá' }
];

HQD.clients = [
  { id: 'c-rodriguez', name: 'Rodriguez Home Team', brokerage: 'Independent', city: 'Riverside, CA', state: 'CA', tz: 'America/Los_Angeles',
    contactId: 'u-ana', logins: ['u-ana'], billingEmail: 'billing-rht@example.com', stripeCustomer: 'cus_RHT2026', trackerWorkspace: 'Hubstaff: rodriguez-home-team',
    since: '2026-08-10', setupFeePaidOn: '2026-08-06', holidaySet: 'US', scopePreset: 'CA', channelId: 'ch-rodriguez', referredBy: null,
    notes: { en: '3 agents, 1 TC in-house; wants 25 appointments a month from circle prospecting.', es: '3 agentes, 1 coordinadora interna; quiere 25 citas al mes con prospección de círculo.' } },
  { id: 'c-lonestar',  name: 'Lone Star Realty Group', brokerage: 'Independent', city: 'Austin, TX', state: 'TX', tz: 'America/Chicago',
    contactId: 'u-mike', logins: ['u-mike', 'u-jenna'], billingEmail: 'ap-lonestar@example.com', stripeCustomer: 'cus_LSRG2026', trackerWorkspace: 'Hubstaff: lone-star-realty',
    since: '2026-08-17', setupFeePaidOn: '2026-08-14', holidaySet: 'US', scopePreset: 'TX', channelId: 'ch-lonestar', referredBy: 'c-rodriguez',
    notes: { en: '11 agents; transaction coordination and listing paperwork only; no outbound calling in Texas.', es: '11 agentes; solo coordinación de transacciones y papeleo de listados; sin llamadas salientes en Texas.' } },
  { id: 'c-sunshine',  name: 'Sunshine Coast Partners', brokerage: 'Keller Williams', city: 'Tampa, FL', state: 'FL', tz: 'America/New_York',
    contactId: 'u-priya', logins: ['u-priya'], billingEmail: 'priya@example.com', stripeCustomer: 'cus_SCP2026', trackerWorkspace: 'Hubstaff: sunshine-coast',
    since: '2026-10-01', setupFeePaidOn: '2026-09-26', holidaySet: 'US', scopePreset: 'FL', channelId: 'ch-sunshine', referredBy: null,
    notes: { en: '5 agents; social media, listing marketing, CRM cleanup; Florida telemarketing addendum signed for later ISA work.', es: '5 agentes; redes sociales, marketing de listados, limpieza del CRM; adenda de telemarketing de Florida firmada para trabajo ISA futuro.' } }
];

HQD.placements = [
  { id: 'p-rod-1', vaId: 'u-fernanda', clientId: 'c-rodriguez', tier: 'isa', hoursPerWeek: 40, billRate: 12, payRate: 6,
    start: '2026-08-10', end: '2026-09-04', status: 'ended', endReason: { en: 'Replaced under the 90-day fit guarantee', es: 'Reemplazada bajo la garantía de ajuste de 90 días' }, replacedBy: 'p-rod-2', seatStart: '2026-08-10',
    schedule: { days: 'Mon-Fri', from: '08:00', to: '17:00', tz: 'America/Los_Angeles' } },
  { id: 'p-rod-2', vaId: 'u-mariela', clientId: 'c-rodriguez', tier: 'isa', hoursPerWeek: 40, billRate: 12, payRate: 6.5,
    start: '2026-09-08', end: null, status: 'active', replaces: 'p-rod-1', seatStart: '2026-08-10',
    fitWindowEnds: '2026-11-08', replacementWindowEnds: '2027-05-10',
    schedule: { days: 'Mon-Fri', from: '08:00', to: '17:00', tz: 'America/Los_Angeles' },
    expectations: { en: 'Circle prospecting and lead follow-up in Follow Up Boss; 150+ dials a day; set 6+ appointments a week; daily report by 5 PM PT.', es: 'Prospección de círculo y seguimiento de leads en Follow Up Boss; 150+ marcaciones al día; agendar 6+ citas por semana; reporte diario antes de las 5 PM hora del Pacífico.' },
    checkpoints: [{ day: 5, due: '2026-09-15', done: '2026-09-15' }, { day: 14, due: '2026-09-22', done: '2026-09-22' }, { day: 30, due: '2026-10-08', done: '2026-10-08' }, { day: 90, due: '2026-12-07', done: null }] },
  { id: 'p-lone-1', vaId: 'u-jose', clientId: 'c-lonestar', tier: 'admin', hoursPerWeek: 30, billRate: 8, payRate: 5,
    start: '2026-08-17', end: null, status: 'active', replaces: null, seatStart: '2026-08-17',
    fitWindowEnds: '2026-11-15', replacementWindowEnds: '2027-05-17',
    schedule: { days: 'Mon-Fri', from: '09:00', to: '15:00', tz: 'America/Chicago' },
    expectations: { en: 'Transaction coordination in Dotloop, listing paperwork, MLS data entry, inbound email and scheduling. No outbound calls.', es: 'Coordinación de transacciones en Dotloop, papeleo de listados, captura en el MLS, correo entrante y agenda. Sin llamadas salientes.' },
    checkpoints: [{ day: 5, due: '2026-08-24', done: '2026-08-24' }, { day: 14, due: '2026-08-31', done: '2026-09-01' }, { day: 30, due: '2026-09-16', done: '2026-09-16' }, { day: 90, due: '2026-11-15', done: null }] },
  { id: 'p-sun-1', vaId: 'u-andrea', clientId: 'c-sunshine', tier: 'ops', hoursPerWeek: 40, billRate: 10, payRate: 5.5,
    start: '2026-10-01', end: null, status: 'active', replaces: null, seatStart: '2026-10-01',
    fitWindowEnds: '2026-12-30', replacementWindowEnds: '2027-07-01',
    schedule: { days: 'Mon-Fri', from: '09:00', to: '18:00', tz: 'America/New_York' },
    expectations: { en: 'Listing marketing (Canva, Meta posts), CRM cleanup, email campaigns in Mailchimp, weekly content calendar; daily report by 6 PM ET.', es: 'Marketing de listados (Canva, publicaciones en Meta), limpieza del CRM, campañas en Mailchimp, calendario semanal de contenido; reporte diario antes de las 6 PM hora del Este.' },
    checkpoints: [{ day: 5, due: '2026-10-08', done: '2026-10-08' }, { day: 14, due: '2026-10-15', done: '2026-10-15' }, { day: 30, due: '2026-10-31', done: null }, { day: 90, due: '2026-12-30', done: null }] }
];

HQD.channels = [
  { id: 'ch-announcements', kind: 'announcements', name: { en: '#announcements', es: '#anuncios' }, members: 'everyone', posters: ['u-charly', 'u-daniela'] },
  { id: 'ch-team',          kind: 'public',        name: { en: '#team', es: '#equipo' }, members: ['u-charly', 'u-daniela', 'u-mariela', 'u-jose', 'u-andrea', 'u-kevin', 'u-lucia', 'u-carlos'] },
  { id: 'ch-rodriguez', kind: 'client', clientId: 'c-rodriguez', placementId: 'p-rod-2', name: { en: 'Client · Mariela', es: 'Cliente · Mariela' }, members: ['u-ana', 'u-mariela', 'u-daniela', 'u-charly'] },
  { id: 'ch-lonestar',  kind: 'client', clientId: 'c-lonestar',  placementId: 'p-lone-1', name: { en: 'Client · José', es: 'Cliente · José' }, members: ['u-mike', 'u-jenna', 'u-jose', 'u-daniela', 'u-charly'] },
  { id: 'ch-sunshine',  kind: 'client', clientId: 'c-sunshine',  placementId: 'p-sun-1', name: { en: 'Client · Andrea', es: 'Cliente · Andrea' }, members: ['u-priya', 'u-andrea', 'u-daniela', 'u-charly'] },
  { id: 'dm-daniela-mariela', kind: 'dm', members: ['u-daniela', 'u-mariela'] },
  { id: 'dm-daniela-kevin',   kind: 'dm', members: ['u-daniela', 'u-kevin'] },
  { id: 'dm-charly-daniela',  kind: 'dm', members: ['u-charly', 'u-daniela'] },
  { id: 'dm-ana-charly',      kind: 'dm', members: ['u-ana', 'u-charly'] }
];

/* Private support threads: one per VA and topic; only the VA, the assigned manager and the owner can read them. */
HQD.threads = [
  { id: 'th-mariela-pay',  vaId: 'u-mariela', topic: 'pay',    assignedTo: 'u-daniela', status: 'open',   title: { en: 'Pay statement question', es: 'Pregunta sobre el estado de pago' } },
  { id: 'th-jose-client',  vaId: 'u-jose',    topic: 'client', assignedTo: 'u-daniela', status: 'open',   title: { en: 'Morning start times at Lone Star', es: 'Horario de entrada en Lone Star' } },
  { id: 'th-carlos-tech',  vaId: 'u-carlos',  topic: 'tech',   assignedTo: 'u-daniela', status: 'open',   title: { en: 'Headset and internet upgrade', es: 'Diadema y mejora de internet' } },
  { id: 'th-kevin-hr',     vaId: 'u-kevin',   topic: 'hr',     assignedTo: 'u-daniela', status: 'closed', title: { en: 'Bench period and first placement', es: 'Periodo en banca y primera colocación' } }
];

HQD.academyModules = [
  { id: 'm1', order: 1, title: { en: 'Welcome to BeyondVAs and how we work', es: 'Bienvenida a BeyondVAs y cómo trabajamos' } },
  { id: 'm2', order: 2, title: { en: 'Your tools: Google Workspace, Follow Up Boss, Hubstaff, 1Password', es: 'Tus herramientas: Google Workspace, Follow Up Boss, Hubstaff, 1Password' } },
  { id: 'm3', order: 3, title: { en: 'US real estate basics and vocabulary', es: 'Fundamentos y vocabulario de bienes raíces en EE. UU.' } },
  { id: 'm4', order: 4, title: { en: 'Communication, daily reports and the client channel', es: 'Comunicación, reportes diarios y el canal del cliente' } },
  { id: 'm5', order: 5, title: { en: 'ISA track: scripts, objections and calling rules', es: 'Ruta ISA: guiones, objeciones y reglas de llamadas' }, track: 'isa' }
];

HQD.onboardingTaskDefs = [
  { id: 'ob1', kind: 'upload', title: { en: 'Government ID', es: 'Documento de identidad' } },
  { id: 'ob2', kind: 'upload', title: { en: 'Police record (antecedentes)', es: 'Antecedentes penales' } },
  { id: 'ob3', kind: 'upload', title: { en: 'Signed W-8BEN', es: 'W-8BEN firmado' } },
  { id: 'ob4', kind: 'link',   title: { en: 'Contractor agreement (e-sign)', es: 'Contrato de contratista (firma electrónica)' } },
  { id: 'ob5', kind: 'link',   title: { en: 'Confidentiality addendum (e-sign)', es: 'Adenda de confidencialidad (firma electrónica)' } },
  { id: 'ob6', kind: 'upload', title: { en: 'Internet speed test screenshot', es: 'Captura de la prueba de velocidad' } },
  { id: 'ob7', kind: 'upload', title: { en: 'Workspace and equipment photo', es: 'Foto del espacio de trabajo y equipo' } },
  { id: 'ob8', kind: 'check',  title: { en: 'Headset and camera check with your buddy', es: 'Prueba de diadema y cámara con tu buddy' } }
];
