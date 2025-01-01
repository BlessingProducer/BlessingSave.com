import React from "react";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../redux/store.ts";
import {resetPostUrlState} from "../redux/slices/tiktokSlice";

const randomFileName = (quantity: string, extension: string): string => {
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    return `BlessingSave-${quantity}-${randomNumber}.${extension}`;
};

const DownloadContainer: React.FC = () => {
    const data = useSelector((state: RootState) => state.tiktok.data);
    const dispatch = useDispatch<AppDispatch>();

    const handleDownloadMore = () => {
        dispatch(resetPostUrlState())
    }

    const handleDownload = async (url: string, filename: string) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = blobUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error("Download failed:", error);
        }
    };

    return (
        <div className={"px-3 lg:px-24"}>
            {data ? (
                <div
                    className="w-full h-[500px] flex flex-col lg:flex-row items-center justify-center lg:justify-between lg:space-x-32">
                    <div className="w-full h-48 shadow rounded-lg bg-gray-50 p-2.5">
                        <img
                            src={data.thumbnail}
                            alt={data.thumbnail}
                            className="w-40 h-full rounded-lg object-cover"
                        />
                    </div>
                    <div className="w-full flex flex-col items-end h-48 mt-8 lg:mt-0 justify-between">
                        <button
                            className="w-full lg:w-1/2 p-2.5 text-sm font-medium text-white shadow-sm bg-rose-500 hover:bg-pink-900 rounded-lg dark:bg-gray-800 dark:hover:bg-blue-700"
                            onClick={() => handleDownload(data.gif, randomFileName("Gif", "gif"))}
                        >
                            Download Gif
                        </button>
                        <button
                            className="w-full lg:w-1/2 p-2.5 text-sm font-medium text-white shadow-sm bg-rose-500 hover:bg-pink-900 rounded-lg dark:bg-gray-800 dark:hover:bg-blue-700"
                            onClick={() => handleDownload(data.WVGA, randomFileName("480p", "mp4"))}
                        >
                            Download Video 480p
                        </button>
                        <button
                            className="w-full lg:w-1/2 p-2.5 text-sm font-medium text-white shadow-sm bg-rose-500 hover:bg-pink-900 rounded-lg dark:bg-gray-800 dark:hover:bg-blue-700"
                            onClick={() => handleDownload(data.DVGA, randomFileName("720p", "mp4"))}
                        >
                            Download Video 720p
                        </button>
                        <button
                            className="w-full lg:w-1/2 p-2.5 text-sm font-medium text-white shadow-sm bg-rose-500 hover:bg-pink-900 rounded-lg dark:bg-gray-800 dark:hover:bg-blue-700"
                            onClick={() => handleDownload(data.HD, randomFileName("1080p", "mp4"))}
                        >
                            Download Video 1080p
                        </button>
                    </div>
                </div>
            ) : (
                <div></div>
            )}
            <button
                onClick={handleDownloadMore}
                className={"w-full"}>
                <p
                    className={"h-full bg-gray-100 text-rose-500 rounded-full p-2 flex justify-center items-center shadow-sm hover:bg-rose-500 hover:text-white"}>
                    Download more
                </p>
            </button>
        </div>
    );
};

export default DownloadContainer;
