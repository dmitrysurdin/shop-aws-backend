"use strict";
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.createProduct = async (event) => {
    const product = JSON.parse(event.body);
    const id = uuidv4();
    const productsParams = {
        TableName: "products",
        Item: {
            title: product.title,
            description: product.description,
            price: product.price,
            id
        }
    };

    const stocksParams = {
        TableName: "stocks",
        Item: {
            product_id: id,
            count: product.count || 1
        }
    };

    try {
        if (!product.title || !product.description || !product.price || !product.count) {
            return { statusCode: 400, body: JSON.stringify({ message: "Bad request" }) };
        }

        await dynamodb.put(productsParams).promise();
        await dynamodb.put(stocksParams).promise();
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            body: JSON.stringify({ message: "Product created successfully" })
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Failed to create product" })
        };
    }
};
