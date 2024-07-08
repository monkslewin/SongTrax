import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShareLocation } from "../types/location";
import { APIFormat } from "./create-sample-page";
import { getAllSamples } from "../api/api";
import { ShareButton } from "./share-sample";
import PreviewButton from "./preview-button";
import { getPostById } from "../api/api";

type RouteParams = {
  id: string;  // or 'number' if your IDs are numerical
};


export const SharePage: React.FC = () => { // Generative AI used for converting HTML to a React component
  // Initialising the necessary states for the page 
  const [locations, setLocations] = useState<ShareLocation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [post, setPost] = useState<APIFormat>();
  const [sharedRecords, setSharedRecords] = useState<any[]>([]);

  const { id } = useParams<RouteParams>();
  const sampleId = Number(id);

  useEffect(() => { // Fetches all locations from the API 
    const fetchLocations = async () => {
      setIsLoading(true);
      const data = await getAllSamples(
        "https://comp2140.uqcloud.net/api/location/?api_key=P3gSpT4vz6"
      );
      setLocations(data);
      setIsLoading(false);
    };
    fetchLocations();
  }, []);

  useEffect(() => { // Fetches all shared records from the API 
    const fetchSharedRecords = async () => {
      const response = await fetch(
        `https://comp2140.uqcloud.net/api/sampletolocation/?sample_id=${sampleId}&api_key=P3gSpT4vz6`
      );
      const data = await response.json();
      setSharedRecords(data);
    };
    fetchSharedRecords();
  }, [sampleId]);

  useEffect(() => {
    if (id !== undefined) { // If the post is not new (edit)
      const fetchPost = async () => {
        const data: APIFormat = await getPostById(parseInt(id));
        setPost(data);

        
      
      };
      fetchPost();
    }
  }, [id]);

  const handleToggleShare = async ( // Handles when the user toggles between shared and not shared 
    location: ShareLocation,
    status: "Shared" | "Not Shared" 
  ) => {
    const locationId = location.id; // Use of generative AI for handling the toggling
    const existingRecord = sharedRecords.find( // Searching for matching records
      (record) => record.sample_id == id && record.location_id == locationId 
    );

    if (status === "Shared") { 
      if (!existingRecord) {
        // Only post if there's no existing record
        await fetch(
          `https://comp2140.uqcloud.net/api/sampletolocation/?api_key=P3gSpT4vz6`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              sample_id: sampleId,
              location_id: locationId,
            }),
          }
        );
      }
    } else {
      if (existingRecord) {
        // Only delete if there's an existing record
        await fetch(
          `https://comp2140.uqcloud.net/api/sampletolocation/${existingRecord.id}?api_key=P3gSpT4vz6`,
          {
            method: "DELETE",
          }
        );
      }
    }
    const response = await fetch(
      `https://comp2140.uqcloud.net/api/sampletolocation/?sample_id=${sampleId}&api_key=P3gSpT4vz6`
    );
    const updatedRecords = await response.json();
    setSharedRecords(updatedRecords);
   
  };

  return (
    <div>
      <h2 className="title">Share This Sample</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="card">
            <div className="song-details">
              <h3>{post?.name}</h3>
              <p>{post?.datetime}</p>
            </div>
            <div className="buttons">
            {post && <PreviewButton sampleType={post.type} sampleData={JSON.parse(post.recording_data)} />}

              
            </div>
          </div>

          {locations.map((location) => {
            const isShared = sharedRecords.find(
              (record) =>
                record.location_id == location.id && record.sample_id == id
            );

            return (
              <div key={location.id}>
                <div className="toggle-row-container">
                  <div className="location-name-label">
                    <h4>{location.name}</h4>
                  </div>
                  <ShareButton
                    location={{ ...location, sharing: isShared }}
                    onToggle={handleToggleShare}
                  />
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};
