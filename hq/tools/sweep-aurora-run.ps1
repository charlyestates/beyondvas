param([string]$Root, [string]$Js, [int]$W = 1280, [int]$H = 900, [string]$Tag = 'aurora', [string[]]$Users = @('u-charly','u-daniela','u-mariela','u-kevin','u-carlos','u-ana','u-mike','a-sofia'), [string[]]$Langs = @('en','es'))
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$base = "file:///" + ((Resolve-Path (Join-Path $Root 'hq\debug.html')).Path -replace '\\','/')
$code = [IO.File]::ReadAllText($Js)
foreach ($u in $Users) { foreach ($lang in $Langs) {
  $url = $base + "?user=$u&lang=$lang&script=" + [Uri]::EscapeDataString($code)
  $outf = Join-Path $Root "hq\dom-$Tag-$u-$lang.txt"
  $dom = & $edge --headless=new --disable-gpu --allow-file-access-from-files --virtual-time-budget=6000 --window-size=$W,$H --dump-dom $url 2>$null | Out-String
  [IO.File]::WriteAllText($outf, $dom, (New-Object System.Text.UTF8Encoding $false))
  "$u $lang -> $($dom.Length) chars"
} }
