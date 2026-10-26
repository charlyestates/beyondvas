# Money module matrix: every money screen x user x language in headless Edge, in parallel batches, with an in-page
# i18n check (every t('key') money.js uses has en and es) and a per-role leak scan of the visible text (bill rates,
# invoice numbers and block amounts on VA/manager/applicant screens; pay rates, VA surnames, margin and other clients
# on client screens). Run from the repository root:
#   powershell -NoProfile -File hq\tools\check-money-matrix.ps1 [-Langs en,es] [-Batch 8]
# Writes hq\money-check.txt (one line per combination; flags ERR, VIEWERR, MISSING, NOTREADY, I18N, LEAK(...)).
param([string[]]$Langs = @('en','es'), [int]$Batch = 3, [switch]$Full)
$ErrorActionPreference = 'Continue'
$Root = Split-Path -Parent (Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path))
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$base = "file:///" + ((Resolve-Path (Join-Path $Root 'hq\debug.html')).Path -replace '\\','/')
$prof = Join-Path $env:TEMP ('hq-edge-mm-' + $PID)
New-Item -ItemType Directory -Force $prof | Out-Null

# i18n keys used by money.js (static t('key') calls plus the dynamic ones), checked in-page against HQ.T
$src = [IO.File]::ReadAllText((Join-Path $Root 'hq\app\money.js'))
$keys = @([regex]::Matches($src, "\bt\('([A-Za-z_]+)'") | ForEach-Object { $_.Groups[1].Value })
$keys += 'billing','payouts','reports','settings','audit','owner','manager','va','client','applicant','tplReminder','tplAck','tplDigest','tplStatement','tplApproved','tplBlock','tplPause','tplCheckpoint','draft','submitted','scored','interview','trial','offer','talentPool'
$keys = $keys | Sort-Object -Unique
$js = "var ks=['" + ($keys -join "','") + "'];var miss=[];ks.forEach(function(k){var e=HQ.T[k];if(!e||!e.en||!e.es)miss.push(k);});window.__assert('i18n keys used by money.js missing en/es: '+miss.join(','),!miss.length);var bad=[];Object.keys(HQ.T).forEach(function(k){var e=HQ.T[k];if(!e||typeof e!=='object'||!e.en||!e.es)bad.push(k);});window.__assert('HQ.T entries lacking a language: '+bad.join(','),!bad.length);"
$jsq = [uri]::EscapeDataString($js)

