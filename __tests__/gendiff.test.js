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

const extensions = ['yml', 'json'];

test.each([extensions])('gendiff', (extension) => {
  const fileBefore = getPath(`file1.${extension}`);
  const fileAfter = getPath(`file2.${extension}`);

  expect(genDiff(fileBefore, fileAfter)).toEqual(testStylish);
  expect(genDiff(fileBefore, fileAfter, 'stylish')).toEqual(testStylish);
  expect(genDiff(fileBefore, fileAfter, 'plain')).toEqual(testPlain);
  expect(genDiff(fileBefore, fileAfter, 'json')).toEqual(testJson);
});
