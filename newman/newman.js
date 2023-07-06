const newman = require('newman');
const ifidMap = require('./ifid');
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
console.log(ifidMap);
newman.run({
    collection: require('./20230629FXS.postman_collection.json')
}).on('done', function (err, response) {
   // 当测试运行完成时触发此事件
  if (err || response.error) {
    console.error('运行出错:', err || response.error);
  } else {
    console.log('测试运行完成.');
    console.log("校验请求的执行结果需要等待DynamoDb同步数据---");
    await sleep(1).then(() => {
    console.log("等待结束--------");
    });
    // 遍历每个请求的执行结果
    response.run.executions.forEach((execution) => {
      
      const requestName = execution.item.name;
      const requestMethod = execution.request.method;
      const requestUrl = execution.request.url.toString();
      //const requestHeaders = execution.request.headers.toJSON();
      //const requestBody = execution.request.body;
      console.log(`请求标题：${requestName}`);
      console.log(`请求方法：${requestMethod}`);
      console.log(`请求URL：${requestUrl}`);
      console.log("status:"+execution.response.status+"code:"+execution.response.code)
      const responseTimeHeader = execution.response.headers.find(header => header.key.toLowerCase() === 'date');
      console.log(responseTimeHeader);
      var date = new Date(responseTimeHeader).toISOString();
      console.log(`请求结束的时间：${date}`);
      date = date.substring(0,date.lastIndexOf(".")-8);
      const params = generateParam()
      const url = requestUrl.substring(requestUrl.lastIndexOf("/test")+5);
      console.log(ifidMap.get(url));
      Object.entries(ifidMap).forEach(([key, value]) => {
       if (value.url.includes('(.+)')) {
         var position = value.url.indexOf('(.+)');
         console.log(`模式在位置 ${position} 处找到vin`);
         const url2 = value.url.substring(position)
         const url3 = url2.includes("/")?url2.substring(0,url2.indexOf("/")):url2
        console.log(url3);
      } else {
        console.log("字符串中未找到指定模式");
      }
      });
      const ifid = ifidMap.get(url);
      if (ifidMap.get(url)) {
      console.log('ifid获取成功：',url);
      params.ExpressionAttributeValues[':value4'] = { S: ifid.ifid };
      console.log('DynamoDB的查询参数：');
      Object.entries(params).forEach(([key, value]) => {
      console.log(`${key}:`, value);
      });
     const command = new ScanCommand(params);
      send(command,requestName);
      if(ifid.lambda){
        if(ifid.lambda.GetMskLambda == true){
        const getMskLambdaParam = generateParam(date,null,null,'GetMskLambda')
        const getMskLambdaCommand = new ScanCommand(getMskLambdaParam);
        console.log('验证GetMskLambda的数据');
        send(getMskLambdaCommand,requestName);  
       }
      }
     }
   });
  }
})

function sleep(minutes) {
  const milliseconds = minutes * 60000; // 将分钟转换为毫秒
  return new Promise(resolve => {
    setTimeout(resolve, milliseconds);
  });
}

function getIfid(requestUrl) {
  const url = requestUrl.substring(requestUrl.lastIndexOf("/test")+5);
  Object.entries(ifidMap).forEach(([key, value]) => {
  if (value.url.includes('(.+)')) {
  var position = value.url.indexOf('(.+)');
  console.log(`模式在位置 ${position} 处找到vin`);
  const url2  url.substring(position);
  const url3 = value.url.substring(position);
  const url4 = url3.includes("/")?url3.substring(0,url3.indexOf("/")):url3;
  console.log(url3);
  } else {
    console.log("字符串中未找到指定模式");
  }
}

function send(command,requestName) {
  ddbDocClient.send(command)
      .then((response) => {
      // 按照时间降序排序取出第一条数据
      const firstItem = response.Items.sort((a, b) => new Date(b.timestamp.S) - new Date(a.timestamp.S)).shift();
         if (firstItem) {
         const time = firstItem.timestamp.S; 
         console.log(`请求：${requestName}有${firstItem.logLevel.S}`);
         console.log('该数据的时间：', time);
         console.log(firstItem);
         } else {
         console.log(`请求：${requestName}没有ERROR或者WARN`);
         }
      })
      .catch((error) => {
      console.error('Error:', error);
    });
}

function getVin(param){
   var position = param.indexOf('(.+)');
   const str = param.substring(position)
   const result = str.includes("/")?str.substring(0,str.indexOf("/")):str;
   return  result;
}

function generateParam(date,ifid,vin,lambda){
   const param = {
        TableName: 't-InfoLog', // 表名
        FilterExpression: 'contains(#ts,:value1) AND (#log = :value2 or #log = :value3)',
        ExpressionAttributeNames: {
        '#ts': 'timestamp',
        '#log': 'logLevel'
        },
        ExpressionAttributeValues: {
        ':value1': { S:date },
        ':value2': { S:'ERROR'},
        ':value3': { S:'WARN'}
        }
    };
  if(ifid){
    // 获取下一个可用的键
    const nextKey = `:value${Object.keys(param.ExpressionAttributeValues).length + 1}`;
    param.FilterExpression += ' AND #ifid = '+nextKey;
    param.ExpressionAttributeNames['#ifid'] = 'ifid';
    param.ExpressionAttributeValues[nextKey] = { S:ifid};  
  }
  if(vin){
    // 获取下一个可用的键
    const nextKey = `:value${Object.keys(param.ExpressionAttributeValues).length + 1}`;
    param.FilterExpression += ' AND #vin = '+nextKey;
    param.ExpressionAttributeNames['#vin'] = 'vin';
    param.ExpressionAttributeValues[nextKey] = { S:vin};  
  }
  if(lambda){
    // 获取下一个可用的键
    const nextKey = `:value${Object.keys(param.ExpressionAttributeValues).length + 1}`;
    param.FilterExpression += ' AND #lambda = '+nextKey;
    param.ExpressionAttributeNames['#lambda'] = 'lambdaName';
    param.ExpressionAttributeValues[nextKey] = { S:lambda};
  }
  return param;
}













