import React, {useEffect, useState} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {createChooseTemplateChanges, createChangeStyle} from "../../../../store/actions/actionCreator";
import TagsConstructor from "../../TagsConstructor";

let counter = true;

const TwoInRow = ({admin, section,data}) => {

    const dispatch = useDispatch();
    const [styles, setStyles] = useState((data[`twoInRow-${section}`]) ? data[`twoInRow-${section}`].styles :{div: {width: '40', className: `two-in-row-${section}`}});
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

    updateProjectData({[`twoInRow-${section}`]:{styles,key:`twoInRow-${section}`}});

    const chooseTag = (e) => {
        for(let key in styles){
            if(key === e.target.tagName.toLowerCase()){
                changeStyle(Object.assign(styles[key], {tag: key}));
            }
        }
    };


    return(
        <div className='two-in-row'>
            <div onClick={chooseTag} style={{width: `${styles.div.width}%`}} className={`two-in-row__content-box ${admin && 'templates-border'}`}>
                <TagsConstructor data={data} divCount={0} classKey={section + '-14'} admin={admin}/>
            </div>
            <div onClick={chooseTag} style={{width: `${styles.div.width}%`}} className={`two-in-row__content-box ${admin && 'templates-border'}`}>
                <TagsConstructor data={data} divCount={0} classKey={section + '-15'} admin={admin}/>
            </div>
        </div>
    )
};


export default TwoInRow;