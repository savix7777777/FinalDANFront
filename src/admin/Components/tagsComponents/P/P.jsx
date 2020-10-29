import React, {useEffect, useState} from "react";
import Button from "../../../../user/Components/Button";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {createChooseTemplateChanges, createChangeStyle} from "../../../../store/actions/actionCreator";

let counter = true;

const P = ({classKey, admin, deleteKey, deleteItem, data}) => {

    const dispatch = useDispatch();
    const [editState, setEditState] = useState(false);
    const [styles, setStyles] = useState((data[`p-${classKey}`]) ? data[`p-${classKey}`].styles : {p:{bc: '#ffffff', fontSize:'25', width: '10', color: '#000000', marginTop:'0',marginBottom:'0',marginLeft:'0', className:`p-${classKey}`}});
    const [memoryBc, setMemoryBc] = useState();
    const [memoryColor, setMemoryColor] = useState();
    const [text, setText] = useState((data[`p-${classKey}`]) ? data[`p-${classKey}`].text : 'Text');
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

    updateProjectData({[`p-${classKey}`]: {styles,text,key:`p-${classKey}`}});

    const chooseTag = (e) => {
        for(let key in styles){
            if(key === e.target.tagName.toLowerCase()){
                changeStyle(Object.assign(styles[key], {tag: key}));
            }
        }
    };

    const edit = () => {
        setEditState(!editState);
    };

    const deleteP = () => {
        deleteItem(deleteKey,'p',[`p-${classKey}`]);
    };

    const handleChange = ({target}) => {
        setText(target.value);
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
            <p onMouseOver={modalBcOver} onMouseOut={modalBcOut} style={{marginTop:`${styles.p.marginTop}%`,marginBottom:`${styles.p.marginBottom}%`,marginLeft:`${styles.p.marginLeft}%`, backgroundColor: styles.p.bc, fontSize:`${styles.p.fontSize}px`, width: `${styles.p.width}%`, color:styles.p.color}} onClick={chooseTag} className='p'>
                {editState && <input onChange={handleChange} value={text}/>}
                {!editState && text}{admin &&
                <>
                    <Button className='p-delete' onClick={deleteP}><i className="fas fa-trash-alt"> </i></Button>
                    <Button className='p-edit' onClick={edit}><i className="fas fa-edit"> </i></Button>
                </>
                }
            </p>
    )
};


export default P;