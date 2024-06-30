import { debug } from '../assets/function/functions';
import { Children, useEffect, useState, useContext } from 'react';
import { toggleOff, toggleOn } from '../pages/Login';
import useWindowDimensions from '../assets/function/useWindowDimentions';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { User } from '..';
import Prompt from './PromptDiv';
import '../assets/style/style.css';
import './Components.css';
import './header.css';
import imgLogo from '../assets/img/5Math.svg';
import { Link, Outlet, useNavigate } from "react-router-dom";
import Avatar from 'react-avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faBars, faCaretDown, faGear, faSquareArrowUpRight, faUser } from '@fortawesome/free-solid-svg-icons';
import { PAGES } from '../pages/App';
import Formulas from '../pages/Formula';
import Logo from './Logo';
import { dataBase } from '../pages/App';
import { MathJax } from 'better-react-mathjax';

const DBG_PROPS = {
    color: 'darkred',
    background: 'azul',
    fontWeight: 'bold'
}
export const MOBILE_SCREEN_WIDTH = 680;
export const THEME_COLORS = ['var(--ThemeGPTBlueV)', 'var(--ThemeGPTBlue)', 'var(--ThemeGPTOrangeV)', 'var(--ThemeGPTOrangeDeep)', 'var(--ThemeGPTRedV)', 'var(--ThemeGPTRed)', 'var(--ThemeGPTPurpleV)', 'var(--ThemeGPTPurpleLightV)', 'var(--ThemeGPTGreenV)', 'var(--ThemeGPTGreen)'];


const Formula = (color, isMobile = false) => {
    color = color ? 'var(--themeColor)' : undefined;
    return (<svg
        id='fxLogo'
        xmlns="http://www.w3.org/2000/svg"
        height={isMobile ? '2em' : '1.5em'}
        viewBox="0 -960 960 960"
        width={isMobile ? '2em' : '1.5em'}
        style={{ fill: color }}>
        <path d="M400-240v-80h62l105-120-105-120h-66l-64 344q-8 45-37 70.5T221-120q-45 0-73-24t-28-64q0-32 17-51.5t43-19.5q25 0 42.5 17t17.5 41q0 5-.5 9t-1.5 9q5-1 8.5-5.5T252-221l62-339H200v-80h129l21-114q7-38 37.5-62t72.5-24q44 0 72 26t28 65q0 30-17 49.5T500-680q-25 0-42.5-17T440-739q0-5 .5-9t1.5-9q-6 2-9 6t-5 12l-17 99h189v80h-32l52 59 52-59h-32v-80h200v80h-62L673-440l105 120h62v80H640v-80h32l-52-60-52 60h32v80H400Z" />
    </svg>)
}

//    ******************************    Change Radius onClick at the Title     ******************************//
let round = 0;

export const onTitleClickHandler = ()=> {
    debug('This is logo click with round = ', round, { color: 'darkgreen', background: 'lightgrey', fontWeight: 'bold', fontSize: 15 })
    let themeRadius = document.querySelector(':root');
    if (round === 0) {       // Make all buttons Squarish
        themeRadius.style.setProperty('--ButtonRadius', '6px');
        themeRadius.style.setProperty('--PlotRadius', '4px');
        themeRadius.style.setProperty('--HeaderMenuRadius', '7px 7px 0px 0px');
        themeRadius.style.setProperty('--HeaderBottomBorderRadius', '0px');
        round += 1;
    }
    else if (round === 1) {  // 3D effect (box-shadow)
        let a = document.getElementsByClassName('button');
        Object.values(a).forEach(element => {
            element.classList.add('D3');
        });
        round += 1;
    }
    else if (round === 2) { // Rounder buttons
        themeRadius.style.setProperty('--ButtonRadius', '25px');
        themeRadius.style.setProperty('--PlotRadius', '12px');
        themeRadius.style.setProperty('--HeaderMenuRadius', '25px 25px 0px 0px');
        themeRadius.style.setProperty('--HeaderBottomBorderRadius', '0px 0px 20px 20px');
        round += 1;
    }
    else if (round === 3) {   // Default (soft round)
        let a = document.getElementsByClassName('button');
        themeRadius.style.setProperty('--ButtonRadius', '15px');
        themeRadius.style.setProperty('--PlotRadius', '7px');
        Object.values(a).forEach(element => {
            element.classList.remove('D3');
        });
        round = 0;
    }
    // else if (round === 4) {  // Gradient
    //     let a = document.getElementsByClassName('button');
    //     Object.values(a).forEach(element => {
    //         element.classList.remove('border');
    //         element.classList.add('gradient');
    //     });
    //     round += 1;
    // }
    // else if (round === 5) {  // Default
    //     let a = document.getElementsByClassName('button');
    //     Object.values(a).forEach(element => {
    //         element.classList.remove('gradient');
    //     });
    //     round = 0;
    // }

}

