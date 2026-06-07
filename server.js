import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { env } from "process";
import { logEvent, serializeError } from "./logger.js";

const app = express();
const PORT = env.PORT || 5101;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distRoot = path.join(__dirname, "dist");

app.use((req, res, next) => {
  const startedAt = process.hrtime.bigint();
  res.on("finish", () => {
    const durationMs = Number(process.hrtime.bigint() - startedAt) / 1_000_000;
    logEvent("http.request", {
      method: req.method,
      path: req.originalUrl,
      status_code: res.statusCode,
      duration_ms: Math.round(durationMs),
      remote_addr: req.ip,
    });
  });
  next();
});

app.use(express.static(distRoot, {
  fallthrough: true,
}));

app.get("*", (req, res) => {
  const indexPath = path.join(distRoot, "index.html");

  if (!fs.existsSync(indexPath)) {
    logEvent("spa_fallback.missing_index", { path: req.originalUrl, index_path: indexPath });
    res.status(503).send("Site build is not available.");
    return;
  }

  logEvent("spa_fallback.served", { path: req.originalUrl, index_path: indexPath });
  res.sendFile(indexPath);
});

app.use((error, req, res, _next) => {
  logEvent("http.error", {
    method: req.method,
    path: req.originalUrl,
    error: serializeError(error),
  });
  res.status(500).send("Server error.");
});

app.listen(PORT, () => {
  logEvent("server.started", { port: PORT });
});
