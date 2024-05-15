import React from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
const Layout = () => {
    return (
        <>
            <Header />
            <Toaster toastOptions={{ duration: 2000, position: "top-left" }} />
            <Outlet />
        </>
    );
};

export default Layout;
