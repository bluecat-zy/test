const newman = require('newman');
const { DynamoDBClient, DescribeTableCommand ,ScanCommand} = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");
const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});
const ddbDocClient = DynamoDBDocumentClient.from(client);

newman.run({
    collection: require('./20230629FXS.postman_collection.json')
}).on('done', function (err, response) {
   // 当测试运行完成时触发此事件
  if (err || response.error) {
    console.error('运行出错:', err || response.error);
  } else {
    console.log('测试运行完成.');
    // 遍历每个请求的执行结果
    response.run.executions.forEach((execution) => {
      
      const requestName = execution.item.name;
      const requestMethod = execution.request.method;
      const requestUrl = execution.request.url.toString();
      //const requestHeaders = execution.request.headers.toJSON();
      //const requestBody = execution.request.body;
      console.log('请求头部：', requestHeaders);
      console.log(`请求方法：${requestMethod}`);
      console.log(`请求URL：${requestUrl}`);
      console.log("status:"+execution.response.status+"code:"+execution.response.code)
      const responseTimeHeader = execution.response.headers.find(header => header.key.toLowerCase() === 'date');
      console.log(responseTimeHeader);
      var date = new Date(responseTimeHeader).toISOString();
      date = date.substring(0,date.lastIndexOf(".")-1);
      console.log(date);
      const params = {
        TableName: 't-InfoLog', // 表名
        FilterExpression: 'contains(#ts,:value) AND #log = :value2 AND #ifid = :value3',
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
      if (requestName.includes("IT303E")) {
      params.ExpressionAttributeValues[':value3'] = { S: 'IT303E' };
      }
      if (requestName.includes("IT208E")) {
      params.ExpressionAttributeValues[':value3'] = { S: 'IT208E' };
      }
     const command = new ScanCommand(params);
      ddbDocClient.send(command)
      .then((response) => {
      console.log('Success! Query results:', response.Items);
      })
      .catch((error) => {
      console.error('Error:', error);
      });
    });
  }
})








