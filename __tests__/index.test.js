import { fileURLToPath } from 'url';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (fileName) => resolve(__dirname, '..', '__fixtures__', fileName);
const getExpected = (fileName) => readFileSync(getFixturePath(fileName), { encoding: 'utf8', flag: 'r' });

test('compare json files with stylish formatter', () => {
  const pathTofileToCompare1 = getFixturePath('file1.json');
  const pathTofileToCompare2 = getFixturePath('file2.json');

  const actual = genDiff(pathTofileToCompare1, pathTofileToCompare2);
  const expected = getExpected('result-stylish.txt');

  expect(actual).toEqual(expected);
});

test('compare yaml files with stylish formatter', () => {
  const pathTofileToCompare1 = getFixturePath('file1.yml');
  const pathTofileToCompare2 = getFixturePath('file2.yml');

  const actual = genDiff(pathTofileToCompare1, pathTofileToCompare2);
  const expected = getExpected('result-stylish.txt');

  expect(actual).toEqual(expected);
});

test('compare json files with plain formatter', () => {
  const pathTofileToCompare1 = getFixturePath('file1.json');
  const pathTofileToCompare2 = getFixturePath('file2.json');

  const actual = genDiff(pathTofileToCompare1, pathTofileToCompare2, 'plain');
  const expected = getExpected('result-plain.txt');

  expect(actual).toEqual(expected);
});

test('compare yaml files with plain formatter', () => {
  const pathTofileToCompare1 = getFixturePath('file1.yml');
  const pathTofileToCompare2 = getFixturePath('file2.yml');

  const actual = genDiff(pathTofileToCompare1, pathTofileToCompare2, 'plain');
  const expected = getExpected('result-plain.txt');

  expect(actual).toEqual(expected);
});
