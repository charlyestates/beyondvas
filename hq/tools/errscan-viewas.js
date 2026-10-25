var E=window.__errs;console.error=function(){E.push('console: '+[].slice.call(arguments).map(function(a){return a&&a.stack?a.stack.split('\n').slice(0,2).join(' | '):String(a)}).join(' '))};
var A=window.__assert;var D=window.HQD;
function snap(){return JSON.stringify({m:D.messages.length,r:D.messages.map(function(x){return x.reactions?JSON.stringify(x.reactions):''}).join('|'),t:D.tickets.length,n:D.notifications.length,a:(D.audit||D.auditLog||[]).length,lr:JSON.stringify(D.lastRead||{})});}
var s0=snap();
HQ.act['view-as']({dataset:{id:'u-ana'}});
A('me is u-ana',HQ.me().id==='u-ana');A('realMe is daniela',HQ.realMe().id==='u-daniela');
var real=/\$(960|963|979|460|12\.00|12)\b|\$12\/h|\$8\/h|\$10\/h|\$6\.50|\$6\.00\/h|Pay rate|Tarifa del VA|margin|margen|Castellanos|Andino|Molina/i;
[['home'],['billing'],['hours'],['channel','ch-rodriguez'],['placement','p-rod-2'],['help'],['invoice','inv-1014'],['notifications'],['report'],['compliance'],['settings'],['more'],['channels']].forEach(function(sc){var n0=E.length;HQ.go(sc[0],sc[1]?{id:sc[1]}:{},true);var app=document.getElementById('app');var txt=app.innerText;var k=sc.join('/');A(k+' no errors '+E.slice(n0).join(';'),E.length===n0);var m=txt.match(real);A(k+' no real money/surname'+(m?' -> '+txt.substr(Math.max(0,m.index-60),140).replace(/\s+/g,' '):''),!m);A(k+' no composeText',!document.getElementById('composeText'));A(k+' viewing-as bar',/Viewing as|Viendo como/.test(txt));});
HQ.go('channel',{id:'ch-rodriguez'},true);
var s1=snap();
HQ.act['send-msg']({dataset:{id:'ch-rodriguez'}});A('send-msg no mutation',snap()===s1);
var msg=D.messages.filter(function(x){return x.channelId==='ch-rodriguez'})[0];
HQ.act['react']({dataset:{id:msg.id,emoji:'👍'}});var s2=snap();A('react no mutation (direct call)',s2===s1);
/* simulated click through the delegated handler */
var b=document.createElement('button');b.setAttribute('data-act','react');b.setAttribute('data-id',msg.id);b.setAttribute('data-emoji','🔥');document.body.appendChild(b);b.click();A('react no mutation (click)',snap()===s2);b.remove();
HQ.act['open-escalate']({dataset:{id:'p-rod-2'}});A('open-escalate opened sheet? '+(!!document.getElementById('sheet')),true);var s3=snap();
if(document.getElementById('sheet')){var ta=document.querySelector('#sheet textarea[name=text]');if(ta)ta.value='test';HQ.act['send-escalation']({dataset:{id:'p-rod-2'}});A('send-escalation (direct) no mutation',snap()===s3);}
HQ.closeSheet();
var b2=document.createElement('button');b2.setAttribute('data-act','open-escalate');b2.setAttribute('data-id','p-rod-2');document.body.appendChild(b2);b2.click();A('open-escalate via click blocked (no sheet)',!document.getElementById('sheet'));b2.remove();HQ.closeSheet();
HQ.act['exit-view']();A('exit-view restores',HQ.me().id==='u-daniela');
/* owner view-as: amounts allowed but still read-only */
HQ.S.userId='u-charly';HQ.S.viewAs=null;HQ.act['view-as']({dataset:{id:'u-mike'}});HQ.go('billing',{},true);var t2=document.getElementById('app').innerText;A('owner view-as mike billing has amounts',/\$474|\$480/.test(t2));A('owner view-as mike no other client',!/Rodriguez|Sunshine/.test(t2));A('owner view-as mike no VA surname',!/Andino|Castellanos|Molina/.test(t2));
HQ.go('channel',{id:'ch-lonestar'},true);A('owner view-as no composeText',!document.getElementById('composeText'));
window.__asserts.push('ERRS:'+E.join(' ;; '));
