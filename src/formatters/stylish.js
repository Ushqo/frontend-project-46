import _ from 'lodash';

const getResultLine = (lines, bracketIndent) => ['{', ...lines, `${bracketIndent}}`].join('\n');

const getIndent = (depthCount, indentParam = 0, replacer = ' ', spaceCount = 4) => {
  const indentSize = depthCount * spaceCount - indentParam;
  const currentIndent = replacer.repeat(indentSize);
  const bracketIndent = replacer.repeat(indentSize - spaceCount + indentParam);
  return { currentIndent, bracketIndent };
};

const stringify = (data, depth) => {
  const iter = (dataElement, depthCount) => {
    if (!_.isObject(dataElement)) {
      return `${dataElement}`;
    }
    const indent = getIndent(depthCount);
    const lines = Object.keys(dataElement)
      .map((key) => `${indent.currentIndent}${key}: ${iter(dataElement[key], depthCount + 1)}`);
    return getResultLine(lines, indent.bracketIndent);
  };
  return iter(data, depth);
};

const stylish = (data) => {
  const iter = (currentData, depthCount) => {
    const indent = getIndent(depthCount, 2);
    const lines = currentData.map((dataElement) => {
      switch (dataElement.type) {
        case 'nested':
          return `${indent.currentIndent}  ${dataElement.key}: ${iter(dataElement.children, depthCount + 1)}`;
        case 'updated': {
          const dataElement1 = `${indent.currentIndent}- ${dataElement.key}: ${stringify(dataElement.value1, depthCount + 1)}`;
          const dataElement2 = `${indent.currentIndent}+ ${dataElement.key}: ${stringify(dataElement.value2, depthCount + 1)}`;
          return [dataElement1, dataElement2].join('\n');
        }
        case 'removed':
          return `${indent.currentIndent}- ${dataElement.key}: ${stringify(dataElement.value, depthCount + 1)}`;
        case 'added':
          return `${indent.currentIndent}+ ${dataElement.key}: ${stringify(dataElement.value, depthCount + 1)}`;
        case 'notUpdated':
          return `${indent.currentIndent}  ${dataElement.key}: ${stringify(dataElement.value, depthCount + 1)}`;
        default:
          throw new Error(`Unknown type: ${dataElement.type}`);
      }
    });
    return getResultLine(lines, indent.bracketIndent);
  };
  return iter(data, 1);
};

export default stylish;
