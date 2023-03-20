const AWS = require('aws-sdk');

AWS.config.update({ region: 'eu-west-1' });

const dynamodb = new AWS.DynamoDB.DocumentClient();

// Retrieve the ids from the products table
const params = {
    TableName: 'products',
    ProjectionExpression: 'id'
};

dynamodb.scan(params, (err, data) => {
    if (err) {
        console.error('Unable to retrieve ids', err);
    } else {
        const randomNumber = Math.floor(Math.random() * 10) + 1;
        data.Items.forEach(item => {
            const params = {
                TableName: 'stocks',
                Item: {
                    product_id: item.id,
                    count: randomNumber
                }
            };

            dynamodb.put(params, (err, data) => {
                if (err) {
                    console.error('Unable to insert stock', err);
                } else {
                    console.log('Stock inserted successfully', data);
                }
            });
        });
    }
});