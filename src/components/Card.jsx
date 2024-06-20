import './Components.css';
import img from '../assets/img/5Math.svg';
import { debug } from '../assets/function/functions';

const textDictTamplate = {
    title: 'This is title',
    img: {
        src: img,
        alt: 'This is img alt',
        title: 'This is img title',
        style: { with: '40%', height: '20%' }
    },
    body: <>
        <p>
            This is the body of the card!
            <br /> Can write multiple lines!
        </p>
    </>
}

export default function Card({
    boxShadow = true,
    translateY = true,
    textDict = textDictTamplate,
    children,
    cardID,
    className,
    style = {},
    ...props }) {
    return (
        <div
            className={`flex center cardContainer columns alignCenter tCenter ${className} ${boxShadow ? 'boxShadowHover' : ''} ${translateY ? 'translateY' : ''}`}
            style={{ ...style }}
            {...props}
            id={cardID}>
            {children ? children :
                <>
                    {textDict.title && <h3>{textDict.title}</h3>}
                    {textDict.img && <img
                        src={textDict.img.src}
                        style={textDict.img.style}
                        alt={textDict.img.alt}
                        title={textDict.img.title} />}
                    <section>
                        {textDict.body}
                    </section>
                </>
            }
        </div>
    )
}