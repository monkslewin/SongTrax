import React, { useState, useEffect } from "react";
import "../style/starterstyles.css";
import { SampleListCard } from "./list-of-samples-card";
import { CreateSampleCard } from "./create-sample-card";
import { getAllSamples } from "../api/api";
import { Sample } from "../types/sampledata";


/**
 * 
 * Component for the home page. Displays all the samples from the API,
 * and provides buttons for each sample relating to necessary functionality. A 
 * create sample button is also located at the top of the page. 
 * 
 */
export const HomePage = () => {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetches all samples from the API to be displayed
    const fetchSamples = async () => {
      setIsLoading(true);
      const data = await getAllSamples(
        "https://comp2140.uqcloud.net/api/sample/?api_key=P3gSpT4vz6"
      );
      setSamples(data); // Updates the sample on the page 
      setIsLoading(false);
    };

    fetchSamples();
  }, []);

  return (
    <div>
      <h2 className="title">My Songs</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <CreateSampleCard />
          <SampleListCard samples={samples} /> 
          <CreateSampleCard />
        </>
      )}
    </div>
  );
};
