import url from 'url';
import fs from 'fs';
import path from 'path';
import genDiff from '../index.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const testJsonOutput = readFile('testJsonOutput.txt');
const file1 = './__fixtures__/file1.json';
const file2 = './__fixtures__/file2.json';

test('genDiff', () => {
  expect(genDiff(file1, file2)).toEqual(testJsonOutput);
});
