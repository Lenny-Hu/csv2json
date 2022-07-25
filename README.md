# csv2json
csv2json，Support GBK、 UTF8 format CSV conversion to JSON

## usage
```
npm i -g csv2json

csv2json -h // display help

csv2json ./test/utf8.csv -o ./test/utf8.json -k id,name,age,job,title"

```

### example
`a.csv`
序号,姓名,年龄,职业,title
1,张三,19,丐帮,小组长
2,lisi,23,恒山派,堂主
3,王五,22,华山派,入门弟子
4,秦六,33,少林寺,

`a.json`
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