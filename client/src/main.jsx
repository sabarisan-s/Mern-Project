import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import ContextProvider from "./context/Context.jsx";
(axios.defaults.baseURL = "https://write-api-3fai.onrender.com"),

    ReactDOM.createRoot(document.getElementById("root")).render(
        <React.StrictMode>
            <BrowserRouter>
                <ContextProvider>
                    <App />
                </ContextProvider>
            </BrowserRouter>
        </React.StrictMode> 
    );
