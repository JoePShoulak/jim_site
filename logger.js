import fs from "fs";
import os from "os";
import path from "path";

const service = process.env.SERVICE_NAME || "jim_site";
const hostname = os.hostname();

function logPath() {
  return process.env.JIM_SITE_LOG || process.env.APP_LOG || null;
}

function redact(value) {
  if (!value || typeof value !== "object") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(redact);
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, entry]) => [
      key,
      /(password|secret|token|key|authorization|cookie)/i.test(key) ? "[redacted]" : redact(entry),
    ]),
  );
}

export function logEvent(event, fields = {}) {
  const payload = {
    ts: new Date().toISOString(),
    service,
    hostname,
    event,
    ...redact(fields),
  };
  const line = JSON.stringify(payload);
  const filePath = logPath();

  if (filePath) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.appendFileSync(filePath, `${line}\n`, "utf8");
  }

  process.stdout.write(`${line}\n`);
}

export function serializeError(error) {
  return {
    name: error?.name || "Error",
    message: error?.message || String(error),
    stack: error?.stack,
  };
}
