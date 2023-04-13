const AWS = require('aws-sdk');
const sns = new AWS.SNS();

exports.handler = async (event) => {
    const products = event.Records.map((record) => JSON.parse(record.body));

    // Create products in the database
    await Promise.all(products.map((product) => createProduct(product)));

    // Publish a message to the SNS topic
    const message = `Created ${products.length} products`;
    const params = {
        Message: message,
        TopicArn: 'createProductTopic'
    };
    await sns.publish(params).promise();
};