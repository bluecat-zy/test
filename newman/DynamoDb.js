const { DynamoDBClient, DescribeTableCommand ,QueryCommand} = require("@aws-sdk/client-dynamodb");
const { dataArray} = require("./newman");
console.log(dataArray)
const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});


const params = {
  TableName: 't-InfoLog', // 表名
  KeyConditionExpression: 'serviceId = :value', // 查询条件
  ExpressionAttributeValues: {
    ':value': { S: '01c874e1-54a6-4991-b582-a1960a80fd55' } // 查询值和数据类型
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

