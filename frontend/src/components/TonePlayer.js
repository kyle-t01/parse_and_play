// component where user input is processed and displayed
import { useState, useEffect } from "react";
import { GlobalVars } from "../context/GlobalContext";
import * as Tone from "tone";



const TonePlayer = () => {
    const { musicEvents, setMusicEvents } = GlobalVars();
    const { rawWords } = GlobalVars();
    const [isPlaying, setIsPlaying] = useState(false);
    const [musicPlayer, setMusicPlayer] = useState(null);



    const playMusicEvents = async () => {
        if (!musicEvents || musicEvents.length === 0 || isPlaying) return;
        await Tone.start();
        let player = null;
        if (!musicPlayer) {
            const synth = new Tone.PolySynth().toDestination();
            setMusicPlayer(synth);
            player = synth;
        } else {
            player = musicPlayer;
        }
        setIsPlaying(true);
        let currentTime = Tone.now();
        let totalTime = 0;
        musicEvents.forEach((event) => {
            if (event.notes.length > 0) {
                player.triggerAttackRelease(event.notes, event.duration, currentTime);
            }
            currentTime += event.duration;
            totalTime += event.duration;
        });
        setTimeout(() => {
            player.releaseAll();
            setIsPlaying(false);
        }, totalTime * 1000);
    };






    const renderTonePlayer = () => {
        // TODO: implement pause
        return (
            <div>
                <button onClick={playMusicEvents} disabled={isPlaying}>[Play]</button>
            </div>

        )
    }



    return (
        <div className="tone-player">
            <h2>Tone Player</h2>
            {renderTonePlayer()}

        </div>
    );
}


export default TonePlayer;