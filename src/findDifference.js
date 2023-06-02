import _ from 'lodash';

const findDifference = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const sortedKey = _.sortBy(_.union(keys1, keys2));

  const result = sortedKey.map((key) => {
    if (!Object.hasOwn(data1, key)) {
      return { type: 'added', key, value: data2[key] };
    }
    if (!Object.hasOwn(data2, key)) {
      return { type: 'deleted', key, value: data1[key] };
    }
    if (
      Object.hasOwn(data1, key) &&
      Object.hasOwn(data2, key) &&
      typeof data1[key] === 'object' &&
      typeof data2[key] === 'object'
    ) {
      return {
        type: 'node',
        key,
        children: findDifference(data1[key], data2[key]),
      };
    }
    if (data1[key] !== data2[key]) {
      return {
        type: 'changed',
        key,
        value1: data1[key],
        value2: data2[key],
      };
    }
    return { type: 'unchanged', key, value: data1[key] };
  });

  return result;
};
export default findDifference;
