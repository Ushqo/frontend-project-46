import _ from 'lodash';

const getStatusSymbol = (status) => {
  switch (status) {
    case 'updated':
      return ['- ', '+ '];
    case 'added':
      return '+ ';
    case 'removed':
      return '- ';
    case 'not updated':
      return '  ';
    case 'tree':
      return '  ';
    default:
      throw new Error(`Unnown status: ${status}`);
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
  if (node.status === 'updated') {
    return `${currentIndent}${getStatusSymbol(node.status)[[0]]}${node.key}`;
  }
  return `${currentIndent}${getStatusSymbol(node.status)}${node.key}`;
};

const stringifyValue = (node, depthCount, iterFunction, currentIndent) => {
  if (node.status === 'tree') {
    return `${iterFunction(node.children, depthCount + 1)}`;
  }
  if (node.status === 'updated') {
    return `${getStructure(node.oldValue, depthCount + 1)}\n${currentIndent}${getStatusSymbol(node.status)[1]}${node.key}: ${getStructure(node.newValue, depthCount + 1)}`;
  }
  return `${getStructure(node.value, depthCount + 1)}`;
};

const stylish = (data, replacer = ' ', spaceCount = 4) => {
  const iter = (currentValue, depthCount = 1) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const indentSize = depthCount * spaceCount - 2;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spaceCount + 2);

    const lines = currentValue.map((node) => {
      switch (node.status) {
        case 'tree':
          return `${stringifyKey(node, currentIndent)}: ${stringifyValue(node, depthCount, iter)}`;
        case 'updated':
          return `${stringifyKey(node, currentIndent)}: ${stringifyValue(node, depthCount, iter, currentIndent)}`;
        case 'removed':
          return `${stringifyKey(node, currentIndent)}: ${stringifyValue(node, depthCount)}`;
        case 'added':
          return `${stringifyKey(node, currentIndent)}: ${stringifyValue(node, depthCount)}`;
        case 'not updated':
          return `${stringifyKey(node, currentIndent)}: ${stringifyValue(node, depthCount)}`;
        default:
          throw new Error(`Unnown status: ${node.status}`);
      }
    });
    return getResultLine(lines, bracketIndent);
  };

  return iter(data, 1);
};

export default stylish;
