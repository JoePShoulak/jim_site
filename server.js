import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Manually import 'process' if it's not globally defined
import { env } from "process";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = env.PORT || 5000; // Use 'env' instead of 'process.env'

// Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the build folder
app.use(express.static(path.join(__dirname, "dist")));

// Handle React Router paths
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
