param([string]$Root)
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$pr = "file:///" + ((Resolve-Path (Join-Path $Root 'hq\phone-probe.html')).Path -replace '\\','/')
$ph = "file:///" + ((Resolve-Path (Join-Path $Root 'hq\phone.html')).Path -replace '\\','/')
$out = Join-Path $Root 'hq\shots\phone-audit'
New-Item -ItemType Directory -Force $out | Out-Null
$cases = @(
  @{n='home-charly'; q='user=u-charly&screen=home'},
  @{n='home-daniela'; q='user=u-daniela&screen=home'},
  @{n='home-mariela'; q='user=u-mariela&screen=home'},
  @{n='home-ana'; q='user=u-ana&screen=home'},
  @{n='home-kevin'; q='user=u-kevin&screen=home'},
  @{n='home-carlos'; q='user=u-carlos&screen=home'},
  @{n='home-sofia'; q='user=a-sofia&screen=home'},
  @{n='channel-mariela'; q='user=u-mariela&screen=channel&id=ch-rodriguez'},
  @{n='channel-ana'; q='user=u-ana&screen=channel&id=ch-rodriguez'},
  @{n='report-mariela'; q='user=u-mariela&screen=report'},
  @{n='hours-mariela'; q='user=u-mariela&screen=hours'},
  @{n='hours-ana'; q='user=u-ana&screen=hours'},
  @{n='hours-daniela'; q='user=u-daniela&screen=hours'},
  @{n='week-daniela'; q='user=u-daniela&screen=week&id=wa-p-rod-2-2026-10-12'},
  @{n='placement-ana'; q='user=u-ana&screen=placement&id=p-rod-2'},
  @{n='placement-daniela'; q='user=u-daniela&screen=placement&id=p-rod-2'},
  @{n='billing-ana'; q='user=u-ana&screen=billing'},
  @{n='payouts-mariela'; q='user=u-mariela&screen=payouts'},
  @{n='pipeline-daniela'; q='user=u-daniela&screen=pipeline'},
  @{n='applicant-daniela'; q='user=u-daniela&screen=applicant&id=a-sofia'},
  @{n='bench-daniela'; q='user=u-daniela&screen=bench'},
  @{n='calendar-mariela'; q='user=u-mariela&screen=calendar'},
  @{n='timeoff-mariela'; q='user=u-mariela&screen=timeoff'},
  @{n='compliance-ana'; q='user=u-ana&screen=compliance'},
  @{n='tickets-daniela'; q='user=u-daniela&screen=tickets'},
  @{n='ticket-daniela'; q='user=u-daniela&screen=ticket&id=tk-0007'},
  @{n='help-mike'; q='user=u-mike&screen=help'},
  @{n='inbox-daniela'; q='user=u-daniela&screen=inbox'},
  @{n='money-charly'; q='user=u-charly&screen=money'},
  @{n='reports-charly'; q='user=u-charly&screen=reports'},
  @{n='settings-charly'; q='user=u-charly&screen=settings'},
  @{n='more-mariela'; q='user=u-mariela&screen=more'},
  @{n='channel-mariela-es'; q='user=u-mariela&screen=channel&id=ch-rodriguez&lang=es'},
  @{n='home-ana-es'; q='user=u-ana&screen=home&lang=es'}
)
$log = @()
foreach ($c in $cases) {
  $dom = & $edge --headless=new --disable-gpu --allow-file-access-from-files --virtual-time-budget=8000 --window-size=520,900 --dump-dom ($pr + '?' + $c.q) 2>$null | Out-String
  $p = [regex]::Match($dom, '<pre id="probe">(.*?)</pre>', 'Singleline').Groups[1].Value
  $log += "=== $($c.n) [$($c.q)]"; $log += $p; $log += ''
  & $edge --headless=new --disable-gpu --allow-file-access-from-files --virtual-time-budget=6000 --window-size=520,2200 --screenshot="$out\$($c.n)-full.png" ($pr + '?h=2200&' + $c.q) 2>$null | Out-Null
  if (-not (Test-Path "$out\$($c.n).png")) {
    & $edge --headless=new --disable-gpu --allow-file-access-from-files --virtual-time-budget=6000 --window-size=390,844 --screenshot="$out\$($c.n).png" ($ph + '?' + $c.q) 2>$null | Out-Null
  }
  $log | Set-Content -Encoding utf8 (Join-Path $out 'probe-log.txt')
}
"done"
