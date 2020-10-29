import React, {useState} from "react";
import Button from "../../../user/Components/Button";


const NewPost = ({updateData}) => {

    const [h, setH] = useState('');
    const [text, setText] = useState('');
    const [src, setSrc] = useState('');
    const [errorState, setErrorState] = useState(false);

    const changeH = ({target}) => {
        setH(target.value);
    };

    const changeText = ({target}) => {
        setText(target.value);
    };

    const handleChangeImg = ({target}) => {
        setSrc(target.value);
    };

    const sendNewPost = () => {
        if(h !== '' && text !== ''){
            setErrorState(false);
            const getDate = () => {
                const date = new Date();
                if(date.getMonth()+1 < 10){
                    if(date.getDate() < 10){
                        return `0${date.getDate()}.0${date.getMonth()+1}.${date.getFullYear()}`
                    }
                    return `${date.getDate()}.0${date.getMonth()+1}.${date.getFullYear()}`
                }
                return `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
            };

            const getTime = () => {
                const time = new Date();
                if(time.getMinutes() < 10){
                    return `${time.getHours()}:0${time.getMinutes()}`
                }
                return `${time.getHours()}:${time.getMinutes()}`
            };
            updateData({heading:h,text, date:getDate(),time:getTime(),src});
        } else {
            setErrorState(true)
        }
    };


    return(
        <div className='new-post'>
            <div className='new-post__input-box'>
                <p>Enter heading:</p>
                <textarea cols="29" rows="2" className='new-post__h' onChange={changeH}/>
            </div>
            {errorState && <p className='new-post__error-text'>Empty!</p>}
            <div className='new-post__input-box'>
                <p>Enter text:</p>
                <textarea cols="29" rows="5" className='new-post__p' onChange={changeText}/>
            </div>
            {errorState && <p className='new-post__error-text'>Empty!</p>}
            <div className='new-post__input-box'>
                <div>File:<input className='img__input' onChange={handleChangeImg} type='file' accept='image/*'/></div>
                <div>Link:<input className='img__input' onChange={handleChangeImg} placeholder='Link to img'/></div>
            </div>
            <Button className='new-post__post' onClick={sendNewPost}>Post</Button>
        </div>
    )
};


export default NewPost;