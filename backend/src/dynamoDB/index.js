const AWS = require('aws-sdk')

// import tables from './tables';
                AWS.config.update({
                    endpoint: 'http://localhost:8000',
                    region: 'local',
                    // accessKeyId: 'local',
                    // secretAccessKey: 'local',
                })

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

    const createTable = async(table) => {
        const dynamodb = new AWS.DynamoDB()
            await new Promise((resolve, reject) => {
                dynamodb.createTable(table, (err) => {
                    if (err) {
                            console.dir(err);
                            reject(err);
                    } else {
                        console.dir(`Created table "${table.TableName}"`);
                        resolve();
                    }
                });
            });
        }

module.exports= {
    createTable,
    getItem,
    putItem,
    deleteItem,
    scan,
    updateItem
}