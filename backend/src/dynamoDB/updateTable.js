const AWS = require('aws-sdk')
const fs = require('fs')
const awsConfig = JSON.parse(fs.readFileSync('../awsConfig.json', 'utf-8'))

AWS.config.update({
    endpoint: awsConfig.ENDPOINT,
    region: awsConfig.REGION
})
const dynamodb = new AWS.DynamoDB()

dynamodb.updateTable({
    TableName: 'Bill',
    AttributeDefinitions: [
        {AttributeName: 'billId', AttributeType: 'S'},
        {AttributeName: 'isPaid', AttributeType: 'B'},
        {AttributeName: 'paidDate', AttributeType: 'S'},
        {AttributeName: 'company', AttributeType: 'S'},
        {AttributeName: 'member', AttributeType: 'S' },
        {AttributeName: 'name', AttributeType: 'S'},
        {AttributeName: 'total', AttributeType: 'D'}
        
    ],
    GlobalSecondaryIndexUpdates: [{
        Create: {
            IndexName: 'History',
        }
    }]
},(err, data) => {
    if (err) {
        console.dir(err);
    } else {
        console.dir(`update table`);
    }
});
