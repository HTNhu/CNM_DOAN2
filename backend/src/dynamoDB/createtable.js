
const AWS = require('aws-sdk')

AWS.config.update({
    region: 'us-east-1',
    accessKeyId: "ASIA56GFAHQG7NQO25OQ",
secretAccessKey: "4T3D+tsqI9mihSNu09oREPxEy+G3sPoguq6UuSjP",
sessionToken:"FQoGZXIvYXdzELT//////////wEaDKUKQotaVsTj+w2jzyKCAg2hiL6G5XPuQo87hdGln2/94UUpiDJ/cYCOhs1JOqJ95idhaSUAh2s982YlXVZbzuCSuiBO0ZIFcRgkAxceYFjnuDwg7oAKhpX9KA5YYlus+wK3bLKrNTMIlW4Etv+VBxY6cgP/Zwphb3ygXYeIR0tqDsUb06UfCp3EjJL9shP6V+U/wDMvAjP9Sl/P/Ppp3N240KKdlYDEN3QG0Izdxuj+M1Hb45pQTePBcefepHbUSLOgXhLND6Y2coo3i9Sb9TQiSZ7QxGZF1R0aOAojDNJhZiDSC2FLWAfeadmIGMQ4WNaXuxgIXy5obqJXoncJCWuTC5R7wIr26S5J5NTnMgTbTCiHh+LtBQ=="
});

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