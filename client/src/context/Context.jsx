import React, { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../../axiosInstance";

export const Context = createContext({});

const ContextProvider = ({ children }) => {
    const [errorMsg, setErrorMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getUserData();
        getPostData();
    }, []);

    //user signUp
    const [signUp, setSignUp] = useState({
        userName: "",
        phone: "",
        email: "",
        password: "",
    });

    const handleSignUp = async () => {
        try {
            setIsLoading(true);
            const { data } = await axiosInstance.post("/register", signUp);

            if (data.message) {
                toast.success(data.message);
            }
            if (data.token) {
                localStorage.setItem("token", data.token);
            }
            navigate("/");
            setSignUp({
                userName: "",
                phone: "",
                email: "",
                password: "",
            });
            getUserData();
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                setErrorMsg(error.response.data.message);
                console.log(error.response.data.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    //user login
    const [login, setLogin] = useState({
        email: "",
        password: "",
    });

    const handleLogin = async () => {
        try {
            setIsLoading(true);
            const { data } = await axiosInstance.post("/login", login);
            if (data.token) {
                localStorage.setItem("token", data.token);
                navigate("/");
                toast.success(data.message);
                setLogin({
                    email: "",
                    password: "",
                });
                getUserData();
            }
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                setErrorMsg(error.response.data.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    //get user data
    const [userData, setUserData] = useState(null);

    const getUserData = async () => {
        axiosInstance.get("/user").then(({ data }) => setUserData(data.user));
    };

    //user logout
    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
        setUserData(null);
    };

    //postTitle data get
    const [postData, setPostData] = useState([]);

    const getPostData = async () => {
        try {
            const { data } = await axiosInstance.get("/post");
            setPostData(data.post);
        } catch (error) {
            if (error.response.data.message) {
                console.log(error.response.data.message);
            }
        }
    };

    const contextValue = {
        signUp,
        setSignUp,
        errorMsg,
        handleSignUp,
        login,
        setLogin,
        handleLogin,
        isLoading,
        navigate,
        handleLogout,
        userData,
        postData,
    };

    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;
