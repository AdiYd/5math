import { useContext, useState } from "react";
import { debug } from "../assets/function/functions";
import { User } from "..";
import Carousel from "react-multi-carousel";
import Card from "../components/Card";
import { responsive } from "./Home";
import './About.css';


export default function AboutUs({ ...props }) {
    document.title = 'הסיפור שלנו';
    const user = useContext(User);
    debug('Context: ', user, true);

    let frame1 = <>
        {Array(5).fill(1).map((item, indx) => (
            <Card key={indx} >
                <h1>{item}</h1>
                <p>משהו</p>

            </Card>
        ))}
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
                <p >תוכן ויזואלי ערוך תמציתי ומדויק, סרטונים ותרגילים ברמה גבוהה יחד עם ממשק דיגטלי וכלים שיעזרו לכם להבין כל נושא לעומק  </p>

                <h3 id='textGradient'> להבין מתמטיקה באופן אינטואיטיבי</h3>
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


    let aboutCarusel = <section className='caruselDiv'>
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
            <div className="flex center">
                {frame1}
            </div>
            <div className="flex center">
                {frame1}
            </div>
        </Carousel>
    </section>

    return (
        <div id='about' className={`${user.darkMode ? 'darkMode' : ''}`}>
            <h1> הקורס הדיגיטלי המתקדם ביותר ללימודי מתמטיקה אונליין</h1>
            <h3>ללמוד, להבין ולתרגל מתמטיקה ממורים מנוסים שיודעים בדיוק מה אתם צריכים</h3>
            {aboutCarusel}

        </div>
    )
}