const newman = require('newman');
const data =[];
newman.run({
    collection: require('./20230629FXS.postman_collection.json')
}).on('beforeRequest', (error, args) => {
      const requestBodyRaw = args.request.body.raw;
        
        try {
            const requestBodyArray = JSON.parse(`[${requestBodyRaw}]`);
            requestBodyArray.forEach((requestBody, index) => {
                if (require.main === module) {
                console.log(`Request ${index + 1} Parameters:`);
                }
                Object.entries(requestBody).forEach(([key, value]) => {
                     if (require.main === module) {
                    console.log(`${key}: ${value}`);
                     }
                });
                if (require.main === module) {
                console.log('\n');
                }
            });
        } catch (e) {
            if (require.main === module) {
            console.error('Error parsing request body:', e);
        }
     }
}).on('done', function (err, response) {
    for (let res of response.run.executions) {
        const responseTimeHeader = res.response.headers.find(header => header.key.toLowerCase() === 'date');
         if (require.main === module) {
        console.log(res.response.status)
        console.log(res.response.code)
         }
        const date = new Date(responseTimeHeader).toISOString().replace('.000Z', '');     
        data.push({status:res.response.status,code:res.response.code,date:date });
    }
    module.exports.data = data;
    if (require.main === module) {
   console.log(module.exports.data) 
    }
})



