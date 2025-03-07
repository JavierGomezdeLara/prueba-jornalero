import { defineConfig } from "cypress";

export default defineConfig({
  video: false,
  e2e: {
    setupNodeEvents(on, config) {
      return config
    },
    baseUrl: `http://localhost:5173`,
    viewportWidth: 1440,
    viewportHeight: 1080,
  },
})
