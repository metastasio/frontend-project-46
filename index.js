import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const getPath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(getPath(filepath), 'utf8');
const getFileToCompare = (filePath) => JSON.parse(readFile(filePath));
const getDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.union(keys1, keys2);
  const sortedKey = _.sortBy(keys);

  const result = sortedKey
    .map((key) => {
      if (!Object.hasOwn(data1, key)) {
        return [[`+ ${[key]}`], data2[key]];
      } else if (!Object.hasOwn(data2, key)) {
        return [[`- ${[key]}`], data1[key]];
      } else if (data1[key] !== data2[key]) {
        return [[`- ${[key]}`], data1[key], [`+ ${[key]}`], data2[key]];
      } else {
        return [[`  ${[key]}`], data1[key]];
      }
    })
    .flat(2);

  const getDiff = [];
  for (let i = 0; i <= result.length - 1; ) {
    getDiff.push(`${result[i]}: ${result[i + 1]}`);
    i = i + 2;
  }
  return `{\n  ${getDiff.join('\n  ')}\n}`;
};

const genDiff = (filepath1, filepath2) => {
  const file1 = getFileToCompare(filepath1);
  const file2 = getFileToCompare(filepath2);
  return getDiff(file1, file2);
};

export default genDiff;
