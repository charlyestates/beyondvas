function as(u){HQ.S.userId=u;HQ.S.viewAs=null;HQ.S.hist=[];HQ.S.picker=false;HQ.S.lang='en';}
function txt(){return document.querySelector('.main').innerText;}
function A(n,ok){window.__assert(n,!!ok);}
as('u-ana'); HQ.go('home');
var k0=HQD.tickets.length, n0=HQD.notifications.length, m0=HQD.messages.length;
HQ.act['open-escalate']({dataset:{id:'p-rod-2'}});
var ta=document.querySelector('#sheet textarea[name="text"]'); A('sheet textarea present', ta);
if(ta) ta.value='Mariela missed two follow-ups this week';
HQ.act['send-escalation']({dataset:{id:'p-rod-2'}});
var k=HQD.tickets[HQD.tickets.length-1];
A('ticket created: '+(k&&k.id), HQD.tickets.length===k0+1&&k.openedBy==='u-ana'&&k.placementId==='p-rod-2');
var o=new Date(k.openedAt), a=new Date(k.ackDueAt);
var dow=o.getUTCDay(); var expDays=dow===5?3:dow===6?2:1;
A('ackDueAt one business day after openedAt, same minute: '+k.openedAt+' -> '+k.ackDueAt, (a.getTime()-o.getTime())===expDays*86400000);
A('ackDueAt UTC h:m equals openedAt h:m', a.getUTCHours()===o.getUTCHours()&&a.getUTCMinutes()===o.getUTCMinutes());
A('ackDueAt date 2026-10-22', HQ.isoDate(k.ackDueAt)==='2026-10-22');
var nn=HQD.notifications.slice(n0).map(function(n){return n.userId;}).sort().join();
A('notifications for u-daniela and u-charly: '+nn, nn==='u-charly,u-daniela');
A('went to ticket screen', HQ.S.screen==='ticket'&&HQ.S.params.id===k.id);
var sys=HQD.messages.slice(m0).filter(function(m){return m.kind==='system';})[0];
A('internal system message pushed (audience internal, ch-rodriguez)', sys&&sys.audience==='internal'&&sys.channelId==='ch-rodriguez');
var forAna=HQ.D.messagesIn('ch-rodriguez');
A('internal msg NOT in messagesIn for Ana', !forAna.some(function(m){return m.id===sys.id;}));
HQ.go('channel',{id:'ch-rodriguez'});
A('Ana channel DOM has no internal pill', !document.getElementById('m-'+sys.id)&&txt().indexOf(k.id)<0);
HQ.setUser('u-daniela');
var forDan=HQ.D.messagesIn('ch-rodriguez');
A('internal msg IS in messagesIn for daniela', forDan.some(function(m){return m.id===sys.id;}));
HQ.go('channel',{id:'ch-rodriguez'});
A('daniela channel DOM shows the internal pill with ticket id', document.getElementById('m-'+sys.id)&&txt().indexOf(k.id)>=0);
/* view-as client must also hide it */
HQ.setUser('u-charly'); HQ.S.viewAs='u-ana'; HQ.render();
A('owner viewing as Ana does not see internal msg', !HQ.D.messagesIn('ch-rodriguez').some(function(m){return m.id===sys.id;}));
HQ.S.viewAs=null;
/* Ana home shows the open ticket */
as('u-ana'); HQ.go('home');
A('Ana home shows open ticket card with id', txt().indexOf(k.id)>=0);
A('Ana home ticket card shows no VA surname', txt().indexOf('Castellanos')<0);
