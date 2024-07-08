import React, { useEffect, useState } from "react";
import InstrumentButtons from "./instrument-button";
import ToggleRow from "./key-buttons";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, createPost, updatePost } from "../api/api";
import {
  playInstrumentKey,
} from "../instrument/play-instrument";
import PreviewButton from "./preview-button";

type sampleData = {
  [key: string]: boolean[];
};

type Sample = {
  id?: number;
  api_key?: string;
  name?: string;
  recording_data: sampleData[];
  type: string;
  datetime?: string;
};

export type APIFormat = {
  id?: number;
  api_key?: string;
  name?: string;
  recording_data: string;
  type: string;
  datetime?: string;
};

const initialState: sampleData[] = [
  {
    B: [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
  },
  {
    A: [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
  },
  {
    G: [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
  },
  {
    F: [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
  },
  {
    E: [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
  },
  {
    D: [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
  },
  {
    C: [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
  },
];
/**
 * The following component is for the create page. This handles the user creating a 
 * new post and editing an exising sample. State management is also included for the 
 * keys and instrument selection so the interface is updated upon user input
 * 
 */

const CreatePage: React.FC = () => { // Use of generative AI to convert HTML to React component 
  const [isSaving, setIsSaving] = useState(false);
  const [sample, setSample] = useState<Sample>({
    name: "",
    recording_data: initialState,
    type: "Guitar", // Sets the default instrument to Guitar 
  });
  const [state, setState] = useState(initialState); // State for handling the 

  
  const handleRowChange = (label: string, newStates: boolean[]) => { // Function to handle the user clicking a music key
    const newState = state.map((item) => {
      if (Object.keys(item)[0] === label) {
        return { [label]: newStates }; // Applies newStates to specific key
      }
      return item;
    });
    setState(newState); // Updates the state of the keys to reflect changes 
  };

  const handleKeyClick = (clickedlabel: string) => { // Function for handling the click event on a key button
    playInstrumentKey(sample.type, clickedlabel);
  };

  const handleInstrumentChange = (selectedInstrument: string) => { // Handles the event of the user changing instrument 
    setSample({ ...sample, type: selectedInstrument }); // Updates the instrument 
  };

  const { id } = useParams(); 
  const history = useNavigate();

  useEffect(() => {
    if (id !== "new" && id !== undefined) { // If the post is not new (edit)
      const fetchPost = async () => {
        const data: APIFormat = await getPostById(parseInt(id));
        // Convert fetched data to Sample type
        const jsonData = JSON.parse(data.recording_data);
        const fetchedType = data.type;
        setState(jsonData); 

        setSample({
          ...sample,
          name: data.name,
          recording_data: jsonData,
          type: fetchedType,
        }); // Update the state of the sample
      };
      fetchPost();
    }
  }, [id]);

  const handleSave = async () => { // User saving the sample 
    setIsSaving(true);
    try {
      if (id === "new") { // If it is a new sample 
        const newSampleData: APIFormat = {
          api_key: "P3gSpT4vz6",
          name: sample.name,
          recording_data: JSON.stringify(state),
          type: sample.type,
        };

        const returnedJson = await createPost(newSampleData);
        history(`/create-sample/${returnedJson.id}`);
      } else if (id) { // If it is an existingng sample so it is getting edited
        const updatedSample: APIFormat = {
          api_key: "P3gSpT4vz6",
          name: sample.name,
          recording_data: JSON.stringify(state),
          type: sample.type,
        };

        await updatePost(parseInt(id), updatedSample);
      }
    } catch (error) {
      // Handle error appropriately
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <h2 className="title">Edit Sample:</h2>
      <form className="card edit-card">
        <input
          type="text"
          id="name"
          value={sample.name || ""}
          onChange={(e) => setSample({ ...sample, name: e.target.value })}
        />
        <div className="button-group-container">
          <button type="button" className="bright-button" onClick={handleSave}>
            Save
          </button>
          <PreviewButton sampleType={sample.type} sampleData={state} />
        </div>
      </form>
      <InstrumentButtons
        selectedType={sample.type}
        onInstrumentChange={handleInstrumentChange}
      />
      {state.map((item, index) => {
        // Maps the key buttons based on booleans from array of objects
        const label = Object.keys(item)[0];
        const buttonStates = item[label];

        return (
          <ToggleRow
            key={index}
            label={label}
            buttonStates={buttonStates}
            handleRowChange={handleRowChange}
            onButtonClick={handleKeyClick}
          />
        );
      })}
    </div>
  );
};

export default CreatePage;
