import {useState, useEffect}  from "react";

import React from 'react';
import './Courses.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { responsive } from "./Home";
import { faBell, faClock, faCommentSms, faCreditCard, faLock, faQuestionCircle, faUserAstronaut, faWrench } from "@fortawesome/free-solid-svg-icons";
import Carousel from "react-multi-carousel";
import { MathJax } from "better-react-mathjax";

const crncy = '₪';

const courses = [
  {
    name: 'וקטורים',
    bullets: [
      '20 שעות של תוכן',
      'וקטורים במרחב',
      'גאומטריה וקטורית',
      'אנימציות מתקדות',
      'פתרון שאלות מבגרות'
    ],
    originalPrice: 55,
    discountedPrice: 40,
    bgColor: 'linear-gradient(170deg,transparent, rgba(0, 166, 255, 0.5))'
  },
  {
    name: 'אנליטית',
    bullets: [
      'מעבר על כל סוגי השאלות',
      'תרגול ופתרון שאלות בגרות',
      'הדרכה צעד צעד וטיפים',
      'בונוס - חוברת תרגול'
    ],
    originalPrice: 55,
    discountedPrice: 40,
    bgColor: 'linear-gradient(170deg,transparent, rgba(32, 206, 1,0.5))'
  },
  {
    name: 'חשבון דפרנציאלי ואינטגרלי',
    bullets: [
      '20 שעות של הסברים',
      'פונקציות, נגזרות, אינטגרלים',
      'חקירת פונקציות ופתרון בעיות קיצון',
      'דוגמאות שימושיות',
      'תרגול וחיזוק הבנה'
    ],
    originalPrice: 55,
    discountedPrice: 40,
    bgColor: 'linear-gradient(170deg,transparent, rgba(220, 35, 35,0.5))'
  },
  {
    name: 'מרוכבים',
    bullets: [
      '30 hours of content',
      'Expert instructors',
      'Practical examples',
      'Community support'
    ],
    originalPrice: 55,
    discountedPrice: 40,
    bgColor: 'linear-gradient(170deg,transparent, rgba(168, 0, 230, 0.5))'
  },
  {
    name: 'משוואות מעריכיות',
    bullets: [
      '25 hours of content',
      'Downloadable resources',
      'Project-based learning',
      'Money-back guarantee'
    ],
    originalPrice: 55,
    discountedPrice: 40,
    bgColor: 'linear-gradient(170deg,transparent, rgba(243, 159, 46, 0.5))'
  }
];

const CourseCard = ({ course }) => {
  return (
    <div className="course-card border" style={{backgroundImage:course.bgColor}}>
      <h2>{course.name}</h2>
      <ul>
        {course.bullets.map((bullet, index) => (
          <li key={index}><i className="fas fa-check-circle"></i> {bullet}</li>
        ))}
      </ul>
      <div className="price rtl">
      <MathJax><span className="original-price">{`$ \\text{${crncy}} ${course.originalPrice} $`}</span></MathJax>
        <span className="discounted-price">{crncy}{course.discountedPrice}</span>
      </div>
      <div className="flex center">
        <button 
        style={{padding:'0.8em 2em'}}
        className="squarish pointer lineargrad themeColorAlpha ma2 borderBlack">לרכישה</button>
      </div>
    </div>
  );
};

