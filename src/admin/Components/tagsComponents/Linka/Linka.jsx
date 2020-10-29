import React, {useEffect, useState} from "react";
import Button from "../../../../user/Components/Button";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {createChooseTemplateChanges, createChangeStyle} from "../../../../store/actions/actionCreator";

let counter = true;

const Linka = ({admin, classKey, deleteKey, deleteItem, data}) => {

    const [editState, setEditState] = useState(false);
    const [linkInfo, setLinkInfo] = useState((data[`link-${classKey}`]) ? data[`link-${classKey}`].linkInfo : {href:`/${(admin) ? 'admin':'user'}/home`, text:'Link'});
    const dispatch = useDispatch();
    const [styles, setStyles] = useState((data[`link-${classKey}`]) ? data[`link-${classKey}`].styles : {div:{bc: '#ffffff', fontSize:'25', width: '15', marginTop:'0',marginBottom:'0',marginLeft:'0', className:`link-${classKey}`}});
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

    const changeStyle = (value) => dispatch(createChangeStyle(value));
    const updateProjectData = (value) => dispatch(createChooseTemplateChanges(value));

    useEffect(() => {
        counter && setStyles(activeStyle);
        counter = !counter;
    },[activeStyle]);

    updateProjectData({[`link-${classKey}`]: {styles,linkInfo,key:`link-${classKey}`}});

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

    const deleteLink = () => {
        deleteItem(deleteKey,'link',[`link-${classKey}`]);
    };

    const handleChangeLink = ({target}) => {
        setLinkInfo({...linkInfo, href: target.value});
    };

    const handleChangeText = ({target}) => {
        setLinkInfo({...linkInfo, text: target.value});
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
        <div onMouseOver={modalBcOver} onMouseOut={modalBcOut} onClick={chooseTag} style={{marginTop:`${styles.div.marginTop}%`, marginBottom:`${styles.div.marginBottom}%`,marginLeft:`${styles.div.marginLeft}%`, backgroundColor: styles.div.bc, fontSize:`${styles.div.fontSize}px`, width: `${styles.div.width}%`}} className='link'>
            {!editState && <a target="_blank" href={linkInfo.href}>{linkInfo.text}</a>}
            {editState &&
                <>
                    <input onChange={handleChangeLink} value={linkInfo.href} placeholder='link'/>
                    <input onChange={handleChangeText} value={linkInfo.text} placeholder='text'/>
                </>
            }
            {admin &&
                <div className='tags-constructor__control-buttons'>
                    <Button className='p-delete' onClick={deleteLink}><i className="fas fa-trash-alt"> </i></Button>
                    <Button className='p-edit' onClick={edit}><i className="fas fa-edit"> </i></Button>
                </div>
            }
        </div>
    )
};


export default Linka;