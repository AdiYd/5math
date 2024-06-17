import { debug } from '../assets/function/functions';
import { useEffect, useState, useContext } from 'react';
// import { ResizableBox, Resizable } from 'react-resizable';
import './Components.css';
import { User } from '..';

function Prompt({
    show = true,
    children,
    showButton = false,
    showX = true,
    callBack = () => { },
    ...props }) {
    const [showDiv, setShowDiv] = useState(show);
    const { darkMode, callback } = useContext(User);
    const [localDarkMode, setDarkMode] = useState(darkMode);
    useEffect(() => {
        setShowDiv(show);
    }, [show])
    useEffect(() => {
        setDarkMode(darkMode)
    }, [darkMode])

    function onClickHandler(e) {
        setShowDiv(false);
        callBack(p => !p);
    }

    function testFunction(...args) {
        debug('This is the args: ', args, true);
    }

    let childs = <>
        {showX &&
            <div
                className='flex center fit'
                // id={darkMode ? 'darkMode' : ''}
                style={{ position: 'sticky', top: '0%', right: '98%', zIndex: '200' }}
                title='סגור'>
                <svg
                    id='closePrompt'
                    className='pointer rounder'
                    onClick={onClickHandler}
                    xmlns="http://www.w3.org/2000/svg"
                    height="0.9em"
                    viewBox="0 -960 960 960"
                    width="0.9em"
                    fill="#000">
                    <path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                </svg>
            </div>}
        <div style={{ position: 'relative', height: '-webkit-fill-available' }}>
            {/* <ResizableBox width={200} height={200}
                    style={{ background: 'black' }}
                    minConstraints={[100, 100]} maxConstraints={[300, 300]}>
                    <span>Contents</span>
                </ResizableBox> */}
            <User.Provider value={{ darkMode: localDarkMode, callback: () => { setDarkMode(p => !p) } }}>
            {children}
            </User.Provider>

            {showButton && <button
                onClick={onClickHandler}
                style={{ position: 'sticky', bottom: '0.5em', left: '47%' }}
                className='themeConst3 round ma1 pl2 pr2 pt1 pb1'>
                סגור
            </button>}
        </div>
    </>

    return (
        <div
            onResize={testFunction}
            // draggableOpts={{}}
            // minConstraints={[100, 100]}
            style={{ display: showDiv ? '' : 'none' }}
            className={`squarish boxShadow ${props.className ? props.className : ''} ${localDarkMode ? 'darkMode' : ''}`}
            id='promptContainer' >
            {childs}
        </div>
    )
}

export default Prompt;