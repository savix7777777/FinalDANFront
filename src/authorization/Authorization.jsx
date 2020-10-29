import React, {useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router";
import Button from "../user/Components/Button";
import Login from "./Login";
import Register from "./Register";


const Authorization = () => {

    let history = useHistory();
    let location = useLocation();

    useEffect(() => {
        if(localStorage.getItem('accessToken')){
            history.push('/');
        }
    });

    const [modalState, setModalState] = useState((location.pathname === '/auth' && {logIn: false, register: false, choose: true})
        || (location.pathname === '/auth/signin' && {logIn: true, register: false, choose: false})
        || (location.pathname === '/auth/signup' && {logIn: false, register: true, choose: false}));

    return(
        <div className='authorization'>
            {modalState.choose &&
            <>
                <h1>Welcome</h1>
                <Button className='authorization__log-in' onClick={() => {
                    setModalState({logIn: true, register: false, choose: false});
                    history.push('/auth/signup',{from: 'Authorization'});
                }}>Log In</Button>
                <div className='authorization__or-box'>
                    <div className='authorization__line'> </div>or<div className='authorization__line'> </div>
                </div>
                <Button className='authorization__register' onClick={() => {
                    setModalState({logIn: false, register: true, choose: false});
                    history.push('/auth/signup',{from: 'Authorization'});
                }}>Create Account</Button>
            </>}
            {modalState.logIn && <Login back={setModalState} />}
            {modalState.register && <Register back={setModalState} />}
        </div>
    )
};


export default Authorization;