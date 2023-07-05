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

newman.run({
    collection: require('./20230629FXS.postman_collection.json')
}).on('beforeRequest', (error, args) => {
       requestBodyRaw = args.request.body.raw;
  // 使用正则表达式提取每一条数据
    const regex = /{[^{}]+}/g;
    const matches = requestBodyRaw.match(regex);

    // 遍历匹配到的每一条数据
    for (const match of matches) {
        // 将每一条数据解析为对象
        const data = JSON.parse(match);
        
        // 在这里进行你想要的操作，例如打印整条数据
        console.log(data);
    }
}).on('done', function (err, response) {
         try {
            const requestBodyArray = JSON.parse(requestBodyRaw);
           console.log(requestBodyArray);
         if (Array.isArray(requestBodyArray)) {
             jsonDataArray.forEach((item) => {
             const vin = findVinValue(item);
             const data = {vin:'',timestamp:''};
             data.vin = vin;
             dataArray.push(data);
            });
         } else {
               
         }
        } catch (e) {
          if (require.main === module) {
            console.error('Error parsing request body:', e);
          }
     }
    for (let res of response.run.executions) {
        const responseTimeHeader = res.response.headers.find(header => header.key.toLowerCase() === 'date');
        console.log(res.response.status)
        console.log(res.response.code)
        const date = new Date(responseTimeHeader).toISOString().replace('.000Z', ''); 
        console.log(date);
       
        const params = {
        TableName: 't-InfoLog', // 表名
        FilterExpression: '#ts >= :value',
        ExpressionAttributeNames: {
        '#ts': 'timestamp'
        },
        ExpressionAttributeValues: {
        ':value': { S:date }
        }
        };
        const command = new ScanCommand(params);
        client.send(command)
        .then((response) => {
         console.log('Success! Query results:', response.Items);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    }
})

const findVinValue = (obj) => {
  for (let key in obj) {
    if (typeof obj[key] === 'object') { // 判断属性值是否为对象
      const result = findVinValue(obj[key]); // 递归调用函数
      if (result) {
        return result; // 返回找到的结果
      }
    } else if (key === 'vin') {
      return obj[key]; // 找到 vin 值，返回该值
    }
  }
};



