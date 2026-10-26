/* BeyondVAs HQ prototype: channels (the Slack replica), daily report form, search. */
(function () {
  var HQ = window.HQ, D = window.HQD, Dx = HQ.D, h = HQ.h, t = HQ.t, L = HQ.L, esc = HQ.esc, F = HQ.fmt, I = HQ.I, S = HQ.S;
  var isPhone = HQ.isPhone = function () { return window.innerWidth <= 900; };

  Object.assign(HQ.T, {
    pickConversation: { en: 'Pick a conversation', es: 'Elige una conversación' },
    pickSub: { en: 'Client channels, your team, direct messages and private support threads live here.', es: 'Los canales de clientes, tu equipo, mensajes directos e hilos privados de soporte viven aquí.' },
    reportTitle: { en: 'Daily report', es: 'Reporte diario' },
    reportsToday: { en: 'Reports today', es: 'Reportes de hoy' },
    sent: { en: 'Sent', es: 'Enviado' }, notYet: { en: 'Not yet', es: 'Aún no' },
    onlyVasReport: { en: 'Only VAs send daily reports.', es: 'Solo los VAs envían reportes diarios.' },
    noPlacement: { en: 'You are not placed with a client yet, so there is no report to send. Use #team or your support thread.', es: 'Aún no tienes cliente asignado, así que no hay reporte que enviar. Usa #equipo o tu hilo de soporte.' },
    editReport: { en: 'Send a correction', es: 'Enviar una corrección' },
    typing: { en: 'is typing…', es: 'está escribiendo…' },
    localTimeNow: { en: 'local time now', es: 'hora local ahora' },
    replyPrivately: { en: 'Reply privately', es: 'Responder en privado' },
    postedBy: { en: 'Posted by', es: 'Publicado por' },
    clientSeesNote: { en: 'The client sees this channel too. Keep pay and other clients out of it.', es: 'El cliente también ve este canal. No menciones pagos ni a otros clientes aquí.' },
    threadNote: { en: 'Private. The client never sees this thread.', es: 'Privado. El cliente nunca ve este hilo.' },
    announcementsNote: { en: 'Posts here go to everyone in both languages.', es: 'Lo que publiques aquí llega a todos en ambos idiomas.' },
    searchIn: { en: 'Searching in everything you can see', es: 'Buscando en todo lo que puedes ver' },
    goToMessage: { en: 'Go to message', es: 'Ir al mensaje' },
    attachNote: { en: 'Attachments up to 25 MB. In the prototype nothing is uploaded.', es: 'Adjuntos de hasta 25 MB. En el prototipo no se sube nada.' },
    kpiNote: { en: 'ISA numbers feed the weekly and 30-day reviews.', es: 'Los números de ISA alimentan las revisiones semanal y de 30 días.' },
    forPlacement: { en: 'For', es: 'Para' },
    reportPreview: { en: 'This posts into the client channel as a report card.', es: 'Esto se publica en el canal del cliente como una tarjeta de reporte.' },
    messageIn: { en: 'Message {name}', es: 'Escribe en {name}' },
    writeToClient: { en: 'You write to {name} · in English', es: 'Escribes a {name} · en inglés' },
    looksGood: { en: 'Looks good', es: 'Se ve bien' },
    kpiOrder: { en: 'Conversations cannot exceed dials, and appointments set cannot exceed conversations.', es: 'Las conversaciones no pueden superar las llamadas, ni las citas agendadas superar las conversaciones.' },
    postAnnouncement: { en: 'Post an announcement', es: 'Publicar un anuncio' },
    announceSub: { en: 'Everyone reads it in their own language. Write both.', es: 'Todos lo leen en su idioma. Escribe ambos.' },
    englishText: { en: 'In English', es: 'En inglés' }, spanishText: { en: 'In Spanish', es: 'En español' },
    postToAll: { en: 'Post to everyone', es: 'Publicar a todos' },
    bothLanguages: { en: 'Write the announcement in both languages.', es: 'Escribe el anuncio en ambos idiomas.' },
    posted: { en: 'Announcement posted', es: 'Anuncio publicado' }
  });

  /* ---------- helpers ---------- */
  function previewText(m) {
    if (!m) return '';
    if (m.kind === 'report') return t('dailyReport');
    if (m.kind === 'system') return L(m.text);
    var txt = typeof m.text === 'string' ? m.text : L(m.text);
    return txt.replace(/\s+/g, ' ');
  }
  function authorLabel(p, viewer) {
    if (!p) return '…';
    if (viewer.role === 'client' && p.role === 'va') return p.first;
    return p.name;
  }
  function roleTag(p) { if (!p) return ''; return p.role === 'owner' ? t('owner') : p.role === 'manager' ? t('manager') : p.role === 'va' ? 'VA' : p.role === 'client' ? t('client') : ''; }
  function mentionize(text, meP) {
    var s = esc(text);
    s = s.replace(/@([A-Za-zÁÉÍÓÚÑáéíóúñ]+(?: [A-Z][a-záéíóúñ]+)?)/g, function (m0, name) {
      var isMe = meP && (name.toLowerCase() === meP.first.toLowerCase() || (name.toLowerCase() === 'manager' && meP.role === 'manager') || name.toLowerCase() === 'everyone' || name.toLowerCase() === 'todos');
      return '<span class="mention ' + (isMe ? 'me' : '') + '">@' + name + '</span>';
    });
    return s;
  }
  function otherPartyTz(c, viewer) {
    /* in a client channel: a VA sees the client's zone, a client sees the VA's zone */
    if (c.kind !== 'client') return null;
    var cl = Dx.client(c.clientId), pl = Dx.placement(c.placementId), va = pl ? Dx.person(pl.vaId) : null;
    if (viewer.role === 'client') return va ? { tz: va.tz, who: va.first, city: va.city } : null;
    return cl ? { tz: cl.tz, who: cl.name, city: cl.city } : null;
  }
  HQ.todayReport = function (placementId) {
    var ch = (D.channels || []).filter(function (c) { return c.placementId === placementId; })[0]; if (!ch) return null;
    return Dx.messagesIn(ch.id).filter(function (m) { return m.kind === 'report' && HQ.isoDate(m.at) === Dx.today(); })[0] || null;
  };
  HQ.lastReportFor = function (placementId) {
    var ch = (D.channels || []).filter(function (c) { return c.placementId === placementId; })[0]; if (!ch) return null;
    var rs = Dx.messagesIn(ch.id).filter(function (m) { return m.kind === 'report'; }); return rs.length ? rs[rs.length - 1] : null;
  };
  HQ.channelForPlacement = function (placementId) { return (D.channels || []).filter(function (c) { return c.placementId === placementId; })[0] || null; };

  /* ---------- channel list ---------- */
  function groupRows(list, activeId, viewer) {
    var s = '';
    list.forEach(function (c) {
      var last = Dx.lastMessage(c.id); var un = Dx.unread(c.id, viewer);
      var lead;
      if (c.kind === 'dm') { var other = c.members.filter(function (m) { return m !== viewer.id; })[0]; lead = h.avatar(other); }
      else if (c.kind === 'client') { var pl = Dx.placement(c.placementId); lead = pl ? h.avatar(pl.vaId) : '<span class="hash">#</span>'; }
      else if (c.kind === 'thread') lead = '<span class="hash">' + I.lock.replace('<svg', '<svg width="16" height="16" style="fill:none;stroke:currentColor;stroke-width:2"') + '</span>';
      else lead = '<span class="hash ' + (c.kind === 'announcements' ? 'ann' : '') + '">#</span>';
      var name = Dx.channelName(c, viewer).replace(/^#/, '');
      if (c.kind === 'client' && viewer.role === 'client') { var pl2 = Dx.placement(c.placementId); var va = pl2 ? Dx.person(pl2.vaId) : null; name = va ? va.first + ' · ' + Dx.tierShort(pl2.tier) : name; }
      var prev = last ? (last.kind === 'report' ? '' : (Dx.person(last.authorId) ? (last.authorId === viewer.id ? (HQ.lang() === 'es' ? 'Tú: ' : 'You: ') : Dx.person(last.authorId).first + ': ') : '')) + previewText(last) : '';
      s += '<button class="srow ' + (c.id === activeId ? 'active' : '') + (un ? ' unread' : '') + '" data-go="channel" data-id="' + c.id + '">' + lead + '<div class="grow"><div class="name ellipsis">' + (c.kind === 'public' || c.kind === 'announcements' ? '#' : '') + esc(name) + '</div><div class="prev ellipsis">' + esc(prev) + '</div></div><div class="meta"><span>' + (last ? F.rel(last.at) : '') + '</span>' + h.badge(un) + '</div></button>';
    });
    return s;
  }
  function listHtml(activeId) {
    var viewer = HQ.me(); var all = Dx.channelsFor(viewer);
    /* order per DESIGN-SPEC §4.1: client channels pinned first, then announcements, team, DMs, support */
    var groups = [
      { k: 'client', l: viewer.role === 'client' ? t('myVA') : t('clientChannels'), f: function (c) { return c.kind === 'client'; } },
      { k: 'announcements', l: t('announcements'), f: function (c) { return c.kind === 'announcements'; } },
      { k: 'public', l: t('teamCh'), f: function (c) { return c.kind === 'public'; } },
      { k: 'dm', l: t('dms'), f: function (c) { return c.kind === 'dm'; } },
      { k: 'thread', l: viewer.role === 'va' ? t('support') : t('supportThreads'), f: function (c) { return c.kind === 'thread'; } }
    ];
    var s = '<div class="side-head"><div class="row between"><h2>' + esc(t('channels')) + '</h2><button class="iconbtn" data-go="search" aria-label="' + esc(t('search')) + '">' + I.search + '</button></div></div><div class="side-body">';
    groups.forEach(function (g) {
      var items = all.filter(g.f); if (!items.length) return;
      if (g.k === 'announcements' || g.k === 'public') { s += (g.k === 'announcements' ? '<div class="sgroup">' + esc(g.l) + '</div>' : '') + groupRows(items, activeId, viewer); return; }
      s += '<div class="sgroup">' + esc(g.l) + (g.k === 'dm' ? '<button class="iconbtn" style="width:26px;height:26px" data-act="toast" data-msg="' + esc(t('prototypeOnly')) + '" aria-label="' + esc(t('dms')) + '">' + I.plus.replace('<svg', '<svg width="16" height="16"') + '</button>' : '') + '</div>' + groupRows(items, activeId, viewer);
    });
    if (viewer.role === 'client') s += '<div class="note tiny" style="margin:14px 4px 0">' + esc(t('digestNote')) + '</div>';
    return s + '</div>';
  }

  /* ---------- views ---------- */
  HQ.V.channels = function () {
    var viewer = HQ.me(); var all = Dx.channelsFor(viewer);
    /* a client with a single conversation lands straight in it (DESIGN-SPEC §4.7) */
    if (viewer.role === 'client' && all.length === 1) return HQ.V.channel({ id: all[0].id });
    if (!isPhone() && all.length) {
      var first = all.filter(function (c) { return Dx.unread(c.id, viewer) > 0; })[0] || all.filter(function (c) { return c.kind === 'client'; })[0] || all[0];
      return HQ.V.channel({ id: first.id });
    }
    var body = listHtml(null).replace('<div class="side-head">', '<div class="side-head" style="display:none">');
    return { title: t('channels'), body: '<div class="card flat tight" style="padding:4px 2px">' + body + '</div>', actions: '<button class="iconbtn" data-go="search" aria-label="' + esc(t('search')) + '">' + I.search + '</button>' };
  };

  HQ.V.channel = function (p) {
    var viewer = HQ.me(); var c = Dx.channelsFor(viewer).filter(function (x) { return x.id === p.id; })[0];
    if (!c) return { title: t('channels'), side: isPhone() ? null : listHtml(null), body: h.empty(t('nothingHere'), '') };
    var msgs = Dx.messagesIn(c.id); var lr = Dx.lastRead(viewer, c.id);
    var name = Dx.channelName(c, viewer);
    var sub = '', extra = '';
    if (c.kind === 'client') {
      var pl = Dx.placement(c.placementId), cl = Dx.client(c.clientId), va = pl ? Dx.person(pl.vaId) : null;
      var op = otherPartyTz(c, viewer);
      if (viewer.role === 'client') { sub = (va ? va.first + ' · ' + Dx.tierShort(pl.tier) + ' · ' + va.city : '') + (op ? ' · ' + F.time(HQ.now().toISOString(), op.tz) + ' ' + t('localTimeNow') : ''); name = va ? va.first : name; }
      else sub = (cl ? cl.name + ' · ' + cl.city : '') + (op ? ' · ' + F.time(HQ.now().toISOString(), op.tz) + ' ' + F.tz(op.tz) : '');
    } else if (c.kind === 'dm') { var other = Dx.person(c.members.filter(function (m) { return m !== viewer.id; })[0]); sub = other ? (L(other.title) || roleTag(other)) + ' · ' + other.city + ' · ' + F.time(HQ.now().toISOString(), other.tz) : ''; }
    else if (c.kind === 'thread') { var tv = Dx.person(c.vaId); sub = (viewer.role === 'va' ? t('privateWithManager') : (tv ? tv.name + ' · ' : '') + t('threadNote')); }
    else if (c.kind === 'announcements') sub = t('readOnly');
    else sub = (c.members.length) + ' ' + t('members').toLowerCase();

    /* messages */
    var body = '<div class="chat-wrap">';
    var pinned = msgs.filter(function (m) { return m.pinned; })[0];
    if (pinned) body += '<button class="pinbar" style="border:0;width:100%;text-align:left;cursor:pointer" data-act="scroll-to" data-id="' + pinned.id + '">' + I.pin + '<span class="ellipsis grow">' + esc(t('pinned')) + ': ' + esc(previewText(pinned)) + '</span></button>';
    if (c.kind === 'client' && viewer.role === 'va') body += '<div class="pinbar" style="background:var(--blue-soft);color:var(--blue)">' + I.eye + '<span class="grow" style="white-space:normal">' + esc(t('clientSeesNote')) + '</span></div>';
    body += '<div class="msgs" id="msgs">';
    var lastDay = '', unreadShown = false, prevAuthor = null, prevAt = 0;
    if (!msgs.length) body += h.empty(t('nothingHere'), '');
    msgs.forEach(function (m) {
      var day = HQ.isoDate(m.at);
      if (day !== lastDay) { body += '<div class="day-div">' + esc(F.dayLabel(day)) + '</div>'; lastDay = day; prevAuthor = null; }
      if (!unreadShown && m.authorId !== viewer.id && Date.parse(m.at) > lr && lr > 0) { body += '<div class="unread-line" id="unread">' + esc(t('newMessages')) + '</div>'; unreadShown = true; prevAuthor = null; }
      body += msgHtml(m, viewer, c, prevAuthor === m.authorId && m.kind === 'text' && Date.parse(m.at) - prevAt < 5 * 60000);
      prevAuthor = m.kind === 'text' ? m.authorId : null; prevAt = Date.parse(m.at);
    });
    body += '</div><div class="typing" id="typing"></div>';

    /* compose */
    var canPost = true, note = '';
    if (c.kind === 'announcements') { canPost = (c.posters || []).indexOf(viewer.id) >= 0; note = canPost ? t('announcementsNote') : t('readOnly'); }
    if (HQ.S.viewAs) { canPost = false; note = t('readOnlyView'); }
    if (c.kind === 'announcements' && canPost) {
      body += '<div class="compose"><div class="row between wrap"><span class="small muted">' + esc(t('announcementsNote')) + '</span>' + h.go(I.send + esc(t('postAnnouncement')), 'announce', {}, 'btn-gold btn-sm') + '</div></div>';
      canPost = false; note = '';
    }
    if (canPost) {
      var ph = c.kind === 'dm' ? t('writeMessage') : t('messageIn', { name: name.replace(/^#/, '') });
      body += '<div class="compose"><div class="box"><textarea id="composeText" rows="1" placeholder="' + esc(ph) + '" aria-label="' + esc(ph) + '"></textarea><button class="send" data-act="send-msg" data-id="' + c.id + '" aria-label="' + esc(t('send')) + '">' + I.send + '</button></div>';
      body += '<div class="tools"><button class="btn btn-ghost btn-sm" data-act="toast" data-msg="' + esc(t('attachNote')) + '">' + I.clip + esc(t('attach')) + '</button>';
      if (c.kind === 'client' && viewer.role === 'va') body += '<button class="btn btn-gold btn-sm" data-go="report">' + I.report + esc(t('dailyReport')) + '</button>';
      if (c.kind === 'client' && viewer.role === 'client') body += '<button class="btn btn-ghost btn-sm" data-act="open-escalate" data-id="' + (c.placementId || '') + '">' + I.flag + esc(t('escalate')) + '</button>';
      if (c.kind === 'client' && viewer.role === 'va') body += '<button class="btn btn-ghost btn-sm" data-go="channel" data-id="' + (threadFor(viewer.id) || '') + '">' + I.lock + esc(t('replyPrivately')) + '</button>';
      var hint = note || (c.kind === 'dm' ? '' : t('mentionHint'));
      if (c.kind === 'client' && viewer.role === 'va') { var contact = Dx.person((Dx.client(c.clientId) || {}).contactId); hint = t('writeToClient', { name: contact ? contact.first : t('client_') }); }
      if (c.kind === 'thread') hint = t('threadNote');
      body += '<span class="hint">' + esc(hint) + '</span></div></div>';
    } else if (note) body += '<div class="compose"><div class="note">' + I.lock.replace('<svg', '<svg width="14" height="14" style="vertical-align:-2px;margin-right:6px;fill:none;stroke:currentColor;stroke-width:2"') + esc(note) + '</div></div>';
    body += '</div>';

    /* on a phone the top bar holds one action (members); search lives on the channel list and the placement on Home */
    var actions = (isPhone() ? '' : '<button class="iconbtn" data-go="search" aria-label="' + esc(t('search')) + '">' + I.search + '</button>') + '<button class="iconbtn" data-act="members" data-id="' + c.id + '" aria-label="' + esc(t('members')) + '">' + I.people + '</button>';
    if (c.kind === 'client' && viewer.role !== 'applicant' && !isPhone()) actions += '<button class="iconbtn" data-go="placement" data-id="' + c.placementId + '" aria-label="' + esc(t('placement')) + '">' + I.briefcase + '</button>';
    return {
      title: esc(name), sub: esc(sub), chat: true, actions: actions, body: body,
      side: isPhone() ? null : listHtml(c.id),
      after: function () {
        var box = document.getElementById('msgs'); if (!box) return;
        var u = document.getElementById('unread');
        if (u) box.scrollTop = Math.max(0, u.offsetTop - 80); else box.scrollTop = box.scrollHeight;
        Dx.markRead(c.id, viewer);
        var ta = document.getElementById('composeText');
        if (ta) { ta.addEventListener('input', function () { ta.style.height = 'auto'; ta.style.height = Math.min(120, ta.scrollHeight) + 'px'; }); ta.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey && !isPhone()) { e.preventDefault(); HQ.act['send-msg']({ dataset: { id: c.id } }); } }); }
      }
    };
  };
  function threadFor(vaId) { var th = (D.threads || []).filter(function (x) { return x.vaId === vaId && x.status === 'open'; })[0]; return th ? th.id : null; }

  function msgHtml(m, viewer, c, collapsed) {
    var tm = F.time(m.at, viewer.tz);
    if (m.kind === 'system') return '<div class="msg system" id="m-' + esc(m.id) + '"><div class="pill">' + esc(L(m.text)) + '<span class="tm">' + tm + '</span></div></div>';
    var p = Dx.person(m.authorId);
    var s = '<div class="msg ' + (m.kind === 'report' ? 'is-report' : '') + '" id="m-' + esc(m.id) + '">';
    s += collapsed ? '<span class="avatar" style="visibility:hidden"></span>' : h.avatar(p);
    s += '<div class="body">';
    if (!collapsed) s += '<div class="who"><span class="n">' + esc(authorLabel(p, viewer)) + (m.authorId === viewer.id ? ' <span class="tiny muted">(' + (HQ.lang() === 'es' ? 'tú' : 'you') + ')</span>' : '') + '</span><span class="r">' + esc(roleTag(p)) + '</span><span class="tm">' + tm + '</span></div>';
    if (m.kind === 'report') s += reportCard(m, viewer);
    else {
      var txt = typeof m.text === 'string' ? m.text : L(m.text);
      s += '<div class="txt">' + mentionize(txt, viewer) + '</div>';
    }
    (m.attachments || []).forEach(function (a) { s += '<div class="att"><span class="ft">' + esc(a.type || 'file') + '</span><span><b>' + esc(a.name) + '</b> <span class="muted">' + esc(a.size || '') + '</span></span></div>'; });
    var rx = (m.reactions || []).map(function (r) { return '<button data-act="react" data-id="' + esc(m.id) + '" data-emoji="' + esc(r.emoji) + '" class="' + (r.by.indexOf(viewer.id) >= 0 ? 'mine' : '') + '">' + esc(r.emoji) + ' ' + r.by.length + '</button>'; }).join('');
    var hasThumb = (m.reactions || []).some(function (r) { return r.emoji === '👍'; });
    if (!hasThumb && m.authorId !== viewer.id) rx += '<button data-act="react" data-id="' + esc(m.id) + '" data-emoji="👍" style="opacity:.7">👍' + (m.kind === 'report' && viewer.role === 'client' ? ' ' + esc(t('looksGood')) : '') + '</button>';
    if (rx) s += '<div class="react">' + rx + '</div>';
    return s + '</div></div>';
  }
  function reportCard(m, viewer) {
    var r = m.report || {}; var day = HQ.isoDate(m.at);
    var s = '<div class="report"><div class="rh"><span class="t">' + esc(t('dailyReport')) + ' · ' + esc(F.date(day, 'long')) + '</span>' + h.chip(t('sent'), 'good') + '</div>';
    if (r.kpi) s += '<div class="kpis">' + h.kpi(r.kpi.dials, t('dials')) + h.kpi(r.kpi.conversations, t('conversations')) + h.kpi(r.kpi.apptsSet, t('apptsSet'), 'gold') + h.kpi(r.kpi.apptsHeld, t('apptsHeld'), 'good') + '</div>';
    s += '<div class="sec3">';
    [['doneToday', r.done], ['blocked', r.blocked], ['tomorrow', r.tomorrow]].forEach(function (x) {
      var items = x[1] || [];
      s += '<div><h4>' + esc(t(x[0])) + '</h4>' + (items.length ? '<ul>' + items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>' : '<div class="none">' + esc(x[0] === 'blocked' ? t('blockedNone') : '—') + '</div>') + '</div>';
    });
    return s + '</div></div>';
  }

  /* ---------- search ---------- */
  HQ.V.search = function (p) {
    var q = (p.q || '').trim(); var viewer = HQ.me();
    var s = '<div class="field"><input class="inp" id="q" value="' + esc(q) + '" placeholder="' + esc(t('searchMessages')) + '" autofocus><div class="hint">' + esc(t('searchIn')) + '</div></div>';
    if (q.length >= 2) {
      var ql = q.toLowerCase(); var chans = Dx.channelsFor(viewer); var ids = {}; chans.forEach(function (c) { ids[c.id] = c; });
      var hits = (D.messages || []).filter(function (m) { var cid = m.channelId || m.threadId; if (!ids[cid]) return false; var txt = m.kind === 'report' ? [].concat(m.report.done || [], m.report.blocked || [], m.report.tomorrow || []).join(' ') : (typeof m.text === 'string' ? m.text : L(m.text)); return txt.toLowerCase().indexOf(ql) >= 0; }).slice(-40).reverse();
      s += '<div class="search-res">';
      if (!hits.length) s += h.empty(t('noResults'), '');
      hits.forEach(function (m) {
        var cid = m.channelId || m.threadId; var p2 = Dx.person(m.authorId);
        var txt = m.kind === 'report' ? [].concat(m.report.done || []).join(' · ') : (typeof m.text === 'string' ? m.text : L(m.text));
        var i = txt.toLowerCase().indexOf(ql); var from = Math.max(0, i - 60); var snip = (from > 0 ? '…' : '') + esc(txt.slice(from, i)) + '<mark>' + esc(txt.substr(i, q.length)) + '</mark>' + esc(txt.slice(i + q.length, i + q.length + 90));
        s += '<button class="hit" data-go="channel" data-id="' + cid + '"><div class="w">' + esc(authorLabel(p2, viewer)) + ' ' + esc(t('inChannel')) + ' ' + esc(Dx.channelName(ids[cid], viewer)) + ' · ' + esc(F.date(HQ.isoDate(m.at))) + '</div><div>' + snip + '</div></button>';
      });
      s += '</div>';
    }
    return { title: t('search'), body: s, side: isPhone() ? null : listHtml(null), after: function () { var el = document.getElementById('q'); if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); el.addEventListener('input', function () { clearTimeout(window.__sq); window.__sq = setTimeout(function () { S.params = { q: el.value }; HQ.render(); }, 250); }); } } };
  };

  /* ---------- daily report ---------- */
  HQ.V.report = function (p) {
    var viewer = HQ.me();
    if (viewer.role !== 'va') {
      /* staff and clients: today's report status per placement they can see */
      var pls = viewer.role === 'applicant' ? [] : Dx.placementsOf(viewer).filter(function (x) { return x.status === 'active'; });
      if (!pls.length) return { title: t('reportsToday'), body: h.empty(t('nothingHere'), viewer.role === 'applicant' ? '' : t('noPlacement')) };
      var s = '<div class="list">';
      pls.forEach(function (pl) {
        var va = Dx.person(pl.vaId), cl = Dx.client(pl.clientId), r = HQ.todayReport(pl.id), last = HQ.lastReportFor(pl.id), chx = HQ.channelForPlacement(pl.id);
        s += h.li({ lead: h.avatar(va), title: esc(Dx.vaLabel(va, viewer)) + ' <span class="small muted">· ' + esc(viewer.role === 'client' ? Dx.tierShort(pl.tier) : cl.name) + '</span>', sub: r ? t('reportDone') + ' · ' + F.time(r.at, viewer.tz) : (last ? t('lastReport') + ': ' + F.dayLabel(HQ.isoDate(last.at)) : t('reportMissing')), trail: r ? h.chip(t('sent'), 'good', true) : h.chip(t('notYet'), 'warn', true), go: chx ? 'channel' : null, params: chx ? { id: chx.id } : {} });
      });
      s += '</div>' + h.note(esc(t('reportDueBy')), '');
      return { title: t('reportsToday'), body: s };
    }
    var pl = Dx.placementForVa(viewer.id);
    if (!pl) return { title: t('dailyReport'), body: h.note(esc(t('noPlacement'))) };
    var cl = Dx.client(pl.clientId); var ch = HQ.channelForPlacement(pl.id); var existing = HQ.todayReport(pl.id);
    var s2 = '';
    if (existing && !p.again) {
      s2 += '<div class="card good"><div class="row between"><h3 style="margin:0">' + esc(t('reportDone')) + '</h3>' + h.chip(F.time(existing.at, viewer.tz), 'good') + '</div>' + reportCard(existing, viewer) + '<div class="row" style="margin-top:12px;gap:8px">' + h.go(esc(t('open')) + ' ' + esc(Dx.channelName(ch, viewer)), 'channel', { id: ch.id }, 'btn-blue btn-sm') + h.go(esc(t('editReport')), 'report', { again: '1' }, 'btn-ghost btn-sm') + '</div></div>';
      return { title: t('dailyReport'), body: s2 };
    }
    var isa = pl.tier === 'isa';
    s2 += '<div class="card"><div class="row between" style="margin-bottom:10px"><div><div class="small muted">' + esc(t('forPlacement')) + '</div><div class="b" style="color:var(--fg)">' + esc(cl.name) + ' · ' + esc(F.date(Dx.today(), 'long')) + '</div></div>' + h.chip(t('reportDueBy'), 'warn') + '</div>';
    s2 += h.field(t('doneToday'), '<textarea class="inp" name="done" id="rep-done" placeholder="' + esc(HQ.lang() === 'es' ? 'Ej.: 162 llamadas de prospección alrededor de Van Buren Blvd\nSeguimiento a 14 leads en Follow Up Boss' : 'e.g. 162 dials circle prospecting around Van Buren Blvd\nFollowed up 14 leads in Follow Up Boss') + '"></textarea>', t('oneLine'));
    s2 += h.field(t('blocked'), '<textarea class="inp" name="blocked" rows="2" placeholder="' + esc(HQ.lang() === 'es' ? 'Nada, o lo que te detuvo' : 'Nothing, or what stopped you') + '"></textarea>', t('optional'));
    s2 += h.field(t('tomorrow'), '<textarea class="inp" name="tomorrow" rows="2"></textarea>', t('oneLine'));
    if (isa) {
      s2 += '<div class="sgroup" style="padding-left:0">ISA</div><div class="grid2" style="grid-template-columns:1fr 1fr;gap:10px">' +
        h.field(t('dials'), '<input class="inp num" type="number" inputmode="numeric" name="dials" min="0" value="0">') + h.field(t('conversations'), '<input class="inp num" type="number" inputmode="numeric" name="conversations" min="0" value="0">') +
        h.field(t('apptsSet'), '<input class="inp num" type="number" inputmode="numeric" name="apptsSet" min="0" value="0">') + h.field(t('apptsHeld'), '<input class="inp num" type="number" inputmode="numeric" name="apptsHeld" min="0" value="0">') + '</div><div class="hint small muted" style="margin:-6px 0 12px">' + esc(t('kpiNote')) + '</div>';
    }
    s2 += '<div id="rep-err" class="note bad" hidden></div><div class="row" style="margin-top:8px;gap:8px;flex-wrap:wrap">' + h.btn(I.send + esc(t('sendReport')), 'send-report', 'btn-gold btn-lg', { id: pl.id }) + '<span class="small muted">' + esc(t('reportPreview')) + '</span></div></div>';
    return { title: t('dailyReport'), sub: esc(cl.name), body: s2 };
  };

  /* ---------- announcements (owner and manager) ---------- */
  HQ.V.announce = function () {
    var viewer = HQ.me();
    if (!HQ.isStaff()) return HQ.V.channel({ id: 'ch-announcements' });
    var s = '<div class="card"><p class="small muted" style="margin-bottom:12px">' + esc(t('announceSub')) + '</p>' +
      h.field(t('englishText'), '<textarea class="inp" name="en" rows="4" placeholder="Monthly training is Wednesday Oct 28 at 10:00 AM Honduras time."></textarea>') +
      h.field(t('spanishText'), '<textarea class="inp" name="es" rows="4" placeholder="La capacitación mensual es el miércoles 28 de octubre a las 10:00 AM hora de Honduras."></textarea>') +
      '<div id="ann-err" class="note bad" hidden></div><div class="row" style="gap:8px;margin-top:6px">' + h.btn(I.send + esc(t('postToAll')), 'post-announcement', 'btn-gold') + h.go(esc(t('cancel')), 'channel', { id: 'ch-announcements' }, 'btn-ghost') + '</div></div>';
    return { title: t('postAnnouncement'), sub: esc(viewer.name), body: s };
  };

  /* ---------- actions ---------- */
  function newId(prefix) { return prefix + '-' + Math.random().toString(36).slice(2, 8); }
  function nowIso() { return new Date(HQ.now().getTime() + 60000).toISOString(); }
  var replies = { 'u-daniela': { es: 'Lo reviso y te confirmo en un momento 👍', en: 'On it, I will confirm in a moment 👍' }, 'u-charly': { en: 'Got it, thanks. Let me check and get back to you.', es: 'Recibido, gracias. Lo reviso y te aviso.' } };
  Object.assign(HQ.act, {
    'post-announcement': function () {
      var v = HQ.formVals(document.querySelector('.main .content')); var err = document.getElementById('ann-err');
      if (!(v.en || '').trim() || !(v.es || '').trim()) { if (err) { err.hidden = false; err.textContent = t('bothLanguages'); } return; }
      D.messages.push({ id: newId('msg'), channelId: 'ch-announcements', authorId: HQ.me().id, at: nowIso(), kind: 'text', text: { en: v.en.trim(), es: v.es.trim() }, lang: HQ.lang() });
      HQ.toast(t('posted')); HQ.go('channel', { id: 'ch-announcements' });
    },
    'send-msg': function (el) {
      var id = el.dataset.id; var ta = document.getElementById('composeText'); if (!ta) return; var text = ta.value.trim(); if (!text) return;
      var viewer = HQ.me(); var c = Dx.channel(id) || {};
      var m = { id: newId('msg'), authorId: viewer.id, at: nowIso(), kind: 'text', text: text, lang: HQ.lang() };
      if (c.topic || c.kind === 'thread') m.threadId = id; else m.channelId = id;
      D.messages.push(m); Dx.markRead(id, viewer); HQ.render();
      /* a canned reply in direct messages, so the demo feels alive */
      if (c.kind === 'dm') { var other = c.members.filter(function (x) { return x !== viewer.id; })[0]; var rp = replies[other]; if (rp) { var tp = document.getElementById('typing'); if (tp) tp.textContent = Dx.person(other).first + ' ' + t('typing'); setTimeout(function () { if (S.screen !== 'channel' || S.params.id !== id) return; D.messages.push({ id: newId('msg'), channelId: id, authorId: other, at: new Date(HQ.now().getTime() + 120000).toISOString(), kind: 'text', text: L(rp), lang: HQ.lang() }); Dx.markRead(id, viewer); HQ.render(); }, 1800); } }
    },
    'react': function (el) {
      var m = (D.messages || []).filter(function (x) { return x.id === el.dataset.id; })[0]; if (!m) return; var viewer = HQ.me();
      m.reactions = m.reactions || []; var r = m.reactions.filter(function (x) { return x.emoji === el.dataset.emoji; })[0];
      if (!r) { r = { emoji: el.dataset.emoji, by: [] }; m.reactions.push(r); }
      var i = r.by.indexOf(viewer.id); if (i >= 0) r.by.splice(i, 1); else r.by.push(viewer.id);
      if (!r.by.length) m.reactions = m.reactions.filter(function (x) { return x !== r; });
      var box = document.getElementById('msgs'); var st = box ? box.scrollTop : 0; HQ.render(); var box2 = document.getElementById('msgs'); if (box2) box2.scrollTop = st;
    },
    'scroll-to': function (el) { var tgt = document.getElementById('m-' + el.dataset.id); if (tgt) { tgt.scrollIntoView({ block: 'center' }); tgt.style.background = 'var(--gold-soft)'; setTimeout(function () { tgt.style.background = ''; }, 1500); } },
    'members': function (el) {
      var viewer = HQ.me(); var c = Dx.channelsFor(viewer).filter(function (x) { return x.id === el.dataset.id; })[0]; if (!c) return;
      var ids = c.members === 'everyone' ? Dx.people().filter(function (p) { return p.role !== 'applicant' && p.role !== 'client' && p.status !== 'inactive'; }).map(function (p) { return p.id; }) : c.members;
      var s = '<div class="list">' + ids.map(function (id) { var p = Dx.person(id); if (!p) return ''; return h.li({ lead: h.avatar(p), title: esc(authorLabel(p, viewer)), sub: esc(roleTag(p)) + ' · ' + esc(p.city || '') + ' · ' + F.time(HQ.now().toISOString(), p.tz) + ' ' + esc(t('localTimeNow')) }); }).join('') + '</div>';
      if (c.kind === 'client') s += '<div class="note tiny" style="margin-top:10px">' + esc(t('digestNote')) + '</div>';
      HQ.sheet(s, t('members'));
    },
    'send-report': function (el) {
      var viewer = HQ.me(); var pl = Dx.placement(el.dataset.id); var ch = HQ.channelForPlacement(pl.id); var v = HQ.formVals(document.querySelector('.main .content'));
      var lines = function (x) { return (x || '').split('\n').map(function (l) { return l.trim(); }).filter(Boolean); };
      var done = lines(v.done); var err = document.getElementById('rep-err');
      if (!done.length) { if (err) { err.hidden = false; err.textContent = t('fillAtLeast'); } var d = document.getElementById('rep-done'); if (d) { d.classList.add('err'); d.focus(); } return; }
      var m = { id: newId('msg'), channelId: ch.id, authorId: viewer.id, at: nowIso(), kind: 'report', lang: HQ.lang(), report: { done: done, blocked: lines(v.blocked), tomorrow: lines(v.tomorrow) } };
      if (pl.tier === 'isa') {
        var k = { dials: +v.dials || 0, conversations: +v.conversations || 0, apptsSet: +v.apptsSet || 0, apptsHeld: +v.apptsHeld || 0 };
        if (k.conversations > k.dials || k.apptsSet > k.conversations) { if (err) { err.hidden = false; err.textContent = t('kpiOrder'); } return; }
        m.report.kpi = k;
      }
      D.messages.push(m); HQ.toast(t('reportSent')); HQ.go('channel', { id: ch.id });
    }
  });
})();
