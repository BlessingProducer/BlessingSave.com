import React from 'react'
import InputForm from "./components/InputForm";
import {useSelector} from "react-redux";
import type {RootState} from "./redux/store.ts";
import DownloadContainer from "./components/DownloadContainer";

interface Props {
    formTitle: string;
    formDescription: string;
    formType: string;
    formPlaceholder: string;
    formPasteButtonTitle: string;
    formClearButtonTitle: string;
    formSubmitButtonTitle: string;
}

const Container: React.FC<Props> = ({
                                        formTitle,
                                        formDescription,
                                        formType,
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
                        title={formTitle}
                        instructions={formDescription}
                        type={formType}
                        formPlaceholder={formPlaceholder}
                        formPasteButtonTitle={formPasteButtonTitle}
                        formClearButtonTitle={formClearButtonTitle}
                        formSubmitButtonTitle={formSubmitButtonTitle}/>
            }
        </div>
    )
}

export default Container;
