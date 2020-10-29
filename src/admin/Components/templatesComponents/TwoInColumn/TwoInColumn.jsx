import React, {useEffect, useState} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {createChooseTemplateChanges, createChangeStyle} from "../../../../store/actions/actionCreator";
import TagsConstructor from "../../TagsConstructor";

let counter = true;

const TwoInColumn = ({admin,section,data}) => {

    const dispatch = useDispatch();
    const [styles, setStyles] = useState((data[`twoInColumn-${section}`]) ? data[`twoInColumn-${section}`].styles :{div: {width: '90', className: `two-in-column-${section}`}});
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

    updateProjectData({[`twoInColumn-${section}`]:{styles,key:`twoInColumn-${section}`}});

    const chooseTag = (e) => {
        for(let key in styles){
            if(key === e.target.tagName.toLowerCase()){
                changeStyle(Object.assign(styles[key], {tag: key}));
            }
        }
    };

    return(
        <div className='two-in-column'>
            <div onClick={chooseTag} style={{width: `${styles.div.width}%`}} className={`two-in-column__content-box ${admin && 'templates-border'}`}>
                <TagsConstructor data={data} divCount={0} classKey={section + '-12'} admin={admin}/>
            </div>
            <div onClick={chooseTag} style={{width: `${styles.div.width}%`}} className={`two-in-column__content-box ${admin && 'templates-border'}`}>
                <TagsConstructor data={data} divCount={0} classKey={section + '-13'} admin={admin}/>
            </div>
        </div>
    )
};


export default TwoInColumn;