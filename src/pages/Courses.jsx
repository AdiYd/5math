import {useState, useEffect}  from "react";

import React from 'react';
import { debug } from "../assets/function/functions";
import { dataBase } from "./App";
import './Courses.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { responsive } from "./Home";
import { faBell, faClock, faCommentSms, faCreditCard, faLock, faQuestionCircle, faStopwatch, faUserAstronaut, faWrench } from "@fortawesome/free-solid-svg-icons";
import Carousel from "react-multi-carousel";
import { MathJax } from "better-react-mathjax";
import Checkbox from "../components/CheckBox";
import Prompt from "../components/PromptDiv";
import Logo from "../components/Logo";

const crncy = '₪';

const courses = [
  {
    name: 'וקטורים',
    mathJax: '$$ \\vec{v} + \\vec{a} = 2\\vec{b} $$',
    bullets: [
      'כל מה שצריך לבגרות',
      'אנימציות מתקדמות, דוגמאות וטיפים',
      'פתרון שאלות מבגרות'
    ],
    originalPrice: 60,
    discountedPrice: 39.9,
    bgColor: 'linear-gradient(60deg,transparent, rgba(0, 166, 260, 0.2))'
  },
  {
    name: 'אנליטית',
    mathJax: '$\\frac{(x - h)^2}{a^2} + \\frac{(y - k)^2}{b^2} = 1$',
    bullets: [
      'מעבר על כל סוגי השאלות',
      'תרגול ופתרון שאלות בגרות',
      'בונוס - חוברת תרגול'
    ],
    originalPrice: 60,
    discountedPrice: 39.9,
    bgColor: 'linear-gradient(120deg,transparent, rgba(32, 206, 1,0.2))'
  },
  {
    name: 'חדו"א',
    mathJax: "$$ \\int f'(x)dx = f(x) + C $$",
    bullets: [
      '20 שעות תוכן',
      'פונקציות, נגזרות, אינטגרלים',
      'בונוס - חוברת תרגול',
    ],
    originalPrice: 60,
    discountedPrice: 39.9,
    bgColor: 'linear-gradient(180deg,transparent, rgba(220, 35, 35,0.2))'
  },
  {
    name: 'מרוכבים',
    mathJax: '$$ z=rcos(\\theta)+i\\cdot rsin(\\theta) $$',
    bullets: [
        'תוכן ויזואלי ופרקטי',
        'הסברים ופתרון שאלות - צעד צעד',
        'בונוס - חוברת תרגול',
    ],
    originalPrice: 60,
    discountedPrice: 39.9,
    bgColor: 'linear-gradient(240deg,transparent, rgb(213, 118, 248,0.2))'
  },
  {
    name: 'משוואות מעריכיות',
    mathJax: '$$f(x) = e^{2x}ln(x)$$',
    bullets: [
      'הסברים ודוגמאות רבות',
      'טכניקות וטיפים לפתרון',
      'פתרון שאלות בגרות',
    ],
    originalPrice: 60,
    discountedPrice: 39.9,
    bgColor: 'linear-gradient(300deg,transparent, rgba(243, 159, 46, 0.2))'
  }
];

const CourseCard = ({ course }) => {

    let price =   <div className="price rtl">
                    <span className="original-price">
                    {crncy}{course.originalPrice}
                    </span>
                    <MathJax>
                    <a id="mathJax" className="discounted-price">
                    {`$ \\text{${crncy}} ${course.discountedPrice} $`}
                    </a>
                    </MathJax>
                </div>
    let purches =  <div className="flex center">
                        <button 
                        style={{width:'75%'}}
                        id="purchesButton"
                        className="round border ma3 pt2 pointer pb2">לרכישה</button>
                    </div>
    let bullets =  <div>
                    <MathJax>
                        <a id="mathJax">{course.mathJax}</a>
                    </MathJax>
                    <ul>
                        {course.bullets.map((bullet, index) => (
                        <li key={index}><i className="fas fa-check-circle"></i> {bullet}</li>
                        ))}
                    </ul>
                </div>
    let title =  <div>
                    <h2>{course.name}</h2>
                    <hr id='horizLine'/>
                </div>

  return (
    <div className="course-card noneSelect boxShadowHover" style={{backgroundImage:course.bgColor}}>
        {title}
        {bullets}
        {price}
        {purches}
    </div>
  );
};

