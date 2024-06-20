import './User.css';
import { User } from '../..';
import { useContext, useEffect } from 'react';
import PrincipleDoc from '../../assets/Documents/PrincipleDoc.docx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import wordIcon from './wordLogo.svg';
import { useNavigate } from 'react-router-dom';


function onClickHandler(e) {

}

function UserZone({ ...props }) {
    const user = useContext(User);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user.isAuth) {
            navigate('/Home')
        }
    }, [user, user.isAuth])
    return (
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
            {[1, 2, 3]}

        </div>
    )
}

export default UserZone;