const newman = require('newman');

newman.run({
    collection: require('./20230629FXS.postman_collection.json')

}).on('done', function (err, response) {
    for (let res of response.run.executions) {
        console.log(res.response.status)
        console.log(res.response.code)
    }
})

import { DynamoDBClient, DescribeTableCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: 'ap-south-1' });

const command = new DescribeTableCommand({
  TableName: 't-info'
});

client.send(command)
  .then(data => {
    console.log('Success! Table description:', data.Table);
  })
  .catch(err => {
    console.error('Error:', err);
  });

