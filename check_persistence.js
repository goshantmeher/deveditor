const fs = require('fs');
function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('View.tsx')) results.push(file);
        }
    });
    return results;
}
const files = walk('src/components');
const missing = [];
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (!content.includes('usePersistence')) {
    missing.push(file);
  }
});
console.log('Missing usePersistence:\\n' + missing.join('\\n'));
