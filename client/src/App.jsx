import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Post from "./pages/Post";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import Layout from "./components/Layout/Layout";


const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/post/:id" element={<Post />} />
                <Route path="/create" element={<CreatePost />} />
                <Route path="/update/:id" element={<UpdatePost />} />
            </Route>
        </Routes>
    );
};

export default App;
