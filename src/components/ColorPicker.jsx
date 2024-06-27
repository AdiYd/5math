import { useEffect, useState, useRef } from "react";
import { useColor } from "react-color-palette"
import { ColorPicker } from "react-color-palette";
import imgPickColor from "../assets/img/PickColor.png";
import { debug } from "../assets/function/functions";
import "react-color-palette/css";
import { Account } from "aws-sdk";

const CALLBACK = (...props) => debug('Not provided callback function for colorPicker', props, { color: 'red', fontWeight: 'bold' });

export default function ColorPickerCustom({
    defaultColor = '#000',         // Default color to initiate with
    imgSrc = imgPickColor,        // If provided defaultSymbol - will show the symbol else will show Provided img or default img
    className,                   // className of the img / symbol container (<img> / <a>)
    defaultSymbol,              // html Symbol for to click on before colorPicker open
    callback = CALLBACK,       // callback function the return:  callback(e,'callbackName', colorHex, colorRGB)
    callbackName = 'color',   // String to return with the callBack function
    hideAlpha = false,       // wheather to show alpha options
    symbolTitle = 'Color',  // Title for hovering above the color symbol 
    style = {},
    defaultActive = false,
    ...props
}) {
    const [color, setColor] = useColor(defaultColor);
    const [active, setActive] = useState(defaultActive);

    useEffect(() => {
    }, [defaultColor])


    function onColorPick(e) {
        setColor(e);
        callback(e, callbackName, e.hex, e.rgb);
    }

    document.addEventListener('click',(e)=>{
        if (typeof e.target?.className ==='string' && !e.target.className.includes('rcp')){
            setActive(false);
        }
    }, {capture: !active})

    return (
        <div className='rcp' style={{ position: 'relative' }} >
            <div style={{ display: 'flex' }}>
                {imgSrc && !defaultSymbol &&
                    <img src={imgSrc} alt='Function color icon' title={symbolTitle}
                        className={'pointer rcp ' + className}
                        style={{ opacity: 1 }}
                        {...props}
                        onClick={(e) => setActive(p => !p)} />}
                {defaultSymbol &&
                    <a onClick={(e) => setActive(p => !p)} title={symbolTitle}
                        className={'rcp ' + className}
                        style={{ WebkitTextFillColor: color.hex, opacity: 1 }}
                    >{defaultSymbol}</a>}
            </div>
            <span style={{
                position: "absolute",
                width: "12vw",
                zIndex: 15,
                top: "100%",
                visibility: active ? '' : 'hidden',
                ...style
            }}>
                <ColorPicker 
                    className="rcp"
                    onBlur = {()=>{debug('Blur!')}}
                    hideInput={["rgb", "hsv", 'hex']} hideAlpha={hideAlpha}
                    height={80} color={color} onChange={(e) => onColorPick(e)} />
            </span>
        </div>
    )
}