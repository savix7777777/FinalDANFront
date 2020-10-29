import React from "react";


const Switcher = ({onChange,name,activeSections}) => {


    const switcher = () => {
        onChange(name);
    };

    return(
        <label className="switch">
            <input onChange={switcher} type={"checkbox"} checked={activeSections && 'checked'} />
                <span className="slider round"> </span>
        </label>
    )
};


export default Switcher;