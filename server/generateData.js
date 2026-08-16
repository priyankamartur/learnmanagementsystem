import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read courses.ts and extract the JS object
const tsContent = fs.readFileSync(path.join(__dirname, "../src/data/courses.ts"), "utf-8");

// Convert simple TS to JS by trimming type annotations
let jsContent = tsContent
  .replace(/export interface [\s\S]*?(?=export const categories)/g, "")
  .replace(/: "Beginner" \| "Intermediate" \| "Advanced"/g, "")
  .replace(/: Course\[\]/g, "")
  .replace(/: QuizQuestion\[\]/g, "");

fs.writeFileSync(path.join(__dirname, "coursesData.js"), jsContent);
console.log("coursesData.js generated successfully!");
