import * as Tone from "tone";

/**
 * Plays a specific key sound for a given instrument.
 * 
 * @param instrument - Name of the instrument
 * @param key - Specific key or note to be played
 * @returns Promise<void>
 */

export async function playInstrumentKey(
  instrument: string,
  key: string
): Promise<void> {
  // Construct the URL for the audio file
  const audioUrl = `/${instrument}/${key}.mp3`;

  // Create a Tone.Player instance with the audio URL
  const player = new Tone.Player(audioUrl).toDestination();

  await Tone.loaded();
  player.start();

  player.onstop = () => {
    player.dispose();
  };
}

type sampleData = {
  [key: string]: boolean[];
};

const activePlayers: Tone.Player[] = [];

/**
 * Plays a specific note sound for a given instrument.
 * 
 * @param instrument - Name or type of the instrument.
 * @param key - Specific key or note to be played.
 */

const playNote = async (instrument: string, key: string) => {
  const player = new Tone.Player(`/${instrument}/${key}.mp3`).toDestination();
  await player.load(`/${instrument}/${key}.mp3`);
  player.start();

  activePlayers.push(player);

  player.onstop = () => {
    const index = activePlayers.indexOf(player);
    if (index > -1) {
      activePlayers.splice(index, 1);
    }
  };
};

/**
 * Stops all notes that are currently playing.
 */

export const stopAllPlayingNotes = () => {
  // Stop each active player and clear the array
  activePlayers.forEach((player) => player.stop());
  activePlayers.length = 0;

  Tone.Transport.cancel();
};

/**
 * Plays multiple notes in sequence for a given instrument based on the provided sample data.
 * 
 * @param instrument - Name or type of the instrument.
 * @param data - Array of sample data indicating which notes to play and at which intervals.
 */

export const playPolysynth = (instrument: string, data: sampleData[]) => {
  for (const note of data) {
    for (const key in note) {
      note[key].forEach((shouldPlay, index) => { // Loops through each key within the array of booleans
        if (shouldPlay) {
        
          Tone.Transport.schedule(() => {
            playNote(instrument, key);
          }, Tone.Transport.now() + index * 0.5); // Creates 0.5s interval for each boolean
        }
      });
    }
  }
  Tone.Transport.start();
};
