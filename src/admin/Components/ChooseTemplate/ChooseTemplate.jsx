import React, {useState} from "react";
import Button from "../../../user/Components/Button";
import ChooseTemplateModal from "../ChooseTemplateModal/ChooseTemplateModal";
import One from "../templatesComponents/One";
import TwoInRow from "../templatesComponents/TwoInRow";
import TwoInColumn from "../templatesComponents/TwoInColumn";
import Grid from "../templatesComponents/Grid";
import RightContent from "../templatesComponents/RightContent";
import LeftContent from "../templatesComponents/LeftContent";
import {useDispatch} from "react-redux";
import {createChooseTemplateChanges} from "../../../store/actions/actionCreator";

const ChooseTemplate = ({admin, section, data}) => {

    const dispatch = useDispatch();
    const [showChoosePanel, setShowChoosePanel] = useState(false);
    const [activeTemplate, setActiveTemplate] = useState((data[`chooseTemplate-${section}`]) ? data[`chooseTemplate-${section}`].activeTemplate :
        {
            one: false,
            twoInRow: false,
            twoInColumn: false,
            grid: false,
            rightContent: false,
            leftContent: false,
        }
    );

    const updateProjectData = (value) => dispatch(createChooseTemplateChanges(value));

    updateProjectData({[`chooseTemplate-${section}`]: {activeTemplate}});

    const chooseTemplate = (value) => {
        if(value !== ''){
            setShowChoosePanel(!showChoosePanel);
            const newActiveTemplate = Object.assign({}, activeTemplate);
            for(let key in newActiveTemplate){
                newActiveTemplate[key] = false;
            }
            newActiveTemplate[value] = true;
            setActiveTemplate(newActiveTemplate);
        }
    };

    const handleClick = () => {
        setShowChoosePanel(!showChoosePanel)
    };

    return(
        <>
            {showChoosePanel && <ChooseTemplateModal chooseTemplate={chooseTemplate} />}
            {admin && <Button onClick={handleClick} className='choose-template__button'>
                <i className="fas fa-plus"> </i>
            </Button>}
            {activeTemplate.one && <One data={data} section={section} admin={admin}/>}
            {activeTemplate.twoInRow && <TwoInRow data={data} section={section} admin={admin}/>}
            {activeTemplate.twoInColumn && <TwoInColumn data={data} section={section} admin={admin}/>}
            {activeTemplate.grid && <Grid data={data} section={section} admin={admin}/>}
            {activeTemplate.rightContent && <RightContent data={data} section={section} admin={admin}/>}
            {activeTemplate.leftContent && <LeftContent data={data} section={section} admin={admin}/>}
        </>
    )
};


export default ChooseTemplate;