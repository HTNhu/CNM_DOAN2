var AWS = require("aws-sdk");
const uuid = require('uuid/v4')
// AWS.config.loadFromPath('./awsConfig.json');
AWS.config.update({
    region: 'local',
    endpoint: 'http://localhost:8000'
  });
var docClient = new AWS.DynamoDB.DocumentClient();

let params = {
    TableName: 'Service',
    Item: {
        serviceId: uuid() ,
        name: "Nước" ,
        logo: "https://doancnm.s3.amazonaws.com/nuoc.png"
    }
};
docClient.put(params, (err, data) => {
    if (err) {
        console.dir(err)
    }
    else {
        console.log("Added item:", JSON.stringify(data, null, 2))
    }
});
let params3 = {
    TableName: 'Service',
    Item: {
        serviceId: uuid() ,
        name: "Điện" ,
        logo: "https://doancnm.s3.amazonaws.com/dien.png"
    }
};
docClient.put(params3, (err, data) => {
    if (err) {
        console.dir(err)
    }
    else {
        console.log("Added item:", JSON.stringify(data, null, 2))
    }
});
let params2 = {
    TableName: 'Service',
    Item: {
        serviceId: uuid() ,
        name: "Internet" ,
        logo: "https://doancnm.s3.amazonaws.com/internet.jpg"
    }
};
docClient.put(params2, (err, data) => {
    if (err) {
        console.dir(err)
    }
    else {
        console.log("Added item:", JSON.stringify(data, null, 2))
    }
});


