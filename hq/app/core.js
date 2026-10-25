/* BeyondVAs HQ prototype: runtime core.
   State, language, routing, formatting, data access with permissions, the app frame (rail, sidebar, main, tabs),
   sheets and toasts. Screens live in HQ.V[name] and are defined in the other app/*.js files. */
(function () {
  var HQ = window.HQ = window.HQ || {};
  var D = window.HQD || {};

  /* ---------- state ---------- */
  var S = HQ.S = { userId: 'u-charly', lang: null, theme: 'auto', screen: 'home', params: {}, hist: [], viewAs: null, picker: false };
  try { var saved = JSON.parse(localStorage.getItem('bvhq-state') || 'null'); if (saved) { S.userId = saved.userId || S.userId; S.lang = saved.lang || null; S.theme = saved.theme || 'auto'; } } catch (e) {}
  function persist() { try { localStorage.setItem('bvhq-state', JSON.stringify({ userId: S.userId, lang: S.lang, theme: S.theme })); } catch (e) {} }

  /* The prototype's "now": Wednesday 2026-10-21, 08:35 Pacific / 09:35 Honduras / 10:35 Central / 11:35 Eastern. */
  var NOW = new Date('2026-10-21T15:35:00Z');
  HQ.now = function () { return NOW; };

  /* ---------- language ---------- */
  HQ.lang = function () { return S.lang || (me() && me().lang) || 'en'; };
  var t = HQ.t = function (key, vars) {
    var e = HQ.T[key]; var s = e ? (e[HQ.lang()] || e.en) : key;
    if (vars) Object.keys(vars).forEach(function (k) { s = s.replace(new RegExp('\\{' + k + '\\}', 'g'), vars[k]); });
    return s;
  };
  var L = HQ.L = function (obj) { if (obj == null) return ''; if (typeof obj === 'string') return obj; return obj[HQ.lang()] || obj.en || obj.es || ''; };
  var esc = HQ.esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };

  /* ---------- data access ---------- */
  var byId = {};
  function index() { byId = {}; ['people', 'clients', 'placements', 'channels', 'threads'].forEach(function (k) { (D[k] || []).forEach(function (o) { byId[o.id] = o; }); }); }
  index();
  HQ.get = function (id) { return byId[id]; };
  function me() { return byId[S.viewAs || S.userId]; }
  HQ.me = me;
  HQ.realMe = function () { return byId[S.userId]; };
  HQ.role = function () { var m = me(); return m ? m.role : 'owner'; };
  HQ.isStaff = function () { var r = HQ.role(); return r === 'owner' || r === 'manager'; };

  var Dx = HQ.D = {
    people: function () { return D.people || []; },
    person: function (id) { return byId[id]; },
    client: function (id) { return byId[id]; },
    placement: function (id) { return byId[id]; },
    vas: function () { return (D.people || []).filter(function (p) { return p.role === 'va'; }); },
    clientOf: function (person) { return person && person.clientId ? byId[person.clientId] : null; },
    placementsOf: function (user) {
      user = user || me(); if (!user) return [];
      return (D.placements || []).filter(function (p) {
        if (user.role === 'va') return p.vaId === user.id;
        if (user.role === 'client') return p.clientId === user.clientId;
        return true;
      });
    },
    activePlacements: function () { return (D.placements || []).filter(function (p) { return p.status === 'active'; }); },
    placementForVa: function (vaId) { return (D.placements || []).filter(function (p) { return p.vaId === vaId && p.status === 'active'; })[0] || null; },
    placementForClient: function (clientId) { return (D.placements || []).filter(function (p) { return p.clientId === clientId && p.status === 'active'; }); },
    /* Channels a person may open, grouped. Support threads are included as kind 'thread'. */
    channelsFor: function (user) {
      user = user || me(); if (!user) return [];
      var out = [];
      (D.channels || []).forEach(function (c) {
        var ok = false;
        if (user.role === 'owner') ok = c.kind !== 'dm' || c.members.indexOf(user.id) >= 0;
        else if (user.role === 'manager') ok = c.kind !== 'dm' || c.members.indexOf(user.id) >= 0;
        else if (c.members === 'everyone') ok = user.role === 'va';
        else ok = c.members.indexOf(user.id) >= 0;
        if (ok) out.push(c);
      });
      (D.threads || []).forEach(function (th) {
        var ok = user.role === 'owner' || (user.role === 'manager' && th.assignedTo === user.id) || th.vaId === user.id;
        if (ok) out.push({ id: th.id, kind: 'thread', vaId: th.vaId, topic: th.topic, status: th.status, name: th.title, members: [th.vaId, th.assignedTo, 'u-charly'], assignedTo: th.assignedTo });
      });
      return out;
    },
    channel: function (id) { var c = byId[id]; if (c && c.kind) return c; var th = byId[id]; if (th && th.topic) return Dx.channelsFor(HQ.realMe()).filter(function (x) { return x.id === id; })[0] || Dx.threadAsChannel(th); return c; },
    threadAsChannel: function (th) { return { id: th.id, kind: 'thread', vaId: th.vaId, topic: th.topic, status: th.status, name: th.title, members: [th.vaId, th.assignedTo, 'u-charly'], assignedTo: th.assignedTo }; },
    channelName: function (c, viewer) {
      viewer = viewer || me();
      if (!c) return '';
      if (c.kind === 'dm') { var other = c.members.filter(function (m) { return m !== viewer.id; })[0]; var p = byId[other]; return p ? p.name : '…'; }
      if (c.kind === 'thread') { var va = byId[c.vaId]; var ttl = L(c.name); return (viewer.role === 'va') ? ttl : (va ? va.first + ' · ' : '') + ttl; }
      return L(c.name);
    },
    /* internal system pills (audience 'internal') never reach a client's eyes, including "view as client" */
    messagesIn: function (id) { var viewer = me(); var client = !!viewer && viewer.role === 'client'; return (D.messages || []).filter(function (m) { return (m.channelId === id || m.threadId === id) && !(client && m.audience === 'internal'); }); },
    lastMessage: function (id) { var ms = Dx.messagesIn(id); return ms.length ? ms[ms.length - 1] : null; },
    lastRead: function (user, id) { user = user || me(); var lr = (D.lastRead || {})[user.id]; return lr && lr[id] ? Date.parse(lr[id]) : 0; },
    unread: function (id, user) { user = user || me(); var lr = Dx.lastRead(user, id); return Dx.messagesIn(id).filter(function (m) { return m.authorId !== user.id && Date.parse(m.at) > lr; }).length; },
    unreadTotal: function (user) { user = user || me(); return Dx.channelsFor(user).reduce(function (n, c) { return n + Dx.unread(c.id, user); }, 0); },
    markRead: function (id, user) { user = user || me(); D.lastRead = D.lastRead || {}; D.lastRead[user.id] = D.lastRead[user.id] || {}; D.lastRead[user.id][id] = new Date(NOW.getTime() + 60000).toISOString(); },
    notificationsFor: function (user) { user = user || me(); return (D.notifications || []).filter(function (n) { return n.userId === user.id; }).sort(function (a, b) { return Date.parse(b.at) - Date.parse(a.at); }); },
    unreadNotifs: function (user) { return Dx.notificationsFor(user).filter(function (n) { return !n.read; }).length; },
    /* Money visibility */
    can: function (what, user) {
      user = user || me(); var r = user.role;
      /* "View as client": money follows the real person (the owner still sees amounts, a manager sees them masked) */
      if (S.viewAs && (!user || user.id === S.viewAs)) { var real = HQ.realMe(); if (what === 'bill' || what === 'margin') return real.role === 'owner'; if (what === 'pay') return real.role === 'owner' || real.role === 'manager'; }
      if (what === 'bill') return r === 'owner' || r === 'client';
      if (what === 'pay') return r === 'owner' || r === 'manager' || r === 'va';
      if (what === 'margin') return r === 'owner';
      if (what === 'approve') return r === 'owner' || r === 'manager';
      return r === 'owner';
    },
    /* How a VA is shown to a given viewer: clients see first name only. */
    vaLabel: function (va, viewer) { viewer = viewer || me(); if (!va) return ''; return viewer.role === 'client' ? va.first : va.name; },
    tierLabel: function (tier) { var tr = (D.rates && D.rates.tiers[tier]); return tr ? L(tr.label) : tier; },
    tierShort: function (tier) { return tier === 'isa' ? 'ISA' : tier === 'ops' ? L({ en: 'Operations', es: 'Operaciones' }) : L({ en: 'Admin', es: 'Admin' }); },
    today: function () { return D.today || '2026-10-21'; }
  };

  /* ---------- formatting ---------- */
  var TZS = { 'America/Los_Angeles': 'PT', 'America/Denver': 'MT', 'America/Chicago': 'CT', 'America/New_York': 'ET', 'America/Tegucigalpa': 'HN', 'America/El_Salvador': 'SV', 'America/Guatemala': 'GT', 'America/Managua': 'NI', 'America/Bogota': 'CO' };
  var F = HQ.fmt = {
    locale: function () { return HQ.lang() === 'es' ? 'es-HN' : 'en-US'; },
    money: function (n, cents) { if (n == null || isNaN(n)) return '—'; var neg = n < 0; var v = Math.abs(n); var s = v.toLocaleString('en-US', { minimumFractionDigits: cents === false ? 0 : 2, maximumFractionDigits: cents === false ? 0 : 2 }); return (neg ? '-$' : '$') + s; },
    rate: function (n) { return n == null ? '—' : '$' + (Math.round(n * 100) / 100).toString().replace(/\.5$/, '.50') + t('perHour'); },
    hrs: function (min) { if (min == null) return '—'; min = Math.round(min); var h = Math.floor(min / 60), m = min % 60; return m ? h + 'h ' + (m < 10 ? '0' : '') + m + 'm' : h + 'h'; },
    hdec: function (hours) { return (Math.round(hours * 100) / 100).toString(); },
    pct: function (x) { return Math.round(x) + '%'; },
    tz: function (tz) { return TZS[tz] || tz; },
    date: function (iso, style) {
      if (!iso) return '—'; var d = iso.length <= 10 ? new Date(iso + 'T12:00:00Z') : new Date(iso);
      var o = style === 'long' ? { weekday: 'short', month: 'short', day: 'numeric' } : style === 'full' ? { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' } : style === 'num' ? { month: 'numeric', day: 'numeric' } : { month: 'short', day: 'numeric' };
      if (iso.length <= 10) o.timeZone = 'UTC';
      var s = d.toLocaleDateString(F.locale(), o); return s.charAt(0).toUpperCase() + s.slice(1);
    },
    time: function (iso, tz) { var d = new Date(iso); var o = { hour: 'numeric', minute: '2-digit' }; if (tz) o.timeZone = tz; return d.toLocaleTimeString(F.locale(), o).replace(/\s?[ap]\.\s?m\./i, function (m) { return ' ' + m.replace(/[.\s]/g, '').toUpperCase(); }); },
    /* time in the viewer's zone, with the other party's zone in small text when it differs */
    time2: function (iso, otherTz) {
      var mine = (me() && me().tz) || 'America/Los_Angeles'; var s = F.time(iso, mine);
      if (otherTz && otherTz !== mine) s += ' <span class="tiny muted">(' + F.time(iso, otherTz) + ' ' + F.tz(otherTz) + ')</span>';
      return s;
    },
    clock: function (hhmm, fromTz, toTz, dateIso) {
      /* convert a clock time 'HH:MM' from one zone to another on a given date */
      if (!fromTz || !toTz || fromTz === toTz) return hhmm;
      var base = new Date((dateIso || Dx.today()) + 'T' + hhmm + ':00Z');
      var off = function (tz) { var p = new Intl.DateTimeFormat('en-US', { timeZone: tz, hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(base); var h = +p.filter(function (x) { return x.type === 'hour'; })[0].value, m = +p.filter(function (x) { return x.type === 'minute'; })[0].value; return (h % 24) * 60 + m; };
      var delta = off(toTz) - off(fromTz); var parts = hhmm.split(':'); var mins = (+parts[0]) * 60 + (+parts[1]) + delta; mins = ((mins % 1440) + 1440) % 1440;
      var h = Math.floor(mins / 60), m = mins % 60; return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
    },
    ampm: function (hhmm) { var p = hhmm.split(':'); var h = +p[0]; var suf = h >= 12 ? 'PM' : 'AM'; h = h % 12; if (h === 0) h = 12; return h + ':' + p[1] + ' ' + suf; },
    rel: function (iso) {
      var ms = NOW.getTime() - Date.parse(iso); var m = Math.round(ms / 60000); var es = HQ.lang() === 'es';
      if (m < 1) return es ? 'ahora' : 'now'; if (m < 60) return m + (es ? ' min' : 'm'); var h = Math.round(m / 60); if (h < 24) return h + 'h'; var d = Math.round(h / 24); if (d < 7) return d + 'd'; return F.date(iso);
    },
    daysUntil: function (iso) { return Math.round((Date.parse(iso + 'T12:00:00Z') - Date.parse(Dx.today() + 'T12:00:00Z')) / 86400000); },
    dayLabel: function (iso) { var n = F.daysUntil(iso); var es = HQ.lang() === 'es'; if (n === 0) return es ? 'Hoy' : 'Today'; if (n === 1) return es ? 'Mañana' : 'Tomorrow'; if (n === -1) return es ? 'Ayer' : 'Yesterday'; return F.date(iso, 'long'); },
    initials: function (p) { return p.initials || (p.name || '?').split(' ').map(function (x) { return x[0]; }).slice(0, 2).join('').toUpperCase(); }
  };
  HQ.isoDate = function (iso) { return iso ? iso.slice(0, 10) : ''; };
  HQ.sameDay = function (a, b) { return a.slice(0, 10) === b.slice(0, 10); };

  /* ---------- icons ---------- */
  var I = HQ.I = {
    home: '<svg viewBox="0 0 24 24"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>',
    chat: '<svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1.2-4.4A8 8 0 1 1 21 12z"/></svg>',
    report: '<svg viewBox="0 0 24 24"><path d="M9 3h6l1 2h3v16H5V5h3z"/><path d="M9 12h6M9 16h6M9 8h2"/></svg>',
    hours: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    people: '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.5"/><path d="M15.5 14.5a5 5 0 0 1 6 4.5"/></svg>',
    money: '<svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M7 12h.01M17 12h.01"/></svg>',
    chart: '<svg viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/></svg>',
    calendar: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
    inbox: '<svg viewBox="0 0 24 24"><path d="M3 13l2.5-8h13L21 13v6H3z"/><path d="M3 13h5l1.5 3h5L16 13h5"/></svg>',
    more: '<svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>',
    bell: '<svg viewBox="0 0 24 24"><path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>',
    search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>',
    back: '<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>',
    send: '<svg viewBox="0 0 24 24"><path d="M4 12l16-8-6 16-2-6z"/></svg>',
    plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
    clip: '<svg viewBox="0 0 24 24"><path d="M20 12l-8 8a5 5 0 0 1-7-7l9-9a3.5 3.5 0 0 1 5 5l-9 9a2 2 0 0 1-3-3l8-8"/></svg>',
    gear: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.4-2.3.9a7 7 0 0 0-2-1.2L14.2 3h-4.4l-.4 2.6a7 7 0 0 0-2 1.2l-2.3-.9-2 3.4 2 1.5a7 7 0 0 0 0 2.4l-2 1.5 2 3.4 2.3-.9a7 7 0 0 0 2 1.2l.4 2.6h4.4l.4-2.6a7 7 0 0 0 2-1.2l2.3.9 2-3.4-2-1.5c.1-.4.1-.8.1-1.2z"/></svg>',
    shield: '<svg viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>',
    doc: '<svg viewBox="0 0 24 24"><path d="M6 3h8l5 5v13H6z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></svg>',
    school: '<svg viewBox="0 0 24 24"><path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5M22 9v6"/></svg>',
    check: '<svg viewBox="0 0 24 24"><path d="M5 12l5 5 9-10"/></svg>',
    x: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    flag: '<svg viewBox="0 0 24 24"><path d="M5 21V4h11l-1.5 4L16 12H5"/></svg>',
    eye: '<svg viewBox="0 0 24 24"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
    lock: '<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
    pin: '<svg viewBox="0 0 24 24"><path d="M12 17v5M8 12l-2 5h12l-2-5V5h1V3H7v2h1z"/></svg>',
    user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
    globe: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/></svg>',
    moon: '<svg viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>',
    sun: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    briefcase: '<svg viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 12h18"/></svg>',
    chev: '<svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>',
    phone: '<svg viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>',
    camera: '<svg viewBox="0 0 24 24"><path d="M4 8h3l2-3h6l2 3h3v12H4z"/><circle cx="12" cy="13" r="3.5"/></svg>',
    sparkle: '<svg viewBox="0 0 24 24"><path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/></svg>',
    steps: '<svg viewBox="0 0 24 24"><path d="M4 7h4v4H4zM10 9h10M4 15h4v4H4zM10 17h10"/></svg>',
    alert: '<svg viewBox="0 0 24 24"><path d="M12 3l10 18H2z"/><path d="M12 10v4M12 17.5v.5"/></svg>'
  };

  /* ---------- small components ---------- */
  var AV = ['av1', 'av2', 'av3', 'av4', 'av5', 'av6', 'av7', 'av8'], fieldSeq = 0;
  function hash(s) { var h = 0; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return Math.abs(h); }
  var h = HQ.h = {
    avatar: function (p, size, extra) {
      if (typeof p === 'string') p = byId[p];
      if (!p) return '<span class="avatar sys ' + (size || '') + '">?</span>';
      var c = AV[hash(p.id) % AV.length];
      return '<span class="avatar ' + (size || '') + ' ' + (extra || '') + '" style="background:var(--' + c + ')" title="' + esc(p.role === 'va' ? Dx.vaLabel(p) : p.name) + '">' + esc(F.initials(p)) + '</span>';
    },
    chip: function (text, kind, dot) { return '<span class="chip ' + (kind || '') + '">' + (dot ? '<i class="dot"></i>' : '') + esc(text) + '</span>'; },
    badge: function (n, kind) { return n ? '<span class="badge ' + (kind || '') + '">' + n + '</span>' : ''; },
    kpi: function (v, l, kind) { return '<div class="kpi ' + (kind || '') + '"><div class="v num">' + v + '</div><div class="l">' + esc(l) + '</div></div>'; },
    card: function (inner, cls, attrs) { return '<div class="card ' + (cls || '') + '" ' + (attrs || '') + '>' + inner + '</div>'; },
    btn: function (label, act, kind, data, attrs) {
      var ds = ''; if (data) Object.keys(data).forEach(function (k) { ds += ' data-' + k + '="' + esc(data[k]) + '"'; });
      return '<button class="btn ' + (kind || 'btn-ghost') + '" data-act="' + esc(act) + '"' + ds + ' ' + (attrs || '') + '>' + label + '</button>';
    },
    go: function (label, screen, params, kind, attrs) {
      var ds = ''; if (params) Object.keys(params).forEach(function (k) { ds += ' data-' + k + '="' + esc(params[k]) + '"'; });
      return '<button class="btn ' + (kind || 'btn-ghost') + '" data-go="' + esc(screen) + '"' + ds + ' ' + (attrs || '') + '>' + label + '</button>';
    },
    li: function (opts) {
      /* {lead, title, sub, trail, go, params, act, data, cls} */
      var ds = ''; var o = opts.params || opts.data || {}; Object.keys(o).forEach(function (k) { ds += ' data-' + k + '="' + esc(o[k]) + '"'; });
      var click = opts.go ? ' data-go="' + esc(opts.go) + '"' : opts.act ? ' data-act="' + esc(opts.act) + '"' : '';
      var tag = click ? 'button' : 'div';
      return '<' + tag + ' class="li ' + (click ? 'click ' : '') + (opts.cls || '') + '"' + click + ds + '>' + (opts.lead || '') + '<div class="grow"><div class="t">' + (opts.title || '') + '</div>' + (opts.sub ? '<div class="s">' + opts.sub + '</div>' : '') + '</div>' + (opts.trail ? '<div class="right small">' + opts.trail + '</div>' : '') + (click ? '<span class="chev">' + I.chev + '</span>' : '') + '</' + tag + '>';
    },
    table: function (cols, rows, cls) {
      /* cols: [{l, num, cls}] rows: [[cell,...] or {cells:[...], attrs}] */
      var s = '<div class="tbl-wrap"><table class="tbl ' + (cls || '') + '"><thead><tr>' + cols.map(function (c) { return '<th scope="col" class="' + (c.num ? 'num ' : '') + (c.cls || '') + '">' + esc(c.l) + '</th>'; }).join('') + '</tr></thead><tbody>';
      rows.forEach(function (r) { var cells = r.cells || r; var attrs = r.attrs || ''; s += '<tr ' + attrs + '>' + cells.map(function (c, i) { return '<td class="' + (cols[i] && cols[i].num ? 'num ' : '') + (cols[i] && cols[i].cls || '') + '">' + c + '</td>'; }).join('') + '</tr>'; });
      return s + '</tbody></table></div>';
    },
    empty: function (title, sub) { return '<div class="empty"><b>' + esc(title) + '</b>' + (sub ? esc(sub) : '') + '</div>'; },
    progress: function (pct, kind) { return '<div class="progress ' + (kind || '') + '"><i style="width:' + Math.max(0, Math.min(100, pct)) + '%"></i></div>'; },
    note: function (text, kind) { return '<div class="note ' + (kind || '') + '">' + text + '</div>'; },
    seg: function (opts, active, act, data) {
      var ds = ''; if (data) Object.keys(data).forEach(function (k) { ds += ' data-' + k + '="' + esc(data[k]) + '"'; });
      return '<div class="seg" role="tablist">' + opts.map(function (o) { return '<button role="tab" aria-selected="' + (o.v === active) + '" class="' + (o.v === active ? 'active' : '') + '" data-act="' + esc(act) + '" data-v="' + esc(o.v) + '"' + ds + '>' + esc(o.l) + '</button>'; }).join('') + '</div>';
    },
    field: function (label, input, hint) {
      /* the label is tied to its control: an id is injected when the control has none */
      var id = 'f' + (++fieldSeq), inp = input;
      if (/^<(input|textarea|select)\b/.test(inp)) { var m = inp.match(/^<(?:input|textarea|select)[^>]*\sid="([^"]+)"/); if (m) id = m[1]; else inp = inp.replace(/^<(input|textarea|select)\b/, '<$1 id="' + id + '"'); } else id = '';
      return '<div class="field"><label' + (id ? ' for="' + id + '"' : '') + '>' + esc(label) + '</label>' + inp + (hint ? '<div class="hint">' + esc(hint) + '</div>' : '') + '</div>';
    },
    sec: function (title, link) { return '<div class="sec"><h2>' + esc(title) + '</h2>' + (link || '') + '</div>'; },
    statusChip: function (s) {
      var map = { approved: 'good', paid: 'good', active: 'good', done: 'good', valid: 'good', pass: 'good', credited: 'good', closed: '', pending: 'warn', open: 'warn', 'in-progress': 'warn', expiring: 'warn', scheduled: 'blue', current: 'blue', upcoming: 'blue', failed: 'bad', overdue: 'bad', missing: 'bad', expired: 'bad', fail: 'bad', paused: 'bad', ended: '', archived: '', bench: 'gold', placed: 'good', onboarding: 'blue', inactive: '' };
      var lbl = HQ.T[s] ? t(s) : (HQ.T[s === 'open' ? 'open_' : s] ? t(s === 'open' ? 'open_' : s) : s);
      if (s === 'in-progress') lbl = t('inProgress');
      return h.chip(lbl, map[s] || '', true);
    },
    person: function (p, sub) { if (typeof p === 'string') p = byId[p]; if (!p) return ''; return '<span class="row" style="gap:8px">' + h.avatar(p, 'sm') + '<span><span class="b" style="color:var(--fg)">' + esc(p.name) + '</span>' + (sub ? '<span class="small muted"> · ' + esc(sub) + '</span>' : '') + '</span></span>'; }
  };

  /* ---------- navigation definitions (phone tabs and rail), per DESIGN-SPEC.md §2 ---------- */
  Object.assign(HQ.T, {
    me: { en: 'Me', es: 'Yo' }, help: { en: 'Help', es: 'Ayuda' }, tests: { en: 'Tests', es: 'Pruebas' }, announce: { en: 'Announcement', es: 'Anuncio' }, audit: { en: 'Audit log', es: 'Auditoría' },
    outages: { en: 'Outages', es: 'Cortes' }, working: { en: 'Working now', es: 'Trabajando' }, finished: { en: 'Finished', es: 'Terminó' }, notStarted: { en: 'Not started', es: 'No ha empezado' },
    offToday: { en: 'Off today', es: 'Libre hoy' }, breakNow: { en: 'Break', es: 'Pausa' }, lastActivity: { en: 'last activity {n} min ago', es: 'última actividad hace {n} min' }, sinceTime: { en: 'since', es: 'desde' },
    minToday: { en: '{h} today', es: '{h} hoy' }, hidden: { en: 'hidden', es: 'oculto' },
    mfaPickerNote: { en: 'In the real app the owner and managers sign in with two-step verification (MFA). Not in the prototype.', es: 'En la app real, propietario y gerentes entran con verificación en dos pasos (MFA). No está en el prototipo.' },
    readOnlyView: { en: 'Read-only while viewing as a client. Exit the view to act.', es: 'Solo lectura mientras ves como cliente. Sal de la vista para actuar.' },
    notInPrototype: { en: 'The screen "{s}" is not in the prototype yet.', es: 'La pantalla "{s}" aún no está en el prototipo.' },
    navMain: { en: 'Main navigation', es: 'Navegación principal' }, navTabs: { en: 'Tabs', es: 'Pestañas' }, errorTitle: { en: 'Error', es: 'Error' },
    personLang: { en: "Each person's own", es: 'La de cada persona' }
  });
  var unreadBadge = function () { return Dx.unreadTotal(); };
  HQ.NAV = {
    owner: [
      { screen: 'home', key: 'home', icon: 'home' },
      { screen: 'channels', key: 'chat', icon: 'chat', badge: unreadBadge },
      { screen: 'clients', key: 'clients', icon: 'briefcase' },
      { screen: 'money', key: 'money', icon: 'money' },
      { screen: 'more', key: 'more', icon: 'more', phoneOnly: true },
      { screen: 'people', key: 'people', icon: 'people', desktopOnly: true },
      { screen: 'pipeline', key: 'recruiting', icon: 'steps', desktopOnly: true },
      { screen: 'reports', key: 'reports', icon: 'chart', desktopOnly: true },
      { screen: 'calendar', key: 'calendar', icon: 'calendar', desktopOnly: true },
      { screen: 'settings', key: 'settings', icon: 'gear', desktopOnly: true }
    ],
    manager: [
      { screen: 'inbox', key: 'home', icon: 'inbox', badge: function () { return HQ.inboxCount ? HQ.inboxCount() : 0; } },
      { screen: 'channels', key: 'chat', icon: 'chat', badge: unreadBadge },
      { screen: 'hours', key: 'hours', icon: 'hours', badge: function () { return HQ.pendingWeeks ? HQ.pendingWeeks().length : 0; } },
      { screen: 'people', key: 'people', icon: 'people' },
      { screen: 'more', key: 'more', icon: 'more', phoneOnly: true },
      { screen: 'pipeline', key: 'recruiting', icon: 'steps', desktopOnly: true },
      { screen: 'academy', key: 'academy', icon: 'school', desktopOnly: true },
      { screen: 'calendar', key: 'calendar', icon: 'calendar', desktopOnly: true },
      { screen: 'documents', key: 'documents', icon: 'doc', desktopOnly: true },
      { screen: 'compliance', key: 'compliance', icon: 'shield', desktopOnly: true }
    ],
    va: [
      { screen: 'home', key: 'home', icon: 'home' },
      { screen: 'channels', key: 'chat', icon: 'chat', badge: unreadBadge },
      { screen: 'report', key: 'report', icon: 'report', primary: true },
      { screen: 'hours', key: 'hours', icon: 'hours' },
      { screen: 'profile', key: 'me', icon: 'user' },
      { screen: 'academy', key: 'academy', icon: 'school', desktopOnly: true },
      { screen: 'calendar', key: 'calendar', icon: 'calendar', desktopOnly: true }
    ],
    client: [
      { screen: 'home', key: 'home', icon: 'home' },
      { screen: 'channels', key: 'chat', icon: 'chat', badge: unreadBadge },
      { screen: 'hours', key: 'hours', icon: 'hours' },
      { screen: 'billing', key: 'billing', icon: 'money' },
      { screen: 'help', key: 'help', icon: 'shield' },
      { screen: 'report', key: 'reports', icon: 'report', desktopOnly: true }
    ],
    applicant: [
      { screen: 'home', key: 'home', icon: 'home' },
      { screen: 'tests', key: 'tests', icon: 'steps' },
      { screen: 'academy', key: 'academy', icon: 'school' },
      { screen: 'profile', key: 'me', icon: 'user' }
    ]
  };
  /* The VA variant: bench and onboarding VAs get Academy as the raised center tab instead of Report. */
  HQ.navFor = function (role) {
    var nav = (HQ.NAV[role] || HQ.NAV.owner).slice();
    var m = me();
    if (role === 'va' && m && m.status !== 'placed') nav = nav.map(function (n) { return n.screen === 'report' ? { screen: 'academy', key: 'academy', icon: 'school', primary: true } : (n.screen === 'academy' ? null : n); }).filter(Boolean);
    return nav;
  };
  /* Screens reachable from "More" per role (phone) */
  HQ.MORE = {
    owner: ['people', 'pipeline', 'bench', 'academy', 'reports', 'calendar', 'tickets', 'compliance', 'documents', 'payouts', 'announce', 'settings', 'audit', 'notifications'],
    manager: ['pipeline', 'bench', 'cohorts', 'calendar', 'documents', 'tickets', 'compliance', 'placements', 'payouts', 'announce', 'settings', 'notifications'],
    va: ['academy', 'calendar', 'documents', 'timeoff', 'support', 'payouts', 'placement', 'settings', 'notifications'],
    client: ['compliance', 'placement', 'report', 'settings', 'notifications'],
    applicant: ['notifications', 'settings']
  };
  HQ.SCREEN_ICON = { reports: 'chart', calendar: 'calendar', pipeline: 'steps', bench: 'briefcase', academy: 'school', cohorts: 'school', tickets: 'flag', compliance: 'shield', documents: 'doc', settings: 'gear', notifications: 'bell', placements: 'briefcase', payouts: 'money', profile: 'user', timeoff: 'calendar', support: 'lock', placement: 'briefcase', people: 'people', announce: 'bell', audit: 'doc', report: 'report', help: 'shield', clients: 'briefcase', money: 'money' };

  /* ---------- shared helpers the spec asks for ---------- */
  /* Money gate: renders a money value only when the viewer may see that kind ('bill' | 'pay' | 'margin'). */
  h.money = function (kind, value, opts) {
    opts = opts || {};
    if (!Dx.can(kind)) return (opts.mask || S.viewAs) ? '<span class="muted">$ •••</span>' : '';
    return '<span class="num">' + (opts.rate ? F.rate(value) : F.money(value, opts.cents)) + '</span>';
  };
  /* Work status of a placement today, from the seeded time entries (never typed). */
  HQ.status = function (pl) {
    var today = Dx.today(); var cl = Dx.client(pl.clientId) || {}; var tz = cl.tz || 'America/Los_Angeles';
    if (pl.status === 'paused') return { key: 'paused', live: false, text: t('paused'), minutesToday: 0 };
    if (pl.status !== 'active') return { key: 'ended', live: false, text: t('ended'), minutesToday: 0 };
    var entries = (D.timeEntries || []).filter(function (e) { return e.placementId === pl.id && e.date === today; });
    var mins = entries.reduce(function (n, e) { return n + (e.minutes || 0); }, 0);
    var open = entries.filter(function (e) { return !e.end; })[0];
    if (open) {
      var p = new Intl.DateTimeFormat('en-US', { timeZone: tz, hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(NOW);
      var nowMin = (+p.filter(function (x) { return x.type === 'hour'; })[0].value % 24) * 60 + (+p.filter(function (x) { return x.type === 'minute'; })[0].value);
      var sp = open.start.split(':'); var since = nowMin - ((+sp[0]) * 60 + (+sp[1]));
      if (!open.minutes) mins += Math.max(0, since);
      return { key: 'working', live: true, text: t('working'), since: open.start, tz: tz, minutesToday: mins, lastActivityMin: 2 };
    }
    if (entries.length) { var last = entries[entries.length - 1]; return { key: 'finished', live: false, text: t('finished'), at: last.end, tz: tz, minutesToday: mins }; }
    var dow = new Date(today + 'T12:00:00Z').getUTCDay();
    if (dow === 0 || dow === 6) return { key: 'off', live: false, text: t('offToday'), minutesToday: 0 };
    return { key: 'notStarted', live: false, text: t('notStarted'), minutesToday: 0 };
  };
  /* Status pill with the live dot and the detail line ("since 8:02 AM · 33 min today · last activity 2 min ago") */
  h.statusPill = function (pl, viewer) {
    var st = HQ.status(pl); var kind = st.key === 'working' ? 'good' : st.key === 'paused' ? 'bad' : st.key === 'notStarted' ? 'warn' : '';
    var detail = '';
    if (st.key === 'working') detail = t('sinceTime') + ' ' + F.ampm(st.since) + ' ' + F.tz(st.tz) + ' · ' + t('minToday', { h: F.hrs(st.minutesToday) }) + ' · ' + t('lastActivity', { n: st.lastActivityMin });
    else if (st.key === 'finished') detail = F.ampm(st.at) + ' ' + F.tz(st.tz) + ' · ' + t('minToday', { h: F.hrs(st.minutesToday) });
    return h.chip(st.text, kind, true) + (detail ? ' <span class="small muted">' + esc(detail) + '</span>' : '');
  };

  /* ---------- routing ---------- */
  HQ.V = HQ.V || {};
  HQ.act = HQ.act || {};
  HQ.go = function (screen, params, replace) {
    if (!replace) S.hist.push({ screen: S.screen, params: S.params });
    if (S.hist.length > 40) S.hist.shift();
    S.screen = screen; S.params = params || {}; S.phoneList = false; S._fresh = true;
    render();
    var c = document.querySelector('.main .content'); if (c) c.scrollTop = 0;
  };
  HQ.back = function () { var p = S.hist.pop(); if (p) { S.screen = p.screen; S.params = p.params; render(); } else { HQ.go(homeScreen(), {}, true); } };
  function homeScreen() { return HQ.role() === 'manager' ? 'inbox' : 'home'; }
  HQ.homeScreen = homeScreen;
  /* switching person keeps the language the viewer chose with the globe; with no choice, the app follows the person's own setting */
  HQ.setUser = function (id) { S.userId = id; S.viewAs = null; S.hist = []; persist(); HQ.go(homeScreen(), {}, true); };
  HQ.setLang = function (l) { S.lang = l; persist(); render(); };
  HQ.setTheme = function (th) { S.theme = th; persist(); applyTheme(); render(); };
  function applyTheme() { var r = document.documentElement; if (S.theme === 'auto') r.removeAttribute('data-theme'); else r.setAttribute('data-theme', S.theme); }

  /* ---------- sheets and toasts ---------- */
  HQ.sheet = function (html, title) {
    HQ.closeSheet();
    var el = document.createElement('div'); el.className = 'sheet-bg'; el.id = 'sheet';
    el.innerHTML = '<div class="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title"><div class="sheet-head"><h2 id="sheet-title">' + esc(title || '') + '</h2><button class="iconbtn" data-act="close-sheet" aria-label="' + esc(t('close')) + '">' + I.x + '</button></div>' + html + '</div>';
    el.addEventListener('click', function (e) { if (e.target === el) HQ.closeSheet(); });
    document.body.appendChild(el);
    var f = el.querySelector('input,textarea,select,button.btn'); if (f && window.innerWidth > 900) f.focus();
  };
  HQ.closeSheet = function () { var el = document.getElementById('sheet'); if (el) el.remove(); };
  HQ.toast = function (msg, ms) { var old = document.getElementById('toast'); if (old) old.remove(); var el = document.createElement('div'); el.className = 'toast'; el.id = 'toast'; el.setAttribute('role', 'status'); el.setAttribute('aria-live', 'polite'); el.textContent = msg; document.body.appendChild(el); setTimeout(function () { if (el.parentNode) el.remove(); }, ms || 2600); };
  HQ.formVals = function (root) { var o = {}; (root || document).querySelectorAll('[name]').forEach(function (i) { if (i.type === 'checkbox') o[i.name] = i.checked; else o[i.name] = i.value; }); return o; };

  /* ---------- the role picker ---------- */
  HQ.PICK = [
    { id: 'u-charly', sub: { en: 'Owner · sees everything', es: 'Propietario · ve todo' } },
    { id: 'u-daniela', sub: { en: 'Manager in Honduras · runs the day', es: 'Gerente en Honduras · lleva el día a día' } },
    { id: 'u-mariela', sub: { en: 'VA · ISA placed with Rodriguez Home Team', es: 'VA · ISA colocada con Rodriguez Home Team' } },
    { id: 'u-jose', sub: { en: 'VA · admin placed with Lone Star Realty', es: 'VA · admin colocado con Lone Star Realty' } },
    { id: 'u-andrea', sub: { en: 'VA · operations, day 21 at Sunshine Coast', es: 'VA · operaciones, día 21 en Sunshine Coast' } },
    { id: 'u-kevin', sub: { en: 'VA · ISA certified, on the bench', es: 'VA · certificado ISA, en banca' } },
    { id: 'u-carlos', sub: { en: 'VA · in the academy (October cohort)', es: 'VA · en la academia (cohorte de octubre)' } },
    { id: 'u-ana', sub: { en: 'Client · team leader, Rodriguez Home Team', es: 'Cliente · líder de equipo, Rodriguez Home Team' } },
    { id: 'u-mike', sub: { en: 'Client · broker-owner, Lone Star Realty', es: 'Cliente · broker propietario, Lone Star Realty' } },
    { id: 'u-priya', sub: { en: 'Client · team leader, Sunshine Coast Partners', es: 'Cliente · líder de equipo, Sunshine Coast Partners' } },
    { id: 'a-sofia', sub: { en: 'Applicant · interview tomorrow', es: 'Candidata · entrevista mañana' } },
    { id: 'a-camila', sub: { en: 'Applicant · offer stage, November cohort', es: 'Candidata · etapa de oferta, cohorte de noviembre' } }
  ];
  function pickerHtml() {
    var s = '<div class="rolepick" id="picker"><div class="box"><div class="row between" style="margin-bottom:6px"><h2 style="font-size:24px">' + esc(t('whoAreYou')) + '</h2>' + (S.picker === 'first' ? '' : '<button class="iconbtn" data-act="close-picker" aria-label="' + esc(t('close')) + '">' + I.x + '</button>') + '</div><p class="small muted" style="margin-bottom:14px">' + esc(t('whoSub')) + '</p>';
    var lastRole = '';
    HQ.PICK.forEach(function (pk) {
      var p = byId[pk.id]; if (!p) return;
      if (p.role !== lastRole) { s += '<div class="sgroup" style="padding-left:2px">' + esc(t(p.role)) + '</div>'; lastRole = p.role; }
      s += '<button class="rolecard ' + (p.id === S.userId ? 'active' : '') + '" data-act="pick-user" data-id="' + p.id + '">' + h.avatar(p) + '<div class="grow"><div class="t">' + esc(p.name) + '</div><div class="s">' + esc(L(pk.sub)) + ' · ' + (p.lang === 'es' ? 'ES' : 'EN') + ' · ' + esc(F.tz(p.tz)) + '</div></div>' + I.chev.replace('<svg', '<svg width="18" height="18" style="stroke:var(--fg-3);fill:none;stroke-width:2"') + '</button>';
    });
    s += '<div class="row between wrap" style="margin-top:12px;gap:8px"><span class="small b">' + esc(t('language')) + '</span>' + h.seg([{ v: '', l: t('personLang') }, { v: 'en', l: 'English' }, { v: 'es', l: 'Español' }], S.lang || '', 'set-lang-opt') + '</div>';
    s += '<div class="row between wrap" style="margin-top:8px;gap:8px"><span class="small b">' + esc(t('theme')) + '</span>' + h.seg([{ v: 'auto', l: t('auto') }, { v: 'light', l: t('light') }, { v: 'dark', l: t('dark') }], S.theme, 'set-theme') + '</div>';
    s += '<p class="tiny muted" style="margin-top:10px">' + esc(t('mfaPickerNote')) + '</p>';
    return s + '</div></div>';
  }

  /* ---------- the frame ---------- */
  function navFor(role) { return HQ.navFor(role); }
  function railHtml() {
    var m = me(); var role = HQ.role();
    var s = '<nav class="rail" aria-label="' + esc(t('navMain')) + '"><div class="mark" title="BeyondVAs HQ"><svg viewBox="0 0 52 40" fill="none" stroke="#2A1E00" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 30 L22 10 L40 30"/><path d="M16 36 L34 16 L50 32"/></svg></div>';
    navFor(role).filter(function (n) { return !n.phoneOnly; }).forEach(function (n) {
      var b = n.badge ? n.badge() : 0;
      s += '<button class="rbtn ' + (isActive(n.screen) ? 'active' : '') + '" data-go="' + n.screen + '" title="' + esc(t(n.key)) + '">' + I[n.icon] + '<span>' + esc(t(n.key)) + '</span>' + h.badge(b) + '</button>';
    });
    s += '<div class="spacer"></div>';
    s += '<button class="rbtn" data-act="toggle-lang" title="' + esc(t('language')) + '" aria-label="' + esc(t('language')) + '">' + I.globe + '<span>' + (HQ.lang() === 'es' ? 'ES' : 'EN') + '</span></button>';
    s += '<button class="rbtn" data-act="toggle-theme" title="' + esc(t('theme')) + '" aria-label="' + esc(t('theme')) + '">' + (isDark() ? I.sun : I.moon) + '</button>';
    s += '<button class="avbtn" data-act="open-picker" title="' + esc(t('switchUser')) + '" aria-label="' + esc(t('switchUser')) + '">' + h.avatar(m) + '</button>';
    return s + '</nav>';
  }
  function isDark() { return document.documentElement.getAttribute('data-theme') === 'dark' || (S.theme === 'auto' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches); }
  function isActive(screen) {
    if (S.screen === screen) return true;
    var fam = { channels: ['channel', 'search'], people: ['person', 'pipeline', 'bench', 'applicant', 'cohorts', 'academy', 'placements', 'placement'], money: ['billing', 'payouts', 'invoice', 'block'], hours: ['week', 'statement'], home: [], inbox: [], more: HQ.MORE[HQ.role()] || [] };
    return (fam[screen] || []).indexOf(S.screen) >= 0;
  }
  function tabsHtml() {
    var role = HQ.role();
    var s = '<nav class="tabs" aria-label="' + esc(t('navTabs')) + '">';
    navFor(role).filter(function (n) { return !n.desktopOnly; }).forEach(function (n) {
      var b = n.badge ? n.badge() : 0;
      if (n.primary) {
        /* the raised Report tab shows a check once today's report is in */
        var sent = false; if (n.screen === 'report' && HQ.todayReport) { var pl0 = Dx.placementForVa(me().id); sent = !!(pl0 && HQ.todayReport(pl0.id)); }
        s += '<button class="tab primary ' + (isActive(n.screen) ? 'active' : '') + '" data-go="' + n.screen + '"><span class="ico">' + (sent ? I.check : I[n.icon]) + '</span><span>' + esc(t(n.key)) + '</span></button>';
      }
      else s += '<button class="tab ' + (isActive(n.screen) ? 'active' : '') + '" data-go="' + n.screen + '">' + I[n.icon] + '<span>' + esc(t(n.key)) + '</span>' + h.badge(b) + '</button>';
    });
    return s + '</nav>';
  }
  function topbarHtml(v) {
    var m = me();
    var s = '<header class="topbar">';
    var isRoot = navFor(HQ.role()).some(function (n) { return n.screen === S.screen; }) && !S.hist.length;
    if (!isRoot) s += '<button class="iconbtn back" data-act="back" aria-label="' + esc(t('back')) + '">' + I.back + '</button>';
    s += '<div class="ttl grow"><h1>' + (v.title || '') + '</h1>' + (v.sub ? '<span class="sub ellipsis">' + v.sub + '</span>' : '') + '</div>';
    s += '<div class="row" style="gap:4px">' + (v.actions || '');
    /* the language tabs: always visible, on every screen */
    s += '<div class="seg langtab" role="tablist" aria-label="' + esc(t('language')) + '">' + [['en', 'EN'], ['es', 'ES']].map(function (x) { return '<button role="tab" aria-selected="' + (HQ.lang() === x[0]) + '" class="' + (HQ.lang() === x[0] ? 'active' : '') + '" data-act="set-lang" data-v="' + x[0] + '">' + x[1] + '</button>'; }).join('') + '</div>';
    if (m.role === 'client' && !v.noEscalate) { var cpl = Dx.placementForClient(m.clientId)[0]; if (cpl) s += '<button class="btn btn-red btn-sm" data-act="open-escalate" data-id="' + cpl.id + '">' + esc(t('escalate')) + '</button>'; }
    if (!v.noBell) s += '<button class="iconbtn" data-go="notifications" aria-label="' + esc(t('notifications')) + '">' + I.bell + h.badge(Dx.unreadNotifs(m)) + '</button>';
    s += '<button class="iconbtn" data-act="open-picker" aria-label="' + esc(t('switchUser')) + '" style="display:none" id="phoneAv">' + h.avatar(m, 'sm') + '</button>';
    s += '</div></header>';
    if (S.viewAs) { var real = HQ.realMe(); s += '<div class="pinbar" style="background:var(--blue-soft);color:var(--blue)">' + I.eye + '<span class="grow">' + esc(t('viewingAs')) + ' <b>' + esc(m.name) + '</b> (' + esc(t(m.role)) + ')</span><button class="btn btn-sm btn-blue" data-act="exit-view">' + esc(t('exitView')) + '</button></div>'; }
    return s;
  }
  var render = HQ.render = function () {
    index();
    var root = document.getElementById('app'); if (!root) return;
    var view = HQ.V[S.screen];
    if (!view) view = HQ.V.missing;
    var v; try { v = view(S.params) || {}; } catch (err) { v = { title: t('errorTitle'), body: '<div class="note bad">' + esc(err && err.message) + '</div>' }; if (window.console) console.error(err); }
    var cls = 'app' + (v.pane ? ' has-pane' : '') + (v.side ? '' : ' no-side') + (v.phoneSide ? ' show-side' : '') + (v.phonePane ? ' show-pane' : '');
    var html = '<div class="' + cls + '">' + railHtml();
    if (v.side) html += '<aside class="side">' + v.side + '</aside>';
    html += '<section class="main">' + topbarHtml(v) + '<div class="content ' + (v.chat ? 'chat' : v.wide ? '' : 'narrow') + '">' + (v.body || '') + '</div></section>';
    if (v.pane) html += '<aside class="pane">' + v.pane + '</aside>';
    html += tabsHtml() + '</div>';
    if (S.picker) html += pickerHtml();
    /* a re-render in place (an action on the same screen) keeps the scroll position; HQ.go starts a fresh screen at the top */
    var keepEl = S._fresh ? null : document.querySelector('.main .content'); var keepTop = keepEl ? keepEl.scrollTop : 0; S._fresh = false;
    root.innerHTML = html;
    if (keepTop) { var c2 = document.querySelector('.main .content'); if (c2) c2.scrollTop = keepTop; }
    if (window.innerWidth <= 900) { var pa = document.getElementById('phoneAv'); if (pa) pa.style.display = 'grid'; }
    if (v.after) { try { v.after(); } catch (e) { if (window.console) console.error(e); } }
    document.title = (v.plainTitle || (v.title || '').replace(/<[^>]+>/g, '')) + ' · BeyondVAs HQ';
  };

  HQ.V.missing = function () { return { title: S.screen, body: h.empty(t('nothingHere'), t('notInPrototype', { s: S.screen })) }; };
  HQ.V.more = function () {
    var role = HQ.role();
    var s = '<div class="list">';
    (HQ.MORE[role] || []).forEach(function (sc) { s += h.li({ lead: '<span class="hash">' + (I[HQ.SCREEN_ICON[sc] || 'doc']).replace('<svg', '<svg width="20" height="20" style="fill:none;stroke:currentColor;stroke-width:1.8"') + '</span>', title: esc(t(sc)), go: sc }); });
    s += '</div>';
    s += '<div class="sec"><h2>' + esc(t('settings')) + '</h2></div><div class="card flat tight stack">';
    s += '<div class="row between"><span class="b">' + esc(t('language')) + '</span>' + h.seg([{ v: 'en', l: 'English' }, { v: 'es', l: 'Español' }], HQ.lang(), 'set-lang') + '</div>';
    s += '<div class="row between"><span class="b">' + esc(t('theme')) + '</span>' + h.seg([{ v: 'auto', l: t('auto') }, { v: 'light', l: t('light') }, { v: 'dark', l: t('dark') }], S.theme, 'set-theme') + '</div>';
    s += '<div class="row between"><span class="b">' + esc(t('switchUser')) + '</span>' + h.btn(esc(me().name), 'open-picker', 'btn-ghost btn-sm') + '</div></div>';
    s += '<p class="proto" style="margin-top:18px">' + esc(t('prototype')) + '</p>';
    return { title: t('more'), body: s };
  };
  HQ.V.notifications = function () {
    var ns = Dx.notificationsFor(me());
    var s = '<div class="row between" style="margin-bottom:8px"><span class="small muted">' + ns.length + '</span>' + h.btn(esc(t('markAllRead')), 'notifs-read', 'btn-ghost btn-sm') + '</div><div class="list">';
    if (!ns.length) s += h.empty(t('allCaughtUp'));
    ns.forEach(function (n) {
      var go = n.link && n.link.screen ? n.link.screen : null; var params = n.link && n.link.id ? { id: n.link.id } : {};
      s += h.li({ lead: '<span class="hash ' + (n.read ? '' : 'ann') + '">' + (I[{ mention: 'chat', 'report-missing': 'report', 'approval-due': 'hours', 'invoice-failed': 'money', checkpoint: 'flag', 'document-expiry': 'doc', payday: 'money', ticket: 'flag', pulse: 'sparkle', message: 'chat' }[n.kind] || 'bell']).replace('<svg', '<svg width="18" height="18" style="fill:none;stroke:currentColor;stroke-width:1.8"') + '</span>', title: (n.read ? '' : '<span class="badge blue" style="margin-right:6px">·</span>') + esc(L(n.text)), sub: F.rel(n.at), go: go, params: params, cls: n.read ? '' : 'b' });
    });
    return { title: t('notifications'), body: s + '</div>' };
  };

  /* ---------- core actions ---------- */
  Object.assign(HQ.act, {
    back: function () { HQ.back(); },
    'open-picker': function () { S.picker = true; render(); },
    'close-picker': function () { S.picker = false; render(); },
    'pick-user': function (el) { S.picker = false; HQ.setUser(el.dataset.id); },
    'toggle-lang': function () { HQ.setLang(HQ.lang() === 'es' ? 'en' : 'es'); },
    'set-lang': function (el) { HQ.setLang(el.dataset.v); },
    'set-lang-opt': function (el) { HQ.setLang(el.dataset.v || null); },
    'toggle-theme': function () { HQ.setTheme(isDark() ? 'light' : 'dark'); },
    'set-theme': function (el) { HQ.setTheme(el.dataset.v); },
    'close-sheet': function () { HQ.closeSheet(); },
    'view-as': function (el) { S.viewAs = el.dataset.id; S.hist = []; HQ.go('home', {}, true); },
    'exit-view': function () { S.viewAs = null; S.hist = []; HQ.go(homeScreen(), {}, true); },
    'notifs-read': function () { Dx.notificationsFor(me()).forEach(function (n) { n.read = true; }); render(); },
    'toast': function (el) { HQ.toast(el.dataset.msg || t('prototypeOnly')); }
  });

  /* ---------- event delegation ---------- */
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-go],[data-act]'); if (!el) return;
    if (el.tagName === 'A' && !el.dataset.go && !el.dataset.act) return;
    if (el.dataset.go) { e.preventDefault(); var params = {}; Object.keys(el.dataset).forEach(function (k) { if (k !== 'go') params[k] = el.dataset[k]; }); HQ.go(el.dataset.go, params); return; }
    /* "View as client" is read-only: only navigation, filters and the view's own controls work */
    if (S.viewAs && !/^(back|open-picker|close-picker|close-sheet|exit-view|toggle-|set-|members|scroll-to|cal-|open-event|hours-|bill-filter|pick-run|tickets-filter|support-filter|people-seg|docs-seg|pipeline-filter|bench-|placements-filter|qa-week|toast|notifs-read)/.test(el.dataset.act)) { e.preventDefault(); HQ.toast(t('readOnlyView')); return; }
    var fn = HQ.act[el.dataset.act]; if (fn) { e.preventDefault(); fn(el, e); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { if (document.getElementById('sheet')) HQ.closeSheet(); else if (S.picker && S.picker !== 'first') { S.picker = false; render(); } }
    /* keyboard users can activate role="button" elements (calendar day cells) with Enter or Space */
    if ((e.key === 'Enter' || e.key === ' ') && e.target && e.target.getAttribute && e.target.getAttribute('role') === 'button' && e.target.dataset && e.target.dataset.act) { e.preventDefault(); e.target.click(); }
  });
  /* re-render on resize only when the layout breakpoint changes (a phone keyboard opening must not wipe a draft) */
  var lastPhone = window.innerWidth <= 900, rzTimer = null;
  window.addEventListener('resize', function () { clearTimeout(rzTimer); rzTimer = setTimeout(function () { var ph = window.innerWidth <= 900; if (ph !== lastPhone) { lastPhone = ph; render(); } }, 120); });
  window.addEventListener('hashchange', function () { var m = location.hash.match(/^#\/([a-z-]+)(?:\/([^\/]+))?/); if (m && HQ.V[m[1]]) HQ.go(m[1], m[2] ? { id: m[2] } : {}, true); });

  /* ---------- boot ---------- */
  HQ.boot = function () {
    applyTheme();
    if (!byId[S.userId]) S.userId = 'u-charly';
    var m = location.hash.match(/^#\/([a-z-]+)(?:\/([^\/]+))?/);
    S.screen = (m && HQ.V[m[1]]) ? m[1] : homeScreen(); S.params = (m && m[2]) ? { id: m[2] } : {};
    var seen = false; try { seen = !!localStorage.getItem('bvhq-seen'); } catch (e) {}
    if (!seen) { S.picker = 'first'; try { localStorage.setItem('bvhq-seen', '1'); } catch (e) {} }
    render();
  };
})();
