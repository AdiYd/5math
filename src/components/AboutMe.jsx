import './Components.css';
import selfie from '../assets/img/shaiProfile.jpg'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCircleXmark, faSortDown, faSortUp, faUser } from '@fortawesome/free-solid-svg-icons';
import { } from '@fortawesome/free-regular-svg-icons';
import { debug } from '../assets/function/functions';
import { faWhatsapp, faWhatsappSquare } from '@fortawesome/free-brands-svg-icons';

function AboutMe({ ...props }) {
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

    let additionalData =  <p>
        בתיכון הייתי תלמיד חלש ב 3 יחידות מתמטיקה. די מהר הסקתי שמתמטיקה זה לא בשבילי ושעדיף להתמקד בחלום שלי… להיות רפתן.  נרשמתי ללימודי מכינה למדעי הטבע באוניברסיטה העברית, אבל דווקא שם  התאהבתי במתמטיקה ובפיזיקה, וההתאהבות הלא צפויה הזו שינתה את כיוון חיי מרפתנות – לתואר בפיזיקה. למדתי שלמורה אחד יש את הכוח להשפיע על חייהם של מאות תלמידים.

        רציתי לעזור לתלמידים כמוני, שחוו תחושת כישלון בגלל מערכת חינוך לא מלמדת, ולהראות להם, כמו שגיליתי בעצמי, את היופי והעוצמה שבמתמטיקה. כך הפכתי להיות מורה.
    </p>

    let myAgenda = moreInfo && <div className='flex columns'>
        <h3> מה הביא אותי ליצור קורס דיגיטלי? </h3>
       <p>במהלך שני עשורים לימדתי מתמטיקה באופן פרונטלי. עם הזמן הבנתי שטבע הלמידה הוא לא ליניארי ומכני. תלמיד לא אמור לשמוע הסבר ומיד להבין אותו במאה אחוז (ועל זה מסתמכים בלמידה פרונטלית: ״הסברתי לך הרגע, בוא תתרגל״). לפעמים צריך הפסקה לעבד נתונים, לפעמים רוצים לשמוע שוב את ההסבר, הלמידה צריכה לקרות בקצב שלה, וזה עניין מאד אישי. 

הבנתי שקורס אונליין נותן מענה הרבה יותר נכון לצרכים הטבעיים שלנו בזמן למידה. מצד שני, מכיוון שלמידה היא תהליך אינטימי ועדין, משהו חשוב הולך לאיבוד בקורס אינטרנטי שבו יש סתם קול שמדבר דרך המחשב או הסבר קר בכתב יד. והרי אף אחד לא רוצה קורס אינטרנטי קר שבו אין ממש הסבר עמוק, אין למי לפנות כשיש קושי והכי חשוב – אתה לא מרגיש שהמורה הוא באמת מורה שלך. 

הקמתי את 5math כי רציתי לשלב בין היתרונות של למידה פרונטלית עם מורה בכיתה לבין היתרונות של קורס אונליין. הקורס האינטרנטי מאפשר ללמידה להתרחש באופן יותר טבעי, משחרר אתכם מפקקים, זמן מבוזבז, שעות לא נוחות, רעש והתמודדות עם תלמידים נוספים ולכן הלמידה בו היא הרבה יותר נוחה ואינטימית מאשר למידה בכיתה. בו זמנית, זהו קורס שבו אתה רואה ומכיר את המורה שמלמד אותך. היה לי חשוב ליצור קורס אינטימי, שבו באמת נוכל להתחבר ושאוכל ללוות אותך במסע הלמידה. לכן זהו קורס שמוקלט בבית, ברוגע, עם המון המון נסיון וחשיבה מאחורי כל הרצאה כך שתהפוך למדוייקת ביותר, בכדי שלא אבזבז לך את הזמן עם פתרון לא מדוייק. 

מתוך הניסיון שלי כמורה הבנתי גם, שכשמלמדים נכון, לא באמת צריך לפתור אלפי תרגילים (כמו שעושים בדרך כלל בקורסים ובבית הספר) כדי לדעת את החומר ולהצליח בבחינה. </p>
    </div>

    let contactMe = writeMe.active &&
        <div className=' writeMe flex columns center fit borderBlack squarish'>
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
                        maxLength={500}
                    placeholder='תוכן ההודעה'
                    name='content'
                    value={writeMe.content}
                    onChange={(e) => setWriteMe(p => ({ ...p, content: e.target.value }))}
                    className='inputText' />
            </div>
            <button className='round alignCenter' style={{ width: '15vw' }} type='submit'>
                שליחה
            </button>
        </form>
            <div style={{flexDirection:'row'}} className='flex center gap1'>
                <h4> אפשר גם בוואטצאפ</h4>
                <FontAwesomeIcon
                    onClick={() => { window.location.href = 'https://wa.me/972507191745' }}
                    href=''
                    className='pointer whatsappHover'
                    size='xl'
                    color='#1b9949'
                    icon={faWhatsapp} />
            </div>
    </div>

    return (
        <div className='rtl frameDiv3 themeRadius frameMargin orangeOnBlack boxShadow'>
            {/* <FontAwesomeIcon icon={faUser}
                id='tutorSelfie' className='boxShadowHover p2' color='var(--constThemeColor)' /> */}
            <img id='tutorSelfie'
                className='boxShadowHover'
                src={selfie}
                alt="Picture of the Shai, the teacher"
                title='Picture of the course teacher'
            />
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
                {!moreInfo && <button
                    onClick={() => setMoreInfo(true)}
                    className='themeConst round'
                >קראו עוד אודותי</button>}

                {moreInfo && <div className='flex center alignCenter gap2'>
                    <span className='flex center'>
                        <FontAwesomeIcon
                            title='סגירה'
                            className='mt1 pointer'
                            onClick={() => {  setMoreInfo(false); setWriteMe(p => ({ ...p, active: false })) }}
                            icon={faSortUp} size='2xl' color='var(--constThemeColor)' />

                    </span>
                    {!writeMe.active && <button
                        onClick={() => setWriteMe(p => ({ ...p, active: true }))}
                        className='themeConst round'
                    >
                        כתבו לי
                    </button>}
                </div>}
            </div>
            {contactMe}
        </div>
    )
}

export default AboutMe;