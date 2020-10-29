import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import Switcher from "../../../admin/Components/Switcher";
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {createChangeStyle, createChooseTemplateChanges, createMongoDBId} from "../../../store/actions/actionCreator";

let counter = true;

const Header = ({admin,path,data}) => {
    const dispatch = useDispatch();
    const [activeSections, setActiveSections] = useState((data.header) ? data.header.activeSections : {
        news: false,
        aboutUs: false,
        products: false,
    });
    const [styles, setStyles] = useState((data.header) ? data.header.styles : {header: {bc: '#1D2124', height: '5', className:'header'}, a:{color: '#ffffff', fontSize:'20', className: 'nav__li'}});

    const [memoryBc, setMemoryBc] = useState();
    const [memoryColor, setMemoryColor] = useState();
    const activeStyle = useSelector((state) => {
        if(styles){
            try{
                if(styles[state.activeStyle.tag].className === state.activeStyle.className){
                    const newStyle = Object.assign({},styles);
                    if(!newStyle.header.bc) newStyle.header.bc = '#000000';
                    if(!newStyle.a.color) newStyle.a.color = '#ffffff';
                    newStyle[state.activeStyle.tag] = state.activeStyle;
                    return newStyle;
                }
            } catch (e) {
                return  styles;
            }
        }
        return styles;
    }, shallowEqual);
    const panelHide = useSelector(({stylePanelState}) => stylePanelState, shallowEqual);
    const mongoDBId = useSelector(({mongoDBId}) => {
        if(localStorage.getItem('key')){
            return localStorage.getItem('key');
        } else {
            return mongoDBId;
        }
    }, shallowEqual);
    const change = useSelector(({projectChangedData}) => projectChangedData, shallowEqual);

    const changeStyle = (value) => dispatch(createChangeStyle(value));
    const updateProjectData = (value) => dispatch(createChooseTemplateChanges(value));
    const changeMongoDBId = (value) => dispatch(createMongoDBId(value));

    useEffect(() => {
        counter && setStyles(activeStyle);
        counter = !counter;
    },[activeStyle]);

    updateProjectData({header: {activeSections, styles}});

    const sendProjectData = async () => {
        if(mongoDBId){
            const response = await fetch(`https://finaldan.herokuapp.com/projectData/${mongoDBId}`,{
                method:'PUT',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(change),
            });
            const result = await response.json();
        } else {
            const response = await fetch('https://finaldan.herokuapp.com/projectData',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(change),
            });
            const result = await response.json();
            localStorage.setItem('key',`${result.result._id}`); // Айдишник стилей в монго
            changeMongoDBId(localStorage.getItem('key'));
        }
    };

    const changeActiveSection = (name) => {
        const newObj = Object.assign({}, activeSections);
        newObj[name] = !newObj[name];
        setActiveSections(newObj);
    };

    const chooseTag = (e) => {
        e.stopPropagation();
        sendProjectData();
        for(let key in styles){
            if(key === e.target.tagName.toLowerCase()){
                changeStyle(Object.assign(styles[key], {tag: key}));
            }
        }
    };

    const modalBcOver = (e) => {
        e.stopPropagation();
        if(panelHide){
            for(let key in styles){
                if(key === e.target.tagName.toLowerCase()) {
                    const newStyle = Object.assign({},styles);
                    if(newStyle[key].bc !== 'rgb(0,57,167)') setMemoryBc(newStyle[key].bc);
                    if(newStyle[key].color !== 'rgb(76,131,253)') setMemoryColor(newStyle[key].color);
                    if(newStyle[key].bc) newStyle[key].bc = 'rgb(0,57,167)';
                    if(newStyle[key].color) newStyle[key].color = 'rgb(76,131,253)';
                    setStyles(newStyle);
                }
            }
        }
    }

    const modalBcOut = (e) => {
        e.stopPropagation();
        if(panelHide){
            for(let key in styles){
                if(key === e.target.tagName.toLowerCase()) {
                    const newStyle = Object.assign({},styles);
                    if(newStyle[key].bc) newStyle[key].bc = memoryBc;
                    if(newStyle[key].color) newStyle[key].color = memoryColor;
                    setStyles(newStyle);
                }
            }
        }
    }

    return(
        <header onMouseOver={modalBcOver} onMouseOut={modalBcOut} onClick={chooseTag} style={{backgroundColor:styles.header.bc, height:`${styles.header.height}em`}}>
            <nav onClick={chooseTag}>
                <li><NavLink onMouseOver={modalBcOver} onMouseOut={modalBcOut} onClick={chooseTag} style={{color:styles.a.color, fontSize:`${styles.a.fontSize}px`}} to={`/${path}/${mongoDBId}/home`}>Home</NavLink></li>
                <div className={`li-box ${admin && 'li-box-active'}`}>
                    {activeSections.news && <li><NavLink onMouseOver={modalBcOver} onMouseOut={modalBcOut} onClick={chooseTag} style={{color:styles.a.color, fontSize:`${styles.a.fontSize}px`}} to={`/${path}/${mongoDBId}/news`}>News</NavLink></li>}
                    {!activeSections.news && admin && <li className='inactive'>News</li>}
                    {admin && <Switcher activeSections={activeSections.news} onChange={changeActiveSection} name='news'/>}
                </div>
                <div className={`li-box ${admin && 'li-box-active'}`}>
                    {activeSections.aboutUs && <li><NavLink onMouseOver={modalBcOver} onMouseOut={modalBcOut} onClick={chooseTag} style={{color:styles.a.color, fontSize:`${styles.a.fontSize}px`}} to={`/${path}/${mongoDBId}/aboutus`}>About us</NavLink></li>}
                    {!activeSections.aboutUs && admin && <li className='inactive'>About us</li>}
                    {admin && <Switcher activeSections={activeSections.aboutUs} onChange={changeActiveSection} name='aboutUs'/>}
                </div>
                <div className={`li-box ${admin && 'li-box-active'}`}>
                    {activeSections.products && <li><NavLink onMouseOver={modalBcOver} onMouseOut={modalBcOut} onClick={chooseTag} style={{color:styles.a.color, fontSize:`${styles.a.fontSize}px`}} to={`/${path}/${mongoDBId}/products`}>Products</NavLink></li>}
                    {!activeSections.products && admin && <li className='inactive'>Products</li>}
                    {admin && <Switcher activeSections={activeSections.products} onChange={changeActiveSection} name='products'/>}
                </div>
            </nav>
        </header>
    )
};


export default Header;