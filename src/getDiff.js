import _ from 'lodash';

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
export default getDiff;
