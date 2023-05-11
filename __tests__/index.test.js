import { fileURLToPath } from 'url';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (fileName) => resolve(__dirname, '..', '__fixtures__', fileName);
const getExpected = (fileName) => readFileSync(getFixturePath(fileName), { encoding: 'utf8', flag: 'r' });

test.each([
  {
    fileName1: 'file1.json', fileName2: 'file2.json', formatter: 'stylish', expectedFileName: 'result-stylish.txt',
  },
  {
    fileName1: 'file1.yml', fileName2: 'file2.yml', formatter: 'stylish', expectedFileName: 'result-stylish.txt',
  },
  {
    fileName1: 'file1.json', fileName2: 'file2.json', formatter: 'plain', expectedFileName: 'result-plain.txt',
  },
  {
    fileName1: 'file1.yml', fileName2: 'file2.yml', formatter: 'plain', expectedFileName: 'result-plain.txt',
  },
  {
    fileName1: 'file1.json', fileName2: 'file2.json', formatter: 'json', expectedFileName: 'result-json.txt',
  },
  {
    fileName1: 'file1.yml', fileName2: 'file2.yml', formatter: 'json', expectedFileName: 'result-json.txt',
  },
])(('compare $fileName1 and $fileName2 with $formatter formatter'), ({
  fileName1, fileName2, formatter, expectedFileName,
}) => {
  const path1 = getFixturePath(fileName1);
  const path2 = getFixturePath(fileName2);
  const actual = genDiff(path1, path2, formatter);
  const expected = getExpected(expectedFileName);
  expect(actual).toEqual(expected);
});
