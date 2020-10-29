import React, {useEffect, useMemo, useState} from "react";
import Button from "../../../user/Components/Button";
import TagsModalList from "../TagsModalList";
import P from "../tagsComponents/P";
import Img from "../tagsComponents/Img";
import Video from "../tagsComponents/Video";
import Linka from "../tagsComponents/Linka";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {createChooseTemplateChanges, createChangeStyle, createMongoDBId} from "../../../store/actions/actionCreator";

let counter = true;


const TagsConstructor = ({admin, classKey, divCount, deleteKey, deleteI, data}) => {

    const dispatch = useDispatch();
    const [styles, setStyles] = useState((data[`box-${classKey}`]) ? data[`box-${classKey}`].styles : {div:{bc: '#ffffff', width: '50', marginTop:'0',marginBottom:'0',marginLeft:'0', br: '0', className:`box-${classKey}`}});
    const [showTagsPanel, setShowTagsPanel] = useState(false);
    const [tagList, setTagList] = useState((data[`box-${classKey}`]) ? data[`box-${classKey}`].tagList : []);
    const [divCounter, setDivCounter] = useState((data[`box-${classKey}`]) ? data[`box-${classKey}`].divCounter : 0);
    const [pCounter, setPCounter] = useState((data[`box-${classKey}`]) ? data[`box-${classKey}`].pCounter : 0);
    const [linkCounter, setLinkCounter] = useState((data[`box-${classKey}`]) ? data[`box-${classKey}`].linkCounter : 0);
    const [imgCounter, setImgCounter] = useState((data[`box-${classKey}`]) ? data[`box-${classKey}`].imgCounter : 0);
    const [videoCounter, setVideoCounter] = useState((data[`box-${classKey}`]) ? data[`box-${classKey}`].videoCounter : 0);
    const [contentDirection, setContentDirection] = useState((data[`box-${classKey}`]) ? data[`box-${classKey}`].contentDirection : 'row');
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
    const mongoDBId = useSelector(({mongoDBId}) => {
        if(localStorage.getItem('key')){
            return localStorage.getItem('key');
        } else {
            return mongoDBId;
        }
    }, shallowEqual);
    const change = useSelector(({projectChangedData}) => projectChangedData, shallowEqual);

    const changeStyle = (value) => dispatch(createChangeStyle(value));
    const updateProjectData = (value) => dispatch(createChooseTemplateChanges(value));
    const changeMongoDBId = (value) => dispatch(createMongoDBId(value));

    useEffect(() => {
        counter && setStyles(activeStyle);
        counter = !counter;
    },[activeStyle]);

    updateProjectData({[`box-${classKey}`]:{styles,tagList,divCounter,pCounter,linkCounter,imgCounter,videoCounter,contentDirection,key:`box-${classKey}`}});

    const handleClick = () => {
        setShowTagsPanel(!showTagsPanel);
    };

    const handleChangeDirection = ({target}) => {
        if(target.id === 'row'){
            setContentDirection('row');
        } else {
            setContentDirection('column');
        }
    };

    const addTag = (value) => {
        if(value === 'div' && divCount !== 0){

        } else {
            if(value === 'div') setDivCounter(divCounter+1);
            if(value === 'p') setPCounter(pCounter+1);
            if(value === 'link') setLinkCounter(linkCounter+1);
            if(value === 'img') setImgCounter(imgCounter+1);
            if(value === 'video') setVideoCounter(videoCounter+1);
            setShowTagsPanel(!showTagsPanel);
            const newTagList = tagList.slice();
            newTagList.push(value);
            setTagList(newTagList);
        }
    };

    const sendProjectData = async () => {
        console.log(change);
        if(mongoDBId){
            const response = await fetch(`http://localhost:5000/projectData/${mongoDBId}`,{
                method:'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(change),
            });
            const result = await response.json();
        } else {
            const response = await fetch('http://localhost:5000/projectData',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(change),
            });
            const result = await response.json();
            localStorage.setItem('key',`${result.result._id}`); // Айдишник стилей в монго
            changeMongoDBId(localStorage.getItem('key'));
        }
    };

    const deleteItem = async (value,tag,dataKey) => {
        await updateProjectData({[dataKey]: ''});
        if(tag === 'div') setDivCounter(divCounter-1);
        if(tag === 'p') setPCounter(pCounter-1);
        if(tag === 'link') setLinkCounter(linkCounter-1);
        if(tag === 'img') setImgCounter(imgCounter-1);
        if(tag === 'video') setVideoCounter(videoCounter-1);
        const newTagList = tagList.slice();
        await newTagList.splice(value, 1);
        await setTagList(newTagList);
        await sendProjectData();
    };

    const chooseTag = (e) => {
        e.stopPropagation();
        for(let key in styles){
            if(key === e.target.tagName.toLowerCase()){
                changeStyle(Object.assign(styles[key], {tag: key}));
            }
        }
    };

    const deleteBox = () => {
        deleteI(deleteKey,'div',`box-${classKey}`);
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
        <div onMouseOver={modalBcOver} onMouseOut={modalBcOut} onClick={(divCount === 0) ? () => {} : chooseTag} className={`tags-constructor ${divCount !== 0 && 'tags-constructor-border'} ${contentDirection === 'column' && 'tags-constructor-column'}`} style={(divCount === 0) ? null : {marginTop:`${styles.div.marginTop}%`, marginBottom:`${styles.div.marginBottom}%`,marginLeft:`${styles.div.marginLeft}%`, backgroundColor: styles.div.bc, width: `${styles.div.width}%`, borderRadius: `${styles.div.br}px`}}>
            {showTagsPanel && <TagsModalList divCount={divCount} addTag={addTag} />}
            {admin && <Button onClick={handleClick} className={`tags-constructor__show-tags ${divCount !== 0 && 'tags-constructor__show-tags-small'}`}>
                <i className="fas fa-plus"> </i>
            </Button>}
            {useMemo(() => tagList.map((i, index) => {
                switch (i) {
                    case 'p':
                        return <P data={data} admin={admin} deleteItem={deleteItem} classKey={classKey+pCounter+index} deleteKey={index} key={index} />;
                    case 'link':
                        return <Linka data={data} admin={admin} deleteItem={deleteItem} classKey={classKey+linkCounter+index} deleteKey={index} key={index} />;
                    case 'img':
                        return <Img data={data} admin={admin} deleteItem={deleteItem} classKey={classKey+imgCounter+index} deleteKey={index} key={index} />;
                    case 'video':
                        return <Video data={data} admin={admin} deleteItem={deleteItem} classKey={classKey+videoCounter+index} deleteKey={index} key={index} />;
                    case 'div':
                        return <TagsConstructor data={data} admin={admin} deleteI={deleteItem} divCount={divCounter+index} deleteKey={index} classKey={classKey+divCounter} key={index} />;
                }
            }),[tagList])}
            {divCount !== 0 && admin && <Button className='tags-constructor__delete' onClick={deleteBox}><i className="fas fa-trash-alt"> </i></Button>}
            {admin &&
            <div className='tags-constructor__button-box'>
                <Button onClick={handleChangeDirection} className='tags-constructor__button-box__i'><i id='row' className="fas fa-ellipsis-h"> </i></Button>
                <Button onClick={handleChangeDirection} className='tags-constructor__button-box__i'><i id='column' className="fas fa-ellipsis-v"> </i></Button>
            </div>
            }
        </div>
    )
};

TagsConstructor.defaultProps = {
    deleteKey: 0,
    deleteI: () => {},
};

export default TagsConstructor;