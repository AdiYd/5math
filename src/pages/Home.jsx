import assist from '../assets/img/pesonalAssist.png';
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
import { faGift, faVideo } from '@fortawesome/free-solid-svg-icons';
import { } from '@fortawesome/free-regular-svg-icons';
import { } from '@fortawesome/free-brands-svg-icons';
import Prompt from '../components/PromptDiv';
import Checkbox from '../components/CheckBox';
import AboutMe from '../components/AboutMe';

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
    function onSubmitForm(e) {
        e.preventDefault();
        let formaName = e.target.name;
        var formData = new FormData(e.target);
        let userDataObj = Object.fromEntries(formData);
        debug('This is formData: ', userDataObj, true);
    }

    return (
        <div className="App">
            {/* <div style={{ height: '4em' }}></div> */}

            <div className='flex center frameDiv1 round boxShadow'>
                <div className='alignCenter'>
                    <Logo />
                    <h1>קורס הכנה לבגרות 5 ו 4 יח"ל, בשילוב כלים דיגיטליים חכמים</h1>
                    <h2> ללמוד ולתרגל בצורה חכמה כל הדרך אל הבגרות, בעזרת תוכן איכותי ומונגש</h2>
                    <h2>לגשת לבגרות בראש שקט ובבטחון</h2>
                    <button
                        className='themeConst2'
                        id='trialButton'>לצפייה בשיעור ניסיון</button>
                </div>
            </div>

            {/* <div style={{ height: '4em' }}></div> */}

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

                    <div className='flex center frameDiv2'>
                        <Card cardID={'frame2Card'}>
                            <>
                                <div className='flex center' style={{ verticalAlign: 'top' }}>
                                    <img id='frame2Img'
                                        src={digital} alt='לוגו תוכן דיגיטלי' title='תוכן דיגיטלי' />
                                </div>
                                <div>
                                    <h3 className='cardText'>תוכן ויזואלי ודיגיטלי</h3>
                                    <hr id='horizLine' />
                                </div>
                                <p >אנימציות, כתב מחשב, תלת מימד
                                    ועוד מגוון שיפורים שטרם ראיתם</p>
                            </>
                        </Card>
                        <Card cardID={'frame2Card'}>
                            <>
                                <div className='flex center' style={{ verticalAlign: 'top' }}>
                                    <img id='frame2Img'
                                        src={timeSave} alt='לוגו חסכון בזמן' title='חסכון בזמן' />
                                </div>
                                <div>
                                    <h3 className='cardText'>הקורס שיחסוך לכם זמן וכסף</h3>
                                    <hr id='horizLine' />
                                </div>
                                <p>
                                    צמצמנו את החומר כדי ללמד אתכם בצורה הטובה, היעילה והאיכותית ביותר
                                </p>
                            </>
                        </Card>
                        <Card cardID={'frame2Card'}>
                            <>
                                <div className='flex center' style={{ verticalAlign: 'top' }}>
                                    <img id='frame2Img'
                                        src={experience} alt='לוגו 21 שנות ניסיון' title='21 שנות נסיון' />
                                </div>
                                <div>
                                    <h3 className='cardText'>21 שנות ניסיון בהוראת מתמטיקה</h3>
                                    <hr id='horizLine' />
                                </div>
                                <p>מדריך מנוסה בהוראת מתמטיקה במכונים הגדולים והמוצלחים ביותר בישראל
                                </p>
                            </>
                        </Card>
                        <Card cardID={'frame2Card'}>
                            <>
                                <div className='flex center' style={{ verticalAlign: 'top' }}>
                                    <img id='frame2Img'
                                        src={assist} alt='לוגו ליווי אישי צמוד' title='ליווי אישי' />
                                </div>
                                <div>
                                    <h3 className='cardText'>ליווי אישי צמוד</h3>
                                    <hr id='horizLine' />
                                </div>
                                <div className='flex'>
                                    <p>אנחנו כאן איתכם,
                                        כל הדרך אל ההצלחה

                                    </p>
                                </div>
                            </>
                        </Card>

                    </div>
                    <div className='flex center'>
                        <Card style={cardStyle} />
                        <Card style={cardStyle} />
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
                            maxLength={20}
                            required={true}
                            autoComplete='on'
                            title='שם מלא'
                            type='text'
                            // onChange={onInputHandler}
                            placeholder='שם מלא'
                            name='name'></input>
                        <input
                            id='email'
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
