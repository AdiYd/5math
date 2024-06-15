import { debug } from '../assets/function/functions';
import { Children, useEffect, useState } from 'react';
import Prompt from './PromptDiv';
import '../assets/style/style.css';
import './Components.css';
import './header.css';
import imgLogo from '../assets/img/5Math.svg';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareArrowUpRight, faUser } from '@fortawesome/free-solid-svg-icons';
import { PAGES } from '../pages/App';
import Formulas from '../pages/Formula';

const DBG_PROPS = {
    color: 'darkred',
    background: 'azul',
    fontWeight: 'bold'
}

export const THEME_COLORS = ['var(--ThemeGPTBlueV)', 'var(--ThemeGPTBlue)', 'var(--ThemeGPTOrangeV)', 'var(--ThemeGPTOrangeDeep)', 'var(--ThemeGPTRedV)', 'var(--ThemeGPTRed)', 'var(--ThemeGPTPurpleV)', 'var(--ThemeGPTPurpleLightV)', 'var(--ThemeGPTGreenV)', 'var(--ThemeGPTGreen)'];
if (Boolean(localStorage.getItem('themeColor'))) {
    onLogoClickHandler(undefined, true);
}

const DropDown = (color) => {
    color = color === true ? 'var(--themeColor)' : color ? color : '#73716c';
    return (<svg xmlns="http://www.w3.org/2000/svg"
        height="1.5em" viewBox="0 -960 960 960" width="1.5em"
        fill={color}>
        <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
    </svg>)
}

const Formula = (color) => {
    color = color === true ? 'var(--themeColor)' : color ? color : '#000';
    return (<svg
        xmlns="http://www.w3.org/2000/svg"
        height="1.5em"
        viewBox="0 -960 960 960"
        width="1.5em"
        fill={color}>
        <path d="M400-240v-80h62l105-120-105-120h-66l-64 344q-8 45-37 70.5T221-120q-45 0-73-24t-28-64q0-32 17-51.5t43-19.5q25 0 42.5 17t17.5 41q0 5-.5 9t-1.5 9q5-1 8.5-5.5T252-221l62-339H200v-80h129l21-114q7-38 37.5-62t72.5-24q44 0 72 26t28 65q0 30-17 49.5T500-680q-25 0-42.5-17T440-739q0-5 .5-9t1.5-9q-6 2-9 6t-5 12l-17 99h189v80h-32l52 59 52-59h-32v-80h200v80h-62L673-440l105 120h62v80H640v-80h32l-52-60-52 60h32v80H400Z" />
    </svg>)
}

//    ******************************    Change Radius onClick at the Title     ******************************//
let round = 0;

