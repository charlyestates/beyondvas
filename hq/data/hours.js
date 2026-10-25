/* BeyondVAs HQ prototype: hours, approvals, blocks, invoices, true-ups and payout runs.
   Ids for people, clients and placements come from core.js. Clock times are in the client's time zone.
   Today is Wednesday 2026-10-21. */
window.HQD = window.HQD || {};

/* Nightly tracker import. Two entries per workday (before and after lunch). minutes = end - start minus logged gaps.
   onCallMinutes only for ISAs (p-rod-2). Entries in progress today have end:null and minutes:null. */
HQD.timeEntries = [
  /* Week Oct 5-11 */
  { id: 'te-0001', placementId: 'p-rod-2',  date: '2026-10-05', start: '08:02', end: '12:01', tz: 'America/Los_Angeles', minutes: 239, activity: 68, onCallMinutes: 162, flag: null, note: null },
  { id: 'te-0002', placementId: 'p-rod-2',  date: '2026-10-05', start: '12:58', end: '17:03', tz: 'America/Los_Angeles', minutes: 245, activity: 71, onCallMinutes: 150, flag: null, note: null },
  { id: 'te-0003', placementId: 'p-lone-1', date: '2026-10-05', start: '09:01', end: '12:03', tz: 'America/Chicago',     minutes: 182, activity: 82, onCallMinutes: 0, flag: null, note: null },
  { id: 'te-0004', placementId: 'p-lone-1', date: '2026-10-05', start: '12:18', end: '15:12', tz: 'America/Chicago',     minutes: 174, activity: 79, onCallMinutes: 0, flag: null, note: null },
  { id: 'te-0005', placementId: 'p-sun-1',  date: '2026-10-05', start: '09:02', end: '13:01', tz: 'America/New_York',    minutes: 239, activity: 84, onCallMinutes: 0, flag: null, note: null },
  { id: 'te-0006', placementId: 'p-sun-1',  date: '2026-10-05', start: '14:00', end: '18:02', tz: 'America/New_York',    minutes: 242, activity: 81, onCallMinutes: 0, flag: null, note: null },

  { id: 'te-0007', placementId: 'p-rod-2',  date: '2026-10-06', start: '07:58', end: '12:04', tz: 'America/Los_Angeles', minutes: 246, activity: 74, onCallMinutes: 171, flag: null, note: null },
  { id: 'te-0008', placementId: 'p-rod-2',  date: '2026-10-06', start: '13:01', end: '17:00', tz: 'America/Los_Angeles', minutes: 239, activity: 66, onCallMinutes: 144, flag: null, note: null },
  { id: 'te-0009', placementId: 'p-lone-1', date: '2026-10-06', start: '08:58', end: '12:00', tz: 'America/Chicago',     minutes: 182, activity: 85, onCallMinutes: 0, flag: null, note: null },
  { id: 'te-0010', placementId: 'p-lone-1', date: '2026-10-06', start: '12:16', end: '15:08', tz: 'America/Chicago',     minutes: 172, activity: 81, onCallMinutes: 0, flag: null, note: null },
  { id: 'te-0011', placementId: 'p-sun-1',  date: '2026-10-06', start: '08:59', end: '13:00', tz: 'America/New_York',    minutes: 241, activity: 88, onCallMinutes: 0, flag: null, note: null },
  { id: 'te-0012', placementId: 'p-sun-1',  date: '2026-10-06', start: '14:03', end: '18:00', tz: 'America/New_York',    minutes: 237, activity: 79, onCallMinutes: 0, flag: null, note: null },

  { id: 'te-0013', placementId: 'p-rod-2',  date: '2026-10-07', start: '08:00', end: '12:00', tz: 'America/Los_Angeles', minutes: 240, activity: 70, onCallMinutes: 158, flag: null, note: null },
  { id: 'te-0014', placementId: 'p-rod-2',  date: '2026-10-07', start: '13:04', end: '17:06', tz: 'America/Los_Angeles', minutes: 242, activity: 73, onCallMinutes: 162, flag: null, note: null },
  { id: 'te-0015', placementId: 'p-lone-1', date: '2026-10-07', start: '09:00', end: '12:02', tz: 'America/Chicago',     minutes: 182, activity: 78, onCallMinutes: 0, flag: null, note: null },
  { id: 'te-0016', placementId: 'p-lone-1', date: '2026-10-07', start: '12:20', end: '15:15', tz: 'America/Chicago',     minutes: 175, activity: 84, onCallMinutes: 0, flag: null, note: null },
  { id: 'te-0017', placementId: 'p-sun-1',  date: '2026-10-07', start: '09:00', end: '13:03', tz: 'America/New_York',    minutes: 243, activity: 82, onCallMinutes: 0, flag: null, note: null },
  { id: 'te-0018', placementId: 'p-sun-1',  date: '2026-10-07', start: '13:58', end: '18:05', tz: 'America/New_York',    minutes: 247, activity: 85, onCallMinutes: 0, flag: null, note: null },

  { id: 'te-0019', placementId: 'p-rod-2',  date: '2026-10-08', start: '08:03', end: '12:02', tz: 'America/Los_Angeles', minutes: 214, activity: 64, onCallMinutes: 131, flag: 'outage',
    note: { en: 'Internet drop 10:12 to 10:37 (25 min, logged as outage out-001); minutes exclude the gap.', es: 'Caída de internet de 10:12 a 10:37 (25 min, registrada como interrupción out-001); los minutos excluyen la pausa.' } },
  { id: 'te-0020', placementId: 'p-rod-2',  date: '2026-10-08', start: '13:00', end: '17:01', tz: 'America/Los_Angeles', minutes: 241, activity: 69, onCallMinutes: 149, flag: null, note: null },
  { id: 'te-0021', placementId: 'p-lone-1', date: '2026-10-08', start: '09:02', end: '12:01', tz: 'America/Chicago',     minutes: 179, activity: 83, onCallMinutes: 0, flag: null, note: null },
  { id: 'te-0022', placementId: 'p-lone-1', date: '2026-10-08', start: '12:17', end: '15:10', tz: 'America/Chicago',     minutes: 173, activity: 80, onCallMinutes: 0, flag: null, note: null },
  { id: 'te-0023', placementId: 'p-sun-1',  date: '2026-10-08', start: '09:01', end: '12:58', tz: 'America/New_York',    minutes: 237, activity: 86, onCallMinutes: 0, flag: null, note: null },
  { id: 'te-0024', placementId: 'p-sun-1',  date: '2026-10-08', start: '14:01', end: '18:10', tz: 'America/New_York',    minutes: 249, activity: 83, onCallMinutes: 0, flag: null, note: null },

  { id: 'te-0025', placementId: 'p-rod-2',  date: '2026-10-09', start: '08:01', end: '12:03', tz: 'America/Los_Angeles', minutes: 242, activity: 72, onCallMinutes: 167, flag: null, note: null },
  { id: 'te-0026', placementId: 'p-rod-2',  date: '2026-10-09', start: '12:59', end: '16:56', tz: 'America/Los_Angeles', minutes: 237, activity: 65, onCallMinutes: 140, flag: null, note: null },
  { id: 'te-0027', placementId: 'p-lone-1', date: '2026-10-09', start: '09:00', end: '12:04', tz: 'America/Chicago',     minutes: 184, activity: 86, onCallMinutes: 0, flag: null, note: null },
  { id: 'te-0028', placementId: 'p-lone-1', date: '2026-10-09', start: '12:19', end: '15:06', tz: 'America/Chicago',     minutes: 167, activity: 77, onCallMinutes: 0, flag: null, note: null },
  { id: 'te-0029', placementId: 'p-sun-1',  date: '2026-10-09', start: '09:00', end: '13:02', tz: 'America/New_York',    minutes: 242, activity: 80, onCallMinutes: 0, flag: null, note: null },
  { id: 'te-0030', placementId: 'p-sun-1',  date: '2026-10-09', start: '14:02', end: '18:00', tz: 'America/New_York',    minutes: 238, activity: 77, onCallMinutes: 0, flag: 'manual-edit',
    note: { en: 'Forgot to clock out; the tracker ran until 21:47. End time corrected to 18:00 by Daniela on Oct 12. Reason: Andrea confirmed she stopped at 6 PM; idle screenshots after that.', es: 'Olvidó detener el reloj; el tracker siguió hasta las 21:47. Hora de salida corregida a 18:00 por Daniela el 12 de octubre. Motivo: Andrea confirmó que terminó a las 6 PM; capturas inactivas después de esa hora.' },
    edit: { by: 'u-daniela', at: '2026-10-12T09:48:00-06:00', originalEnd: '21:47', originalMinutes: 465, reason: { en: 'VA forgot to clock out; idle after 18:00.', es: 'La VA olvidó detener el reloj; inactiva después de las 18:00.' } } },

  /* Week Oct 12-18 */
  { id: 'te-0031', placementId: 'p-rod-2',  date: '2026-10-12', start: '07:57', end: '12:02', tz: 'America/Los_Angeles', minutes: 245, activity: 71, onCallMinutes: 168, flag: null, note: null },
  { id: 'te-0032', placementId: 'p-rod-2',  date: '2026-10-12', start: '12:55', end: '17:10', tz: 'America/Los_Angeles', minutes: 255, activity: 70, onCallMinutes: 161, flag: null, note: null },
  { id: 'te-0033', placementId: 'p-lone-1', date: '2026-10-12', start: '09:00', end: '12:02', tz: 'America/Chicago',     minutes: 182, activity: 84, onCallMinutes: 0, flag: null, note: null },
  { id: 'te-0034', placementId: 'p-lone-1', date: '2026-10-12', start: '12:18', end: '15:11', tz: 'America/Chicago',     minutes: 173, activity: 80, onCallMinutes: 0, flag: null, note: null },
  { id: 'te-0035', placementId: 'p-sun-1',  date: '2026-10-12', start: '09:01', end: '13:00', tz: 'America/New_York',    minutes: 239, activity: 85, onCallMinutes: 0, flag: null, note: null },
  { id: 'te-0036', placementId: 'p-sun-1',  date: '2026-10-12', start: '14:02', end: '18:03', tz: 'America/New_York',    minutes: 241, activity: 82, onCallMinutes: 0, flag: null, note: null },

  { id: 'te-0037', placementId: 'p-rod-2',  date: '2026-10-13', start: '08:00', end: '12:05', tz: 'America/Los_Angeles', minutes: 245, activity: 69, onCallMinutes: 160, flag: null, note: null },
  { id: 'te-0038', placementId: 'p-rod-2',  date: '2026-10-13', start: '13:00', end: '17:12', tz: 'America/Los_Angeles', minutes: 252, activity: 72, onCallMinutes: 158, flag: null, note: null },
  { id: 'te-0039', placementId: 'p-lone-1', date: '2026-10-13', start: '09:03', end: '12:05', tz: 'America/Chicago',     minutes: 182, activity: 81, onCallMinutes: 0, flag: null, note: null },
  { id: 'te-0040', placementId: 'p-lone-1', date: '2026-10-13', start: '12:21', end: '15:14', tz: 'America/Chicago',     minutes: 173, activity: 83, onCallMinutes: 0, flag: null, note: null },
  { id: 'te-0041', placementId: 'p-sun-1',  date: '2026-10-13', start: '09:00', end: '13:02', tz: 'America/New_York',    minutes: 242, activity: 87, onCallMinutes: 0, flag: null, note: null },
  { id: 'te-0042', placementId: 'p-sun-1',  date: '2026-10-13', start: '13:59', end: '18:00', tz: 'America/New_York',    minutes: 241, activity: 80, onCallMinutes: 0, flag: null, note: null },

  { id: 'te-0043', placementId: 'p-rod-2',  date: '2026-10-14', start: '08:02', end: '12:00', tz: 'America/Los_Angeles', minutes: 238, activity: 73, onCallMinutes: 170, flag: null, note: null },
  { id: 'te-0044', placementId: 'p-rod-2',  date: '2026-10-14', start: '13:02', end: '17:08', tz: 'America/Los_Angeles', minutes: 246, activity: 41, onCallMinutes: 96, flag: 'low-activity',
    note: { en: 'Low activity 14:10 to 15:20 outside call time: researching a farm area on the county parcel map for next week\'s circle prospecting. Reviewed with Ana on Oct 15; resolved, no deduction.', es: 'Actividad baja de 14:10 a 15:20 fuera del horario de llamadas: investigando una zona de prospección en el mapa de parcelas del condado para la prospección de círculo de la próxima semana. Revisado con Ana el 15 de octubre; resuelto, sin descuento.' } },
  { id: 'te-0045', placementId: 'p-lone-1', date: '2026-10-14', start: '08:59', end: '12:00', tz: 'America/Chicago',     minutes: 181, activity: 87, onCallMinutes: 0, flag: null, note: null },
  { id: 'te-0046', placementId: 'p-lone-1', date: '2026-10-14', start: '12:17', end: '15:08', tz: 'America/Chicago',     minutes: 171, activity: 79, onCallMinutes: 0, flag: null, note: null },
  { id: 'te-0047', placementId: 'p-sun-1',  date: '2026-10-14', start: '09:03', end: '13:01', tz: 'America/New_York',    minutes: 238, activity: 83, onCallMinutes: 0, flag: null, note: null },
  { id: 'te-0048', placementId: 'p-sun-1',  date: '2026-10-14', start: '14:00', end: '18:04', tz: 'America/New_York',    minutes: 244, activity: 86, onCallMinutes: 0, flag: null, note: null },

  { id: 'te-0049', placementId: 'p-rod-2',  date: '2026-10-15', start: '07:59', end: '12:03', tz: 'America/Los_Angeles', minutes: 244, activity: 75, onCallMinutes: 175, flag: null, note: null },
  { id: 'te-0050', placementId: 'p-rod-2',  date: '2026-10-15', start: '12:58', end: '17:15', tz: 'America/Los_Angeles', minutes: 257, activity: 70, onCallMinutes: 166, flag: null, note: null },
  { id: 'te-0051', placementId: 'p-lone-1', date: '2026-10-15', start: '11:20', end: '13:02', tz: 'America/Chicago',     minutes: 102, activity: 83, onCallMinutes: 0, flag: 'outage',
    note: { en: 'Started at 11:20: power outage in Tegucigalpa from 08:45 to 11:15 (outage out-002). Jenna was told by WhatsApp at 09:05.', es: 'Inició a las 11:20: corte de energía en Tegucigalpa de 08:45 a 11:15 (interrupción out-002). Se avisó a Jenna por WhatsApp a las 09:05.' } },
  { id: 'te-0052', placementId: 'p-lone-1', date: '2026-10-15', start: '13:20', end: '15:41', tz: 'America/Chicago',     minutes: 141, activity: 85, onCallMinutes: 0, flag: null, note: null },
  { id: 'te-0053', placementId: 'p-sun-1',  date: '2026-10-15', start: '08:58', end: '13:00', tz: 'America/New_York',    minutes: 242, activity: 84, onCallMinutes: 0, flag: null, note: null },
  { id: 'te-0054', placementId: 'p-sun-1',  date: '2026-10-15', start: '14:01', end: '18:02', tz: 'America/New_York',    minutes: 241, activity: 81, onCallMinutes: 0, flag: null, note: null },

  { id: 'te-0055', placementId: 'p-rod-2',  date: '2026-10-16', start: '08:01', end: '12:04', tz: 'America/Los_Angeles', minutes: 243, activity: 68, onCallMinutes: 151, flag: null, note: null },
  { id: 'te-0056', placementId: 'p-rod-2',  date: '2026-10-16', start: '13:00', end: '17:10', tz: 'America/Los_Angeles', minutes: 250, activity: 67, onCallMinutes: 148, flag: null, note: null },
  { id: 'te-0057', placementId: 'p-lone-1', date: '2026-10-16', start: '11:05', end: '13:00', tz: 'America/Chicago',     minutes: 115, activity: 80, onCallMinutes: 0, flag: 'outage',
    note: { en: 'Started at 11:05: second power outage, 08:50 to 11:00 (outage out-003). Scheduled maintenance by the utility; José reported it in his support thread.', es: 'Inició a las 11:05: segundo corte de energía, de 08:50 a 11:00 (interrupción out-003). Mantenimiento programado de la empresa eléctrica; José lo reportó en su hilo de soporte.' } },
  { id: 'te-0058', placementId: 'p-lone-1', date: '2026-10-16', start: '13:18', end: '15:53', tz: 'America/Chicago',     minutes: 155, activity: 82, onCallMinutes: 0, flag: null, note: null },
  { id: 'te-0059', placementId: 'p-sun-1',  date: '2026-10-16', start: '09:00', end: '13:01', tz: 'America/New_York',    minutes: 241, activity: 82, onCallMinutes: 0, flag: null, note: null },
  { id: 'te-0060', placementId: 'p-sun-1',  date: '2026-10-16', start: '13:55', end: '15:31', tz: 'America/New_York',    minutes: 96, activity: 78, onCallMinutes: 0, flag: null,
    note: { en: 'Left at 15:31 for a dental appointment; Priya was told in the channel the day before.', es: 'Salió a las 15:31 por una cita con el dentista; se avisó a Priya en el canal el día anterior.' } },

  /* This week, Oct 19-21 (not yet approved) */
  { id: 'te-0061', placementId: 'p-rod-2',  date: '2026-10-19', start: '08:00', end: '12:02', tz: 'America/Los_Angeles', minutes: 242, activity: 72, onCallMinutes: 165, flag: null, note: null },
  { id: 'te-0062', placementId: 'p-rod-2',  date: '2026-10-19', start: '13:01', end: '17:04', tz: 'America/Los_Angeles', minutes: 243, activity: 70, onCallMinutes: 152, flag: null, note: null },
  { id: 'te-0063', placementId: 'p-lone-1', date: '2026-10-19', start: '09:01', end: '12:02', tz: 'America/Chicago',     minutes: 181, activity: 83, onCallMinutes: 0, flag: null, note: null },
  { id: 'te-0064', placementId: 'p-lone-1', date: '2026-10-19', start: '12:19', end: '15:10', tz: 'America/Chicago',     minutes: 171, activity: 81, onCallMinutes: 0, flag: null, note: null },
  { id: 'te-0065', placementId: 'p-sun-1',  date: '2026-10-19', start: '09:00', end: '13:02', tz: 'America/New_York',    minutes: 242, activity: 86, onCallMinutes: 0, flag: null, note: null },
  { id: 'te-0066', placementId: 'p-sun-1',  date: '2026-10-19', start: '14:01', end: '18:00', tz: 'America/New_York',    minutes: 239, activity: 83, onCallMinutes: 0, flag: null, note: null },

  { id: 'te-0067', placementId: 'p-rod-2',  date: '2026-10-20', start: '08:03', end: '12:01', tz: 'America/Los_Angeles', minutes: 238, activity: 69, onCallMinutes: 157, flag: null, note: null },
  { id: 'te-0068', placementId: 'p-rod-2',  date: '2026-10-20', start: '12:59', end: '17:02', tz: 'America/Los_Angeles', minutes: 243, activity: 74, onCallMinutes: 169, flag: null, note: null },
  { id: 'te-0069', placementId: 'p-lone-1', date: '2026-10-20', start: '08:59', end: '12:01', tz: 'America/Chicago',     minutes: 182, activity: 85, onCallMinutes: 0, flag: null, note: null },
  { id: 'te-0070', placementId: 'p-lone-1', date: '2026-10-20', start: '12:17', end: '15:12', tz: 'America/Chicago',     minutes: 175, activity: 78, onCallMinutes: 0, flag: null, note: null },
  { id: 'te-0071', placementId: 'p-sun-1',  date: '2026-10-20', start: '09:02', end: '13:00', tz: 'America/New_York',    minutes: 238, activity: 84, onCallMinutes: 0, flag: null, note: null },
  { id: 'te-0072', placementId: 'p-sun-1',  date: '2026-10-20', start: '13:59', end: '18:03', tz: 'America/New_York',    minutes: 244, activity: 80, onCallMinutes: 0, flag: null, note: null },

  /* Today Oct 21: morning entries in progress */
  { id: 'te-0073', placementId: 'p-rod-2',  date: '2026-10-21', start: '08:01', end: null, tz: 'America/Los_Angeles', minutes: null, activity: null, onCallMinutes: null, flag: null, note: null },
  { id: 'te-0074', placementId: 'p-lone-1', date: '2026-10-21', start: '09:03', end: null, tz: 'America/Chicago',     minutes: null, activity: null, onCallMinutes: 0,    flag: null, note: null },
  { id: 'te-0075', placementId: 'p-sun-1',  date: '2026-10-21', start: '09:02', end: null, tz: 'America/New_York',    minutes: null, activity: null, onCallMinutes: 0,    flag: null, note: null }
];

