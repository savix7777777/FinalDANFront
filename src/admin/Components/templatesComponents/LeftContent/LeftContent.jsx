import React, {useEffect, useState} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {createChooseTemplateChanges, createChangeStyle} from "../../../../store/actions/actionCreator";
import TagsConstructor from "../../TagsConstructor";

let counter = true;

const LeftContent = ({admin, section, data}) => {
    const dispatch = useDispatch();
    const [styles, setStyles] = useState((data[`leftContent-${section}`]) ? data[`leftContent-${section}`].styles : {div: {width: '100', className: `left-content-${section}`}, divb:{width: '40', className: `left-content-b-${section}`}});
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

    updateProjectData({[`leftContent-${section}`]:{styles,key:`leftContent-${section}`}});

    const chooseTag = (e) => {
        for(let key in styles){
            if(key === e.target.tagName.toLowerCase()){
                changeStyle(Object.assign(styles[key], {tag: key}));
            }
        }
    };

    return(
        <div className='right-content'>
            <divb onClick={chooseTag} style={{width: `${styles.divb.width}%`}} className={`right-content-big ${admin && 'templates-border'}`}>
                <TagsConstructor data={data} divCount={0} classKey={section + '-6'} admin={admin}/>
            </divb>
            <div className='right-content-leftSIde'>
                <div onClick={chooseTag} style={{width: `${styles.div.width}%`}} className={`right-content-small ${admin && 'templates-border'}`}>
                    <TagsConstructor data={data} divCount={0} classKey={section + '-7'} admin={admin}/>
                </div>
                <div onClick={chooseTag} style={{width: `${styles.div.width}%`}} className={`right-content-small ${admin && 'templates-border'}`}>
                    <TagsConstructor data={data} divCount={0} classKey={section + '-8'} admin={admin}/>
                </div>
            </div>
        </div>
    )
};


export default LeftContent;