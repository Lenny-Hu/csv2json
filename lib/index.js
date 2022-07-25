const fs = require('fs');
const iconv = require('iconv-lite');
const readline = require('readline');
const jschardet = require('jschardet');

module.exports = async (csvPath, options) => {
  const res = [];
  let out = options.out ? options.out : `${process.env.PWD}/csv.json`;
  let keys = options.keys ? options.keys.split(',') : [];
  let lineCount = 0;
  let encoding = 'UTF-8';
  const fileStream = fs.createReadStream(csvPath, { encoding: 'binary' });

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // 注意：使用 crlfDelay 选项
  // 将 input.txt 中的所有 CR LF ('\r\n') 实例识别为单个换行符。
  console.log(csvPath, '=>', options.out);

  for await (const line of rl) {
    lineCount++;
    if (lineCount == 1) {
      let checkRes = jschardet.detect(line);
      console.log('csv encoding', checkRes.encoding);
      encoding = checkRes.encoding;
    }

    let str = iconv.decode(Buffer.from(line, 'binary'), encoding);
    let _arr = str.split(',');

    if (!keys.length) {
      keys = _arr;
    }

    if (lineCount == 1) {
      continue;
    }

    let ite = {};
    keys.forEach((k, i) => {
      ite[k] = _arr[i];
    });
    res.push(ite);
  }

  fs.writeFileSync(out, JSON.stringify(res));
  console.log('[Finished]: Array.length => ', res.length);
}
