// component where user queries are sent 
import { useState } from "react";
// [Send user stats to lambda function] import { sendUsageReport } from "../services/reporting";

import { GlobalVars } from "../context/GlobalContext";



const InputBox = () => {

    // global state
    const { userInput, setUserInput } = GlobalVars();
    const { setUsageReportResponse } = GlobalVars();
    // const { rawNotes, setRawNotes } = GlobalVars();

    // local state
    const [isLoading, setIsLoading] = useState(false);
    const maxChars = 300;

    const handleSubmitUserInput = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log("user input submitted:", userInput);
        // const response = await sendUsageReport();
        if (response) {
            console.log("Lambda Function response: ", response)
            setUsageReportResponse(response)
        }

        setIsLoading(false);
    }
    return (
        <div className="input-box">
            <h1>Input Text Here</h1>
            <textarea
                className="input"
                type="text"
                placeholder="Type some notes..."
                value={userInput}
                onChange={(e) => { setUserInput(e.target.value) }}
                rows={4}
                maxLength={maxChars}
            />
            <div className="char-counter">
                {userInput.length} / {maxChars}
            </div>
            <button className="button" onClick={handleSubmitUserInput} disabled={isLoading}>
                {isLoading ? "Loading..." : "Send"}
            </button>
        </div>
    );

}

export default InputBox;