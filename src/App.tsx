import React from 'react';
import {Provider} from "react-redux";
import store from "./redux/store";
import TikTokContainer from "./components/tiktok/Container";
import InstagramContainer from "./components/instagram/Container";

interface Props {
    lang: string;
    type: string;
    formTitle: string;
    formDescription: string;
    formPlaceholder: string;
    formPasteButtonTitle: string;
    formClearButtonTitle: string;
    formSubmitButtonTitle: string;
}

const App: React.FC<Props> = ({
                                  lang,
                                  type,
                                  formTitle,
                                  formDescription,
                                  formPlaceholder,
                                  formPasteButtonTitle,
                                  formClearButtonTitle,
                                  formSubmitButtonTitle,
                              }) => {
    return (
        <Provider store={store}>
            <div
                className="w-full overflow-hidden">
                {type === "ig" ? (
                    <InstagramContainer
                        lang={lang}
                        formTitle={formTitle}
                        formDescription={formDescription}
                        formPlaceholder={formPlaceholder}
                        formPasteButtonTitle={formPasteButtonTitle}
                        formClearButtonTitle={formClearButtonTitle}
                        formSubmitButtonTitle={formSubmitButtonTitle}/>
                ):(
                    <TikTokContainer
                        lang={lang}
                        formTitle={formTitle}
                        formDescription={formDescription}
                        formPlaceholder={formPlaceholder}
                        formPasteButtonTitle={formPasteButtonTitle}
                        formClearButtonTitle={formClearButtonTitle}
                        formSubmitButtonTitle={formSubmitButtonTitle}/>
                )}
            </div>
        </Provider>
    );
};

export default App;