/* Outage log. `at` is the start of the outage in the client's time zone. */
HQD.outages = [
  { id: 'out-001', vaId: 'u-mariela', placementId: 'p-rod-2',  at: '2026-10-08T10:12:00-07:00', minutes: 25,  cause: 'internet', reportedBy: 'u-mariela',
    note: { en: 'Fiber provider dropped for 25 minutes; switched to the mobile hotspot and resumed dialing at 10:37.', es: 'El proveedor de fibra se cayó 25 minutos; cambió al hotspot del celular y retomó las llamadas a las 10:37.' } },
  { id: 'out-002', vaId: 'u-jose',    placementId: 'p-lone-1', at: '2026-10-15T08:45:00-05:00', minutes: 150, cause: 'power',    reportedBy: 'u-jose',
    note: { en: 'Power outage in the Kennedy area of Tegucigalpa, 08:45 to 11:15 CT. No UPS; clocked in at 11:20.', es: 'Corte de energía en la colonia Kennedy de Tegucigalpa, de 08:45 a 11:15 hora central. Sin UPS; marcó entrada a las 11:20.' } },
  { id: 'out-003', vaId: 'u-jose',    placementId: 'p-lone-1', at: '2026-10-16T08:50:00-05:00', minutes: 130, cause: 'power',    reportedBy: 'u-jose',
    note: { en: 'Second outage, scheduled maintenance by the utility, 08:50 to 11:00 CT. Daniela asked José to price a UPS (see his tech thread).', es: 'Segundo corte, mantenimiento programado de la empresa eléctrica, de 08:50 a 11:00 hora central. Daniela le pidió a José cotizar un UPS (ver su hilo de soporte).' } }
];

