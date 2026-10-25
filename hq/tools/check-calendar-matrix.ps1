# Full matrix for app/calendar.js: screens x users x langs, desktop and phone width. Prints one line per combo.
# Run from the session folder:  powershell -NoProfile -File hq\tools\check-calendar-matrix.ps1
$ErrorActionPreference = 'Continue'
$Root = (Get-Location).Path
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$dbg = "file:///" + ((Resolve-Path (Join-Path $Root 'hq\debug.html')).Path -replace '\\','/')
$out = Join-Path $Root "hq\dom-calmatrix-dom.txt"
function Run($q, $win) {
  $a = @('--headless=new','--disable-gpu','--allow-file-access-from-files','--virtual-time-budget=4000')
  if ($win) { $a += "--window-size=$win" }
  & $edge @a --dump-dom ($dbg + $q) 2>$null | Out-File -Encoding utf8 $out
  $dom = [IO.File]::ReadAllText($out)
  $m = [regex]::Match($dom, '<pre id="errlog"[^>]*>([\s\S]*?)</pre>')
  $err = if ($m.Success) { $m.Groups[1].Value.Trim() } else { '(no errlog)' }
  $as = [regex]::Match($dom, '<pre id="asserts"[^>]*>([\s\S]*?)</pre>').Groups[1].Value.Trim()
  $sw = [regex]::Match($dom, 'data-sw="(\d+)"').Groups[1].Value; $w = [regex]::Match($dom, 'data-w="(\d+)"').Groups[1].Value
  $h1 = [regex]::Match($dom, '<h1>([\s\S]*?)</h1>').Groups[1].Value -replace '<[^>]+>',''
  $flags = ''
  if ($dom -match 'not in the prototype yet') { $flags += ' [missing-screen]' }
  if ($h1 -eq 'Error') { $flags += ' [render-error]' }
  if ($dom -match '<div class="empty"><b>') { $flags += ' [has-empty]' }
  if ([int]$sw -gt [int]$w) { $flags += ' [OVERFLOW]' }
  $short = if ($q.Length -gt 80) { $q.Substring(0, 80) + '...' } else { $q }
  "$short [$win] -> h1='$h1' sw=$sw w=$w err='$err'$flags" + $(if ($as) { "`n   asserts: " + ($as -replace "`n", ' | ') } else { '' })
}
$users = @('u-charly','u-daniela','u-mariela','u-jose','u-kevin','u-carlos','u-ana','u-mike','a-sofia','a-camila')
"== desktop 1280x900 =="
foreach ($u in $users) { foreach ($l in @('en','es')) {
  Run "?user=$u&screen=calendar&lang=$l" '1280,900'
  Run "?user=$u&screen=timeoff&lang=$l" '1280,900'
  Run "?user=$u&screen=event&id=ev-0026&lang=$l" '1280,900'
} }
"== event ids per role =="
Run "?user=u-charly&screen=event&id=ev-0016&lang=en" '1280,900'
Run "?user=u-daniela&screen=event&id=ev-0006&lang=es" '1280,900'
Run "?user=u-daniela&screen=calendar&id=ud-0003&lang=es" '1280,900'
Run "?user=u-mariela&screen=calendar&id=ev-0014&lang=es" '1280,900'
Run "?user=u-mariela&screen=event&id=ev-0032&lang=es" '1280,900'
Run "?user=u-jose&screen=event&id=ev-0039&lang=es" '1280,900'
Run "?user=u-kevin&screen=event&id=ev-0009&lang=es" '1280,900'
Run "?user=u-carlos&screen=event&id=ev-0008&lang=es" '1280,900'
Run "?user=u-ana&screen=event&id=ev-0019&lang=en" '1280,900'
Run "?user=u-mike&screen=event&id=ev-0006&lang=en" '1280,900'
Run "?user=u-mike&screen=event&id=ev-0039&lang=en" '1280,900'
Run "?user=a-sofia&screen=event&id=ev-0014&lang=es" '1280,900'
Run "?user=a-camila&screen=event&id=ev-0006&lang=es" '1280,900'
Run "?user=u-ana&screen=calendar&id=ev-0015&lang=en" '1280,900'
Run "?user=u-charly&screen=event&id=nope&lang=en" '1280,900'
"== phone 390x844 =="
foreach ($u in $users) {
  Run "?user=$u&screen=calendar&lang=es" '390,844'
  Run "?user=$u&screen=timeoff&lang=en" '390,844'
}
Run "?user=u-mariela&screen=event&id=ev-0014&lang=es" '390,844'
Run "?user=u-daniela&screen=timeoff&id=ud-0003&lang=es" '390,844'
"done"
