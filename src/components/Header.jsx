import { debug } from '../assets/function/functions';
import { useState } from 'react';
import '../assets/style/style.css';
import './components.css';
import './header.css';
import imgLogo from '../assets/img/5Math.svg';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { PAGES } from '../pages/App';

const DBG_PROPS = {
    color: 'darkred',
    background: 'azul',
    fontWeight: 'bold'
}

export const THEME_COLORS = ['var(--ThemeGPTBlueV)', 'var(--ThemeGPTOrangeDeep)', 'var(--ThemeGPTRedV)', 'var(--ThemeGPTBlue)', 'var(--ThemeGPTPurpleLightV)', 'var(--ThemeGPTGreen)', 'var(--ThemeGPTRed)', 'var(--ThemeGPTOrangeV)'];
if (Boolean(localStorage.getItem('themeColor'))) {
    onLogoClickHandler(undefined, true);
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
    const [update, setUpdate] = useState(false);
    const [menu, setMenu] = useState(false);

    function onClickHandler(e) {
        setUpdate(p => !p)
    }

    return (
        <>
            <div
                id='header'
                className='headerPad'
                style={{ gridTemplateColumns: '1fr 10fr 2fr' }}>
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
                    currentPage={currentPage}
                />

                <div className='flex center fitH'>
                    <button id='loginButton' className='round'> התחבר </button>
                </div>
            </div>
            <div className="App-main">
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

    return (
        <div
            className='flex fitH' {...props}>
            <ul className='grid columns fill between m1'
                style={{ gridTemplateColumns: `repeat(${Object.keys(PAGES).length},1fr)` }}
                id='menuCategory'>
                {Object.keys(pages).map((pageRout, index) =>
                    <Link
                        key={index}
                        onClick={() => setPageName(pageRout)}

                        to={PAGES[pageRout].name}>
                        <li
                            className={`fit ${pageName === pageRout ? 'activePage' : ''}`}
                            key={index}
                        >{pageRout}</li>
                    </Link>
                )}
            </ul>
        </div>
    )
}