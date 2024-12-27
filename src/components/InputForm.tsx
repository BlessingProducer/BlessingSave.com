import React, {useEffect, useState} from "react";
import {FaPaste} from "react-icons/fa";
import {AiOutlineClear} from "react-icons/ai";
import {MdOutlineFileDownload} from "react-icons/md";
import {MdError} from "react-icons/md";

interface Props {
    title: string;
    instructions: string;
    type: string;
    formPlaceholder: string;
    formPasteButtonTitle: string;
    formClearButtonTitle: string;
    formSubmitButtonTitle: string;
}

const InputForm: React.FC<Props> = ({
                                        title,
                                        instructions,
                                        type,
                                        formPlaceholder,
                                        formPasteButtonTitle,
                                        formClearButtonTitle,
                                        formSubmitButtonTitle,
                                    }) => {

    const [url, setUrl] = useState<string | null>(null);
    const [urlError, setUrlError] = useState<string | null>(null);

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setUrl(text);
        } catch (err) {
            alert("Unable to paste text. Please allow clipboard access.");
        }
    };

    const handleClear = () => {
        setUrl("");
    }

    const handleSubmit = () => {

    }

    return (
        <div className="flex flex-col justify-center items-center bg-rose-400 dark:bg-white py-14">
            <h1 className="text-2xl sm:text-4xl text-white dark:text-gray-800 font-semibold">
                {title}
            </h1>
            <p className="instructions mt-4 text-lg sm:text-2xl text-white dark:text-gray-800">
                {instructions}
            </p>
            <div className={"mt-5 w-full lg:w-1/2 px-3 flex flex-col sm:flex-row justify-center items-start"}>
                <div className="flex rounded-lg w-full">
                    <div className={"w-full"}>
                        <div className="w-full flex justify-center items-center">
                            <input type="url"
                                   className="rounded-s-lg w-full py-2.5 text-sm text-rose-500 placeholder:text-rose-500 bg-gray-50 border-none focus:ring-0 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                   placeholder={formPlaceholder}
                                   required
                                   value={url ? url : ""}
                                   onChange={(e) => {
                                       setUrl(e.target.value)
                                   }}/>
                            <button type="button"
                                    onClick={url ? handleClear : handlePaste}
                                    className="flex items-center justify-center top-0 end-0 py-2.5 w-32 h-full text-sm font-medium text-white bg-pink-950 hover:bg-pink-900 rounded-e-lg dark:bg-gray-800 dark:hover:bg-blue-700">
                                {url ? <AiOutlineClear className={"w-5 h-5"}/>
                                    : <FaPaste className={"w-4 h-4"}/>}
                                <span
                                    className="w-auto ms-1.5">{url ? formClearButtonTitle : formPasteButtonTitle}</span>
                            </button>
                        </div>
                        {
                            urlError && <div className={"w-auto flex items-center"}>
                                <MdError className={"w-4.5 h-4.5 text-white me-0.5"}/>
                                <p className="text-sm text-white font-semibold italic">{urlError}</p>
                            </div>
                        }
                    </div>
                </div>
                <button type="button"
                        className="mt-2.5 sm:ms-2 sm:mt-0 py-2.5 w-full sm:w-48  flex items-center justify-center text-white bg-pink-950 hover:bg-pink-900 font-medium rounded-lg text-sm dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
                        onClick={handleSubmit}>
                    <MdOutlineFileDownload className={"w-5 h-5 me-1"}/>
                    {formSubmitButtonTitle}
                </button>
            </div>
        </div>
    )
}

export default InputForm;
