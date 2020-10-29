import React, {useEffect, useState} from "react";
import Button from "../../../user/Components/Button";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {createChangeStyle, createModalState} from "../../../store/actions/actionCreator";
import ModalPortal from "../../../user/Components/ModalPortal";
import Modal from "../../../user/Components/Modal";

let counter = true;

const Product = ({title, description, price, styleKey, admin, deleteProduct, src, returnStyles, style}) => {

    const [productCounter, setProductCounter] = useState(1);
    const [buyState, setBuyState] = useState(false);
    const dispatch = useDispatch();
    const [styles, setStyles] = useState((style) ? style.styles : {div:{bc:'#ffffff', color:'#000000', width:'80', className:`product-${styleKey}`}, h2:{fontSize:'40', className:`product__h2-${styleKey}`}, img:{width: '300', height: '10',  className:`product__img-${styleKey}`}, input:{bc:'#ffffff', color:'#14B9D5', className:`product__input-${styleKey}`}});
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
    const panelHide = useSelector(({stylePanelState}) => stylePanelState, shallowEqual)
    const modalState = useSelector(({modalState}) => modalState, shallowEqual);

    const changeStyle = (value) => dispatch(createChangeStyle(value));
    const changeModalState = () => dispatch(createModalState());

    useEffect(() => {
        counter && setStyles(activeStyle);
        returnStyles({[`product-${styleKey}`]:{styles,key:`product-${styleKey}`}});
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
        value && deleteProduct(styleKey);
        changeModalState();
    };

    const handleClickDelete = () => {
        !modalState && changeModalState();
    };

    const handleChangeCounter = ({target}) => {
        setProductCounter(target.value);
    };

    const buy = () => {
        setBuyState(true);
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
            <div onMouseOver={modalBcOver} onMouseOut={modalBcOut} onClick={chooseTag} style={{backgroundColor: styles.div.bc, color: styles.div.color, width: `${styles.div.width}%`}} className='product'>
                {src && <div className='product__img-box'><img style={{ width: `${styles.img.width}px`, height: `${styles.img.height}em`}} className='product__img' alt='img' src={src}/></div>}
                <h2 className='product__h2' onClick={chooseTag} style={{fontSize:`${styles.h2.fontSize}px`}}>{title}</h2>
                <p className='product__text'>{description}</p>
                <p className='product__price'>{price}</p>
                <div className='product__bottom-box'>
                    <input onMouseOver={modalBcOver} onMouseOut={modalBcOut} style={{backgroundColor: styles.input.bc, color: styles.input.color}} onChange={handleChangeCounter} min='1' className='product__counter' type='number' value={productCounter}/>
                    <Button onClick={buy} className={`product__buy ${buyState && 'product__buy-confirm'}`}>buy now {buyState && <i className={`fas fa-check ${buyState && 'product__buy-check'}`}> </i>}</Button>
                </div>
                {admin && <Button className='tags-constructor__delete post-delete' onClick={handleClickDelete}><i className="fas fa-trash-alt"> </i></Button>}
            </div>
            {modalState && <ModalPortal><Modal
                text='Are you sure you want to delete the product ?'
                buttonConfirmText='Delete'
                buttonCancelText='Cancel'
                func={confirmDelete}
            /></ModalPortal>}
        </>
    )
};


export default Product;