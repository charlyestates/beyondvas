# Renders home and inbox for every person x language through headless Edge; prints errlog, title, card count,
# scroll width (sw; 390 = no horizontal overflow at phone width when -W 390) and whether the "not in the prototype yet" placeholder rendered.
# Run from the repository root:  powershell -NoProfile -File hq\tools\check-home-matrix.ps1 [-W 390]
param([int]$W = 1280, [int]$H = 900)
$ErrorActionPreference = 'Continue'
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$base = "file:///" + ((Resolve-Path hq\debug.html).Path -replace '\\','/')
$users = @('u-charly','u-daniela','u-mariela','u-jose','u-kevin','u-carlos','u-ana','u-mike','a-sofia','a-camila')
$out = (Resolve-Path hq).Path + '\dom.txt'
foreach ($screen in @('home','inbox')) {
  foreach ($u in $users) {
    foreach ($lang in @('en','es')) {
      $url = "${base}?user=$u&screen=$screen&lang=$lang"
      & $edge --headless=new --disable-gpu --allow-file-access-from-files --virtual-time-budget=4000 --window-size=$W,$H --dump-dom $url 2>$null | Out-File -Encoding utf8 $out
      $dom = [IO.File]::ReadAllText($out)
      $err = ''; if ($dom -match '(?s)<pre id="errlog"[^>]*>(.*?)</pre>') { $err = $matches[1].Trim() }
      $title = ''; if ($dom -match '<title>([^<]*)</title>') { $title = $matches[1] }
      $sw = ''; if ($dom -match 'data-sw="(\d+)"') { $sw = $matches[1] }
      $cards = ([regex]::Matches($dom, 'class="card')).Count
      $ph = if ($dom -match 'is not in the prototype yet') { 'PLACEHOLDER' } else { '' }
      $ready = if ($dom -match 'data-ready="1"') { 'ready' } else { 'NOT READY' }
      "$u $screen $lang | $ready | title=$title | cards=$cards | sw=$sw | $ph | err=[$err]"
    }
  }
}
