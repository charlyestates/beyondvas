function as(u){HQ.S.userId=u;HQ.S.viewAs=null;HQ.S.hist=[];HQ.S.picker=false;HQ.S.lang='en';}
function txt(){return document.querySelector('.main').innerText;}
function A(n,ok){window.__assert(n,!!ok);}
as('u-mariela'); HQ.go('report');
var ta=document.getElementById('rep-done'); A('rep-done textarea present', ta);
if(ta) ta.value='162 dials circle prospecting around Van Buren Blvd\nFollowed up 14 leads in Follow Up Boss';
function setv(n,v){var el=document.querySelector('.main [name="'+n+'"]'); A('input '+n+' present', el); if(el) el.value=v;}
setv('dials',162); setv('conversations',18); setv('apptsSet',3); setv('apptsHeld',1);
var m0=HQD.messages.length;
HQ.act['send-report']({dataset:{id:'p-rod-2'}});
var today=HQ.D.today();
var reps=HQ.D.messagesIn('ch-rodriguez').filter(function(m){return m.kind==='report'&&HQ.isoDate(m.at)===today;});
A('report message for today exists in ch-rodriguez (count '+reps.length+', msgs +'+(HQD.messages.length-m0)+')', reps.length>=1);
var r=reps[reps.length-1];
A('report carries 2 done lines and ISA kpi 162/18/3/1: '+JSON.stringify(r&&r.report), r&&r.report.done.length===2&&r.report.kpi&&r.report.kpi.dials===162&&r.report.kpi.apptsHeld===1);
A('after send went to channel ch-rodriguez: '+HQ.S.screen+'/'+(HQ.S.params||{}).id, HQ.S.screen==='channel'&&HQ.S.params.id==='ch-rodriguez');
A('report card rendered in channel', document.querySelector('#msgs .msg.is-report .report'));
HQ.go('home');
var card=Array.prototype.filter.call(document.querySelectorAll('.main .card'),function(c){return c.querySelector('h3')&&c.querySelector('h3').textContent===HQ.t('reportToday');})[0];
A('home report card found', card);
A('home report card has class good + Sent chip', card&&card.classList.contains('good')&&/\bSent\b/.test(card.textContent));
A('home shows sentAt line: '+(card?card.textContent.slice(0,160).replace(/\s+/g,' '):''), card&&card.textContent.indexOf(HQ.t('sentAt',{t:HQ.fmt.time(r.at,HQ.me().tz)}))>=0);
A('home report card offers Add update, not Send today report', card&&card.querySelector('[data-go="report"][data-again="1"]')&&!card.querySelector('.btn-gold.btn-block'));
var tp=document.querySelector('.tab.primary'); A('.tab.primary exists (w='+window.innerWidth+')', tp);
A('.tab.primary icon is the check', tp&&tp.querySelector('.ico')&&tp.querySelector('.ico').innerHTML===HQ.I.check);
var rail=document.querySelector('.rail'); A('rail exists on desktop', rail);
A('rail report item shows check too (if rail has a report entry): '+(rail?(rail.querySelector('[data-go="report"]')?(rail.querySelector('[data-go="report"]').innerHTML.indexOf(HQ.I.check)>=0?'check':'no-check'):'no-entry'):'no-rail'), !rail||!rail.querySelector('[data-go="report"]')||rail.querySelector('[data-go="report"]').innerHTML.indexOf(HQ.I.check)>=0);
HQ.go('report');
A('report screen now shows done state (card good + Open channel link)', document.querySelector('.main .card.good')&&document.querySelector('.main [data-go="channel"][data-id="ch-rodriguez"]'));
/* edit: again=1 shows the blank form again */
HQ.go('report',{again:'1'}); A('report again shows the form', document.getElementById('rep-done'));
/* kpi order validation */
document.getElementById('rep-done').value='x'; setv('dials',5); setv('conversations',9);
var m1=HQD.messages.length; HQ.act['send-report']({dataset:{id:'p-rod-2'}});
A('kpi order error blocks a second send', HQD.messages.length===m1&&!document.getElementById('rep-err').hidden);
