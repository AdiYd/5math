import { debug } from '../assets/function/functions';
import { BrowserRouter, Routes, Route, RouterProvider } from 'react-router-dom';
import Header from '../components/Header';
import Home from './Home';
import Bagrut from './Bagrut';
import AboutUs from './About';
import Formulas from './Formula';
import Footer from '../components/Footer';
import Login from './Login';

// ************  Scroll event listner - for top menu fade effect  ************ //
var prevScroll = 0, change = false;
window.onscroll = () => {
    let currentScroll = window.scrollY;
    let element = document.getElementById('header');
    // let login = document.getElementById('loginButton');
    let logo = document.getElementById('imgLogo');
    if (element && (currentScroll >= prevScroll) && currentScroll > 50 && !change) {  // Scrolling down

        change = true;
        element.setAttribute('class', 'headerBorder');
        // login.setAttribute('class', 'themeConst round');
        logo.setAttribute('class', 'dropShadowWhite');
    }
    else if ((element) && (currentScroll < prevScroll) && (currentScroll <= 20) && change) {   // Scrolling up

        change = false;
        element.setAttribute('class', 'headerPad');
        // login.setAttribute('class', 'round');
        logo.setAttribute('class', 'dropShadow');
    }
    prevScroll = currentScroll;
};
// ************  Scroll event listner - END  ************ //



export const PAGES = {
    Home: {
        link: <Home />,
        name: 'דף הבית'
    },
    Courses: {
        link: undefined,
        name: 'הקורסים שלנו'
    },
    BagrutOfficial: {
        link: <Bagrut />,
        name: 'מבחני בגרות'
    },
    Exercise: {
        link: undefined,
        name: 'חוברות תרגול'
    },
    AboutUs: {
        link: <AboutUs />,
        name: 'על הקורס'
    }
}



export default function App({ }) {
    let url = window.location.href;
    let relPath = url.slice(url.lastIndexOf('/') + 1);
    debug('Im in app with url: ', url, relPath);
    return (
        <>
            <Routes>
                <Route
                    path='Formulas'
                    element={<Formulas fullMode={true} />} />
                <Route
                    path='*'
                    element={<>
                        <Header currentPage={relPath} />
                        <Routes>
                            <Route
                                path='5math'
                                index element={<Home />} />

                            {Object.keys(PAGES).map((pageName, indx) =>
                                <Route
                                    key={indx}
                                    path={pageName}
                                    element={PAGES[pageName].link} />)}
                            <Route
                                path={'Login'}
                                element={<Login />} />

                            <Route
                                path="*"
                                element={<><h1>Error Page! 404</h1></>} />
                        </Routes>
                        <Footer />
                    </>
                    } />
            </Routes>
        </>
    )
}