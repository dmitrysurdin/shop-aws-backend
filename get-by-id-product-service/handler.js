"use strict";

module.exports.getProductById = async (event) => {
    const { productId } = event.pathParameters;
    const products = [
        {
            id: '1',
            productName: "Book1",
            price: 1004
        },
        {
            id: '2',
            productName: "Book2",
            price: 1005
        },
        {
            id: '3',
            productName: "Book3",
            price: 1005
        },
    ];

    const mockProduct = products.find((p) => p.id === productId);
    try {
        if (!mockProduct) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: "Product not found" })
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(mockProduct)
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "An error occurred" })
        };
    }
};
