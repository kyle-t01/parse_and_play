const Instructions = () => {


    return (
        <div className="instructions">

            <p># refer to original github page for more details on WHAT and HOW</p>

            <h2> Input Formatting </h2>
            <table>
                <thead>
                    <tr>
                        <th>Feature</th>
                        <th>Example</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Singe Notes</td>
                        <td>C, D, E, F, G, A, B</td>

                    </tr>

                    <tr>
                        <td>Accidentals</td>
                        <td>C# or Cb</td>
                    </tr>
                    <tr>
                        <td>Octave</td>
                        <td>C#1, C#2, ... C#7 (defaults to 4 when omitted, range 0-7)</td>
                    </tr>
                    <tr>
                        <td>Play a group of notes together (note1-note2)</td>
                        <td>Use "-" to chain notes together: D-F#-A</td>
                    </tr>
                    <tr>
                        <td>Duration (:number)</td>
                        <td>C:1/4 C:0.25 (C:1/4 specifies a quarter note, defaults to 1/4 when omitted) </td>
                    </tr>
                    <tr>
                        <td>Play Nothing (.)</td>
                        <td>. or .:1/4 etc</td>
                    </tr>
                </tbody>
            </table>

            <h2> Features to be implemented </h2>
            <ul>
                <li>Chords: maj, min, dim, aug (for example: Cmaj)</li>
                <li>7th Chords: maj7, min7, dim7, dom7 (for example: Cmin7)</li>
                <li>Complex chord example: C4maj-B4:1/2</li>
            </ul>
            <h2> Music Examples: Try it out in the text box!</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>4-5-3-6 Japanese Rock Progression</td>
                        <td>
                            C4-E4-G4:0.5 C3:0.5 D4-F#4-A4:0.5 D3:0.5 B3-D4-F#4:0.5 B2:0.5 E4-G4-B4:0.5 E3:0.5 A3-C4-E4:0.5 A2:0.5 B3-D4-F#4:0.25 B2:0.25 D#3-D#4-F#4-B4:0.5 E3:0.25 E4:0.25 G4:0.25 B4:0.25 D3:0.25 D4:0.25 F#4:0.25 A4:0.25
                        </td>

                    </tr>
                    <tr>
                        <td>Music with some invalid OR unsupported input</td>
                        <td>
                            Cb4maj7:1/2 .: . C5 C7 .:1/2 D-F#-A .-F#-.:1/4 :
                        </td>
                    </tr>
                </tbody>
            </table>



        </div>
    );

}

export default Instructions;