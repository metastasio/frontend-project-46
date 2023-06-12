import _ from 'lodash';

const checkValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const plain = (diff) => {
  const iter = (tree, path) => {
    const result = tree.flatMap((item) => {
      switch (item.type) {
        case 'deleted':
          return `Property '${path}${item.key}' was removed`;
        case 'added':
          return `Property '${path}${
            item.key
          }' was added with value: ${checkValue(item.value)}`;
        case 'changed':
          return `Property '${path}${item.key}' was updated. From ${checkValue(
            item.value1,
          )} to ${checkValue(item.value2)}`;
        case 'node':
          return iter(item.children, `${path}${item.key}.`);
        default:
          return [];
      }
    });
    return result.join('\n');
  };
  return iter(diff, '');
};
export default plain;