$screens = @(
  @('money',''), @('billing',''), @('invoice','inv-1015'), @('invoice','inv-1001'), @('invoice','inv-1014'),
  @('payouts',''), @('payouts','run-2026-11-05'), @('statement','st-2026-10-20-mariela'), @('statement','pl-2026-11-05-jose'), @('statement','st-2026-10-20-andrea'),
  @('reports',''), @('settings','')
)
$users = @('u-charly','u-daniela','u-mariela','u-jose','u-kevin','u-carlos','u-ana','u-mike','a-sofia','a-camila')
$combos = @()
if ($Full) { foreach ($u in $users) { foreach ($sc in $screens) { foreach ($l in $Langs) { $combos += ,@($u, $sc[0], $sc[1], $l) } } } }
else {
  # per-role matrix: every screen for the owner in both languages; for the other roles the variants that differ
  $combos += @(
    @('u-daniela','money','','es'), @('u-daniela','billing','','es'), @('u-daniela','invoice','inv-1015','es'), @('u-daniela','payouts','','es'), @('u-daniela','payouts','run-2026-11-05','es'), @('u-daniela','statement','st-2026-10-20-andrea','es'), @('u-daniela','reports','','es'), @('u-daniela','settings','','es'), @('u-daniela','money','','en'), @('u-daniela','payouts','','en'),
    @('u-mariela','money','','es'), @('u-mariela','billing','','es'), @('u-mariela','invoice','inv-1015','es'), @('u-mariela','payouts','','es'), @('u-mariela','statement','st-2026-10-20-mariela','es'), @('u-mariela','statement','st-2026-10-20-andrea','es'), @('u-mariela','reports','','es'), @('u-mariela','settings','','es'), @('u-mariela','payouts','','en'), @('u-mariela','statement','st-2026-10-20-mariela','en'),
    @('u-jose','money','','es'), @('u-jose','payouts','','es'), @('u-jose','statement','pl-2026-11-05-jose','es'), @('u-jose','settings','','es'),
    @('u-kevin','money','','es'), @('u-kevin','payouts','','es'), @('u-kevin','settings','','es'), @('u-kevin','reports','','es'),
    @('u-carlos','money','','es'), @('u-carlos','payouts','','es'), @('u-carlos','settings','','es'),
    @('u-ana','money','','en'), @('u-ana','billing','','en'), @('u-ana','invoice','inv-1001','en'), @('u-ana','invoice','inv-1014','en'), @('u-ana','payouts','','en'), @('u-ana','statement','st-2026-10-20-mariela','en'), @('u-ana','reports','','en'), @('u-ana','settings','','en'), @('u-ana','billing','','es'), @('u-ana','settings','','es'),
    @('u-mike','billing','','en'), @('u-mike','invoice','inv-1015','en'), @('u-mike','payouts','','en'), @('u-mike','settings','','en'), @('u-mike','billing','','es'), @('u-mike','invoice','inv-1015','es'),
    @('a-sofia','money','','es'), @('a-sofia','billing','','es'), @('a-sofia','invoice','inv-1015','es'), @('a-sofia','payouts','','es'), @('a-sofia','statement','st-2026-10-20-mariela','es'), @('a-sofia','reports','','es'), @('a-sofia','settings','','es'),
    @('a-camila','money','','es'), @('a-camila','payouts','','es'), @('a-camila','settings','','es'), @('a-camila','money','','en')
  )
  foreach ($sc in $screens) { foreach ($l in $Langs) { $combos += ,@('u-charly', $sc[0], $sc[1], $l) } }
}

# forbidden strings per viewer (rules 1 and 2 of APP-CONTRACT.md), applied to the visible text of #app
$forbid = @{
  'u-ana'     = 'Castellanos|Andino|Molina|\bPaz\b|Herrera|Mej[ií]a|\$(4\.50|5\.00|5\.50|6\.00|6\.50|7\.00)\b|\$5/|\$5\.5/|\$6/|\$6\.5/|margin|margen|Lone Star|Sunshine|Priya|Jenna';
  'u-mike'    = 'Castellanos|Andino|Molina|\bPaz\b|Herrera|Mej[ií]a|\$(4\.50|5\.00|5\.50|6\.00|6\.50|7\.00)\b|\$5/|\$5\.5/|\$6/|\$6\.5/|margin|margen|Rodriguez|Sunshine|Priya|Ana\b';
  'u-mariela' = 'BV-10\d\d|margin|margen|\$12|\$10/|\$8/|\$(960|480|800|474|963|979)\b|1,059|Lone Star|Sunshine|\$5/|\$5\.5|\$5\.50';
  'u-jose'    = 'BV-10\d\d|margin|margen|\$12|\$10/|\$8/|\$(960|480|800|474|963|979)\b|1,059|Rodriguez|Sunshine|\$6/|\$6\.5|\$5\.5';
  'u-kevin'   = 'BV-10\d\d|margin|margen|\$12|\$10/|\$8/|\$(960|480|800|474|963|979)\b|1,059|Rodriguez|Sunshine|Lone Star|\$5/|\$5\.5|\$6/|\$6\.5';
  'u-carlos'  = 'BV-10\d\d|margin|margen|\$12|\$10/|\$8/|\$(960|480|800|474|963|979)\b|1,059|Rodriguez|Sunshine|Lone Star|\$5/|\$5\.5|\$6/|\$6\.5';
  'u-daniela' = 'BV-10\d\d|margin|margen|\$12/|\$10/|\$8/|\$(960|480|800|474|963|979)\b|1,059';
  'a-sofia'   = '\$\d|BV-10\d\d|margin|margen';
  'a-camila'  = '\$\d|BV-10\d\d|margin|margen';
  'u-charly'  = '(?!x)x'
}
function Visible([string]$txt) {
  $t = [regex]::Replace($txt, '(?s)<script.*?</script>', '')
  $i = $t.IndexOf('<div id="app"'); if ($i -ge 0) { $t = $t.Substring($i) }
  $t = [regex]::Replace($t, '(?s)<style.*?</style>', '')
  $t = [regex]::Replace($t, '<[^>]+>', ' ')
  $t = $t.Replace('&amp;','&').Replace('&#39;',"'").Replace('&quot;','"').Replace('&lt;','<').Replace('&gt;','>')
  return [regex]::Replace($t, '\s+', ' ')
}

