const { DynamoDBClient, DescribeTableCommand } = require("@aws-sdk/client-dynamodb");

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
