
import { useState, useEffect } from "react";
import '../pages/App.css';


function General({ ...props }) {

    return (
        <div className="flex center border squarish" style={{ padding: '5em', background: 'aliceblue' }}>
            <h2> Page {"General"}</h2>
        </div>
    );
}

export default General;