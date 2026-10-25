param([string]$Root, [string]$Js, [string]$Out, [int]$W = 1280, [int]$H = 900, [string]$Extra = '')
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$base = "file:///" + ((Resolve-Path (Join-Path $Root 'hq\debug.html')).Path -replace '\\','/')
$code = [IO.File]::ReadAllText($Js)
$u = $base + "?script=" + [Uri]::EscapeDataString($code) + $Extra
$dom = & $edge --headless=new --disable-gpu --allow-file-access-from-files --virtual-time-budget=6000 --window-size=$W,$H --dump-dom $u 2>$null | Out-String
$m = [regex]::Match($dom, '<pre id="errlog"[^>]*>(.*?)</pre>', 'Singleline')
$err = if ($m.Success) { $m.Groups[1].Value.Trim() } else { 'NO ERRLOG' }
$a = [regex]::Match($dom, '<pre id="asserts"[^>]*>(.*?)</pre>', 'Singleline')
$lines = @("ERRLOG: $err") + ($a.Groups[1].Value -split "`n")
$lines | Set-Content -Encoding utf8 $Out
"written $Out ($($lines.Count) lines)"
