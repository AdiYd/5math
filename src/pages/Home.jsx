import assist from '../assets/img/pesonalAssist.png';
import { User } from '..';
import { useState, useContext } from 'react';
import experience from '../assets/img/experience.png';
import timeSave from '../assets/img/timeSave.png';
import digital from '../assets/img/digital.png';
import { debug } from '../assets/function/functions';
import { MathJax } from "better-react-mathjax";
import Card from '../components/Card';
import Logo from '../components/Logo';
import './App.css';
import '../assets/style/media.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faComment, faComments, faDesktop, faEnvelope, faGift, faHandHoldingHand, faLaptop, faListCheck, faLocation, faLocationDot, faMagicWandSparkles, faMailReply, faMobile, faMobileScreen, faPersonCircleQuestion, faPhone, faPlay, faQuestionCircle, faTabletScreenButton, faTrophy, faVideo, faWandMagicSparkles, faWandSparkles, faWifi } from '@fortawesome/free-solid-svg-icons';
import { faHandshake} from '@fortawesome/free-regular-svg-icons';
import { faReact, faViadeoSquare, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import Prompt from '../components/PromptDiv';
import Checkbox from '../components/CheckBox';
import AboutMe from '../components/AboutMe';
import useWindowDimensions from '../assets/function/useWindowDimentions';
import FloatingMath from '../components/FloatingMath';
import VideoEmb from '../components/VideoEmb';
import { dataBase } from './App';
import { MOBILE_SCREEN_WIDTH } from '../components/Header';

export const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 1
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const logoStyle = {

}

const cardStyle = {

}

function Home({ ...props }) {
    document.title = '5 Math - דף הבית';
    const user = useContext(User);
    const [msg, setMsg] = useState();
    debug('Context: ', user, true);
    const { width } = useWindowDimensions();
    let isMobile = Boolean(width <= MOBILE_SCREEN_WIDTH);

    let frame1 =  <div className='flex center frameDiv1 frameMargin purpleOnWhite themeRadius pt3 boxShadow'>
        {/* <FloatingMath animation={'flicker'} color='black' text='g(x) = ln(x)+e^{2x}' position='tl' />
        <FloatingMath fontSize='1.2em' transform='rotate(12deg)' text='sin^2(\pi) + cos^2(\pi) = 1' position='tr' />
        <FloatingMath text='a_n = aq^{n-1}' position='bl' rotate={20} /> */}
            <div className='alignCenter fadeIn'>
                <Logo showCaption={!isMobile} />
                <h1>קורס דיגיטלי ללימודי מתמטיקה לבגרויות, בזמן ובנוחות שלך</h1>
                <p className='xLarge'> ללמוד ולתרגל בצורה יעילה וחכמה כל הדרך אל הבגרות, בעזרת תוכן איכותי ומונגש</p>
                <p className='xLarge'>המדריכים שלנו ילכו איתכם יד ביד עד הבגרות, ללמוד בראש שקט ובבטחון</p>
                    <button
                        className='themeConst2'
                        id='trialButton'>לצפייה בשיעור ניסיון</button>
            </div>
        </div>

    let caruselSection2 = <>
        <Card
            className={``}
            cardID={'frame2Card'}>
            <>
                <div className='flex center' style={{ verticalAlign: 'top' }}>
                    <img id='frame2Img'
                        src={digital} alt='לוגו תוכן דיגיטלי' title='תוכן דיגיטלי' />
                </div>
                <div>
                    <h3 className='cardText'>תוכן ויזואלי ודיגיטלי</h3>
                </div>
                <hr id='horizLine' />
                <p >אנימציות, כתב מחשב, תלת מימד
                    ועוד מגוון שיפורים שטרם ראיתם</p>
            </>
        </Card>
        <Card
            className={``}
            cardID={'frame2Card'}>
            <>
                <div className='flex center'>
                    <img id='frame2Img'
                        src={timeSave} alt='לוגו חסכון בזמן' title='חסכון בזמן' />
                </div>
                <div>
                    <h3 className='cardText'>הקורס שיחסוך לכם זמן וכסף</h3>
                </div>
                <hr id='horizLine' />
                <p>
                    צמצמנו את החומר כדי ללמד אתכם בצורה הטובה, היעילה והאיכותית ביותר
                </p>
            </>
        </Card>
        <Card
            className={``}
            cardID={'frame2Card'}>
            <>
                <div className='flex center'>
                    <img id='frame2Img'
                        src={experience} alt='לוגו 21 שנות ניסיון' title='21 שנות נסיון' />
                </div>
                <div>
                    <h3 className='cardText'>21 שנות ניסיון בהוראת מתמטיקה</h3>
                </div>
                <hr id='horizLine' />
                <p>מדריך מנוסה בהוראת מתמטיקה במכונים הגדולים והמוצלחים ביותר בישראל
                </p>
            </>
        </Card>
        <Card
            className={``}
            cardID={'frame2Card'}>
            <>
                <div className='flex center' >
                    <img id='frame2Img'
                        src={assist} alt='לוגו ליווי אישי צמוד' title='ליווי אישי' />
                </div>
                <div>
                    <h3 className='cardText'>ליווי אישי צמוד</h3>
                </div>
                <hr id='horizLine' />
                <div className='flex'>
                    <p>אנחנו כאן איתכם,
                        כל הדרך אל ההצלחה

                    </p>
                </div>
            </>
        </Card>
    </>

    let caruselSection1 = <>
        <Card
            className={` `}
            style={{ backgroundImage: 'linear-gradient( transparent, rgb(168 0 230 / 30%))' }}
            cardID={'frame2Card2'}>
            <>
                <div className='flex center ma3 darkBlue mt1 gap1'>
                    <FontAwesomeIcon
                        style={{ fontSize: '3em' }}
                        icon={faPersonCircleQuestion} className='' size='2xl' />
                    <FontAwesomeIcon
                        style={{ fontSize: '3em' }}
                        icon={faComments} className='' size='2xl' />
                </div>

                <div>
                    <h3 className='cardText'>יש עם מי לדבר</h3>
                </div>
                <hr id='horizLine' />
                <p >תוכלו לשאול שאלות ולהתייעץ עם המרצה ועם מורים אחרים, ניתן לפנות אלינו במגוון דרכים ולקבל מענה בהתאם לצורך</p>
                <div className='ma1 darkBlue gap1 flex around'>
                    <FontAwesomeIcon title='Whatsapp' icon={faWhatsapp} />
                    <FontAwesomeIcon title='טלפון' icon={faPhone} />
                    <FontAwesomeIcon title='אימייל' icon={faEnvelope} />
                    <FontAwesomeIcon title='שיתוף מסמכים' icon={faMailReply} />

                </div>
                <h3 id='textGradient'> ההצלחה שלכם חשובה לנו!</h3>
            </>
        </Card>
        <Card
            className={` `}
            style={{
                padding: width >= 900 ? '2.5%' : '',
                backgroundImage: 'linear-gradient(transparent, var(--themeColorAlpha))'
            }}
            cardID={'frame2Card2'}>
            <>
                <div className='flex center ma3 mt1 darkBlue gap1'>
                    <FontAwesomeIcon
                        style={{ fontSize: '3em' }}
                        icon={faPlay} className='' size='2xl' />
                    <FontAwesomeIcon
                        style={{ fontSize: '2.5em' }}
                        icon={faWandSparkles} className='' size='2xl' />
                </div>

                <div>
                    <h3 className='cardText'>למידה דיגיטלית וחדשנית </h3>
                </div>
                <hr id='horizLine' />
                <p >תוכן ויזואלי ערוך, תמציתי ומדויק. סרטונים ותרגילים ברמה גבוהה יחד עם ממשק דיגטלי וכלים שיעזרו לכם להבין כל נושא לעומק  </p>

                <h3 id='textGradient'> ללמוד מתמטיקה באופן אינטואיטיבי</h3>
            </>
        </Card>
        <Card
            className={` `}
            style={{ backgroundImage: 'linear-gradient(transparent, rgb(32 206 1 / 30%))' }}
            cardID={'frame2Card2'}>
            <>
                <div className='flex center ma3 mt1 darkBlue gap1'>
                    <FontAwesomeIcon
                        style={{ fontSize: '3em' }}
                        icon={faLocationDot} className='' size='2xl' />
                    <FontAwesomeIcon
                        style={{ fontSize: '3em' }}
                        icon={faWifi} className='' size='2xl' />
                </div>

                <div>
                    <h3 className='cardText'>ללמוד בכל זמן ומקום</h3>
                </div>
                <hr id='horizLine' />
                <p > בואו ללמוד בנוחות, בקצב וברמה שמתאימה לכם <br /> האתר מותאם לגלישה בקצב מהיר ונתמך ע"י רוב המכשירים</p>
                <div className='ma1 darkBlue gap1 flex around'>
                    <FontAwesomeIcon title='סמארטפון' icon={faMobileScreen} />
                    <FontAwesomeIcon title='מחשב נייד' icon={faLaptop} />
                    <FontAwesomeIcon title='מחשב נייח' icon={faDesktop} />
                </div>
                <h3 id='textGradient'> ללמוד מתי ואיפה שנוח לך</h3>
            </>
        </Card>
    </>

    let quickSignUp =  <div className='quickSignUp themeRadius frameMargin blackOnWhite boxShadow'>
            <div className='flex center columns'>
                <div className='flex center gap1'>
                    <FontAwesomeIcon icon={faGift} size='2xl' color='var(--ThemeGPTOrangeDeep)' />
                    {/* <FontAwesomeIcon icon={faVideo} size='2xl' color='var(--ThemeGPTOrangeDeep)' /> */}
                </div>
                <h3>נרשמים עכשיו ומקבלים שיעור במתנה: </h3>
            </div>
            <form onSubmit={onSubmitForm} name='quick Signup' >
                <div className='flex center baseLine' >
                    <input
                        id='name'
                        className='inputText'
                        maxLength={30}
                        required={true}
                        autoComplete='on'
                        title='שם מלא'
                        type='text'
                        // onChange={onInputHandler}
                        placeholder='שם מלא'
                        name='name'></input>
                    <input
                        id='emails'
                        className='inputText'
                        maxLength={60}
                        required={true}
                        autoComplete='on'
                        title='אימייל'
                        type='email'
                        dir='ltr'
                        // onChange={onInputHandler}
                        placeholder='אימייל'
                        name='email'></input>
                    <button
                        className='themeConst round'
                        type='submit'>לקבלת הטבה</button>
                </div>
                <div className='flex center' id='checkBoxDiv'>
                    <div className='flex center checkboxContainer'>
                        <Checkbox 
                        value = {true}
                        // onChange= {(e)=>{debug('Changing: ',e.target.value);e.target.value = !e.target.value}}
                        defaultChecked = {true}
                        color='var(--constThemeColor)' id='Approve' name='Approve' title="אישור קבלת דואר" />
                        <label forhtml='Approve'> אישור קבלת עדכונים והטבות במייל</label>
                    </div>
                    {/* <div className='flex center checkboxContainer'>
                        <Checkbox color='var(--constThemeColor)' id='11G' name='11' title="כיתה ט'" />
                        <label forhtml='11G'>כיתה יא'</label>
                    </div>
                    <div className='flex center checkboxContainer'>
                        <Checkbox color='var(--constThemeColor)' id='12G' name='12' title="כיתה ט'" />
                        <label forhtml='12G'> כיתה יב'</label>
                    </div> */}
                </div>
            </form>
        </div>


    function onSubmitForm(e) {
        e.preventDefault();
        let formaName = e.target.name;
        var formData = new FormData(e.target);
        let userDataObj = Object.fromEntries(formData);
        dataBase.addItem({tableName: 'Users_Leads',item:{...userDataObj, approved: ('Approve' in userDataObj)? 1:0}});
        debug('Prompting msg');
        setMsg(<Prompt
                height='fit-content'
                showButton={true}
                callBack={() => {setMsg(undefined)}}
                style={{ height: 'fit-content', borderRadius: '20px' }}
                showDiv={true} >
                <Logo />
                <h3> 🎉 מזל טוב, {userDataObj.name} 🎁</h3>
                <h4> ההטבה בדרך למייל שלכם </h4>
             </Prompt>)
    }

    return (
        <div className={`App`}>
            {frame1}
            <section className='caruselDiv'>
                <Carousel
                    swipeable={true}
                    draggable={false}
                    showDots={true}
                    responsive={responsive}
                    // ssr={true} // means to render carousel on server-side.
                    infinite={true}
                    // autoPlay={this.props.deviceType !== "mobile" ? true : false}
                    // autoPlaySpeed={1000}
                    keyBoardControl={true}
                    // customTransition="all .5"
                    // transitionDuration={1000}
                    // partialVisbile={true}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    // deviceType={this.props.deviceType}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px">

                    <div
                        style={{ gap: '2.2em' }}
                        className='flex center frameDiv2'>
                        {caruselSection1}
                    </div>
                    <div
                        className='flex center frameDiv2'>
                        {caruselSection2}
                    </div>
                </Carousel>
            </section>
            {msg}
            <PromoDiv />
           {quickSignUp}
            <AboutMe />

        </div>
    );
}

export default Home;



const PromoDiv = ({...props})=>{
    

    return (
        <div className='grid themeRadius lineargrad frameMargin boxShadow' id='promoVideo' >
            <div className='flex tStart center'>
                <ul id="promoList">
                <li><FontAwesomeIcon icon={faTrophy} size='lg' /><h3 id="textGradient2">רוצים לקבל ציון גבוה ב-30% ממה שאתם מסוגלים היום?</h3></li>
                <li><FontAwesomeIcon icon={faLaptop} size='lg' /><h3 id="textGradient2">חווית צפייה מושלמת ומותאמת למגוון מכשירים</h3></li>
                <li><FontAwesomeIcon icon={faListCheck} size='lg' /><h3 id="textGradient2">תמציתי ומדויק - כדי לחסוך לכם זמן לימוד מיותר</h3></li>
                <li><FontAwesomeIcon icon={faHandshake} size='lg' /><h3 id="textGradient2">ליווי אישי - פייסבוק, ווטסאפ, צ'אט. איך שנוח לכם</h3></li>
                <li><FontAwesomeIcon icon={faWandSparkles} size='lg' /><h3 id="textGradient2">יצירתיות - דרך חדשנית ומעניינת להצגת פתרונות הבגרות</h3></li>
                <li><FontAwesomeIcon icon={faReact} size='xl' className='rotateInf' /><h3 id="textGradient2">אנימציות - שמסבירות בקלות וביעילות נושאים מורכבים</h3></li>
                </ul>
            </div>
            <div className='flex center' style={{height:'-webkit-fill-available' , width: '-webkit-fill-available'}}>
                <VideoEmb />
            </div>
        </div>
    )
}