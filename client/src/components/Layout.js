import React from "react";
import Header from "./Header.js"
import Footer from "./Footer.js"

const Layout = (children) => {

    return (
        <>
        <Header></Header>
        <div className="Layout">{children}</div>
        <Footer></Footer>
        </>
    )
}

export default Layout