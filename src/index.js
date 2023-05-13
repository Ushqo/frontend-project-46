import path from 'path';
import { readFileSync } from 'node:fs';
import getParsedData from './parser.js';
import format from './formatters/index.js';
import genDiff from './genDiff.js';

const getFileData = (filePath) => readFileSync(path.normalize(filePath));

const getDataType = (filePath) => path.extname(path.basename(filePath)).slice(1);

export default (filePath1, filePath2, formatter = 'stylish') => {
  const data1 = getFileData(filePath1);
  const data2 = getFileData(filePath2);

  const dataType1 = getDataType(filePath1);
  const dataType2 = getDataType(filePath2);

  const parsedData1 = getParsedData(data1, dataType1);
  const parsedData2 = getParsedData(data2, dataType2);
  const dataDifference = genDiff(parsedData1, parsedData2);

  return format(dataDifference, formatter);
};
