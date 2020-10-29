import React, {useEffect, useState} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {createChangeStyle, createModalState} from "../../../store/actions/actionCreator";
import Button from "../../../user/Components/Button";
import ModalPortal from "../../../user/Components/ModalPortal";
import Modal from "../../../user/Components/Modal";

let counter = true;

const Post = ({heading, text, time, date, styleKey, admin, deletePost, src, returnStyles, style}) => {

    console.log(style);
    const dispatch = useDispatch();
    const [styles, setStyles] = useState((style) ? style.styles : {div:{bc:'#14B9D5', color:'#ffffff', width:'80', className:`post-${styleKey}`}, h2:{fontSize:'40', className:`post__h2-${styleKey}`}, img:{width: '300', height: '10',  className:`post__img-${styleKey}`}});
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
    const modalState = useSelector(({modalState}) => modalState, shallowEqual);
    const panelHide = useSelector(({stylePanelState}) => stylePanelState, shallowEqual)

    const changeStyle = (value) => dispatch(createChangeStyle(value));
    const changeModalState = () => dispatch(createModalState());

    useEffect(() => {
        counter && setStyles(activeStyle);
        returnStyles({[`post-${styleKey}`]:{styles,key:`post-${styleKey}`}});
        counter = !counter;
    },[activeStyle]);


    const chooseTag = (e) => {
        e.stopPropagation();
        for(let key in styles){
            if(key === e.target.tagName.toLowerCase()){
                changeStyle(Object.assign(styles[key], {tag: key}));
            }
        }
    };

    const confirmDelete = (value) => {
        value && deletePost(styleKey);
        changeModalState();
    };

    const handleClickDelete = () => {
        !modalState && changeModalState();
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
        <>
            <div onMouseOver={modalBcOver} onMouseOut={modalBcOut} onClick={chooseTag} style={{backgroundColor: styles.div.bc, color: styles.div.color, width: `${styles.div.width}%`}} className='post'>
                {src && <div className='post__img-box'><img style={{ width: `${styles.img.width}px`, height: `${styles.img.height}em`}} className='post__img' alt='img' src={src}/></div>}
                <h2 onClick={chooseTag} style={{fontSize:`${styles.h2.fontSize}px`}}>{heading}</h2>
                <p className='post__text'>{text}</p>
                <div className='post__date-box'>
                    <p className='post__date-box__minutes'>{time}</p>
                    <p>{date}</p>
                </div>
                {admin && <Button className='tags-constructor__delete post-delete' onClick={handleClickDelete}><i className="fas fa-trash-alt"> </i></Button>}
            </div>
            {modalState && <ModalPortal><Modal
                text='Are you sure you want to delete the post ?'
                buttonConfirmText='Delete'
                buttonCancelText='Cancel'
                func={confirmDelete}
            /></ModalPortal>}
        </>
    )
};


export default Post;