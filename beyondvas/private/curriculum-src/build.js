// Assembles modules/*.json + sim.json into beyondvas/private/curriculum.js and validates them.
const fs = require('fs'), path = require('path');
const DIR = __dirname;
const OUT = path.join(__dirname, '..', 'curriculum.js');
const ORDER = ['F1','F2','F3','F4','F5','F6','I1','I2','I3','I4','I5','I6','I7','I8','I9','I10','I11'];
const BLOCKS = new Set(['p','list','steps','callout','script','dodont','table','glossary']);
const errs = [], warn = [];
const modules = [];
let total = 0;
const ids = new Set();
for (const id of ORDER) {
  const f = path.join(DIR, 'modules', id + '.json');
  if (!fs.existsSync(f)) { errs.push('missing ' + id); continue; }
  let m;
  try { m = JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { errs.push(id + ' bad JSON: ' + e.message); continue; }
  if (m.id !== id) warn.push(id + ': id field is ' + m.id + ', fixed');
  m.id = id;
  m.part = id[0] === 'F' ? 'foundations' : 'isa';
  if (!m.title) errs.push(id + ' no title');
  if (!Array.isArray(m.lessons) || m.lessons.length < 3) errs.push(id + ' lessons: ' + (m.lessons || []).length);
  let words = 0, mins = 0;
  (m.lessons || []).forEach((l, k) => {
    if (!l.id) l.id = id + '-' + (k + 1);
    if (ids.has(l.id)) { errs.push('duplicate lesson id ' + l.id); }
    ids.add(l.id);
    (l.body || []).forEach(b => {
      if (!BLOCKS.has(b.t)) errs.push(l.id + ' unknown block ' + b.t);
      const txt = JSON.stringify(b);
      words += txt.split(/\s+/).length;
      if (/<[a-z]/i.test(txt)) warn.push(l.id + ' contains HTML-like text');
    });
    if (!l.minutes) l.minutes = Math.max(3, Math.round(words / 120));
    mins += l.minutes;
  });
  if (!m.practice || !m.practice.steps) errs.push(id + ' no practice'); else mins += m.practice.minutes || 0;
  (m.quiz || []).forEach((q, qi) => {
    if (!Array.isArray(q.options) || q.options.length !== 4) errs.push(id + ' q' + (qi + 1) + ' options ' + (q.options || []).length);
    if (!(q.answer >= 0 && q.answer < (q.options || []).length)) errs.push(id + ' q' + (qi + 1) + ' answer ' + q.answer);
    if (!q.explain) warn.push(id + ' q' + (qi + 1) + ' no explanation');
  });
  if ((m.quiz || []).length < 6) errs.push(id + ' quiz length ' + (m.quiz || []).length);
  const pos = (m.quiz || []).map(q => q.answer); const same = pos.length && pos.every(p => p === pos[0]);
  if (same) warn.push(id + ' all answers in the same position');
  const banned = /Beyond Estates|Charly|Zillow Preferred|beyondestatestc|g1boisjolie|drive\.google|\(323\)|\(661\) 220|\(951\)|split/i;
  const raw = JSON.stringify(m); const hit = raw.match(banned); if (hit) warn.push(id + ' mentions "' + hit[0] + '"');
  total += mins;
  modules.push(m);
  console.log(id.padEnd(4), String(m.lessons.length).padStart(2), 'lessons', String(mins).padStart(4), 'min', String((m.quiz || []).length).padStart(3), 'q ', m.title);
}
let sim = [];
const sf = path.join(DIR, 'sim.json');
if (fs.existsSync(sf)) {
  try { sim = JSON.parse(fs.readFileSync(sf, 'utf8')); } catch (e) { errs.push('sim.json bad JSON: ' + e.message); }
  sim.forEach(l => {
    ['id','name','ini','color','email','phone','source','stage','list','listLabel','created','alm','kind','says','seed','order','choices'].forEach(k => { if (!(k in l)) errs.push('sim ' + l.id + ' missing ' + k); });
    if (!['speed','hot','nurture'].includes(l.list)) errs.push('sim ' + l.id + ' list ' + l.list);
    const st = ['New Lead','Contacted','Warm Nurture','Hot','Pending Handoff','Archived / DNC'];
    if (!st.includes(l.stage)) errs.push('sim ' + l.id + ' stage ' + l.stage);
    (l.choices || []).forEach(c => { if (c.correct && (!c.effect || !c.note || !c.note.disp || !c.note.next)) errs.push('sim ' + l.id + ' correct choice incomplete'); if (c.correct && c.effect && c.effect.stage && !st.includes(c.effect.stage)) errs.push('sim ' + l.id + ' effect stage ' + c.effect.stage); if (!c.correct && !c.log) errs.push('sim ' + l.id + ' wrong choice has no log'); });
    if ((l.choices || []).length !== 2 || (l.choices || []).filter(c => c.correct).length !== 1) errs.push('sim ' + l.id + ' needs exactly 2 choices, 1 correct');
    if (JSON.stringify(l.order.slice().sort()) !== '[0,1]') errs.push('sim ' + l.id + ' order ' + JSON.stringify(l.order));
    if (['marcus','elena','david'].includes(l.id)) errs.push('sim id clashes: ' + l.id);
  });
} else errs.push('missing sim.json');
console.log('TOTAL', total, 'min =', (total / 60).toFixed(1), 'hours;', modules.length, 'modules;', sim.length, 'new calls');
if (warn.length) console.log('WARN\n  ' + warn.join('\n  '));
if (errs.length) { console.log('ERRORS\n  ' + errs.join('\n  ')); process.exitCode = 1; }
if (!errs.length || process.argv.includes('--force')) {
  const js = '/* BeyondVAs ISA Certification Program: curriculum content. Generated from the module files; edit the JSON and rebuild. */\nwindow.BV_CURRICULUM = ' + JSON.stringify({ modules, sim }) + ';\n';
  fs.writeFileSync(OUT, js, 'utf8');
  console.log('wrote', OUT, Math.round(js.length / 1024) + ' KB');
}
