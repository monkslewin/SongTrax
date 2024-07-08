// Import required modules and dependencies
import React from "react";
import "../style/starterstyles.css";
import { ListCardProps } from "../types/songlistcardprops";
import { Link } from "react-router-dom";
import PreviewButton from "./preview-button";

/**
 * This component creates an element on the page which presents
 * all samples that have been posted to the API 
 * 
 * @param samples - list of samples from the API  
 */

export const SampleListCard: React.FC<ListCardProps> = ({ samples }) => {
  return (
    // Render a section element with the class "sample"
    <section className="sample">
      {
        // Map through each sample in the samples array and render its details
        samples.map((sample) => (
          <div key={sample.id} className="card">
            <div className="song-details">
              <h3>{sample.name}</h3>
              <p>{sample.datetime}</p>
            </div>
            <div className="button-group-container">
              {
                // Render a link to the edit page for the sample
              }
              <Link
                to={`/create-sample/${sample.id}`}
                className="bright-button"
              >
                Edit
              </Link>
              {
                // Render a button to preview the sample
              }
              <PreviewButton sampleType={sample.type} sampleData={JSON.parse(sample.recording_data)} />
              {
                // Render a link to the share page for the sample
              }
              <Link
                to={`/share-sample-page/${sample.id}`}
                className="bright-button"
              >
                Share
              </Link>
            </div>
          </div>
        ))
      }
    </section>
  );
};
