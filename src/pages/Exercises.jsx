import {useState, useEffect}  from "react";
import Course from './course/Course.jsx';
import { debug } from "../assets/function/functions.js";



function Exercises ({...props}){
    const [course, setCourse] = useState();
    // debug(topicsList, true);

    return (
        <div>
            <h2>תרגול איכותי בכל הנושאים</h2>
            {/* <div className="flex center gap2 wrap ma2 pt2 pb2">
                {topicsList.map((item,index)=>(
                    <button key={index}
                    className={`${course === item ? '':'themeBorder'} borderTheme round pointer`}
                    style={{padding:'0.5em 1em'}}
                    onClick={()=>setCourse(item)}>{item}</button>                    
                ))}
            </div>
            <div className="fill fillH border squarish">
                <Course topic={course} />
            </div> */}
        </div>
    );
}

export default Exercises;