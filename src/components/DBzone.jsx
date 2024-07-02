
import { useState, useEffect, useRef, useContext, act } from "react";
import '../pages/App.css';
import { debug } from "../assets/function/functions";
import { dataBase} from "../pages/App";
import wordIcon from '../pages/User/wordLogo.svg';
import PrincipleDoc from '../assets/Documents/PrincipleDoc.docx'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { User as USR } from "..";
import { arrowDown, arrowUp } from "./Menu";



function DBzone({ ...props }) {
    const user = useContext(USR);
    const [update, setUpdate] = useState(false);
    const [adminPlot, setAdminPlot] = useState({ active: undefined, data: {} });
    const [visitorsPlot, setVisitorsPlot] = useState({active: false, data:{}});
    const totalVisitors = dataBase.uniqueVisitosHome ;

    // debug('This is adminPlot: ', adminPlot, usersList.current, true);

    useEffect(()=>{
        if (!dataBase.isActive){
            dataBase.fetchDB(user).then(res=> {
                setUpdate(p=>!p);
            })
        }
    },[dataBase.isActive])
    useEffect(()=>{
        if (!isNaN(dataBase.uniqueVisitosHome)){
            setUpdate(p=>!p);
        }
    },[dataBase.uniqueVisitosHome])

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

    const visitorsData = (e)=>{
        if (visitorsPlot.active){
            setVisitorsPlot(p=>({...p, active: false}));
        }
        else{
            let data = <div className="ltr" style={{ width: '-webkit-fill-available' }}>  
                <ul className="adminList m0">
                    {dataBase.uniqueVisitosHome ?
                        dataBase.visitorsHomeList.map((item, indx)=>(
                            <li key={indx}>
                                 <Visitor userInfo={item} key={indx+item}/>
                            </li>
                    )) : <h4>לא נמצא המידע המבוקש</h4>
                    }
                </ul>
            </div>
           
            setVisitorsPlot({active:true, data});
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
        debug('This is what i got: ', resList, true);
        setAdminPlot(p => ({ active:true, data: resList }));
    }

    let search = <div className="flex center">
                    <form name='Search by mail' onSubmit={onSubmit}>
                            <input id='email'
                            style={{height:'2em'}}
                                placeholder="חיפוש משתמש לפי אימייל או שם"
                                className="ltr" name='email' maxLength={80} type="text" required />
                        <button className="small squarish" type="submit">חיפוש משתמש</button>
                    </form>
            </div>

    let usersBtns = dataBase.isActive &&<div className="flex center gap2 ma2">
                <button 
                        name="leads" 
                        className={`medium borderTheme round ${adminPlot.active === 'leads' ? '' : 'themeBorder'}`} 
                        onClick={fastSignup}> {`מתעניינים (${Object.keys(dataBase.leadsDict)?.length})`} </button>
                <button 
                        name="loadAll" 
                        className={`medium borderTheme round ${adminPlot.active === 'loadAll' ? '' : 'themeBorder'}`} 
                        onClick={loadUsers} >{`משתמשים רשומים (${dataBase.usersList?.length})`}</button>
                </div>

    let visitorsHome = totalVisitors && <>
            <div className="flex center gap1 ma2">
                <span className="flex center gap2">
                <p>מספר המבקרים השונים בדף הבית: &nbsp; {String(totalVisitors)}</p>
                    <div 
                    name="visitors" 
                    title="פירוט מבקרים"
                    className='flex center alignCenter pointer'
                    onClick={visitorsData}>
                        {visitorsPlot.active ? arrowUp : arrowDown}
                    </div>
                    {/* <button name="visitors" 
                    className={`small squarish ${visitorsPlot.active ? 'themeConst2' : ''}`} 
                    onClick={visitorsData}> פרטי מבקרים </button> */}
                </span>
            </div>
            {visitorsPlot.active && visitorsPlot.data}
    </>

    return (
        <div className="flex columns center border pb2 pt2 squarish" style={{ background:'aliceblue' }}>
            <h2> Admin center</h2>
            <a href={PrincipleDoc} download="PrincipleDoc" className='flex center opacityHover gap1 ma3 pointer'>
                <img src={wordIcon}
                    style={{ width: '1em', height: '1em' }}
                    title='מסמך עקרונות' alt='Word document Icon' />
                לחץ להורדת מסמך עקרונות
            </a>
           
            {visitorsHome}
            {search}
            {usersBtns}
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
                                    className="border greyOnBlack bold"
                                    style={{
                                        borderBottomColor:'black',
                                        borderBottomLeftRadius: '0px',
                                        borderBottomRightRadius:'0px',
                                        gridArea: `${indx + 1} / 1`,
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
            'שם': userInfo.name,
            'אימייל': userInfo.email,
            "מאשר שליחת הטבות": Boolean(userInfo.approved),
            "שאלון 581": userInfo['581'],
            "4 יחדות": userInfo['4 יחידות']
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
                title={userData['שם']}
                onClick={() => setActive(p => !p)} className="flex gap1 baseLine pointer opacityHover tStart">
                {userData['אימייל']}
                {/* &nbsp;&nbsp;
                {userData['שם']} */}
            </div>
            {active &&
                <div>
                    <div className="grid columns small mt2 mb2">
                        {Object.keys(userData).map((item, indx) => (
                            userData[item] !== undefined && <div
                                className='border alignCenter' key={indx}>
                                <div
                                    className="border greyOnBlack bold"
                                    style={{
                                        borderBottomColor:'black',
                                        borderBottomLeftRadius: '0px',
                                        borderBottomRightRadius:'0px',
                                        gridArea: `${indx + 1} / 1`,
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
function Visitor({ userInfo = {} }) {
    const [active, setActive] = useState(false);
    const [userData, setData] = useState({});
    const createdAtTime = useRef();

    useEffect(() => {
        createdAtTime.current = userInfo.createdAtTime ? userInfo.createdAtTime : 'Created at unkown time';
        let tempObj = {
                'משתמש' : userInfo.userName === 'John Doe' ? 'לא ידוע': userInfo.userName,
                'אימייל' : userInfo.userName === 'John Doe' ? false : userInfo.userEmail,
                'מדינה': userInfo['countryCode'],
                'עיר': userInfo['city'],
                lat: userInfo['latitude'],
                long: userInfo['longitude'],
                'מספר כניסות': userInfo.counter,
                'IPv4': userInfo.ip
        }
        
        debug(tempObj, userInfo, true);
        setData(tempObj);
    }, [])

    if (active) {
        debug('User clicked : ', userData, true);
    }
    return (
        <div className="ma1" >
            <div
                id='userDataDiv'
                title={userData['משתמש']}
                onClick={() => setActive(p => !p)} className="flex gap1 ltr baseLine pointer opacityHover tStart">
                <p>{userData['משתמש']}</p>
                <p>{userData['מדינה']}</p>
                <p className="darkRed">({String(userData['מספר כניסות'])})</p>
                
            </div>
            {active &&
                <div>
                    <div className="grid columns small mt2 mb2">
                        {Object.keys(userData).map((item, indx) => (
                            userData[item]&&<div
                                className='border alignCenter' key={indx}>
                                <div
                                    className="border greyOnBlack bold"
                                    style={{
                                        borderBottomColor:'black',
                                        borderBottomLeftRadius: '0px',
                                        borderBottomRightRadius:'0px',
                                        gridArea: `${indx + 1} / 1`,
                                        padding: '0.5em'
                                    }} >
                                    {item}
                                </div>
                                <div style={{ gridArea: `${indx + 1} / 2`, padding: '0.5em', filter: ['lat','long','IPv4'].includes(item) ? 'blur(3px)':'' }} >
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