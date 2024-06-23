import './User.css';
import { User } from '../..';
import { USERS } from "../App";
import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
            {user.isAdmin && <DBzone />}

        </div>

    )
}

export default UserZone;