'use strict';

const AWS = require('aws-sdk');
const csv = require('csv-parser');

const s3 = new AWS.S3();

module.exports.handler = async (event) => {
    const bucket = event.Records[0].s3.bucket.name;
    const key = event.Records[0].s3.object.key;

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
        stream.pipe(csv()).on('data', (data) => {
            console.log(data);
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
