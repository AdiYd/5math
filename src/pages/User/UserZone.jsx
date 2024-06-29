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
import { onLogoClickHandler , setAppRaduis} from '../../components/Header';
import { height, width } from '@fortawesome/free-brands-svg-icons/fa42Group';
import { faArrowsRotate, faGear } from '@fortawesome/free-solid-svg-icons';





function UserZone({ ...props }) {
    const user = useContext(User);
    const [color, setColor] = useState(JSON.parse(localStorage.getItem('themeColor'))?.color);
    const [buttonRadius, setButtonRadius] = useState(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.isAuth) {
            navigate('/Home')
        }
    }, [user, user.isAuth])

    const setRadius = (type) => {
        setButtonRadius(type);
        localStorage.setItem('themeRadius',type);
        setAppRaduis({type});
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
        ["האימייל שלי"]: user.email,
        ['הקורסים שלי']: user.courses ? (user.courses !== '*' ? user.courses: 'לא קיימים קורסים בסל'): 'לא קיימים קורסים בסל' ,
        ['התשלומים שלי']: !user.payment ?  "₪ 0": `₪ ${String(user.payment)}`,
        
    }

    let userMenu = <div className='flex center'>
                       {Object.keys(userDict).map((item, i)=>(
                                <section key={i} className='border squarish flex columns p3 m3 centerAlign'>
                                    <span 
                                    style={{  padding:'0.5em',
                                    borderRadius: '8px 8px 0px 0px',
                                    background: 'var(--themeGreenLight)'}}
                                    className='flex center'><h5>{item}</h5></span>
                                    <span 
                                    style={{  padding:'0.5em'}}
                                    className='flex ltr center'>{userDict[item]}</span>
                                </section>
                       ))}
                    </div>

    let colorPicker = <div className='flex gap2 p2 m2'>
                        <div>
                            <p style={{fontWeight:'500'}}>בחירת צבע לאתר:</p>
                        </div>
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
                     </div>

    let radiusPicker = <div className='flex gap2 p2 m2'>
                        <div>
                            <p style={{fontWeight:'500'}}>בחירת סגנון כפתור לאתר:</p>
                        </div>
                        <div className='flex center gap1'>
                                <button className={`${buttonRadius === 'r'? '':'themeBorder'} small`}
                                onClick={()=>setRadius('r')}
                                 style={{borderRadius: '25px'}}> אתר עגול</button>
                                <button className={`${buttonRadius === 's'? '':'themeBorder'} small`}
                                onClick={()=>setRadius('s')}
                                 style={{borderRadius: '10px'}}> אתר מעוגל</button>
                                <button className={`${buttonRadius === 'q'? '':'themeBorder'} small`}
                                onClick={()=>setRadius('q')}
                                 style={{borderRadius: '3px'}}> אתר מרובע</button>
                                <FontAwesomeIcon 
                                    title='איפוס הגדרות'
                                    className='pointer opacityHover'
                                    onClick={()=>{setRadius('d')}}
                                    icon={faArrowsRotate} />
                        </div>
                     </div>


    return (user.isAuth &&
        <div className='UserZone'>
            <div className='flex center'>
                <h2> שלום, {user.name} </h2>
            </div>
            <span><p style={{fontWeight:'500'}}>באיזור האישי שלך ניתן לראות את פרטי ההרשמה, הקורסים והתשלומים שלך
            <br/> ניתן גם לערוך את האתר</p></span>
            {userMenu}
            <div className='flex gap1' style={{alignItems:'center'}}>
                <FontAwesomeIcon icon={faGear} />
                <p style={{fontWeight:"600"}}>הגדרות אתר:</p>
            </div>
            <ul style={{paddingRight:'2em'}}>
                <li style={{listStyle:'disc'}}>{colorPicker}</li>
                <li style={{listStyleType:'disc'}}>{radiusPicker}</li>
            </ul>
            <div className='flex gap2 ma2 center'>
                <button className='squarish'> כפתור להמחשה </button>
            </div>
            {user.isAdmin && <DBzone />}

        </div>

    )
}

export default UserZone;