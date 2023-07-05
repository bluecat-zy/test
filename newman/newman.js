const newman = require('newman');
var dataArray =[];
var requestBodyRaw =[];
module.exports.dataArray = dataArray;
newman.run({
    collection: require('./20230629FXS.postman_collection.json')
}).on('beforeRequest', (error, args) => {
       requestBodyRaw = args.request.body.raw;
}).on('done', function (err, response) {
         try {
            const requestBodyArray = JSON.parse(requestBodyRaw);
         if (Array.isArray(requestBodyArray)) {
             jsonDataArray.forEach((item) => {
             const vin = findVinValue(item);
             const data = {vin:'',timestamp:''};
             data.vin = vin;
             dataArray.push(data);
            });
         } else {
               
         }
        } catch (e) {
          if (require.main === module) {
            console.error('Error parsing request body:', e);
          }
     }
    for (let res of response.run.executions) {
        const responseTimeHeader = res.response.headers.find(header => header.key.toLowerCase() === 'date');
         if (require.main === module) {
        console.log(res.response.status)
        console.log(res.response.code)
         }
        const date = new Date(responseTimeHeader).toISOString().replace('.000Z', '');     
        dataArray.push({status:res.response.status,code:res.response.code,date:date });
    }
})

const findVinValue = (obj) => {
  for (let key in obj) {
    if (typeof obj[key] === 'object') { // 判断属性值是否为对象
      const result = findVinValue(obj[key]); // 递归调用函数
      if (result) {
        return result; // 返回找到的结果
      }
    } else if (key === 'vin') {
      return obj[key]; // 找到 vin 值，返回该值
    }
  }
};



