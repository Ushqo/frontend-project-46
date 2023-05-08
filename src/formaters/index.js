import genDiff from '../genDiff.js';
import stylish from './stylish.js';

export default (firstFile, secondFile, format) => {
  const difference = genDiff(firstFile, secondFile);

  switch (format) {
    case 'stylish':
      return stylish(difference);
    default:
      throw new Error(`Unnown format: ${format}`);
  }
};
