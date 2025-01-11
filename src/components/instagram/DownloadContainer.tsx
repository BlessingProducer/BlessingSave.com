import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../redux/store.ts";
import {resetPostUrlState} from "../../redux/slices/instagramSlice";
import DownloadButton from "../DownloadButton";
import DownloadTitle from "../DownloadTitle";
import {randomFilename} from "../../utils/randomFilename";
import axiosClient from "../../network/axiosClient";
import {apiUrl} from "../../utils/apiUrl";

const handleDownload = async (
    url: string,
    filename: string,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
    try {
        setIsLoading(true);
        const response = await axiosClient.get(`/download/${url}`, {
            responseType: 'blob'
        });

        if (response.status === 200) {
            const blob = new Blob([response.data], { type: response.data.type });

            const downloadUrl = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl);
        } else {
            console.error('Failed to download file:', response.status);
        }
    } catch (error) {
        console.error("Download failed:", error);
    } finally {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }
};

interface DownloadItemProps {
    title: string;
    url: string;
    filename: string;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const DownloadItem: React.FC<DownloadItemProps> = ({title, url, filename, isLoading, setIsLoading}) => (
    <div className="h-full w-full flex justify-between items-center space-x-5">
        <div className={"w-full p-0.5 border-e-2 border-fuchsia-700"}>
            <DownloadTitle title={title} textColor={'text-fuchsia-700'}/>
        </div>
        <DownloadButton
            isLoading={isLoading}
            onClick={async () => await handleDownload(url, filename, setIsLoading)}
            bgColor={'bg-fuchsia-700'}
            hoverBgColor={'hover:bg-fuchsia-950'}/>
    </div>
);

const DownloadContainer: React.FC = () => {
    const data = useSelector((state: RootState) => state.instagram.data);
    const dispatch = useDispatch<AppDispatch>();

    const [isLoadingThumbnail, setIsLoadingThumbnail] = useState<boolean>(false);
    const [isLoadingMusic, setIsLoadingMusic] = useState<boolean>(false);
    const [isLoadingHd, setIsLoadingHd] = useState<boolean>(false);
    const [isLoadingFullHd, setIsLoadingFullHd] = useState<boolean>(false);

    const handleDownloadMore = () => {
        dispatch(resetPostUrlState())
    }

    return (
        <div className={"px-3 py-5 lg:px-36"}>
            {data ? (
                <div
                    className="w-full h-[500px] flex flex-col md:flex-row items-center justify-center md:justify-between md:space-x-32">
                    <div className="w-full h-36 sm:h-48 shadow rounded-lg bg-gray-50 p-2.5">
                        <img
                            src={`${apiUrl}/downloads/${data.thumbnail}`}
                            alt={data.thumbnail}
                            className="w-28 sm:w-40 h-full rounded-lg object-cover"
                        />
                    </div>

                    <div
                        className="w-full shadow rounded-lg bg-gray-50 p-2.5 h-48 flex flex-col items-center space-y-2.5 mt-8 md:mt-0">
                        <DownloadItem
                            title="Thumbnail"
                            url={data.thumbnail}
                            filename={randomFilename("Thumbnail", "jpg")}
                            isLoading={isLoadingThumbnail}
                            setIsLoading={setIsLoadingThumbnail}
                        />
                        <DownloadItem
                            title="Mp3 Music"
                            url={data.music}
                            filename={randomFilename("Mp3", "mp3")}
                            isLoading={isLoadingMusic}
                            setIsLoading={setIsLoadingMusic}
                        />
                        <DownloadItem
                            title="HD Video"
                            url={data.hd}
                            filename={randomFilename("Hd", "mp4")}
                            isLoading={isLoadingHd}
                            setIsLoading={setIsLoadingHd}
                        />
                        <DownloadItem
                            title="Full HD Video"
                            url={data.full_hd}
                            filename={randomFilename("FullHd", "mp4")}
                            isLoading={isLoadingFullHd}
                            setIsLoading={setIsLoadingFullHd}
                        />
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-500">No data available</p>
            )}
            <button
                onClick={handleDownloadMore}
                className={"w-full"}>
                <p
                    className={"h-full bg-gray-100 text-fuchsia-700 rounded-full p-2 flex justify-center items-center shadow-sm hover:bg-fuchsia-900 hover:text-white"}>
                    Download more
                </p>
            </button>
        </div>
    );
};

export default DownloadContainer;
