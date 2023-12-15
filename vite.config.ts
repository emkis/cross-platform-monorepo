import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "apps/native/src/main.ts"),
      formats: ["es"],
      fileName: "application-native",
    },
    minify: false,
  },
});
