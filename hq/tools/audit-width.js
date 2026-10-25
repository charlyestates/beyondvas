window.__assert('innerWidth=' + window.innerWidth + ' isPhone=' + HQ.isPhone() + ' tabs=' + !!document.querySelector('.tabs') + ' side=' + !!document.querySelector('.side'), true);
HQ.go('home', {}, true);
window.__assert('home scrollWidth=' + document.documentElement.scrollWidth + ' content=' + document.querySelector('.main .content').innerText.replace(/\s+/g, ' ').slice(0, 300), true);
