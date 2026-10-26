# Headless Edge check for the money module: every money screen × user × language (plus a few phone-width runs).
# Run from the repository root:   powershell -NoProfile -File hq\tools\check-money.ps1
# Writes hq\money-check.txt, one line per combination: ready flag, document scroll width vs window width, title and the
# <pre id="errlog"> content (empty = clean). Flags: ERR (JS error), VIEWERR (a view threw and core rendered .note.bad),
# MISSING (screen not registered), NOTREADY (debug driver did not finish), OVERFLOW (horizontal page scroll).
# Edge is a GUI-subsystem exe: invoked directly from this PowerShell its stdout is lost (the call returns at once), so the
# dump goes through cmd.exe with a file redirection. A private --user-data-dir keeps the user's running Edge out of it.
$ErrorActionPreference = 'Continue'
$Root = Split-Path -Parent (Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path))
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$base = "file:///" + ((Resolve-Path (Join-Path $Root 'hq\debug.html')).Path -replace '\\','/')
$dom = Join-Path $Root 'hq\dom-money.txt'
$prof = Join-Path $env:TEMP ('hq-edge-money-' + $PID)
New-Item -ItemType Directory -Force $prof | Out-Null
# user, screen, id, lang, window (empty = 1280x900 desktop)
$combos = @(
  @('u-charly','money','', 'en',''), @('u-charly','money','', 'es',''),
  @('u-charly','billing','', 'en',''), @('u-charly','billing','c-lonestar', 'es',''),
  @('u-charly','invoice','inv-1015','en',''), @('u-charly','invoice','inv-1006','es',''),
  @('u-charly','payouts','', 'en',''), @('u-charly','payouts','run-2026-11-05','es',''),
  @('u-charly','statement','st-2026-10-20-mariela','en',''), @('u-charly','statement','pl-2026-11-05-jose','es',''),
  @('u-charly','reports','', 'en',''), @('u-charly','reports','', 'es',''),
  @('u-charly','settings','', 'en',''), @('u-charly','settings','', 'es',''),
  @('u-daniela','money','', 'es',''), @('u-daniela','billing','', 'es',''), @('u-daniela','invoice','inv-1015','es',''),
  @('u-daniela','payouts','2026-10-20','es',''), @('u-daniela','payouts','', 'en',''), @('u-daniela','statement','st-2026-10-20-andrea','es',''),
  @('u-daniela','reports','', 'es',''), @('u-daniela','settings','', 'es',''),
  @('u-mariela','money','', 'es',''), @('u-mariela','billing','', 'es',''), @('u-mariela','invoice','inv-1011','es',''),
  @('u-mariela','payouts','', 'es',''), @('u-mariela','payouts','', 'en',''), @('u-mariela','statement','st-2026-10-20-mariela','es',''),
  @('u-mariela','statement','st-2026-10-20-jose','es',''), @('u-mariela','reports','', 'es',''), @('u-mariela','settings','', 'es',''),
  @('u-ana','money','', 'en',''), @('u-ana','billing','', 'en',''), @('u-ana','billing','', 'es',''), @('u-ana','invoice','inv-1014','en',''),
  @('u-ana','invoice','inv-1015','en',''), @('u-ana','payouts','', 'en',''), @('u-ana','statement','st-2026-10-20-mariela','en',''),
  @('u-ana','reports','', 'en',''), @('u-ana','settings','', 'en',''), @('u-ana','settings','', 'es',''),
  @('u-mike','billing','', 'en',''), @('u-mike','invoice','inv-1015','es',''), @('u-mike','settings','', 'en',''),
  @('u-priya','billing','', 'es',''),
  @('a-sofia','money','', 'es',''), @('a-sofia','billing','', 'es',''), @('a-sofia','invoice','inv-1011','es',''), @('a-sofia','payouts','', 'es',''),
  @('a-sofia','statement','st-2026-10-20-jose','es',''), @('a-sofia','reports','', 'es',''), @('a-sofia','settings','', 'es',''),
  @('u-kevin','payouts','', 'es',''), @('u-kevin','money','', 'es',''), @('u-kevin','settings','', 'es',''), @('u-kevin','reports','', 'en',''),
  @('u-carlos','payouts','', 'es',''), @('u-carlos','settings','', 'es',''),
  # phone width
  @('u-charly','money','', 'en','390,844'), @('u-charly','billing','', 'es','390,844'), @('u-charly','reports','', 'en','390,844'),
  @('u-charly','payouts','', 'es','390,844'), @('u-ana','billing','', 'en','390,844'), @('u-mike','billing','', 'es','390,844'),
  @('u-mariela','payouts','', 'es','390,844'), @('u-mariela','statement','st-2026-10-20-mariela','es','390,844'),
  @('u-daniela','payouts','', 'es','390,844'), @('u-charly','settings','', 'es','390,844'), @('u-charly','invoice','inv-1015','en','390,844')
)
$results = @(); $bad = 0; $n = 0
foreach ($c in $combos) {
  $n++
  $idq = ''; if ($c[2]) { $idq = '&id=' + $c[2] }
  $u = $base + '?user=' + $c[0] + '&screen=' + $c[1] + $idq + '&lang=' + $c[3]
  $win = '1280,900'; if ($c[4]) { $win = $c[4] }
  # The launcher msedge.exe returns before its child has finished, and a second launch on the same profile would just hand
  # its URL to that child (Edge's process singleton). So each run gets its own profile and its own dump file, and the loop
  # waits until the dump is complete before the next launch.
  $p1 = Join-Path $prof ('p' + $n); New-Item -ItemType Directory -Force $p1 | Out-Null
  $d1 = Join-Path $prof ('dom' + $n + '.txt')
  cmd /c "`"$edge`" --headless=new --disable-gpu --allow-file-access-from-files --no-first-run --user-data-dir=`"$p1`" --window-size=$win --virtual-time-budget=4000 --dump-dom `"$u`" > `"$d1`" 2>nul"
  $txt = ''
  for ($try = 0; $try -lt 60; $try++) {
    try { if (Test-Path $d1) { $txt = [IO.File]::ReadAllText($d1) } } catch { $txt = '' }
    if ($txt -match '</html>') { break }
    Start-Sleep -Milliseconds 500
  }
  try { [IO.File]::WriteAllText($dom, $txt, (New-Object System.Text.UTF8Encoding $false)) } catch {}
  $m = [regex]::Match($txt, '<pre id="errlog"[^>]*>(.*?)</pre>', 'Singleline')
  $err = 'NO ERRLOG'; if ($m.Success) { $err = $m.Groups[1].Value.Trim() }
  $ready = $txt -match 'data-ready="1"'
  $title = [regex]::Match($txt, '<title>(.*?)</title>').Groups[1].Value
  $sw = [regex]::Match($txt, 'data-sw="(\d+)"').Groups[1].Value
  $w = [regex]::Match($txt, 'data-w="(\d+)"').Groups[1].Value
  $flag = ''
  if ($err) { $flag += ' ERR' }
  if ($title -match '^Error') { $flag += ' VIEWERR' }   # core renders a thrown view as title "Error" + .note.bad
  if ($txt -match 'not in the prototype yet') { $flag += ' MISSING' }
  if (-not $ready) { $flag += ' NOTREADY' }
  if ($sw -and $w -and ([int]$sw -gt [int]$w)) { $flag += ' OVERFLOW' }
  if ($flag) { $bad++ }
  $results += ('{0,-10} {1,-10} {2,-24} {3} {4,-8} ready={5,-5} sw={6,-4} w={7,-4} title={8,-34} {9} err=[{10}]' -f $c[0], $c[1], $c[2], $c[3], $win, $ready, $sw, $w, $title, $flag.Trim(), ($err -replace "`n", ' || '))
}
$results += "done, flagged: $bad of $($combos.Count)"
$results | Out-File -Encoding utf8 (Join-Path $Root 'hq\money-check.txt')
Remove-Item -Recurse -Force $prof -ErrorAction SilentlyContinue
$results
