import path from 'path';
import { readFileSync } from 'node:fs';
import getParsedData from './parser.js';
import getFormatedData from './formaters/index.js';

const getFileData = (filePath) => readFileSync(path.normalize(filePath));

const getExtension = (filePath) => path.extname(path.basename(filePath));

export default (filePath1, filePath2, formater = 'stylish') => {
  const firstFileData = getFileData(filePath1);
  const secondFileData = getFileData(filePath2);

  const firstFileExtension = getExtension(filePath1);
  const secondFileExtension = getExtension(filePath2);

  const firstFileParsedData = getParsedData(firstFileData, firstFileExtension);
  const secondFileParsedData = getParsedData(secondFileData, secondFileExtension);

  return getFormatedData(firstFileParsedData, secondFileParsedData, formater);
};
