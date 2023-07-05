const newman = require('newman');

newman.run({
    collection: require('./20230629FXS.postman_collection.json')
}).on('beforeRequest', (error, args) => {
     console.log('Request Parameters:', args.request.body.raw);
       const requestBody = JSON.parse(args.request.body.raw);
        
        Object.entries(requestBody).forEach(([key, value]) => {
            console.log(`${key}: ${value}`);
        });
    
}).on('done', function (err, response) {
    for (let res of response.run.executions) {
        console.log(res.response.status)
        console.log(res.response.code)
    }
})