function onTitleClickHandler() {
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
function onLogoClickHandler(event, fromDB = false) {
    let element = event ? event.target : undefined, randomColor, randomColorAlpha;
    let randColor = THEME_COLORS[Math.floor(Math.random() * THEME_COLORS.length)];
    let themeColor = document.querySelector(':root');
    if (!fromDB) {
        randomColor = randColor;
        randomColorAlpha = randColor.slice(0, randColor.indexOf(')')) + 'Alpha' + randColor.slice(randColor.indexOf(')'));
    }
    else if (fromDB && localStorage.getItem('themeColor')) {
        let colors = JSON.parse(localStorage.getItem('themeColor'));
        randomColor = colors.color;
        randomColorAlpha = colors.alpha;
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
    localStorage.setItem('themeColor', JSON.stringify({ color: randomColor, alpha: randomColorAlpha }));
    if (element) {
        debug('Logo Clicked!');
        element.animate(
            { transform: 'rotate(360deg)' },
            { duration: 800, iterations: 1 }
        );
    }
}
//    ******************************        END          ******************************//

// onLogoClickHandler(undefined, true)

export default function Header({ currentPage }) {
    const navigate = useNavigate();
    const [pageName, setPageName] = useState(currentPage);
    const [formula, setFormula] = useState(false);
    const [userMenu, setUserMenu] = useState(false);
    const [update, setUpdate] = useState(false);
    const [menu, setMenu] = useState(false);
    useEffect(() => {
        debug('Changing header pageName after page Change: ', currentPage, true);
        setPageName(currentPage);
    }, [currentPage])
    useEffect(() => {
        let relPath = window.location.href.slice(window.location.href.lastIndexOf('/') + 1);
        currentPage = relPath;
        debug('Changing header pageName after url: ', currentPage);
        if (currentPage.toLowerCase() === '5math') {
            currentPage = 'Home'
            navigate('Home')
            return;
        }
        if (currentPage in PAGES) {
            setPageName(currentPage);
        }
    }, [window.location.href])

    function onClickHandler(e) {
        setUpdate(p => !p)
    }

    return (
        <>
            <div
                id='header'
                className='headerPad'
                style={{ gridTemplateColumns: '1fr 10fr 1fr 2fr' }}>
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
                    pages={PAGES}
                    currentPage={pageName}
                />

                <div
                    title='דף נוסחאות'
                    id={`formulaLogo${formula ? 'theme' : ''}`}
                    onClick={() => setFormula(p => !p)}
                    className='flex end fitH pointer'>
                    {Formula(formula ? 'var(--themeColor)' : undefined)}
                </div>

                <div
                    onMouseLeave={() => { setUserMenu(false) }}
                    style={{ position: 'relative', textAlign: '-webkit-center' }}
                    className='fitH'>
                    {/* <button id='loginButton' className='round'> התחבר </button> */}
                    <FontAwesomeIcon
                        onMouseEnter={() => { setUserMenu(true) }}
                        title='איזור אישי'
                        onClick={() => { setUserMenu(p => !p) }}
                        style={{ cursor: 'pointer', marginBottom: '0.3em' }}
                        size='lg'
                        icon={faUser}
                        color={userMenu ? 'var(--themeColor)' : ''}
                    />
                    <SubMenu showMenu={userMenu}>
                        <a>שם משתמש</a>
                        <a> אימייל  </a>
                        <a> הגדרות  </a>
                    </SubMenu>
                </div>
            </div>
            <div className="App-main">
                <Prompt show={formula} callBack={setFormula}>
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



function Menu({ pages, currentPage, ...props }) {
    const [pageName, setPageName] = useState(currentPage);
    const [subMenu, setSubmenu] = useState({ Courses: false, Exercise: false })
    useEffect(() => {
        setPageName(currentPage);
    }, [currentPage])

    return (
        <div
            className='flex fitH' {...props}>
            <ul className='grid columns fill between m1'
                id='menuCategory'>
                {Object.keys(pages).map((pageRout, index) =>
                    pageRout in subMenu ?
                        <div
                            key={index}
                            onMouseLeave={() => { setSubmenu(p => ({ ...p, [pageRout]: false })) }}
                            style={{ position: 'relative' }}>
                            <Link
                                key={index}
                                onClick={() => { setPageName(pageRout) }}
                                to={pageRout}>
                                <div className='flex center alignCenter'>
                                    <li
                                        // onClick={() => { setSubmenu(p => ({ ...p, [pageRout]: true })) }}
                                        className={`fit ${pageName === pageRout ? 'activePage' : ''}`}
                                        key={index}
                                    >{PAGES[pageRout].name}</li>
                                    <div
                                        className='flex'
                                        onClick={() => { setSubmenu(p => ({ ...p, [pageRout]: !p[pageRout] })) }}
                                        onMouseEnter={() => { setSubmenu(p => ({ ...p, [pageRout]: true })) }}>
                                        {DropDown(subMenu[pageRout])}
                                    </div>
                                </div>
                            </Link>
                            <SubMenu showMenu={subMenu[pageRout]} horizontal={true} >
                                <a>  בדיקת לטקסט כלשהו </a>
                                <a>  בדיקת לטקסט כלשהו </a>
                                <a>  בדיקת לטקסט כלשהו </a>
                                <a>  בדיקת לטקסט כלשהו </a>
                                <a href='/Home'>  בדיקת לטקסט כלשהו </a>
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
        </div>
    )
}


function SubMenu({
    showMenu = true,
    horizontal = false,
    children,
    style = {},
    ...props }) {
    const [update, setUpdate] = useState(false);
    useEffect(() => {

        setUpdate(p => !p);
    }, [showMenu])


    return (
        <div
            style={{ display: showMenu ? '' : 'none', right: horizontal ? '-30%' : '', ...style }}
            className={`subMenu center ${!horizontal ? 'columns' : 'rows'}`}>
            {children}
        </div>
    )
}