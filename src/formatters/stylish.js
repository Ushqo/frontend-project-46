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

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(data, IncDepth);
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
          return `${currentIndent}${getStatusSymbol(node.status)}${node.key}: ${iter(node.children, depthCount + 1)}`;
        case 'updated':
          return `${currentIndent}${getStatusSymbol(node.status)[0]}${node.key}: ${getStructure(node.oldValue, depthCount + 1)}\n${currentIndent}${getStatusSymbol(node.status)[1]}${node.key}: ${getStructure(node.newValue, depthCount + 1)}`;
        case 'removed':
          return `${currentIndent}${getStatusSymbol(node.status)}${node.key}: ${getStructure(node.value, depthCount + 1)}`;
        case 'added':
          return `${currentIndent}${getStatusSymbol(node.status)}${node.key}: ${getStructure(node.value, depthCount + 1)}`;
        case 'not updated':
          return `${currentIndent}${getStatusSymbol(node.status)}${node.key}: ${getStructure(node.value, depthCount + 1)}`;
        default:
          throw new Error(`Unnown status: ${node.status}`);
      }
    });
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(data, 1);
};

export default stylish;
