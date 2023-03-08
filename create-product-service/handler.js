'use strict';
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.createProduct = async (event) => {
    const product = JSON.parse(event.body);
    const params = {
        TableName: 'products',
        Item: product
    };

    try {
        await dynamodb.put(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Product created successfully' })
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Failed to create product' })
        };
    }
};
