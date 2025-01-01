import React from 'react';
import {Provider} from "react-redux";
import store from "./redux/store";
import Container from "./Container";

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