//    ******************************        END          ******************************//

//    ******************************    Change Theme color onClick at the LOGO picture      ******************************//
export const onLogoClickHandler = (event, fromDB = false, def=false) => {
    let element = event ? event.target : undefined, randomColor, randomColorAlpha;
    let randColor = THEME_COLORS[Math.floor(Math.random() * THEME_COLORS.length)];
    let themeColor = document.querySelector(':root');
    if (def){
        let style = getComputedStyle(document.body);
        [randomColor, randomColorAlpha] = [ style.getPropertyValue('--ThemeGPTBlueV'),style.getPropertyValue('--ThemeGPTBlueVAlpha')];
    }
    else if (!fromDB) {
        randomColor = randColor;
        randomColorAlpha = randColor.slice(0, randColor.indexOf(')')) + 'Alpha' + randColor.slice(randColor.indexOf(')'));
    }
    else if (fromDB && localStorage.getItem('themeColor')) {
        let colors = JSON.parse(localStorage.getItem('themeColor'));
        randomColor = colors.color;
        randomColorAlpha = colors.alpha;
    }
    else if (fromDB){
        let style = getComputedStyle(document.body);
        [randomColor, randomColorAlpha] = [ style.getPropertyValue('--ThemeGPTBlueV'),style.getPropertyValue('--ThemeGPTBlueVAlpha')];
    }
    else {
        let pickLightColor = (min) => (Math.floor(Math.random() * (255 - min + 1) + min));
        let minShade = 80;
        let [r, g, b] = [pickLightColor(minShade), pickLightColor(minShade), pickLightColor(minShade)];
        randomColor = 'rgb(' + r + ',' + g + ',' + b + ')';
        randomColorAlpha = 'rgba(' + r + ',' + g + ',' + b + ',0.2)';
    }
    themeColor.style.setProperty('--themeColor', randomColor);
    themeColor.style.setProperty('--themeColorAlpha', randomColorAlpha);
    if (!def || !fromDB){
        localStorage.setItem('themeColor', JSON.stringify({ color: randomColor, alpha: randomColorAlpha }));
    }
    if (element) {
        element.animate(
            { transform: 'rotate(360deg)' },
            { duration: 800, iterations: 1 }
        );
    }
}
//    ******************************        END          ******************************//

export const setAppRaduis = ({type='d', fromDB = false}={})=>{
    let style = getComputedStyle(document.body);
    let rootSelector = document.querySelector(':root');
    if (fromDB && localStorage.getItem('themeRadius')) {
        type = localStorage.getItem('themeRadius');
    }
    switch (type){
        case 'r':
            rootSelector.style.setProperty('--themeBorderRadius','');
            rootSelector.style.setProperty('--cardRadius','30px');
            rootSelector.style.setProperty('--buttonRadius','17px');
            rootSelector.style.setProperty('--buttonSquarishRadius','20px');
            rootSelector.style.setProperty('--buttonRounderRadius','');
            break;
        case 's':
            rootSelector.style.setProperty('--themeBorderRadius','15px');
            rootSelector.style.setProperty('--cardRadius','10px');
            rootSelector.style.setProperty('--buttonRadius','8px');
            rootSelector.style.setProperty('--buttonSquarishRadius','');
            rootSelector.style.setProperty('--buttonRounderRadius','13px');
            break;
        case 'q':
            rootSelector.style.setProperty('--themeBorderRadius','4px');
            rootSelector.style.setProperty('--cardRadius','5px');
            rootSelector.style.setProperty('--buttonRadius','');
            rootSelector.style.setProperty('--buttonSquarishRadius','4px');
            rootSelector.style.setProperty('--buttonRounderRadius','7px');
            break;
        default:
            rootSelector.style.setProperty('--themeBorderRadius','30px');
            rootSelector.style.setProperty('--cardRadius','15px');
            rootSelector.style.setProperty('--buttonRadius','4px');
            rootSelector.style.setProperty('--buttonSquarishRadius','10px');
            rootSelector.style.setProperty('--buttonRounderRadius','20px');
            break;
    }
}

