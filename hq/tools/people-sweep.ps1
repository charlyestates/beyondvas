# Renders every people.js screen x user x language inside ONE headless Edge launch (the debug page's ?script= hook),
# records one PASS/FAIL line per combination in <pre id="asserts"> and prints them. Run from the repository root.
# A combination fails when the view threw (title "Error"), the body says "not in the prototype yet", the body is empty,
# window.onerror fired, the page scrolls horizontally, or a privacy string leaks (bill rates, block amounts, invoice
# numbers or margin on a VA page; margin on a manager page; a VA surname or pay rate on a client page).
param([string]$Width = '1280,900', [string]$Theme = 'light')
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$dbg = (Resolve-Path 'hq\debug.html').Path -replace '\\','/'
$js = @'
var users = ['u-charly','u-daniela','u-mariela','u-ana','a-sofia','u-kevin','u-carlos','u-jose','u-mike','a-camila'];
var screens = [['clients'],['client','c-rodriguez'],['client','c-lonestar'],['client','c-sunshine'],['people'],['people',null,{seg:'clients'}],['people',null,{seg:'pipeline'}],['people',null,{seg:'bench'}],
  ['person','u-mariela'],['person','u-kevin'],['person','u-carlos'],['person','u-jose'],['person','u-daniela'],['person','u-fernanda'],['profile'],['pipeline'],['pipeline',null,{filter:'overdue'}],
  ['applicant','app-sofia'],['applicant','app-paola'],['applicant','app-ricardo'],['bench'],['bench',null,{call:'1',client:'c-rodriguez'}],['academy'],['academy',null,{mod:'m6'}],['cohorts'],
  ['documents'],['documents',null,{seg:'all'}],['onboarding'],['tests']];
var leak = { va: /\$12\/|\$10\/|\$8\/|\$960|\$480|\$800|BV-1|[Mm]argin\b|[Mm]argen\b/, manager: /[Mm]argin\b|[Mm]argen\b/, client: /Castellanos|Andino|Molina|Paz\b|Herrera|Mej\u00eda|\$6\.50|\$5\.00|\$5\.50|\$6\.00|[Mm]argin\b|[Mm]argen\b/, applicant: /Castellanos|Andino|Molina|\$6\.50|\$5\.00|\$5\.50|BV-1|[Mm]argin\b|[Mm]argen\b/ };
var i = 0;
users.forEach(function (u) { screens.forEach(function (sc) {
  var lang = (i++ % 2) ? 'en' : 'es'; var p = sc[2] ? Object.assign({}, sc[2]) : {}; if (sc[1]) p.id = sc[1];
  HQ.S.userId = u; HQ.S.viewAs = null; HQ.S.lang = lang; HQ.S.screen = sc[0]; HQ.S.params = p; HQ.S.hist = [];
  var nErr = window.__errs.length; var thrown = null;
  try { HQ.render(); } catch (e) { thrown = e && e.message; }
  var h1 = (document.querySelector('.topbar h1') || {}).textContent || ''; var body = document.querySelector('.main .content'); var txt = body ? body.textContent : '';
  var role = (HQ.me() || {}).role; var flags = [];
  if (h1 === 'Error') flags.push('VIEWERR ' + txt.slice(0, 160));
  if (/not in the prototype yet/.test(txt)) flags.push('MISSING');
  if (txt.trim().length < 5) flags.push('EMPTY');
  if (thrown) flags.push('THROW ' + thrown);
  if (window.__errs.length > nErr) flags.push('ONERROR ' + window.__errs.slice(nErr).join(' || '));
  if (document.documentElement.scrollWidth > window.innerWidth) flags.push('HSCROLL ' + document.documentElement.scrollWidth + '>' + window.innerWidth);
  if (leak[role] && leak[role].test(txt)) flags.push('LEAK ' + (txt.match(leak[role]) || [])[0]);
  var name = u + ' ' + sc[0] + (sc[1] ? '/' + sc[1] : '') + (sc[2] ? '?' + JSON.stringify(sc[2]) : '') + ' ' + lang + ' | ' + h1.replace(/\s+/g, ' ').trim();
  window.__assert(name + (flags.length ? ' | ' + flags.join(' ; ') : ''), !flags.length);
}); });
'@
$enc = [Uri]::EscapeDataString($js)
$u = "file:///${dbg}?user=u-charly&screen=home&theme=$Theme&script=$enc"
$out = Join-Path $env:TEMP 'hq-people-sweep.txt'
& $edge --headless=new --disable-gpu --allow-file-access-from-files --virtual-time-budget=30000 --window-size=$Width --dump-dom $u 2>$null | Out-File -Encoding utf8 $out
$dom = [IO.File]::ReadAllText($out)
$err = ''; if ($dom -match '(?s)<pre id="errlog"[^>]*>(.*?)</pre>') { $err = $matches[1].Trim() }
$as = ''; if ($dom -match '(?s)<pre id="asserts"[^>]*>(.*?)</pre>') { $as = $matches[1].Trim() }
$as = [System.Net.WebUtility]::HtmlDecode($as)
$lines = $as -split "`n"
$fails = @($lines | Where-Object { $_ -like 'FAIL*' })
$lines
"---- $($lines.Count) combinations, $($fails.Count) failed; errlog: " + $(if ($err) { $err } else { '(empty)' })
