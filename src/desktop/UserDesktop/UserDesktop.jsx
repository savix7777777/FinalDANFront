import React, {useEffect, useState} from "react";
import Button from "../../user/Components/Button";
import ProjectsList from "../ProjectsList";


const UserDesktop = () => {

    const [userData, setUserData] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:5000/${localStorage.getItem('userId')}`, {
            method: 'GET',
            headers:{
                'x-access-token': localStorage.getItem('accessToken'),
            },
        }).then(response => response.json())
            .then(({result}) => setUserData(result));
    });

    const logOut = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('accessToken');
        window.location.reload();
    };

    return(
        <>{userData && <><header className='desktop__header'>
            <h2 className='desktop__header__user'><p>User:</p> {userData.email}</h2>
            <Button onClick={logOut} className='desktop__header__log-out'>Log out</Button>
            </header>
            <div className='desktop-area'>
                <ProjectsList data={userData} />
            </div>
        </>
        }
        </>
    )
};


export default UserDesktop;