import React, {useState} from "react";
import Project from "../ProjectCart";
import Button from "../../user/Components/Button";

const newPrData = {
    header: {
        activeSections: {news: false, aboutUs: false, products: false},
        styles: {header: {bc: '#1D2124', height: '5', className: 'header'}, a: {color: '#ffffff', fontSize: '20', className: 'nav__li'}}
    },
    home: {
        styles: {section: {bc: '#ffffff', className:'home'}},
    },
    [`chooseTemplate-home`]: {
        activeTemplate:{one: false, twoInRow: false, twoInColumn: false, grid: false, rightContent: false, leftContent: false}
    },
    footer:{
        styles: {footer: {bc: '#1D2124', height: '5', className:'footer'}},
    }
}

const ProjectsList = ({data}) => {

    const [projectList, setProjectList] = useState(data.projectsKeyList);
    const [userId, setUserId] = useState(data._id);
    const [newPr, setNewPr] = useState(false);
    const [prName, setPrName] = useState('');
    const [errorText, setErrorText] = useState(false);

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

    const createNewProject = async () => {
        if(!prName){
            setErrorText(true);
        } else {
            setErrorText(false);
            const response = await fetch('https://finaldan.herokuapp.com/projectData',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPrData),
            });
            const result = await response.json();
            const date = getDate();
            const responseDataPr = await fetch(`https://finaldan.herokuapp.com/newPr/${localStorage.getItem('userId')}`,{
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'x-access-token': localStorage.getItem('accessToken'),
                },
                body: JSON.stringify({
                    projectID:result.result._id,
                    name: prName,
                    lastUpdate: date,
                }),
            });
            const resDataPr = await responseDataPr.json();
            window.location.reload();
        }
    }

    return(
        <>
            <h2 className='project-list__h2'>Your Projects</h2>
            {projectList && <div className='project-list'>
                {projectList.map((elem,index) => {
                    return(
                        <Project
                            key={index}
                            user={userId}
                            {...elem}
                        />
                    )
                })}
                <div className='project'>
                    <h3 className='project__h3-new'>Create new project</h3>
                    {!newPr && <Button onClick={() => setNewPr(true)} className='project__add'>+</Button>}
                    {newPr && <input className='project__input' onChange={({target}) => setPrName(target.value)} placeholder='Project Name' name='projectName' value={prName}/>}
                    {errorText && <p className='project__error-text'>Empty!</p>}
                    {newPr && <Button onClick={createNewProject} className='project__create-new'>Create</Button>}
                </div>
            </div>}
        </>
    )
}


export default ProjectsList;