import plain from './plain.js';
import stylish from './stylish.js';

const format = (data, type) => {
  switch (type) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    case 'json':
      return JSON.stringify(data);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

export default format;
