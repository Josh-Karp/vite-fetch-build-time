// plugin-buildtime-fetch.js
import fs from "fs-extra";
import fetch from "node-fetch";
import path from "path";

function buildTimeFetch(options) {
  return {
    name: "plugin-buildtime-fetch",
    async buildEnd() {
      const { functions } = options;

      const dataFolder = `${__dirname}/data`;

      // Create data folder if it doesn't exist
      await fs.ensureDir(dataFolder);

      for (const func of functions) {
        const functionName = func.name;
        const dataFilename = func.filename || `${functionName.toLowerCase()}.json`;
        const dataFilePath = path.join(dataFolder, dataFilename);

        try {
          console.log(`Fetching data for function: ${functionName}...`);
          const response = await fetch(func.endpoint);
          if (!response.ok) {
            throw new Error(
              `Failed to fetch data for ${functionName}. Status: ${response.status} ${response.statusText}`
            );
          }

          const data = await response.json();
          await fs.writeFile(dataFilePath, JSON.stringify(data));
          console.log(`Data fetched for ${functionName} and saved to ${dataFilePath}`);
        } catch (error) {
          console.error(`Error fetching data for ${functionName}:`, error);
        }
      }
    },
  };
}

export default buildTimeFetch;
