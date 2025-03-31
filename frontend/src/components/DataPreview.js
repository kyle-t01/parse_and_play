// component where user input is processed and displayed
import { useState, useEffect } from "react";
import { GlobalVars } from "../context/GlobalContext";



const DataPreview = () => {
    const { file } = GlobalVars();
    const { musicEvents, setMusicEvents } = GlobalVars();
    const { invalidWords, setInvalidWords } = GlobalVars();
    const [validIndexArray, setValidIndexArray] = useState([]);
    const [rawWords, setRawWords] = useState([]);

    useEffect(() => {
        setMusicEvents([]);
        setValidIndexArray([]);
        setInvalidWords([]);
        setRawWords([]);
        readFile()
    }, [file]);


    // read an entire text file into lines
    const readFile = () => {

        if (!file) { console.log("no file detected!"); return; }

        const reader = new FileReader();
        reader.readAsText(file)
        reader.onload = (e) => {
            const rawData = e.target.result;
            // split rawData into individual words
            const words = rawData.trim().split(/\s+/);
            setRawWords(words);
            // get matched events {notes: [], duration: (float)}
            words.forEach((w) => matchWord(w));
        }

    }
    const matchWord = (w) => {
        // default of 0.25 if duration omitted 
        var duration = 0.25;
        // !!! chords not supported in MVP !!! ie Cmin7
        // notes: Cb, A#, . etc 
        const noteRegex = "(?:[A-G][b#]?[0-9]?|[.])";
        // chainedNotes: D-F#-.-Cb etc
        const chainedNoteRegex = `((?:${noteRegex}-)*${noteRegex})`
        // durations: :1/4, :0.25 etc
        const durationRegex = "(?:[:]([0-9]\/[0-9]|(?:[0-9]*[.])?[0-9]+))?"
        const wordRegex = new RegExp(`^${chainedNoteRegex}${durationRegex}$`)
        const match = w.match(wordRegex);
        if (match) {
            // extract notes, and duration
            // see if there is any chaining "-" in notes and parse => D-F#-A to ["D", "F#", "A"], remove all "."
            const splitNotes = match[1].split("-").filter(x => x !== ".");
            // parse duration
            if (match[2]) { duration = parseFloat(match[2]); }
            const musicEvent = { notes: splitNotes, duration: duration };
            setMusicEvents(prev => [...prev, musicEvent])
            setValidIndexArray(prev => [...prev, true]);

        } else {
            setInvalidWords(prev => [...prev, w]);
            setValidIndexArray(prev => [...prev, false]);
        }
        return;
    }



    const renderWords = () => {
        // if no words detected, return nothing for now;
        if (!rawWords || rawWords.length == 0) return;
        const allWords = rawWords.map((w, i) => {
            const isValid = validIndexArray[i];
            const wordLabel = (isValid) ? `[${w}]` : `<invalid:[${w}]>`;
            return wordLabel;
        }).join(" ");
        return (
            <div>
                <p>{allWords}</p>
            </div>
        );
    }




    const renderDataPreview = () => {

        return (
            <div>
                {renderWords()}
            </div>

        )
    }



    return (
        <div className="data-preview">
            <h1>Data Preview</h1>
            {renderDataPreview()}

        </div>
    );
}


export default DataPreview;