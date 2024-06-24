  import {useState, useEffect}  from "react";
  import { MathJax } from "better-react-mathjax";
  import "../pages/App.css";
  
  function FloatingMath ({
    position = 'tl',
    text = 'f(x)',
    opacity = 0.8,
    rotate = 0,
    animation,
    ...props}){
  
    return (
        <div id='floatingFormula' className={`${position} ma2`}>
            <MathJax
            className={`${animation || ''}`}
             style={{opacity: opacity, transform:`rotate(${rotate}deg)`,...props}}>
                <a> {`$$ ${text} $$`} </a>
            </MathJax>
        </div>
    );
  }
  
  export default FloatingMath;