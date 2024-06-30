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
        }
    }

    addPass =  async({email, password}={})=>{
        const params = {
            TableName: 'Pass',
            Item: { email,password},
            ConditionExpression: `attribute_not_exists(email)`
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
    }

    queryItem = async ({ tableName = 'Users', key = 'email', value = '' } = {}) => {
        const params = {
            TableName: tableName,
            KeyConditionExpression: `#${key} = :value`,
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

    updateItem = async ({tableName='Users',keyVal, attrName, attrVal}={})=>{
        const updateExpression = 'SET #attrName = :attrValue';
        const expressionAttributeValues = {
            ':attrValue': attrVal
        };
        const expressionAttributeNames = {
            '#attrName': attrName
        };
        const params = {
            TableName: tableName,
            Key: keyVal,
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: expressionAttributeValues,
            ExpressionAttributeNames: expressionAttributeNames,
            ReturnValues: 'UPDATED_NEW' // Optionally, you can return the updated attributes
          };
          debug('Trying to update with: ', params, false);
        try {
            const result = await this.dynamoDB.update(params).promise();
            debug('Update succeeded');
        } catch (error) {
            debug('Failed to update item:', error);
        }
    };

    fetchDB = async (user) => {
        if (user.isAdmin){
            const res = await this.#loadDB().then(data=>this.isActive = true);
            return res;
        }
    }

    #loadDB = async ()=>{
        // Loading users
        const usersData = await this.dynamoDB.scan({TableName: 'Users'}).promise();
        this.usersList = [...usersData.Items];
        this.usersEmails = usersData.Items.map((user) => user.email);
        this.usersDict = {};
        for (let user of this.usersList) {
            this.usersDict[user.email] = user;
        }
        // Loading leads from Quick signup
        const leadsData = await this.dynamoDB.scan({TableName:"Users_Leads"}).promise();
        this.leads = [...leadsData.Items];
        this.leadsDict = {};
        for( let item of this.leads){
            this.leadsDict[item.email] = item;
        } 

        const visitorsHomeData =  await this.dynamoDB.scan({TableName:"Visitors_Home"}).promise();
        this.visitorsHomeList= [...visitorsHomeData.Items];
        this.uniqueVisitosHome = this.visitorsHomeList.length;
        this.visitorsHomeDict = {};
        for( let item of this.visitorsHomeList){
            this.visitorsHomeDict[item.ip] = item;
        } 
        return visitorsHomeData;
        // debug(this,true);
    }

    scanItems = async ({ tableName = 'Users' } = {}) => {
        const params = {
            TableName: tableName
        };
        try {
            const data = await this.dynamoDB.scan(params).promise();
            debug('Data fetched successfully:', data, true);
            return data.Items
        } catch (err) {
            debug('Error fatching data:', err, true);
        }
    };

}
