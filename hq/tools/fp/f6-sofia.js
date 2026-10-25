function as(u){HQ.S.userId=u;HQ.S.viewAs=null;HQ.S.hist=[];HQ.S.picker=false;HQ.S.lang='en';}
function txt(){return document.querySelector('.main').innerText;}
function A(n,ok){window.__assert(n,!!ok);}
as('a-sofia'); HQ.go('home');
var T=txt();
A('home shows interview on Oct 22: '+(T.match(/[^\n]*Oct[^\n]*22[^\n]*/)||[''])[0].slice(0,120), /Oct(ober)?\s*22\b/.test(T));
A('home shows Video interview with Daniela', T.indexOf('Video interview with Daniela')>=0);
var cb=Array.prototype.filter.call(document.querySelectorAll('.main button'),function(b){return b.textContent.trim()==='Confirm';});
A('Confirm button present ('+cb.length+')', cb.length>=1);
A('interview time shown in HN time with other zone', /10:00/.test(T));
HQ.go('tests');
var cards=document.querySelectorAll('.main .stack > .card');
A('tests screen shows three tests ('+cards.length+')', cards.length===3);
A('tests: typing, written, mock call titles', T=txt(), /Typing/i.test(T)&&/Written/i.test(T)&&/Mock/i.test(T));
A('mock call shows scheduled chip with Oct 22', /Scheduled/i.test(T)&&/Oct(ober)?\s*22/.test(T));
A('two Start test buttons + one Pick a slot', document.querySelectorAll('.main [data-act="test-start"]').length===2&&document.querySelectorAll('.main [data-act="test-slot"]').length===1);
/* spanish */
HQ.S.lang='es'; HQ.go('home'); T=txt();
A('es home shows 22 de octubre', /22 de oct/i.test(T));
A('es Confirmar button', Array.prototype.some.call(document.querySelectorAll('.main button'),function(b){return b.textContent.trim()==='Confirmar';}));
/* tabs for applicant */
var tabs=Array.prototype.map.call(document.querySelectorAll('.tabs .tab'),function(b){return b.getAttribute('data-go');}).join(',');
A('applicant tabs home,tests,academy,profile: '+tabs, tabs==='home,tests,academy,profile');
