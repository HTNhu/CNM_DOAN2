const AWS = require('aws-sdk')

// AWS.config.loadFromPath('./awsConfig.json');
AWS.config.update({ // dday ne
    region: 'us-east-1',
    accessKeyId: "ASIA56GFAHQG2HDL2VVP",
secretAccessKey: "LtjzQK2cqdOJztRrwljjWzcr5xKbYf2NsXwA0RNf",
sessionToken:"FQoGZXIvYXdzEMH//////////wEaDClfnlzLuLKEXrBsWSKCAphk9BkAiet1XIF5p1bAaZlJda3h/cnhWp9IkYOmevmuXr2a8NvJWWRwtgPErOUe+Gfid/PZT0DxZuWjtTirqXsmLgPEjStJwtjFIlh2QpnxOY6O29F4kjX3kdsEq9Bi5r/cy4KIMKFqjhARdUXUtqdMgmruPXc5bu8pKSbYwCvnLBComSMP+8wWoBQVltDDPjkVgVSAIv/JiqfBMHZLvC2ufMEjReN56pUa1SoGDLHhtmAJIR6NaFry2j08oIRbAPjfLR5zPKGFv/fwOUMQCAHMVJYEfJlAIimLtTs5qQ4ZIzUurinOAMNs/S1vQzZ9Ggvg8bLNrXgd65hFhnPpQwj2kCjb7uTtBQ=="
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