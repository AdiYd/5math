import AWS, { AccessAnalyzer } from 'aws-sdk';

import { debug } from './functions';

export default class DBaccess {
    constructor() {
        let config = {
            region: process.env.REACT_APP_AWS_REGION,
            accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
        };
        AWS.config.update(config);
        this.dynamoDB = new AWS.DynamoDB.DocumentClient();
        setTimeout(() => {
            this.scanItems()
        }, 600);
    }

    addItem = async ({ tableName = 'Users', item, uniqueKey = 'email' } = {}) => {
        if (item) {
            const params = {
                TableName: tableName,
                Item: { ...item, createdAtTime: String(new Date()), courses: item.courses || '*' },
                ConditionExpression: `attribute_not_exists(${uniqueKey})`
            }

            try {
                const data = this.dynamoDB.put(params).promise().catch(err => {
                    if (err.code === 'ConditionalCheckFailedException') {
                        debug('User already exists');
                    } else {
                        debug('Unable to add item. Error JSON:', JSON.stringify(err, null, 2));
                    }
                });
            } catch (error) {
                debug('This is Adding error: ', error, false)
            }
            this.scanItems();
        }
    }

    queryTable = async ({ tableName = 'Users', key = 'email', value = '' } = {}) => {
        const params = {
            TableName: tableName,
            KeyConditionExpression: `#${key} = : value`,
            ExpressionAttributeNames: {
                [`#${key}`]: key
            },
            ExpressionAttributeValues: {
                ':value': value.toLowerCase()
            }
        };

        try {
            const data = await this.dynamoDB.query(params).promise();
            debug('Query succeeded:', data, true);
            return data.Items;
        } catch (err) {
            debug('Error querying data:', err, true);
            return [];
        }

    }

    scanItems = async ({ tableName = 'Users' } = {}) => {
        const params = {
            TableName: tableName
        };
        try {
            const data = await this.dynamoDB.scan(params).promise();
            debug('Data fetched successfully:', data, true);
            this.usersList = [...data.Items];
            this.usersEmails = data.Items.map((user) => user.email);
            this.usersDict = {};
            for (let user of this.usersList) {
                this.usersDict[user.email] = user;
            }
            this.active = true;
            return data.Items
        } catch (err) {
            debug('Error fatching data:', err, true);
        }
    };

    getUsers() {

    }
}
