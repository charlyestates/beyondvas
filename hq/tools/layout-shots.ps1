param([string]$root)
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$out = Join-Path $root "hq\shots\layout"
New-Item -ItemType Directory -Force $out | Out-Null
$debug = "file:///" + ((Resolve-Path (Join-Path $root "hq\debug.html")).Path -replace '\\','/')
$phone = "file:///" + ((Resolve-Path (Join-Path $root "hq\phone.html")).Path -replace '\\','/')
$list = @(
  @('home-charly','user=u-charly&screen=home'),
  @('home-daniela','user=u-daniela&screen=home'),
  @('home-mariela','user=u-mariela&screen=home'),
  @('home-ana','user=u-ana&screen=home'),
  @('home-kevin','user=u-kevin&screen=home'),
  @('home-carlos','user=u-carlos&screen=home'),
  @('home-sofia','user=a-sofia&screen=home'),
  @('inbox-daniela','user=u-daniela&screen=inbox'),
  @('channel-mariela','user=u-mariela&screen=channel&id=ch-rodriguez'),
  @('channel-ana','user=u-ana&screen=channel&id=ch-rodriguez'),
  @('report-mariela','user=u-mariela&screen=report'),
  @('hours-mariela','user=u-mariela&screen=hours'),
  @('hours-ana','user=u-ana&screen=hours'),
  @('hours-daniela','user=u-daniela&screen=hours'),
  @('week-daniela','user=u-daniela&screen=week&id=p-rod-2'),
  @('placement-ana','user=u-ana&screen=placement&id=p-rod-2'),
  @('placement-daniela','user=u-daniela&screen=placement&id=p-rod-2'),
  @('billing-ana','user=u-ana&screen=billing'),
  @('payouts-charly','user=u-charly&screen=payouts'),
  @('pipeline-daniela','user=u-daniela&screen=pipeline'),
  @('applicant-daniela','user=u-daniela&screen=applicant&id=a-sofia'),
  @('bench-daniela','user=u-daniela&screen=bench'),
  @('calendar-mariela','user=u-mariela&screen=calendar'),
  @('timeoff-mariela','user=u-mariela&screen=timeoff'),
  @('compliance-charly','user=u-charly&screen=compliance'),
  @('tickets-daniela','user=u-daniela&screen=tickets'),
  @('ticket-daniela','user=u-daniela&screen=ticket&id=tk-0007'),
  @('help-ana','user=u-ana&screen=help'),
  @('people-daniela','user=u-daniela&screen=people'),
  @('person-mariela','user=u-daniela&screen=person&id=u-mariela'),
  @('academy-carlos','user=u-carlos&screen=academy'),
  @('money-charly','user=u-charly&screen=money'),
  @('reports-charly','user=u-charly&screen=reports'),
  @('settings-charly','user=u-charly&screen=settings')
)
$desk = @('home-charly','home-daniela','home-ana','inbox-daniela','channel-mariela','hours-daniela','week-daniela','placement-daniela','people-daniela','money-charly','pipeline-daniela','ticket-daniela')
$dark = @('home-charly','channel-ana','inbox-daniela','hours-mariela','billing-ana','compliance-charly','academy-carlos','calendar-mariela')
$common = @('--headless=new','--disable-gpu','--allow-file-access-from-files','--virtual-time-budget=4000','--hide-scrollbars')
$sw = @()
foreach ($it in $list) {
  $n = $it[0]; $q = $it[1]
  & $edge @common --window-size=390,844 --screenshot="$out\$n-phone.png" "$phone`?$q&lang=en" | Out-Null
  $d = & $edge @common --window-size=390,844 --dump-dom "$debug`?$q&lang=en"
  $txt = ($d -join "`n")
  $err = [regex]::Match($txt, '<pre id="errlog"[^>]*>([\s\S]*?)</pre>').Groups[1].Value
  $bt = [regex]::Match($txt, '<body([^>]*)>').Groups[1].Value
  $sw += "$n phone body=[$bt] err=[$($err.Trim())]"
  if ($desk -contains $n) {
    & $edge @common --window-size=1280,900 --screenshot="$out\$n-desk.png" "$debug`?$q&lang=en" | Out-Null
    $d = & $edge @common --window-size=1280,900 --dump-dom "$debug`?$q&lang=en"
    $bt = [regex]::Match(($d -join "`n"), '<body([^>]*)>').Groups[1].Value
    $sw += "$n desk body=[$bt]"
  }
  if ($dark -contains $n) {
    & $edge @common --window-size=1280,900 --screenshot="$out\$n-dark.png" "$debug`?$q&lang=en&theme=dark" | Out-Null
    & $edge @common --window-size=390,844 --screenshot="$out\$n-phone-dark.png" "$phone`?$q&lang=en&theme=dark" | Out-Null
  }
}
$sw | Out-File -Encoding utf8 (Join-Path $root "hq\dom-layout.txt")
$sw
