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
  console.log(args.item.name);
  console.log('------------');
  console.log(args.request.body.raw);
}).on('beforeRequest', (error, args) => {
  console.log(args.request.url.path);
}).on('done', function (err, response) {
    // let i = 0;
    // for (let res of response.run.executions) {
    //   const responseTimeHeader = res.response.headers.find(header => header.key.toLowerCase() === 'date');
    //   console.log(responseTimeHeader);
    //   console.log("status:"+res.response.status+"code:"+res.response.code)
    //   const dateObj = new Date(responseTimeHeader);
    //   dateObj.setSeconds(dateObj.getSeconds() - 1);
    //   const date =  dateObj.toISOString().replace('.000Z', '');
    //   console.log(date);
    //     const params = {
    //     TableName: 't-InfoLog', // 表名
    //     FilterExpression: '#ts >= :value AND #log = :value2 AND #ifid = :value3',
    //     ExpressionAttributeNames: {
    //     '#ts': 'timestamp',
    //     '#log': 'logLevel',
    //     '#ifid': 'ifid'
    //     },
    //     ExpressionAttributeValues: {
    //     ':value': { S:date },
    //     ':value2': { S:'ERROR'},
    //     ':value3': { S:'IT303E'}
    //     }
    //     };
    //   if (requestTitle[i].includes("IT303E")) {
    //   params.ExpressionAttributeValues[':value3'] = { S: 'IT303E' };
    //   }
    //   if (requestTitle[i].includes("IT208E")) {
    //   params.ExpressionAttributeValues[':value3'] = { S: 'IT208E' };
    //   }
    //     const command = new ScanCommand(params);
    //     client.send(command)
    //     .then((response) => {
    //      console.log('Success! Query results:', response.Items);
    //     })
    //     .catch((error) => {
    //     console.error('Error:', error);
    //     });
    //   i++;
    //}
})








