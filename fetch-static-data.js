// fetch-data.js

import fs from "fs";
import path from "path";
import fetch from "node-fetch";

async function fetchDataForFunctions(functions) {
  const dataFolder = "./src/data";

  // Create data folder if it doesn't exist
  if (!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder);
  }

  for (const func of functions) {
    const functionName = func.name;
    const dataFilePath = path.join(
      dataFolder,
      `${functionName.toLowerCase()}.json`
    );

    try {
      console.log(`Fetching data for function: ${functionName}...`);
      const response = await fetch(func.endpoint);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch data for ${functionName}. Status: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      fs.writeFileSync(dataFilePath, JSON.stringify(data));
      console.log(`Data fetched and saved to ${dataFilePath}`);
    } catch (error) {
      console.error(`Error fetching data for ${functionName}:`, error);
    }
  }
}

// Example usage:
const functionsToFetch = [
  { name: "getStates", endpoint: "https://jsonplaceholder.typicode.com/posts" },
  // Add more functions to fetch data for
];

fetchDataForFunctions(functionsToFetch);
