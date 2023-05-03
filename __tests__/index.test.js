import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('compare json files', () => {
  const fileToCompare1 = getFixturePath('file1.json');
  const fileToCompare2 = getFixturePath('file2.json');

  const actual = genDiff(fileToCompare1, fileToCompare2);
  const expected = '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';

  expect(actual).toEqual(expected);
});

test('compare yaml files', () => {
  const fileToCompare1 = getFixturePath('file1.yml');
  const fileToCompare2 = getFixturePath('file2.yml');

  const actual = genDiff(fileToCompare1, fileToCompare2);
  const expected = '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';

  expect(actual).toEqual(expected);
});
