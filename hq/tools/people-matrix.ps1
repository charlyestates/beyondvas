# Renders every people.js screen per user in headless Edge and prints the errlog per combination. Run from the session folder.
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$dbg = (Resolve-Path 'hq\debug.html').Path -replace '\\','/'
$screens = @(
  @{ s='clients'; id='' }, @{ s='client'; id='c-rodriguez' }, @{ s='client'; id='c-lonestar' }, @{ s='people'; id='' }, @{ s='person'; id='u-mariela' }, @{ s='person'; id='u-kevin' }, @{ s='person'; id='u-carlos' },
  @{ s='profile'; id='' }, @{ s='pipeline'; id='' }, @{ s='applicant'; id='app-sofia' }, @{ s='applicant'; id='app-paola' }, @{ s='bench'; id='' }, @{ s='academy'; id='' }, @{ s='cohorts'; id='' },
  @{ s='documents'; id='' }, @{ s='onboarding'; id='' }, @{ s='tests'; id='' }
)
$users = @('u-charly','u-daniela','u-mariela','u-ana','a-sofia','u-kevin','u-carlos')
$i = 0; $bad = 0
$out = Join-Path $env:TEMP "hqdom-people.txt"
foreach ($u in $users) { foreach ($sc in $screens) {
  $lang = if ($i % 2 -eq 0) { 'es' } else { 'en' }; $i++
  # ${dbg} with braces: a bare $dbg? would be read as a variable named "dbg?"
  $url = "file:///${dbg}?user=$u&screen=$($sc.s)&lang=$lang" + $(if ($sc.id) { "&id=$($sc.id)" } else { '' })
  & $edge --headless=new --disable-gpu --allow-file-access-from-files --virtual-time-budget=2500 --dump-dom $url 2>$null | Out-File -Encoding utf8 $out
  $dom = [IO.File]::ReadAllText($out)
  $err = ''; if ($dom -match '(?s)<pre id="errlog"[^>]*>(.*?)</pre>') { $err = $matches[1].Trim() }
  $title = ''; if ($dom -match '(?s)<h1>(.*?)</h1>') { $title = ($matches[1] -replace '<[^>]+>','').Trim() }
  $flag = ''
  if ($err) { $flag = 'ERR'; $bad++ }
  if ($dom -match 'class="note bad">') { $flag += ' VIEWERR' }
  if ($dom -match 'not in the prototype yet') { $flag += ' MISSING' }
  if ($dom -notmatch 'data-ready="1"') { $flag += ' NOTREADY' }
  "{0,-10} {1,-10} {2,-13} {3,-2} | {4,-28} {5} {6}" -f $u, $sc.s, $sc.id, $lang, $title, $flag, ($err -replace "`n",' || ')
} }
"done, errors: $bad"
