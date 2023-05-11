import _ from 'lodash';

const getTypeSymbol = (type) => {
  switch (type) {
    case 'updated':
      return ['- ', '+ '];
    case 'added':
      return '+ ';
    case 'removed':
      return '- ';
    case 'notUpdated':
      return '  ';
    case 'nested':
      return '  ';
    default:
      throw new Error(`Unnown type: ${type}`);
  }
};

const getResultLine = (lines, bracketIndent) => ['{', ...lines, `${bracketIndent}}`].join('\n');

const getStructure = (data, IncDepth, replacer = ' ', spaceCount = 4) => {
  const iter = (node, depthCount) => {
    if (!_.isObject(node)) {
      return `${node}`;
    }

    const indentSize = depthCount * spaceCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spaceCount);

    const lines = Object.keys(node)
      .map((key) => `${currentIndent}${key}: ${iter(node[key], depthCount + 1)}`);

    return getResultLine(lines, bracketIndent);
  };

  return iter(data, IncDepth);
};

const stringifyKey = (node, currentIndent) => {
  if (node.type === 'updated') {
    return `${currentIndent}${getTypeSymbol(node.type)[0]}${node.key}`;
  }
  return `${currentIndent}${getTypeSymbol(node.type)}${node.key}`;
};

const stringifyValue = (node, depthCount, currentIndent) => {
  if (node.type === 'updated') {
    return `${getStructure(node.value1, depthCount + 1)}\n${currentIndent}${getTypeSymbol(node.type)[1]}${node.key}: ${getStructure(node.value2, depthCount + 1)}`;
  }
  return `${getStructure(node.value, depthCount + 1)}`;
};

const stylish = (data, replacer = ' ', spaceCount = 4) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }

  const iter = (currentValue, depthCount = 1) => {
    const indentSize = depthCount * spaceCount - 2;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spaceCount + 2);

    const lines = currentValue.map((node) => {
      switch (node.type) {
        case 'nested':
          return `${stringifyKey(node, currentIndent)}: ${iter(node.children, depthCount + 1)}`;
        case 'updated':
          return `${stringifyKey(node, currentIndent)}: ${stringifyValue(node, depthCount, currentIndent)}`;
        case 'removed':
          return `${stringifyKey(node, currentIndent)}: ${stringifyValue(node, depthCount)}`;
        case 'added':
          return `${stringifyKey(node, currentIndent)}: ${stringifyValue(node, depthCount)}`;
        case 'notUpdated':
          return `${stringifyKey(node, currentIndent)}: ${stringifyValue(node, depthCount)}`;
        default:
          throw new Error(`Unknown type: ${node.type}`);
      }
    });
    return getResultLine(lines, bracketIndent);
  };

  return iter(data, 1);
};

export default stylish;
