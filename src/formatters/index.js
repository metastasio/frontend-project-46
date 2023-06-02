import stylish from './stylish.js';

const getFormatted = (data, format) => {
  switch (format) {
    case 'stylish':
      return stylish(data);
    default:
      throw new Error(`${format} is not supported`);
  }
};

export default getFormatted;
