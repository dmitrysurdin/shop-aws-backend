"use strict";

module.exports.getProductsList = async () => {
    try {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            body: JSON.stringify([
                {
                    id: 1,
                    productName: "Book1",
                    price: 1004
                },
                {
                    id: 2,
                    productName: "Book2",
                    price: 1005
                },
                {
                    id: 3,
                    productName: "Book3",
                    price: 1005
                },
            ])
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "An error occurred" })
        };
    }
};
