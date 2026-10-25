/* BeyondVAs HQ prototype: the Academy curriculum.
   Loads after pipeline.js and replaces HQD.academyModules, HQD.academyLessons and HQD.academyProgress.

   Decision of 2026-10-21: the academy reuses the Beyond HQ "Start here" agent training (7 chapters, 73 screens) with
   everything team-specific removed (Beyond Estates ecosystem, incentives, commission splits, Zillow Preferred program
   rules, the buyer agreement SOP, office rules, the agent setup list) and the standard sales training kept, de-branded
   and rewritten for a VA or ISA who works on a client's behalf. Track one (modules 1-5) is the VA Hub's existing
   foundation; track two (modules 6-14) is the ISA track. Each module ends with a quiz; the ISA track ends with
   supervised dialing and a sign-off, which is what sets the "ISA certified" flag. Lesson kinds: text, task (a practice
   chat or an exercise), quiz, signoff, video. Sources are named per module so the owner can trace every lesson. */
window.HQD = window.HQD || {};

HQD.academyModules = [
  /* ---- Track 1: foundation (every VA) ---- */
  { id: 'm1', order: 1, minutes: 10, title: { en: 'Welcome to BeyondVAs and how HQ works', es: 'Bienvenida a BeyondVAs y cómo funciona HQ' },
    description: { en: 'Who we are, what we believe, and the three habits HQ is built around: the channel, the daily report, the tracker.', es: 'Quiénes somos, en qué creemos y los tres hábitos sobre los que está construido HQ: el canal, el reporte diario, el rastreador.' },
    source: { en: 'VA Hub academy, module "Welcome", updated for HQ', es: 'Academia del VA Hub, módulo "Bienvenida", actualizado para HQ' } },
  { id: 'm2', order: 2, minutes: 11, title: { en: 'Working with US clients', es: 'Trabajar con clientes de EE. UU.' },
    description: { en: 'Communication habits that make a client trust you from week one, and the two-clock rule.', es: 'Hábitos de comunicación que hacen que el cliente confíe en ti desde la primera semana, y la regla de los dos relojes.' },
    source: { en: 'VA Hub academy, module "Working with US clients"', es: 'Academia del VA Hub, módulo "Trabajar con clientes de EE. UU."' } },
  { id: 'm3', order: 3, minutes: 15, title: { en: 'Your tools', es: 'Tus herramientas' },
    description: { en: 'Google Workspace, Zoom, Follow Up Boss for assistants, the time tracker and the password manager.', es: 'Google Workspace, Zoom, Follow Up Boss para asistentes, el rastreador de tiempo y el gestor de contraseñas.' },
    source: { en: 'VA Hub academy, module "Our tools", plus a Follow Up Boss lesson', es: 'Academia del VA Hub, módulo "Nuestras herramientas", más una lección de Follow Up Boss' } },
  { id: 'm4', order: 4, minutes: 16, title: { en: 'Real estate basics', es: 'Bases de bienes raíces' },
    description: { en: 'The words, the people and the daily rhythm of a US real estate team; buyers and sellers and who does what.', es: 'Las palabras, las personas y el ritmo diario de un equipo de bienes raíces en EE. UU.; compradores y vendedores y quién hace qué.' },
    source: { en: 'VA Hub academy, module "Real estate basics"', es: 'Academia del VA Hub, módulo "Bases de bienes raíces"' } },
  { id: 'm5', order: 5, minutes: 12, title: { en: 'Professionalism, confidentiality and your scope', es: 'Profesionalismo, confidencialidad y tu alcance' },
    description: { en: 'Client data, what to do when life happens, and what you may and may not do in your client\'s state.', es: 'Datos del cliente, qué hacer cuando la vida pasa, y qué puedes y qué no puedes hacer en el estado de tu cliente.' },
    source: { en: 'VA Hub academy, module "Professionalism and security", plus the scope card', es: 'Academia del VA Hub, módulo "Profesionalismo y seguridad", más la tarjeta de alcance' } },

  /* ---- Track 2: ISA (sales) ---- */
  { id: 'm6', order: 6, track: 'isa', minutes: 16, title: { en: 'In the buyer\'s shoes', es: 'En los zapatos del comprador' },
    description: { en: 'Who is on the other end of every inquiry: overwhelmed, not unmotivated. A.L.M. on every call.', es: 'Quién está del otro lado de cada consulta: abrumado, no desmotivado. A.L.M. en cada llamada.' },
    source: { en: 'Beyond HQ "Start here", chapter 2, de-branded', es: 'Beyond HQ "Start here", capítulo 2, sin marca' } },
  { id: 'm7', order: 7, track: 'isa', minutes: 16, title: { en: 'Speed to lead and the reply rule', es: 'Velocidad al lead y la regla de respuesta' },
    description: { en: 'The first to call usually wins: five minutes, the 60-second callback, four touches in 24 hours, a reply within two hours.', es: 'El primero que llama suele ganar: cinco minutos, la devolución en 60 segundos, cuatro toques en 24 horas, respuesta en dos horas.' },
    source: { en: 'Beyond HQ chapters 1 and 4 (speed, the reply rule) and the playbook "Five minutes or less"', es: 'Beyond HQ capítulos 1 y 4 (velocidad, regla de respuesta) y el playbook "Five minutes or less"' } },
  { id: 'm8', order: 8, track: 'isa', minutes: 16, title: { en: 'Conversations that set appointments', es: 'Conversaciones que agendan citas' },
    description: { en: 'Two-minute conversations beat ten dials; the power hour; two times, never "when works for you"; confirm the night before.', es: 'Las conversaciones de dos minutos valen más que diez marcaciones; la hora de poder; dos horarios, nunca "cuando te convenga"; confirma la noche anterior.' },
    source: { en: 'Beyond HQ playbook "Power Hour" and "Turn the connection into a showing"', es: 'Playbook de Beyond HQ "Power Hour" y "Turn the connection into a showing"' } },
  { id: 'm9', order: 9, track: 'isa', minutes: 11, title: { en: 'The financing conversation', es: 'La conversación de financiamiento' },
    description: { en: 'Twenty seconds after the tour is booked, and always the client\'s choice of lender.', es: 'Veinte segundos después de agendar la visita, y siempre el prestamista que el cliente elija.' },
    source: { en: 'Beyond HQ playbook "The 20-second financing conversation" and the buyer-first lender guide, with no lender named', es: 'Playbook de Beyond HQ "The 20-second financing conversation" y la guía de prestamista, sin nombrar prestamistas' } },
  { id: 'm10', order: 10, track: 'isa', minutes: 19, title: { en: 'Mastering objections', es: 'Dominar las objeciones' },
    description: { en: 'Ask, listen, mirror. Then acknowledge, pivot, appointment. "Prices are too high" can mean three different things.', es: 'Pregunta, escucha, refleja. Luego reconoce, redirige, cita. "Los precios están muy altos" puede significar tres cosas.' },
    source: { en: 'Beyond HQ chapter 7 and the field guide "Mastering Objections"', es: 'Beyond HQ capítulo 7 y la guía "Mastering Objections"' } },
  { id: 'm11', order: 11, track: 'isa', minutes: 17, title: { en: 'Working with sellers', es: 'Trabajar con vendedores' },
    description: { en: 'Who calls about selling and why, the listing appointment ask, and follow-up that respects their timeline.', es: 'Quién llama para vender y por qué, cómo pedir la cita de listado, y seguimiento que respeta sus tiempos.' },
    source: { en: 'Built from the same playbooks for sellers; draft for the owner\'s approval', es: 'Construido con los mismos playbooks para vendedores; borrador para aprobación del propietario' } },
  { id: 'm12', order: 12, track: 'isa', minutes: 11, title: { en: 'CRM discipline: log everything', es: 'Disciplina en el CRM: registra todo' },
    description: { en: 'If it is not in the CRM, it did not happen. Five updates per connection, stages the same day, the 10-day rule.', es: 'Si no está en el CRM, no pasó. Cinco actualizaciones por conexión, etapas el mismo día, la regla de 10 días.' },
    source: { en: 'Beyond HQ playbook "Five updates per connection" and chapter 4 "Close the day"', es: 'Playbook de Beyond HQ "Five updates per connection" y capítulo 4 "Close the day"' } },
  { id: 'm13', order: 13, track: 'isa', minutes: 8, title: { en: 'When you mess up: win the client back', es: 'Cuando te equivocas: recupera al cliente' },
    description: { en: 'Own it, name what it cost them, fix the process, give them a reason to respond.', es: 'Asúmelo, nombra lo que les costó, corrige el proceso, dales una razón para responder.' },
    source: { en: 'Beyond HQ chapter 7, the client-recovery field guide', es: 'Beyond HQ capítulo 7, la guía de recuperación del cliente' } },
  { id: 'm14', order: 14, track: 'isa', minutes: 75, title: { en: 'Calling rules and ISA certification', es: 'Reglas de llamadas y certificación ISA' },
    description: { en: 'Identify yourself, recording disclosure, do-not-call and opt-outs, your client\'s state scope card, then six supervised dialing sessions and the sign-off.', es: 'Identifícate, aviso de grabación, no-llamar y bajas, la tarjeta de alcance del estado de tu cliente, luego seis sesiones de marcación supervisada y la firma.' },
    source: { en: 'BeyondVAs compliance rules (business plan) and the ISA certification gate', es: 'Reglas de cumplimiento de BeyondVAs (plan de negocio) y la puerta de certificación ISA' } }
];

