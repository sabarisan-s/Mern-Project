import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import Loading from "../components/Loading/Loading";

const Login = () => {
    const { login, setLogin, handleLogin, errorMsg, isLoading } =
        useContext(Context);
    return (
        <>
            <div className="my-16 border shadow-lg px-5 py-3 sm:w-1/2 sm:mx-auto mx-5">
                <div className="text-2xl lg:text-4xl font-bold text-center">
                    Login
                </div>

                <div className=" flex flex-col sm:flex-row sm:items-center sm:justify-center my-3 ">
                    <label
                        htmlFor="email"
                        className="mx-1 font-semibold sm:text-lg"
                    >
                        Email
                    </label>
                    <input
                        type="text"
                        name="email"
                        className="mx-1 w-full pl-5 border py-1 outline-slate-300 "
                        placeholder="Enter your email"
                        value={login.email}
                        onChange={(e) =>
                            setLogin({ ...login, email: e.target.value })
                        }
                    />
                </div>

                <div className=" flex flex-col sm:flex-row sm:items-center sm:justify-center my-3 ">
                    <label
                        htmlFor="password"
                        className="mx-1 font-semibold sm:text-lg"
                    >
                        Password
                    </label>
                    <input
                        type="text"
                        name="password"
                        className="mx-1 w-full pl-5 border py-1 outline-slate-300 "
                        placeholder="Enter your password"
                        value={login.password}
                        onChange={(e) =>
                            setLogin({ ...login, password: e.target.value })
                        }
                    />
                </div>

                {errorMsg && <div className="text-red-500">{errorMsg}</div>}
                {isLoading ? (
                    <Loading />
                ) : (
                    <div className="flex items-center justify-center mb-2">
                        <button
                            onClick={handleLogin}
                            className="border px-5 py-1 rounded-lg cursor-pointer bg-slate-500 font-normal hover:bg-slate-400"
                        >
                            Login
                        </button>
                    </div>
                )}
                <div className="text-center">
                    New member{" "}
                    <Link
                        className="text-slate-500 font-bold cursor-pointer"
                        to={"/register"}
                    >
                        SignUp
                    </Link>{" "}
                    here!
                </div>
            </div>
        </>
    );
};

export default Login;
