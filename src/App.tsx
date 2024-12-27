import React from 'react';
import InputForm from "./components/InputForm.tsx";

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
        <div
            className="w-full overflow-hidden">
            <InputForm
                title={formTitle}
                instructions={formDescription}
                type={formType}
                formPlaceholder={formPlaceholder}
                formPasteButtonTitle={formPasteButtonTitle}
                formClearButtonTitle={formClearButtonTitle}
                formSubmitButtonTitle={formSubmitButtonTitle}/>
        </div>
    );
};

export default App;
