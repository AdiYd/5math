import './Components.css';
import selfie from '../assets/img/shaiProfile.jpg'
import { useState } from 'react';

function AboutMe({ ...props }) {
    const [active, setActive] = useState(false);

    let additionalData = active && <p>
        בתיכון הייתי תלמיד חלש ב 3 יחידות מתמטיקה. די מהר הסקתי שמתמטיקה זה לא בשבילי ושעדיף להתמקד בחלום שלי… להיות רפתן.  נרשמתי ללימודי מכינה למדעי הטבע באוניברסיטה העברית, אבל דווקא שם  התאהבתי במתמטיקה ובפיזיקה, וההתאהבות הלא צפויה הזו שינתה את כיוון חיי מרפתנות – לתואר בפיזיקה. למדתי שלמורה אחד יש את הכוח להשפיע על חייהם של מאות תלמידים.

        רציתי לעזור לתלמידים כמוני, שחוו תחושת כישלון בגלל מערכת חינוך לא מלמדת, ולהראות להם, כמו שגיליתי בעצמי, את היופי והעוצמה שבמתמטיקה. כך הפכתי להיות מורה.
    </p>

    return (
        <div className='rtl frameDiv3 round boxShadow'>
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
            <p >
                אני מלמד מתמטיקה ופיזיקה ברמת 5 יחידות לבגרות מאז שנת 2001.
                ב- 20 השנים האחרונות זכיתי ללמד אלפי תלמידים אשר ניגשו לבגרות 5 יח”ל מתמטיקה באחוזי הצלחה יוצאי דופן.
                באתר שלפניכם, ארזתי את כל הידע המצטבר שלי (יחד עם תובנות של התלמידים) לקורס ההכנה לבגרות הטוב ביותר שתוכלו למצוא. היה לי חשוב, לדייק את הלימודים המקוונים, בצורה ובדרך חדשנית אשר לא תמצאו באף מקום אחר בישראל.
                אני מאמין כי זו הדרך ללמוד היום מתמטיקה ואני פה כדי ללוות אתכם בכל התהליך.
            </p>
            {additionalData}
            <div className='flex center'>
                <button
                    onClick={() => setActive(p => !p)}
                    className='themeConst large'
                    id='trialButton'
                > {active ? 'קראו פחות' : 'קראו עוד אודותי'}</button>
            </div>

        </div>
    )
}

export default AboutMe;