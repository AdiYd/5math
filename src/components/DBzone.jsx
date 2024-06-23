
import { useState, useEffect, useRef } from "react";
import '../pages/App.css';
import { debug } from "../assets/function/functions";
import DBaccess from "../assets/function/DBaccess";




function DBzone({ ...props }) {
    const [update, setUpdate] = useState(false);
    const msg = useRef('Nothing to show');
    let dbClass = new DBaccess();
    const loadUsers = () => {

    }

    return (
        <div className="flex columns center border squarish" style={{ padding: '5em', background: 'aliceblue' }}>
            <h2> Page {"General"}</h2>
            <div className="flex center gap2">
                <button onClick={() => { loadUsers() }} >טען משתמשים</button>
                <button onClick={() => { }} >טען DB</button>
                <button onClick={() => { }} >טען DB</button>
            </div>
        </div>
    );
}

export default DBzone;