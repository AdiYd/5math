
import { useState, useEffect, useRef, useContext, act } from "react";
import '../pages/App.css';
import { debug } from "../assets/function/functions";
import { dataBase } from "../pages/App";
import wordIcon from '../pages/User/wordLogo.svg';
import PrincipleDoc from '../assets/Documents/PrincipleDoc.docx'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";




function DBzone({ ...props }) {
    const [update, setUpdate] = useState(false);
    const [adminPlot, setAdminPlot] = useState({ active: undefined, data: {} });

    // debug('This is adminPlot: ', adminPlot, usersList.current, true);

useEffect(()=>{
    dataBase.loadDB();
},[])

    const loadUsers = (e) => {
        if (!adminPlot.active || adminPlot.active !== e.target.name) {
            setAdminPlot({
                active: e.target.name,
                data: dataBase.usersList
            })
        }
        else if (adminPlot.active === e.target.name) {
            setAdminPlot({ active: undefined, data: [] })
        }
    }


    const searchUser = (e) => {
        if (!adminPlot.active || adminPlot.active !== e.target.name) {
            setAdminPlot({
                active: e.target.name,
                data: []
            })
        }
        else if (adminPlot.active === e.target.name) {
            setAdminPlot({ active: undefined, data: [] })
        }
    }

    const fastSignup = (e) => {
        if (!adminPlot.active || adminPlot.active !== e.target.name) {
            setAdminPlot({
                active: e.target.name,
                data: dataBase.leads
            })
        }
        else if (adminPlot.active === e.target.name) {
            setAdminPlot({ active: undefined, data: [] })
        }
    }

    function onSubmit(e) {
        e.preventDefault();
        let formName = e.target.name;
        var formData = new FormData(e.target);
        let userDataObj = Object.fromEntries(formData);
        let data = userDataObj.email.toLowerCase();
        debug('Searching for data : ', data, true);
        let resList = [];
        if (data in dataBase.usersDict) {
            resList.push(dataBase.usersDict[data])
        }
        if (data in dataBase.leads) {
            resList.push(dataBase.leads[data])
        }
        for (let user of dataBase.usersList) {
            if ([user.name.toLowerCase(), ...user.name.toLowerCase().split(' ')].includes(data)) {
                debug('Found match!');
                resList.push(user);
            }
        }
        for (let user of dataBase.leads) {
            if ([user.name.toLowerCase(), ...user.name.toLowerCase().split(' ')].includes(data)) {
                debug('Found match!');
                resList.push(user);
            }
        }
        setAdminPlot(p => ({ ...p, data: resList }));
    }

    return (
        <div className="flex columns center border pb2 pt2 squarish" style={{ background:'aliceblue' }}>
            <h2> Admin center</h2>
            <a href={PrincipleDoc} download="PrincipleDoc" className='flex center opacityHover gap1 ma3 pointer'>
                <img src={wordIcon}
                    style={{ width: '1em', height: '1em' }}
                    title='מסמך עקרונות' alt='Word document Icon' />
                לחץ להורדת מסמך עקרונות
            </a>
            <div className="flex center gap2">
                <button name="loadAll" className={`${adminPlot.active === 'loadAll' ? 'themeConst2' : ''}`} onClick={loadUsers} >טען משתמשים</button>
                <button name="search" className={`${adminPlot.active === 'search' ? 'themeConst2' : ''}`} onClick={searchUser}> חיפוש</button>
                <button name="dummy" className={`${adminPlot.active === 'leads' ? 'themeConst2' : ''}`} onClick={fastSignup}> רישום להטבה</button>
            </div>
            {
                adminPlot.active === 'search' &&
                <div className="flex center">
                    <form name='Search by mail' onSubmit={onSubmit}>
                            <input id='email'
                            style={{height:'2em'}}
                                placeholder="חיפוש לפי אימייל או שם"
                                className="ltr" name='email' maxLength={80} type="text" required />
                        <button className="medium" type="submit">חיפוש משתמש</button>
                    </form>
                </div>
            }
            {
                adminPlot.active &&
                <div className="ltr" style={{ width: '-webkit-fill-available' }}>
                    <ul className="adminList">
                        {adminPlot.data.length ?
                            adminPlot.data.map((item, indx) => (
                                <li key={item.email + indx}>
                                   {'courses' in item ?  <User userInfo={item} />: <Lead userInfo={item}/>}
                                </li>
                            )) : <h4>לא נמצא המידע המבוקש</h4>
                        }
                    </ul>
                </div>
            }
        </div>
    );
}

