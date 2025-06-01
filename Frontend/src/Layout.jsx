import React from "react";
import Footer from "./componenets/Footer/Footer";
import Header from "./componenets/Header/Header";
import { Outlet } from "react-router-dom";

function Layout(){
    return(
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default Layout