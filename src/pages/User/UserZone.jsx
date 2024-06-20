import './User.css';
import { User } from '../..';
import { useContext } from 'react';

function UserZone({ ...props }) {
    const user = useContext(User);
    return (
        <div className='UserZone'>
            <div className='flex center'>
                <h2> שלום {user.name} </h2>
            </div>

        </div>
    )
}

export default UserZone;