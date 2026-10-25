var out = [];
Object.keys(HQD).forEach(function (k) {
  var v = HQD[k];
  if (Array.isArray(v)) out.push(k + ' [' + v.length + ']: ' + v.slice(0, 8).map(function (o) { return o && o.id ? o.id : (typeof o === 'object' ? Object.keys(o).slice(0, 4).join('/') : String(o)); }).join(', '));
  else if (v && typeof v === 'object') out.push(k + ' {}: ' + Object.keys(v).slice(0, 12).join(', '));
  else out.push(k + ' = ' + String(v));
});
out.push('V: ' + Object.keys(HQ.V).join(','));
out.push('act: ' + Object.keys(HQ.act).join(','));
out.forEach(function (l) { window.__assert(l, true); });
