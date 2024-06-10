import assist from '../assets/img/pesonalAssist.png';
import experience from '../assets/img/experience.png';
import timeSave from '../assets/img/timeSave.png';
import digital from '../assets/img/digital.png';
import selfie from '../assets/img/shaiProfile.jpg'
import { debug } from '../assets/function/functions';
import Card from '../components/Card';
import Logo from '../components/Logo';
import './App.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
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
    height: '7em',
    width: '7em',
    padding: '0.8em',
    // border: '1px solid rgba(0,0,0,0.2)',
    borderRadius: '25px',
    marginBottom: '2em',
    filter: 'opacity(0.8)'
}

const cardStyle = {
    margin: '0.4em 2em 1em 2em',
    padding: '2em 0.7em',
    borderRadius: '0px',
    width: '12vw',
    height: '15em',
    direction: 'rtl'
}

function Home() {
    return (
        <div className="App">
            <h1>This is the start234234ing point!</h1>
            <div className='flex center'>
                <button className='border m1'>This is button1</button>
                <button className='round  m2'>This is button2</button>
                <button className='round  m3'>This is button2</button>
                <button className='round border m3'>This is button3</button>
            </div>
            <div style={{ height: '4em' }}></div>

            <div className='flex center fameDiv1 round boxShadow'>
                <div className='alignCenter'>
                    <Logo />
                    <h1>קורס הכנה לבגרות 5 ו 4 יח"ל, בשילוב כלים דיגיטליים חכמים</h1>
                    <h2> ללמוד ולתרגל בצורה חכמה כל הדרך עד הבגרות, בעזרת תוכן איכותי ומונגש</h2>
                    <h2>לגשת לבגרות בראש שקט ובבטחון</h2>
                    <button
                        // className='border'
                        id='trialButton'>לצפייה בשיעור ניסיון</button>
                </div>
            </div>
            <div style={{ height: '4em' }}></div>

            <section className='caruselDiv'>
                <Carousel
                    swipeable={false}
                    draggable={false}
                    showDots={true}
                    responsive={responsive}
                    // ssr={true} // means to render carousel on server-side.
                    infinite={true}
                    // autoPlay={this.props.deviceType !== "mobile" ? true : false}
                    // autoPlaySpeed={1000}
                    keyBoardControl={true}
                    // customTransition="all .5"
                    transitionDuration={1000}
                    partialVisbile={true}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    // deviceType={this.props.deviceType}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px">
                    <div>
                        item1
                    </div>
                    <div className='flex center fameDiv2'>
                        <Card style={cardStyle}
                            textDict={{
                                img: { src: digital, alt: 'לוגו תוכן דיגיטלי', title: 'תוכן דיגיטלי', style: logoStyle }
                                ,
                                body: <p className='cardText'>תוכן ויזואלי ודיגיטלי</p>
                            }} />
                        <Card style={cardStyle}
                            textDict={{
                                img: { src: timeSave, alt: 'לוגו חסכון בזמנים', title: ' חסכון בזמן', style: logoStyle },
                                body: <p className='cardText'>הקורס שיחסוך לכם זמן וכסף</p>
                            }} />
                        <Card style={cardStyle}
                            textDict={{
                                img: { src: experience, alt: 'לוגו 21 שנות ניסיון', title: '21 שנות נסיון', style: logoStyle },
                                body: <p className='cardText'> 21 שנות ניסיון בהוראת מתמטיקה</p>
                            }} />
                        <Card style={cardStyle}
                            textDict={{
                                img: { src: assist, alt: 'לוגו ליווי אישי צמוד ', title: ' ליווי אישי', style: logoStyle },
                                body: <p className='cardText'>ליווי אישי לכל אורך הדרך</p>
                            }} />
                    </div>
                    <div className='flex center'>
                        <Card style={cardStyle} />
                        <Card style={cardStyle} />
                    </div>
                </Carousel>
            </section>

            <div style={{ height: '4em' }}></div>

            <div className='rtl fameDiv3 round boxShadow'>
                <img id='tutorSelfie'
                    className='boxShadowHover'
                    src={selfie}
                    alt="Picture of the Shai, the teacher"
                    title='Picture of the course teacher'
                />
                <h2>קורס הכנה לבגרות 5 ו 4 יח"ל, בשילוב כלים דיגיטליים חכמים</h2>
                <p>

                </p>
                <button
                    // className='border'
                    id='trialButton'>לצפייה בשיעור ניסיון</button>

            </div>

            <div style={{ height: '4em' }}></div>
        </div>
    );
}

export default Home;
