import {useState, useEffect}  from "react";
import '../assets/style/style.css';
import './Components.css';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faBackward } from "@fortawesome/free-solid-svg-icons";

function BackTo ({
    arrowRight = true,
    text = 'חזרה',
    style,
    linkTo = '..',
    className,
    ...props}){

    return (
        <div 
        id='backTo'
        className={className}
        style={{position: 'absolute', right: '1em',top:'1em', ...style}}>
            <Link className="flex center gap1" to={linkTo}>
             <FontAwesomeIcon icon={arrowRight ? faArrowRight: faArrowLeft} />
                <h4 className="m0" >
                    {text}
                </h4>
            </Link>
        </div>
    );
}

export default BackTo;