const Courses = ({...props}) => {
    const [option, setOption] = useState('582');
    const [notify, setNotify] = useState(true);
    const [msg, setMsg] = useState(undefined);

    function onSubmitForm(e) {
        e.preventDefault();
        let formaName = e.target.name;
        var formData = new FormData(e.target);
        let userDataObj = Object.fromEntries(formData);
        debug('Your form data is :', userDataObj, true);
        for (let item in userDataObj){
            if (userDataObj[item] === 'on'){
                userDataObj[item] = true;
            }
        }
        dataBase.addItem({tableName: 'Users_Leads',item:{...userDataObj, approved: ('Approve' in userDataObj)? 1:0}});
        setMsg(<Prompt
                height='fit-content'
                showButton={true}
                callBack={() => {setMsg(undefined)}}
                style={{ height: 'fit-content', borderRadius: '20px' }}
                showDiv={true} >
                    <Logo />
                    <h3> ✨ קיבלנו את הבקשה, {userDataObj.name} </h3>
                    <h4> נודיע לך כשיעלו התכנים, בנתיים אפשר להתנסות בתכנים שקיימים</h4>
             </Prompt>)
    }

    let coursesOptions = <div className="flex center gap2">
                            {/* <p className="w500">בחרו שאלון : </p> */}
                                <button 
                                style={{padding:'0.7em 2em'}}
                                onClick={()=>{setOption('581')}}
                                className={`${option ==='581' ? '':'themeBorder'} borderTheme squarish`}> שאלון 581</button>
                                <button 
                                style={{padding:'0.7em 2em'}}
                                onClick={()=>{setOption('582')}}
                                className={`${option ==='582' ? '':'themeBorder'} borderTheme squarish`}> שאלון 582</button>
                    </div>

    let paymentPromo =  <div className="flex center gap2 m2">
                            <div className="flex gap1 columns lineargrad border paymentPromo center">
                                <a className=""> רכישה מאובטחת ובטוחה  </a>
                                <div className="flex center gap2">
                                    <FontAwesomeIcon icon={faLock} />
                                    <FontAwesomeIcon icon={faCreditCard} />
                                </div>
                            </div>
                            <div className="flex gap1 columns lineargrad border paymentPromo center">
                                <a className=""> הקורסים פתוחים למשך 8 חודשים </a>
                                <div className="flex center gap2">
                                    <FontAwesomeIcon icon={faClock} />
                                    <FontAwesomeIcon icon={faUserAstronaut} />
                                </div>
                            </div>
                            <div className="flex gap1 columns lineargrad border paymentPromo center">
                                <a className=""> ניתן להתייעץ ולשאול את המורה שאלות </a>
                                <div className="flex center gap2">
                                    <FontAwesomeIcon icon={faQuestionCircle} />
                                    <FontAwesomeIcon icon={faCommentSms} />
                                </div>
                            </div>
                      </div>

    let caruselSection2 = <div className="course-list">
                        {courses.map((course, index) => (
                            index >2 && <CourseCard key={index} course={course} />
                        ))}
                    </div>

    let caruselSection1 = <div className="course-list">
                            {courses.map((course, index) => (
                            index<3 && <CourseCard key={index} course={course} />
                            ))}
                        </div>

    let carusel = <section className='caruselDiv'>
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
                itemClass="carousel-item-padding-39.9-px">

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

    let notifyForm = <div id='notifyMe'
                        className='quickSignUp themeRadius blackOnWhite squarish frameMargin pt3 pb3 boxShadow'>
                        <div className='flex center ma2 columns'>
                            <div className='flex center gap1'>
                                <FontAwesomeIcon icon={faBell} className="shake" size='2xl' color="var(--ThemeGPTOrangeDeep)"/>
                                {/* <FontAwesomeIcon icon={faVideo} size='2xl' color='var(--ThemeGPTOrangeDeep)' /> */}
                            </div>
                            <h3 className="pt2">נרשמים כאן ומקבלים תזכורת כשהתכנים יעלו לאתר</h3>
                        </div>
                        <form onSubmit={onSubmitForm} name='quick Signup' >
                        <div style={{flexDirection:'row'}} className="flex center gap2">
                                <a> שאלון: </a>
                                <label className="flex alignCenter" htmlFor="582">
                                    <Checkbox 
                                        title = 'רוצה תכנים לשאלון 581'
                                        id='581' 
                                        name={'581'}
                                        defaultChecked = {true} />
                                        581 
                                </label>
                                <label className="flex alignCenter" htmlFor="4 יחידות">
                                    <Checkbox 
                                        title = 'רוצה תכנים של 4 יחידות'
                                        id='4 יחידות' 
                                        name={'4 יחידות'}
                                        defaultChecked = {false} />
                                        4 יחידות
                                </label>
                            </div>
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
                                    type='submit'>להרשמה</button>
                            </div>
                            <div className='flex center' id='checkBoxDiv'>
                                <div className='flex center checkboxContainer'>
                                    <Checkbox 
                                    // onChange= {(e)=>{debug('Changing: ',e.target.value);e.target.value = !e.target.value}}
                                    onChange={()=>{}}
                                    checked = {true}
                                    color='var(--ThemeGPTGreen)' id='Approve' name='Approve' title="אישור קבלת דואר" />
                                    <label forhtml='Approve'>אישור קבלת עדכונים והטבות במייל</label>
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

    let main;
    if (option ==='582'){
        main =  <>
            <p className="w600">מעל 60 שעות של תוכן איכותי ומאורגן לפי נושאים עם תרגילים לדוגמה וחוברת תרגילים, ניתן לרכוש נושאים בודדים או את כל התוכן במחיר משתלם</p>
           
            <p className="w500"> איך לומדים איתנו בצורה יעילה? צפו בשיעור ולאחר מכן בפתרון תרגיל לדוגמה, המשיכו ופתרו מספר תרגילים בעצמכם ברמות קושי משתנות (מחוברת התרגול המצורפות או ממקורות אחרים)
            <br/> מתקשים? אנחנו פה! חזרו לשיעור, להסברים, לתרגול, לדוגמאות ודברו איתנו 🙂</p>
          
            {carusel}
            {paymentPromo}
            <p className="w500"> מהירי הבנה? מעולה, תוכלו לצפות בקצב מהיר(x 1.5), לוקחים את הזמן? נהדר, מוזמנים לצפות בקצב שלכם (x 0.75) ולחזור על השיעורים כמה שרק תרצו </p>
        </>  
    }
    else if (option ==='581'){
        main =  <>
                {msg}
                <div className="onConstruction">
                <div className="flex center gap2">
                            {/* <FontAwesomeIcon icon={faBell} size="2xl" color="#CD7F32" /> */}
                            <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            enableBackground="new 0 0 20 20" 
                            height="35px" viewBox="0 0 20 20" 
                            width="35px" fill="#FFA500">
                                <g>
                                <rect fill="none" height="20" width="20" x="0"/>
                                </g><g><g>
                                <path d="M16.71,14.59l-3.54-3.54h-1.41l-0.34-0.34l-0.71,0.71l0.34,0.34v1.41l3.54,3.54c0.39,0.39,1.02,0.39,1.41,0L16.71,16 C17.1,15.61,17.1,14.98,16.71,14.59z M15.29,16l-3.18-3.18l0.71-0.71L16,15.29L15.29,16z"/>
                                <path d="M12.57,8.14L12.57,8.14l0.88,0.88l1.06-1.06l1.41,1.41c0.78-0.78,0.78-2.05,0-2.83l-2.47-2.47l-0.74,0.74l0-1.49 l-0.49-0.49L9.74,5.31l0.49,0.49l1.49,0l-0.74,0.74l0.88,0.88L10,9.29L7.51,6.81l0.15-1.26L5.36,3.23L3.23,5.36l2.31,2.31 l1.26-0.15L9.29,10l-1.05,1.05H6.83l-3.54,3.54c-0.39,0.39-0.39,1.02,0,1.41L4,16.71c0.39,0.39,1.02,0.39,1.41,0l3.54-3.54v-1.41 L12.57,8.14z M4.71,16L4,15.29l3.18-3.18l0.71,0.71L4.71,16z"/>
                                </g></g>
                            </svg>
                            <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            height="35px" 
                            viewBox="0 0 24 24"
                            width="35px" 
                            fill="#FFD700">
                                <path d="M0 0h24v24H0V0z" fill="none"/>
                                <path d="m23 12-2.44-2.78.34-3.68-3.61-.82-1.89-3.18L12 3 8.6 1.54 6.71 4.72l-3.61.81.34 3.68L1 12l2.44 2.78-.34 3.69 3.61.82 1.89 3.18L12 21l3.4 1.46 1.89-3.18 3.61-.82-.34-3.68L23 12zm-4.51 2.11.26 2.79-2.74.62-1.43 2.41L12 18.82l-2.58 1.11-1.43-2.41-2.74-.62.26-2.8L3.66 12l1.85-2.12-.26-2.78 2.74-.61 1.43-2.41L12 5.18l2.58-1.11 1.43 2.41 2.74.62-.26 2.79L20.34 12l-1.85 2.11zM11 15h2v2h-2zm0-8h2v6h-2z"/>
                            </svg>
                            <FontAwesomeIcon icon={faWrench} size="2xl" color="#228B22" />
                    </div>
                    <h3>אנחנו על זה ...</h3>
                    <p  className="ma1 w500">אנו מכינים ברגעים אלו את הקורס לשאלון 581 (5 יחידות י"א) ובקרוב נעלה את התכנים.
                        <br/> בנוסף, אנו עובדים על קורס הכנה לבגרות 4 יחידות, בקרוב!
                    </p>
                   
                    <p  className="ma1 mb3 w500">רוצים לקבל עדכון כשהקורס של שאלון 581 / 4 יח"ל יעלה לאתר? 
                        <a
                        onClick = {()=>{}} 
                        className="notify darkRed m2 opacityHover"> הרשמו למטה </a>
                    </p>
                    {notify && notifyForm}
                </div>
            </>
    }

  return (
    <div className="Courses">
        <h2>הקורסים שלנו לבגרות</h2>
        {coursesOptions}
      
        {main}
        
    </div>
  );
};

export default Courses;
