import { load } from 'js-yaml';

const parse = (extension, file) => {
  switch (extension) {
    case '.json':
    case '':
      return JSON.parse(file);
    case '.yaml':
    case '.yml':
      return load(file);
    default:
      throw new Error(`Sorry, ${extension} is not supported`);
  }
};
export default parse;
