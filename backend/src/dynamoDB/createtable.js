
const AWS = require('aws-sdk')
const fs = require('fs')
const awsConfig = JSON.parse(fs.readFileSync('../awsConfig.json', 'utf-8'))

AWS.config.update({
    endpoint: awsConfig.ENDPOINT,
    region: awsConfig.REGION
})
const dynamodb = new AWS.DynamoDB()
dynamodb.createTable({
    TableName: "Service",
    KeySchema: [
        { AttributeName: "name", KeyType: "HASH" },
    ],
    AttributeDefinitions: [
        { AttributeName: "name", AttributeType: "S" },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    },
}, (err, data) => {
    if (err) {
        console.dir(err);
    } else {
        console.dir(`Created table`);
    }
});
dynamodb.createTable({
    TableName: "User_TransactionHistory",
    KeySchema: [
        { AttributeName: "username", KeyType: "HASH" },
        { AttributeName: "type", KeyType: "RANGE" }
    ],
    AttributeDefinitions: [
        { AttributeName: "username", AttributeType: "S" },
        { AttributeName: "type", AttributeType: "S" }
    ],
    // GlobalSecondaryIndexes: [{
    //     IndexName: 'User_History',
    //     KeySchema: [
    //         {
    //             AttributeName: 'username',
    //             KeyType: 'HASH',
    //         },
    //         {
    //             AttributeName: 'historyId',
    //             KeyType: 'RANGE',
    //         }
    //     ],
    //     Projection: {
    //       ProjectionType: 'ALL'
    //     },
    //     ProvisionedThroughput: {
    //         ReadCapacityUnits: 10,
    //         WriteCapacityUnits: 10
    //     }
    // }
    // ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    },
}, (err, data) => {
    if (err) {
        console.dir(err);
    } else {
        console.dir(`Created table 1`);
    }
});