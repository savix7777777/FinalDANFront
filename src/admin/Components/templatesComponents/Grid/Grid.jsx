import React, {useEffect, useState} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {createChooseTemplateChanges, createChangeStyle} from "../../../../store/actions/actionCreator";
import TagsConstructor from "../../TagsConstructor";

let counter = true;

const Grid = ({admin, section, data}) => {

    const dispatch = useDispatch();
    const [styles, setStyles] = useState((data[`grid-${section}`]) ? data[`grid-${section}`].styles : {div: {width: '40', className: `grid-${section}`}});
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

    updateProjectData({[`grid-${section}`]:{styles,key:`grid-${section}`}});

    const chooseTag = (e) => {
        for(let key in styles){
            if(key === e.target.tagName.toLowerCase()){
                changeStyle(Object.assign(styles[key], {tag: key}));
            }
        }
    };

    return(
        <div className='grid'>
            <div className='grid-row'>
                <div onClick={chooseTag} style={{width: `${styles.div.width}%`}} className={`grid-row__content-box ${admin && 'templates-border'}`}>
                    <TagsConstructor data={data} divCount={0} classKey={section + '-2'} admin={admin}/>
                </div>
                <div onClick={chooseTag} style={{width: `${styles.div.width}%`}} className={`grid-row__content-box ${admin && 'templates-border'}`}>
                    <TagsConstructor data={data} divCount={0} classKey={section + '-3'} admin={admin}/>
                </div>
            </div>
            <div className='grid-row'>
                <div onClick={chooseTag} style={{width: `${styles.div.width}%`}} className={`grid-row__content-box ${admin && 'templates-border'}`}>
                    <TagsConstructor data={data} divCount={0} classKey={section + '-4'} admin={admin}/>
                </div>
                <div onClick={chooseTag} style={{width: `${styles.div.width}%`}} className={`grid-row__content-box ${admin && 'templates-border'}`}>
                    <TagsConstructor data={data} divCount={0} classKey={section + '-5'} admin={admin}/>
                </div>
            </div>
        </div>
    )
};


export default Grid;