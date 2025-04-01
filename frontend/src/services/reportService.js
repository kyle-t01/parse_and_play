export const sendUserReport = async (invalidChords, userReport) => {
    console.log("sending user report");
    try {

        // request headers
        const headers = {
            "Content-Type": "application/json",
        };

        // request options
        const requestOptions = {
            method: "POST",
            headers: headers,
        };

        // invalid chords in the format of ["word", "word2",...]
        // userReport in the format of "string"
        requestOptions.body = JSON.stringify({
            invalidChords: invalidChords,
            userReport: userReport,

        });

        const url = process.env.REACT_APP_LF_REPORT;
        console.log(url);
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            console.log("Lambda function call failed!", data.error);
        };
    } catch (error) {
        console.log("error:", error);
    };

}

