const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../public/library');
const OUTPUT = path.join(__dirname, '../public/library/library-list.json');

function walk(dir) {
  const result = [];
  for (const item of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, item);
    const relPath = path.relative(ROOT, fullPath);
    if (fs.statSync(fullPath).isDirectory()) {
      result.push(...walk(fullPath));
    } else if (fullPath.endsWith('.cpp')) {
      result.push(relPath.replace(/\\/g, '/'));
    }
  }
  return result;
}

const list = walk(ROOT);
fs.writeFileSync(OUTPUT, JSON.stringify(list, null, 2));
console.log(`✅ Generated library-list.json with ${list.length} files`);
