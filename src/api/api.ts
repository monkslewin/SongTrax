const BASE_URL = "https://comp2140.uqcloud.net/api/sample/?api_key=P3gSpT4vz6";

/**
 * Function to retrieve all samples from the API 
 * 
 * @param URL - string of the url to the Sample API
 * @returns - JSON data from the API of all samples
 */

export const getAllSamples = async (URL: string) => {
  // Retrieves all samples from the API
  const response = await fetch(URL);
  return response.json();
};

/**
 * Function to retrieve a specific post from the API through the use 
 * 
 * @param id - ID of the post to be retrieved as a number data type 
 * @returns - JSON data for the specific sample 
 */

export const getPostById = async (id: number) => {
  // Retrieves a specific post by the ID
  const response = await fetch(
    `https://comp2140.uqcloud.net/api/sample/${id}?api_key=P3gSpT4vz6`
  );
  return response.json();
};

/**
 * Function to create a new post in the API for a sample
 * 
 * @param sample - object of a sample (written as any for convenience) 
 * @returns API response (successful or unsuccessful)
 */

export const createPost = async (sample: any) => {
  // Creates a post to the API
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sample),
  });

  return response.json();
};

/**
 * 
 * @param id - ID of the sample being updated 
 * @param sample - object of a sample (written as any for convenience)
 * @returns  API response (successful or unsuccessful)
 */

export const updatePost = async (id: number, sample: any) => {
  // Updates an existing post in the API
  const response = await fetch(
    `https://comp2140.uqcloud.net/api/sample/${id}/?api_key=P3gSpT4vz6`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sample),
    }
  );
  return response.json();
};
