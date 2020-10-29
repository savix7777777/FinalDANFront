import React, {useEffect, useState} from "react";
import Button from "../Button";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {createChooseTemplateChanges, createChangeStyle} from "../../../store/actions/actionCreator";

let counter = true;

const Modal = ({text, buttonConfirmText, buttonCancelText, func}) => {

    const dispatch = useDispatch();
    const [styles, setStyles] = useState({div: {bc: '#14B9D5', color: '#ffffff', height: '10', className:'modal-box'}});
    const [memoryBc, setMemoryBc] = useState();
    const [memoryColor, setMemoryColor] = useState();
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
    const panelHide = useSelector(({stylePanelState}) => stylePanelState, shallowEqual);

    const changeStyle = (value) => dispatch(createChangeStyle(value));
    const updateProjectData = (value) => dispatch(createChooseTemplateChanges(value));

    useEffect(() => {
        counter && setStyles(activeStyle);
        counter = !counter;
    },[activeStyle]);

    updateProjectData({modal: {styles}});

    const chooseTag = (e) => {
        e.stopPropagation();
        for(let key in styles){
            if(key === e.target.tagName.toLowerCase()){
                changeStyle(Object.assign(styles[key], {tag: key}));
            }
        }
    };

    const confirm = () => {
        func(true);
    };

    const cancel = () => {
        func(false);
    };

    const modalBcOver = (e) => {
        e.preventDefault();
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
        e.preventDefault();
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
        <div onMouseOver={modalBcOver} onMouseOut={modalBcOut} onClick={chooseTag} style={{backgroundColor: styles.div.bc, color: styles.div.color, height: `${styles.div.height}em`}} className='modal'>
            <p>{text}</p>
            <divbox className='modal__button-box'>
                <Button className='modal__confirm' onClick={confirm}>{buttonConfirmText}</Button>
                <Button className='modal__cancel' onClick={cancel}>{buttonCancelText}</Button>
            </divbox>
        </div>
    )
};


export default Modal;