$results = @(); $bad = 0; $n = 0
for ($b = 0; $b -lt $combos.Count; $b += $Batch) {
  $slice = $combos[$b..([Math]::Min($b + $Batch, $combos.Count) - 1)]
  $files = @()
  foreach ($c in $slice) {
    $n++
    $idq = ''; if ($c[2]) { $idq = '&id=' + $c[2] }
    $u = $base + '?user=' + $c[0] + '&screen=' + $c[1] + $idq + '&lang=' + $c[3] + '&script=' + $jsq
    $p1 = Join-Path $prof ('p' + $n); New-Item -ItemType Directory -Force $p1 | Out-Null
    $d1 = Join-Path $prof ('dom' + $n + '.txt')
    Start-Process -FilePath 'cmd.exe' -ArgumentList ('/c ""' + $edge + '" --headless=new --disable-gpu --allow-file-access-from-files --no-first-run --user-data-dir="' + $p1 + '" --window-size=1280,900 --virtual-time-budget=4000 --dump-dom "' + $u + '" > "' + $d1 + '" 2>nul"') -WindowStyle Hidden | Out-Null
    $files += ,@($c, $d1)
  }
  foreach ($f in $files) {
    $c = $f[0]; $d1 = $f[1]; $txt = ''
    for ($try = 0; $try -lt 90; $try++) {
      try { if (Test-Path $d1) { $txt = [IO.File]::ReadAllText($d1) } } catch { $txt = '' }
      if ($txt -match '</html>') { break }
      Start-Sleep -Milliseconds 400
    }
    $m = [regex]::Match($txt, '<pre id="errlog"[^>]*>(.*?)</pre>', 'Singleline')
    $err = 'NO ERRLOG'; if ($m.Success) { $err = $m.Groups[1].Value.Trim() }
    $a = [regex]::Match($txt, '<pre id="asserts"[^>]*>(.*?)</pre>', 'Singleline')
    $asserts = ''; if ($a.Success) { $asserts = $a.Groups[1].Value.Trim() }
    $ready = $txt -match 'data-ready="1"'
    $title = [regex]::Match($txt, '<title>(.*?)</title>').Groups[1].Value
    $vis = Visible $txt
    $flag = ''
    if ($err) { $flag += ' ERR' }
    if ($title -match '^Error') { $flag += ' VIEWERR' }
    if ($txt -match 'not in the prototype yet') { $flag += ' MISSING' }
    if (-not $ready) { $flag += ' NOTREADY' }
    if ($asserts -match 'FAIL') { $flag += ' I18N' }
    $leak = [regex]::Matches($vis, $forbid[$c[0]]) | ForEach-Object { $_.Value } | Sort-Object -Unique
    if ($leak) { $flag += ' LEAK(' + ($leak -join '|') + ')' }
    if ($flag) { $bad++ }
    $results += ('{0,-10} {1,-10} {2,-24} {3} ready={4,-5} title={5,-36} {6} err=[{7}] {8}' -f $c[0], $c[1], $c[2], $c[3], $ready, $title, $flag.Trim(), ($err -replace "`n", ' || '), (($asserts -replace "`n", ' || ') -replace 'PASS [^|]*', ''))
  }
}
$results += "done, flagged: $bad of $($combos.Count)"
$results | Out-File -Encoding utf8 (Join-Path $Root 'hq\money-check.txt')
# keep one DOM for inspection
try { Copy-Item (Join-Path $prof 'dom1.txt') (Join-Path $Root 'hq\dom-money.txt') -Force } catch {}
Start-Sleep -Seconds 2
Remove-Item -Recurse -Force $prof -ErrorAction SilentlyContinue
$results
