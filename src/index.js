import fs from 'fs';
import path from 'path';
// import getDiff from './getDiff.js';
import parse from './parse.js';
import getFormatted from './formatters/index.js';
import findDifference from './findDifference.js';

const getPath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(getPath(filepath), 'utf8');
const getExtension = (filepath) => path.extname(filepath);

// const getFileToCompare = (filePath) => JSON.parse(readFile(filePath));
// const getFileToCompare = parse(getExtension(filepath), readFile(filepath));

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const fileToParse1 = readFile(filepath1);
  const fileToParse2 = readFile(filepath2);
  const extension1 = getExtension(filepath1);
  const extension2 = getExtension(filepath2);
  const file1 = parse(extension1, fileToParse1);
  const file2 = parse(extension2, fileToParse2);
  const difference = findDifference(file1, file2);
  return getFormatted(difference, format);
};
export default genDiff;
