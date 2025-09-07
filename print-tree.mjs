import { readdirSync, statSync, writeFileSync } from 'fs';
import { join } from 'path';

function walk(dir, prefix = '') {
  const files = readdirSync(dir);
  let output = '';
  for (const file of files) {
    const path = join(dir, file);
    const stats = statSync(path);
    output += `${prefix}${file}\n`;
    if (stats.isDirectory()) {
      output += walk(path, prefix + '  ');
    }
  }
  return output;
}

const output = walk('.', '');
writeFileSync('structure.txt', output);
