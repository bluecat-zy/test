const newman = require('newman');
const { DynamoDBClient, DescribeTableCommand ,QueryCommand} = require("@aws-sdk/client-dynamodb");
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
  console.log(requestBodyRaw);
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
        
       
        const params = {
        TableName: 't-InfoLog', // 表名
        KeyConditionExpression: 'timestamp >= :date',
        ExpressionAttributeValues: {
        ':date': { S:date }
        }
        };
        const command = new QueryCommand(params);
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



