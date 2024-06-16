import './Components.css';
import selfie from '../assets/img/shaiProfile.jpg'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faUser } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { debug } from '../assets/function/functions';

function AboutMe({ ...props }) {
    const [active, setActive] = useState(false);
    const [moreInfo, setMoreInfo] = useState(false);
    const [writeMe, setWriteMe] = useState({
        active: false,
        name: '',
        email: '',
        content: ''
    })

    function onWriteMeSubmit(e) {
        e.preventDefault();

        var formData = new FormData(e.target);
        let userDataObj = Object.fromEntries(formData);
        debug('This is the message: ', writeMe, userDataObj, true);
    }

    let aboutMe = <p >
        אני מלמד מתמטיקה ופיזיקה ברמת 5 יחידות לבגרות מאז שנת 2001.
        ב- 20 השנים האחרונות זכיתי ללמד אלפי תלמידים אשר ניגשו לבגרות 5 יח”ל מתמטיקה באחוזי הצלחה יוצאי דופן.
        באתר שלפניכם, ארזתי את כל הידע המצטבר שלי (יחד עם תובנות של התלמידים) לקורס ההכנה לבגרות הטוב ביותר שתוכלו למצוא. <b>היה לי חשוב לדייק את הלימודים המקוונים</b>, בצורה ובדרך חדשנית אשר לא תמצאו באף מקום אחר בישראל.
        אני מאמין כי זו הדרך ללמוד היום מתמטיקה ואני פה כדי ללוות אתכם בכל התהליך.
    </p>

    let additionalData = active && <p>
        בתיכון הייתי תלמיד חלש ב 3 יחידות מתמטיקה. די מהר הסקתי שמתמטיקה זה לא בשבילי ושעדיף להתמקד בחלום שלי… להיות רפתן.  נרשמתי ללימודי מכינה למדעי הטבע באוניברסיטה העברית, אבל דווקא שם  התאהבתי במתמטיקה ובפיזיקה, וההתאהבות הלא צפויה הזו שינתה את כיוון חיי מרפתנות – לתואר בפיזיקה. למדתי שלמורה אחד יש את הכוח להשפיע על חייהם של מאות תלמידים.

        רציתי לעזור לתלמידים כמוני, שחוו תחושת כישלון בגלל מערכת חינוך לא מלמדת, ולהראות להם, כמו שגיליתי בעצמי, את היופי והעוצמה שבמתמטיקה. כך הפכתי להיות מורה.
    </p>

    let myAgenda = moreInfo && <div className='flex'>
        <p> bla bla bla - myAgenda! </p>
    </div>

    let contactMe = writeMe.active && <div className=' writeMe alignCenter boxShadow round'>
        <FontAwesomeIcon
            className='opacityHover pointer'
            title='סגירה'
            onClick={() => setWriteMe(p => ({ ...p, active: false }))}
            style={{ position: 'absolute', top: '0.5em', right: '0.5em' }}
            icon={faCircleXmark} />
        <form
            onSubmit={onWriteMeSubmit}
            className='flex columns'>
            <div className='flex center gap1'>
                <input
                    placeholder='שם מלא'
                    type='name'
                    name='name'
                    value={writeMe.name}
                    onChange={(e) => setWriteMe(p => ({ ...p, name: e.target.value }))}
                    required={true}
                    className='inputText' />
                <input
                    placeholder='אימייל'
                    type='email'
                    name='email'
                    value={writeMe.email}
                    onChange={(e) => setWriteMe(p => ({ ...p, email: e.target.value }))}
                    required={true}
                    className='inputText' />
            </div>
            <div className='flex center'>
                <textarea
                    style={{ alignContent: 'center' }}
                    placeholder='תוכן ההודעה'
                    name='content'
                    value={writeMe.content}
                    onChange={(e) => setWriteMe(p => ({ ...p, content: e.target.value }))}
                    className='inputText' />
            </div>
            <button className='round alignCenter' style={{ width: '40vw' }} type='submit'>
                שליחה
            </button>
        </form>
    </div>

    return (
        <div className='rtl frameDiv3 round boxShadow'>
            <FontAwesomeIcon icon={faUser}
                id='tutorSelfie' className='boxShadowHover p2' color='var(--constThemeColor)' />
            {/* <img id='tutorSelfie'
                className='boxShadowHover'
                src={selfie}
                alt="Picture of the Shai, the teacher"
                title='Picture of the course teacher'
            /> */}
            <div className='flex center'>
                <h1>ההצלחה מתחילה בך ועוברת במרצה </h1>
            </div>
            <div className='flex'>
                <h2 style={{ margin: '0em' }}><b>שי חכימי - </b></h2>
            </div>
            {aboutMe}
            {additionalData}
            {myAgenda}
            <div className='flex center pt2 pb2'>
                {!active && <button
                    onClick={() => setActive(true)}
                    className='themeConst round large'
                >קראו עוד אודותי</button>}

                {active && <div className='flex center gap2'>
                    <span className='flex center'>
                        <FontAwesomeIcon
                            title='סגירה'
                            className='m1 pointer'
                            onClick={() => { setActive(false); setMoreInfo(false); setWriteMe(p => ({ ...p, active: false })) }}
                            icon={faCaretUp} size='2xl' color='var(--constThemeColor)' />

                    </span>
                    {!writeMe.active && <button
                        onClick={() => setWriteMe(p => ({ ...p, active: true }))}
                        className='themeConst round large'
                    >
                        כתבו לי
                    </button>}
                    {!moreInfo && <button
                        onClick={() => setMoreInfo(true)}
                        className='themeConst round  large'
                    >
                        קראו על האג'נדה שלי
                    </button>}
                </div>}
            </div>
            {contactMe}
        </div>
    )
}

export default AboutMe;