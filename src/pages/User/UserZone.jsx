import './User.css';
import { User } from '../..';
import { USERS } from "../App";
import { useContext, useEffect, useState } from 'react';
import PrincipleDoc from '../../assets/Documents/PrincipleDoc.docx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import wordIcon from './wordLogo.svg';
import { useNavigate } from 'react-router-dom';
import { debug } from '../../assets/function/functions';
import DBzone from '../../components/DBzone';




function UserZone({ ...props }) {
    const user = useContext(User);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.isAuth) {
            navigate('/Home')
        }
    }, [user, user.isAuth])

    const onClickHandler = (e) => {
        debug('Button clicked!');
    }


    return (user.isAuth &&
        <div className='UserZone'>
            <div className='flex center'>
                <h2> שלום {user.name} </h2>
            </div>

            {user.isAdmin && <a href={PrincipleDoc} download="PrincipleDoc" className='flex center opacityHover gap1 ma3 pointer'>
                <img src={wordIcon}
                    style={{ width: '1em', height: '1em' }}
                    title='מסמך עקרונות' alt='Word document Icon' />
                לחץ להורדת מסמך עקרונות
            </a>}
            <div className='ma3'>
                <button onClick={onClickHandler}> click Me</button>
            </div>
            <DBzone />
        </div>

    )
}

export default UserZone;