const { DynamoDBClient, DescribeTableCommand ,QueryCommand} = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const command = new DescribeTableCommand({
  TableName: 't-InfoLog' // 替换为你的表格名称
});

client.send(command)
  .then(data => {
    console.log('Success! Table description:', data.Table);
  })
  .catch(err => {
    console.error('Error:', err);
  });

const params = {
  TableName: 't-InfoLog', // 替换为你的表格名称
  KeyConditionExpression: 'serviceId = :value', // 设置查询条件表达式，不再使用占位符
  ExpressionAttributeValues: {
    ':value': { S: '01c874e1-54a6-4991-b582-a1960a80fd55' } // 替换为你的查询值和数据类型
  }
};

const command = new QueryCommand(params);

try {
  const response = await client.send(command);
  console.log('Success! Query results:', response.Items);
} catch (error) {
  console.error('Error:', error);
}

