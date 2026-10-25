function as(u){HQ.S.userId=u;HQ.S.viewAs=null;HQ.S.hist=[];HQ.S.picker=false;HQ.S.lang='en';}
function txt(){return document.querySelector('.main').innerText;}
function A(n,ok){window.__assert(n,!!ok);}
as('u-andrea'); HQ.go('timeoff');
A('timeoff rendered with open-dayoff button', document.querySelector('.main [data-act="open-dayoff"]'));
HQ.act['open-dayoff']({dataset:{}});
var d=document.getElementById('dayoff-date'); A('dayoff sheet with date input', d);
if(d){d.value='2026-11-03'; d.dispatchEvent(new Event('input'));}
var calc=document.getElementById('dayoff-calc'); A('calc box shows 9 business days + under-rule warning: '+(calc?calc.textContent.replace(/\s+/g,' ').slice(0,200):''), calc&&/9\b/.test(calc.textContent)&&calc.querySelector('.note.warn'));
var rs=document.querySelector('#sheet [name="reason"]'); if(rs) rs.value='Medical appointment';
var n0=HQD.notifications.length, u0=HQD.unavailableDays.length, e0=HQD.events.length;
HQ.act['send-dayoff']();
var ud=HQD.unavailableDays[HQD.unavailableDays.length-1];
A('unavailableDay added', HQD.unavailableDays.length===u0+1&&ud.vaId==='u-andrea'&&ud.date==='2026-11-03');
A('pending with businessDaysNotice 9: '+ud.status+' '+ud.businessDaysNotice, ud.status==='pending'&&ud.businessDaysNotice===9);
A('no calendar event while pending', HQD.events.length===e0);
var nn=HQD.notifications.slice(n0);
A('notification for u-daniela (approval-due): '+JSON.stringify(nn.map(function(n){return n.userId+':'+n.kind;})), nn.some(function(n){return n.userId==='u-daniela'&&n.kind==='approval-due';}));
A('notification for u-andrea', nn.some(function(n){return n.userId==='u-andrea';}));
A('sheet closed and went to timeoff with id', !document.getElementById('sheet')&&HQ.S.screen==='timeoff'&&HQ.S.params.id===ud.id);
A('timeoff screen lists Nov 3 as pending', /Nov(ember)? 3\b/.test(txt())&&/pending/i.test(txt()));
/* manager sees it and can approve */
as('u-daniela'); HQ.go('timeoff');
A('daniela timeoff shows Andrea request with approve button', txt().indexOf('Andrea')>=0&&document.querySelector('.main [data-act="tod-approve"][data-id="'+ud.id+'"]'));
HQ.act['tod-approve']({dataset:{id:ud.id}});
A('approved by daniela, event pushed to ch-sunshine', ud.status==='approved'&&ud.approvedBy==='u-daniela'&&HQD.events.some(function(e){return e.kind==='timeoff'&&e.date==='2026-11-03'&&e.audience&&e.audience.channelId==='ch-sunshine';}));
/* validation: past date and empty reason */
as('u-andrea'); HQ.go('timeoff'); HQ.act['open-dayoff']({dataset:{}});
document.getElementById('dayoff-date').value='2026-10-20'; document.querySelector('#sheet [name="reason"]').value='x';
var u1=HQD.unavailableDays.length; HQ.act['send-dayoff']();
A('past date rejected', HQD.unavailableDays.length===u1&&!document.getElementById('dayoff-err').hidden);
