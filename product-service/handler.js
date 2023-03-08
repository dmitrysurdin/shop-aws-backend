"use strict";
const AWS = require("aws-sdk");
AWS.config.update({ region: "eu-west-1" });

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.getProductsList = async () => {
    try {
        const products = await dynamodb.scan({ TableName: "products", }).promise();
        const stocks = await dynamodb.scan({ TableName: "stocks", }).promise();
        const result = products.Items.reduce((acc, product) => {
            const stockItem = stocks.Items.find(stock => stock.product_id === product.id);
            if (stockItem) {
                acc.push({ ...product, count: stockItem.count });
            }
            return acc;
        }, []);

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
