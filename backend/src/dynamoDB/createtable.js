
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
        { AttributeName: "serviceId", KeyType: "HASH" },
    ],
    AttributeDefinitions: [
        { AttributeName: "serviceId", AttributeType: "S" },
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
dynamodb.createTable({
    TableName: "Bill",
    KeySchema: [
        { AttributeName: "billId", KeyType: "HASH" },
        { AttributeName: "companyId", KeyType: "RANGE" }
    ],
    AttributeDefinitions: [
        { AttributeName: "billId", AttributeType: "S" },
        { AttributeName: "companyId", AttributeType: "S" }
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
    TableName: "History",
    KeySchema: [
        { AttributeName: "username", KeyType: "HASH" },
        { AttributeName: "billId", KeyType: "RANGE" }
    ],
    AttributeDefinitions: [
        { AttributeName: "username", AttributeType: "S" },
        { AttributeName: "billId", AttributeType: "S" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    },
}, (err, data) => {
    if (err) {
        console.dir(err);
    } else {
        console.dir(`Created table History`);
    }
});
dynamodb.createTable({
    TableName: "ScheduleReminder",
    KeySchema: [
        { AttributeName: "id", KeyType: "HASH" },
        { AttributeName: "memberId", KeyType: "RANGE" }
    ],
    AttributeDefinitions: [
        { AttributeName: "id", AttributeType: "S" },
        { AttributeName: "memberId", AttributeType: "S" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    },
}, (err, data) => {
    if (err) {
        console.dir(err);
    } else {
        console.dir(`Created table schedule`);
    }
});