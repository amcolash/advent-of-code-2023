import { cpSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { getData } from './data';

if (process.argv.length !== 3) throw 'usage: new [day_name]';

const day = process.argv[2];
const dir = join(__dirname, '../', day);
const template = join(__dirname, 'template.ts');

if (!existsSync(dir)) mkdirSync(dir);

const part1 = join(dir, 'part1.ts');
const part2 = join(dir, 'part2.ts');

if (!existsSync(part1)) cpSync(template.replace('input.txt', 'sample1.txt'), part1);
if (!existsSync(part2)) cpSync(template.replace('input.txt', 'sample2.txt'), part2);

getData(parseInt(day)).then((data) => {
  writeFileSync(join(dir, 'info.md'), data.info || '');

  if (data.examples[0]) writeFileSync(join(dir, 'sample1.txt'), data.examples[0]);
  if (data.examples[1]) writeFileSync(join(dir, 'sample2.txt'), data.examples[1]);

  if (data.input) writeFileSync(join(dir, 'input.txt'), data.input);
});
