import genDiff from '../genDiff.js';
import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

const getFormatter = (format, data) => {
  switch (format) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    case 'json':
      return json(data);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

export default (file1, file2, format) => {
  const difference = genDiff(file1, file2);
  return getFormatter(format, difference);
};
