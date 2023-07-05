const newman = require('newman');
const param = '参数';
module.exports.param = param;
newman.run({
    collection: require('./20230629FXS.postman_collection.json')
}).on('beforeRequest', (error, args) => {
      const requestBodyRaw = args.request.body.raw;
        
        try {
            const requestBodyArray = JSON.parse(`[${requestBodyRaw}]`);
            requestBodyArray.forEach((requestBody, index) => {
                console.log(`Request ${index + 1} Parameters:`);
                Object.entries(requestBody).forEach(([key, value]) => {
                    console.log(`${key}: ${value}`);
                });
                console.log('\n');
            });
        } catch (e) {
            console.error('Error parsing request body:', e);
        }
    
}).on('done', function (err, response) {
    for (let res of response.run.executions) {
        const responseTimeHeader = res.response.headers.find(header => header.key.toLowerCase() === 'date');
        console.log(res.response)
        console.log(res.response.status)
        console.log(res.response.code)
        //const responseTime = new date(responseTimeHeader).format('YYYY-MM-DDTHH:mm:ss');
        //console.log(responseTime)
    }
})


