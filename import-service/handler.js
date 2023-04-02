'use strict';

const AWS = require('aws-sdk');
AWS.config.update({ region: "eu-west-1" });
const s3 = new AWS.S3({signatureVersion: 'v4'});
const BUCKET = 'import-service-aws';

module.exports.handler = async (event) => {
    const fileName = event.queryStringParameters.name;
    const key = `uploaded/${fileName}`;
    const params = {
        Bucket: BUCKET,
        Key: key,
        Expires: 60,
        ContentType: 'text/csv',
    };

    try {
        const signedUrl = await s3.getSignedUrlPromise('putObject', params);
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: signedUrl,
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: 'Error generating signed URL',
        };
    }
};
