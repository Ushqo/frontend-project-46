import _ from 'lodash';

const genDiff = (data1, data2) => {
  const dataKeys1 = Object.keys(data1);
  const dataKeys2 = Object.keys(data2);

  const uniqueKeys = _.union(dataKeys1, dataKeys2);
  const sortedKeys = _.sortBy(uniqueKeys);

  const difference = sortedKeys.map((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { key, type: 'nested', children: genDiff(data1[key], data2[key]) };
    }
    if (!Object.hasOwn(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    }
    if (!Object.hasOwn(data2, key)) {
      return { key, type: 'removed', value: data1[key] };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        key, type: 'updated', value2: data2[key], value1: data1[key],
      };
    }
    return { key, type: 'notUpdated', value: data1[key] };
  });

  return difference;
};

export default genDiff;
