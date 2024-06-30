import {useState, useEffect}  from "react";
import Course from './course/Course.jsx';
import { debug } from "../assets/function/functions.js";

const allCourses = require('../assets/lessons/all_582.json');

const topicsList = Object.keys(allCourses);

function Exercises ({...props}){
    const [course, setCourse] = useState();
    debug(topicsList, true);

    return (
        <div>
            <div className="flex center gap2 ma2 pt2 pb2">
                {topicsList.map((item,index)=>(
                    <button key={index}
                    className={`${course === item ? '':'themeBorder'} borderTheme round pointer`}
                    style={{padding:'0.8em 1.2em'}}
                    onClick={()=>setCourse(item)}>{item}</button>                    
                ))}
            </div>
            <div className="fill fillH border squarish">
                <Course topic={course} courseList={allCourses[course]} />
            </div>
        </div>
    );
}

export default Exercises;