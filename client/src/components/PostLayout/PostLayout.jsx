import React from "react";
import { Link } from "react-router-dom";

const PostLayout = ({ postData }) => {
    return (
        <div className="border flex flex-col  sm:flex-row border-slate-300 shadow-lg shadow-slate-300 p-5 sm:justify-center sm:items-center gap-3">
            <div className=" sm:w-52 w-full h-52 sm:flex-grow  hover:scale-95 transition-all duration-100 ease-linear">
                <Link className="cursor-pointer" to={`/post/${postData._id}`}>
                    <img
                        src={`http://localhost:8000/uploads/${postData.photo}`}
                        alt=""
                        className=" w-full h-full object-cover"
                    />
                </Link>
            </div>
            <div className="sm:flex-grow sm:w-52 w-full h-52  flex flex-col  overflow-scroll ">
                <Link className="cursor-pointer" to={`/post/${postData._id}`}>
                    <div className="font-serif font-bold text-2xl sm:text-4xl capitalize">
                        {postData.title}
                    </div>
                </Link>

                <div className=" text-slate-600 ">
                    {" "}
                    <span className="">@{postData.author.userName}</span>{" "}
                    <span className="">{postData.updatedAt.split("T")[0]}</span>
                </div>
                <div className="text-black font-normal text-ellipsis text-lg sm:text-xl lg:text-2xl ">
                    {postData.description.slice(0, 150)}
                    <Link
                        className="cursor-pointer text-slate-500 font-bold"
                        to={`/post/${postData._id}`}
                    >
                        {" "}
                        more <span className="animate-pulse">...</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PostLayout;