HQD.academyLessons = [
  /* m1 */
  { id: 'm1-l1', moduleId: 'm1', order: 1, kind: 'text', minutes: 4, title: { en: 'Who we are and what we believe', es: 'Quiénes somos y en qué creemos' },
    summary: { en: 'People first, over-communicate, grow together. You are a colleague, never a "resource".', es: 'Primero las personas, comunica de más, crecemos juntos. Eres un/a colega, nunca un "recurso".' } },
  { id: 'm1-l2', moduleId: 'm1', order: 2, kind: 'text', minutes: 4, title: { en: 'How HQ works: the channel, the report, the tracker', es: 'Cómo funciona HQ: el canal, el reporte, el rastreador' },
    summary: { en: 'Your client channel is where the work lives. The daily report is a form, not a message. Hours come from the tracker and are approved every Monday.', es: 'Tu canal del cliente es donde vive el trabajo. El reporte diario es un formulario, no un mensaje. Las horas vienen del rastreador y se aprueban cada lunes.' } },
  { id: 'm1-l3', moduleId: 'm1', order: 3, kind: 'quiz', minutes: 2, title: { en: 'Quick check', es: 'Repaso rápido' }, summary: { en: 'Three questions from this module.', es: 'Tres preguntas de este módulo.' } },
  /* m2 */
  { id: 'm2-l1', moduleId: 'm2', order: 1, kind: 'text', minutes: 6, title: { en: 'Communication that builds trust', es: 'Comunicación que genera confianza' },
    summary: { en: 'Acknowledge every request within 15 minutes. "I\'ll have this to you by 2 PM ET." Say "Done" or say what is missing.', es: 'Confirma cada petición en menos de 15 minutos. "I\'ll have this to you by 2 PM ET." Di "Done" o di qué falta.' } },
  { id: 'm2-l2', moduleId: 'm2', order: 2, kind: 'text', minutes: 3, title: { en: 'Time zones and the two clocks', es: 'Zonas horarias y los dos relojes' },
    summary: { en: 'Your schedule is stored in the client\'s zone and shown in yours. Daylight saving moves the US in March and November; Honduras does not move.', es: 'Tu horario se guarda en la zona del cliente y se muestra en la tuya. El horario de verano mueve a EE. UU. en marzo y noviembre; Honduras no se mueve.' } },
  { id: 'm2-l3', moduleId: 'm2', order: 3, kind: 'quiz', minutes: 2, title: { en: 'Quick check', es: 'Repaso rápido' }, summary: { en: 'Three questions from this module.', es: 'Tres preguntas de este módulo.' } },
  /* m3 */
  { id: 'm3-l1', moduleId: 'm3', order: 1, kind: 'text', minutes: 5, title: { en: 'Google Workspace, Zoom and passwords', es: 'Google Workspace, Zoom y contraseñas' },
    summary: { en: 'Labels and stars, calendar invites, Drive sharing rules, camera on, and a password manager. Passwords never travel in chat.', es: 'Etiquetas y estrellas, invitaciones de calendario, reglas para compartir en Drive, cámara encendida y un gestor de contraseñas. Las contraseñas nunca viajan por chat.' } },
  { id: 'm3-l2', moduleId: 'm3', order: 2, kind: 'text', minutes: 5, title: { en: 'Follow Up Boss for assistants', es: 'Follow Up Boss para asistentes' },
    summary: { en: 'People, stages, tasks, notes and smart lists. Every call, text and note is logged the same day; the client\'s dashboards only see what is logged.', es: 'Personas, etapas, tareas, notas y listas inteligentes. Cada llamada, mensaje y nota se registra el mismo día; los tableros del cliente solo ven lo que se registra.' } },
  { id: 'm3-l3', moduleId: 'm3', order: 3, kind: 'text', minutes: 3, title: { en: 'Time tracking and screenshots', es: 'Registro de tiempo y capturas' },
    summary: { en: 'Start the timer when you start, stop it for breaks. A short note per task. Low activity during calls or reading? Add the note so it makes sense.', es: 'Inicia el cronómetro cuando empieces, deténlo en descansos. Una nota corta por tarea. ¿Actividad baja en llamadas o lectura? Agrega la nota para que tenga sentido.' } },
  { id: 'm3-l4', moduleId: 'm3', order: 4, kind: 'quiz', minutes: 2, title: { en: 'Quick check', es: 'Repaso rápido' }, summary: { en: 'Three questions from this module.', es: 'Tres preguntas de este módulo.' } },
  /* m4 */
  { id: 'm4-l1', moduleId: 'm4', order: 1, kind: 'text', minutes: 6, title: { en: 'The words you will hear', es: 'Las palabras que vas a escuchar' },
    summary: { en: 'Lead, ISA, CRM, listing, showing, under contract, closing, TC, MLS, pre-approval.', es: 'Lead, ISA, CRM, listing, showing, under contract, closing, TC, MLS, pre-approval.' } },
  { id: 'm4-l2', moduleId: 'm4', order: 2, kind: 'text', minutes: 4, title: { en: 'A day on a real estate team', es: 'Un día en un equipo de bienes raíces' },
    summary: { en: 'Morning: new leads within five minutes. Midday: follow-ups with a next action. Afternoon: appointments, listing prep, paperwork. Weekly: bring your numbers.', es: 'Mañana: leads nuevos en cinco minutos. Mediodía: seguimientos con una siguiente acción. Tarde: citas, preparación de listados, papeleo. Semanal: lleva tus números.' } },
  { id: 'm4-l3', moduleId: 'm4', order: 3, kind: 'text', minutes: 4, title: { en: 'Buyers, sellers and who does what', es: 'Compradores, vendedores y quién hace qué' },
    summary: { en: 'The agent represents a buyer or a seller; the ISA sets the appointment; the TC runs contract to closing; the lender pre-approves. Where a VA fits in each.', es: 'El agente representa a un comprador o un vendedor; el ISA agenda la cita; el TC lleva del contrato al cierre; el prestamista pre-aprueba. Dónde encaja un VA en cada uno.' } },
  { id: 'm4-l4', moduleId: 'm4', order: 4, kind: 'quiz', minutes: 2, title: { en: 'Quick check', es: 'Repaso rápido' }, summary: { en: 'Three questions from this module.', es: 'Tres preguntas de este módulo.' } },
  /* m5 */
  { id: 'm5-l1', moduleId: 'm5', order: 1, kind: 'text', minutes: 4, title: { en: 'Confidentiality and client data', es: 'Confidencialidad y datos del cliente' },
    summary: { en: 'Treat names, phones, addresses and finances like your own family\'s. Own computer, private network, nothing copied out, a leak reported within the hour.', es: 'Trata nombres, teléfonos, direcciones y finanzas como si fueran de tu familia. Tu computadora, red privada, nada copiado fuera, una filtración se reporta en menos de una hora.' } },
  { id: 'm5-l2', moduleId: 'm5', order: 2, kind: 'text', minutes: 3, title: { en: 'When life happens', es: 'Cuando la vida pasa' },
    summary: { en: 'Message before your start time, not after. Backup internet. Days off declared 10 business days ahead. A client who crosses a line: tell us the same day.', es: 'Avisa antes de tu hora de inicio, no después. Internet de respaldo. Días libres declarados con 10 días hábiles. Un cliente que cruza una línea: dinos el mismo día.' } },
  { id: 'm5-l3', moduleId: 'm5', order: 3, kind: 'text', minutes: 4, title: { en: 'What you may and may not do in your client\'s state', es: 'Qué puedes y qué no puedes hacer en el estado de tu cliente' },
    summary: { en: 'The scope card: unlicensed assistants may not negotiate, interpret contracts or, in some states, cold-call for listings. Read your card at every login until you acknowledge it.', es: 'La tarjeta de alcance: los asistentes sin licencia no negocian, no interpretan contratos y, en algunos estados, no hacen llamadas en frío para listados. Lee tu tarjeta en cada inicio de sesión hasta confirmarla.' } },
  { id: 'm5-l4', moduleId: 'm5', order: 4, kind: 'signoff', minutes: 1, title: { en: 'My commitment', es: 'Mi compromiso' },
    summary: { en: 'I will protect client information, communicate early and clearly, track my time honestly, and ask for help when I need it.', es: 'Protegeré la información de los clientes, me comunicaré a tiempo y con claridad, registraré mis horas con honestidad y pediré ayuda cuando la necesite.' } },

  /* m6: In the buyer's shoes */
  { id: 'm6-l1', moduleId: 'm6', order: 1, kind: 'text', minutes: 3, title: { en: '11:14 PM, a couch in your client\'s area', es: '11:14 PM, un sofá en la zona de tu cliente' },
    summary: { en: 'Rent went up again. Three years of saving and they still do not know if it is enough. They tap "Contact agent". One phone rings: it is you, on your client\'s behalf.', es: 'La renta subió otra vez. Tres años ahorrando y aún no saben si alcanza. Tocan "Contact agent". Suena un teléfono: eres tú, en nombre de tu cliente.' } },
  { id: 'm6-l2', moduleId: 'm6', order: 2, kind: 'text', minutes: 3, title: { en: 'A.L.M. on every call', es: 'A.L.M. en cada llamada' },
    summary: { en: 'Appointment: always work toward setting one. Location: where they want to buy. Motivation: their goals, their situation, why now.', es: 'Appointment: siempre trabaja para agendar una cita. Location: dónde quieren comprar. Motivation: sus metas, su situación, por qué ahora.' } },
  { id: 'm6-l3', moduleId: 'm6', order: 3, kind: 'text', minutes: 4, title: { en: 'Five buyer truths', es: 'Cinco verdades del comprador' },
    summary: { en: 'Overwhelmed, not unmotivated. Education over pressure. Guidance, not sales. Trust through math. Every inquiry matters, at every price point.', es: 'Abrumado, no desmotivado. Educación antes que presión. Guía, no venta. Confianza con números. Cada consulta importa, a cualquier precio.' } },
  { id: 'm6-l4', moduleId: 'm6', order: 4, kind: 'task', minutes: 3, title: { en: 'Your turn: Maria texts back', es: 'Tu turno: Maria responde' },
    summary: { en: 'A practice text. "Honestly not sure we can afford anything right now. Is it even worth talking?" Pick the reply that asks what is making it feel hard and offers to meet.', es: 'Un mensaje de práctica. "La verdad no sé si podemos pagar algo ahora. ¿Vale la pena hablar?" Elige la respuesta que pregunta qué lo hace difícil y ofrece reunirse.' } },
  { id: 'm6-l5', moduleId: 'm6', order: 5, kind: 'text', minutes: 2, title: { en: '"I already have an agent"', es: '"Ya tengo agente"' },
    summary: { en: 'Never let that lead go. Note it, tell your client the same day, and keep it in the follow-up plan your client sets.', es: 'Nunca sueltes ese lead. Anótalo, avísale a tu cliente el mismo día y mantenlo en el plan de seguimiento que tu cliente defina.' } },
  { id: 'm6-l6', moduleId: 'm6', order: 6, kind: 'quiz', minutes: 3, title: { en: 'Chapter quiz', es: 'Examen del capítulo' }, summary: { en: 'Five questions written from this chapter\'s screens.', es: 'Cinco preguntas escritas a partir de las pantallas de este capítulo.' } },

  /* m7: Speed to lead */
  { id: 'm7-l1', moduleId: 'm7', order: 1, kind: 'text', minutes: 3, title: { en: 'The first to call usually wins the client', es: 'El primero que llama suele ganar al cliente' },
    summary: { en: 'Most agents waste their first leads learning by trial and error. Fast is a habit; this chapter builds it before the first lead arrives.', es: 'La mayoría de los agentes desperdician sus primeros leads aprendiendo a prueba y error. La rapidez es un hábito; este capítulo lo construye antes de que llegue el primer lead.' } },
  { id: 'm7-l2', moduleId: 'm7', order: 2, kind: 'text', minutes: 4, title: { en: 'Five minutes, 60 seconds, four touches', es: 'Cinco minutos, 60 segundos, cuatro toques' },
    summary: { en: 'New lead: call within five minutes, text within five, email within the hour. Missed a live call? Call back inside 60 seconds. Four touches in the first 24 hours.', es: 'Lead nuevo: llamada en cinco minutos, mensaje en cinco, correo en la hora. ¿Se te fue una llamada en vivo? Devuélvela en 60 segundos. Cuatro toques en las primeras 24 horas.' } },
  { id: 'm7-l3', moduleId: 'm7', order: 3, kind: 'text', minutes: 3, title: { en: 'The reply rule: two hours', es: 'La regla de respuesta: dos horas' },
    summary: { en: 'A lead who texts gets a reply within two hours, and the reply asks for the appointment. "Next week" is a lost client.', es: 'Un lead que escribe recibe respuesta en dos horas, y la respuesta pide la cita. "La próxima semana" es un cliente perdido.' } },
  { id: 'm7-l4', moduleId: 'm7', order: 4, kind: 'text', minutes: 3, title: { en: 'Text templates with your client\'s name', es: 'Plantillas de mensajes con el nombre de tu cliente' },
    summary: { en: '"Hi {first}, this is {you} with {client team}. You asked about {address}. I can show it today or tomorrow, which works?" Voicemail in 12 seconds, then a question by text.', es: '"Hi {first}, this is {you} with {client team}. You asked about {address}. I can show it today or tomorrow, which works?" Buzón de voz en 12 segundos, luego una pregunta por mensaje.' } },
  { id: 'm7-l5', moduleId: 'm7', order: 5, kind: 'task', minutes: 3, title: { en: 'Your turn: Dana has been waiting', es: 'Tu turno: Dana lleva esperando' },
    summary: { en: 'Dana texted three hours ago about the house on 10th Street. Pick the reply that apologizes once, confirms, and offers two times.', es: 'Dana escribió hace tres horas por la casa de 10th Street. Elige la respuesta que se disculpa una vez, confirma y ofrece dos horarios.' } },
  { id: 'm7-l6', moduleId: 'm7', order: 6, kind: 'quiz', minutes: 3, title: { en: 'Chapter quiz', es: 'Examen del capítulo' }, summary: { en: 'Five questions written from this chapter\'s screens.', es: 'Cinco preguntas escritas a partir de las pantallas de este capítulo.' } },

  /* m8: Conversations that set appointments */
  { id: 'm8-l1', moduleId: 'm8', order: 1, kind: 'text', minutes: 3, title: { en: 'Two-minute conversations beat ten dials', es: 'Dos minutos de conversación valen más que diez marcaciones' },
    summary: { en: 'A conversation is two minutes or more. Dials are the input you control; conversations are what moves appointments.', es: 'Una conversación dura dos minutos o más. Las marcaciones son lo que controlas; las conversaciones son lo que mueve las citas.' } },
  { id: 'm8-l2', moduleId: 'm8', order: 2, kind: 'text', minutes: 4, title: { en: 'The power hour', es: 'La hora de poder' },
    summary: { en: 'Same time every day. The "call now" list first, top to bottom, then the warm lists. A.L.M. on every call; an appointment asked for on every call.', es: 'A la misma hora cada día. Primero la lista "llamar ahora", de arriba abajo, luego las listas tibias. A.L.M. en cada llamada; una cita pedida en cada llamada.' } },
  { id: 'm8-l3', moduleId: 'm8', order: 3, kind: 'text', minutes: 4, title: { en: 'Turn the connection into a showing', es: 'Convierte la conexión en una visita' },
    summary: { en: 'Ask for the tour before you qualify: "Want to see it tomorrow at 4 or 6?" Two times, never "when works for you". Say the word appointment on the call.', es: 'Pide la visita antes de calificar: "¿Quieres verla mañana a las 4 o a las 6?" Dos horarios, nunca "cuando te convenga". Di la palabra cita en la llamada.' } },
  { id: 'm8-l4', moduleId: 'm8', order: 4, kind: 'text', minutes: 2, title: { en: 'Confirm the night before', es: 'Confirma la noche anterior' },
    summary: { en: 'A text the night before with the address and a photo. No-shows are set appointments that nobody confirmed.', es: 'Un mensaje la noche anterior con la dirección y una foto. Las citas fallidas son citas agendadas que nadie confirmó.' } },
  { id: 'm8-l5', moduleId: 'm8', order: 5, kind: 'quiz', minutes: 3, title: { en: 'Chapter quiz', es: 'Examen del capítulo' }, summary: { en: 'Five questions written from this chapter\'s screens.', es: 'Cinco preguntas escritas a partir de las pantallas de este capítulo.' } },

  /* m9: The financing conversation */
  { id: 'm9-l1', moduleId: 'm9', order: 1, kind: 'text', minutes: 3, title: { en: 'The 20-second financing conversation', es: 'La conversación de financiamiento de 20 segundos' },
    summary: { en: 'After the tour is booked: "Have you talked to a lender yet? Most clients get a verified pre-approval before touring so the offer is ready the day they find the one."', es: 'Después de agendar la visita: "Have you talked to a lender yet? Most clients get a verified pre-approval before touring so the offer is ready the day they find the one."' } },
  { id: 'm9-l2', moduleId: 'm9', order: 2, kind: 'text', minutes: 3, title: { en: 'Always the client\'s choice of lender', es: 'Siempre el prestamista que el cliente elija' },
    summary: { en: 'Offer your client\'s preferred lender as one option and say it out loud: "You can use any lender you like." A pre-approval is a boarding pass, not takeoff: ask what was verified.', es: 'Ofrece el prestamista preferido de tu cliente como una opción y dilo en voz alta: "You can use any lender you like." Una pre-aprobación es un pase de abordar, no el despegue: pregunta qué se verificó.' } },
  { id: 'm9-l3', moduleId: 'm9', order: 3, kind: 'task', minutes: 3, title: { en: 'Your turn: the lender question', es: 'Tu turno: la pregunta del prestamista' },
    summary: { en: '"My cousin said we HAVE to use your team\'s lender?" Pick the reply that says no, offers an introduction to compare, and leaves the choice with them.', es: '"¿Mi primo dice que TENEMOS que usar el prestamista de tu equipo?" Elige la respuesta que dice que no, ofrece una presentación para comparar y les deja la decisión.' } },
  { id: 'm9-l4', moduleId: 'm9', order: 4, kind: 'quiz', minutes: 2, title: { en: 'Chapter quiz', es: 'Examen del capítulo' }, summary: { en: 'Five questions written from this chapter\'s screens.', es: 'Cinco preguntas escritas a partir de las pantallas de este capítulo.' } },

  /* m10: Mastering objections */
  { id: 'm10-l1', moduleId: 'm10', order: 1, kind: 'text', minutes: 4, title: { en: 'Ask, listen, mirror', es: 'Pregunta, escucha, refleja' },
    summary: { en: 'An objection is a question in disguise. Ask what is behind it, listen without filling the silence, mirror their words back before you answer.', es: 'Una objeción es una pregunta disfrazada. Pregunta qué hay detrás, escucha sin llenar el silencio, refleja sus palabras antes de responder.' } },
  { id: 'm10-l2', moduleId: 'm10', order: 2, kind: 'text', minutes: 4, title: { en: 'Acknowledge, pivot, appointment', es: 'Reconoce, redirige, cita' },
    summary: { en: 'Acknowledge the concern in one sentence, pivot to the real question, and ask for the appointment where the numbers can be shown.', es: 'Reconoce la preocupación en una frase, redirige a la verdadera pregunta y pide la cita donde se pueden mostrar los números.' } },
  { id: 'm10-l3', moduleId: 'm10', order: 3, kind: 'text', minutes: 3, title: { en: '"Prices are too high" means three things', es: '"Los precios están muy altos" significa tres cosas' },
    summary: { en: 'The asking price, the monthly payment, or what you get for the money. Ask which, then let the answer change your approach. A prediction about rates is not a fact, and it is pressure.', es: 'El precio de lista, el pago mensual o lo que recibes por el dinero. Pregunta cuál y deja que la respuesta cambie tu enfoque. Una predicción sobre tasas no es un hecho, y es presión.' } },
  { id: 'm10-l4', moduleId: 'm10', order: 4, kind: 'task', minutes: 3, title: { en: 'Your turn: Marcus wants to wait', es: 'Tu turno: Marcus quiere esperar' },
    summary: { en: '"Honestly prices are just too high right now. We are going to wait." Pick the reply that asks which part feels too high and offers to run the real numbers.', es: '"La verdad los precios están muy altos ahora. Vamos a esperar." Elige la respuesta que pregunta qué parte se siente alta y ofrece revisar los números reales.' } },
  { id: 'm10-l5', moduleId: 'm10', order: 5, kind: 'task', minutes: 2, title: { en: 'Practice one objection a week, out loud', es: 'Practica una objeción por semana, en voz alta' },
    summary: { en: 'With your buddy or your coach: "we\'re just looking", "send me the info", "we\'ll wait for rates to drop", "I already have an agent", "call me in six months".', es: 'Con tu buddy o tu coach: "solo estamos viendo", "mándame la información", "vamos a esperar a que bajen las tasas", "ya tengo agente", "llámame en seis meses".' } },
  { id: 'm10-l6', moduleId: 'm10', order: 6, kind: 'quiz', minutes: 3, title: { en: 'Chapter quiz', es: 'Examen del capítulo' }, summary: { en: 'Five questions written from this chapter\'s screens.', es: 'Cinco preguntas escritas a partir de las pantallas de este capítulo.' } },

  /* m11: Working with sellers */
  { id: 'm11-l1', moduleId: 'm11', order: 1, kind: 'text', minutes: 4, title: { en: 'Who calls about selling, and why', es: 'Quién llama para vender, y por qué' },
    summary: { en: 'Moving for work, a bigger or smaller home, an inheritance, a divorce, a landlord done with tenants, "just curious what it is worth". The reason sets the timeline; ask for it early.', es: 'Mudanza por trabajo, una casa más grande o más pequeña, una herencia, un divorcio, un arrendador cansado de inquilinos, "solo curiosidad por cuánto vale". La razón define el tiempo; pregúntala temprano.' } },
  { id: 'm11-l2', moduleId: 'm11', order: 2, kind: 'text', minutes: 4, title: { en: 'The listing appointment ask', es: 'Cómo pedir la cita de listado' },
    summary: { en: 'You do not quote a price; your client does, at the home. "The agent can walk the property and show you what it would sell for today. Tuesday at 5 or Thursday at 6?"', es: 'Tú no das un precio; lo da tu cliente, en la propiedad. "The agent can walk the property and show you what it would sell for today. Tuesday at 5 or Thursday at 6?"' } },
  { id: 'm11-l3', moduleId: 'm11', order: 3, kind: 'text', minutes: 3, title: { en: 'Follow-up that respects their timeline', es: 'Seguimiento que respeta sus tiempos' },
    summary: { en: '"Not for six months" is a date, not a no. Put it in the CRM with a next action, send something useful in between, and never pressure a seller who said when.', es: '"En seis meses" es una fecha, no un no. Ponla en el CRM con una siguiente acción, envía algo útil entre tanto y nunca presiones a un vendedor que ya dijo cuándo.' } },
  { id: 'm11-l4', moduleId: 'm11', order: 4, kind: 'task', minutes: 3, title: { en: 'Your turn: "we\'re just testing the market"', es: 'Tu turno: "solo estamos probando el mercado"' },
    summary: { en: 'Pick the reply that takes the test seriously, offers the agent\'s walk-through as the fastest way to know, and gives two times.', es: 'Elige la respuesta que toma la prueba en serio, ofrece el recorrido del agente como la forma más rápida de saber y da dos horarios.' } },
  { id: 'm11-l5', moduleId: 'm11', order: 5, kind: 'quiz', minutes: 3, title: { en: 'Chapter quiz', es: 'Examen del capítulo' }, summary: { en: 'Five questions written from this chapter\'s screens.', es: 'Cinco preguntas escritas a partir de las pantallas de este capítulo.' } },

  /* m12: CRM discipline */
  { id: 'm12-l1', moduleId: 'm12', order: 1, kind: 'text', minutes: 3, title: { en: 'If it is not in the CRM, it did not happen', es: 'Si no está en el CRM, no pasó' },
    summary: { en: 'Every call, text, note, stage change and task counts. Your client\'s dashboards, and your own numbers in HQ, only see what you log.', es: 'Cada llamada, mensaje, nota, cambio de etapa y tarea cuenta. Los tableros de tu cliente, y tus propios números en HQ, solo ven lo que registras.' } },
  { id: 'm12-l2', moduleId: 'm12', order: 2, kind: 'text', minutes: 3, title: { en: 'Five updates per connection, stages the same day', es: 'Cinco actualizaciones por conexión, etapas el mismo día' },
    summary: { en: 'Aim for five to eight updates per new connection in the first month. Move the stage the day it changes. Every lead touched inside 10 days.', es: 'Apunta a cinco a ocho actualizaciones por conexión nueva en el primer mes. Mueve la etapa el día que cambia. Cada lead tocado en menos de 10 días.' } },
  { id: 'm12-l3', moduleId: 'm12', order: 3, kind: 'text', minutes: 3, title: { en: 'Close the day in 10 minutes', es: 'Cierra el día en 10 minutos' },
    summary: { en: 'Notes short and factual: "Called, no answer, left VM, texted. Next: call Thu." Write tomorrow\'s first three calls. Then send the daily report.', es: 'Notas cortas y factuales: "Called, no answer, left VM, texted. Next: call Thu." Escribe las primeras tres llamadas de mañana. Luego envía el reporte diario.' } },
  { id: 'm12-l4', moduleId: 'm12', order: 4, kind: 'quiz', minutes: 2, title: { en: 'Chapter quiz', es: 'Examen del capítulo' }, summary: { en: 'Five questions written from this chapter\'s screens.', es: 'Cinco preguntas escritas a partir de las pantallas de este capítulo.' } },

  /* m13: Client recovery */
  { id: 'm13-l1', moduleId: 'm13', order: 1, kind: 'text', minutes: 3, title: { en: 'Own it, name what it cost them', es: 'Asúmelo, nombra lo que les costó' },
    summary: { en: 'Apologize promptly. No excuses, no gifts, no long story. Say the impact on them out loud; they know, and saying it shows you do too.', es: 'Discúlpate pronto. Sin excusas, sin regalos, sin historia larga. Di en voz alta el impacto para ellos; lo saben, y decirlo muestra que tú también.' } },
  { id: 'm13-l2', moduleId: 'm13', order: 2, kind: 'text', minutes: 3, title: { en: 'Fix the process, give them a reason to respond', es: 'Corrige el proceso, dales una razón para responder' },
    summary: { en: 'Name the correction you already made ("every appointment goes in the calendar before the call ends"). Offer a useful next step, not a plea, and leave room for their answer.', es: 'Nombra la corrección que ya hiciste ("cada cita va al calendario antes de colgar"). Ofrece un siguiente paso útil, no una súplica, y deja espacio para su respuesta.' } },
  { id: 'm13-l3', moduleId: 'm13', order: 3, kind: 'quiz', minutes: 2, title: { en: 'Chapter quiz', es: 'Examen del capítulo' }, summary: { en: 'Five questions written from this chapter\'s screens.', es: 'Cinco preguntas escritas a partir de las pantallas de este capítulo.' } },

  /* m14: Calling rules and certification */
  { id: 'm14-l1', moduleId: 'm14', order: 1, kind: 'text', minutes: 3, title: { en: 'Identify yourself, disclose the recording', es: 'Identifícate, avisa de la grabación' },
    summary: { en: 'Your name and your client\'s team within the first 30 seconds. Where calls are recorded, say so the way your client\'s script does, every time.', es: 'Tu nombre y el equipo de tu cliente en los primeros 30 segundos. Donde las llamadas se graban, dilo como lo marca el guion de tu cliente, cada vez.' } },
  { id: 'm14-l2', moduleId: 'm14', order: 2, kind: 'text', minutes: 4, title: { en: 'Do-not-call, opt-outs and calling hours', es: 'No-llamar, bajas y horarios de llamada' },
    summary: { en: 'Outbound only on a list scrubbed within 31 days. "Take me off your list" is honored the same day and logged. Calling hours are the client\'s state\'s, not yours.', es: 'Salientes solo en una lista depurada hace menos de 31 días. "Quítame de tu lista" se cumple el mismo día y se registra. Los horarios de llamada son los del estado del cliente, no los tuyos.' } },
  { id: 'm14-l3', moduleId: 'm14', order: 3, kind: 'text', minutes: 3, title: { en: 'Your client\'s state scope card', es: 'La tarjeta de alcance del estado de tu cliente' },
    summary: { en: 'Texas: no cold-calling for listings or buyers by an unlicensed assistant. Florida: outbound only under the signed addendum. California: scrubbed lists, 8 AM to 9 PM, identify, honor opt-outs.', es: 'Texas: sin llamadas en frío para listados o compradores por un asistente sin licencia. Florida: salientes solo bajo la adenda firmada. California: listas depuradas, 8 AM a 9 PM, identifícate, respeta las bajas.' } },
  { id: 'm14-l4', moduleId: 'm14', order: 4, kind: 'task', minutes: 60, title: { en: 'Supervised dialing: six sessions with your coach', es: 'Marcación supervisada: seis sesiones con tu coach' },
    summary: { en: 'Six live sessions on the coach\'s line. Three scored calls per session on identification, script, do-not-call handling, recording disclosure and the appointment handoff.', es: 'Seis sesiones en vivo en la línea del coach. Tres llamadas evaluadas por sesión en identificación, guion, manejo de no-llamar, aviso de grabación y entrega de la cita.' } },
  { id: 'm14-l5', moduleId: 'm14', order: 5, kind: 'signoff', minutes: 1, title: { en: 'ISA certification', es: 'Certificación ISA' },
    summary: { en: 'The coach signs off after six sessions with an average score of 8 or more. This sets your ISA-certified flag on the bench page.', es: 'El coach firma después de seis sesiones con un promedio de 8 o más. Esto activa tu bandera de certificado ISA en la página de banca.' } }
];

