
import './Login.css';
import './App.css';
import '../components/Components.css';
import parse from 'html-react-parser';
import { debug } from '../assets/function/functions';
import { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import bcrypt from "bcryptjs-react";
import Prompt from '../components/PromptDiv';
import Logo from '../components/Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
// import { genSalt, hash } from 'bcrypt';

const saltRounds = 10;

const DBG_PROPS = { color: '#a254de', fontWeight: 'bold', fontSize: 16 };
const toggleOff = <path d="M280-240q-100 0-170-70T40-480q0-100 70-170t170-70h400q100 0 170 70t70 170q0 100-70 170t-170 70H280Zm0-80h400q66 0 113-47t47-113q0-66-47-113t-113-47H280q-66 0-113 47t-47 113q0 66 47 113t113 47Zm0-40q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm200-120Z" />;
const toggleOn = <path d="M280-240q-100 0-170-70T40-480q0-100 70-170t170-70h400q100 0 170 70t70 170q0 100-70 170t-170 70H280Zm0-80h400q66 0 113-47t47-113q0-66-47-113t-113-47H280q-66 0-113 47t-47 113q0 66 47 113t113 47Zm400-40q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM480-480Z" />;
const showPass = <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
const hidePass = <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
const errorMsg = <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />;

const GradeDict = {
    0: 'מורה',
    9: "כיתה ט'",
    10: "כיתה י'",
    11: "כיתה יא'",
    12: "כיתה יב'"
}
const PasswordRegex = "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{6,15}$";
const ValidIcons = {
    valid: <svg
        style={{ margin: '0em 1em' }}
        xmlns="http://www.w3.org/2000/svg"
        height="15px"
        viewBox="0 -960 960 960"
        width="15px"
        fill="#218838">
        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
    </svg>,
    error: <svg
        style={{ margin: '0em 1em' }}
        xmlns="http://www.w3.org/2000/svg"
        height="15px"
        viewBox="0 -960 960 960"
        width="15px"
        fill="#ffc107">
        <path d="M480-120q-33 0-56.5-23.5T400-200q0-33 23.5-56.5T480-280q33 0 56.5 23.5T560-200q0 33-23.5 56.5T480-120Zm-80-240v-480h160v480H400Z" />
    </svg>,
    notValid: <svg
        style={{ margin: '0em 1em' }}
        xmlns="http://www.w3.org/2000/svg"
        height="15px"
        viewBox="0 -960 960 960"
        width="15px"
        fill="#c82333">
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
    </svg>
}


export default function Login({
    currentPage = 'Login',
    confirmEmail = false,
    signupForm = false,
    ...props }) {
    const location = useLocation();
    const [update, setUpdate] = useState(false);
    const [signup, setSignup] = useState(location.state?.signup ? location.state.signup : signupForm);
    const [validForm, setValidForm] = useState(undefined);
    const [validPass, setValidPass] = useState(false);
    const [errInput, setErr] = useState({});
    const [hidePassword, setPassState] = useState(true);
    const [colorMode, setColorMode] = useState(localStorage.getItem('colorMode') ? Number(localStorage.getItem('colorMode')) : 1);
    const [userData, setUserData] = useState({
        fname: null,
        lname: null,
        email: null,
        password: null,
        age: null,
        grade: null,
        type: ['הכנה לבגרות'],
        level: null,
    })
    const navigate = useNavigate();
    const validationErr = useRef();

    const onRejectValidation = (data) => {
        // debug('Server rejected request under: ', data);
        validationErr.current = <div className='flex center' style={{ alignItems: 'center' }}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#c82333">
                {errorMsg}
            </svg>
            <h4 className='errorMSG'>
                {data ? data : 'Email or password incorrect'}
            </h4>
        </div>
        setUpdate(p => !p)
    }
    const onFulfilValidation = (res) => {
        setTimeout(() => {
            navigate('Home')
        }, 1000)
    }

    function onStudentTypeClick(e, item) {
        if (userData.type?.includes(item)) {
            let tempList = [...userData.type];
            tempList.splice(tempList.indexOf(item), 1);
            setUserData(p => ({ ...p, type: tempList }))
        }
        else {
            setUserData(p => ({ ...p, type: [...p.type, item] }))
        }
    }

    function onInputHandler(e) {
        let pwdValidator = new RegExp(PasswordRegex);
        let value = e.target.value, name = e.target.name;
        validationErr.current = undefined;
        if (value === '') {
            setErr(p => ({ ...p, [name]: undefined }));
            setValidPass(false);
            return
        }
        switch (name) {
            case 'password':
                if (!pwdValidator.test(value)) {
                    setErr(p => ({
                        ...p,
                        [name]:
                            <p className='errorMSG tStart rtl' style={{ fontSize: '0.8em' }}>
                                סיסמה חייבת לכלול:<br />
                                {!(value.length <= 15 && value.length >= 6) ? parse('בין 6 - 15 אותיות <br/> ') : undefined}
                                {!new RegExp("(?=.*?[A-Z])").test(value) ? parse('A-Z אות <br/>') : undefined}
                                {!new RegExp("(?=.*?[a-z])").test(value) ? parse('a-z אות <br/>') : undefined}
                                {!new RegExp("(?=.*?[0-9])").test(value) ? parse('0-9 ספרה<br/>') : undefined}
                                {!new RegExp("(?=.*?[@$!%*#?&])").test(value) ? '@$!%*#?& תו מיוחד' : undefined}
                            </p>
                    }))
                    setValidPass(false);
                }
                else {
                    setErr(p => ({
                        ...p,
                        [name]:
                            true
                    }))
                    setUserData(p => ({ ...p, [e.target.name]: e.target.value }));
                    setValidPass(true);
                    e.target.setCustomValidity('');
                }
                break
            case 'password2':
                if (pwdValidator.test(value) && value === userData.password) {
                    setErr(p => ({
                        ...p,
                        [name]:
                            ValidIcons.valid
                    }));
                    e.target.setCustomValidity('')
                }
                else if (value === document.getElementsByName('password')[0].value) {
                    setErr(p => ({
                        ...p,
                        [name]:
                            ValidIcons.error
                    }));
                    e.target.setCustomValidity('')
                }
                else if (value !== userData.password) {
                    setErr(p => ({
                        ...p,
                        [name]:
                            ValidIcons.notValid
                    }))
                }
                break
            case 'email2':
                if (value === document.getElementsByName('email')[0].value) {
                    e.target.setCustomValidity('')
                }
                break
            default:
                break
        }
        setUpdate(p => !p);
        // setErr(p => ({ ...p, [e.target.name]: undefined }));
        // setUserData(p => ({ ...p, [e.target.name]: e.target.value }))}
    }

    function onSubmitForm(e) {
        const callBack = () => {
            setValidForm(undefined);
        }

        const onSignupFullfil = (res) => {
            let msg;
            if (res.data) {
                let [fname, lname] = res.data?.name.split(' ');
                msg = <div>
                    <h2> Thank you, {fname.slice(0, 1).toUpperCase() + fname.slice(1)} </h2>
                    <h3> Please check your email box </h3>
                    <h3> {res.data.email}</h3>
                    <Logo showIcon={false} clickable={false} />
                    <br />
                </div>
                setSignup(false)
            }
            else {
                msg = <div>
                    <h3> {res.message}</h3>
                    <Logo showIcon={false} clickable={false} />
                    <br />
                </div>
            }
            setValidForm(
                <Prompt
                    setPreviewFunction={callBack}
                    style={{ height: 'fit-content', borderRadius: '20px' }}
                    showDiv={true} >
                    {msg}
                </Prompt>)
            onFulfilValidation(res)
        }
        e.preventDefault();
        let formaName = e.target.name;
        var formData = new FormData(e.target);
        let userDataObj = Object.fromEntries(formData);
        debug('This is formData: ', formaName, userDataObj, DBG_PROPS);
        if (formaName === 'signup') {
            if (userDataObj.password2 === userDataObj.password && validPass &&
                (confirmEmail ? userDataObj.email2 === userDataObj.email : true)) {
                let tempObj = { ...userDataObj };
                tempObj.email = tempObj.email.toLowerCase();
                delete tempObj.password2;
                delete tempObj.email2;
                bcrypt.genSalt(saltRounds, (err, salt) => {
                    if (err) {
                        debug('Error with crypt salt: ', err, DBG_PROPS);
                        return
                    }
                    bcrypt.hash(tempObj.password, salt, (error, hashedPass) => {
                        if (error) {
                            debug('Error with crypt Hash: ', error, DBG_PROPS);
                        }
                        tempObj.password = hashedPass;
                        tempObj.name = `${tempObj.fname} ${tempObj.lname}`
                        setUserData(tempObj);
                        debug('We are reay to go! ', tempObj, DBG_PROPS);

                        // authUser(tempObj, 'signup', 'onSite', onSignupFullfil, onRejectValidation);
                    });
                })
                // navigate('/Home');
            }
            else if (confirmEmail && userDataObj.email !== userDataObj.email2) {
                document.getElementById('email2').setCustomValidity("Emails don't match");
            }
            else if (!new RegExp(PasswordRegex).test(userDataObj.password)) {
                document.getElementById('password').setCustomValidity("Password not secured");
            }
            else if (userDataObj.password2 !== userDataObj.password) {
                document.getElementById('password2').setCustomValidity("Passwords don't match");
            }
        }
        else if (formaName === 'login') {
            let { email, password } = userDataObj;
            let tempObj = {
                email: email.toLocaleLowerCase(),
                password: password
            }
            // authUser(tempObj, 'login', 'onSite', onFulfilValidation, onRejectValidation)
            // bcrypt.genSalt(saltRounds, (err, salt) => {
            //     if (err) {
            //         debug('Error with crypt salt: ', err, DBG_PROPS);
            //         return
            //     }
            //     bcrypt.hash(password, salt, (error, hashedPass) => {
            //         if (error) {
            //             debug('Error with crypt Hash: ', error, DBG_PROPS);
            //         }
            //         let tempObj = {
            //             email: email,
            //             password: hashedPass
            //         }
            //         authUser(tempObj, 'login', 'onSite')
            //     });
            // })

            // navigate('/Home');
        }
    }

    let formFields, className = `input${colorMode ? ' darkInput' : ''}`;
    if (signup) { // Sign up form
        formFields = <>
            <div className='ma1'>
                <div className='flex' style={{ justifyContent: 'space-between' }}>
                    <div className='grid center tStart' >
                        <label htmlFor='fname'>שם פרטי: </label>
                        <input
                            id='fname'
                            className={className}
                            maxLength={20}
                            required={true}
                            autoComplete='on'
                            title='שם פרטי'
                            type='text'
                            onChange={onInputHandler}
                            placeholder='שם פרטי'
                            name='fname'></input>
                    </div>
                    <div className='grid tStart' style={{ marginLeft: '2em' }} >
                        <label htmlFor='fname'> שם משפחה: </label>
                        <input
                            id='lname'
                            className={className}
                            maxLength={20}
                            required={true}
                            autoComplete='on'
                            title='שם משפחה'
                            type='text'
                            onChange={onInputHandler}
                            placeholder='שם משפחה'
                            name='lname'></input>
                    </div>
                </div>
            </div>
            <div className='grid ma1'>
                <div className='tStart'>
                    <label htmlFor='email'> כתובת אימייל: </label>
                </div>
                <span>
                    <input
                        id='email'
                        className={className}
                        maxLength={40}
                        required={true}
                        autoComplete='on'
                        title='אימייל'
                        type='email'
                        onChange={onInputHandler}
                        placeholder='אימייל'
                        name='email'></input>
                </span>
                {confirmEmail && <>
                    <div className='tStart'>
                        <label htmlFor='email2'>חזרה על המייל: </label>
                    </div>
                    <input
                        id='email2'
                        className={className}
                        maxLength={40}
                        required={true}
                        onChange={onInputHandler}
                        autoComplete='off'
                        title='אישור אימייל'
                        type='text'
                        placeholder='אישור אימייל'
                        name='email2'></input>
                </>}
            </div>
            <div className='ma1'>
                <div className='flex tStart'>
                    <label htmlFor='password'>סיסמה:  </label>
                    {errInput.password === true && ValidIcons.valid}
                </div>
                <span id='pass'>
                    <input
                        id='password'
                        required={true}
                        minLength={6}
                        maxLength={15}
                        className={className}
                        style={{ marginBottom: (Boolean(errInput.password) && errInput.password !== true) ? '0em' : '' }}
                        title='סיסמה'
                        type={hidePassword ? 'password' : 'text'}
                        onChange={onInputHandler}
                        placeholder='סיסמה'
                        name='password'></input>
                    <svg
                        onClick={() => setPassState(p => !p)}
                        id='passwordEye'
                        xmlns="http://www.w3.org/2000/svg"
                        height="21px"
                        viewBox="0 -960 960 960"
                        width="21px"
                        fill="#27292ad0">
                        {hidePassword ? hidePass : showPass}
                    </svg>
                </span>
                {errInput.password}
                <span id='pass'>
                    <div className='flex tStart'>
                        <label htmlFor='password2'>חזרה על הסיסמה: </label>
                        {errInput.password2}
                    </div>
                    <input
                        id='password2'
                        required={true}
                        minLength={6}
                        maxLength={15}
                        className={className}
                        title='אישור סיסמה'
                        onChange={onInputHandler}
                        type={hidePassword ? 'password' : 'text'}
                        placeholder='אישור סיסמה'
                        name='password2'></input>
                </span>
            </div>
            <div className='flex columns ma1'>
                <label className='tStart'> מה היעדים שלך מהקורס:</label>
                <div className='flex around ma2'>
                    {['תרגול', 'הכנה לבגרות', 'למידה', 'אחר'].map((item, indx) => (
                        <button key={indx + item}
                            type='button'
                            onClick={(e) => onStudentTypeClick(e, item)}
                            className={`round medium pointer themeConst ${userData.type.includes(item) ? '' : 'themeConstBorder'}`}
                        >{item}</button>
                    ))}
                </div>
            </div>
            <div className='flex center mt2'>
                <button
                    style={{ fontSize: '1em' }}
                    className='large pointer round'
                    type='submit'>הרשמה</button>
            </div>
            <div
                style={{ cursor: 'pointer', alignItems: 'center' }}
                onClick={() => { setValidForm(undefined); setSignup(false) }}
                className='flex'>
                <FontAwesomeIcon icon={faArrowRight} />
                <h5 id='signupText'>בחזרה להתחברות</h5>

            </div>
        </>
    }
    else {  // Log in form
        formFields = <>
            <div >
                <div className='flex tStart'>
                    <label htmlFor='email'> אימייל: </label>
                </div>
                <input
                    id='Email'
                    className={className}
                    maxLength={40}
                    required={true}
                    autoComplete='on'
                    title='אימייל'
                    type='email'
                    onChange={onInputHandler}
                    placeholder='אימייל'
                    name='email'></input>
            </div>
            <div>
                <div className='flex tStart' style={{ justifyContent: 'space-between' }}>
                    <label htmlFor='password'>סיסמא: </label>
                    <h6 id='forgetPass' className={`linkHoverColor${colorMode}`}>שכחת סיסמה ? </h6>
                </div>
                <span id='pass'>
                    <input
                        id='Password'
                        required={true}
                        minLength={6}
                        maxLength={15}
                        className={className}
                        title='סיסמה'
                        type={hidePassword ? 'password' : 'text'}
                        onChange={onInputHandler}
                        placeholder='סיסמה'
                        name='password'></input>
                    <svg
                        onClick={() => setPassState(p => !p)}
                        id='passwordEye'
                        title={hidePassword ? 'Show password' : 'Hide password'}
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#27292ad0">
                        {hidePassword ? hidePass : showPass}
                    </svg>
                </span>
            </div>
            {validationErr.current}
            <div className='flex center'>
                <button
                    style={{ fontSize: '1em' }}
                    className='large pointer round mt3'
                    type='submit'>התחברות</button>
            </div>
            <div className='flex center'>
                <h5 id='signupText'>אין לך עדיין חשבון ? </h5>
                <h5
                    onClick={() => setSignup(true)}
                    className={`signUpLink linkHoverColor${colorMode}`}> <b>הרשמה</b></h5>
            </div>
        </>
    }

    let gglLogin = <div className='flex center' style={{ margin: '0.5em' }} >
        <div className='flex google' style={{ width: 'fit-content', borderRadius: '20px', border: colorMode ? '1px solid white' : '' }}>
            <GoogleLogin
                shape='circle'
                size='medium'
                logo_alignment='center'
                text={"No text "}
                theme={!colorMode ? 'outline' : 'filled_black'}
                onSuccess={res => {
                    let userData = jwtDecode(res.credential);
                    debug('Google Res: ', res, userData, DBG_PROPS);
                    // authUser({ ...userData }, signup ? 'signup' : 'login', 'google', onFulfilValidation, onRejectValidation);
                    setUpdate(p => !p)
                }}
                onError={() => {
                    debug('Google Login Failed!', DBG_PROPS);
                }}
                useOneTap
            />
        </div>
    </div>


    let styleMode =
        <div className="flex"
            title={colorMode ? 'Dark mode' : 'Light mode'}
            onClick={() => { localStorage.setItem('colorMode', ((colorMode + 1) % 2)); setColorMode(p => ((1 + p) % 2)) }}
            style={{ cursor: 'pointer', position: 'absolute', right: '50%', bottom: '0.4em' }}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill={colorMode ? '#fff' : "#000"}>
                {!colorMode ? toggleOn : toggleOff}
            </svg>

        </div>

    let loginForm = <div className={`loginForm boxShadow mode${colorMode} ${signup ? 'signup' : 'login'}`}>
        <h2>{signup ? 'הרשמה' : 'התחברות'}</h2>
        <form onSubmit={onSubmitForm} name={signup ? 'signup' : 'login'} >
            {formFields}
        </form>
        {gglLogin}
        {styleMode}
    </div>

    let data = <>
        {
            Object.keys(userData).map((item, indx) => (
                userData[item] &&
                <div key={indx} style={{ gridTemplateColumns: '1fr 3fr' }} className='grid columns'>
                    <h3 >{`${item}: `} </h3>
                    <h3>{userData[item]}</h3>
                </div>
            ))
        }
    </>

    let dbgBtns = <>
    </>

    return (
        <div className='loginContainer rtl' >
            <Logo width='4em' height='3.5em' />
            {loginForm}
            {validForm}
            {/* {data} */}
            {dbgBtns}
        </div>
    )

}