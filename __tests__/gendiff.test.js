import url from 'url';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) =>
  fs.readFileSync(getFixturePath(filename), 'utf-8');

const testNestedOutput = readFile('testJsonOutputnested.txt');
const testPlain = readFile('testJsonOutputnested_plain.txt');
const file1nested = './__fixtures__/file1nested.json';
const file2nested = './__fixtures__/file2nested.json';

const file1ymlnested = './__fixtures__/file1ymlnested.yml';
const file2ymlnested = './__fixtures__/file2ymlnested.yml';

test('genDiff', () => {
  expect(genDiff(file1nested, file2nested)).toEqual(testNestedOutput);
  expect(genDiff(file1ymlnested, file2ymlnested)).toEqual(testNestedOutput);
  expect(genDiff(file1nested, file2ymlnested)).toEqual(testNestedOutput);
  expect(genDiff(file1nested, file2nested, 'stylish')).toEqual(
    testNestedOutput,
  );
  expect(genDiff(file1nested, file2nested, 'plain')).toEqual(testPlain);
});