/* Weekly approvals (Monday to Sunday). Approving locks the week. flags: [{ kind, entryId|null, date|null, note }].
   The Oct 12-18 week is due every Monday; p-rod-2 and p-sun-1 are overdue since Mon Oct 19. */
HQD.weekApprovals = [
  { id: 'wa-p-rod-2-2026-09-28',  placementId: 'p-rod-2',  weekStart: '2026-09-28', weekEnd: '2026-10-04', scheduledHours: 40, trackedHours: 40.5,  approvedHours: 40.5,  flags: [],
    status: 'approved', approvedBy: 'u-daniela', approvedAt: '2026-10-05T09:40:00-06:00', lockedAt: '2026-10-05T09:40:00-06:00', dueOn: '2026-10-05' },
  { id: 'wa-p-lone-1-2026-09-28', placementId: 'p-lone-1', weekStart: '2026-09-28', weekEnd: '2026-10-04', scheduledHours: 30, trackedHours: 29.75, approvedHours: 29.75, flags: [],
    status: 'approved', approvedBy: 'u-daniela', approvedAt: '2026-10-05T09:44:00-06:00', lockedAt: '2026-10-05T09:44:00-06:00', dueOn: '2026-10-05' },
  { id: 'wa-p-sun-1-2026-09-28',  placementId: 'p-sun-1',  weekStart: '2026-09-28', weekEnd: '2026-10-04', scheduledHours: 16, trackedHours: 15.75, approvedHours: 15.75, flags: [],
    status: 'approved', approvedBy: 'u-daniela', approvedAt: '2026-10-05T09:52:00-06:00', lockedAt: '2026-10-05T09:52:00-06:00', dueOn: '2026-10-05',
    note: { en: 'First week: placement started Thu Oct 1 (2 days scheduled).', es: 'Primera semana: la colocación inició el jueves 1 de octubre (2 días programados).' } },

  { id: 'wa-p-rod-2-2026-10-05',  placementId: 'p-rod-2',  weekStart: '2026-10-05', weekEnd: '2026-10-11', scheduledHours: 40, trackedHours: 39.75, approvedHours: 39.75,
    flags: [{ kind: 'outage', entryId: 'te-0019', date: '2026-10-08', note: { en: '25-minute internet drop on Thu Oct 8', es: 'Caída de internet de 25 minutos el jueves 8 de octubre' } }],
    status: 'approved', approvedBy: 'u-daniela', approvedAt: '2026-10-12T09:25:00-06:00', lockedAt: '2026-10-12T09:25:00-06:00', dueOn: '2026-10-12' },
  { id: 'wa-p-lone-1-2026-10-05', placementId: 'p-lone-1', weekStart: '2026-10-05', weekEnd: '2026-10-11', scheduledHours: 30, trackedHours: 29.5,  approvedHours: 29.5,  flags: [],
    status: 'approved', approvedBy: 'u-daniela', approvedAt: '2026-10-12T09:35:00-06:00', lockedAt: '2026-10-12T09:35:00-06:00', dueOn: '2026-10-12' },
  { id: 'wa-p-sun-1-2026-10-05',  placementId: 'p-sun-1',  weekStart: '2026-10-05', weekEnd: '2026-10-11', scheduledHours: 40, trackedHours: 40.25, approvedHours: 40.25,
    flags: [{ kind: 'manual-edit', entryId: 'te-0030', date: '2026-10-09', note: { en: 'Clock-out corrected to 18:00 (forgot to stop the tracker)', es: 'Salida corregida a 18:00 (olvidó detener el tracker)' } }],
    status: 'approved', approvedBy: 'u-daniela', approvedAt: '2026-10-12T09:50:00-06:00', lockedAt: '2026-10-12T09:50:00-06:00', dueOn: '2026-10-12' },

  { id: 'wa-p-rod-2-2026-10-12',  placementId: 'p-rod-2',  weekStart: '2026-10-12', weekEnd: '2026-10-18', scheduledHours: 40, trackedHours: 41.25, approvedHours: null,
    flags: [
      { kind: 'low-activity', entryId: 'te-0044', date: '2026-10-14', note: { en: 'Activity 41% on Wed afternoon outside call time (farm-area research, reviewed with Ana)', es: 'Actividad del 41% el miércoles por la tarde fuera del horario de llamadas (investigación de zona de prospección, revisada con Ana)' } },
      { kind: 'over-schedule', entryId: null, date: null, note: { en: '41.25 h tracked against 40 scheduled; confirm the extra 1.25 h with Ana before approving', es: '41.25 h registradas contra 40 programadas; confirmar las 1.25 h extra con Ana antes de aprobar' } }
    ],
    status: 'pending', approvedBy: null, approvedAt: null, lockedAt: null, dueOn: '2026-10-19' },
  { id: 'wa-p-lone-1-2026-10-12', placementId: 'p-lone-1', weekStart: '2026-10-12', weekEnd: '2026-10-18', scheduledHours: 30, trackedHours: 26.25, approvedHours: 26.25,
    flags: [
      { kind: 'outage', entryId: 'te-0051', date: '2026-10-15', note: { en: 'Power outage, started 11:20', es: 'Corte de energía, inició a las 11:20' } },
      { kind: 'outage', entryId: 'te-0057', date: '2026-10-16', note: { en: 'Power outage, started 11:05', es: 'Corte de energía, inició a las 11:05' } }
    ],
    status: 'approved', approvedBy: 'u-daniela', approvedAt: '2026-10-19T09:30:00-06:00', lockedAt: '2026-10-19T09:30:00-06:00', dueOn: '2026-10-19' },
  { id: 'wa-p-sun-1-2026-10-12',  placementId: 'p-sun-1',  weekStart: '2026-10-12', weekEnd: '2026-10-18', scheduledHours: 40, trackedHours: 37.75, approvedHours: null,
    flags: [{ kind: 'under-schedule', entryId: 'te-0060', date: '2026-10-16', note: { en: '37.75 h tracked of 40 scheduled: left at 15:31 on Fri Oct 16 (dental appointment)', es: '37.75 h registradas de 40 programadas: salió a las 15:31 el viernes 16 de octubre (cita con el dentista)' } }],
    status: 'pending', approvedBy: null, approvedAt: null, lockedAt: null, dueOn: '2026-10-19' }
];

