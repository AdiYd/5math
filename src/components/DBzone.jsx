
import { useState, useEffect, useRef } from "react";
import '../pages/App.css';
import AWS, { AccessAnalyzer } from 'aws-sdk';
import { debug } from "../assets/function/functions";
const usersList = require('../assets/json/users.json');

AWS.config.update({
    region: 'eu-north-1',  //'il-central-1'
    accessKeyId: 'AKIAZQ3DNSVG2MRTUGLT',
    secretAccessKey: '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'
});


function DBzone({ ...props }) {
    const [update, setUpdate] = useState(false);
    const msg = useRef('Nothing to show');
    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    const addItem = async ({ tableName = 'Users', item } = {}) => {
        if (item) {
            const params = {
                TableName: tableName,
                Item: item,
                ConditionExpression: 'attribute_not_exists(email)'
            };
            dynamoDB.put(params, (err, data) => {
                if (err) {
                    if (err.code === 'ConditionalCheckFailedException') {
                        console.error('Item already exists:', JSON.stringify(err, null, 2));
                    } else {
                        console.error('Unable to add item. Error JSON:', JSON.stringify(err, null, 2));
                    }
                }
                else {
                    debug('Added item:', item, true);
                }
            });
        }
    }

    const queryTable = async ({ tableName = 'Users' } = {}) => {
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
        } catch (error) {
            console.error('Error querying data:', error);
            return [];
        }

    }


    const scanData = async ({ tableName = 'Users' } = {}) => {
        const params = {
            TableName: tableName
        };

        try {
            const data = await dynamoDB.scan(params).promise();
            debug('Data fetched successfully:', data);
        } catch (error) {
            console.error('Error fatching data:', error);
        }
    };
    for (let itm in usersList) {
        let obj = {
            ...usersList[itm],
            courses: '*'
        }
        // debug('Ready to add this item:', obj, true);
        // addItem({ item: obj });
    }
    // addItem();
    // scanData();
    // queryTable();

    return (
        <div className="flex columns center border squarish" style={{ padding: '5em', background: 'aliceblue' }}>
            <h2> Page {"General"}</h2>
            <pre>
            </pre>
        </div>
    );
}

export default DBzone;