const fs = require('fs');
const p = 'models/Donor.js';
let t = fs.readFileSync(p, 'utf8');
const needle = '    status: {\n      type: String,\n      enum: ["active", "completed", "removed"],\n      default: "active"\n    }';
const idx = t.lastIndexOf(needle);
if (idx === -1) {
  console.error('needle not found');
  process.exit(1);
}
const repl = needle.replace('"active", "completed", "removed"', '"active", "assigned", "completed", "removed"');
t = t.slice(0, idx) + repl + t.slice(idx + needle.length);
fs.writeFileSync(p, t, 'utf8');
console.log('updated');
