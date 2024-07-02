import {useState, useEffect}  from "react";
import '../../assets/style/style.css';
import { topicsList } from "../App";
import { Outlet, Link, useParams } from "react-router-dom";
import { debug } from "../../assets/function/functions";
import BackTo from "../../components/BackTo";

function CourseContainer ({ courseSymbol,...props}){
    const params = useParams();
    let topic =params['*']?.split('/')?.length<=3 ?  params['*'].split('/')[2]: '';

    return (
        <div className="relative">
            <BackTo />
            <h2>קורס דיגיטלי לשאלון - {courseSymbol}</h2>
            <div className="flex center gap2 wrap ma2 pt2 pb2">
                {topicsList.map((item,index)=>(
                    <Link key={index} to={item}>
                        <button 
                            key={index}
                            className={`${topic === item ? '':'themeBorder'} borderTheme squarish pointer`}
                            style={{padding:'0.5em 1em'}}
                            onClick={()=>{}}>{item}
                        </button>  
                    </Link>                  
                ))}
            </div>
            <Outlet />
        </div>
    );
}

export default CourseContainer;