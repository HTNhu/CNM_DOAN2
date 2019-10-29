var AWS = require("aws-sdk");
const uuid = require('uuid/v4')
AWS.config.update({
    region: 'us-east-1',
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

var docClient = new AWS.DynamoDB.DocumentClient();

// let params = {
//     TableName: 'CNM_DOAN2',
//     Item: {
//         partitionkey: "Account",
//         sortkey: uuid(),
//         data: 'admin123',
//         password: '12345678',
//         type: 'admin',
//         createdAt: Date.now(),
//         updatedAt: Date.now()
//     }
// };
// docClient.put(params, (err, data) => {
//     if (err) {
//         console.err(err)
//     }
//     else {
//        console.log("Added item:", JSON.stringify(data, null, 2))
//     }
// });
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
let params1 = {
    TableName: 'Service',
    Item: {
        username: 'admin' ,
        type: 'admin' ,
        password: '12345678',
        userId: uuid(),
        name: 'Tran Nhu',
        address: 'Q12',
        phone: '0355983234'
    }
};
docClient.put(params1, (err, data) => {
    if (err) {
        console.err(err)
    }
    else {
        console.log("Added item:", JSON.stringify(data, null, 2))
    }
});

let params2 = {
    TableName: 'Service',
    Item: {
        serviceId: uuid() ,
        name: "Nước" 
    }
};

docClient.put(params2, (err, data) => {
    if (err) {
        console.err(err)
    }
    else {
        console.log("Added item:", JSON.stringify(data, null, 2))
    }
});
// let params1 = {
//     TableName: 'User_TransactionHistory',
//     Item: {
//         username: 'member1' ,
//         type: 'member' ,
//         password: '12345678',
//         userId: uuid(),
//         name: 'Tran Nhu',
//         address: 'Q12',
//         phone: '0355983234'
//     }
// };
// docClient.put(params1, (err, data) => {
//     if (err) {
//         console.err(err)
//     }
//     else {
//         console.log("Added item:", JSON.stringify(data, null, 2))
//     }
// });