var AWS = require("aws-sdk");
const uuid = require('uuid/v4')
// AWS.config.loadFromPath('./awsConfig.json');
AWS.config.update({
    region: 'us-east-1',
    accessKeyId: "ASIA56GFAHQG7NQO25OQ",
secretAccessKey: "4T3D+tsqI9mihSNu09oREPxEy+G3sPoguq6UuSjP",
sessionToken:"FQoGZXIvYXdzELT//////////wEaDKUKQotaVsTj+w2jzyKCAg2hiL6G5XPuQo87hdGln2/94UUpiDJ/cYCOhs1JOqJ95idhaSUAh2s982YlXVZbzuCSuiBO0ZIFcRgkAxceYFjnuDwg7oAKhpX9KA5YYlus+wK3bLKrNTMIlW4Etv+VBxY6cgP/Zwphb3ygXYeIR0tqDsUb06UfCp3EjJL9shP6V+U/wDMvAjP9Sl/P/Ppp3N240KKdlYDEN3QG0Izdxuj+M1Hb45pQTePBcefepHbUSLOgXhLND6Y2coo3i9Sb9TQiSZ7QxGZF1R0aOAojDNJhZiDSC2FLWAfeadmIGMQ4WNaXuxgIXy5obqJXoncJCWuTC5R7wIr26S5J5NTnMgTbTCiHh+LtBQ=="
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


