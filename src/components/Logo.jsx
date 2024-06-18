import { THEME_COLORS } from "./Header";
import { useRef } from "react";
import './Components.css';
import LogoImg from '../assets/img/5Math.svg';
import { MathJax } from "better-react-mathjax";
import { useNavigate } from "react-router-dom";

export default function Logo({
    showIcon = true,
    showCaption = true,
    imgWidth = '40px',
    imgHeight = '40px',
    text = '5  Math',
    fontSize = 'inherit',
    direction = 'columns',
    textDirection = 'ltr',
    whiteShadow = false,
    linkTo = false,
    rotate = true,
    rotationDeg = 90,
    clickable = true,
    ...props }) {
    const deg = useRef(rotationDeg);
    const imgRef = useRef();
    const navigate = useNavigate();

    function onClickHandler(e) {
        let randColor = THEME_COLORS[Math.floor(Math.random() * THEME_COLORS.length)];
        let randColorAlpha = randColor.slice(0, randColor.indexOf(')')) + 'Alpha' + randColor.slice(randColor.indexOf(')'));
        let themeColor = document.querySelector(':root');
        themeColor.style.setProperty('--themeColor', randColor);
        themeColor.style.setProperty('--themeColorAlpha', randColorAlpha);
        localStorage.setItem('themeColor', JSON.stringify({ color: randColor, alpha: randColorAlpha }));

        if (showIcon && rotate) {
            imgRef.current?.animate(
                { transform: `rotate(${deg.current}deg)` },
                { duration: 400, iterations: 1, fill: 'forwards' }
            );
            deg.current = (deg.current + rotationDeg);
        }
        if (linkTo) {
            navigate(linkTo);
        }
    }

    return (
        <div className={`flex center ${direction} alignCenter`} style={{ ...props }} >
            {showIcon && <div>
                <img id="LogoImgMain"
                    className={whiteShadow ? 'dropShadowWhite' : "dropShadow"}
                    onClick={clickable ? onClickHandler : () => { }} ref={imgRef} style={{ width: imgWidth, height: imgHeight }}
                    src={LogoImg} alt={`${text} logo`} title={text} />
            </div>}
            {showCaption && <div>
                <span id="logoMark" style={{ fontSize: fontSize, direction: textDirection }}
                    onClick={clickable ? onClickHandler : () => { }}>
                    <a style={{ cursor: clickable ? 'pointer' : '', }}>{text}</a>
                </span>
            </div>}
        </div>
    )

}