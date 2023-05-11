import path from 'path';
import { readFileSync } from 'node:fs';
import getParsedData from './parser.js';
import getFormatedData from './formatters/index.js';

const getFileData = (filePath) => readFileSync(path.normalize(filePath));

const getExtension = (filePath) => path.extname(path.basename(filePath)).slice(1);

export default (filePath1, filePath2, formatter = 'stylish') => {
  const data1 = getFileData(filePath1);
  const data2 = getFileData(filePath2);

  const extension1 = getExtension(filePath1);
  const extension2 = getExtension(filePath2);

  const parsedData1 = getParsedData(data1, extension1);
  const parsedData2 = getParsedData(data2, extension2);

  return getFormatedData(parsedData1, parsedData2, formatter);
};
