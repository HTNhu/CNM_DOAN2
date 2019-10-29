const AWS = require('aws-sdk')

// AWS.config.loadFromPath('./awsConfig.json');
AWS.config.update({
    region: 'us-east-1',
    accessKeyId: "ASIAS6NWTXIMR4WPFZOT",
secretAccessKey: "Quz2JvKNIchHhKFL9b7vC+mz18qgSf+dPO+H+vEg",
sessionToken:"FQoGZXIvYXdzELH//////////wEaDMbSDnQGXuJt54STOCKDAth/a4tt/4XaVfyGVjDUx3DMuCHlIKRL9jogmcounMpdNkkv92xN8910+kLJOc8C1pRrfjcxYhigZmnTY+u6uQ/Hw5tJ5cW+3L+H41lgVFkAgz7Zy+GDJtj4NfLJeL385YL6ETr7RClcjn0+QdU4y4YlYWk/ESBfIpFftPKq30LhY3SH8LYZkp0Pd2lWdHluCROg3Ez1HiRJ+yYf+d62HLfEx7ZW/ZF2DGACJ+cQmINjdomtYuiLk9eOVjCCzUzvXvrbxIVWkdRgQDawrx1g0kgRs9L3QvE/ymA0NENzq7NiMTAG/Yu7omHtH5Hidtx0RIrHH3ilAbdhM/zL73mNxrkr0BcovK3h7QU="
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