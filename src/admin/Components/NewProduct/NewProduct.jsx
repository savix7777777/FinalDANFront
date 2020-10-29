import React, {useState} from "react";
import Button from "../../../user/Components/Button";


const NewProduct = ({updateData}) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [src, setSrc] = useState('');
    const [errorState, setErrorState] = useState(false);

    const changeTitle = ({target}) => {
        setTitle(target.value);
    };

    const changeDescription = ({target}) => {
        setDescription(target.value);
    };

    const changePrice = ({target}) => {
        setPrice(target.value)
    };

    const handleChangeImg = ({target}) => {
        setSrc(target.value);
    };

    const sendNewProduct = () => {
        if(title !== '' && description !== '' && price !== ''){
            setErrorState(false);
            updateData({title,description,price,src})
        } else {
            setErrorState(true);
        }
    };

    return(
        <div className='new-product'>
            <div className='new-post__input-box'>
                <p>Enter Title:</p>
                <textarea cols="29" rows="2" className='new-post__h' onChange={changeTitle}/>
            </div>
            {errorState && <p className='new-post__error-text'>Empty!</p>}
            <div className='new-post__input-box'>
                <p>Enter description:</p>
                <textarea cols="29" rows="5" className='new-post__p' onChange={changeDescription}/>
            </div>
            {errorState && <p className='new-post__error-text'>Empty!</p>}
            <div className='new-post__input-box'>
                <p>Enter price:</p>
                <textarea cols="29" rows="2" className='new-post__p' onChange={changePrice}/>
            </div>
            {errorState && <p className='new-post__error-text'>Empty!</p>}
            <div className='new-post__input-box'>
                <div>File:<input className='img__input' onChange={handleChangeImg} type='file' accept='image/*'/></div>
                <div>Link:<input className='img__input' onChange={handleChangeImg} placeholder='Link to img'/></div>
            </div>
            <Button className='new-post__post' onClick={sendNewProduct}>Post product</Button>
        </div>
    )
};


export default NewProduct;