var users = ['u-charly', 'u-daniela', 'u-mariela', 'u-jose', 'u-andrea', 'u-kevin', 'u-carlos', 'u-ana', 'u-mike', 'u-priya', 'a-sofia', 'a-camila'];
var screens = [['help'], ['compliance'], ['scope', 'p-rod-2'], ['scope', 'p-lone-1'], ['scope', 'p-sun-1'], ['scope', 'p-rod-1'], ['scope', 'nope'], ['telemarketing', 'c-rodriguez'], ['telemarketing', 'c-lonestar'], ['telemarketing', 'c-sunshine'], ['telemarketing', 'nope'],
  ['callqa', 'u-mariela'], ['callqa', 'u-kevin'], ['callqa', 'u-jose'], ['callqa', 'nope'], ['callqa', 'u-mariela', { id: 'u-mariela', week: '2026-10-12' }], ['tickets'], ['tickets', null, { f: 'all' }], ['ticket', 'tk-0007'], ['ticket', 'tk-0003'], ['ticket', 'tk-0009'], ['ticket', 'nope'], ['audit'], ['support'], ['support', null, { f: 'all' }]];
var langs = ['en', 'es'];
var vaSurnames = ['Castellanos', 'Andino', 'Molina', 'Kevin Paz', 'Herrera', 'Mejía', 'Fernanda Ortiz'];
var clientNames = { 'u-ana': ['Lone Star', 'Sunshine', 'Mike', 'Priya', 'Jenna'], 'u-mike': ['Rodriguez', 'Sunshine', 'Ana ', 'Priya'], 'u-priya': ['Rodriguez', 'Lone Star', 'Ana ', 'Mike', 'Jenna'] };
var missingGo = {};
users.forEach(function (u) { langs.forEach(function (lg) { screens.forEach(function (sc) {
  HQ.S.userId = u; HQ.S.viewAs = null; HQ.S.lang = lg; HQ.S.hist = []; HQ.S.picker = false;
  var params = sc[2] || (sc[1] ? { id: sc[1] } : {});
  var name = u + ' ' + lg + ' ' + sc[0] + ' ' + (sc[2] ? JSON.stringify(sc[2]) : (sc[1] || ''));
  try {
    HQ.S.screen = sc[0]; HQ.S.params = params; HQ.render();
    var root = document.getElementById('app'); var html = root.innerHTML;
    var h1 = (root.querySelector('.topbar h1') || {}).textContent || '';
    var main = root.querySelector('.main'); var text = main ? main.innerText : '';
    var bad = root.querySelector('.main .content > .note.bad');
    var errTitle = h1 === 'Error';
    var ph = html.indexOf('not in the prototype yet') >= 0;
    var emp = html.indexOf('class="empty"') >= 0;
    var undef = /\bundefined\b|\bNaN\b|\[object Object\]|\bnull\b/.test(text);
    var content = root.querySelector('.main .content');
    var ov = content && content.scrollWidth > content.clientWidth + 1;
    var leak = '';
    var me = HQ.me();
    if (me.role === 'client') {
      vaSurnames.forEach(function (sn) { if (text.indexOf(sn) >= 0) leak += ' SURNAME:' + sn; });
      (clientNames[u] || []).forEach(function (cn) { if (text.indexOf(cn) >= 0) leak += ' OTHERCLIENT:' + cn; });
      if (/\$\s?\d/.test(text)) leak += ' DOLLAR';
      if (/margin|margen|pay rate|tarifa del VA/i.test(text)) leak += ' MONEYWORD';
    }
    if (me.role === 'va' || me.role === 'manager') { if (/\$\s?\d+(\.\d+)?\s*\/\s*h/.test(text)) leak += ' RATE'; }
    if (me.role === 'va') { if (/margin|margen|bill rate|tarifa al cliente/i.test(text)) leak += ' MONEYWORD'; }
    root.querySelectorAll('[data-go]').forEach(function (el) { if (!HQ.V[el.dataset.go]) missingGo[el.dataset.go] = (missingGo[el.dataset.go] || 0) + 1; });
    var flags = [emp ? 'empty' : '', ph ? 'PLACEHOLDER' : '', undef ? 'UNDEF' : '', ov ? 'OVERFLOW' : '', leak ? leak.trim() : '', bad ? 'ERR:' + bad.textContent : ''].filter(Boolean).join(' ');
    window.__assert(name + ' | ' + h1 + ' | ' + flags, !errTitle && !ph && !undef && !leak && !ov);
  } catch (e) { window.__assert(name + ' EXC ' + e.message + ' ' + (e.stack || '').split('\n')[1], false); }
}); }); });
window.__assert('MISSING-GO ' + JSON.stringify(missingGo), !Object.keys(missingGo).length);
var halfKeys = Object.keys(HQ.T).filter(function (k) { return !HQ.T[k] || !HQ.T[k].en || !HQ.T[k].es; });
window.__assert('HALF-KEYS ' + halfKeys.join(','), !halfKeys.length);
window.__assert('TKEYS ' + Object.keys(HQ.T).join(','), true);
