import _ from 'lodash';

const stringify = (value, replacer = '  ', spacesCount = 1) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const lines = Object.entries(currentValue).map(
      ([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`,
    );
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };
  return iter(value, 1);
};

const stylish = (diff) => {
  const result = diff.reduce((acc, item) => {
    if (item.type === 'deleted') {
      const newKey = `- ${item.key}`;
      acc[newKey] = item.value;
      return acc;
    }
    if (item.type === 'added') {
      const newKey = `+ ${item.key}`;
      acc[newKey] = item.value;
      return acc;
    }
    if (item.type === 'unchanged') {
      const newKey = `  ${item.key}`;
      acc[newKey] = item.value;
      return acc;
    }
    if (item.type === 'node') {
      const newKey = `  ${item.key}`;
      acc[newKey] = stylish(item.children);
      return acc;
    }
    if (item.type === 'changed') {
      const newKey1 = `- ${item.key}`;
      acc[newKey1] = item.value1;
      const newKey2 = `+ ${item.key}`;
      acc[newKey2] = item.value2;
      return acc;
    }
  }, {});
  return stringify(result);
};

export default stylish;
