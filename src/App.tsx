import React from 'react';
import InputForm from "./components/InputForm.tsx";
import {Provider} from "react-redux";
import store from "./redux/store.ts";
import Container from "./Container.tsx";

interface Props {
    formTitle: string;
    formDescription: string;
    formType: string;
    formPlaceholder: string;
    formPasteButtonTitle: string;
    formClearButtonTitle: string;
    formSubmitButtonTitle: string;
}

const App: React.FC<Props> = ({
                                  formTitle,
                                  formDescription,
                                  formType,
                                  formPlaceholder,
                                  formPasteButtonTitle,
                                  formClearButtonTitle,
                                  formSubmitButtonTitle,
                              }) => {
    return (
        <Provider store={store}>
            <div
                className="w-full overflow-hidden">
                <Container
                    formTitle={formTitle}
                    formDescription={formDescription}
                    formType={formType}
                    formPlaceholder={formPlaceholder}
                    formPasteButtonTitle={formPasteButtonTitle}
                    formClearButtonTitle={formClearButtonTitle}
                    formSubmitButtonTitle={formSubmitButtonTitle}/>
            </div>
        </Provider>
    );
};

export default App;
