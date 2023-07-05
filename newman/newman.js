const newman = require('newman');
const { DynamoDBClient, DescribeTableCommand ,ScanCommand} = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

var dataArray =[];
var requestBodyRaw =[];
var requestPath = []
var requestTitle = [];
newman.run({
    collection: require('./20230629FXS.postman_collection.json')
  }).on('prerequest', (error, args) => {
  // 当每个请求的前置脚本执行时触发此事件
   requestTitle.push(args.item.name); 
  console.log(args.request.body.raw);
}).on('beforeRequest', (error, args) => {
       requestBodyRaw = args.request.body.raw;
       requestPath = args.request.url.path.join('/');
}).on('done', function (err, response) {
//    // 分隔数据
// const separatedData = requestBodyRaw.trim().split('\n');
//  console.log(separatedData);
// // 输出分隔后的数据
// separatedData.forEach((item) => {
//   const jsonData = JSON.parse(item);
//   const vin = findVinValue(jsonData);
//   console.log(vin);
//   console.log();
// });
  console.log(requestTitle);
  console.log(requestPath);
    let i = 0;
    for (let res of response.run.executions) {
      const responseTimeHeader = res.response.headers.find(header => header.key.toLowerCase() === 'date');
      console.log(responseTimeHeader);
      console.log("status:"+res.response.status+"code:"+res.response.code)
      const dateObj = new Date(responseTimeHeader);
      dateObj.setSeconds(dateObj.getSeconds() - 1);
      const date =  dateObj.toISOString().replace('.000Z', '');
        console.log(date);
       
        const params = {
        TableName: 't-InfoLog', // 表名
        FilterExpression: '#ts >= :value AND #log = :value2 AND #ifid = :value3',
        ExpressionAttributeNames: {
        '#ts': 'timestamp',
        '#log': 'logLevel',
        '#ifid': 'ifid'
        },
        ExpressionAttributeValues: {
        ':value': { S:date },
        ':value2': { S:'ERROR'},
        ':value3': { S:'IT303E'}
        }
        };
      if (requestTitle[i].includes("IT303E")) {
      params.ExpressionAttributeValues[':value3'] = { S: 'IT303E' };
      }
      if (requestTitle[i].includes("IT208E")) {
      params.ExpressionAttributeValues[':value3'] = { S: 'IT208E' };
      }
        const command = new ScanCommand(params);
        client.send(command)
        .then((response) => {
         console.log('Success! Query results:', response.Items);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
      i++;
    }
})

const findVinValue = (obj) => {
  for (let key in obj) {
    if (typeof obj[key] === 'object') { // 判断属性值是否为对象
      const result = findVinValue(obj[key]); // 递归调用函数
      if (result) {
        return result; // 返回找到的结果
      }
    } else if (key === 'Vin') {
      return obj[key]; // 找到 vin 值，返回该值
    }
  }
};






