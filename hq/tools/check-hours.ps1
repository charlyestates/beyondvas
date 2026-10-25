# Checks app/hours.js: every hours-module screen for a set of people in both languages, reading <pre id="errlog">.
# Run from the session folder:  powershell -NoProfile -File hq\tools\check-hours.ps1
$ErrorActionPreference = 'Continue'
$root = Split-Path -Parent (Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path))
Set-Location $root
powershell -NoProfile -File hq\build.ps1 | Out-Null
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$base = "file:///" + ((Resolve-Path hq\debug.html).Path -replace '\\','/')
$users = @('u-charly','u-daniela','u-mariela','u-ana','a-sofia','u-kevin','u-mike','u-priya','u-jose')
$screens = @(
  @{ s='hours'; id='' }, @{ s='week'; id='wa-p-rod-2-2026-10-12' }, @{ s='week'; id='p-lone-1' }, @{ s='week'; id='wa-p-sun-1-2026-10-05' },
  @{ s='placements'; id='' }, @{ s='placement'; id='' }, @{ s='placement'; id='p-rod-2' }, @{ s='placement'; id='p-rod-1' }, @{ s='placement'; id='p-sun-1' }, @{ s='outages'; id='' }
)
$i = 0; $bad = 0
foreach ($u in $users) { foreach ($sc in $screens) {
  $i++; $lang = if ($i % 2 -eq 0) { 'es' } else { 'en' }
  $url = "${base}?user=$u&screen=$($sc.s)&lang=$lang" + $(if ($sc.id) { "&id=$($sc.id)" } else { '' })
  & $edge --headless=new --disable-gpu --allow-file-access-from-files --virtual-time-budget=4000 --dump-dom $url | Out-File -Encoding utf8 hq\dom.txt
  $dom = [IO.File]::ReadAllText((Resolve-Path hq\dom.txt).Path)
  $m = [regex]::Match($dom, '<pre id="errlog"[^>]*>([\s\S]*?)</pre>')
  $err = if ($m.Success) { $m.Groups[1].Value.Trim() } else { 'NO ERRLOG' }
  $title = [regex]::Match($dom, '<title>([^<]*)</title>').Groups[1].Value
  $empty = if ($dom -match 'class="empty"') { 'EMPTY' } else { '' }
  $sw = [regex]::Match($dom, 'data-sw="(\d+)"').Groups[1].Value
  if ($err) { $bad++ }
  "{0,-10} {1,-10} {2,-24} {3,-3} sw={4,-5} {5,-6} {6} | {7}" -f $u, $sc.s, $sc.id, $lang, $sw, $empty, $title, $err
} }
"done: $i combos, $bad with errors"
