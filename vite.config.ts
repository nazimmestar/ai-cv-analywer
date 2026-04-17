import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import fs from "fs";
import path from "path";

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    {
      name: "copy-pdf-worker",
      apply: "build",
      writeBundle() {
        // Copy PDF.js worker from node_modules to public
        const workerSrc = path.resolve(
          import.meta.dirname,
          "node_modules/pdfjs-dist/build/pdf.worker.min.mjs"
        );
        const workerDest = path.resolve(
          import.meta.dirname,
          "public/pdf.worker.min.mjs"
        );

        if (fs.existsSync(workerSrc)) {
          fs.copyFileSync(workerSrc, workerDest);
          console.log("✓ PDF worker file updated to match pdfjs-dist version");
        }
      },
    },
  ],
});
