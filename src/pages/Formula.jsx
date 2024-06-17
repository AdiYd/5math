import { debug } from '../assets/function/functions';
import { MathJax } from 'better-react-mathjax';
import './Formula.css';
import { useRef, useState, useContext } from 'react';
import { User } from '..';
import { toggleOff, toggleOn } from './Login';
import Checkbox from '../components/CheckBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXmark, faSquareCheck, faArrowsRotate, faCaretLeft, faSquareArrowUpRight, faArrowDownShortWide, faArrowUpShortWide } from '@fortawesome/free-solid-svg-icons';
import { faSquare, faSquareMinus } from '@fortawesome/free-regular-svg-icons';
import Logo from '../components/Logo';
import { width } from '@fortawesome/free-brands-svg-icons/fa42Group';
const formulas = require('../assets/json/formula.json');

function Formulas({
    fullMode = false,
    prefix = '',
    ...props }) {
    const [update, setUpdate] = useState(false);
    const [showChbx, setShowChbx] = useState(true);
    const [filters, setFilters] = useState(() => {
        let entriesFilter = {};
        for (let item in formulas) {
            entriesFilter[item] = false;
        };
        entriesFilter.active = false;
        return entriesFilter
    });
    const [userFormula, setUserFormula] = useState(localStorage.getItem('userFormula') ? JSON.parse(localStorage.getItem('userFormula')) : {});
    const [showAll, setShowAll] = useState(JSON.parse(localStorage.getItem('userFormulaShowAll')) ?? true);
    const msg = !Object.keys(userFormula).length ? 'ניתן לבחור נוסחאות ולבנות דף נוסחאות מצומצם' : undefined;
    const selectAllList = useRef([]);
    const { darkMode, callback } = useContext(User);

    function setDarkMode() {
        debug('Inside setDarkMode if Formula: ', darkMode, callback, true);
        callback();
        setUpdate(p => !p);
    }

    const updateUserFormula = ({ category, name, add = true, storage = true } = {}) => {
        let tempObj = { ...userFormula };
        if (add) {
            if (category in tempObj && !tempObj[category].includes(name)) {
                tempObj[category] = [...tempObj[category], name];
            }
            else if (!(category in tempObj)) {
                tempObj[category] = [name]
            }
            debug(`Adding ${category} -> ${name} to user formula Selection`, tempObj[category], true);
        }
        else if (!add && category in tempObj && tempObj[category].includes(name)) {
            let index = tempObj[category].indexOf(name);
            tempObj[category].splice(index, 1);
            if (!tempObj[category].length) {
                delete tempObj[category]
            }
            debug(`Removing ${category} -> ${name} to user formula Selection`, tempObj[category], true);
        }
        setUserFormula(tempObj);
        if (storage) {
            localStorage.setItem('userFormula', JSON.stringify(tempObj));
        }
        return tempObj;
    }

    function onSubmit(e) {
        e.preventDefault();
        let formaName = e.target.name;
        var formData = new FormData(e.target);
        let userDataObj = Object.fromEntries(formData);
        let tempObj = {};
        for (let item in userDataObj) {
            let [category, name] = item.split('>');
            tempObj = updateUserFormula({ category: category, name: name })
        }
        if (tempObj && Boolean(Object.keys(tempObj))) {
            setShowAll(false);
            localStorage.setItem('userFormulaShowAll', false);
        }
    }

    function onFormulaChecked(e) {
        let [category, name] = e.target.name.split('>');
        updateUserFormula({ category, name, add: e.target.checked });
    }

    function selectAllToggle(subjuct, addOnly = false) {
        if (subjuct in formulas) {
            let tempObj = { ...userFormula };
            if (!selectAllList.current.includes(subjuct)) {
                if (!(subjuct in tempObj)) {
                    tempObj[subjuct] = []
                }
                for (let name in formulas[subjuct]) {
                    if (!tempObj[subjuct].includes(name)) {
                        tempObj[subjuct].push(name);
                    }
                }
                selectAllList.current.push(subjuct);
            }
            else if (selectAllList.current.includes(subjuct) && !addOnly) {
                if (subjuct in tempObj) {
                    delete tempObj[subjuct]
                }
                selectAllList.current.splice(selectAllList.current.indexOf(subjuct), 1);
            }
            // else if (addOnly && selectAllList.includes(subjuct)) {
            //     selectAllList.current.splice(selectAllList.current.indexOf(subjuct), 1);
            //     return (selectAllToggle(subjuct, true));
            // }
            setUserFormula(tempObj);
            localStorage.setItem('userFormula', JSON.stringify(tempObj));
        }
    }

    if (fullMode) {
        document.title = ' דף נוסחאות - 5 יחידות';
    }
    let filter = filters.active &&
        <div className='flex wrap fitH ma3 center small' style={{ gap: '0.4em' }}>
            {Object.keys(formulas).map((item, index) => (
                <button
                    key={index}
                    type='button'
                    title='סינון'
                    style={{ border: '1px solid var(--themeColor)' }}
                    onClick={() => { setFilters(p => ({ ...p, [item]: !p[item] })); selectAllToggle(item, true) }}
                    className={`squarish smaller ${!filters[item] ? 'themeBorder' : ''}`}>
                    {item}
                </button>
            ))}
        </div>

    return (
        <div
            style={{ padding: fullMode ? '0em 2em' : '' }}
            className="formulaContainer">
            <div className='flex center gap1 mb2 '>
                {!fullMode ? <FontAwesomeIcon
                    className='pointer fit opacityHover baseLine'
                    title='פתיחה בחלון חדש'
                    onClick={() => window.open('/formulas', '_blank', 'rel=noopener noreferrer')}
                    icon={faSquareArrowUpRight} /> :
                    <Logo width='2em' height='2em' fontSize={'1em'} showCaption={false} cursor='pointer' />
                }
                <h2>דף נוסחאות - 5 יחידות</h2>
            </div>
            <form onSubmit={onSubmit} name='formulaSheet' >
                <div className='flex center gap1'>
                    <button
                        style={{ border: '1px solid var(--themeColor)' }}
                        type='sumbit' className={`round ${!showAll ? '' : 'themeBorder'}`}> הצג בחירה</button>
                    <button
                        style={{ border: '1px solid var(--themeColor)' }}
                        type='button'
                        onClick={() => { setShowAll(true); localStorage.setItem('userFormulaShowAll', true) }}
                        className={`round ${showAll ? '' : 'themeBorder'}`}> הצג הכל</button>
                    <FontAwesomeIcon
                        icon={showChbx ? faSquareXmark : faSquareCheck}
                        className='ml2 mr2 pointer opacityHover'
                        title={showChbx ? ' הסתרת לחצני בחירה' : 'הצגת לחצני בחירה'}
                        color='var(--themeColor)'
                        // type='button'
                        onClick={() => {
                            setShowChbx(p => !p)
                        }}
                    />
                    <FontAwesomeIcon
                        icon={faArrowsRotate}
                        className='ml2 mr2 pointer opacityHover'
                        title='איפוס הגדרות'
                        color='var(--themeColor)'
                        // type='button'
                        onClick={() => {
                            setUserFormula({});
                            let tempObj = { ...filters };
                            for (let item in tempObj) {
                                tempObj[item] = false;
                            }
                            setFilters(tempObj);
                            if (!showAll) {
                                setShowAll(true);
                            }
                            localStorage.removeItem('userFormula');
                            localStorage.setItem('userFormulaShowAll', true);
                        }}
                    />
                    <FontAwesomeIcon
                        icon={faArrowDownShortWide}
                        style={{ opacity: filters.active ? '' : '0.5' }}
                        className='ml2 mr2 pointer opacityHover'
                        title='הוספת פילטרים'
                        color='var(--themeColor)'
                        // type='button'
                        onClick={() => {
                            setFilters(p => ({ ...p, active: !p.active }))
                        }}
                    />
                    <div
                        title={darkMode ? 'תצוגה בהירה' : 'תצוגה כהה'}
                        className='flex center pointer'>
                        <svg
                            onClick={() => { setDarkMode(p => !p) }}
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill={darkMode ? '' : "var(--themeColor)"}>
                            {!darkMode ? toggleOn : toggleOff}
                        </svg>
                    </div>
                </div>
                {filter}
                {msg && <p className='ma1'>{msg}</p>}
                <div className='mt1 mb3'>
                    {Object.keys(formulas).map((subjuct, index) => (
                        (((showAll || (!showAll && subjuct in userFormula)) && !filters.active) || (filters.active && filters[subjuct]))
                        &&
                        <div key={index + subjuct}>
                            <div
                                onClick={() => { selectAllToggle(subjuct) }}
                                className='flex gap1 pointer fit'
                                title={`${selectAllList.current.includes(subjuct) ? 'הסירו' : 'בחרו'} הכל`}
                                style={{ alignItems: 'baseline' }}>
                                <FontAwesomeIcon icon={faCaretLeft} />
                                <h4 className='mt3 mb1'>{subjuct + ':'}</h4>
                            </div>
                            {
                                Object.keys(formulas[subjuct]).map((formulaName, ind) => (
                                    (showAll || (!showAll && userFormula[subjuct]?.includes(formulaName))) &&
                                    <div key={ind}>
                                        <div style={{ margin: '0.5em 2em', gap: '1em' }} className="flex alignCenter">
                                            {showChbx && <Checkbox
                                                color='var(--themeColor)'
                                                // onClick={() => { debug('This is working @(^_^)@') }} 
                                                onChange={onFormulaChecked}
                                                // defaultChecked={(userFormula[subjuct]?.includes(formulaName))}
                                                checked={Boolean(userFormula[subjuct]?.includes(formulaName))}
                                                name={subjuct + ">" + formulaName} />}
                                            <a id='formulaName'>{prefix + formulaName.toString() + ' : '}</a>
                                            {!(formulas[subjuct][formulaName] instanceof Object) &&
                                                <MathJax>
                                                    <a id="formula" title={formulaName.toString()}
                                                    // onClick={toggleItem}
                                                    >{formulas[subjuct][formulaName].toString()}</a>
                                                </MathJax>
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    ))}
                </div>
            </form>
        </div>
    )
}

export default Formulas;