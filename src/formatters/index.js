import genDiff from '../genDiff.js';
import plain from './plain.js';
import stylish from './stylish.js';

export default (firstFile, secondFile, format) => {
  const difference = genDiff(firstFile, secondFile);

  switch (format) {
    case 'stylish':
      return stylish(difference);
    case 'plain':
      return plain(difference);
    default:
      throw new Error(`Unnown format: ${format}`);
  }
};
