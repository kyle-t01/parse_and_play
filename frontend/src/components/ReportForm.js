// component where user queries are sent 
import { useState } from "react";
// [Send user stats to lambda function] import { sendUsageReport } from "../services/reporting";

import { GlobalVars } from "../context/GlobalContext";



const ReportForm = () => {

    // global state
    const [userReport, setUserReport] = useState("");
    const { invalidWords } = GlobalVars();
    const { setUsageReportResponse } = GlobalVars();
    // const { rawNotes, setRawNotes } = GlobalVars();

    // local state
    const [isLoading, setIsLoading] = useState(false);
    const maxChars = 300;

    const handleSubmitUserReport = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setUserReport(userReport);
        // const response = await sendUsageReport();
        /*
        if (response) {
            console.log("Lambda Function response: ", response)
            setUsageReportResponse(response)
        }
        */

        setIsLoading(false);
    }
    return (
        <div className="report-box">
            <h2>Bug Report Form</h2>
            <textarea
                className="input"
                type="text"
                placeholder="Enter feedback here..."
                value={userReport}
                onChange={(e) => { setUserReport(e.target.value) }}
                rows={4}
                maxLength={maxChars}
            />
            <div className="char-counter">
                {userReport.length} / {maxChars}
            </div>
            <p>Any invalid input will also be automatically sent when you press report!</p>
            <button className="button" onClick={handleSubmitUserReport} disabled={isLoading}>
                {isLoading ? "Loading..." : "Send Report"}
            </button>

        </div>
    );

}

export default ReportForm;