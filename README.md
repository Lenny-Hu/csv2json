# csv2json
> support GBK、 UTF8 format CSV conversion to JSON

## Installing
`npm i -g cli-csv2json`

## usage
```
cli-csv2json -h // display help

Usage: cli-csv2json [options] <csvPath>

Convert CSV to json

Arguments:
  csvPath              csv path

Options:
  -V, --version        output the version number
  -o, --out <outPath>  json out path (default: ${pwd}/csv.json)
  -k, --keys <keys>    the key name of each column (e: id,title,desc)
  -h, --help           display help for command
```

### example

command
```
cli-csv2json ./a.csv -o ./a.json -k id,name,age,job,title"
```

input `a.csv`
```
序号,姓名,年龄,职业,title
1,张三,19,丐帮,小组长
2,lisi,23,恒山派,堂主
3,王五,22,华山派,入门弟子
4,秦六,33,少林寺,
```

out `a.json`
```
[
  {
    "id": "1",
    "name": "张三",
    "age": "19",
    "job": "丐帮",
    "title": "小组长"
  },
  {
    "id": "2",
    "name": "lisi",
    "age": "23",
    "job": "恒山派",
    "title": "堂主"
  },
  {
    "id": "3",
    "name": "王五",
    "age": "22",
    "job": "华山派",
    "title": "入门弟子"
  },
  {
    "id": "4",
    "name": "秦六",
    "age": "33",
    "job": "少林寺",
    "title": ""
  }
]
```