/* Prepaid two-week blocks on the company grid (Mon to Sun, 14 days). A client's first block is prorated from the placement start.
   amount = scheduled hours x bill rate (base only; true-ups, setup fee and credits live on the invoice). */
HQD.blocks = [
  /* Rodriguez Home Team (ISA seat: p-rod-1 Aug 10 to Sep 4, then p-rod-2 from Sep 8; $12/h, 40 h/week) */
  { id: 'blk-c-rodriguez-2026-08-10', clientId: 'c-rodriguez', placementIds: ['p-rod-1'],           start: '2026-08-10', end: '2026-08-16', scheduledHours: 40, billRate: 12, amount: 480, invoiceId: 'inv-1001', status: 'paid', paid: true,
    note: { en: 'Prorated first block (one week)', es: 'Primer bloque prorrateado (una semana)' } },
  { id: 'blk-c-rodriguez-2026-08-17', clientId: 'c-rodriguez', placementIds: ['p-rod-1'],           start: '2026-08-17', end: '2026-08-30', scheduledHours: 80, billRate: 12, amount: 960, invoiceId: 'inv-1002', status: 'paid', paid: true },
  { id: 'blk-c-rodriguez-2026-08-31', clientId: 'c-rodriguez', placementIds: ['p-rod-1', 'p-rod-2'], start: '2026-08-31', end: '2026-09-13', scheduledHours: 80, billRate: 12, amount: 960, invoiceId: 'inv-1004', status: 'paid', paid: true,
    note: { en: 'Seat replaced mid-block: Fernanda to Sep 4, Mariela from Sep 8 (Sep 7 Labor Day)', es: 'Reemplazo a mitad del bloque: Fernanda hasta el 4 de sep, Mariela desde el 8 de sep (7 de sep, Labor Day)' } },
  { id: 'blk-c-rodriguez-2026-09-14', clientId: 'c-rodriguez', placementIds: ['p-rod-2'],           start: '2026-09-14', end: '2026-09-27', scheduledHours: 80, billRate: 12, amount: 960, invoiceId: 'inv-1006', status: 'paid', paid: true },
  { id: 'blk-c-rodriguez-2026-09-28', clientId: 'c-rodriguez', placementIds: ['p-rod-2'],           start: '2026-09-28', end: '2026-10-11', scheduledHours: 80, billRate: 12, amount: 960, invoiceId: 'inv-1008', status: 'paid', paid: true },
  { id: 'blk-c-rodriguez-2026-10-12', clientId: 'c-rodriguez', placementIds: ['p-rod-2'],           start: '2026-10-12', end: '2026-10-25', scheduledHours: 80, billRate: 12, amount: 960, invoiceId: 'inv-1011', status: 'current', paid: true },
  { id: 'blk-c-rodriguez-2026-10-26', clientId: 'c-rodriguez', placementIds: ['p-rod-2'],           start: '2026-10-26', end: '2026-11-08', scheduledHours: 80, billRate: 12, amount: 960, invoiceId: 'inv-1014', status: 'upcoming', paid: true },

  /* Lone Star Realty Group (p-lone-1 from Aug 17; $8/h, 30 h/week) */
  { id: 'blk-c-lonestar-2026-08-17', clientId: 'c-lonestar', placementIds: ['p-lone-1'], start: '2026-08-17', end: '2026-08-30', scheduledHours: 60, billRate: 8, amount: 480, invoiceId: 'inv-1003', status: 'paid', paid: true },
  { id: 'blk-c-lonestar-2026-08-31', clientId: 'c-lonestar', placementIds: ['p-lone-1'], start: '2026-08-31', end: '2026-09-13', scheduledHours: 60, billRate: 8, amount: 480, invoiceId: 'inv-1005', status: 'paid', paid: true },
  { id: 'blk-c-lonestar-2026-09-14', clientId: 'c-lonestar', placementIds: ['p-lone-1'], start: '2026-09-14', end: '2026-09-27', scheduledHours: 60, billRate: 8, amount: 480, invoiceId: 'inv-1007', status: 'paid', paid: true },
  { id: 'blk-c-lonestar-2026-09-28', clientId: 'c-lonestar', placementIds: ['p-lone-1'], start: '2026-09-28', end: '2026-10-11', scheduledHours: 60, billRate: 8, amount: 480, invoiceId: 'inv-1009', status: 'paid', paid: true },
  { id: 'blk-c-lonestar-2026-10-12', clientId: 'c-lonestar', placementIds: ['p-lone-1'], start: '2026-10-12', end: '2026-10-25', scheduledHours: 60, billRate: 8, amount: 480, invoiceId: 'inv-1012', status: 'current', paid: true },
  { id: 'blk-c-lonestar-2026-10-26', clientId: 'c-lonestar', placementIds: ['p-lone-1'], start: '2026-10-26', end: '2026-11-08', scheduledHours: 60, billRate: 8, amount: 480, invoiceId: 'inv-1015', status: 'failed', paid: false,
    note: { en: 'Card declined on Oct 19; Stripe retries on Oct 22. Unpaid at block start pauses the placement.', es: 'Tarjeta rechazada el 19 de octubre; Stripe reintenta el 22 de octubre. Si sigue impago al iniciar el bloque, la colocación se pausa.' } },

  /* Sunshine Coast Partners (p-sun-1 from Thu Oct 1; $10/h, 40 h/week) */
  { id: 'blk-c-sunshine-2026-10-01', clientId: 'c-sunshine', placementIds: ['p-sun-1'], start: '2026-10-01', end: '2026-10-11', scheduledHours: 56, billRate: 10, amount: 560, invoiceId: 'inv-1010', status: 'paid', paid: true,
    note: { en: 'Prorated first block: 7 workdays, Oct 1 to 9', es: 'Primer bloque prorrateado: 7 días laborales, del 1 al 9 de octubre' } },
  { id: 'blk-c-sunshine-2026-10-12', clientId: 'c-sunshine', placementIds: ['p-sun-1'], start: '2026-10-12', end: '2026-10-25', scheduledHours: 80, billRate: 10, amount: 800, invoiceId: 'inv-1013', status: 'current', paid: true },
  { id: 'blk-c-sunshine-2026-10-26', clientId: 'c-sunshine', placementIds: ['p-sun-1'], start: '2026-10-26', end: '2026-11-08', scheduledHours: 80, billRate: 10, amount: 800, invoiceId: 'inv-1016', status: 'upcoming', paid: true }
];

