import _ from 'lodash';

export default (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const keys = _.sortBy(_.union(keys1, keys2));

  const getDiffData = (acc, key) => {
    let string = acc;
    if (!Object.hasOwn(obj1, key)) {
      string += `  + ${key}: ${obj2[key]}\n`;
      return string;
    }
    if (!Object.hasOwn(obj2, key)) {
      string += `  - ${key}: ${obj1[key]}\n`;
      return string;
    }
    if (obj1[key] !== obj2[key]) {
      string += `  - ${key}: ${obj1[key]}\n`;
      string += `  + ${key}: ${obj2[key]}\n`;
      return string;
    }
    string += `    ${key}: ${obj1[key]}\n`;
    return string;
  };

  const result = keys.reduce(getDiffData, '');
  return `{\n${result}}`;
};
