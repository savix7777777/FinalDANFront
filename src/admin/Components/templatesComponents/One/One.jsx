import React, {useEffect, useState} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {createChooseTemplateChanges, createChangeStyle} from "../../../../store/actions/actionCreator";
import TagsConstructor from "../../TagsConstructor";

let counter = true;

const One = ({admin, section, data}) => {

    const dispatch = useDispatch();
    const [styles, setStyles] = useState((data[`one-${section}`]) ? data[`one-${section}`].styles : {div: {width: '95', className: `one-${section}`}});
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

    updateProjectData({[`one-${section}`]:{styles,key:`one-${section}`}});

    const chooseTag = (e) => {
        for(let key in styles){
            if(key === e.target.tagName.toLowerCase()){
                changeStyle(Object.assign(styles[key], {tag: key}));
            }
        }
    };

    return(
        <div onClick={chooseTag} style={{width: `${styles.div.width}%`}} className={`one ${admin && 'templates-border'}`}>
            <TagsConstructor data={data} divCount={0} classKey={section + '-1'} admin={admin}/>
        </div>
    )
};


export default One;