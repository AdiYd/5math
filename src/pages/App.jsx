import { debug } from '../assets/function/functions';
import { BrowserRouter, Routes, Route, RouterProvider } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import Home from './Home';
import Bagrut from './Bagrut';
import AboutUs from './About';
import Formulas from './Formula';
import Footer from '../components/Footer';
import Login from './Login';
import { createContext, useContext, useState, useEffect } from 'react';
import { User } from '..';
import { Cookies, useCookies } from 'react-cookie';
import UserZone from './User/UserZone';
import DBaccess from '../assets/function/DBaccess';

export const dataBase = new DBaccess();

// ************  Scroll event listner - for top menu fade effect  ************ //
var prevScroll = 0, change = false;
const scrollFunction = (darkMode) => {
    window.onscroll = () => {
    let currentScroll = window.scrollY;
    let element = document.getElementById('header');
    // let login = document.getElementById('loginButton');
    let logo = document.getElementById('imgLogo');
    if (element && (currentScroll >= prevScroll) && currentScroll > 50 && !change) {  // Scrolling down

        change = true;
        element?.setAttribute('class', 'headerBorder');
        // login.setAttribute('class', 'themeConst round');
        logo?.setAttribute('class', 'dropShadowWhite');
    }
    else if ((element) && (currentScroll < prevScroll) && (currentScroll <= 20) && change) {   // Scrolling up
        change = false;
        element?.setAttribute('class', `headerPad ${darkMode ? 'darkModeHeader' : ''}`);
        // login.setAttribute('class', 'round');
        logo?.setAttribute('class', 'dropShadow');
    }
    prevScroll = currentScroll;
    }
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

const tokenTime = {
    admin: 60 * 60,      // 1 Hour
    google: 25 * 60,    // 25 Minuts
    default: 20 * 60,  // 20 Minutes
}

export const USERS = require('../assets/json/users.json');

export default function App({ }) {
    const userInfo = useContext(User);
    const [cookie, setCookie, removeCookie] = useCookies();
    const [user, setUserInfo] = useState(cookie.userAuth ? cookie.userAuth : userInfo);
    const navigate = useNavigate();
    let url = window.location.href;
    let relPath = url.slice(url.lastIndexOf('/') + 1);

    useEffect(() => {
        if (cookie.userAuth) {
            debug('User Authorized!: ', cookie, { color: 'red', fontSize: 16, fontWeight: 'bold' });
            // setUserInfo(cookie.userAuth);
        }
        else {

            debug('User Un-authorized!: ', cookie, { color: 'red', fontSize: 16, fontWeight: 'bold' });
        }
    }, []);

    useEffect(() => {
        scrollFunction(user.darkMode);
        var style = getComputedStyle(document.body);
        let bgColor = document.querySelector(':root');
        if (user.darkMode) {
            let darkColor = style.getPropertyValue('--themeColorBG_DarkMode');
            bgColor.style.setProperty('--themeColorBG', darkColor);
        }
        else if (!user.darkMode) {
            bgColor.style.setProperty('--themeColorBG', '#fff');
        }
    }, [user.darkMode])

    const onFulfilValidation = (res) => {
        setTimeout(() => {
            let maxAge = res.isAdmin ? tokenTime.admin : res.google ? tokenTime.google : tokenTime.default;
            setCookie('userAuth', JSON.stringify(res), { maxAge, secure: false });
            debug('Authoraized new user: ', res.email, `Valid for ${maxAge / 60} minutes`, true)
            navigate('/Home');
        }, 1500)
    }

    function userLogin({ email, google = false, userObj = {}, disconnect = false, isAdmin = false } = {}) {
        let userInfos;
        debug('DB: ', dataBase, true);
        if (disconnect) {
            removeCookie('userAuth');
            setUserInfo(userInfo);
            return
        }
        else if (isAdmin) {
            userInfos = { ...USERS.admin };
            setUserInfo(userInfos);
            onFulfilValidation(userInfos);
        }
        else if (email in dataBase.usersDict) {
            userInfos = { ...user, ...dataBase.usersDict[email], ...userObj };
            delete userInfos?.password;
            debug('This is user Info: ', userInfos, true);
            setUserInfo(userInfos);
            if (userInfos.isAuth === true) {
                onFulfilValidation(userInfos);
            }
        }
        else if (google && !(email in dataBase.usersDict)) {
            userInfos = { ...user, ...userObj };
            setUserInfo(userInfos);
            if (userInfos.isAuth === true) {
                onFulfilValidation(userInfos);
            }
        }
    }

    return (
        <>
            <Routes>
                <Route
                    path='Formulas'
                    element={<Formulas fullMode={true} />} />
                <Route
                    path='*'
                    element={<>
                        <User.Provider value={{ ...user, callback: userLogin }}>
                            <Header currentPage={relPath} />
                        <Routes>
                            <Route

                                    index
                                    element={<Home />} />
                                <Route
                                    path={'5Math'}
                                    element={<Home />} />

                            {Object.keys(PAGES).map((pageName, indx) =>
                                <Route
                                    key={indx}
                                    path={pageName}
                                    element={
                                        PAGES[pageName].link
                                    } />)}
                            <Route
                                path={'Login'}
                                    element={
                                        <Login />
                                    } />
                                <Route
                                    path={'Personal'}
                                    element={
                                        <UserZone />
                                    } />
                            <Route
                                path="*"
                                element={<><h1>Error Page! 404</h1></>} />
                        </Routes>
                        </User.Provider>
                        <Footer />
                    </>
                    } />
            </Routes>
        </>
    )
}