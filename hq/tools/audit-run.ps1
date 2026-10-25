param([string]$Root, [int]$W = 1280, [int]$H = 900, [string]$Out = 'hq\audit-matrix.txt', [string]$Js = 'hq\tools\audit-matrix.js', [string]$Page = 'hq\debug.html')
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$base = "file:///" + ((Resolve-Path (Join-Path $Root $Page)).Path -replace '\\','/')
$src = [IO.File]::ReadAllText((Join-Path $Root $Js))
$users = @('u-charly','u-daniela','u-mariela','u-jose','u-andrea','u-kevin','u-carlos','u-ana','u-mike','u-priya','a-sofia','a-camila','u-daniela>u-ana','u-charly>u-mike','u-daniela>u-priya')
$all = @()
foreach ($u in $users) {
  $parts = $u.Split('>'); $uid = $parts[0]; $va = if ($parts.Length -gt 1) { $parts[1] } else { '__NONE__' }
  $code = $src.Replace('__VIEWAS__', $va)
  $url = $base + "?user=$uid&script=" + [Uri]::EscapeDataString($code)
  $dom = & $edge --headless=new --disable-gpu --allow-file-access-from-files --virtual-time-budget=8000 --window-size=$W,$H --dump-dom $url 2>$null | Out-String
  $m = [regex]::Match($dom, '<pre id="errlog"[^>]*>(.*?)</pre>', 'Singleline')
  $err = if ($m.Success) { $m.Groups[1].Value.Trim() } else { 'NO ERRLOG' }
  $a = [regex]::Match($dom, '<pre id="asserts"[^>]*>(.*?)</pre>', 'Singleline')
  $all += "=== $u (${W}x${H}) ERRLOG: $err"
  $all += ($a.Groups[1].Value -split "`n" | Where-Object { $_ -ne '' })
}
$all | Set-Content -Encoding utf8 (Join-Path $Root $Out)
"written $Out ($($all.Count) lines)"
