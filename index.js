const { Command } = require('commander');
const program = new Command();
const package = require('./package.json');

const csv2json = require('./lib');

program
  .name('csv2json')
  .description('Convert CSV to json')
  .version(`${package.version}`)
  .argument('<csvPath>', 'csv path')
  .option('-o, --out <outPath>', 'json out path (default: ${pwd}/csv.json)')
  .option('-k, --keys <keys>', 'the key name of each item (e: id,title,desc)')
  .action(async (csvPath, options) => {
    await csv2json(csvPath, options);
  });

program.parse();