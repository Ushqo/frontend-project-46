import _ from 'lodash';

const genDiff = (obj1, obj2) => {
  const objKeys1 = Object.keys(obj1);
  const objKeys2 = Object.keys(obj2);

  const uniqueKeys = _.union(objKeys1, objKeys2);
  const sortedKeys = _.sortBy(uniqueKeys);

  const difference = sortedKeys.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, type: 'nested', children: genDiff(obj1[key], obj2[key]) };
    }
    if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      return { key, type: 'added', value: obj2[key] };
    }
    if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
      return { key, type: 'removed', value: obj1[key] };
    }
    if (!_.isEqual(obj1[key], obj2[key])) {
      return {
        key, type: 'updated', value2: obj2[key], value1: obj1[key],
      };
    }
    return { key, type: 'notUpdated', value: obj1[key] };
  });

  return difference;
};

export default genDiff;
