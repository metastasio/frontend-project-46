import _ from 'lodash';

const replacer = ' ';
const spaces = 4;
const offset = 2;
const indent = (depth) => replacer.repeat(depth * spaces - offset);
const bracketIndent = (depth) => replacer.repeat(depth * spaces - spaces);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const lines = Object.entries(value).map(
    ([key, val]) => `${indent(depth)}  ${key}: ${stringify(val, depth + 1)}`,
  );
  return ['{', ...lines, `${bracketIndent(depth)}}`].join('\n');
};

const stylish = (diff) => {
  const iter = (currentValue, depth) => {
    const result = currentValue.map((item) => {
      if (item.type === 'deleted') {
        return `${indent(depth)}- ${item.key}: ${stringify(
          item.value,
          depth + 1,
        )}`;
      }
      if (item.type === 'added') {
        return `${indent(depth)}+ ${item.key}: ${stringify(
          item.value,
          depth + 1,
        )}`;
      }
      if (item.type === 'unchanged') {
        return `${indent(depth)}  ${item.key}: ${stringify(
          item.value,
          depth + 1,
        )}`;
      }
      if (item.type === 'node') {
        return `${indent(depth)}  ${item.key}: ${iter(
          item.children,
          depth + 1,
        )}`;
      }
      if (item.type === 'changed') {
        const first = `${indent(depth)}- ${item.key}: ${stringify(
          item.value1,
          depth + 1,
        )}`;
        const second = `${indent(depth)}+ ${item.key}: ${stringify(
          item.value2,
          depth + 1,
        )}`;
        return `${first}\n${second}`;
      }
    });
    return ['{', ...result, `${bracketIndent(depth)}}`].join('\n');
  };
  return iter(diff, 1);
};
export default stylish;
