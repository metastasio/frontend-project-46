import _ from 'lodash';

const getDiff = (data1, data2) => {
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
        children: getDiff(data1[key], data2[key]),
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
const a = {
  common: {
    setting1: 'Value 1',
    setting2: 200,
    setting3: true,
    setting6: {
      key: 'value',
      doge: {
        wow: '',
      },
    },
  },
  group1: {
    baz: 'bas',
    foo: 'bar',
    nest: {
      key: 'value',
    },
  },
  group2: {
    abc: 12345,
    deep: {
      id: 45,
    },
  },
};
const b = {
  common: {
    follow: false,
    setting1: 'Value 1',
    setting3: null,
    setting4: 'blah blah',
    setting5: {
      key5: 'value5',
    },
    setting6: {
      key: 'value',
      ops: 'vops',
      doge: {
        wow: 'so much',
      },
    },
  },
  group1: {
    foo: 'bar',
    baz: 'bars',
    nest: 'str',
  },
  group3: {
    deep: {
      id: {
        number: 45,
      },
    },
    fee: 100500,
  },
};

const difference = getDiff(a, b);

const stringify = (value, replacer = '.', spacesCount = 1) => {
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

const formatter = (diff) => {
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
      acc[newKey] = formatter(item.children);
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

  return result;
};
const test = formatter(difference);
