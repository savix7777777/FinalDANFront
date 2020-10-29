import React from 'react';
import {BrowserRouter,Route,Redirect} from 'react-router-dom';
import './scss/index.scss'
import SubRoute from "./SubRoute";
import ControlPanel from "./admin/Sections/ControlPanel";
import{Provider} from "react-redux";
import store from "./store/store";
import Authorization from "./authorization";
import UserDesktop from "./desktop/UserDesktop";

//Разобраться с мультером
//Добавить инструкцию
//Добавить линки на проект к карточке проекта

function App() {

    return (
        <BrowserRouter>
            <Route path='/auth'>
                <Authorization path='/auth'/>
            </Route>
            <Route exact path='/'>
                {(localStorage.getItem('accessToken')) ?
                    <UserDesktop path='' /> : <Redirect to='/auth'/>
                }
            </Route>
            <Provider store={store}>
                <Route path='/user'>
                    <SubRoute admin={false} path='user'/>
                </Route>
                <Route path='/admin'>
                    <ControlPanel>
                      <SubRoute admin={true} path='admin'/>
                    </ControlPanel>
                </Route>
            </Provider>
        </BrowserRouter>
  );
}

export default App;
