import React, {useState} from "react";
import Button from "../../../user/Components/Button";
import Style from "../../Components/Styles";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {createStylePanelState,createMongoDBId} from "../../../store/actions/actionCreator";
import {NavLink} from "react-router-dom";


const ControlPanel = ({children}) => {

    const dispatch = useDispatch();
    const [animationState, setAnimationState] = useState(false);
    const panelHide = useSelector(({stylePanelState}) => stylePanelState, shallowEqual);
    const change = useSelector(({projectChangedData}) => projectChangedData, shallowEqual);
    const mongoDBId = useSelector(({mongoDBId}) => {
        if(localStorage.getItem('key')){
            return localStorage.getItem('key');
        } else {
            return mongoDBId;
        }
    }, shallowEqual);

    const changeStylePanelState = () => dispatch(createStylePanelState());
    const changeMongoDBId = (value) => dispatch(createMongoDBId(value));

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

    const animationButton = () => {
        setAnimationState(true);
        setTimeout(() => setAnimationState(false),1500);
    };

    const updateProjectData = async () => {
        animationButton();
        const date = getDate();
        let response  = await fetch(`https://finaldan.herokuapp.com/${localStorage.getItem('userId')}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': localStorage.getItem('accessToken'),
                'projectID': mongoDBId,
            },
            body: JSON.stringify({date: date})
        });
        let result = await response.json();
        if(mongoDBId){
            const response = await fetch(`https://finaldan.herokuapp.com/projectData/${mongoDBId}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(change),
            });
            const result = await response.json();
        } else {
            const response = await fetch('https://finaldan.herokuapp.com/projectData',{
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

    return(
        <>
            <div className={`control-panel ${!panelHide && 'control-panel-hide'}`}>
                <Button className='control-panel__button' onClick={changeStylePanelState}>
                    {panelHide && <i className="fas fa-bars"> </i>}
                </Button>
                {panelHide && <div className='control-panel__save-changes-box'>
                    <Button onClick={updateProjectData} className='control-panel__save-changes'>
                        {!animationState && 'Save changes'}
                        {animationState && <i className="fas fa-check control-panel__mark"></i>}
                    </Button>
                </div>}
                {panelHide && <NavLink className='control-panel__return' to={'/'}><i className="fas fa-home"></i></NavLink>}
                {panelHide && <Style />}
            </div>
            {!panelHide &&
            <Button className='control-panel__hideButton' onClick={changeStylePanelState}>
                <i className="fas fa-bars"> </i>
            </Button>}
            {children}
        </>
    )
};


export default ControlPanel;