const fs = require('fs');
const iconv = require('iconv-lite');
const readline = require('readline');
const jschardet = require('jschardet');

module.exports = async (csvPath, options) => {
  let out = options.out ? options.out : `${process.cwd()}/csv.json`;
  let keys = options.keys ? options.keys.split(',') : [];
  let lineCount = 0;
  let encoding = 'UTF-8';
  const fileStream = fs.createReadStream(csvPath, { encoding: 'binary' });
  const outStream = fs.createWriteStream(out, { flags: 'w' });

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // 注意：使用 crlfDelay 选项
  console.log(csvPath, '=>', out);

  for await (const line of rl) {
    lineCount++;
    if (lineCount == 1) {
      let checkRes = jschardet.detect(line);
      console.log('csv encoding', checkRes.encoding);
      encoding = checkRes.encoding;

      outStream.write(`[`);
    }

    let str = iconv.decode(Buffer.from(line, 'binary'), encoding);
    let _arr = str.split(',');

    if (!keys.length) {
      keys = _arr;
    }

    if (lineCount == 1) {
      continue;
    }

    if (lineCount >= 3) {
      outStream.write(`,`);
    }

    let ite = {};
    keys.forEach((k, i) => {
      ite[k] = _arr[i];
    });

    outStream.write(`${JSON.stringify(ite)}`);
  }

  outStream.write(`]`);
  outStream.end();

  outStream.on('close', () => {
    console.log(`[Finished]: lineCount => ${lineCount - 1}, size => ${ (outStream.bytesWritten / 1024).toFixed(4) }Kb`);
  });
}
