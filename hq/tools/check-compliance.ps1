param([string]$Root)
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$base = "file:///" + ((Resolve-Path (Join-Path $Root 'hq\debug.html')).Path -replace '\\','/')
$users = @('u-charly','u-daniela','u-mariela','u-ana','a-sofia','u-kevin','u-carlos','u-mike','u-jose')
$screens = @(
  @{s='help'}, @{s='compliance'}, @{s='scope';id='p-rod-2'}, @{s='scope';id='p-lone-1'}, @{s='telemarketing';id='c-rodriguez'}, @{s='telemarketing';id='c-lonestar'},
  @{s='callqa';id='u-mariela'}, @{s='callqa';id='u-kevin'}, @{s='tickets'}, @{s='ticket';id='tk-0007'}, @{s='ticket';id='tk-0003'}, @{s='ticket';id='tk-0009'}, @{s='audit'}, @{s='support'}
)
$i = 0; $out = @()
foreach ($u in $users) { foreach ($sc in $screens) {
  $i++; $lang = if ($i % 2 -eq 0) { 'es' } else { 'en' }
  $q = "?user=$u&screen=$($sc.s)&lang=$lang"; if ($sc.id) { $q += "&id=$($sc.id)" }
  $dom = & $edge --headless=new --disable-gpu --allow-file-access-from-files --virtual-time-budget=4000 --dump-dom ($base + $q) 2>$null | Out-String
  $m = [regex]::Match($dom, '<pre id="errlog"[^>]*>(.*?)</pre>', 'Singleline')
  $err = if ($m.Success) { $m.Groups[1].Value.Trim() } else { 'NO ERRLOG' }
  $title = [regex]::Match($dom, '<h1>(.*?)</h1>').Groups[1].Value
  $empty = if ($dom -match 'class="empty"') { 'empty' } else { '' }
  $out += "$u $($sc.s) $($sc.id) $lang | $title | $empty | $err"
} }
$out | Set-Content -Encoding utf8 (Join-Path $Root 'hq\check-compliance.txt')
$out
