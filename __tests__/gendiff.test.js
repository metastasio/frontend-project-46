import url from 'url';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getPath = (file) => path.join(__dirname, '../__fixtures__', file);
const readFile = (file) => fs.readFileSync(getPath(file), 'utf-8');

const testStylish = readFile('testStylish.txt');
const testPlain = readFile('testPlain.txt');
const testJson = readFile('testJson.txt');

const file1 = './__fixtures__/file1.json';
const file2 = './__fixtures__/file2.json';
const file1yml = './__fixtures__/file1yml.yml';
const file2yml = './__fixtures__/file2yml.yml';

test('genDiff', () => {
  expect(genDiff(file1, file2)).toEqual(testStylish);
  expect(genDiff(file1yml, file2yml)).toEqual(testStylish);
  expect(genDiff(file1, file2yml)).toEqual(testStylish);
  expect(genDiff(file1, file2, 'stylish')).toEqual(testStylish);
  expect(genDiff(file1, file2, 'plain')).toEqual(testPlain);
  expect(genDiff(file1, file2, 'json')).toEqual(testJson);
});
