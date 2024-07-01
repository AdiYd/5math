import {useState, useEffect}  from "react";
import { Link } from "react-router-dom";
import '../assets/style/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';


function ErrorPage ({...props}){

    return (
        <div className="ma3 pt2 pb2">
            <div className="flex center gap2">
                <FontAwesomeIcon icon={faExclamationTriangle} size="xl" color="#ffcc00" />
                <h2> מצטערים, אין לנו דף כזה </h2>
            </div>
            <span className="flex center gap2">
                <FontAwesomeIcon icon={faBug} size="lg" color="#ff0000" />
                    <h3>שגיאה 404 </h3>
                <FontAwesomeIcon icon={faBug} size="lg" color="#ff0000" />
            </span>
            <Link
                to={'Home'} 
                className="pointer ma2">
                <button className="round">חזרה לדף הבית</button>
            </Link>
        </div>
    );
}

export default ErrorPage;