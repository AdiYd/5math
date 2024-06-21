import './User.css';
import { User } from '../..';
import { useContext, useEffect, useState } from 'react';
import PrincipleDoc from '../../assets/Documents/PrincipleDoc.docx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import wordIcon from './wordLogo.svg';
import { useNavigate } from 'react-router-dom';
import { debug } from '../../assets/function/functions';


function onClickHandler(e) {

}

function UserZone({ ...props }) {
    const user = useContext(User);
    const navigate = useNavigate();
    const [msg, setMsg] = useState('No msg');

    useEffect(() => {
        if (!user.isAuth) {
            navigate('/Home')
        }
    }, [user, user.isAuth])

    useEffect(() => {
        debug('Im here');
        checkMe('myMessg')
    }, [])

    const wait = (duration) => {
        return new Promise((resolve) => setTimeout(() => resolve('nice'), duration))
    }

    const checkMe = async (msg) => {
        var a = await wait(1500);
        debug('Waited', a, true);
        setMsg(msg);
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
            <h1>{msg}</h1>

            <pre style={{ color: 'gray', fontFamily: 'var(--fontFamily)' }}>
                {String.raw`
                text here will displayed nicly
                with various tamplates`}
            </pre>
        </div>
    )
}

export default UserZone;