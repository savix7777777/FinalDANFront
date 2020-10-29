import React, {useEffect, useState} from "react";
import Button from "../../Components/Button";
import Post from "../../../admin/Components/Post";
import NewPost from "../../../admin/Components/NewPost";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {createChooseTemplateChanges, createChangeStyle} from "../../../store/actions/actionCreator";

let counter = true;

const News = ({admin,data}) => {

    const [newPost, setNewPost] = useState(false);
    const [postsList, setPostsList] = useState((data.news) ? data.news.postsList : []);
    const [styleList, setStyleList] = useState((data.news) ? data.news.styleList : {});
    const dispatch = useDispatch();
    const [styles, setStyles] = useState((data.news) ? data.news.styles : {section: {bc: '#ffffff',fontSize:'20', className:'news'}, div:{bc:'#ffffff', width: '40', className: 'news__postsBox'}});
    const [memoryBc, setMemoryBc] = useState();
    const [memoryColor, setMemoryColor] = useState();
    const activeStyle = useSelector((state) => {
        if(styles){
            try{
                if(styles[state.activeStyle.tag].className === state.activeStyle.className){
                    const newStyle = Object.assign({},styles);
                    if(!newStyle.section.bc) newStyle.section.bc = '#ffffff';
                    if(!newStyle.div.bc) newStyle.div.bc = '#ffffff';
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

    updateProjectData({news: {styles,postsList,styleList}});

    const chooseTag = (e) => {
        e.stopPropagation();
        for(let key in styles){
            if(key === e.target.tagName.toLowerCase()){
                changeStyle(Object.assign(styles[key], {tag: key}));
            }
        }
    };

    const returnStyles = (value) => {
        setStyleList(Object.assign(styleList, value));
    };

    const change = () => {
        setNewPost(!newPost);
    };

    const deletePost = (value) => {
        const newPostList = postsList.slice();
        newPostList.splice(value, 1);
        setPostsList(newPostList);
    };

    const addNewPostInfo = (value) => {
        setPostsList(postsList.concat(value));
        change();
    };

    const modalBcOver = (e) => {
        e.stopPropagation();
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
        e.stopPropagation();
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
        <section onMouseOver={modalBcOver} onMouseOut={modalBcOut} onClick={chooseTag} style={{backgroundColor: styles.section.bc, fontSize:`${styles.section.fontSize}px`}} className='news'>
            {admin && <Button className='news__add-post' onClick={change}>
                Add new post
            </Button>}
            {newPost && <NewPost updateData={addNewPostInfo} />}
            {postsList.length !== 0 &&
            <div onMouseOver={modalBcOver} onMouseOut={modalBcOut} onClick={chooseTag} style={{backgroundColor: styles.div.bc, width: `${styles.div.width}%`}} className='news__posts-box'>
                {postsList.map((item, index) => {
                    return(
                        <Post
                            returnStyles={returnStyles}
                            deletePost={deletePost}
                            heading={item.heading}
                            text={item.text}
                            date={item.date}
                            time={item.time}
                            src={item.src}
                            key={index}
                            styleKey={index}
                            admin={admin}
                            style={styleList[`post-${index}`]}
                        />
                    )
                })}
            </div>}
            {postsList.length === 0 && admin && <p className='news__clear-p'>Add your innovations here!</p>}
        </section>
    )
};


export default News;