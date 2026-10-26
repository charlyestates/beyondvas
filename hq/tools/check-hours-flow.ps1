# Scripted flows for app/hours.js (approve with Keep, manual edit with a reason, outage sheet) through debug.html?script=.
# Run from the repository root:  powershell -NoProfile -File hq\tools\check-hours-flow.ps1
$ErrorActionPreference = 'Continue'
$root = Split-Path -Parent (Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path))
Set-Location $root
powershell -NoProfile -File hq\build.ps1 | Out-Null
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$base = "file:///" + ((Resolve-Path hq\debug.html).Path -replace '\\','/')
$flows = @(
  @{ name = 'approve'; user = 'u-daniela'; lang = 'es'; js = @'
var id='wa-p-sun-1-2026-10-12'; HQ.go('week',{id:id});
var wa=HQD.weekApprovals.filter(function(w){return w.id===id;})[0];
window.__assert('button disabled with open flag', !!document.querySelector('[data-act="approve-week"][disabled]'));
HQ.act['flag-keep']({dataset:{id:id,i:'0'}});
window.__assert('flag kept', wa.flags[0].resolved===true);
window.__assert('button enabled after keep', !!document.querySelector('[data-act="approve-week"]') && !document.querySelector('[data-act="approve-week"][disabled]'));
HQ.act['approve-week']({dataset:{id:id}});
window.__assert('status approved', wa.status==='approved' && wa.approvedBy==='u-daniela' && !!wa.approvedAt && !!wa.lockedAt && wa.approvedHours>0);
window.__assert('audit row', HQD.auditLog.some(function(a){return a.action==='hours.approve' && a.by==='u-daniela' && a.target==='p-sun-1';}));
window.__assert('system pill in client channel', HQD.messages.some(function(m){return m.channelId==='ch-sunshine' && m.kind==='system' && /aprobada|approved/.test(m.text.es+m.text.en);}));
window.__assert('locked state rendered', /Bloqueada/.test(document.body.textContent) && !document.querySelector('[data-act="approve-week"]'));
window.__assert('pendingWeeks shrank', HQ.pendingWeeks().length===1);
'@ },
  @{ name = 'edit'; user = 'u-charly'; lang = 'en'; js = @'
HQ.go('week',{id:'wa-p-rod-2-2026-10-12'});
HQ.act['edit-entry']({dataset:{id:'te-0050'}});
window.__assert('sheet open', !!document.getElementById('sheet'));
document.querySelector('#sheet [name="minutes"]').value='240';
HQ.act['save-entry']({dataset:{id:'te-0050'}});
window.__assert('short reason blocked', !!document.getElementById('ed-err') && !document.getElementById('ed-err').hidden);
document.querySelector('#sheet [name="reason"]').value='Trimmed to the scheduled end; VA confirmed she stopped at 5 PM.';
HQ.act['save-entry']({dataset:{id:'te-0050'}});
var e=HQD.timeEntries.filter(function(x){return x.id==='te-0050';})[0];
window.__assert('entry trimmed', e.minutes===240 && e.flag==='manual-edit' && e.edit && e.edit.originalMinutes===257 && e.edit.by==='u-charly');
var wa=HQD.weekApprovals.filter(function(w){return w.id==='wa-p-rod-2-2026-10-12';})[0];
window.__assert('week flag added and tracked recomputed', wa.flags.some(function(f){return f.kind==='manual-edit' && f.entryId==='te-0050' && f.resolved;}) && wa.trackedHours===40.97);
window.__assert('audit edit row', HQD.auditLog.some(function(a){return a.action==='hours.edit';}));
window.__assert('sheet closed', !document.getElementById('sheet'));
'@ },
  @{ name = 'outage'; user = 'u-mariela'; lang = 'es'; js = @'
HQ.go('hours',{});
window.__assert('va hours has outage button', !!document.querySelector('[data-go="outages"]'));
HQ.go('outages',{add:'1'});
window.__assert('sheet opened from add param', !!document.getElementById('sheet'));
document.querySelector('#sheet [name="note"]').value='Se fue la luz en la colonia';
HQ.act['save-outage']();
var o=HQD.outages[HQD.outages.length-1];
window.__assert('outage saved', HQD.outages.length===4 && o.vaId==='u-mariela' && o.placementId==='p-rod-2' && o.ongoing===true && /-07:00$/.test(o.at));
window.__assert('system pill posted', HQD.messages.some(function(m){return m.channelId==='ch-rodriguez' && m.kind==='system' && /Corte|Outage/.test(m.text.en);}));
window.__assert('list shows it', /en curso|ongoing/.test(document.body.textContent));
'@ },
  @{ name = 'client-week-no-leak'; user = 'u-ana'; lang = 'en'; js = @'
HQ.go('week',{id:'wa-p-rod-2-2026-10-12'});
var txt=document.body.textContent;
window.__assert('no surname', txt.indexOf('Castellanos')<0);
window.__assert('no pay rate', txt.indexOf('6.50')<0 && txt.indexOf('Pay rate')<0);
window.__assert('no activity pct', !/\d+% activity/.test(txt));
window.__assert('no approve button', !document.querySelector('[data-act="approve-week"]') && !document.querySelector('[data-act="edit-entry"]'));
HQ.go('placement',{});
var t2=document.body.textContent;
window.__assert('placement no surname/pay', t2.indexOf('Castellanos')<0 && t2.indexOf('Pay rate')<0 && t2.indexOf('Margin')<0);
HQ.go('placements',{});
window.__assert('placements denied', !!document.querySelector('.empty'));
'@ },
  @{ name = 'manager-no-bill'; user = 'u-daniela'; lang = 'en'; js = @'
HQ.go('placement',{id:'p-rod-2'});
var txt=document.body.textContent;
window.__assert('manager sees pay not bill', txt.indexOf('Pay rate')>=0 && txt.indexOf('Bill rate')<0 && txt.indexOf('Margin')<0);
window.__assert('view as client button', !!document.querySelector('[data-act="view-as"][data-id="u-ana"]'));
HQ.go('placement',{id:'p-lone-1'});
window.__assert('two login pickers for Lone Star', document.querySelectorAll('[data-act="view-as"]').length===2);
HQ.go('placements',{});
window.__assert('placements list no bill rate for manager', document.body.textContent.indexOf('Bill rate')<0);
'@ },
  @{ name = 'owner-bill'; user = 'u-charly'; lang = 'en'; js = @'
HQ.go('placement',{id:'p-rod-2'});
var txt=document.body.textContent;
window.__assert('owner sees bill, pay, margin', txt.indexOf('Bill rate')>=0 && txt.indexOf('Pay rate')>=0 && txt.indexOf('Margin per hour')>=0 && txt.indexOf('$5.50/hr')>=0);
HQ.go('placement',{id:'p-rod-1'});
window.__assert('ended placement with chain', document.body.textContent.indexOf('Replacement chain')>=0 && document.querySelectorAll('[data-go="placement"][data-id="p-rod-2"]').length>=1);
HQ.go('hours',{});
window.__assert('approve all clean toasts none', (HQ.act['approve-all-clean'](), !!document.getElementById('toast')));
'@ }
)
foreach ($f in $flows) {
  $enc = [uri]::EscapeDataString($f.js)
  $url = "${base}?user=$($f.user)&lang=$($f.lang)&script=$enc"
  & $edge --headless=new --disable-gpu --allow-file-access-from-files --virtual-time-budget=5000 --dump-dom $url | Out-File -Encoding utf8 hq\dom-hours-flow.txt
  $dom = [IO.File]::ReadAllText((Resolve-Path hq\dom-hours-flow.txt).Path)
  $err = [regex]::Match($dom, '<pre id="errlog"[^>]*>([\s\S]*?)</pre>').Groups[1].Value.Trim()
  $as = [regex]::Match($dom, '<pre id="asserts"[^>]*>([\s\S]*?)</pre>').Groups[1].Value.Trim()
  "== $($f.name) ($($f.user), $($f.lang)) js=$($f.js.Length) chars, url=$($url.Length)"; $as; if ($err) { "ERRLOG: $err" } else { "errlog: empty" }
}
