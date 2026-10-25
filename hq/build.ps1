# Builds hq/index.html (artifact fragment) and hq/local.html / hq/debug.html (full documents for local checks)
# from head.html + body.html. Run from anywhere:  powershell -File hq\build.ps1  (pwsh -File hq/build.ps1 on Mac or Linux)
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$utf8 = New-Object System.Text.UTF8Encoding $false
$head = [IO.File]::ReadAllText((Join-Path $root 'head.html'))
$body = [IO.File]::ReadAllText((Join-Path $root 'body.html'))

# 1. artifact fragment (the artifact viewer adds doctype/html/head/body)
[IO.File]::WriteAllText((Join-Path $root 'index.html'), $head + "`n" + $body, $utf8)

# 2. full document for local rendering
$skel = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#0F2247">'
[IO.File]::WriteAllText((Join-Path $root 'local.html'), $skel + "`n" + $head + "`n</head><body>`n" + $body + "`n</body></html>", $utf8)

# 3. debug document: captures JS errors into <pre id="errlog"> and lets ?user=&screen=&id=&lang=&w= drive the state
$dbg = @'
<script>
window.__errs = [];
window.onerror = function (m, s, l, c) { window.__errs.push(((s || '').split('/').pop() || '?') + ': ' + m + ' (line ' + l + ', col ' + c + ')'); var p = document.getElementById('errlog'); if (p) p.textContent = window.__errs.join('\n'); return false; };
window.addEventListener('unhandledrejection', function (e) { window.__errs.push('promise: ' + (e.reason && e.reason.message || e.reason)); });
</script>
<pre id="errlog" style="position:fixed;left:0;top:0;z-index:9999;background:#fee;color:#900;font:11px monospace;margin:0;max-width:100%;white-space:pre-wrap"></pre>
<pre id="asserts" hidden></pre>
'@
$drive = @'
<script>
(function () {
  var q = {}; location.search.replace(/^\?/, '').split('&').forEach(function (kv) { if (!kv) return; var p = kv.split('='); q[decodeURIComponent(p[0])] = decodeURIComponent(p[1] || ''); });
  try { localStorage.setItem('bvhq-seen', '1'); } catch (e) {}
  if (q.user) HQ.S.userId = q.user;
  if (q.lang) HQ.S.lang = q.lang;
  if (q.theme) { HQ.S.theme = q.theme; if (q.theme === 'auto') document.documentElement.removeAttribute('data-theme'); else document.documentElement.setAttribute('data-theme', q.theme); }
  HQ.S.picker = false;
  if (q.screen) { HQ.S.screen = q.screen; HQ.S.params = q.id ? { id: q.id } : (q.q ? { q: q.q } : {}); HQ.render(); }
  /* ?script=<url-encoded JS> runs after boot (for scripted flows: call HQ.go, set inputs, call HQ.act[...], then write
     assertions with window.__assert(name, ok)); results land in <pre id="asserts"> and errors in #errlog. */
  window.__asserts = [];
  window.__assert = function (name, ok) { window.__asserts.push((ok ? 'PASS ' : 'FAIL ') + name); };
  if (q.script) { try { (new Function(q.script))(); } catch (e) { window.__errs.push('script: ' + (e && e.message)); } }
  var p = document.getElementById('errlog'); if (p) p.textContent = window.__errs.join('\n') || '';
  var a = document.getElementById('asserts'); if (a) a.textContent = window.__asserts.join('\n');
  document.body.setAttribute('data-ready', '1');
  document.body.setAttribute('data-sw', String(document.documentElement.scrollWidth));
  document.body.setAttribute('data-w', String(window.innerWidth));
})();
</script>
'@
$dbody = $body.Replace('<script>HQ.boot();</script>', '<script>HQ.boot();</script>' + "`n" + $drive)
[IO.File]::WriteAllText((Join-Path $root 'debug.html'), $skel + "`n" + $head + "`n</head><body>`n" + $dbg + "`n" + $dbody + "`n</body></html>", $utf8)
"built index.html, local.html, debug.html"
