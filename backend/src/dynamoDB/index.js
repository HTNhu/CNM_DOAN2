const AWS = require('aws-sdk')

// AWS.config.loadFromPath('./awsConfig.json');
AWS.config.update({
    region: 'us-east-1',
    accessKeyId: "ASIA56GFAHQG7NQO25OQ",
secretAccessKey: "4T3D+tsqI9mihSNu09oREPxEy+G3sPoguq6UuSjP",
sessionToken:"FQoGZXIvYXdzELT//////////wEaDKUKQotaVsTj+w2jzyKCAg2hiL6G5XPuQo87hdGln2/94UUpiDJ/cYCOhs1JOqJ95idhaSUAh2s982YlXVZbzuCSuiBO0ZIFcRgkAxceYFjnuDwg7oAKhpX9KA5YYlus+wK3bLKrNTMIlW4Etv+VBxY6cgP/Zwphb3ygXYeIR0tqDsUb06UfCp3EjJL9shP6V+U/wDMvAjP9Sl/P/Ppp3N240KKdlYDEN3QG0Izdxuj+M1Hb45pQTePBcefepHbUSLOgXhLND6Y2coo3i9Sb9TQiSZ7QxGZF1R0aOAojDNJhZiDSC2FLWAfeadmIGMQ4WNaXuxgIXy5obqJXoncJCWuTC5R7wIr26S5J5NTnMgTbTCiHh+LtBQ=="
});
           const dynamo = new AWS.DynamoDB.DocumentClient();
           
    const putItem = async(params) => {
        return new Promise((resolve, reject) => {
            dynamo.put(params, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    const getItem = async(params) => {
        return new Promise((resolve, reject) => {
            dynamo.get(params, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    const updateItem = async(params) => {
        return new Promise((resolve, reject) => {
            dynamo.update(params, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    const scan = async(params = {}) => {
        return new Promise((resolve, reject) => {
            dynamo.scan(params, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    const deleteItem = async(params) => {
        return new Promise((resolve, reject) => {
            dynamo.delete(params, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

module.exports= {
    getItem,
    putItem,
    deleteItem,
    scan,
    updateItem
}