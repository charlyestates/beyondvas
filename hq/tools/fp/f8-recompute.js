function as(u){HQ.S.userId=u;HQ.S.viewAs=null;HQ.S.hist=[];HQ.S.picker=false;HQ.S.lang='en';}
function txt(){return document.querySelector('.main').innerText;}
function A(n,ok){window.__assert(n,!!ok);}
/* day bar for today equals HQ.status(pl).minutesToday, each placed VA */
['u-mariela','u-jose','u-andrea'].forEach(function(u){
  as(u); HQ.go('home'); var pl=HQ.D.placementForVa(u); var st=HQ.status(pl);
  var spans=Array.prototype.filter.call(document.querySelectorAll('.main span.small.num'),function(s){return /width:\s*56px/.test(s.getAttribute('style')||'');});
  var dow=new Date(HQ.D.today()+'T12:00:00Z').getUTCDay(); var j=dow-1;
  var shown=spans[j]?spans[j].textContent:'(none)';
  var rows=Array.prototype.filter.call(document.querySelectorAll('.main .progress'),function(p){return p.classList.contains('gold')&&p.parentNode.classList.contains('grow');});
  var width=rows[0]?rows[0].firstChild.style.width:'(none)';
  var perDay=pl.hoursPerWeek/5*60; var expW=(st.minutesToday/perDay*100)+'%';
  A(u+' day bar today '+shown+' == status '+HQ.fmt.hrs(st.minutesToday)+' ('+st.key+', '+st.minutesToday+' min)', shown===HQ.fmt.hrs(st.minutesToday));
  A(u+' day bar width '+width+' ~ expected '+expW, Math.abs(parseFloat(width)-parseFloat(expW))<0.5);
  A(u+' status pill minToday agrees: '+(document.querySelector('.main .status .detail')||document.querySelector('.main .pill')||{textContent:''}).textContent.replace(/\s+/g,' ').slice(0,80), true);
  var raw=HQD.timeEntries.filter(function(e){return e.placementId===pl.id&&e.date===HQ.D.today();});
  A(u+' entries today: '+JSON.stringify(raw.map(function(e){return [e.start,e.end,e.minutes,e.tz];})), true);
});
/* pending block hours for u-ana: home, hours, billing */
function num(s){var m=s.match(/(\d+)h\s*(\d+)m/); if(m) return +m[1]*60+ +m[2]; m=s.match(/(\d+(?:\.\d+)?)\s*h/); if(m) return Math.round(+m[1]*60); return NaN;}
as('u-ana'); HQ.go('home');
var chip=Array.prototype.filter.call(document.querySelectorAll('.main .chip'),function(c){return c.textContent.indexOf(HQ.t('pendingHours'))>=0;})[0];
var homeP=chip?chip.textContent.trim():'(none)';
var chipA=Array.prototype.filter.call(document.querySelectorAll('.main .chip'),function(c){return c.textContent.indexOf(HQ.t('approvedHours'))>=0;})[0];
var homeA=chipA?chipA.textContent.trim():'(none)';
HQ.go('hours'); var T=txt(); var mh=T.match(/([\d.]+ h) (?:pending)/i); var hoursP=mh?mh[1]:'(none)';
var ma=T.match(/([\d.]+ h) (?:approved)/i); var hoursA=ma?ma[1]:'(none)';
HQ.go('billing'); T=txt(); var mb=T.match(/([\d.]+ h) (?:pending)/i); var billP=mb?mb[1]:'(none)';
var mba=T.match(/([\d.]+ h) (?:approved)/i); var billA=mba?mba[1]:'(none)';
A('u-ana pending: home "'+homeP+'" hours "'+hoursP+'" billing "'+billP+'"', num(homeP)===num(hoursP)&&num(hoursP)===num(billP));
A('u-ana approved: home "'+homeA+'" hours "'+hoursA+'" billing "'+billA+'"', num(homeA)===num(hoursA)&&num(hoursA)===num(billA));
/* raw recompute */
var pl=HQ.D.placementForClient('c-rodriguez')[0]; var blk=HQD.block;
var ent=HQD.timeEntries.filter(function(e){return e.placementId===pl.id&&e.date>=blk.start&&e.date<=blk.end;});
var sumMin=ent.reduce(function(n,e){return n+(e.minutes||0);},0); var open=ent.filter(function(e){return !e.end;});
var was=HQD.weekApprovals.filter(function(w){return w.placementId===pl.id&&w.weekStart>=blk.start&&w.weekStart<=blk.end;});
A('raw: block '+blk.start+'..'+blk.end+' entries minutes(seed)='+sumMin+' open='+JSON.stringify(open.map(function(e){return [e.date,e.start,e.minutes];}))+' weeks='+JSON.stringify(was.map(function(w){return [w.weekStart,w.status,w.trackedHours,w.approvedHours];})), true);
var wkEnt=HQD.timeEntries.filter(function(e){return e.placementId===pl.id&&e.date>='2026-10-19'&&e.date<=HQ.D.today();});
A('raw: this week entries '+JSON.stringify(wkEnt.map(function(e){return [e.date,e.start,e.end,e.minutes];})), true);
/* same three for u-priya (sunshine) and u-mike */
['u-priya','u-mike','u-jenna'].forEach(function(u){
  as(u); HQ.go('home'); var ch=Array.prototype.filter.call(document.querySelectorAll('.main .chip'),function(c){return c.textContent.indexOf(HQ.t('pendingHours'))>=0;})[0]; var hp=ch?ch.textContent.trim():'(none)';
  HQ.go('hours'); var m1=txt().match(/([\d.]+ h) pending/i); var hh=m1?m1[1]:'(none)';
  HQ.go('billing'); var m2=txt().match(/([\d.]+ h) pending/i); var bb=m2?m2[1]:'(none)';
  A(u+' pending: home "'+hp+'" hours "'+hh+'" billing "'+bb+'"', num(hp)===num(hh)&&num(hh)===num(bb));
});
