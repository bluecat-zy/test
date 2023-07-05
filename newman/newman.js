const newman = require('newman');
const param = [];

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
    let i =0;
    for (let res of response.run.executions) {
        const responseTimeHeader = res.response.headers.find(header => header.key.toLowerCase() === 'date');
        
        console.log(res.response.status)
        console.log(res.response.code)
        const date = new Date(responseTimeHeader).toISOString().replace('.000Z', '');     
        param[i]={ url:res.request.url,status:res.response.status,code:res.response.code,date:date },
        i++;
    }
})
module.exports.param = param;


