import _ from 'lodash';

const stringify = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return _.isObject(value) ? '[complex value]' : value;
};

const plain = (diffirence) => {
  const iter = (propertyValue, propertyName = '') => {
    const result = propertyValue.flatMap((element) => {
      switch (element.type) {
        case 'nested':
          return iter(element.children, `${propertyName + element.key}.`);
        case 'added':
          return `Property '${propertyName + element.key}' was added with value: ${stringify(element.value)}`;
        case 'removed':
          return `Property '${propertyName + element.key}' was removed`;
        case 'updated':
          return `Property '${propertyName + element.key}' was updated. From ${stringify(element.value1)} to ${stringify(element.value2)}`;
        case 'notUpdated':
          return null;
        default:
          throw new Error(`Unknown type: ${propertyValue.type}`);
      }
    });

    return result.filter((element) => element !== null).join('\n');
  };

  return iter(diffirence);
};

export default plain;