const Courses = ({...props}) => {
    const [option, setOption] = useState('582');

    let coursesOptions = <div className="flex center gap2">
                            <p className="w500">בחרו שאלון : </p>
                                <button 
                                onClick={()=>{setOption('581')}}
                                className={`${option ==='581' ? '':'themeBorder'} squarish`}> שאלון 581</button>
                                <button 
                                onClick={()=>{setOption('582')}}
                                className={`${option ==='582' ? '':'themeBorder'} squarish`}> שאלון 582</button>
                    </div>

    let paymentPromo =  <div className="flex center gap2">
                            <div className="flex gap1 columns paymentPromo center">
                                <a className=""> רכישה מאובטחת ובטוחה  </a>
                                <div className="flex center gap2">
                                    <FontAwesomeIcon icon={faLock} />
                                    <FontAwesomeIcon icon={faCreditCard} />
                                </div>
                            </div>
                            <div className="flex gap1 columns paymentPromo center">
                                <a className=""> הקורסים פתוחים למשך 8 חודשים </a>
                                <div className="flex center gap2">
                                    <FontAwesomeIcon icon={faClock} />
                                    <FontAwesomeIcon icon={faUserAstronaut} />
                                </div>
                            </div>
                            <div className="flex gap1 columns paymentPromo center">
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
    let main;
    if (option ==='582'){
        main =  <>
            <p className="w500"> צפו בשיעור בנושא מסוים ובפתרון תרגיל לדוגמה, פתרו כמה תרגילים בעצמכם מחוברת התרגול או ממקורות אחרים, מתקשים? חזרו לשיעור, לתרגילים ולדוגמאות או שתדברו איתנו 🙂</p>
            {paymentPromo}
            {carusel}
            <p className=""> מהירי הבנה? מעולה, תוכלו לצפות בקצב מהיר(x 1.5), לוקחים את הזמן? נהדר, מוזמנים לצפות בקצב שלכם (x 0.75) ולחזור על השיעור כמה שרק תרצו </p>
        </>  
    }
    else if (option ==='581'){
        main =  <>
                <div style={{margin:'2em 3em'}} className="ma3">
                    <p style={{margin:'1em'}} className="w500">אנו מכינים ברגעים אלו את הקורס לשאלון 581 (5 יחידות י"א) ובקרוב נעלה את התכנים.
                        <br/> בנוסף, אנו עובדים על קורס הכנה לבגרות 4 יחידות, בקרוב!
                    </p>
                    <div className="flex center gap2">
                            <FontAwesomeIcon icon={faBell} size="2xl" color="#CD7F32" />
                            <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            height="48px" 
                            viewBox="0 0 24 24"
                            width="48px" 
                            fill="#FFD700">
                                <path d="M0 0h24v24H0V0z" fill="none"/>
                                <path d="m23 12-2.44-2.78.34-3.68-3.61-.82-1.89-3.18L12 3 8.6 1.54 6.71 4.72l-3.61.81.34 3.68L1 12l2.44 2.78-.34 3.69 3.61.82 1.89 3.18L12 21l3.4 1.46 1.89-3.18 3.61-.82-.34-3.68L23 12zm-4.51 2.11.26 2.79-2.74.62-1.43 2.41L12 18.82l-2.58 1.11-1.43-2.41-2.74-.62.26-2.8L3.66 12l1.85-2.12-.26-2.78 2.74-.61 1.43-2.41L12 5.18l2.58-1.11 1.43 2.41 2.74.62-.26 2.79L20.34 12l-1.85 2.11zM11 15h2v2h-2zm0-8h2v6h-2z"/>
                            </svg>
                            <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            enable-background="new 0 0 20 20" 
                            height="48px" viewBox="0 0 20 20" 
                            width="48px" fill="#FFA500">
                                <g>
                                <rect fill="none" height="20" width="20" x="0"/>
                                </g><g><g>
                                <path d="M16.71,14.59l-3.54-3.54h-1.41l-0.34-0.34l-0.71,0.71l0.34,0.34v1.41l3.54,3.54c0.39,0.39,1.02,0.39,1.41,0L16.71,16 C17.1,15.61,17.1,14.98,16.71,14.59z M15.29,16l-3.18-3.18l0.71-0.71L16,15.29L15.29,16z"/>
                                <path d="M12.57,8.14L12.57,8.14l0.88,0.88l1.06-1.06l1.41,1.41c0.78-0.78,0.78-2.05,0-2.83l-2.47-2.47l-0.74,0.74l0-1.49 l-0.49-0.49L9.74,5.31l0.49,0.49l1.49,0l-0.74,0.74l0.88,0.88L10,9.29L7.51,6.81l0.15-1.26L5.36,3.23L3.23,5.36l2.31,2.31 l1.26-0.15L9.29,10l-1.05,1.05H6.83l-3.54,3.54c-0.39,0.39-0.39,1.02,0,1.41L4,16.71c0.39,0.39,1.02,0.39,1.41,0l3.54-3.54v-1.41 L12.57,8.14z M4.71,16L4,15.29l3.18-3.18l0.71,0.71L4.71,16z"/>
                                </g></g>
                            </svg>
                            <FontAwesomeIcon icon={faWrench} size="2xl" color="#228B22" />
                    </div>
                    <p style={{margin:'1em'}} className="w600">רוצים לקבל עדכון כשהקורס של שאלון 581 / 4 יח"ל יעלה לאתר? 
                        <a
                        onClick = {()=>{}} 
                        className="notify pointer darkRed m2 opacityHover"> לחצו כאן </a>
                    </p>
                </div>
            </>
    }

  return (
    <div className="Courses">
        <h2>הקורסים שלנו לבגרות</h2>
        <p className="w500">מעל 60 שעות של תוכן איכותי ומאורגן לפי נושאים, בכל נושא תרגילים לדוגמה וחוברת תרגילים</p>
        <p className="w500">ניתן לרכוש נושאים בודדים או את כל התוכן של השאלון במחיר משתלם</p>
        {coursesOptions}
      
        {main}
        
    </div>
  );
};

export default Courses;
