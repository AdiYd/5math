import { useRef, useState, useContext } from 'react';
import { User } from '..';
import { debug } from '../assets/function/functions';
import './Bagrut.css'
import Card from '../components/Card';
import Carousel from "react-multi-carousel";
import { responsive } from './Home';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faFileCircleQuestion, faStopwatch, faFileLines, faFile, faInfo, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const dwnld = <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />;

export const colorList2 = [
    'rgb(174 94 94 / 50%)',
    'rgb(154 174 94 / 50%)',
    'rgb(94 174 159 / 50%)',
    'rgb(94 108 174 / 50%)',
    'rgb(98 94 174 / 50%)',
    'rgb(154 94 174 / 50%)',
    'rgb(174 94 144 / 50%)',
    'rgb(174 94 94 / 50%)'
]
export const colorList = [
    'rgb(229 19 19 / 50%)',
    'rgb(229 167 19 / 50%)',
    'rgb(206 229 19 / 50%)',
    'rgb(48 229 19 / 50%)',
    'rgb(19 229 220 / 50%)',
    'rgb(19 123 229 / 50%)',
    'rgb(103 19 229 / 50%)',
    'rgb(229 19 228 / 50%)'
]

const bagrutInfoDict = {
    L4: {
        frst: {
            title: 'השאלון הראשון כולל 3 פרקים:',
            body: [<p>
                בעיות מילוליות, סדרות, הסתברות
                <br /><i>בפרק זה צריך לענות על 2 שאלות מתוך 3 </i>
            </p>,
            <p>
                גיאומטריה במישור, טריגונומטריה במישור
                <br /><i>בפרק זה צריך לענות על שאלה אחת מתוך 2</i>
            </p>,
            <p>
                חשבון דיפרנציאלי ואינטגרלי
                <br /><i>בפרק זה צריך לענות על 2 שאלות מתוך 3</i>
            </p>,
            ],
            footer: [
                <><p>5 שאלות</p><br /><FontAwesomeIcon icon={faFileCircleQuestion} title='מספר שאלות' /></>,
                <><p>3 וחצי שעות</p><br /><FontAwesomeIcon icon={faStopwatch} title='זמן הבחינה' /></>,
                <><p>035581</p><br /><FontAwesomeIcon icon={faFileLines} title='מספר הבחינה' /></>
            ]
        },
        sec: {
            title: 'השאלון השני כולל 2 פרקים:',
            body: [<p>
                הנדסה אנליטית, וקטורים, מספרים מרוכבים, טריגונומטריה במרחב
                <br />
                <i>בפרק זה צריך לענות על 2 שאלות מתוך 3</i>
            </p>,
            <p>
                חשבון דיפרנציאלי ואינטגרלי לפונקציות מעריכיות ולוגריתמיות, בעיות גדילה ודעיכה
                <br />
                <i>בפרק זה צריך לענות על שאלה אחת מתוך 2</i>
            </p>,
            ],
            footer: [
                <><p>3 שאלות</p><br /><FontAwesomeIcon icon={faFileCircleQuestion} title='מספר שאלות' /></>,
                <><p>שעתיים ורבע</p><br /><FontAwesomeIcon icon={faStopwatch} title='זמן הבחינה' /></>,
                <><p>035582</p><br /><FontAwesomeIcon icon={faFileLines} title='מספר הבחינה' /></>
            ]
        }
    },
    L5: {
        frst: {
            title: 'השאלון הראשון כולל 3 פרקים:',
            body: [<p>
                בעיות מילוליות, סדרות, הסתברות
                <br /><i>בפרק זה צריך לענות על 2 שאלות מתוך 3 </i>
            </p>,
            <p>
                גיאומטריה במישור, טריגונומטריה במישור
                <br /><i>בפרק זה צריך לענות על שאלה אחת מתוך 2</i>
            </p>,
            <p>
                חשבון דיפרנציאלי ואינטגרלי
                <br /><i>בפרק זה צריך לענות על 2 שאלות מתוך 3</i>
            </p>,
            ],
            footer: [
                <div className='flex columns'><FontAwesomeIcon icon={faFileCircleQuestion} title='מספר שאלות' /><p>5 שאלות</p></div>,
                // <div style={{ borderLeft: '2px solid' }}></div>,
                <div className='flex columns'><FontAwesomeIcon icon={faStopwatch} title='זמן הבחינה' /><p>3 וחצי שעות</p></div>,
                // <div style={{ borderLeft: '2px solid' }}></div>,
                <div className='flex columns'><FontAwesomeIcon icon={faFileLines} title='מספר הבחינה' /><p>035581</p></div>
            ]
        },
        sec: {
            title: 'השאלון השני כולל 2 פרקים:',
            body: [<p>
                הנדסה אנליטית, וקטורים, מספרים מרוכבים, טריגונומטריה במרחב
                <br />
                <i>בפרק זה צריך לענות על 2 שאלות מתוך 3</i>
            </p>,
            <p>
                חשבון דיפרנציאלי ואינטגרלי לפונקציות מעריכיות ולוגריתמיות, בעיות גדילה ודעיכה
                <br />
                <i>בפרק זה צריך לענות על שאלה אחת מתוך 2</i>
            </p>,
            ],
            footer: [
                <div className='flex columns center'><FontAwesomeIcon icon={faFileCircleQuestion} title='מספר שאלות' /><p>3 שאלות</p></div>,
                // <div style={{ borderLeft: '2px solid' }}></div>,
                <div className='flex columns center'><FontAwesomeIcon icon={faStopwatch} title='זמן הבחינה' /><p>שעתיים ורבע</p></div>,
                // <div style={{ borderLeft: '2px solid' }}></div>,
                <div className='flex columns center'><FontAwesomeIcon icon={faFileLines} title='מספר הבחינה' /><p>035582</p></div>
            ]
        }
    }
}
const bagrutDict = {
    mA16: {
        name: "2016 - חורף",
        linkTo: "http://5math.co.il/wp-content/uploads/2019/11/2016-%D7%97%D7%95%D7%A8%D7%A3.pdf"
    },
    mA17: {
        name: "2017 - חורף",
        linkTo: "http://5math.co.il/wp-content/uploads/2019/11/2017-%D7%97%D7%95%D7%A8%D7%A3.pdf"
    },
    mB17: {
        name: "2017 - קיץ - מועד א'",
        linkTo: "http://5math.co.il/wp-content/uploads/2019/11/2016-%D7%A7%D7%99%D7%A5-%D7%9E%D7%95%D7%A2%D7%93-%D7%90%D7%B3.pdf"
    },
    mC17: {
        name: "2017 - קיץ - מועד ב'",
        linkTo: "http://5math.co.il/wp-content/uploads/2019/11/2016-%D7%A7%D7%99%D7%A5-%D7%9E%D7%95%D7%A2%D7%93-%D7%91%D7%B3.pdf"
    },
    mA18: {
        name: "2018 - חורף",
        linkTo: "http://5math.co.il/wp-content/uploads/2019/11/2018-%D7%97%D7%95%D7%A8%D7%A3.pdf"
    },
    mB18: {
        name: "2018 - קיץ - מועד א'",
        linkTo: "http://5math.co.il/wp-content/uploads/2019/11/2017-%D7%A7%D7%99%D7%A5-%D7%9E%D7%95%D7%A2%D7%93-%D7%90%D7%B3.pdf"
    },
    mC18: {
        name: "2018 - קיץ - מועד ב'",
        linkTo: "http://5math.co.il/wp-content/uploads/2019/11/2017-%D7%A7%D7%99%D7%A5-%D7%9E%D7%95%D7%A2%D7%93-%D7%91%D7%B3.pdf"
    },
    mA19: {
        name: "2019 - חורף",
        linkTo: "http://5math.co.il/wp-content/uploads/2019/11/2019-%D7%97%D7%95%D7%A8%D7%A3.pdf"
    },
    mB19: {
        name: "2019 - קיץ - מועד א'",
        linkTo: "http://5math.co.il/wp-content/uploads/2019/11/2019-%D7%A7%D7%99%D7%A5.pdf"
    },
    mC19: {
        name: "2019 - קיץ - מועד ב'",
        linkTo: "http://5math.co.il/wp-content/uploads/2020/08/%D7%9E%D7%95%D7%A2%D7%93-%D7%91-%D7%A7%D7%99%D7%A5-2019.pdf"
    },
    mA20: {
        name: "2020 - חורף",
        linkTo: "http://5math.co.il/wp-content/uploads/2019/11/2019-%D7%97%D7%95%D7%A8%D7%A3.pdf"
    },
    mB20: {
        name: "2020 - קיץ - מועד א'",
        linkTo: "http://5math.co.il/wp-content/uploads/2019/11/2019-%D7%A7%D7%99%D7%A5.pdf"
    },
    mC20: {
        name: "2020 - קיץ - מועד ב'",
        linkTo: "http://5math.co.il/wp-content/uploads/2019/11/2017-%D7%A7%D7%99%D7%A5-%D7%9E%D7%95%D7%A2%D7%93-%D7%91%D7%B3.pdf"
    }

}

