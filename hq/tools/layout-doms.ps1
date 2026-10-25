param([string]$root)
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$out = Join-Path $root "hq\shots\layout\dom"
New-Item -ItemType Directory -Force $out | Out-Null
$debug = "file:///" + ((Resolve-Path (Join-Path $root "hq\debug.html")).Path -replace '\\','/')
$probe = "file:///" + ((Resolve-Path (Join-Path $root "hq\phone-probe.html")).Path -replace '\\','/')
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
# measure at 390 via a script param that sets the iframe-less viewport? headless min width is ~500, so use a script that measures #app scrollWidth against 390 instead
$meas = [uri]::EscapeDataString("(function(){var b=document.body;var w=390;var els=document.querySelectorAll('body *');var over=[];for(var i=0;i<els.length;i++){var r=els[i].getBoundingClientRect();if(r.right>w+1&&r.width>0&&r.height>0&&getComputedStyle(els[i]).position!=='fixed'){var e=els[i];over.push((e.tagName+'.'+(e.className||'').toString().replace(/\s+/g,'.')).slice(0,60)+'@'+Math.round(r.left)+'-'+Math.round(r.right))}}window.__assert('sw='+b.scrollWidth+' w='+innerWidth+' over390='+over.length+' '+over.slice(0,12).join(' | '),true)})()")
$sw = @()
foreach ($it in $list) {
  $n = $it[0]; $q = $it[1]
  $f = Join-Path $out "$n-phone.txt"
  & $edge --headless=new --disable-gpu --allow-file-access-from-files --virtual-time-budget=6000 --window-size=600,900 --dump-dom "$probe`?$q&lang=en" | Out-File -Encoding utf8 $f
  $txt = [IO.File]::ReadAllText($f)
  $pr = [regex]::Match($txt, '<pre id="probe"[^>]*>([\s\S]*?)</pre>').Groups[1].Value.Trim()
  $sw += "=== $n phone`n$pr"
  $f = Join-Path $out "$n-desk.txt"
  & $edge --headless=new --disable-gpu --allow-file-access-from-files --virtual-time-budget=4000 --window-size=1280,900 --dump-dom "$debug`?$q&lang=en" | Out-File -Encoding utf8 $f
  $txt = [IO.File]::ReadAllText($f)
  $bt = [regex]::Match($txt, '<body([^>]*)>').Groups[1].Value
  $sw += "$n desk body=[$bt]"
}
$sw | Out-File -Encoding utf8 (Join-Path $root "hq\dom-layout.txt")
