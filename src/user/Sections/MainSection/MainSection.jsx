import React from "react";
import Header from "../Header";
import Footer from "../Footer";


const MainSection = ({children,admin,path,data}) => {
    return(
        <section className='main-section'>
            <Header data={data} admin={admin} path={path} />
            {children}
            <Footer data={data} admin={admin}/>
        </section>
    )
};


export default MainSection;