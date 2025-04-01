// component where user input is processed and displayed
import { useState, useEffect } from "react";
import { GlobalVars } from "../context/GlobalContext";



const DataPreview = () => {
    const { file, setFile } = GlobalVars();
    const { musicEvents, setMusicEvents } = GlobalVars();
    const { invalidWords, setInvalidWords } = GlobalVars();
    const { option, setOption } = GlobalVars();
    const { submittedInput, setSubmittedInput } = GlobalVars();
    const [validIndexArray, setValidIndexArray] = useState([]);
    const [rawWords, setRawWords] = useState([]);

    useEffect(() => {
        setMusicEvents([]);
        setValidIndexArray([]);
        setInvalidWords([]);
        setRawWords([]);
        if (option == 1) readFile();
        if (option == 0) readInputBox();
    }, [file, submittedInput, option]);


    // read an entire text file into lines
    const readFile = () => {

        if (!file) { return; }

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

    const readInputBox = () => {
        if (!submittedInput) return;
        setFile(null);
        const words = submittedInput.trim().split(/\s+/);
        setRawWords(words);
        // get matched events {notes: [], duration: (float)}
        words.forEach((w) => matchWord(w));
        return;
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
        const durationRegex = "(?:[:]([0-9]+\/[1-9]+|(?:[0-9]*[.])?[0-9]+))?"
        const wordRegex = new RegExp(`^${chainedNoteRegex}${durationRegex}$`)
        const match = w.match(wordRegex);
        console.log(match)
        if (match) {
            // extract notes, and duration
            // see if there is any chaining "-" in notes and parse => D-F#-A to ["D", "F#", "A"], remove all "."
            const splitNotes = match[1].split("-").filter(x => x !== ".");
            // now append the octave (default 4) to each note if missing; look for F#5 C4 etc
            const octaveNotes = splitNotes.map(n => {
                if (/\d$/.test(n)) return n;
                return n + "4";
            });
            // parse duration
            const number = match[2];
            if (number) {
                var val = 0;
                if (number.includes('/')) {
                    // fractions
                    val = parseFloat(number.split("/").reduce((a, b) => a / b));
                } else {
                    // decimals
                    val = parseFloat(number);
                }
                if (val == NaN || val == 0.0 || val == 0) { val = 0.25 };
                duration = val;

            }
            const musicEvent = { notes: octaveNotes, duration: duration };
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
            <h2>Data Preview</h2>
            {renderDataPreview()}
            {musicEvents.length == 0 && <p>Load some text to start data preview.</p>}

        </div>
    );
}


export default DataPreview;