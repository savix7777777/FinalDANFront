import React from "react";
import Button from "../../user/Components/Button";
import {NavLink} from "react-router-dom";


const Project = ({projectID,name,lastUpdate}) => {

    const changeProjectKey = () => {
        localStorage.setItem('key',projectID);
    };

    const deleteProject = async () => {
        const response = await fetch(`http://localhost:5000/projectData/${projectID}`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        const responseDataPr = await fetch(`http://localhost:5000/deletePr/${localStorage.getItem('userId')}`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': localStorage.getItem('accessToken'),
            },
            body: JSON.stringify({projectID}),
        });
        const resDataPr = await responseDataPr.json();
        window.location.reload();
    };

    return(
        <div className='project'>
            <h3 className='project__h3'><i className="fas fa-angle-left"></i>{name} <p className='project__slash'>/</p><i className="fas fa-angle-right"></i></h3>
            <div className='project__date-box'>
                <p>Last update: {lastUpdate}</p>
            </div>
            <div className='project__button-box'>
                <NavLink className='project__edit' onClick={changeProjectKey} to={`/admin/${projectID}/home`} ><i className="fas fa-edit"></i></NavLink>
                <Button className='project__delete' onClick={deleteProject}><i className="fas fa-trash-alt"></i></Button>
            </div>
        </div>
    )
};


export default Project;