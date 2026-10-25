param([string]$Root, [string]$Js, [string]$OutDir, [string[]]$Users = @('u-ana','u-mike','u-jenna','u-priya','u-mariela','u-jose','u-andrea','u-kevin','u-daniela'), [string[]]$Langs = @('en','es'), [int]$W = 1280, [int]$H = 900)
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$base = "file:///" + ((Resolve-Path (Join-Path $Root 'hq\debug.html')).Path -replace '\\','/')
$code = [IO.File]::ReadAllText($Js)
New-Item -ItemType Directory -Force $OutDir | Out-Null
foreach ($u in $Users) { foreach ($l in $Langs) {
  $url = $base + "?user=$u&lang=$l&screen=home&script=" + [Uri]::EscapeDataString($code)
  $dom = & $edge --headless=new --disable-gpu --allow-file-access-from-files --virtual-time-budget=20000 --window-size=$W,$H --dump-dom $url 2>$null | Out-String
  $m = [regex]::Match($dom, '<pre id="errlog"[^>]*>(.*?)</pre>', 'Singleline')
  $err = if ($m.Success) { $m.Groups[1].Value.Trim() } else { 'NO ERRLOG' }
  $a = [regex]::Match($dom, '<pre id="asserts"[^>]*>(.*?)</pre>', 'Singleline')
  $txt = [System.Net.WebUtility]::HtmlDecode($a.Groups[1].Value)
  $lines = @("ERRLOG: $err") + ($txt -split "`n")
  $f = Join-Path $OutDir "$u-$l-$W.txt"
  $lines | Set-Content -Encoding utf8 $f
  $hits = ($lines | Where-Object { $_ -like 'HIT|*' }).Count
  $errs = ($lines | Where-Object { $_ -like 'ERR|*' }).Count
  "$u $l ${W}px: $($lines.Count) lines, $hits hits, $errs errs, errlog=[$err]"
} }
