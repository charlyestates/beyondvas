# Loads hq/debug.html through headless Edge for the calendar module's screens x users x languages and prints the errlog of each.
# Run from the session folder:  powershell -NoProfile -File hq\tools\check-calendar.ps1
$ErrorActionPreference = 'Continue'
$Root = (Get-Location).Path
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$dbg = "file:///" + ((Resolve-Path (Join-Path $Root 'hq\debug.html')).Path -replace '\\','/')
$combos = @(
  @{u='u-charly';  s='calendar'; l='en'}, @{u='u-charly';  s='timeoff'; l='es'}, @{u='u-charly'; s='event'; id='ev-0006'; l='en'},
  @{u='u-daniela'; s='calendar'; l='es'}, @{u='u-daniela'; s='timeoff'; l='es'}, @{u='u-daniela'; s='event'; id='ev-0014'; l='es'}, @{u='u-daniela'; s='calendar'; id='ud-0003'; l='es'}, @{u='u-daniela'; s='event'; id='ev-0006'; l='en'},
  @{u='u-mariela'; s='calendar'; l='es'}, @{u='u-mariela'; s='timeoff'; l='es'}, @{u='u-mariela'; s='event'; id='ev-0029'; l='en'}, @{u='u-mariela'; s='calendar'; id='ev-0014'; l='es'},
  @{u='u-ana';     s='calendar'; l='en'}, @{u='u-ana';     s='timeoff'; l='en'}, @{u='u-ana';     s='event'; id='ev-0015'; l='es'}, @{u='u-ana'; s='event'; id='ev-0006'; l='en'},
  @{u='u-mike';    s='calendar'; l='en'}, @{u='u-mike';    s='event'; id='ev-0006'; l='en'},
  @{u='a-sofia';   s='calendar'; l='es'}, @{u='a-sofia';   s='timeoff'; l='es'}, @{u='a-sofia';   s='event'; id='ev-0026'; l='en'},
  @{u='u-kevin';   s='calendar'; l='es'}, @{u='u-kevin';   s='timeoff'; l='en'}, @{u='u-kevin';   s='event'; id='ev-0009'; l='es'},
  @{u='u-carlos';  s='calendar'; l='es'}, @{u='u-carlos';  s='timeoff'; l='es'}, @{u='u-carlos';  s='event'; id='ev-0008'; l='es'}
)
$i = 0
foreach ($c in $combos) {
  $i++
  $q = "?user=$($c.u)&screen=$($c.s)&lang=$($c.l)"; if ($c.id) { $q += "&id=$($c.id)" }
  $out = Join-Path $Root "hq\dom.txt"
  & $edge --headless=new --disable-gpu --allow-file-access-from-files --virtual-time-budget=4000 --dump-dom ($dbg + $q) 2>$null | Out-File -Encoding utf8 $out
  $dom = [IO.File]::ReadAllText($out)
  $m = [regex]::Match($dom, '<pre id="errlog"[^>]*>([\s\S]*?)</pre>')
  $err = if ($m.Success) { $m.Groups[1].Value.Trim() } else { '(no errlog)' }
  $sw = [regex]::Match($dom, 'data-sw="(\d+)"').Groups[1].Value; $w = [regex]::Match($dom, 'data-w="(\d+)"').Groups[1].Value
  $h1 = [regex]::Match($dom, '<h1>([\s\S]*?)</h1>').Groups[1].Value -replace '<[^>]+>',''
  $nip = if ($dom -match 'not in the prototype yet') { ' [missing-screen]' } else { '' }
  "$i $q -> h1='$h1' sw=$sw w=$w err='$err'$nip"
}