export default DBzone;


function User({ userInfo = {} }) {
    const [active, setActive] = useState(false);
    const [userData, setData] = useState({});
    const createdAtTime = useRef();

    useEffect(() => {
        createdAtTime.current = userInfo.createdAtTime ? userInfo.createdAtTime : 'Created at unkown time';
        let tempObj = {
            name: userInfo.name,
            email: userInfo.email,
            google: userInfo.google || false,
            isAuth: userInfo.isAuth || false,
            courses: userInfo.courses
        }
        setData(tempObj);
    }, [])

    if (active) {
        debug('User clicked : ', userData, true);
    }
    return (
        <div className="ma2" >
            <div
                title={userData.name}
                onClick={() => setActive(p => !p)} className="flex gap1 baseLine pointer opacityHover tStart">
                {userData.email}
                {userInfo.isAdmin && <p className="tStart small m0 darkRed">
                         (Admin)
                    </p>}
            </div>
            {active &&
                <div>
                    <div className="grid columns small mt2 mb2">
                        {Object.keys(userData).map((item, indx) => (
                            <div
                                className='border alignCenter' key={indx}>
                                <div
                                    className="border bold"
                                    style={{
                                        borderBottomLeftRadius: '0px',
                                        borderBottomRightRadius:'0px',
                                        gridArea: `${indx + 1} / 1`,
                                        background: 'var(--themeGreenLight)',
                                        padding: '0.5em'
                                    }} >
                                    {item}
                                </div>
                                <div style={{ gridArea: `${indx + 1} / 2`, padding: '0.5em' }} >
                                    {typeof userData[item] === "boolean" ?
                                        <FontAwesomeIcon icon={userData[item] ? faCheck : faXmark} /> : userData[item]}
                                </div>
                            </div>)

                        )}
                    </div>
                    <div className="tStart small">
                        {`Created at : ${createdAtTime.current}`}
                    </div>
                </div>
            }
        </div>
    )
}
function Lead({ userInfo = {} }) {
    const [active, setActive] = useState(false);
    const [userData, setData] = useState({});
    const createdAtTime = useRef();

    useEffect(() => {
        createdAtTime.current = userInfo.createdAtTime ? userInfo.createdAtTime : 'Created at unkown time';
        let tempObj = {
            name: userInfo.name,
            email: userInfo.email,
            "מאשר שליחת הטבות": Boolean(userInfo.approved),
        }
        debug(tempObj, userInfo, true);
        setData(tempObj);
    }, [])

    if (active) {
        debug('User clicked : ', userData, true);
    }
    return (
        <div className="ma2" >
            <div
                title={userData.name}
                onClick={() => setActive(p => !p)} className="flex gap1 baseLine pointer opacityHover tStart">
                {userData.email}
                {userInfo.isAdmin && <p className="tStart small m0 darkRed">
                         (Admin)
                    </p>}
            </div>
            {active &&
                <div>
                    <div className="grid columns small mt2 mb2">
                        {Object.keys(userData).map((item, indx) => (
                            <div
                                className='border alignCenter' key={indx}>
                                <div
                                    className="border bold"
                                    style={{
                                        borderBottomLeftRadius: '0px',
                                        borderBottomRightRadius:'0px',
                                        gridArea: `${indx + 1} / 1`,
                                        background: 'var(--themeGreenLight)',
                                        padding: '0.5em'
                                    }} >
                                    {item}
                                </div>
                                <div style={{ gridArea: `${indx + 1} / 2`, padding: '0.5em' }} >
                                    {typeof userData[item] === "boolean" ?
                                        <FontAwesomeIcon icon={userData[item] ? faCheck : faXmark} /> : userData[item]}
                                </div>
                            </div>)

                        )}
                    </div>
                    <div className="tStart small">
                        {`Created at : ${createdAtTime.current}`}
                    </div>
                </div>
            }
        </div>
    )
}