/* Progress per person. Foundation = m1-m5 (every certified VA); ISA track = m6-m14 (Mariela, Kevin, Fernanda).
   Carlos is in module 4; Camila and Marco (November cohort) have started. Dates spread one lesson a day from a start. */
(function () {
  var lessons = HQD.academyLessons;
  function spread(fromIso, moduleIds, lastScore) {
    var out = {}; var d = new Date(fromIso + 'T12:00:00Z'); var i = 0;
    lessons.filter(function (l) { return moduleIds.indexOf(l.moduleId) >= 0; }).forEach(function (l) {
      if (i && i % 2 === 0) d = new Date(d.getTime() + 86400000);
      var e = { done: true, at: d.toISOString().slice(0, 10) };
      if (l.kind === 'quiz') e.score = lastScore || 90;
      out[l.id] = e; i++;
    });
    return out;
  }
  var core = ['m1', 'm2', 'm3', 'm4', 'm5'], isa = ['m6', 'm7', 'm8', 'm9', 'm10', 'm11', 'm12', 'm13', 'm14'];
  var p = {};
  p['u-mariela'] = Object.assign(spread('2026-07-20', core, 95), spread('2026-08-03', isa, 92));
  p['u-fernanda'] = Object.assign(spread('2026-07-20', core, 85), spread('2026-08-03', isa, 80));
  p['u-kevin'] = Object.assign(spread('2026-09-21', core, 90), spread('2026-09-29', isa, 94));
  p['u-jose'] = spread('2026-07-20', core, 85);
  p['u-andrea'] = spread('2026-09-14', core, 100);
  p['u-lucia'] = spread('2026-09-28', core, 90);
  p['u-carlos'] = spread('2026-10-06', ['m1', 'm2', 'm3'], 80);
  p['u-carlos']['m4-l1'] = { done: true, at: '2026-10-19' };
  p['u-carlos']['m4-l2'] = { done: true, at: '2026-10-20' };
  p['a-camila'] = { 'm1-l1': { done: true, at: '2026-10-18' }, 'm1-l2': { done: true, at: '2026-10-20' } };
  p['a-marco'] = { 'm1-l1': { done: true, at: '2026-10-13' }, 'm1-l2': { done: true, at: '2026-10-14' }, 'm1-l3': { done: true, at: '2026-10-15', score: 80 }, 'm2-l1': { done: true, at: '2026-10-19' } };
  HQD.academyProgress = p;
})();
