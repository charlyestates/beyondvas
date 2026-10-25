# Desktop-width matrix, scripted action flows (day-off rule, RSVP, approve, add event) and screenshots for app/calendar.js.
# Run from the session folder:  powershell -NoProfile -File hq\tools\check-calendar-flows.ps1
$ErrorActionPreference = 'Continue'
$Root = (Get-Location).Path
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$dbg = "file:///" + ((Resolve-Path (Join-Path $Root 'hq\debug.html')).Path -replace '\\','/')
$ph = "file:///" + ((Resolve-Path (Join-Path $Root 'hq\phone.html')).Path -replace '\\','/')
$out = Join-Path $Root "hq\dom.txt"
function Run($q, $win) {
  $args = @('--headless=new','--disable-gpu','--allow-file-access-from-files','--virtual-time-budget=4000')
  if ($win) { $args += "--window-size=$win" }
  & $edge @args --dump-dom ($dbg + $q) 2>$null | Out-File -Encoding utf8 $out
  $dom = [IO.File]::ReadAllText($out)
  $m = [regex]::Match($dom, '<pre id="errlog"[^>]*>([\s\S]*?)</pre>')
  $err = if ($m.Success) { $m.Groups[1].Value.Trim() } else { '(no errlog)' }
  $a = [regex]::Match($dom, '<pre id="asserts"[^>]*>([\s\S]*?)</pre>').Groups[1].Value.Trim()
  $sw = [regex]::Match($dom, 'data-sw="(\d+)"').Groups[1].Value; $w = [regex]::Match($dom, 'data-w="(\d+)"').Groups[1].Value
  $h1 = [regex]::Match($dom, '<h1>([\s\S]*?)</h1>').Groups[1].Value -replace '<[^>]+>',''
  $pane = if ($dom -match 'class="app[^"]*has-pane') { ' pane' } else { '' }
  $short = if ($q.Length -gt 70) { $q.Substring(0, 70) + '...' } else { $q }
  "$short [$win] -> h1='$h1' sw=$sw w=$w err='$err'$pane" + $(if ($a) { "`n   asserts: " + ($a -replace "`n", ' | ') } else { '' })
}
# desktop width matrix
foreach ($c in @(@{u='u-charly';s='calendar';l='en'}, @{u='u-daniela';s='calendar';l='es'}, @{u='u-daniela';s='timeoff';l='es'}, @{u='u-mariela';s='calendar';l='es'}, @{u='u-mariela';s='timeoff';l='es'}, @{u='u-ana';s='calendar';l='en'}, @{u='u-ana';s='timeoff';l='en'}, @{u='a-sofia';s='calendar';l='es'}, @{u='u-kevin';s='calendar';l='es'}, @{u='u-priya';s='event';l='en';id='ev-0011'}, @{u='u-jose';s='timeoff';l='es'}, @{u='u-andrea';s='timeoff';l='es'})) {
  $q = "?user=$($c.u)&screen=$($c.s)&lang=$($c.l)"; if ($c.id) { $q += "&id=$($c.id)" }
  Run $q '1280,900'
}
# scripted flows
$vaScript = @'
HQ.go('calendar',{});
HQ.act['open-dayoff']({dataset:{}});
var inp=document.getElementById('dayoff-date'); inp.value='2026-10-28'; inp.dispatchEvent(new Event('input'));
window.__assert('calc warns under rule', /note warn/.test(document.getElementById('dayoff-calc').innerHTML));
document.querySelector('#sheet [name=reason]').value='Cita medica';
HQ.act['send-dayoff']();
var ud=HQD.unavailableDays[HQD.unavailableDays.length-1];
window.__assert('pending with 5 biz days', ud.status==='pending' && ud.businessDaysNotice===5);
window.__assert('lands on timeoff', HQ.S.screen==='timeoff');
HQ.act['open-dayoff']({dataset:{date:'2026-11-20'}});
window.__assert('calc good over rule', /note good/.test(document.getElementById('dayoff-calc').innerHTML));
document.querySelector('#sheet [name=reason]').value='Viaje';
HQ.act['send-dayoff']();
var ud2=HQD.unavailableDays[HQD.unavailableDays.length-1];
window.__assert('approved with 22 biz days', ud2.status==='approved' && ud2.businessDaysNotice===22);
window.__assert('timeoff event pushed', HQD.events.some(function(e){return e.kind==='timeoff' && e.date==='2026-11-20';}));
HQ.go('calendar',{id:'ev-0014'});
window.__assert('event sheet opens from link', !!document.getElementById('sheet'));
HQ.act.rsvp({dataset:{id:'ev-0014', v:'no'}});
window.__assert('rsvp saved', HQD.events.filter(function(e){return e.id==='ev-0014';})[0].rsvps['u-mariela']==='no');
HQ.act['cal-month']({dataset:{n:'1'}}); window.__assert('month moved', /noviembre/i.test(document.querySelector('.content h2').textContent));
HQ.act['cal-day']({dataset:{d:'2026-11-26'}}); window.__assert('day sheet', !!document.getElementById('sheet'));
'@
$staffScript = @'
HQ.go('timeoff',{});
window.__assert('pending request shown', /tod-approve/.test(document.body.innerHTML));
HQ.act['tod-approve']({dataset:{id:'ud-0003'}});
var u=HQD.unavailableDays.filter(function(x){return x.id==='ud-0003';})[0];
window.__assert('approved', u.status==='approved' && u.approvedBy==='u-daniela');
window.__assert('event pushed', HQD.events.some(function(e){return e.kind==='timeoff' && e.date==='2026-11-02';}));
HQ.act['open-add-event']({dataset:{}});
document.querySelector('#sheet [name=en]').value='Prueba de evento';
document.querySelector('#sheet [name=date]').value='2026-10-29';
document.querySelector('#sheet [name=time]').value='14:30';
HQ.act['add-event']();
var ev=HQD.events.filter(function(e){return e.title.en==='Prueba de evento';})[0];
window.__assert('event added', !!ev && ev.time==='14:30');
window.__assert('back on calendar', HQ.S.screen==='calendar');
window.__assert('event on grid', document.querySelector('.cal .ev[data-id="'+ev.id+'"]')!==null);
'@
Run ("?user=u-mariela&screen=calendar&lang=es&script=" + [uri]::EscapeDataString($vaScript)) '1280,900'
Run ("?user=u-daniela&screen=timeoff&lang=es&script=" + [uri]::EscapeDataString($staffScript)) '1280,900'
Run ("?user=u-daniela&screen=timeoff&lang=es&script=" + [uri]::EscapeDataString($staffScript)) ''
# screenshots
New-Item -ItemType Directory -Force (Join-Path $Root 'hq\shots') | Out-Null
& $edge --headless=new --disable-gpu --allow-file-access-from-files --virtual-time-budget=4000 --window-size=1280,900 --screenshot="$Root\hq\shots\calendar-desktop.png" ($dbg + '?user=u-daniela&screen=calendar&lang=es') 2>$null | Out-Null
& $edge --headless=new --disable-gpu --allow-file-access-from-files --virtual-time-budget=4000 --window-size=390,844 --screenshot="$Root\hq\shots\calendar-phone.png" ($ph + '?user=u-mariela&screen=calendar&lang=es') 2>$null | Out-Null
& $edge --headless=new --disable-gpu --allow-file-access-from-files --virtual-time-budget=4000 --window-size=390,844 --screenshot="$Root\hq\shots\calendar-timeoff-phone.png" ($ph + '?user=u-mariela&screen=timeoff&lang=es') 2>$null | Out-Null
"shots done"
