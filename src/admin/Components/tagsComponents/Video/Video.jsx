import React, {useEffect, useState} from "react";
import Button from "../../../../user/Components/Button";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {createChooseTemplateChanges, createChangeStyle} from "../../../../store/actions/actionCreator";

let counter = true;

const Video = ({admin, classKey, deleteKey, deleteItem, data}) => {

    const dispatch = useDispatch();
    const [styles, setStyles] = useState((data[`video-${classKey}`]) ? data[`video-${classKey}`].styles : {video:{marginTop:'0',marginBottom:'0',marginLeft:'0', width: '250', className:`video-${classKey}`}});
    const [editState, setEditState] = useState(false);
    const [videoSrc, setVideoSrc] = useState((data[`video-${classKey}`]) ? data[`video-${classKey}`].videoSrc : '');
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

    updateProjectData({[`video-${classKey}`]: {styles,videoSrc,key:`video-${classKey}`}});

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

    const deleteVideo = () => {
        deleteItem(deleteKey,'video',[`video-${classKey}`]);
    };

    const handleChange = ({target}) => {
        setVideoSrc(target.value)
    };

    return(
        <div className='img'>
            {!editState && <video autoPlay controls style={{marginTop:`${styles.video.marginTop}%`,marginBottom:`${styles.video.marginBottom}%`,marginLeft:`${styles.video.marginLeft}%`, width: `${styles.video.width}px`}} onClick={chooseTag} src={videoSrc}/>}
            {editState && <>
                File:<input className='img__input' onChange={handleChange} type='file' accept='video/*'/>
                Link:<input className='img__input' onChange={handleChange} value={videoSrc} placeholder='Link to video'/>
            </>}
            {admin &&
            <div className='tags-constructor__control-buttons' style={{marginTop:`${styles.video.marginTop}%`,marginBottom:`${styles.video.marginBottom}%`}}>
                <Button className='p-delete' onClick={deleteVideo}><i className="fas fa-trash-alt"> </i></Button>
                <Button className='p-edit' onClick={edit}><i className="fas fa-edit"> </i></Button>
            </div>
            }
        </div>
    )
};


export default Video;