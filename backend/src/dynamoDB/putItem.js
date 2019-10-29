var AWS = require("aws-sdk");
const uuid = require('uuid/v4')
// AWS.config.loadFromPath('./awsConfig.json');
AWS.config.update({
    region: 'us-east-1',
    accessKeyId: "ASIAS6NWTXIMR4WPFZOT",
secretAccessKey: "Quz2JvKNIchHhKFL9b7vC+mz18qgSf+dPO+H+vEg",
sessionToken:"FQoGZXIvYXdzELH//////////wEaDMbSDnQGXuJt54STOCKDAth/a4tt/4XaVfyGVjDUx3DMuCHlIKRL9jogmcounMpdNkkv92xN8910+kLJOc8C1pRrfjcxYhigZmnTY+u6uQ/Hw5tJ5cW+3L+H41lgVFkAgz7Zy+GDJtj4NfLJeL385YL6ETr7RClcjn0+QdU4y4YlYWk/ESBfIpFftPKq30LhY3SH8LYZkp0Pd2lWdHluCROg3Ez1HiRJ+yYf+d62HLfEx7ZW/ZF2DGACJ+cQmINjdomtYuiLk9eOVjCCzUzvXvrbxIVWkdRgQDawrx1g0kgRs9L3QvE/ymA0NENzq7NiMTAG/Yu7omHtH5Hidtx0RIrHH3ilAbdhM/zL73mNxrkr0BcovK3h7QU="
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


