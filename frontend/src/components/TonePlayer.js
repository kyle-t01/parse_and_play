// component where user input is processed and displayed
import { useState, useEffect } from "react";
import { GlobalVars } from "../context/GlobalContext";
import * as Tone from "tone";



const TonePlayer = () => {
    const { musicEvents, setMusicEvents } = GlobalVars();
    const { rawWords } = GlobalVars();



    const playMusicEvents = async () => {
        if (!musicEvents || musicEvents.length === 0) return;

        await Tone.start();

        const synth = new Tone.PolySynth().toDestination();
        let currentTime = Tone.now();

        musicEvents.forEach((event) => {
            console.log(event);
            if (event.notes.length > 0) {
                synth.triggerAttackRelease(event.notes, event.duration, currentTime);
            }
            currentTime += event.duration;
        });


    };






    const renderTonePlayer = () => {
        return (
            <div>
                <button onClick={playMusicEvents}>Play</button>
            </div>

        )
    }



    return (
        <div cclassName="tone-player">
            <h2>Tone Player</h2>
            {renderTonePlayer()}

        </div>
    );
}


export default TonePlayer;