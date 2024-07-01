import {useState, useEffect}  from "react";

import React from 'react';
import { debug } from "../assets/function/functions";
import { dataBase } from "./App";
import './Courses.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { responsive } from "./Home";
import { faBell, faClock, faCommentSms, faCreditCard, faLock, faQuestionCircle, faStopwatch, faUserAstronaut, faWrench } from "@fortawesome/free-solid-svg-icons";
import Carousel from "react-multi-carousel";
import { MathJax } from "better-react-mathjax";
import Checkbox from "../components/CheckBox";
import Prompt from "../components/PromptDiv";
import Logo from "../components/Logo";
import { Outlet } from "react-router-dom";


const Courses = ({...props}) => {
    const [option, setOption] = useState('582');

  return (
    <div className="Courses">
        <Outlet />
    </div>
  );
};

export default Courses;
