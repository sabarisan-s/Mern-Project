import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../context/Context";
import Loading from "../components/Loading/Loading";

const UpdatePost = () => {
    const [post, setPost] = useState({
        title: "",
        description: "",
    });
    const { getPostData,isLoading,setIsLoading } = useContext(Context);
    const [photo, setPhoto] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getPostDataById();
    }, []);

    const getPostDataById = async () => {
        const { data } = await axiosInstance.get(`/post/${id}`);
        if (data.post) {
            setPost({
                title: data.post.title,
                description: data.post.description,
            });
        }
    };

    const handlePost = async () => {
        try {
            setIsLoading(true)
            const { data } = await axiosInstance.put(
                `/post/${id}`,
                {
                    ...post,
                    photo: photo ? photo[0] : null,
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            if (data.message) {
                toast.success(data?.message);
                getPostData();
                navigate("/");
            }
        } catch (error) {
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
   
            }
        }finally{
            setIsLoading(false)
        }
    };

    return (
        <div className="mx-auto w-10/12 lg:w-1/2">
            <div className=" flex flex-col sm:flex-row sm:items-center sm:justify-center my-3 ">
                <label
                    htmlFor="title"
                    className="mx-1 font-semibold sm:text-lg"
                >
                    Title
                </label>
                <input
                    type="text"
                    name="title"
                    className="mx-1 w-full pl-5 border py-1 outline-slate-300 "
                    placeholder="Enter your title"
                    value={post.title}
                    onChange={(e) =>
                        setPost({ ...post, title: e.target.value })
                    }
                />
            </div>

            <div className=" flex flex-col sm:flex-row sm:items-center sm:justify-center my-3 ">
                <textarea
                    className="resize-none w-full block mx-1 px-5 border py-1 h-52 outline-slate-300 placeholder:text-slate-700 font-normal font-serif tracking-wider"
                    name="description"
                    placeholder="Enter your description"
                    value={post.description}
                    onChange={(e) =>
                        setPost({ ...post, description: e.target.value })
                    }
                ></textarea>
            </div>

            <div className=" flex flex-col sm:flex-row sm:items-center sm:justify-center my-3 ">
                <input
                    type="file"
                    name="photo"
                    className="mx-1 w-full"
                    onChange={(e) => setPhoto(e.target.files)}
                />
            </div>
            {isLoading?<Loading/>:
            
            <div className="flex justify-center items-center">
                <button
                    className=" bg-slate-600 px-5 py-1 rounded-lg cursor-pointer hover:bg-slate-500"
                    onClick={handlePost}
                >
                    Update now!
                </button>
            </div>
            }
        </div>
    );
};

export default UpdatePost;
