import React, { useContext } from "react";
import PostLayout from "../components/PostLayout/PostLayout";
import { Context } from "../context/Context";

const Home = () => {
    const { postData } = useContext(Context);
    return (
        <main className="lg:w-9/12 mx-auto">
            <div className="grid grid-cols-1 my-16 gap-10 px-5 sm:px-10">
                {postData.length>0 ? (
                    postData.map((item) => ( 
                        <PostLayout postData={item} key={item._id} />
                    ))
                ) : (
                    <p className="text-center text-4xl">No post...</p>
                )}
            </div>
        </main>
    );
};

export default Home;
