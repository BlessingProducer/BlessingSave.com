import React from 'react'
import InputForm from "./components/tiktok/InputForm";
import {useSelector} from "react-redux";
import type {RootState} from "./redux/store.ts";
import DownloadContainer from "./components/tiktok/DownloadContainer";

interface Props {
    lang:string;
    formTitle: string;
    formDescription: string;
    formPlaceholder: string;
    formPasteButtonTitle: string;
    formClearButtonTitle: string;
    formSubmitButtonTitle: string;
}

const Container: React.FC<Props> = ({
                                        lang,
                                        formTitle,
                                        formDescription,
                                        formPlaceholder,
                                        formPasteButtonTitle,
                                        formClearButtonTitle,
                                        formSubmitButtonTitle,
                                    }) => {
    const data = useSelector((state: RootState) => state.tiktok.data);
    return (
        <div>
            {
                data ? <DownloadContainer/>
                    : <InputForm
                        lang={lang}
                        title={formTitle}
                        instructions={formDescription}
                        formPlaceholder={formPlaceholder}
                        formPasteButtonTitle={formPasteButtonTitle}
                        formClearButtonTitle={formClearButtonTitle}
                        formSubmitButtonTitle={formSubmitButtonTitle}/>
            }
        </div>
    )
}

export default Container;
