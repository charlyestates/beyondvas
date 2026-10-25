function as(u){HQ.S.userId=u;HQ.S.viewAs=null;HQ.S.hist=[];HQ.S.picker=false;HQ.S.lang='en';}
function txt(){return document.querySelector('.main').innerText;}
function A(n,ok){window.__assert(n,!!ok);}
as('u-mariela'); HQ.go('channel',{id:'ch-rodriguez'});
var box=document.getElementById('msgs'); A('msgs box present', box);
A('initial scroll: top='+box.scrollTop+' h='+box.scrollHeight+' c='+box.clientHeight+' unread='+!!document.getElementById('unread'), true);
var ta=document.getElementById('composeText'); A('compose textarea present', ta);
ta.value='Hi Rod, sending the updated lead list tonight';
var m0=HQD.messages.length;
HQ.act['send-msg']({dataset:{id:'ch-rodriguez'}});
var m=HQD.messages[m0];
A('message exists in ch-rodriguez by mariela', HQD.messages.length===m0+1&&m.channelId==='ch-rodriguez'&&m.authorId==='u-mariela'&&m.text==='Hi Rod, sending the updated lead list tonight');
A('message rendered', document.getElementById('m-'+m.id));
var b2=document.getElementById('msgs'); var bottom=b2.scrollHeight-b2.clientHeight;
A('scroll at bottom after send: top='+b2.scrollTop+' bottom='+bottom, Math.abs(b2.scrollTop-bottom)<=2);
A('compose cleared after send: "'+document.getElementById('composeText').value+'"', document.getElementById('composeText').value==='');
A('last rendered message is the new one', b2.querySelector('.msg:last-of-type')&&b2.querySelector('.msg:last-of-type').id==='m-'+m.id);
/* react toggles */
var target=HQ.D.messagesIn('ch-rodriguez').filter(function(x){return x.kind==='text'&&x.authorId!=='u-mariela';}).slice(-1)[0];
function has(){return !!(target.reactions||[]).filter(function(r){return r.emoji==='👍';})[0]&&(target.reactions.filter(function(r){return r.emoji==='👍';})[0].by.indexOf('u-mariela')>=0);}
var before=has();
b2.scrollTop=Math.max(0,bottom-120); var st=b2.scrollTop;
HQ.act['react']({dataset:{id:target.id,emoji:'👍'}});
A('reaction toggled on ('+before+' -> '+has()+')', has()!==before);
var btn=document.querySelector('#m-'+target.id+' .react button[data-emoji="👍"]');
A('reaction button rendered with class mine when mine', btn&&(has()?btn.classList.contains('mine'):!btn.classList.contains('mine')));
var b3=document.getElementById('msgs'); A('scroll preserved after react: '+st+' -> '+b3.scrollTop, Math.abs(b3.scrollTop-st)<=2);
HQ.act['react']({dataset:{id:target.id,emoji:'👍'}});
A('reaction toggled back', has()===before);
/* own message: no thumb offered on own message */
A('no 👍 offer on own message', !document.querySelector('#m-'+m.id+' .react button'));
/* client channel from Ana: send + Looks good on report */
as('u-ana'); HQ.go('channel',{id:'ch-rodriguez'});
var rep=HQ.D.messagesIn('ch-rodriguez').filter(function(x){return x.kind==='report';}).slice(-1)[0];
A('client sees Looks good on report', rep&&document.querySelector('#m-'+rep.id+' .react button[data-emoji="👍"]')&&/Looks good/.test(document.querySelector('#m-'+rep.id+' .react').textContent));
A('client channel compose shows Escalate', document.querySelector('.compose [data-act="open-escalate"][data-id="p-rod-2"]'));
