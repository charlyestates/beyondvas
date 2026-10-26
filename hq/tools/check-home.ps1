# Renders the home.js screens for every relevant person and language through headless Edge and prints the error log per combination.
# Run from the repository root:  powershell -NoProfile -File hq\tools\check-home.ps1
$ErrorActionPreference = 'Continue'
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$base = "file:///" + ((Resolve-Path hq\debug.html).Path -replace '\\','/')
$combos = @(
  @('u-charly','home','en'), @('u-charly','home','es'),
  @('u-daniela','inbox','es'), @('u-daniela','inbox','en'), @('u-daniela','home','es'),
  @('u-mariela','home','es'), @('u-mariela','home','en'),
  @('u-jose','home','es'), @('u-andrea','home','es'),
  @('u-kevin','home','es'), @('u-carlos','home','es'), @('u-carlos','home','en'),
  @('u-ana','home','en'), @('u-ana','home','es'), @('u-mike','home','en'), @('u-priya','home','es'),
  @('a-sofia','home','es'), @('a-sofia','home','en'), @('a-camila','home','es'),
  @('u-ana','inbox','en'), @('u-mariela','inbox','es'), @('a-sofia','inbox','es')
)
foreach ($c in $combos) {
  $u = "${base}?user=$($c[0])&screen=$($c[1])&lang=$($c[2])"
  & $edge --headless=new --disable-gpu --allow-file-access-from-files --virtual-time-budget=4000 --dump-dom $u | Out-File -Encoding utf8 hq\dom-home.txt
  $dom = [IO.File]::ReadAllText((Resolve-Path hq\dom-home.txt).Path)
  $err = ''; if ($dom -match '(?s)<pre id="errlog"[^>]*>(.*?)</pre>') { $err = $matches[1].Trim() }
  $title = ''; if ($dom -match '<title>([^<]*)</title>') { $title = $matches[1] }
  $sw = ''; if ($dom -match 'data-sw="(\d+)"') { $sw = $matches[1] }
  $cards = ([regex]::Matches($dom, 'class="card')).Count
  $ready = if ($dom -match 'data-ready="1"') { 'ready' } else { 'NOT READY' }
  "$($c -join ' ') | $ready | title=$title | cards=$cards | sw=$sw | err=[$err]"
}
