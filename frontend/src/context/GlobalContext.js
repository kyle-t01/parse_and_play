// acting as storage to store important global variables and state
// not the best way if aiming for extensibility, but will do given small scope

import { useContext, createContext, useState } from "react";


const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {

    const [userInput, setUserInput] = useState("");
    const [file, setFile] = useState(null);
    const [option, setOption] = useState(0);
    const inputOptions = ["write your own", "upload a file"];
    const [rawNotes, setRawNotes] = useState(null);
    const [notes, setNotes] = useState(null);
    const [usageReportResponse, setUsageReportResponse] = useState(null);

    return (
        <GlobalContext.Provider
            value={{
                userInput, setUserInput,
                file, setFile,
                option, setOption,
                inputOptions,
                rawNotes, setRawNotes,
                notes, setNotes,
                usageReportResponse, setUsageReportResponse,
            }}>
            {children}
        </GlobalContext.Provider>
    );
}

// export the context 
export const GlobalVars = () => {
    return useContext(GlobalContext)
}