const setUserSettings = ({def = false}={})=>{
    if (def){
        onLogoClickHandler(undefined, true,true);
        setAppRaduis({type:'d',fromDB: false});
    }
    else {
        if (Boolean(localStorage.getItem('themeColor'))) {
            onLogoClickHandler(undefined, true);
        }
        if (Boolean(localStorage.getItem('themeRadius'))) {
            setAppRaduis({fromDB: true});
        }
    }
}


export default function Header({ currentPage }) {
    const { width, height } = useWindowDimensions();
    const navigate = useNavigate();
    const user = useContext(User);
    const [pageName, setPageName] = useState(currentPage);
    const [formula, setFormula] = useState(false);
    const [userMenu, setUserMenu] = useState(false);
    const [update, setUpdate] = useState(false);
    // const [menu, setMenu] = useState(false);
    useEffect(() => {
        // debug('Changing header pageName after page Change: ', currentPage, true);
        setPageName(currentPage);
    }, [currentPage])

    useEffect(() => {
        let relPath = window.location.href.slice(window.location.href.lastIndexOf('/') + 1);
        currentPage = relPath;
        // debug('Changing header pageName after url: ', currentPage);
        if (currentPage.toLowerCase() === '5math') {
            currentPage = 'Home'
            navigate('Home')
            return;
        }
        if (currentPage in PAGES) {
            setPageName(currentPage);
        }
    }, [window.location.href])

    useEffect(() => {
        setUserSettings({def: !user.isAuth});
    }, [user.isAuth])
    let isMobile = Boolean(width <= MOBILE_SCREEN_WIDTH);

    function onClickHandler(e) {
        setUpdate(p => !p)
    }

    let formulaDiv =   <div
        title='דף נוסחאות'
        id='formulaLogo'
        onClick={() => setFormula(p => !p)}
        className={'pointer'}>
        {Formula(formula ? true : undefined, isMobile)}
    </div>

    let loginDiv = <div onMouseLeave={() => { setUserMenu(false) }}
        style={{ position: 'relative', textAlign: '-webkit-center' }}
        className='fitH'>
        {/* <button id='loginButton' className='round'> התחבר </button> */}
        {!user.isAuth ? <FontAwesomeIcon
            onClick={() => { navigate('Login'); setPageName('Login') }}
            title='איזור אישי'
            // onClick={() => { setUserMenu(p => !p) }}
            style={{ cursor: 'pointer', alignSelf: 'end', height: isMobile ? '1.5em' : '' }}
            size='lg'
            icon={faUser}
            color={pageName === 'Login' ? 'var(--themeColor)' : ''} />
            : <div onMouseEnter={() => { setUserMenu(true) }}>
                <Avatar
                    onClick={() => setUserMenu(p => !p)}
                    title='איזור אישי'
                    name={user.name}
                    src={user.picture}
                    className="avatar12a"
                    style={{
                        border: `1.2px solid ${userMenu ? 'var(--themeColor)' : 'white'}`,
                        boxShadow: 'var(--boxShadowHeader2)'
                    }}
                    round={true}
                    textSizeRatio={2}
                    color="var(--themeColor)"
                    size={isMobile ? '25' : '30'}>
                </Avatar>
                <SubMenu
                    isMobile={isMobile}
                    style={{ left: '0%' }}
                    showMenu={userMenu}>
                    <p className='m0 pb1 w500'>{user.name}</p>
                    <p className='m0 pb3 w500'>{user.email}</p>
                    <span 
                        onClick={() => {navigate('Personal'); setUserMenu(false)}}
                        className='pointer flex center gap1 ma1 alignCenter hoverTheme'>
                        <FontAwesomeIcon icon={faGear}
                        style={{ width: '1em' }} />
                        <a>איזור אישי</a>
                    </span>
                    <span
                        onClick={() => { setUserMenu(false); user.callback({ disconnect: true }) }}
                        className='flex center pointer gap1 ma1 hoverTheme alignCenter'>
                        <FontAwesomeIcon
                            style={{ width: '1em' }}
                            // size='xs'
                            title='התנתקות'
                            icon={faArrowRightFromBracket} />
                        <a>יציאה</a>
                    </span>
                </SubMenu>
            </div>}
    </div>


    return (
        <>
            {!user.isAuth && <div style={{ display: 'none' }}>
                <GoogleLogin
                    onSuccess={res => {
                            let userData = jwtDecode(res.credential);
                            debug('Google Res: ', res, userData, DBG_PROPS);
                            if (userData) {
                                let userObj = {
                                    name: userData.name.toLowerCase(),
                                    email: userData.email.toLowerCase(),
                                    google: true,
                                    isAuth: true,
                                    picture: userData.picture,
                                    jwt: res.credential
                                }
                                dataBase.queryItem({value:userObj.email}).then(res=>{
                                    if (res.length){
                                        user.callback({userObj: {...res[0],...userObj}});
                                    }
                                    else {
                                        debug('User not found, Adding...');
                                        dataBase.addItem({ item: userObj });
                                        user.callback({ userObj });
                                    }
                                    })
                                .catch(err=>{
                                    console.error('Error with google Auth: ', err);
                                })
                            }
                            setUpdate(p => !p)
                    }}
                    onError={() => {
                        debug('Google Login Failed!', DBG_PROPS);
                    }}
                    useOneTap
                />
            </div>}

            <div
                id='header'
                style={{ gridTemplateColumns: !isMobile ? '1fr 10fr 1fr 1fr' : '' }}
                className={`headerPad ${user.darkMode ? 'darkModeHeader' : ''}`}>
                {isMobile ?
                    <div className='flex between alignCenter ma1 ml3' style={{ position: 'relative' }}>
                        <Menu
                            isMobile={isMobile}
                            pages={PAGES}
                            currentPage={pageName} />
                        <div>
                            <Logo direction='rows'
                                alignItems={'center'}
                                fontSize='1.5em'
                                rotate={false}
                                imgWidth='3em'
                                imgHeight='2em'
                                textDirection='ltr'
                                gap='3em' />
                        </div>
                        {formulaDiv}
                        {loginDiv}
                    </div> :
                    <>
                        <div
                            id='menuLogo'
                            className='flex center m3 round fit fitH pointer'>
                            <img
                                id={'imgLogo'}
                                className='dropShadow'
                                onClick={onLogoClickHandler}
                                src={imgLogo}
                                title='5Math'
                                alt='5Math' />
                        </div>
                        <Menu
                            isMobile={isMobile}
                            pages={PAGES}
                            currentPage={pageName} />
                        {formulaDiv}
                        {loginDiv}
                    </>}

                {false &&
                    <>
                        <div
                    id='menuLogo'
                    className='flex center m3 round fit fitH pointer'>
                    <img
                        id={'imgLogo'}
                        className='dropShadow'
                        style={{ width: '3em', height: '2.2em' }}
                        onClick={onLogoClickHandler}
                        src={imgLogo}
                        title='5Math'
                            alt='5Math' />
                    </div>

                    </>}


            </div>
            <div className={`App-main ${user.darkMode ? 'darkMode' : ''}`}>
                <Prompt show={formula} callBack={() => setFormula(p => !p)}>
                    <Formulas />
                </Prompt>
                {/* {refSheet &&
                    <Formula showDiv={refSheet} callBack={() => { setRefSheet(p => !p) }} />
                } */}
                <Outlet />
            </div>   
        </>
    );
}



