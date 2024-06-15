import { THEME_COLORS } from "./Header";
import { useRef } from "react";
import './Components.css';
import LogoImg from '../assets/img/5Math.svg';
import { MathJax } from "better-react-mathjax";

export default function Logo({
    showIcon = true,
    showCaption = true,
    text = '5  Math',
    direction = 'columns',
    textDirection = 'ltr',
    clickable = true,
    ...props }) {
    const deg = useRef(0);
    const imgRef = useRef();

    function onClickHandler(e) {
        let randColor = THEME_COLORS[Math.floor(Math.random() * THEME_COLORS.length)];
        let randColorAlpha = randColor.slice(0, randColor.indexOf(')')) + 'Alpha' + randColor.slice(randColor.indexOf(')'));
        let themeColor = document.querySelector(':root');
        themeColor.style.setProperty('--themeColor', randColor);
        themeColor.style.setProperty('--themeColorAlpha', randColorAlpha);
        localStorage.setItem('themeColor', JSON.stringify({ color: randColor, alpha: randColorAlpha }));

        if (showIcon && false) {
            imgRef.current.animate(
                { transform: `rotate(${deg.current}deg)` },
                { duration: 400, iterations: 1, fill: 'forwards' }
            );
            deg.current = deg.current + 90;
        }
    }

    return (
        <div className={`flex center ${direction} ${textDirection} alignCenter`}>
            {showIcon && <div>
                <img id="LogoImgMain"
                    className="dropShadow"
                    onClick={clickable ? onClickHandler : () => { }} ref={imgRef} style={{ ...props }}
                    src={LogoImg} alt={`${text} logo`} title={text} />
            </div>}
            {showCaption && <div>
                <span id="logoMark" style={{ ...props }}
                    onClick={clickable ? onClickHandler : () => { }}>
                    <a style={{ cursor: clickable ? 'pointer' : '', }}>{text}</a>
                </span>
            </div>}
        </div>
    )

}