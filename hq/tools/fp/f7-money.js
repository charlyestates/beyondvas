function as(u){HQ.S.userId=u;HQ.S.viewAs=null;HQ.S.hist=[];HQ.S.picker=false;HQ.S.lang='en';}
function txt(){return document.querySelector('.main').innerText;}
function A(n,ok){window.__assert(n,!!ok);}
as('u-charly'); HQ.go('money');
var c=document.querySelector('.main .content'); var w=c?c.clientWidth:-1;
A('money content width > 600: '+w+' (main '+document.querySelector('.main').clientWidth+', pane '+(document.querySelector('.pane')?document.querySelector('.pane').clientWidth:'none')+', sw '+document.documentElement.scrollWidth+')', w>600);
A('no horizontal overflow', document.documentElement.scrollWidth<=window.innerWidth);
var rb=document.querySelector('[data-act="retry-charge"][data-id="inv-1015"]');
A('Retry charge button for inv-1015 on money screen', rb);
var inv=HQD.invoices.filter(function(x){return x.id==='inv-1015';})[0], blk=HQD.blocks.filter(function(x){return x.id==='blk-c-lonestar-2026-10-26';})[0];
A('seed: inv failed, block failed', inv.status==='failed'&&blk.status==='failed');
HQ.act['retry-charge']({dataset:{id:'inv-1015'}});
A('inv-1015 paid on today: '+inv.status+' '+inv.paidOn, inv.status==='paid'&&inv.paidOn===HQ.D.today()&&!inv.failedOn&&!inv.retryOn);
A('block flipped to upcoming: '+blk.status+' paid='+blk.paid, blk.status==='upcoming');
A('block.paid flag also set (seed had paid:false): '+blk.paid, blk.paid===true);
A('retry button gone after render', !document.querySelector('[data-act="retry-charge"][data-id="inv-1015"]'));
A('money screen no longer lists BV-1015 as failed', !/BV-1015[^\n]*Failed/i.test(txt()));
/* client view of the same invoice */
as('u-jenna'); HQ.go('billing');
A('lonestar client billing shows block as upcoming/paid, no Pay now', !document.querySelector('.main [data-act="retry-charge"]'));
as('u-charly'); HQ.go('home');
A('owner home no longer shows the failed invoice row', txt().indexOf('BV-1015')<0||!/failed/i.test(txt()));
