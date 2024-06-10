import { debug } from '../assets/function/functions';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Home from './Home';
import AboutUs from './About';

// ************  Scroll event listner - for top menu fade effect  ************ //
var prevScroll = 0, change = false;
window.onscroll = () => {
    let currentScroll = window.scrollY;
    let element = document.getElementById('header');
    let login = document.getElementById('loginButton');
    let logo = document.getElementById('imgLogo');
    if (element && (currentScroll >= prevScroll) && currentScroll > 50 && !change) {  // Scrolling down

        change = true;
        element.setAttribute('class', 'headerBorder');
        login.setAttribute('class', 'themeConst round');
        logo.setAttribute('class', 'dropShadowWhite');
    }
    else if ((element) && (currentScroll < prevScroll) && (currentScroll <= 20) && change) {   // Scrolling up

        change = false;
        element.setAttribute('class', 'headerPad');
        login.setAttribute('class', 'round');
        logo.setAttribute('class', 'dropShadow');
    }
    prevScroll = currentScroll;
};
// ************  Scroll event listner - END  ************ //



export const PAGES = {
    'דף הבית': {
        link: <Home />,
        name: 'Home'
    },
    'הקורסים שלנו': {
        link: undefined,
        name: 'Courses'
    },
    'בגרויות ישנות': {
        link: undefined,
        name: 'BagrutOfficial'
    },
    'חוברות תרגול': {
        link: undefined,
        name: 'Exercise'
    },
    'קצת עלינו': {
        link: <AboutUs />,
        name: 'About-Us'
    }
}



export default function App({ }) {
    return (
        <Routes>
            <Route
                path="/"
                element={<Header currentPage={"דף הבית"} />} >
                <Route
                    index element={<Home />} />

                {Object.keys(PAGES).map((pageName, indx) =>
                    <Route
                        key={indx}
                        path={PAGES[pageName].name}
                        element={PAGES[pageName].link} />)}
                <Route
                    path="*"
                    element={<><h1>Error Page! 404</h1></>} />
            </Route>
        </Routes>
    )
}