"use strict";
const AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-1' });

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.getProductById = async (event) => {
    const { productId } = event.pathParameters;
    const products = await dynamodb.scan({ TableName: 'products', }).promise();
    const stocks = await dynamodb.scan({ TableName: 'stocks', }).promise();
    const product = products.Items.find((p) => p.id === productId);
    const stock = stocks.Items.find((p) => p.product_id === productId);
    const result = {...product, count: stock.count}

    try {
        if (!product) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: "Product not found" })
            };
        }

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            body: JSON.stringify(result)
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "An error occurred" })
        };
    }
};
