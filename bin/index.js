#! /usr/bin/env node
const chalk = require('chalk');
const { exec } = require('child_process');
const glob = require('glob');

const commandLineArgs = require('command-line-args');
const optionDefinitions = [{ name: 'src', type: String, multiple: true, defaultOption: true }];
const options = commandLineArgs(optionDefinitions, { partial: true });

const error = chalk.red;
const warning = chalk.yellow;
const success = chalk.green;

if (!options.src) {
  console.log(error('No files were provided.'));
  process.exit(1);
}

const command = `prettier-eslint --list-different ${options._unknown.join(' ')} ${options.src
  .map(arg => `'${arg.split(' ')}'`)
  .join(' ')}`;

console.log(`Running: ${command}`);
console.log('');

exec(command, (err, stdout, stderr) => {
  const filePaths = stdout
    .trim()
    .split('\n')
    .filter(file => file !== '' || file.startsWith === '>');

  if (filePaths.length > 0) {
    console.log(error(`❌ Found diffs in ${filePaths.length} file${filePaths.length === 1 ? '' : 's'}:`));
    console.log(warning('Please run `prettier-eslint` on the files listed below.'));
    console.log('');
    filePaths.forEach(file => {
      console.log(chalk.bold(`- ${file}`));
    });
    console.log('');
    console.log('---');
    console.log('');
    throw new Error('Found diffs in listed files.');
    return;
  }

  if (
    stderr &&
    (stderr.includes('files were unchanged') || stderr.includes('file was unchanged'))
  ) {console.log(success('✅ did not find diffs in checked files.'));
    return;
  }

  if (err) {
    throw new Error(err);
  }
});
