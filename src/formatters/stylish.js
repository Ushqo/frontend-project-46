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

const stringify = (data, IncDepth) => {
  const replacer = ' ';
  const spaceCount = 4;

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

const stylish = (data) => {
  const replacer = ' ';
  const spaceCount = 4;

  const iter = (currentValue, depthCount = 1) => {
    const indentSize = depthCount * spaceCount - 2;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spaceCount + 2);

    const lines = currentValue.map((node) => {
      switch (node.type) {
        case 'nested':
          return `${currentIndent}${getTypeSymbol(node.type)}${node.key}: ${iter(node.children, depthCount + 1)}`;
        case 'updated':
          return `${currentIndent}${getTypeSymbol(node.type)[0]}${node.key}: ${stringify(node.value1, depthCount + 1)}\n${currentIndent}${getTypeSymbol(node.type)[1]}${node.key}: ${stringify(node.value2, depthCount + 1)}`;
        case 'removed':
          return `${currentIndent}${getTypeSymbol(node.type)}${node.key}: ${stringify(node.value, depthCount + 1)}`;
        case 'added':
          return `${currentIndent}${getTypeSymbol(node.type)}${node.key}: ${stringify(node.value, depthCount + 1)}`;
        case 'notUpdated':
          return `${currentIndent}${getTypeSymbol(node.type)}${node.key}: ${stringify(node.value, depthCount + 1)}`;
        default:
          throw new Error(`Unknown type: ${node.type}`);
      }
    });
    return getResultLine(lines, bracketIndent);
  };

  return iter(data, 1);
};

export default stylish;
