import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import { FaEdit } from "react-icons/fa";
import { Context } from "../context/Context";

const Post = () => {
    const { userData } = useContext(Context);
    const { id } = useParams();
    const [postById, setPostById] = useState(null);

    useEffect(() => {
        getPostDataById();
    }, []);

    const getPostDataById = async () => {
        const { data } = await axiosInstance.get(`/post/${id}`);

        if (data.post) {
            setPostById(data?.post);
        }
    };
    return (
        <div>
            <div className="border shadow-sm  flex flex-col w-11/12 sm:w-9/12 mx-auto my-10 gap-3 px-5 py-5">
                <div className="flex items-center justify-between flex-grow">
                    <div className="text-center text-2xl w-[90%] font-bold sm:text-4xl my-2 uppercase overflow-clip">
                        {postById?.title}
                    </div>

                    {userData && (
                        <div
                            className={`text-xl sm:text-2xl ${
                                userData?._id == postById?.author._id
                                    ? "block"
                                    : "hidden"
                            }`}
                        >
                            <Link to={`/update/${postById?._id}`}>
                                <FaEdit />
                            </Link>
                        </div>
                    )}
                </div>

                <div className="my-2 flex-grow mx-auto h-56  w-full">
                    <img
                        src={`http://localhost:8000/${postById?.photo}`}
                        alt=""
                        className="h-full w-full object-cover"
                    />
                </div>

                <div className=" text-sm font-normal my-2">
                    <span>{postById?.createdAt.split("T")[0]} </span>
                    <span className="font-bold">
                        @{postById?.author.userName}
                    </span>
                </div>

                <div className="my-2">{postById?.description}</div>
            </div>
        </div>
    );
};

export default Post;
