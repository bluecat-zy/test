const newman = require('newman');

newman.run({
    collection: require('./20230629FXS.postman_collection.json')

}).on('done', function (err, response) {
    for (let res of response.run.executions) {
        console.log(res.response.status)
        console.log(res.response.code)
    }
})


