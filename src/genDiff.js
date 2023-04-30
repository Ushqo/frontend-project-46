import _ from "lodash";

export default (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const keys = _.sortBy(_.union(keys1, keys2));
  let result = `{\n`;

  for (const key of keys) {
    if (!Object.hasOwn(obj1, key)) {
      result += `  + ${key}: ${obj1[key]}\n`;
    } else if (!Object.hasOwn(obj2, key)) {
      result += `  - ${key}: ${obj1[key]}\n`;
    } else if (obj1[key] !== obj2[key]) {
      result += `  - ${key}: ${obj1[key]}\n`;
      result += `  + ${key}: ${obj2[key]}\n`;
    } else {
      result += `    ${key}: ${obj1[key]}\n`;
    }
  };
  return result + `}`;
};
