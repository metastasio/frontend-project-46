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
    const result = currentValue.flatMap((item) => {
      switch (item.type) {
        case 'deleted':
          return `${indent(depth)}- ${item.key}: ${stringify(
            item.value,
            depth + 1,
          )}`;
        case 'added':
          return `${indent(depth)}+ ${item.key}: ${stringify(
            item.value,
            depth + 1,
          )}`;
        case 'unchanged':
          return `${indent(depth)}  ${item.key}: ${stringify(
            item.value,
            depth + 1,
          )}`;
        case 'node':
          return `${indent(depth)}  ${item.key}: ${iter(
            item.children,
            depth + 1,
          )}`;
        case 'changed':
          return `${indent(depth)}- ${item.key}: ${stringify(
            item.value1,
            depth + 1,
          )}\n${indent(depth)}+ ${item.key}: ${stringify(
            item.value2,
            depth + 1,
          )}`;
        default:
          return [];
      }
    });
    return ['{', ...result, `${bracketIndent(depth)}}`].join('\n');
  };
  return iter(diff, 1);
};
export default stylish;
