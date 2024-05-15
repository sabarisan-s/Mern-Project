import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

const Header = () => {
    const { userData, handleLogout } = useContext(Context);
    return (
        <>
            <header className=" bg-slate-200 ">
                <div className="lg:w-9/12 mx-auto flex items-center justify-between px-5 py-3 sm:px-7">
                    <Link className="font-bold" to={"/"}>
                        Write
                    </Link>
                    <nav className="flex items-center justify-center gap-2">
                        {userData ? (
                            <>
                                <div className="hidden font-semibold rounded-full sm:flex justify-center items-center w-10 h-10  bg-slate-400 uppercase ">
                                    {userData.userName.split("")[1]}
                                </div>
                                <Link to={"/create"}>Create post</Link>
                                <a onClick={handleLogout}>LogOut</a>
                            </>
                        ) : (
                            <>
                                <Link to={"/login"}>Login</Link>
                                <Link to={"/register"}>Register</Link>
                            </>
                        )}
                    </nav>
                </div>
            </header>
        </>
    );
};

export default Header;
