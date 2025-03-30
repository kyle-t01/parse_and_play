// component where user upload files
import { useState } from "react";
import { GlobalVars } from "../context/GlobalContext";



const FileUploader = () => {
    const { file, setFile } = GlobalVars()
    const [isLoading, setIsLoading] = useState(false);
    // max file size in kb, arbitrary
    const maxFileSize = 10;

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (!selectedFile) return;
        if (["text/plain"].includes(selectedFile.type) == false) {
            alert("only .csv, .tsv, or .txt files are allowed!")
            e.target.value = null;
            setFile(null)
            return;
        }


        // file size
        const fileSizeKB = selectedFile.size / 1024;
        if (fileSizeKB > maxFileSize) {
            alert(`File size must not exceed ${maxFileSize}KB!`)
            e.target.value = null;
            setFile(null)
            return;
        }

        setFile(selectedFile)
        return;
    }

    const renderFileSize = () => {
        if (!file) return;

        return (
            <p>File size (must not exceed {maxFileSize} KB): {(file.size / 1024).toFixed(2)} KB</p>
        );
    }


    return (
        <div className="file-uploader">

            <input
                type="file"
                accept=".txt"
                onChange={handleFileChange}
            />
            {renderFileSize()}
        </div>
    );
}


export default FileUploader;