/* Stripe invoices, one per block, issued 5 business days before the block starts (first invoice at signing).
   amount = sum of lines. trueUp is the net true-up on the invoice (positive = credit to the client). */
HQD.invoices = [
  { id: 'inv-1001', number: 'BV-1001', clientId: 'c-rodriguez', blockId: 'blk-c-rodriguez-2026-08-10', issuedOn: '2026-08-06', dueOn: '2026-08-10', amount: 979, status: 'paid', paidOn: '2026-08-06', failedOn: null, retryOn: null, trueUp: 0, setupFee: true,
    lines: [
      { desc: { en: 'One-time setup fee', es: 'Cuota única de configuración' }, qty: 1, rate: 499, amount: 499 },
      { desc: { en: 'ISA, prepaid block Aug 10 to 16 (40 h)', es: 'ISA, bloque prepagado del 10 al 16 de agosto (40 h)' }, qty: 40, rate: 12, amount: 480 }
    ] },
  { id: 'inv-1002', number: 'BV-1002', clientId: 'c-rodriguez', blockId: 'blk-c-rodriguez-2026-08-17', issuedOn: '2026-08-10', dueOn: '2026-08-17', amount: 960, status: 'paid', paidOn: '2026-08-11', failedOn: null, retryOn: null, trueUp: 0, setupFee: false,
    lines: [{ desc: { en: 'ISA, prepaid block Aug 17 to 30 (80 h)', es: 'ISA, bloque prepagado del 17 al 30 de agosto (80 h)' }, qty: 80, rate: 12, amount: 960 }] },
  { id: 'inv-1003', number: 'BV-1003', clientId: 'c-lonestar', blockId: 'blk-c-lonestar-2026-08-17', issuedOn: '2026-08-14', dueOn: '2026-08-17', amount: 979, status: 'paid', paidOn: '2026-08-14', failedOn: null, retryOn: null, trueUp: 0, setupFee: true,
    lines: [
      { desc: { en: 'One-time setup fee', es: 'Cuota única de configuración' }, qty: 1, rate: 499, amount: 499 },
      { desc: { en: 'Admin / TC, prepaid block Aug 17 to 30 (60 h)', es: 'Administración / TC, bloque prepagado del 17 al 30 de agosto (60 h)' }, qty: 60, rate: 8, amount: 480 }
    ] },
  { id: 'inv-1004', number: 'BV-1004', clientId: 'c-rodriguez', blockId: 'blk-c-rodriguez-2026-08-31', issuedOn: '2026-08-24', dueOn: '2026-08-31', amount: 960, status: 'paid', paidOn: '2026-08-25', failedOn: null, retryOn: null, trueUp: 0, setupFee: false,
    lines: [{ desc: { en: 'ISA, prepaid block Aug 31 to Sep 13 (80 h)', es: 'ISA, bloque prepagado del 31 de agosto al 13 de septiembre (80 h)' }, qty: 80, rate: 12, amount: 960 }] },
  { id: 'inv-1005', number: 'BV-1005', clientId: 'c-lonestar', blockId: 'blk-c-lonestar-2026-08-31', issuedOn: '2026-08-24', dueOn: '2026-08-31', amount: 480, status: 'paid', paidOn: '2026-08-24', failedOn: null, retryOn: null, trueUp: 0, setupFee: false,
    lines: [{ desc: { en: 'Admin / TC, prepaid block Aug 31 to Sep 13 (60 h)', es: 'Administración / TC, bloque prepagado del 31 de agosto al 13 de septiembre (60 h)' }, qty: 60, rate: 8, amount: 480 }] },
  { id: 'inv-1006', number: 'BV-1006', clientId: 'c-rodriguez', blockId: 'blk-c-rodriguez-2026-09-14', issuedOn: '2026-09-04', dueOn: '2026-09-14', amount: 460, status: 'paid', paidOn: '2026-09-08', failedOn: null, retryOn: null, trueUp: 0, setupFee: false,
    lines: [
      { desc: { en: 'ISA, prepaid block Sep 14 to 27 (80 h)', es: 'ISA, bloque prepagado del 14 al 27 de septiembre (80 h)' }, qty: 80, rate: 12, amount: 960 },
      { desc: { en: 'Referral credit: Lone Star Realty Group signed Aug 14', es: 'Crédito por referido: Lone Star Realty Group firmó el 14 de agosto' }, qty: 1, rate: -500, amount: -500 }
    ] },
  { id: 'inv-1007', number: 'BV-1007', clientId: 'c-lonestar', blockId: 'blk-c-lonestar-2026-09-14', issuedOn: '2026-09-04', dueOn: '2026-09-14', amount: 480, status: 'paid', paidOn: '2026-09-08', failedOn: null, retryOn: null, trueUp: 0, setupFee: false,
    lines: [{ desc: { en: 'Admin / TC, prepaid block Sep 14 to 27 (60 h)', es: 'Administración / TC, bloque prepagado del 14 al 27 de septiembre (60 h)' }, qty: 60, rate: 8, amount: 480 }] },
  { id: 'inv-1008', number: 'BV-1008', clientId: 'c-rodriguez', blockId: 'blk-c-rodriguez-2026-09-28', issuedOn: '2026-09-21', dueOn: '2026-09-28', amount: 960, status: 'paid', paidOn: '2026-09-22', failedOn: null, retryOn: null, trueUp: 0, setupFee: false,
    lines: [{ desc: { en: 'ISA, prepaid block Sep 28 to Oct 11 (80 h)', es: 'ISA, bloque prepagado del 28 de septiembre al 11 de octubre (80 h)' }, qty: 80, rate: 12, amount: 960 }] },
  { id: 'inv-1009', number: 'BV-1009', clientId: 'c-lonestar', blockId: 'blk-c-lonestar-2026-09-28', issuedOn: '2026-09-21', dueOn: '2026-09-28', amount: 480, status: 'paid', paidOn: '2026-09-21', failedOn: null, retryOn: null, trueUp: 0, setupFee: false,
    lines: [{ desc: { en: 'Admin / TC, prepaid block Sep 28 to Oct 11 (60 h)', es: 'Administración / TC, bloque prepagado del 28 de septiembre al 11 de octubre (60 h)' }, qty: 60, rate: 8, amount: 480 }] },
  { id: 'inv-1010', number: 'BV-1010', clientId: 'c-sunshine', blockId: 'blk-c-sunshine-2026-10-01', issuedOn: '2026-09-26', dueOn: '2026-10-01', amount: 1059, status: 'paid', paidOn: '2026-09-26', failedOn: null, retryOn: null, trueUp: 0, setupFee: true,
    lines: [
      { desc: { en: 'One-time setup fee', es: 'Cuota única de configuración' }, qty: 1, rate: 499, amount: 499 },
      { desc: { en: 'Operations / marketing, prorated first block Oct 1 to 11 (56 h)', es: 'Operaciones / marketing, primer bloque prorrateado del 1 al 11 de octubre (56 h)' }, qty: 56, rate: 10, amount: 560 }
    ] },
  { id: 'inv-1011', number: 'BV-1011', clientId: 'c-rodriguez', blockId: 'blk-c-rodriguez-2026-10-12', issuedOn: '2026-10-05', dueOn: '2026-10-12', amount: 960, status: 'paid', paidOn: '2026-10-06', failedOn: null, retryOn: null, trueUp: 0, setupFee: false,
    lines: [{ desc: { en: 'ISA, prepaid block Oct 12 to 25 (80 h)', es: 'ISA, bloque prepagado del 12 al 25 de octubre (80 h)' }, qty: 80, rate: 12, amount: 960 }] },
  { id: 'inv-1012', number: 'BV-1012', clientId: 'c-lonestar', blockId: 'blk-c-lonestar-2026-10-12', issuedOn: '2026-10-05', dueOn: '2026-10-12', amount: 480, status: 'paid', paidOn: '2026-10-07', failedOn: null, retryOn: null, trueUp: 0, setupFee: false,
    lines: [{ desc: { en: 'Admin / TC, prepaid block Oct 12 to 25 (60 h)', es: 'Administración / TC, bloque prepagado del 12 al 25 de octubre (60 h)' }, qty: 60, rate: 8, amount: 480 }] },
  { id: 'inv-1013', number: 'BV-1013', clientId: 'c-sunshine', blockId: 'blk-c-sunshine-2026-10-12', issuedOn: '2026-10-05', dueOn: '2026-10-12', amount: 800, status: 'paid', paidOn: '2026-10-05', failedOn: null, retryOn: null, trueUp: 0, setupFee: false,
    lines: [{ desc: { en: 'Operations / marketing, prepaid block Oct 12 to 25 (80 h)', es: 'Operaciones / marketing, bloque prepagado del 12 al 25 de octubre (80 h)' }, qty: 80, rate: 10, amount: 800 }] },

  /* Next block, invoiced Oct 19 with the true-ups of the weeks approved Oct 5 and Oct 12 */
  { id: 'inv-1014', number: 'BV-1014', clientId: 'c-rodriguez', blockId: 'blk-c-rodriguez-2026-10-26', issuedOn: '2026-10-19', dueOn: '2026-10-26', amount: 963, status: 'paid', paidOn: '2026-10-20', failedOn: null, retryOn: null, trueUp: -3, setupFee: false,
    lines: [
      { desc: { en: 'ISA, prepaid block Oct 26 to Nov 8 (80 h)', es: 'ISA, bloque prepagado del 26 de octubre al 8 de noviembre (80 h)' }, qty: 80, rate: 12, amount: 960 },
      { desc: { en: 'True-up, week of Sep 28: 40.5 h approved vs 40 scheduled', es: 'Ajuste, semana del 28 de septiembre: 40.5 h aprobadas vs 40 programadas' }, qty: 0.5, rate: 12, amount: 6 },
      { desc: { en: 'True-up, week of Oct 5: 39.75 h approved vs 40 scheduled', es: 'Ajuste, semana del 5 de octubre: 39.75 h aprobadas vs 40 programadas' }, qty: -0.25, rate: 12, amount: -3 }
    ] },
  { id: 'inv-1015', number: 'BV-1015', clientId: 'c-lonestar', blockId: 'blk-c-lonestar-2026-10-26', issuedOn: '2026-10-19', dueOn: '2026-10-26', amount: 474, status: 'failed', paidOn: null, failedOn: '2026-10-19', retryOn: '2026-10-22', trueUp: 6, setupFee: false,
    failReason: { en: 'Card declined (insufficient funds). Jenna was notified; retry scheduled Oct 22.', es: 'Tarjeta rechazada (fondos insuficientes). Se notificó a Jenna; reintento programado para el 22 de octubre.' },
    lines: [
      { desc: { en: 'Admin / TC, prepaid block Oct 26 to Nov 8 (60 h)', es: 'Administración / TC, bloque prepagado del 26 de octubre al 8 de noviembre (60 h)' }, qty: 60, rate: 8, amount: 480 },
      { desc: { en: 'True-up, week of Sep 28: 29.75 h approved vs 30 scheduled', es: 'Ajuste, semana del 28 de septiembre: 29.75 h aprobadas vs 30 programadas' }, qty: -0.25, rate: 8, amount: -2 },
      { desc: { en: 'True-up, week of Oct 5: 29.5 h approved vs 30 scheduled', es: 'Ajuste, semana del 5 de octubre: 29.5 h aprobadas vs 30 programadas' }, qty: -0.5, rate: 8, amount: -4 }
    ] },
  { id: 'inv-1016', number: 'BV-1016', clientId: 'c-sunshine', blockId: 'blk-c-sunshine-2026-10-26', issuedOn: '2026-10-19', dueOn: '2026-10-26', amount: 800, status: 'paid', paidOn: '2026-10-19', failedOn: null, retryOn: null, trueUp: 0, setupFee: false,
    lines: [
      { desc: { en: 'Operations / marketing, prepaid block Oct 26 to Nov 8 (80 h)', es: 'Operaciones / marketing, bloque prepagado del 26 de octubre al 8 de noviembre (80 h)' }, qty: 80, rate: 10, amount: 800 },
      { desc: { en: 'True-up, week of Sep 28: 15.75 h approved vs 16 scheduled', es: 'Ajuste, semana del 28 de septiembre: 15.75 h aprobadas vs 16 programadas' }, qty: -0.25, rate: 10, amount: -2.5 },
      { desc: { en: 'True-up, week of Oct 5: 40.25 h approved vs 40 scheduled', es: 'Ajuste, semana del 5 de octubre: 40.25 h aprobadas vs 40 programadas' }, qty: 0.25, rate: 10, amount: 2.5 }
    ] }
];

