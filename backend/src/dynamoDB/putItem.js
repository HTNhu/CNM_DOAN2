var AWS = require("aws-sdk");
const uuid = require('uuid/v4')
AWS.config.update({
    region: "local",
    endpoint: "http://localhost:8000"
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
        name: "Internet" 
    }
};
docClient.put(params, (err, data) => {
    if (err) {
        console.err(err)
    }
    else {
        console.log("Added item:", JSON.stringify(data, null, 2))
    }
});

let params1 = {
    TableName: 'User_TransactionHistory',
    Item: {
        username: 'member1' ,
        type: 'member' ,
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