function Bagrut({ ...props }) {
    document.title = 'שאלוני בגרות';
    const user = useContext(User);
    debug('Context: ', user, true);
    const [filterData, setFilterData] = useState({
        year: undefined,
        moed: undefined,
        level: undefined
    });
    const [bagrutInfo, setInfo] = useState(false);

    const nextButton = useRef();
    const prevButton = useRef();
    const slideZero = useRef();
    const slideOne = useRef();

    var filterButtons = <div
        style={{ gap: '2em' }}
        className='fliterDiv rtl fitH'>
        <p className='m1'>סינון תוצאות: </p>
        <div className='ltr ma1'>
            {['16', '17', '18', '19', '20'].map((item, index) => (
                <button
                    onClick={() => { setFilterData(p => ({ ...p, year: p.year === item ? undefined : item })) }}
                    key={`${index}  ${item}`}
                    className={`squarish pointer yearButton ${index === 0 ? 'bStart' : index === 4 ? 'bEnd' : ''}
                ${filterData.year === item ? '' : 'themeBorder'}`}>
                    {`20${item}`}
                </button>
            ))}
        </div>
        <div className='ltr ma1'>
            {['A', 'B', 'C'].map((item, index) => (
                <button
                    onClick={() => { setFilterData(p => ({ ...p, moed: p.moed === item ? undefined : item })) }}
                    key={`${index}  ${item}`}
                    className={`squarish pointer rtl yearButton ${index === 0 ? 'bStart' : index === 2 ? 'bEnd' : ''}
                ${filterData.moed === item ? '' : 'themeBorder'}`}>
                    {item === 'A' ? 'חורף' : item === 'B' ? "קיץ א'" : "קיץ ב'"}
                </button>
            ))}
        </div>
    </div>

    let bagrut5 = <div className='fitH'>
        {filterButtons}
        <div className='flex center wrap bagrutContainers' >
            {
                Object.keys(bagrutDict).filter((item) => {
                    return (!filterData.level && !filterData.moed && !filterData.year) || ((
                        ((filterData.year && item.includes(filterData.year) || !filterData.year) && ((filterData.moed && item.includes(filterData.moed)) || !filterData.moed))))
                }).map((item, indx) => (
                    <Card
                        style={{ backgroundImage: `linear-gradient(45deg,${colorList[indx % (colorList.length)]},transparent` }}
                        key={item + indx}
                        title={bagrutDict[item].name}
                        translateY={false}
                        cardID='bagrutCard' className='rtl' >
                        <h3>{bagrutDict[item].name}</h3>
                        <a
                            className='downLoad squarish'
                            href={bagrutDict[item].linkTo}>
                            הורדה &nbsp;
                            <FontAwesomeIcon icon={faDownload} size='lg' />

                        </a>
                    </Card>
                ))
            }
        </div>
    </div>

    let bagrut5_about =
        <div className='rtl' style={{ maxWidth: '87%', margin: 'auto' }}>
        <h3>מבנה הבחינה:</h3>
        <p> בבחינת הבגרות במתמטיקה 5 יחידות אנחנו נדרשים ליישם ידע במגוון רחב של נושאים מתמטיים בזמן מוגבל.

            הכרת מבנה הבחינה תעזור לך לתכנן נכון את הלמידה למבחן וגם את חלוקת הזמן ובחירת השאלות במהלך הבחינה עצמה. אז מה בעצם צפוי לך בבחינה? </p>
        <div className='grid columns' style={{ gridTemplateColumns: '1fr 1fr' }}>
            {Object.values(bagrutInfoDict.L5).map((item, index) => (
                <Card
                    // style={{ backgroundImage: `linear-gradient(45deg,${colorList[Math.floor(Math.random() * colorList2.length)]},transparent` }}
                    className={`${index === 0 ? 'borderDropBR' : 'borderDropBL'} ${user.darkMode ? 'darkModeGradient' : ''}`} cardID={'bagrutInfoCarusel'} key={index} boxShadow={true} translateY={false}>
                    <h3 >{item.title}</h3>
                    <div className='grid rows tStart'>
                        {item.body.map((line, ind) => (
                            <div key={ind} className='flex m1' style={{ alignItems: 'start' }} >
                                <p className='ml1'>{`${ind + 1}.`}</p>
                                {line}
                            </div>
                        ))}
                    </div>
                    <hr
                        // style={{ width: '100%', border: '1px solid var(--themeGrey)', margin: '0.1em' }} 
                        id='horizLine'
                    />
                    <div className='footerBagrutInfo'>
                        {/* <h3 >אז מה היה לנו ?</h3> */}
                        {item.footer.map((line, indx) => (
                            <div key={indx}>
                                {line}
                            </div> 
                        ))}
                    </div>
                </Card>
            ))}
        </div>
    </div>

    const onSlideChange = (slide) => {
        debug('This is the slide: ', slide, true);
        setInfo(!Boolean(slide % 2));
    }

    const ButtonCarusel = ({ next, previous, goToSlide, ...rest }) => {
        const { carouselState: { currentSlide } } = rest;
        return (
            <div style={{ display: 'none' }} className="carousel-button-group">
                <button ref={nextButton} onClick={() => next()} />
                <button ref={prevButton} onClick={() => previous()} />
                <button ref={slideZero} onClick={() => goToSlide(0)} />
                <button ref={slideOne} onClick={() => goToSlide(1)} />
            </div>
        );
    };


    return (
        <div className={`bagrutMain ${user.darkMode ? 'darkMode' : ''}`}>
            <div style={{ height: '1em' }}></div>
            <h1>בגרות במתמטיקה - מידע ושאלונים</h1>
            <div className='flex center gap2'>
                <button
                    onClick={() => { setInfo(true); slideOne.current.click() }}
                    className={`pl3 pr3 round ${!bagrutInfo ? 'themeBorder' : ''}`} >
                    <FontAwesomeIcon icon={faInfoCircle} className='ml2' />
                    מידע על מבנה הבגרות</button>
                <button
                    onClick={() => { setInfo(false); slideZero.current.click() }}
                    className={`pl3 pr3 round ${bagrutInfo ? 'themeBorder' : ''}`} >
                    <FontAwesomeIcon icon={faFile} className='ml2' />
                    שאלוני בגרות משנים קודמות</button>
            </div>

            <Carousel
                afterChange={(slide) => onSlideChange(slide)}
                swipeable={true}
                draggable={false}
                showDots={true}
                arrows={false}
                customButtonGroup={<ButtonCarusel />}
                responsive={responsive}
                // ssr={true} // means to render carousel on server-side.
                infinite={true}
                // autoPlay={this.props.deviceType !== "mobile" ? true : false}
                // autoPlaySpeed={1000}
                keyBoardControl={true}
                // customTransition="all .5"
                // transitionDuration={1000}
                // partialVisbile={true}
                containerClass="carouselBagrut"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                // deviceType={this.props.deviceType}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px">
                {bagrut5}
                {bagrut5_about}
            </Carousel>
        </div>
    )
}

export default Bagrut;