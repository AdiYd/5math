import './User.css';
import { User } from '../..';
import { USERS } from "../App";
import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { debug } from '../../assets/function/functions';
import DBzone from '../../components/DBzone';
import { useColor } from 'react-color-palette';
import { THEME_COLORS } from '../../components/Header';
import ColorPickerCustom from '../../components/ColorPicker';
import { onLogoClickHandler } from '../../components/Header';
import { height, width } from '@fortawesome/free-brands-svg-icons/fa42Group';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';





function UserZone({ ...props }) {
    const user = useContext(User);
    const [color, setColor] = useState(JSON.parse(localStorage.getItem('themeColor'))?.color);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.isAuth) {
            navigate('/Home')
        }
    }, [user, user.isAuth])

    const onClickHandler = (e) => {
        debug('Button clicked!');
    }

    const setThemeColor = (e, colorName, hex, rgb)=>{
        let colorDict = {
            color: `rgb(${rgb.r},${rgb.g},${rgb.b})`,
            alpha: `rgba(${rgb.r},${rgb.g},${rgb.b},0.5)`
        }
        localStorage.setItem('themeColor', JSON.stringify(colorDict));
        onLogoClickHandler(undefined,true);
        setColor(colorDict.color);
    }
    const userDict = {
        ["אימייל"]: user.email,
        ['הקורסים שלי']: user.courses ? (user.courses !== '*' ? user.courses: 'לא קיימים קורסים בסל'): 'לא קיימים קורסים בסל' ,
        ["בחירת צבע לאתר"]: 
        <div className='flex center gap1'>
            <ColorPickerCustom  
                title='בחירת צבע'
                defaultColor={color}
                width={15}
                hideAlpha={true}
                style={{width:'15vw', height:'15vh', borderRadius:'8px'}}
                callback={setThemeColor} />
            <FontAwesomeIcon 
                title='איפוס צבע'
                className='pointer opacityHover'
                onClick={()=>{localStorage.removeItem('themeColor');onLogoClickHandler(undefined,true)}}
                icon={faArrowsRotate} />
        </div>
    }

    let userMenu = <div className='flex center gap2'>
                       {Object.keys(userDict).map((item, i)=>(
                                <section key={i} className='border squarish flex columns p3 m3 centerAlign'>
                                    <span 
                                    style={{  padding:'0.5em',
                                    borderRadius: '8px 8px 0px 0px',
                                    background: 'var(--themeGreenLight)'}}
                                    className='flex center'><h5>{item}</h5></span>
                                    <span 
                                    style={{  padding:'0.5em'}}
                                    className='flex center'>{userDict[item]}</span>
                                </section>
                       ))}
                    </div>


    return (user.isAuth &&
        <div className='UserZone'>
            <div className='flex center'>
                <h2> שלום, {user.name} </h2>
            </div>
            <span><p>פה ניתן לראות מידע על הפרטים, הקורסים והתשלומים שלך</p></span>
            {userMenu}
            <div className='flex gap2 ma2 center'>
                <button> כפתור האתר </button>
                <button className='themeBorder'> כפתור האתר </button>
            </div>
            {user.isAdmin && <DBzone />}

        </div>

    )
}

export default UserZone;