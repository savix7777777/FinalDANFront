import React, {useEffect, useState} from "react";
import {Switch, Route, useLocation, Redirect} from 'react-router-dom';
import Home from "./user/Sections/Home";
import News from "./user/Sections/News";
import AboutUs from "./user/Sections/AboutUs";
import Products from "./user/Sections/Products";
import MainSection from "./user/Sections/MainSection";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {createChooseTemplateChanges} from "./store/actions/actionCreator";

const SubRoute = ({admin, path}) => {

    const dispatch = useDispatch();
    const location = useLocation();

    const [renderCounter, setRenderCounter] = useState(true);
    const [data, setData] = useState(false);
    const [start, setStart] = useState(false);//devTool
    const [locationAuthStr, setLocationAuthStr] = useState(false);

    const mongoDBId = useSelector(({mongoDBId}) => {
        if(localStorage.getItem('key')){
            return localStorage.getItem('key');
        } else {
            return mongoDBId;
        }
    }, shallowEqual);

    const getProjectKey = () => {
        const locArr = location.pathname.split('/');
        let result = locArr.reduce((maxLength,item) => {
            if(item === 'admin'){
                setLocationAuthStr(true);
            } else {
                setLocationAuthStr(false);
            }
            if(maxLength.length > item.length){
                return maxLength;
            } else {
                return item;
            }
        },'');
        localStorage.setItem('key',result);
    };

    const updateProjectData = (value) => dispatch(createChooseTemplateChanges(value));

    useEffect(() => {
        !admin && getProjectKey();
        renderCounter && mongoDBId && fetch(`https://finaldan.herokuapp.com/projectData/${mongoDBId}`)
            .then(response => response.json())
            .then(({result}) => {
                try{
                    setData(result[0].data);
                    updateProjectData(result[0].data);
                } catch (e){

                }
            });
        setRenderCounter(false);
    });

    return(
        <>
            {(data || start) && <MainSection data={data} admin={admin} path={path}>
                <Switch>
                    {((!admin) ?
                        <>
                            <Route path={`/${path}/${mongoDBId}/home`}><Home data={data} admin={admin}/></Route>
                            <Route path={`/${path}/${mongoDBId}/news`}><News data={data} admin={admin}/></Route>
                            <Route path={`/${path}/${mongoDBId}/aboutus`}><AboutUs data={data} admin={admin}/></Route>
                            <Route path={`/${path}/${mongoDBId}/products`}><Products data={data} admin={admin}/></Route>
                        </>
                        : (localStorage.getItem('accessToken'))) ?
                        <>
                            <Route path={`/${path}/${mongoDBId}/home`}><Home data={data} admin={admin}/></Route>
                            <Route path={`/${path}/${mongoDBId}/news`}><News data={data} admin={admin}/></Route>
                            <Route path={`/${path}/${mongoDBId}/aboutus`}><AboutUs data={data} admin={admin}/></Route>
                            <Route path={`/${path}/${mongoDBId}/products`}><Products data={data} admin={admin}/></Route>
                        </>
                        :
                        <Redirect to='/auth'/>
                    }
                </Switch>
            </MainSection>}
        </>
    )
};


export default SubRoute;