/* True-ups per approved week: deltaHours = approved - scheduled; amount = -deltaHours x billRate (positive = credit to the client).
   Applied to the next invoice issued after approval; never a refund. */
HQD.trueUps = [
  { id: 'tu-p-rod-2-2026-09-28',  clientId: 'c-rodriguez', placementId: 'p-rod-2',  weekStart: '2026-09-28', scheduledHours: 40, approvedHours: 40.5,  deltaHours: 0.5,   amount: -6,   appliedToInvoice: 'inv-1014' },
  { id: 'tu-p-lone-1-2026-09-28', clientId: 'c-lonestar',  placementId: 'p-lone-1', weekStart: '2026-09-28', scheduledHours: 30, approvedHours: 29.75, deltaHours: -0.25, amount: 2,    appliedToInvoice: 'inv-1015' },
  { id: 'tu-p-sun-1-2026-09-28',  clientId: 'c-sunshine',  placementId: 'p-sun-1',  weekStart: '2026-09-28', scheduledHours: 16, approvedHours: 15.75, deltaHours: -0.25, amount: 2.5,  appliedToInvoice: 'inv-1016' },
  { id: 'tu-p-rod-2-2026-10-05',  clientId: 'c-rodriguez', placementId: 'p-rod-2',  weekStart: '2026-10-05', scheduledHours: 40, approvedHours: 39.75, deltaHours: -0.25, amount: 3,    appliedToInvoice: 'inv-1014' },
  { id: 'tu-p-lone-1-2026-10-05', clientId: 'c-lonestar',  placementId: 'p-lone-1', weekStart: '2026-10-05', scheduledHours: 30, approvedHours: 29.5,  deltaHours: -0.5,  amount: 4,    appliedToInvoice: 'inv-1015' },
  { id: 'tu-p-sun-1-2026-10-05',  clientId: 'c-sunshine',  placementId: 'p-sun-1',  weekStart: '2026-10-05', scheduledHours: 40, approvedHours: 40.25, deltaHours: 0.25,  amount: -2.5, appliedToInvoice: 'inv-1016' },
  /* Approved Oct 19 after the next-block invoice went out: waits for the Nov 9 block invoice */
  { id: 'tu-p-lone-1-2026-10-12', clientId: 'c-lonestar',  placementId: 'p-lone-1', weekStart: '2026-10-12', scheduledHours: 30, approvedHours: 26.25, deltaHours: -3.75, amount: 30,   appliedToInvoice: null }
];

