import React, {useEffect, useState} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {createChooseTemplateChanges, createChangeStyle} from "../../../../store/actions/actionCreator";
import TagsConstructor from "../../TagsConstructor";

let counter = true;

const RightContent = ({admin, section,data}) => {

    const dispatch = useDispatch();
    const [styles, setStyles] = useState((data[`rightContent-${section}`]) ? data[`rightContent-${section}`].styles : {div: {width: '100', className: `right-content-${section}`}, divb:{width: '40', className: `right-content-b-${section}`}});
    const activeStyle = useSelector((state) => {
        if(styles){
            try{
                if(styles[state.activeStyle.tag].className === state.activeStyle.className){
                    const newStyle = Object.assign({},styles);
                    newStyle[state.activeStyle.tag] = state.activeStyle;
                    return newStyle;
                }
            } catch (e) {
                return  styles;
            }
        }
        return styles;
    }, shallowEqual);

    const changeStyle = (value) => dispatch(createChangeStyle(value));
    const updateProjectData = (value) => dispatch(createChooseTemplateChanges(value));

    useEffect(() => {
        counter && setStyles(activeStyle);
        counter = !counter;
    },[activeStyle]);

    updateProjectData({[`rightContent-${section}`]:{styles,key:`rightContent-${section}`}});


    const chooseTag = (e) => {
        for(let key in styles){
            if(key === e.target.tagName.toLowerCase()){
                changeStyle(Object.assign(styles[key], {tag: key}));
            }
        }
    };

    return(
        <div className='right-content'>
            <div className='right-content-leftSIde'>
                <div onClick={chooseTag} style={{width: `${styles.div.width}%`}} className={`right-content-small ${admin && 'templates-border'}`}>
                    <TagsConstructor data={data} divCount={0} classKey={section + '-9'} admin={admin}/>
                </div>
                <div onClick={chooseTag} style={{width: `${styles.div.width}%`}} className={`right-content-small ${admin && 'templates-border'}`}>
                    <TagsConstructor data={data} divCount={0} classKey={section + '-10'} admin={admin}/>
                </div>
            </div>
            <divb onClick={chooseTag} style={{width: `${styles.divb.width}%`}} className={`right-content-big ${admin && 'templates-border'}`}>
                <TagsConstructor data={data} divCount={0} classKey={section + '-11'} admin={admin}/>
            </divb>
        </div>
    )
};


export default RightContent;