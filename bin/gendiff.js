#!/usr/bin/env node

import { Command, Option } from 'commander';
import getDiff from '../src/index.js';

const program = new Command();

program
  .name('gen-diff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .addOption(new Option('-f, --format <type>', 'output format').default('stylish', 'stylish'))
  .action((filePath1, filePath2) => {
    console.log(getDiff(filePath1, filePath2, program.opts().format));
  });

program.parse();
