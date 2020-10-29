import React, {useEffect, useState} from "react";
import Button from "../../../../user/Components/Button";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {createChooseTemplateChanges, createChangeStyle} from "../../../../store/actions/actionCreator";

let counter = true;

const Img = ({admin, classKey, deleteKey, deleteItem, data}) => {

    const dispatch = useDispatch();
    const [styles, setStyles] = useState((data[`img-${classKey}`]) ? data[`img-${classKey}`].styles : {img:{marginTop:'0',marginBottom:'0',marginLeft:'0', width: '250', height: '10', className:`img-${classKey}`}});
    const [editState, setEditState] = useState(false);
    const [imgSrc, setImgSrc] = useState((data[`img-${classKey}`]) ? data[`img-${classKey}`].imgSrc : '');
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

    updateProjectData({[`img-${classKey}`]: {styles,imgSrc,key:`img-${classKey}`}});

    const chooseTag = (e) => {
        e.stopPropagation();
        for(let key in styles){
            if(key === e.target.tagName.toLowerCase()){
                changeStyle(Object.assign(styles[key], {tag: key}));
            }
        }
    };

    const edit = () => {
        setEditState(!editState);
    };

    const deleteImg = () => {
        deleteItem(deleteKey,'img',[`img-${classKey}`]);
    };

    const handleChange = ({target}) => {
        setImgSrc(target.value)//!!!
    };

    return(
        <div className='img'>
            {!editState && <img style={{marginTop:`${styles.img.marginTop}%`,marginBottom:`${styles.img.marginBottom}%`,marginLeft:`${styles.img.marginLeft}%`, width: `${styles.img.width}px`, height: `${styles.img.height}em`}} onClick={chooseTag} alt='img' src={imgSrc}/>}
            {editState && <>
                File:<input className='img__input' onChange={handleChange} type='file' accept='image/*'/>
                Link:<input className='img__input' onChange={handleChange} value={imgSrc} placeholder='Link to img'/>
            </>}
            {admin &&
            <div className='tags-constructor__control-buttons' style={{marginTop:`${styles.img.marginTop}%`,marginBottom:`${styles.img.marginBottom}%`}}>
                <Button className='p-delete' onClick={deleteImg}><i className="fas fa-trash-alt"> </i></Button>
                <Button className='p-edit' onClick={edit}><i className="fas fa-edit"> </i></Button>
            </div>
            }
        </div>
    )
};


export default Img;