const AWS = require('aws-sdk')

// AWS.config.loadFromPath('./awsConfig.json');
AWS.config.update({ // dday ne
    region: 'us-east-1',
    accessKeyId: "ASIA56GFAHQGXVOMKMNR",
secretAccessKey: "6Ao+LeVbYTXnlaaHqno6jOpphMuuP3EPTI0KA3C7",
sessionToken:"FQoGZXIvYXdzEMz//////////wEaDDkFgNr3hPxJjvK5DCKCAgzWHCKOCBgLoOeE79il0dHsbq8sqjdD1x6ovHMoGm0oyo1rPA3FIEW/JRxIw+NnyBwY0eNZQK60y0MrkouiTGdf0YQngvBC3SViUY3VGp43jtNmxiUd+zd2D8a+LTMcnK2h0Y1VzbNeH29WScRr65zMGVnWi8GiCFfE3e6NbuRnEju2YhISHt+3O6wFYfy0/MNNmDu0u8+w37QQrt7yP5avUkUQBXBLzrjGs5G6/kU1HXeU3cwiS7kPJbZb8cavCkZxePDM5+lE5ieuYDu/nN3kf6O4qmK9okaWocW0dtWwidbssRDGQBFHCMn1puArAeVag3mroox3wamQ6q9F+0LOdSjLr+ftBQ=="
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