import './User.css';
import { User } from '../..';
import { useContext } from 'react';
import PrincipleDoc from '../../assets/Documents/PrincipleDoc.docx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import wordIcon from './wordLogo.svg';


function onClickHandler(e) {

}

function UserZone({ ...props }) {
    const user = useContext(User);
    return (
        <div className='UserZone'>
            <div className='flex center'>
                <h2> שלום {user.name} </h2>
            </div>

            <a href={PrincipleDoc} download="PrincipleDoc" className='flex center opacityHover gap1 pointer'>
                <img src={wordIcon}
                    style={{ width: '1em', height: '1em' }}
                    title='מסמך עקרונות' alt='Word document Icon' />
                לחץ להורדת מסמך עקרונות
            </a>


        </div>
    )
}

export default UserZone;