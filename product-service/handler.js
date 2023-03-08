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
                    title: "Book1",
                    description: "The book is good",
                    price: 1004
                },
                {
                    id: 2,
                    title: "Book2",
                    description: 'The book is sad',
                    price: 1005
                },
                {
                    id: 3,
                    title: "Book3",
                    description: "The book is nice",
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
