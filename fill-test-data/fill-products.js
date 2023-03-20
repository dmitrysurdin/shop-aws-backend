const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

AWS.config.update({ region: 'eu-west-1' });

const dynamodb = new AWS.DynamoDB.DocumentClient();

const products = [
    {
        id: uuidv4(),
        title: 'Product 1',
        description: 'This is product 1',
        price: 100,
    },
    {
        id: uuidv4(),
        title: 'Product 2',
        description: 'This is product 2',
        price: 200,
    },
    {
        id: uuidv4(),
        title: 'Product 3',
        description: 'This is product 3',
        price: 300,
    },
];

const putProducts = products.map((product) => ({
    PutRequest: {
        Item: product,
    },
}));

const paramsProducts = {
    RequestItems: {
        products: putProducts,
    },
};

dynamodb.batchWrite(paramsProducts, (err, data) => {
    if (err) console.log(err);
    else console.log(data);
});
