import './User.css';
import { User } from '../..';
import { USERS } from "../App";
import { useContext, useEffect, useState } from 'react';
import PrincipleDoc from '../../assets/Documents/PrincipleDoc.docx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import wordIcon from './wordLogo.svg';
import { useNavigate } from 'react-router-dom';
import { debug } from '../../assets/function/functions';
import * as AWS from 'aws-sdk';
import { DynamoDB, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";

const REGION = "REGION";
const IDENTITY_POOL_ID = "myPoolID"; // An Amazon Cognito Identity Pool ID.

const dynamoClient = new DynamoDBClient({
    region: REGION,
    credentials: fromCognitoIdentityPool({
        client: new CognitoIdentityClient({ region: REGION }),
        identityPoolId: IDENTITY_POOL_ID,
    }),
});

export { dynamoClient };


function UserZone({ ...props }) {
    const user = useContext(User);
    const navigate = useNavigate();


    const onRead = () => {
        let params = {
            TableName: "Users"
        };

        docClient.scan(params, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                debug('This is data: ', data, true);
            }
        });
    };

    useEffect(() => {
        if (!user.isAuth) {
            navigate('/Home')
        }
    }, [user, user.isAuth])

    function onClickHandler(e) {
        onRead();
    }



    return (user.isAuth &&
        <div className='UserZone'>
            <div className='flex center'>
                <h2> שלום {user.name} </h2>
            </div>

            {user.isAdmin && <a href={PrincipleDoc} download="PrincipleDoc" className='flex center opacityHover gap1 pointer'>
                <img src={wordIcon}
                    style={{ width: '1em', height: '1em' }}
                    title='מסמך עקרונות' alt='Word document Icon' />
                לחץ להורדת מסמך עקרונות
            </a>}
            <div>
                <button onClick={onClickHandler}> click Me</button>
            </div>
        </div>
    )
}

export default UserZone;