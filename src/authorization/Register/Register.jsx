import React, {useState} from "react";
import Button from "../../user/Components/Button";
import {useHistory} from "react-router";
import {Redirect} from "react-router-dom";


const Register = ({back}) => {

    let history = useHistory();

    const [showPassword, setShowPassword] = useState(false);
    const [showSecPassword, setShowSecPassword] = useState(false);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [errorTextLog, setErrorTextLog] = useState(false);
    const [errorTextPass, setErrorTextPass] = useState(false);
    const [responseError, setResponseError] = (useState(''));

    const handleBack = () => {
        history.goBack();
        back({logIn: false, register: false, choose: true});
    }

    const sendUserData = async (e) => {
        e.preventDefault();
        if(!login){
            setErrorTextLog(true);
        } else if(!password || !confirmPassword){
            setErrorTextLog(false);
            setErrorTextPass(true)
        } else if(password !== confirmPassword){
            setErrorTextPass(false);
            setPasswordMatch(false);
        } else {
            setPasswordMatch(true);
            const response = await fetch('http://localhost:5000/auth/signup',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: login,
                    password: password,
                }),
            });
            const result = await response.json();
            if(result.status === 'Duplicate'){
                setResponseError('duplicate');
            } else if(result.status === 'Error'){
                setResponseError('error');
            } else {
                setResponseError('');
                const response = await fetch('http://localhost:5000/auth/signin',{
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({email:login, password:password}),
                });
                const result = await response.json();
                if(result.status === 'Error'){
                    setResponseError('error');
                } else{
                    setResponseError('');
                    localStorage.setItem('userId',result.data.id);
                    localStorage.setItem('accessToken',result.data.accessToken);
                    history.push('/');
                    window.location.reload()
                }
            }
        }
    }


    return(
        <>
            <form onSubmit={sendUserData}>
                <h1>Sign Up</h1>
                <div className='authorization__input-box'>
                    Email:
                    <input onChange={({target}) => {setLogin(target.value)}} name='login' type='email' className='authorization__input email' />
                    {errorTextLog && <p className='authorization__error-text'>Empty!</p>}
                </div>
                <div className='authorization__input-box'>
                    Password:
                    <input onChange={({target}) => {setPassword(target.value)}} name='password' type={showPassword ? 'text' : 'password'} className='authorization__input' />
                    <i className={showPassword ?  'fas fa-eye' : 'fas fa-eye-slash'} onClick={() => setShowPassword(!showPassword)}> </i>
                    {errorTextPass && <p className='authorization__error-text'>Empty!</p>}
                    {!passwordMatch && <p className='authorization__error-text-match'>Passwords must match!</p>}
                </div>
                <div className='authorization__input-box'>
                    Confirm password:
                    <input onChange={({target}) => {setConfirmPassword(target.value)}} name='password' type={showSecPassword ? 'text' : 'password'} className='authorization__input' />
                    <i className={showSecPassword ?  'fas fa-eye' : 'fas fa-eye-slash'} onClick={() => setShowSecPassword(!showSecPassword)}> </i>
                    {errorTextPass && <p className='authorization__error-text'>Empty!</p>}
                    {!passwordMatch && <p className='authorization__error-text-match'>Passwords must match!</p>}
                </div>
                <Button className='authorization__register register-solo'>Sign Up</Button>
                {responseError === 'duplicate' && <p className='authorization__response-error-text'>This mail is already in use!</p>}
            </form>
            <div className='authorization__return-box'><Button onClick={handleBack} className='authorization__return'>Return</Button></div>
        </>
    )
};


export default Register;