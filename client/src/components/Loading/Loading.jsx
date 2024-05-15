import React from "react";

const Loading = () => {
    return (
        <div className="flex justify-center items-center gap-2 my-2">
            <div className="animate-spin border-4 w-7 h-7 rounded-full border-e-0 border-s-0 border-blue-500"></div>
            <div className=" text-xl">
                Loading<span className="animate-pulse font-extrabold">...</span>
            </div>
        </div>
    );
};

export default Loading;
