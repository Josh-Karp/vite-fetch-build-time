import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// @ts-expect-error  Could not find a declaration file for module './src/plugin-build-fetch'. '/Users/joshuakarp/__DEV__/fetch-build-time/src/plugin-build-fetch.js' implicitly has an 'any' type.
import buildTimeFetch from "./src/plugin-build-fetch";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    buildTimeFetch({
      functions: [
        {
          name: "getStates",
          filename: "states.json",
          endpoint: "https://jsonplaceholder.typicode.com/posts",
        },
      ],
    }),
  ],
});
