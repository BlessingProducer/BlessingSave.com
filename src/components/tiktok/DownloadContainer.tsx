import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../redux/store.ts";
import {resetPostUrlState} from "../../redux/slices/tiktokSlice";
import DownloadButton from "../DownloadButton";
import DownloadTitle from "../DownloadTitle";
import {randomFilename} from "../../utils/randomFilename";

const handleDownload = async (
    url: string,
    filename: string,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
    try {
        setIsLoading(true);
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
        <div className={"w-full p-0.5 border-e-2 border-rose-300"}>
            <DownloadTitle title={title} textColor={''}/>
        </div>
        <DownloadButton
            isLoading={isLoading}
            onClick={async () => await handleDownload(url, filename, setIsLoading)}
            bgColor={''}
            hoverBgColor={''}/>
    </div>
);

const DownloadContainer: React.FC = () => {
    const data = useSelector((state: RootState) => state.tiktok.data);
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
                            src={data.thumbnail}
                            alt={data.thumbnail}
                            className="w-28 sm:w-40 h-full rounded-lg object-cover"
                        />
                    </div>

                    <div
                        className="w-full shadow rounded-lg bg-gray-50 p-2.5 h-48 flex flex-col items-center space-y-2.5 mt-8 md:mt-0">
                        {
                            data.thumbnail && <DownloadItem
                                title="Thumbnail"
                                url={data.thumbnail}
                                filename={randomFilename("Thumbnail", "jpg")}
                                isLoading={isLoadingThumbnail}
                                setIsLoading={setIsLoadingThumbnail}
                            />
                        }
                        {
                            data.music && <DownloadItem
                                title="Mp3 Music"
                                url={data.music}
                                filename={randomFilename("Mp3", "mp3")}
                                isLoading={isLoadingMusic}
                                setIsLoading={setIsLoadingMusic}
                            />
                        }
                        {
                            data.hd && <DownloadItem
                                title="HD Video"
                                url={data.hd}
                                filename={randomFilename("Hd", "mp4")}
                                isLoading={isLoadingHd}
                                setIsLoading={setIsLoadingHd}
                            />
                        }
                        {
                            data.full_hd && <DownloadItem
                                title="Full HD Video"
                                url={data.full_hd}
                                filename={randomFilename("FullHd", "mp4")}
                                isLoading={isLoadingFullHd}
                                setIsLoading={setIsLoadingFullHd}
                            />
                        }
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-500">No data available</p>
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
