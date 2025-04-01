// component where user queries are sent 
import { useState } from "react";
import { sendUserReport } from "../services/reportService";

import { GlobalVars } from "../context/GlobalContext";



const ReportForm = () => {

    // global state
    const [userReport, setUserReport] = useState("");
    const { invalidWords } = GlobalVars();
    const { usageReportResponse, setUsageReportResponse } = GlobalVars();
    // const { rawNotes, setRawNotes } = GlobalVars();

    // local state
    const [isLoading, setIsLoading] = useState(false);
    const maxChars = 300;

    const handleSubmitUserReport = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setUserReport(userReport);
        const response = await sendUserReport(invalidWords, userReport);

        if (response) {
            setUsageReportResponse(response);
            alert(response);
        }

        setUsageReportResponse("");
        setIsLoading(false);
    }
    return (
        <div className="report-box">
            <h2>Bug Report Form</h2>
            <p>Write feedback here. Any invalid input will also be automatically sent when you press send report!</p>
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

            <button className="button" onClick={handleSubmitUserReport} disabled={isLoading || userReport.trim() === ""}>
                {isLoading ? "Loading..." : "Send Report"}
            </button>


        </div>
    );

}

export default ReportForm;