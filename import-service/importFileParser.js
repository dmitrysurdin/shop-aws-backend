'use strict';

const AWS = require('aws-sdk');
const sqs = new AWS.SQS();
const csv = require('csv-parser');

const s3 = new AWS.S3();

module.exports.handler = async (event) => {
    const bucket = event.Records[0].s3.bucket.name;
    const key = event.Records[0].s3.object.key;
    const records = [];

    if (!key.endsWith('.csv')) {
        return {
            statusCode: 400,
            body: 'Only CSV files are supported',
        };
    }

    const params = {
        Bucket: bucket,
        Key: key,
    };

    try {
        const stream = s3.getObject(params).createReadStream();
        stream.pipe(csv()).on('data', (record) => {
            records.push(record);
            console.log(`Sending record to SQS: ${JSON.stringify(record)}`);

            // Send each CSV record to SQS
            sqs.sendMessage({
                QueueUrl: 'https://sqs.eu-west-1.amazonaws.com/544468000878/my-import-queue',
                MessageBody: JSON.stringify(record)
            }, (err, data) => {
                if (err) {
                    console.error(`Error sending message to SQS: ${err}`);
                } else {
                    console.log(`Message sent to SQS: ${JSON.stringify(data)}`);
                }
            });
        })
            .on('end', () => {
                console.log(`Parsed ${records.length} records from CSV`);
        });
        return {
            statusCode: 200,
            body: 'File processed successfully',
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: 'Error processing file',
        };
    }
};