/* Payout runs on the 5th (hours of the 16th to month end) and the 20th (hours of the 1st to 15th).
   Only approved hours are paid; a week still pending on payday rolls into the next run (pendingHours).
   line.amount = hours x rate + bonus. Bench VAs (Lucía, Kevin) and academy VAs have no lines. */
HQD.payoutRuns = [
  { id: 'run-2026-09-05', date: '2026-09-05', periodStart: '2026-08-16', periodEnd: '2026-08-31', status: 'paid', totalAmount: 845.25, estimated: false, builtBy: 'u-daniela', releasedBy: 'u-charly',
    lines: [
      { id: 'pl-2026-09-05-fernanda', vaId: 'u-fernanda', placementId: 'p-rod-1',  hours: 86.5,  rate: 6, bonus: 0, bonusNote: null, amount: 519,    rail: 'payoneer', invoiceUploaded: true, statementId: 'st-2026-09-05-fernanda' },
      { id: 'pl-2026-09-05-jose',     vaId: 'u-jose',     placementId: 'p-lone-1', hours: 65.25, rate: 5, bonus: 0, bonusNote: null, amount: 326.25, rail: 'payoneer', invoiceUploaded: true, statementId: 'st-2026-09-05-jose' }
    ] },
  { id: 'run-2026-09-20', date: '2026-09-20', periodStart: '2026-09-01', periodEnd: '2026-09-15', status: 'paid', totalAmount: 773, estimated: false, builtBy: 'u-daniela', releasedBy: 'u-charly',
    lines: [
      { id: 'pl-2026-09-20-fernanda', vaId: 'u-fernanda', placementId: 'p-rod-1',  hours: 31.5,  rate: 6, bonus: 0, bonusNote: null, amount: 189,    rail: 'payoneer', invoiceUploaded: true, statementId: 'st-2026-09-20-fernanda',
        note: { en: 'Final payout: placement ended Sep 4', es: 'Pago final: la colocación terminó el 4 de septiembre' } },
      { id: 'pl-2026-09-20-mariela',  vaId: 'u-mariela',  placementId: 'p-rod-2',  hours: 47.75, rate: 6, bonus: 0, bonusNote: null, amount: 286.5,  rail: 'mercury',  invoiceUploaded: true, statementId: 'st-2026-09-20-mariela',
        note: { en: 'First payout at Rodriguez Home Team (started Sep 8)', es: 'Primer pago en Rodriguez Home Team (inició el 8 de septiembre)' } },
      { id: 'pl-2026-09-20-jose',     vaId: 'u-jose',     placementId: 'p-lone-1', hours: 59.5,  rate: 5, bonus: 0, bonusNote: null, amount: 297.5,  rail: 'payoneer', invoiceUploaded: true, statementId: 'st-2026-09-20-jose' }
    ] },
  { id: 'run-2026-10-05', date: '2026-10-05', periodStart: '2026-09-16', periodEnd: '2026-09-30', status: 'paid', totalAmount: 852.25, estimated: false, builtBy: 'u-daniela', releasedBy: 'u-charly',
    lines: [
      { id: 'pl-2026-10-05-mariela',  vaId: 'u-mariela',  placementId: 'p-rod-2',  hours: 87.25, rate: 6, bonus: 0, bonusNote: null, amount: 523.5,  rail: 'mercury',  invoiceUploaded: true, statementId: 'st-2026-10-05-mariela',
        note: { en: 'Last period at $6.00; the day-30 raise to $6.50 applies from Oct 1', es: 'Último periodo a $6.00; el aumento del día 30 a $6.50 aplica desde el 1 de octubre' } },
      { id: 'pl-2026-10-05-jose',     vaId: 'u-jose',     placementId: 'p-lone-1', hours: 65.75, rate: 5, bonus: 0, bonusNote: null, amount: 328.75, rail: 'payoneer', invoiceUploaded: true, statementId: 'st-2026-10-05-jose' }
    ] },
  { id: 'run-2026-10-20', date: '2026-10-20', periodStart: '2026-10-01', periodEnd: '2026-10-15', status: 'paid', totalAmount: 1027, estimated: false, builtBy: 'u-daniela', releasedBy: 'u-charly',
    lines: [
      { id: 'pl-2026-10-20-mariela',  vaId: 'u-mariela',  placementId: 'p-rod-2',  hours: 56,    rate: 6.5, bonus: 40, amount: 404,  rail: 'mercury',  invoiceUploaded: true,  statementId: 'st-2026-10-20-mariela',
        bonusNote: { en: 'Appointment bonus: 4 held appointments in the week of Oct 5 (Ana confirmed in the channel)', es: 'Bono por citas: 4 citas realizadas en la semana del 5 de octubre (Ana lo confirmó en el canal)' },
        pendingHours: 41.25, pendingNote: { en: 'Week of Oct 12 (41.25 h) not yet approved on payday; it will be paid on the Nov 5 run', es: 'La semana del 12 de octubre (41.25 h) no estaba aprobada el día de pago; se pagará en la corrida del 5 de noviembre' } },
      { id: 'pl-2026-10-20-jose',     vaId: 'u-jose',     placementId: 'p-lone-1', hours: 63,    rate: 5,   bonus: 0,  bonusNote: null, amount: 315, rail: 'payoneer', invoiceUploaded: true,  statementId: 'st-2026-10-20-jose',
        note: { en: 'Includes Oct 12 to 15 (week approved Oct 19). Outage hours on Oct 15 and 16 are unpaid.', es: 'Incluye del 12 al 15 de octubre (semana aprobada el 19 de octubre). Las horas de corte de energía del 15 y 16 no se pagan.' } },
      { id: 'pl-2026-10-20-andrea',   vaId: 'u-andrea',   placementId: 'p-sun-1',  hours: 56,    rate: 5.5, bonus: 0,  bonusNote: null, amount: 308, rail: 'mercury',  invoiceUploaded: false, statementId: 'st-2026-10-20-andrea',
        pendingHours: 37.75, pendingNote: { en: 'Week of Oct 12 (37.75 h) not yet approved on payday; it will be paid on the Nov 5 run', es: 'La semana del 12 de octubre (37.75 h) no estaba aprobada el día de pago; se pagará en la corrida del 5 de noviembre' } }
    ] },
  { id: 'run-2026-11-05', date: '2026-11-05', periodStart: '2026-10-16', periodEnd: '2026-10-31', status: 'scheduled', totalAmount: 1796.26, estimated: true, builtBy: null, releasedBy: null,
    note: { en: 'Estimate: carried-over hours plus scheduled hours for Oct 19 to 30, plus the $38 hotspot reimbursement for José (ticket tk-0007). Final amounts after the Monday approvals on Oct 26 and Nov 2.', es: 'Estimado: horas pendientes más las horas programadas del 19 al 30 de octubre, más el reembolso de $38 del hotspot de José (ticket tk-0007). Montos finales después de las aprobaciones de los lunes 26 de octubre y 2 de noviembre.' },
    lines: [
      { id: 'pl-2026-11-05-mariela', vaId: 'u-mariela', placementId: 'p-rod-2',  hours: 121.25, rate: 6.5, bonus: 0, bonusNote: null, amount: 788.13, rail: 'mercury',  invoiceUploaded: false, statementId: 'st-2026-11-05-mariela',
        note: { en: 'Estimate: 41.25 h carried over from the week of Oct 12 plus 80 h scheduled Oct 19 to 30', es: 'Estimado: 41.25 h pendientes de la semana del 12 de octubre más 80 h programadas del 19 al 30 de octubre' } },
      { id: 'pl-2026-11-05-jose',    vaId: 'u-jose',    placementId: 'p-lone-1', hours: 64.5,  rate: 5,   bonus: 38, amount: 360.5,  rail: 'payoneer', invoiceUploaded: false, statementId: 'st-2026-11-05-jose',
        bonusNote: { en: 'One-time reimbursement: prepaid mobile hotspot bought Oct 20 as backup internet (ticket tk-0007)', es: 'Reembolso único: hotspot móvil prepago comprado el 20 de octubre como internet de respaldo (ticket tk-0007)' },
        note: { en: 'Estimate: 4.5 h on Oct 16 (after the outage) plus 60 h scheduled Oct 19 to 30', es: 'Estimado: 4.5 h del 16 de octubre (después del corte) más 60 h programadas del 19 al 30 de octubre' } },
      { id: 'pl-2026-11-05-andrea',  vaId: 'u-andrea',  placementId: 'p-sun-1',  hours: 117.75, rate: 5.5, bonus: 0, bonusNote: null, amount: 647.63, rail: 'mercury',  invoiceUploaded: false, statementId: 'st-2026-11-05-andrea',
        note: { en: 'Estimate: 37.75 h carried over from the week of Oct 12 plus 80 h scheduled Oct 19 to 30', es: 'Estimado: 37.75 h pendientes de la semana del 12 de octubre más 80 h programadas del 19 al 30 de octubre' } }
    ] }
];
