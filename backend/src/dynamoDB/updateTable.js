const AWS = require('aws-sdk')
const fs = require('fs')
const awsConfig = JSON.parse(fs.readFileSync('../awsConfig.json', 'utf-8'))

AWS.config.update({
    endpoint: awsConfig.ENDPOINT,
    region: awsConfig.REGION
})
const dynamodb = new AWS.DynamoDB()

dynamodb.updateTable({
    TableName: 'User_TransactionHistory',
    AttributeDefinitions: [
        {AttributeName: 'username', AttributeType: 'S'},
        {AttributeName: 'type', AttributeType: 'S'},
        {AttributeName: 'billId', AttributeType: 'S'},
        {AttributeName: 'total', AttributeType: 'S'},
        {AttributeName: 'paidAt', AttributeType: 'S' },
        {AttributeName: 'name', AttributeType: 'S'}
        
    ],
    GlobalSecondaryIndexUpdates: [{
        Delete: {
            IndexName: 'TransactionHistory',
        }
    }]
},(err, data) => {
    if (err) {
        console.dir(err);
    } else {
        console.dir(`update table`);
    }
});
