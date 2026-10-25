/* Follow every notification row link and every calendar event link for the current user; flag dead ends. */
var me = HQ.me(); var tag = me.id; var n = 0;
function landing() { var c = document.querySelector('.main .content'); var txt = c ? c.innerText.replace(/\s+/g, ' ').trim() : ''; var h1 = document.querySelector('.main .topbar h1'); var ttl = h1 ? h1.textContent.trim() : ''; if (ttl === 'Error' || !txt || (c && c.children.length === 1 && c.firstElementChild.classList.contains('empty'))) return (txt || '(empty body)').slice(0, 100); return null; }
HQ.S.lang = 'en';
HQ.D.notificationsFor(me).forEach(function (nt) {
  if (!nt.link || !nt.link.screen) return; n++;
  var p = nt.link.id ? { id: nt.link.id } : {};
  try { HQ.go(nt.link.screen, p, true); } catch (e) { window.__assert(tag + '|notif ' + nt.id + ' -> ' + nt.link.screen + ' threw ' + e.message, false); return; }
  var bad = landing(); if (bad) window.__assert(tag + '|notif ' + nt.id + ' "' + HQ.L(nt.text).slice(0, 60) + '" -> ' + nt.link.screen + ' ' + JSON.stringify(p) + ' => ' + bad, false);
});
/* events the user can open: does the event page render, and does its link land somewhere */
(HQD.events || []).forEach(function (ev) {
  try { HQ.go('event', { id: ev.id }, true); } catch (e) { window.__assert(tag + '|event ' + ev.id + ' threw ' + e.message, false); return; }
  var c = document.querySelector('.main .content'); var ok = !(c.children.length === 1 && c.firstElementChild.classList.contains('empty'));
  if (!ok) return; n++;
  var links = Array.prototype.slice.call(c.querySelectorAll('[data-go]'));
  links.forEach(function (el) { var p = {}; Object.keys(el.dataset).forEach(function (k) { if (k !== 'go') p[k] = el.dataset[k]; }); try { HQ.go(el.dataset.go, p, true); } catch (e) { window.__assert(tag + '|event ' + ev.id + ' link threw ' + e.message, false); return; } var bad = landing(); if (bad) window.__assert(tag + '|event ' + ev.id + ' "' + HQ.L(ev.title).slice(0, 50) + '" [' + el.textContent.trim().slice(0, 30) + '] -> ' + el.dataset.go + ' ' + JSON.stringify(p) + ' => ' + bad, false); try { HQ.go('event', { id: ev.id }, true); } catch (e) {} });
});
window.__assert(tag + ' checked ' + n + ' notification/event links', true);
