param([int]$W = 1280, [int]$H = 900, [string]$Tag = 'desk', [string]$Js = 'errscan.js', [string[]]$Users = @('u-charly','u-daniela','u-mariela','u-jose','u-kevin','u-carlos','u-ana','u-mike','u-priya','a-sofia'), [string[]]$Langs = @('en','es'))
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)   # hq
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$base = "file:///" + ((Resolve-Path (Join-Path $root 'debug.html')).Path -replace '\\','/')
$code = [IO.File]::ReadAllText((Join-Path $root ("tools\" + $Js)))
foreach ($u in $Users) { foreach ($lang in $Langs) {
  $url = $base + "?user=$u&lang=$lang&script=" + [Uri]::EscapeDataString($code)
  $outf = Join-Path $root "dom-errscan-$Tag-$u-$lang.txt"
  $dom = & $edge --headless=new --disable-gpu --allow-file-access-from-files --virtual-time-budget=5000 --window-size=$W,$H --dump-dom $url 2>$null | Out-String
  [IO.File]::WriteAllText($outf, $dom, (New-Object System.Text.UTF8Encoding $false))
  "$u $lang -> $($dom.Length) chars"
} }
