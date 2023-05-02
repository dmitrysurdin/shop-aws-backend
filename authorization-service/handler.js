'use strict';

const verifyUserToken = async (token) => {

    const encodedCreds = token.split(' ')[1];
    const buff = Buffer.from(encodedCreds, 'base64');
    const plainCreds = buff.toString('utf-8').split('=');
    const username = plainCreds[0];
    const password = plainCreds[1];

    const storedUserPassword = process.env[username];
    return !storedUserPassword || storedUserPassword != password ? 'Deny' : 'Allow';
};

const generatePolicy = async (token, resource, effect = 'Allow') => {
    const principalId = token.split(' ')[1];

    return {
        principalId,
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: effect,
                    Resource: resource
                }
            ]
        }
    };
};

module.exports.basicAuthorizer = async (event, ctx, cb) => {
    try {
        const isTokenAuthorization = event?.type === 'TOKEN';
        const authorizationToken = event?.authorizationToken;

        if (!isTokenAuthorization || !authorizationToken) {
            cb('Unauthorized');
        }

        const effect = await verifyUserToken(authorizationToken);
        const policy = await generatePolicy(authorizationToken, event.methodArn, effect);

        cb(null, policy);
    } catch (error) {
        cb(error, null);
    }
};