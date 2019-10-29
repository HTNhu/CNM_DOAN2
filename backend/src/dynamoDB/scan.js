const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1',
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});
const docClient = new AWS.DynamoDB.DocumentClient();
const params = {
    TableName: 'ScheduleReminder',
    // IndexName: 'TransactionHistory',
};
console.log('Scan ... ');
docClient.scan(params, onScan);
function onScan(err, data) {
    if (err) {
        console.error('Unable to scan the table. Error JSON:', JSON.stringify(err, null, 2));
    } else {
        console.log('Scan succeeded.');
        data.Items.forEach((book) => {
            console.log(book);
        });
        if (typeof data.LastEvaluatedKey !== 'undefined') {
            console.log('Scanning for more...');
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, onScan);
        }
    }
}