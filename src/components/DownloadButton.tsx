import React from "react";
import {MdOutlineFileDownload} from "react-icons/md";
import Loading from "./Loading";

interface Props {
    isLoading: boolean;
    onClick: () => void;
    bgColor: string;
    hoverBgColor: string;
}

const DownloadButton: React.FC<Props> = ({isLoading, onClick, bgColor, hoverBgColor}) => {
    return (
        <button
            className={`w-24 p-2 text-white flex justify-center shadow-sm ${bgColor && hoverBgColor ? bgColor + ' ' + hoverBgColor : 'bg-rose-500 hover:bg-pink-900'} rounded-lg dark:bg-gray-800 dark:hover:bg-blue-700`}
            onClick={onClick}
            disabled={isLoading}
        >
            {isLoading ? <Loading/> : <MdOutlineFileDownload className={"w-5 h-5 me-1"}/>}
        </button>
    )
}

export default DownloadButton;
