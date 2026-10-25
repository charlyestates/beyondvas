# Phone-width screenshots of the money module (390x844 frame via hq/phone.html), one Edge profile per shot.
# Run from the session folder:  powershell -NoProfile -File hq\tools\shots-money.ps1
$ErrorActionPreference = 'Continue'
$Root = Split-Path -Parent (Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path))
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$base = "file:///" + ((Resolve-Path (Join-Path $Root 'hq\phone.html')).Path -replace '\\','/')
$prof = Join-Path $env:TEMP ('hq-edge-shots-' + $PID)
New-Item -ItemType Directory -Force $prof | Out-Null
$out = Join-Path $Root 'hq\shots'
New-Item -ItemType Directory -Force $out | Out-Null
$shots = @(
  @('money-owner-phone',   'user=u-charly&screen=money&lang=en'),
  @('billing-client-phone','user=u-ana&screen=billing&lang=en'),
  @('invoice-ana-1006-phone','user=u-ana&screen=invoice&id=inv-1006&lang=en'),
  @('billing-mike-phone',  'user=u-mike&screen=billing&lang=en'),
  @('payouts-va-phone',    'user=u-mariela&screen=payouts&lang=es'),
  @('payouts-owner-phone', 'user=u-charly&screen=payouts&lang=es'),
  @('reports-owner-phone', 'user=u-charly&screen=reports&lang=en'),
  @('settings-owner-phone','user=u-charly&screen=settings&lang=es'),
  @('billing-owner-phone', 'user=u-charly&screen=billing&lang=en')
)
$n = 0
foreach ($s in $shots) {
  $n++
  $p1 = Join-Path $prof ('p' + $n); New-Item -ItemType Directory -Force $p1 | Out-Null
  $png = Join-Path $out ($s[0] + '.png')
  if (Test-Path $png) { Remove-Item -Force $png }
  $u = $base + '?' + $s[1]
  cmd /c "`"$edge`" --headless=new --disable-gpu --allow-file-access-from-files --no-first-run --user-data-dir=`"$p1`" --window-size=390,1600 --virtual-time-budget=4000 --screenshot=`"$png`" `"$u`" 2>nul"
  for ($try = 0; $try -lt 40; $try++) { if (Test-Path $png) { break }; Start-Sleep -Milliseconds 500 }
  Start-Sleep -Milliseconds 800
  "$($s[0]): " + (Test-Path $png)
}
Start-Sleep -Seconds 2
Remove-Item -Recurse -Force $prof -ErrorAction SilentlyContinue
