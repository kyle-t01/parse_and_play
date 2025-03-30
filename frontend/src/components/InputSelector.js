// component where user can choose data input method
import { useState } from "react";
import FileUploader from "./FileUploader";
import InputBox from "./InputBox";
import { GlobalVars } from "../context/GlobalContext";




const InputSelector = () => {
    const { option, setOption } = GlobalVars();
    const { inputOptions } = GlobalVars();
    const [isLoading, setIsLoading] = useState(false);
    // max file size in kb
    const maxFileSize = 300;


    const handleChangeOption = (val) => {
        setOption(val);
    }

    const renderOptions = () => {
        return (
            <div>
                {inputOptions.map((_, i) => renderOption(i))}
            </div>

        )
    }

    const renderOption = (i) => {
        return (
            <label key={i}>
                <input
                    type="radio"
                    name="dataset"
                    checked={option == i}
                    onChange={() => handleChangeOption(i)}
                />
                {inputOptions[i]}
            </label>
        );
    }

    const renderOptionComponent = () => {
        if (option == 1) {
            return (
                <FileUploader />
            );
        }
        if (option == 0) {
            return (
                <InputBox />
            );
        }
    }



    return (
        <div className="input-selector">
            <h1>Input Method</h1>
            {renderOptions()}
            {renderOptionComponent()}
        </div>
    );
}


export default InputSelector;