import stylish from './stylish.js';
import plain from './plain.js';

const getFormatted = (data, format) => {
  switch (format) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    case 'json':
      return JSON.stringify(data);
    default:
      throw new Error(`${format} is not supported`);
  }
};

export default getFormatted;
