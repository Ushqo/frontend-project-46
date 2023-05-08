import _ from 'lodash';

const convertValToStr = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return _.isObject(value) ? '[complex value]' : value;
};

const plain = (diffirence) => {
  const iter = (propertyValue, propertyName = '') => {
    const result = propertyValue.flatMap((element) => {
      switch (element.status) {
        case 'tree':
          return iter(element.children, `${propertyName + element.key}.`);
        case 'added':
          return `Property '${propertyName + element.key}' was added with value: ${convertValToStr(element.value)}`;
        case 'removed':
          return `Property '${propertyName + element.key}' was removed`;
        case 'updated':
          return `Property '${propertyName + element.key}' was updated. From ${convertValToStr(element.oldValue)} to ${convertValToStr(element.newValue)}`;
        case 'not updated':
          return [];
        default:
          throw new Error(`Unnown status: ${propertyValue.status}\n`);
      }
    });

    return result.join('\n');
  };

  return iter(diffirence);
};

export default plain;