function Menu({ pages, currentPage, isMobile = false, ...props }) {
    const [pageName, setPageName] = useState(currentPage);
    const [subMenu, setSubmenu] = useState({ Courses: false, Exercise: false })
    const [mobileMenu, setMobileMenu] = useState(false);
    useEffect(() => {
        setPageName(currentPage);
    }, [currentPage])

    var menu = <ul className={!isMobile ? 'flex around' : ` flex columns ${mobileMenu ? 'appearIn' : ''}`}
                onPointerLeave={() => setMobileMenu(false)}
                onTouchEnd={() => setMobileMenu(false)}
                style={{ visibility: isMobile ? mobileMenu ? 'visible' : 'hidden' : '', position: isMobile ? 'absolute' : '' }}
                id={isMobile ? 'mobile' : 'menuCategory'}>
                {Object.keys(pages).map((pageRout, index) =>
                    (pageRout in subMenu) && !mobileMenu ?
                        <div
                            key={index}
                            onMouseLeave={() => { setSubmenu(p => ({ ...p, [pageRout]: false })) }}
                            style={{ position: 'relative' }}>
                            <Link
                                key={index}
                                onClick={() => { setPageName(pageRout) }}
                                to={pageRout}>
                                <div className='flex gap1 center alignCenter'>
                                    <li
                                        // onClick={() => { setSubmenu(p => ({ ...p, [pageRout]: true })) }}
                                        className={`fit ${pageName === pageRout ? 'activePage' : ''}`}
                                        key={index}
                                    >{PAGES[pageRout].name}</li>
                                    <div
                                        className='flex mr1'
                                        onClick={() => { setSubmenu(p => ({ ...p, [pageRout]: !p[pageRout] })) }}
                                        onMouseEnter={() => { setSubmenu(p => ({ ...p, [pageRout]: true })) }}>
                                    <FontAwesomeIcon icon={faCaretDown}
                                        size='lg'
                                        color={subMenu[pageRout] ? 'var(--themeColor)' : ''} />
                                </div>
                            </div>
                        </Link>
                        <SubMenu showMenu={subMenu[pageRout] && !mobileMenu} horizontal={false} >
                                    <a className='hoverTheme flex center ma2 alignCenter pointer'>{'וקטורים'}</a>
                                    <a className='hoverTheme flex center ma2 alignCenter pointer'>{'אנליטית'}</a>
                                    <a className='hoverTheme flex center ma2 alignCenter pointer'>{'מרוכבים'}</a>
                                    <a className='hoverTheme flex center ma2 alignCenter pointer'>{"חשבון דיפרנציאלי ואינטגרלי"}</a>
                                    <a className='hoverTheme flex center ma2 alignCenter pointer'>{"משוואות מעריכיות"}</a>
                        </SubMenu>
                    </div> :
                    <div
                        key={index}
                        style={{ position: 'relative' }}>
                        <Link
                            key={index}
                            onClick={() => setPageName(pageRout)}
                            to={pageRout}>
                            <li
                                className={`fit ${pageName === pageRout ? 'activePage' : ''}`}
                                key={index}
                            >{PAGES[pageRout].name}</li>
                        </Link>
                    </div>
                    )}
         </ul>

    return (
        <>
            {isMobile &&
                <div
                {...props}
                onClick={() => setMobileMenu(p => !p)}
                className='flex center m3 pr3'>
                <FontAwesomeIcon
                    icon={faBars}
                    className='pointer opacityHover'
                    size='2xl'
                    color={mobileMenu ? 'var(--themeColor)' : ''} />
                </div>}
            {menu}
        </>
    )
}


function SubMenu({
    showMenu = true,
    horizontal = false,
    isMobile = false,
    children,
    style = {},
    ...props }) {

    const [update, setUpdate] = useState(false);
    useEffect(() => {
        setUpdate(p => !p);
    }, [showMenu])


    return (
        <div
            id={isMobile ? 'subMenuMobile' : ''}
            style={{ display: showMenu ? '' : 'none', right: horizontal ? '-30%' : '', ...style }}
            className={`subMenu center ${!horizontal ? 'columns' : 'rows'}`}>
            {children}
        </div>
    )
}