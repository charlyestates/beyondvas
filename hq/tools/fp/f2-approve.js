function as(u){HQ.S.userId=u;HQ.S.viewAs=null;HQ.S.hist=[];HQ.S.picker=false;HQ.S.lang='en';}
function txt(){return document.querySelector('.main').innerText;}
function A(n,ok){window.__assert(n,!!ok);}
as('u-daniela'); HQ.go('week',{id:'wa-p-sun-1-2026-10-12'});
var wa=HQD.weekApprovals.filter(function(w){return w.id==='wa-p-sun-1-2026-10-12';})[0];
A('week screen rendered for wa-p-sun-1-2026-10-12', HQ.S.screen==='week'&&wa);
var kb=document.querySelector('.main [data-act="flag-keep"]'); A('flag-keep button rendered', kb);
var ab=document.querySelector('.main [data-act="approve-week"]'); A('approve button rendered and disabled while flag open: '+(ab?ab.outerHTML.slice(0,120):''), ab&&ab.hasAttribute('disabled'));
var m0=HQD.messages.length, n0=HQD.notifications.length, a0=HQD.auditLog.length, t0=HQD.trueUps.length;
HQ.act['flag-keep']({dataset:{id:wa.id,i:'0'}});
A('flag resolved by daniela', wa.flags[0].resolved===true&&wa.flags[0].resolvedBy==='u-daniela');
A('audit hours.flag row', HQD.auditLog.slice(a0).some(function(a){return a.action==='hours.flag';}));
ab=document.querySelector('.main [data-act="approve-week"]'); A('approve button enabled after flag kept', ab&&!ab.hasAttribute('disabled'));
HQ.act['approve-week']({dataset:{id:wa.id}});
A('status approved, approvedBy daniela, lockedAt set: '+wa.status+' '+wa.approvedBy+' '+wa.approvedHours, wa.status==='approved'&&wa.approvedBy==='u-daniela'&&wa.lockedAt);
A('approvedHours equals seed trackedHours 37.75: '+wa.approvedHours, wa.approvedHours===37.75);
var tu=HQD.trueUps.filter(function(x){return x.placementId==='p-sun-1'&&x.weekStart==='2026-10-12';});
A('trueUps entry for p-sun-1 / 2026-10-12: '+JSON.stringify(tu[0]||null), tu.length===1);
A('trueUp delta -2.25 h, amount 22.5 at $10 bill rate', tu[0]&&tu[0].deltaHours===-2.25&&tu[0].amount===22.5&&tu[0].clientId==='c-sunshine');
var nn=HQD.notifications.slice(n0);
A('notification for u-andrea: '+JSON.stringify(nn.map(function(n){return n.userId;})), nn.some(function(n){return n.userId==='u-andrea'&&n.link&&n.link.id===wa.id;}));
A('auditLog row hours.approved target p-sun-1', HQD.auditLog.slice(a0).some(function(a){return a.action==='hours.approved'&&a.target==='p-sun-1'&&a.by==='u-daniela';}));
var sm=HQD.messages.slice(m0).filter(function(m){return m.kind==='system'&&m.channelId==='ch-sunshine';});
A('system message in ch-sunshine: '+JSON.stringify(sm[0]?sm[0].text:null), sm.length===1);
A('system message visible to client priya via messagesIn', (as('u-priya'), HQ.D.messagesIn('ch-sunshine').some(function(m){return sm[0]&&m.id===sm[0].id;})));
as('u-daniela'); HQ.go('week',{id:wa.id});
A('week screen now locked: no approve button, no flag-keep', !document.querySelector('.main [data-act="approve-week"]')&&!document.querySelector('.main [data-act="flag-keep"]'));
A('week screen shows Approved/locked text', /approved|locked/i.test(txt()));
A('pendingWeeks no longer lists it', !HQ.pendingWeeks().some(function(w){return w.id===wa.id;}));
/* second approve is a no-op */
var t1=HQD.trueUps.length, m1=HQD.messages.length; HQ.act['approve-week']({dataset:{id:wa.id}});
A('re-approve adds nothing', HQD.trueUps.length===t1&&HQD.messages.length===m1);
/* andrea sees the notification */
as('u-andrea'); HQ.go('home');
A('andrea home shows last week approved by Daniela', txt().indexOf('Daniela')>=0&&/approved/i.test(txt()));
A('andrea notifications list has the approval', HQ.D.notificationsFor(HQ.me()).some(function(n){return n.link&&n.link.id===wa.id;}));
