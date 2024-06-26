import AWS, { AccessAnalyzer } from 'aws-sdk';

import { debug } from './functions';

// debug('This is your region: ',  process.env.REACT_APP_AWS_REGION,true);

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
            let additionalData = {
                createdAtTime: String(new Date()),
            }
            if (tableName==='Users'){
                additionalData.courses =  item.courses || '*' 
            }
            const params = {
                TableName: tableName,
                Item: { ...item,...additionalData},
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

    queryItem = async ({ tableName = 'Users', key = 'email', value = '' } = {}) => {
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
            const usersData = await this.dynamoDB.scan({TableName: 'Users'}).promise();
            const leadsData = await this.dynamoDB.scan({TableName:"Users_Leads"}).promise();
            debug('Data fetched successfully:', data, true);
            this.usersList = [...usersData.Items];
            this.usersEmails = usersData.Items.map((user) => user.email);
            this.leads = [...leadsData.Items];
            this.leadsDict = {};
            for( let item of this.leads){
                this.leadsDict[item.email] = item;
            }
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

}
