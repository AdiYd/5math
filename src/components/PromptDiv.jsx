import { debug } from '../assets/function/functions';
import { useEffect, useState, useContext } from 'react';
// import { ResizableBox, Resizable } from 'react-resizable';
import './Components.css';
import { User } from '..';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

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

    let childs = <div style={{ position: 'relative' }}>
        {showX &&
            <div
                className='flex center pointer opacityHover fit'
                // id={darkMode ? 'darkMode' : ''}
                onClick={onClickHandler}
                style={{ position: 'sticky', top: '-1%', right: '101%', zIndex: '200' }}
                title='סגירה'>
                <FontAwesomeIcon icon={faCircleXmark} size='lg' />
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
    </div>

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