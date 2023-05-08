import _ from 'lodash';

const genDiff = (obj1, obj2) => _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)))
  .map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, status: 'tree', children: genDiff(obj1[key], obj2[key]) };
    }
    if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      return { key, status: 'added', value: obj2[key] };
    }
    if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
      return { key, status: 'removed', value: obj1[key] };
    }
    if ((obj1[key] !== obj2[key])) {
      return {
        key, status: 'updated', newValue: obj2[key], oldValue: obj1[key],
      };
    }
    return { key, status: 'not updated', value: obj1[key] };
  });

export default genDiff;
