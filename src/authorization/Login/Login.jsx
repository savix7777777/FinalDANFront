import React, {useState} from "react";
import Button from "../../user/Components/Button";
import {useHistory} from "react-router";


const Login = ({back}) => {

    let history = useHistory();

    const [showPassword, setShowPassword] = useState(false);
    const [login, setLogin] = useState('');
    const [errorTextLog, setErrorTextLog] = useState(false);
    const [errorTextPass, setErrorTextPass] = useState(false);
    const [password, setPassword] = useState('');
    const [responseError, setResponseError] = useState('');

    const handleBack = () => {
        history.goBack();
        back({logIn: false, register: false, choose: true});
    }

    const sendUserData = async (e) => {
       e.preventDefault();
       if(!login){
           setErrorTextLog(true);
       } else if(!password){
           setErrorTextLog(false);
           setErrorTextPass(true)
       } else {
           setErrorTextPass(false);
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
           } else if(result.status === 'ErrorUser'){
               setResponseError('eUser');
           } else if(result.status === 'ErrorPass'){
               setResponseError('ePass');
           } else{
               setResponseError('');
               localStorage.setItem('userId',result.data.id);
               localStorage.setItem('accessToken',result.data.accessToken);
               history.push('/');
               window.location.reload();
           }
       }
    }


    return(
        <>
            <form onSubmit={sendUserData}>
                <h1>Log In</h1>
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
                </div>
                <Button className='authorization__log-in register-solo'>Log In</Button>
                {responseError === 'error' && <p className='authorization__response-error-text'>Error, please try later</p>}
                {responseError === 'eUser' && <p className='authorization__response-error-text'>User Not found</p>}
                {responseError === 'ePass' && <p className='authorization__response-error-text'>Invalid Password!</p>}
            </form>
            <div className='authorization__return-box'><Button onClick={handleBack} className='authorization__return'>Return</Button></div>
        </>
    )
};


export default Login;