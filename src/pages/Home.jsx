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
import { faComment, faComments, faDesktop, faGift, faLaptop, faLocation, faLocationDot, faMobile, faMobileScreen, faPersonCircleQuestion, faPlay, faQuestionCircle, faTabletScreenButton, faVideo, faWandMagicSparkles, faWifi } from '@fortawesome/free-solid-svg-icons';
import { } from '@fortawesome/free-regular-svg-icons';
import { faViadeoSquare } from '@fortawesome/free-brands-svg-icons';
import Prompt from '../components/PromptDiv';
import Checkbox from '../components/CheckBox';
import AboutMe from '../components/AboutMe';
import useWindowDimensions from '../assets/function/useWindowDimentions';

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
    debug('Context: ', user, true);
    const { width } = useWindowDimensions();

    let frame1 =  <div className='flex center frameDiv1 pt3 round boxShadow'>
            <div className='alignCenter fadeIn'>
                <Logo />
                <h1>קורס דיגיטלי להכנה לבגרות במתמטיקה 5 ו-4 יח"ל, בשילוב כלים דיגטליים</h1>
                <h2> ללמוד ולתרגל בצורה יעילה וחכמה כל הדרך אל הבגרות, בעזרת תוכן איכותי ומונגש</h2>
                <h2>המדריכים שלנו ילכו איתכם יד ביד עד הבגרות, ללמוד בראש שקט ובבטחון</h2>
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
                <div className='flex center' style={{ verticalAlign: 'top' }}>
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
                <div className='flex center' style={{ verticalAlign: 'top' }}>
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
                <div className='flex center' style={{ verticalAlign: 'top' }}>
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
            style={{ backgroundImage: 'linear-gradient( transparent, rgb(168 0 230 / 40%))' }}
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
                    <h3 className='cardText'>בלוג לשאלות ועזרה</h3>
                </div>
                <hr id='horizLine' />
                <p >תוכלו לשאול ולהתייעץ עם המרצה, עם מורים אחרים וגם עם תלמידים</p>
                <h3 id='textGradient'> ההצלחה שלכם חשובה לנו!</h3>
            </>
        </Card>
        <Card
            className={` `}
            style={{
                padding: width >= 900 ? '1.5%' : '',
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
                        icon={faWandMagicSparkles} className='' size='2xl' />
                </div>

                <div>
                    <h3 className='cardText'>למידה דיגיטלית וחדשנית </h3>
                </div>
                <hr id='horizLine' />
                <p >תוכן ויזואלי, סרטונים ותרגילים ברמה גבוהה יחד עם ממשק דיגטלי וכלים שיעזרו לכם להבין כל נושא לעומק  </p>

                <h3 id='textGradient'> להבין מתמטיקה באופן אינטואיטיבי</h3>
            </>
        </Card>
        <Card
            className={` `}
            style={{ backgroundImage: 'linear-gradient(transparent, rgb(32 206 1 / 40%))' }}
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
                    <FontAwesomeIcon title='טאבלט' icon={faTabletScreenButton} />
                    <FontAwesomeIcon title='מחשב נייד' icon={faLaptop} />
                    <FontAwesomeIcon title='מחשב נייח' icon={faDesktop} />
                </div>
                <h3 id='textGradient'> ללמוד מתי ואיפה שנוח לך</h3>
            </>
        </Card>
    </>

    function onSubmitForm(e) {
        e.preventDefault();
        let formaName = e.target.name;
        var formData = new FormData(e.target);
        let userDataObj = Object.fromEntries(formData);
        debug('This is formData: ', userDataObj, true);
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

            {/* <div style={{ height: '4em' }}></div> */}

            <div className='quickSignUp boxShadow'>
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
                            // onChange={onInputHandler}
                            placeholder='אימייל'
                            name='email'></input>
                        <button
                            style={{ margin: '0em 1em', padding: '0.9em 1.2em' }}
                            className='themeConst round'
                            type='submit'>לקבלת הטבה</button>
                    </div>
                    <div className='flex center' id='checkBoxDiv'>
                        <div className='flex center checkboxContainer'>
                            <Checkbox color='var(--ThemeGPTOrangeDeep)' id='10G' name='10' title="כיתה ט'" />
                            <label forhtml='10G'> כיתה י'</label>
                        </div>
                        <div className='flex center checkboxContainer'>
                            <Checkbox color='var(--ThemeGPTOrangeDeep)' id='11G' name='11' title="כיתה ט'" />
                            <label forhtml='11G'>כיתה יא'</label>
                        </div>
                        <div className='flex center checkboxContainer'>
                            <Checkbox color='var(--ThemeGPTOrangeDeep)' id='12G' name='12' title="כיתה ט'" />
                            <label forhtml='12G'> כיתה יב'</label>
                        </div>
                    </div>
                </form>
            </div>

            <AboutMe />

            {/* <div style={{ height: '4em' }}></div> */}
        </div>
    );
}

export default Home;
