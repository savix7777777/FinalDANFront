import React from "react";


const TagsModalList = ({addTag,divCount}) => {

    const handleClick = ({target}) => {
        if(target.id !== ''){
            addTag(target.id)
        } else if(target.id === ''){
            addTag(target.parentNode.id);
        } else if(target.parentNode.id === ''){
            addTag(target.parentNode.parentNode.id);
        }
    };

    return(
        <div className={`tags-modal ${divCount !== 0 && 'tags-modal-small'}`}>
            <p onClick={handleClick} id='p'><i className="fas fa-angle-left"> </i>P<i className="fas fa-angle-right"> </i></p>
            <p onClick={handleClick} id='link'><i className="fas fa-angle-left"> </i>Link<i className="fas fa-angle-right"> </i></p>
            <p onClick={handleClick} id='img'><i className="fas fa-angle-left"> </i>Img<i className="fas fa-angle-right"> </i></p>
            <p onClick={handleClick} id='video'><i className="fas fa-angle-left"> </i>Video<i className="fas fa-angle-right"> </i></p>
            <p onClick={handleClick} id='div'><i className="fas fa-angle-left"> </i>Box<i className="fas fa-angle-right"> </i></p>
        </div>
    )
};


export default TagsModalList;
