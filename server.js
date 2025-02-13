import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { env } from "process";

const app = express();
const PORT = env.PORT || 5000; // Use 'env' instead of 'process.env'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
