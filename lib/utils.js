const path = require('path');
const fs = require('fs');

module.exports = {
  writeBigCsv (outPath) {
    // 生成10万行csv
    console.time('big_csv');
    outPath = outPath || path.resolve(__dirname, '../test/big.csv');

    const csvStream = fs.createWriteStream(outPath, { flags: 'w' });
    csvStream.write('序号,姓名,年龄,职业,title\r\n');
    for (let o = 0; o < 100000; o++) {
      let _arr = [o + 1, `name${o}`, parseInt((1 - Math.random()) * 100), `job${o}`, `title${o}`];
      csvStream.write(`${_arr.join(',')}\r\n`);
    }
    csvStream.end();
    console.timeEnd('big_csv');
  }
};