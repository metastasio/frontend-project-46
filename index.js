import _ from 'lodash';
import fs from 'fs';
import path from 'path';
// import parse from './src/parse.js';

const getPath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(getPath(filepath), 'utf8');
const getFileToCompare = (filePath) => JSON.parse(readFile(filePath));
// const getFileToCompare = parse(readFile(filepath));

const getDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const sortedKey = _.sortBy(_.union(keys1, keys2));

  const result = sortedKey
    .map((key) => {
      if (!Object.hasOwn(data1, key)) {
        return `+ ${[key]}: ${data2[key]}`; // addded
      }
      if (!Object.hasOwn(data2, key)) {
        return `- ${[key]}: ${data1[key]}`; // deleted
      }
      if (data1[key] !== data2[key]) {
        return [[`- ${[key]}: ${data1[key]}`], [`+ ${[key]}: ${data2[key]}`]]; // changed
      }
      return `  ${[key]}: ${data1[key]}`; // unchanged
    })
    .flat(2);
  return `\n{\n  ${result.join('\n  ')}\n}`;
};

const genDiff = (filepath1, filepath2) => {
  const file1 = getFileToCompare(filepath1);
  const file2 = getFileToCompare(filepath2);
  return getDiff(file1, file2);
};
export default genDiff;
