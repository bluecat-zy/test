const newman = require('newman');

newman.run({
    collection: require('./20230629FXS.postman_collection.json')

}).on('done', function (err, response) {
    for (let res of response.run.executions) {
        console.log(res.response.status)
        console.log(res.response.code)
    }
})

// 引入 AWS SDK
const AWS = require('aws-sdk');

// 配置 AWS 凭证和区域
AWS.config.update({
  accessKeyId: 'AKIARA2JM4WX3VI6HL4T',
  secretAccessKey: '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',
  region: 'ap-south-1' // 替换为你的区域
});

// 创建 DynamoDB 客户端
const dynamodb = new AWS.DynamoDB();

// 示例：获取 DynamoDB 表的信息
dynamodb.describeTable({ TableName: 't-info' }, (err, data) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Table Information:', data.Table);
  }
});
