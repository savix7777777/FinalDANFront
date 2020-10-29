import React, {useState} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {createModalState} from "../../../store/actions/actionCreator";
import ModalPortal from "../../../user/Components/ModalPortal";
import Modal from "../../../user/Components/Modal";


const ChooseTemplateModal = ({chooseTemplate}) => {

    const dispatch = useDispatch();
    const modalState = useSelector(({modalState}) => modalState, shallowEqual);
    const changeModalState = () => dispatch(createModalState());
    const [target, setTarget] = useState();

    const confirmChooseTemplate = (value) => {
        value && confirmChangeTemplate();
        changeModalState();
    };

    const confirmChangeTemplate = () => {
        if(target.parentNode.id === ''){
            chooseTemplate(target.parentNode.parentNode.id);
        } else {
            chooseTemplate(target.parentNode.id);
        }
    };

    const handleChangeTemplate = ({target}) => {
        setTarget(target);
        !modalState && changeModalState();
    };

    return(
        <>
            <div className='choose-template__templates-box'>
                <p>Choose a template</p>
                <div className='choose-template__row'>
                    <div onClick={handleChangeTemplate} id='one' className='choose-template__template-item'>
                        <div className='choose-template__one'> </div>
                    </div>
                    <div className='choose-template__template-item'>
                        <div onClick={handleChangeTemplate} id='twoInRow' className='choose-template__two-inRow-box'>
                            <div className='choose-template__two-inRow'> </div>
                            <div className='choose-template__two-inRow'> </div>
                        </div>
                    </div>
                    <div className='choose-template__template-item'>
                        <div onClick={handleChangeTemplate} id='twoInColumn' className='choose-template__two-inColumn-box'>
                            <div className='choose-template__two-inColumn'> </div>
                            <div className='choose-template__two-inColumn'> </div>
                        </div>
                    </div>
                </div>
                <div className='choose-template__row'>
                    <div className='choose-template__template-item'>
                        <div id='grid' className='choose-template__grid-subBox'>
                            <div className='choose-template__grid-box'>
                                <div onClick={handleChangeTemplate} className='choose-template__grid'> </div>
                                <div onClick={handleChangeTemplate} className='choose-template__grid'> </div>
                            </div>
                            <div className='choose-template__grid-box'>
                                <div onClick={handleChangeTemplate} className='choose-template__grid'> </div>
                                <div onClick={handleChangeTemplate} className='choose-template__grid'> </div>
                            </div>
                        </div>
                    </div>
                    <div onClick={handleChangeTemplate} id='rightContent' className='choose-template__template-item'>
                        <div className='choose-template__right-content-box'>
                            <div className='choose-template__right-content-small'> </div>
                            <div className='choose-template__right-content-small'> </div>
                        </div>
                        <div className='choose-template__right-content-box'>
                            <div className='choose-template__right-content-big'> </div>
                        </div>
                    </div>
                    <div onClick={handleChangeTemplate} id='leftContent' className='choose-template__template-item'>
                        <div className='choose-template__right-content-box'>
                            <div className='choose-template__right-content-big'> </div>
                        </div>
                        <div className='choose-template__right-content-box'>
                            <div className='choose-template__right-content-small'> </div>
                            <div className='choose-template__right-content-small'> </div>
                        </div>
                    </div>
                </div>
            </div>
            {modalState && <ModalPortal><Modal
                text='Are you sure you want to change template ?'
                buttonConfirmText='Confirm'
                buttonCancelText='Cancel'
                func={confirmChooseTemplate}
            /></ModalPortal>}
        </>
    )
};


export default ChooseTemplateModal;