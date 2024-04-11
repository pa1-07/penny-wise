import React from "react";
import Header from "./Header.js"
import Footer from "./Footer.js"
import "../assets/styles/index.css";

const Layout = (props) => {

    return (
        <>
        <Header></Header>
        <div className="content">{props.children}</div>
        <Footer></Footer>
        
        </>
    )
}

export default Layout