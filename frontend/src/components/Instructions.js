const Instructions = () => {


    return (
        <div className="instructions">
            <h1>Parse and Play! Write down music notes as text and listen to it!</h1>
            <p># refer to original github page for more details on WHAT and HOW</p>

            <h1> Input Formatting </h1>
            <ul>
                <li>Single Notes: C</li>
                <li>Accidentals: b, # (for example: C#)</li>
                <li>Chords: maj, min, dim, aug (for example: Cmaj)</li>
                <li>7th Chords: maj7, min7, dim7, dom7 (for example: Cmin7)</li>
                <li>Chaining Notes: use - to chain notes and chords to be played at the same time (for example: D-F#-A)</li>
                <li>duration (optional): use : to specify duration (for example: Cmaj:1/4 specifies quarter note, default duration is 1/4 if omitted )</li>
                <li>No Note: . to specify no note to be played (for example: .:1/2) </li>
                <li>Octave (optional, range = [1,6]): specify octave a note that will be played in, default is 4 (for example: C#4maj7, default octave is 4 if omitted) </li>
            </ul>
            <h1> Example chord progressions</h1>
            <ul>
                <li> 4-5-3-6 progression: ...</li>
            </ul>


        </div>
    );

}

export default Instructions;