
const AWS = require('aws-sdk')
const fs = require('fs')
const awsConfig = JSON.parse(fs.readFileSync('../awsConfig.json', 'utf-8'))

AWS.config.update({
    endpoint: awsConfig.ENDPOINT,
    region: awsConfig.REGION
})
const dynamodb = new AWS.DynamoDB()
dynamodb.createTable({
    TableName: awsConfig.TABLE_NAME,
    KeySchema: [
        { AttributeName: "partitionkey", KeyType: "HASH" },
        { AttributeName: "sortkey", KeyType: "RANGE" }
    ],
    AttributeDefinitions: [
        { AttributeName: "partitionkey", AttributeType: "S" },
        { AttributeName: "sortkey", AttributeType: "S" }
    ],
    // GlobalSecondaryIndexes: [{
    //     IndexName: 'GSI-1',
    //     KeySchema: [
    //         {
    //             AttributeName: 'partitionkey',
    //             KeyType: 'HASH',
    //         },
    //         {
    //             AttributeName: 'sortkey',
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
        console.dir(`Created table "${data.TableName}"`);
    }
});