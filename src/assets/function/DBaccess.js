import AWS, { AccessAnalyzer } from 'aws-sdk';
import { debug } from './functions';
const usersList = require('../json/users.json');
const privetKeys = require('../json/privet.json');
const dynamoDB = new AWS.DynamoDB.DocumentClient();


export default class DBaccess {
    constructor({ }) {
        AWS.config.update({
            region: privetKeys.region,
            accessKeyId: privetKeys.accessKeyId,
            secretAccessKey: privetKeys.secretAccessKey
        });
    }

    addItem = async ({ tableName = 'Users', item } = {}) => {
        if (item) {
            const params = {
                TableName: tableName,
                Item: item,
                ConditionExpression: 'attribute_not_exists(email)'
            };
            dynamoDB.put(params, (err, data) => {
                if (err) {
                    if (err.code === 'ConditionalCheckFailedException') {
                        debug('Item already exists:', JSON.stringify(err, null, 2));
                    } else {
                        debug('Unable to add item. Error JSON:', JSON.stringify(err, null, 2));
                    }
                }
                else {
                    debug('Added item:', item, true);
                }
            });
        }
    }

    queryTable = async ({ tableName = 'Users' } = {}) => {
        const params = {
            TableName: tableName,
            KeyConditionExpression: '#email = :adiyehuda89@gmail.com',
            // ExpressionAttributeNames: {
            //     '#email': 'adiyehuda89@gmail.com'
            // }
        };

        try {
            const data = await dynamoDB.query(params).promise();
            debug('Query succeeded:', data, true);
            return data.Items;
        } catch (err) {
            debug('Error querying data:', err);
            return [];
        }

    }


    scanItems = async ({ tableName = 'Users' } = {}) => {
        const params = {
            TableName: tableName
        };

        try {
            const data = await dynamoDB.scan(params).promise();
            debug('Data fetched successfully:', data, true);
            return data.Items
        } catch (err) {
            debug('Error fatching data:', err);
        }
    };

}
