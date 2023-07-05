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
}).on('done', function (err, response) {
   // 分隔数据
const separatedData = requestBodyRaw.trim().split('\n\n');

// 输出分隔后的数据
separatedData.forEach((item) => {
  const jsonData = JSON.parse(item);
  const vin = findVinValue(jsonData);
  console.log(vin);
  console.log();
});
     //     try {
     //        const requestBodyArray = JSON.parse(requestBodyRaw);
     //     if (Array.isArray(requestBodyArray)) {
     //         jsonDataArray.forEach((item) => {
     //         const vin = findVinValue(item);
     //         const data = {vin:'',timestamp:''};
     //         data.vin = vin;
     //         dataArray.push(data);
     //        });
     //     } else {
               
     //     }
     //    } catch (e) {
     //      if (require.main === module) {
     //        console.error('Error parsing request body:', e);
     //      }
     // }
 main();
    for (let res of response.run.executions) {
        const responseTimeHeader = res.response.headers.find(header => header.key.toLowerCase() === 'date');
      console.log(responseTimeHeader);
        console.log(res.response.status)
        console.log(res.response.code)
        const date = new Date(responseTimeHeader).toISOString().replace('.000Z', '');
        console.log(date);
       
        const params = {
        TableName: 't-InfoLog', // 表名
        FilterExpression: '#ts >= :value' AND #log = :value2',
        ExpressionAttributeNames: {
        '#ts': 'timestamp',
        '#log': 'logLevel'
        },
        ExpressionAttributeValues: {
        ':value': { S:date },
        ':value2': { S:'ERROR' }  
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
    } else if (key === 'Vin') {
      return obj[key]; // 找到 vin 值，返回该值
    }
  }
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log("开始睡眠");
  await sleep(1000);
  console.log("睡眠结束");
}





