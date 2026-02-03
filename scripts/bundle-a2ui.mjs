#!/usr/bin/env node
/**
 * Cross-platform A2UI bundler (works on Windows without WSL)
 * Replaces bash scripts/bundle-a2ui.sh
 */
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "..");
const HASH_FILE = path.join(ROOT_DIR, "src/canvas-host/a2ui/.bundle.hash");
const OUTPUT_FILE = path.join(ROOT_DIR, "src/canvas-host/a2ui/a2ui.bundle.js");
const A2UI_RENDERER_DIR = path.join(ROOT_DIR, "vendor/a2ui/renderers/lit");
const A2UI_APP_DIR = path.join(ROOT_DIR, "apps/shared/OpenClawKit/Tools/CanvasA2UI");

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function walk(entryPath, files = []) {
  const st = await fs.stat(entryPath);
  if (st.isDirectory()) {
    const entries = await fs.readdir(entryPath);
    for (const entry of entries) {
      await walk(path.join(entryPath, entry), files);
    }
  } else {
    files.push(entryPath);
  }
  return files;
}

async function computeHash(inputPaths) {
  const files = [];
  for (const input of inputPaths) {
    if (await exists(input)) {
      await walk(input, files);
    }
  }

  const normalize = (p) => p.split(path.sep).join("/");
  files.sort((a, b) => normalize(a).localeCompare(normalize(b)));

  const hash = createHash("sha256");
  for (const filePath of files) {
    const rel = normalize(path.relative(ROOT_DIR, filePath));
    hash.update(rel);
    hash.update("\0");
    hash.update(await fs.readFile(filePath));
    hash.update("\0");
  }
  return hash.digest("hex");
}

function onError(msg) {
  console.error(msg);
  console.error("A2UI bundling failed. Re-run with: pnpm canvas:a2ui:bundle");
  console.error("If this persists, verify pnpm deps and try again.");
  process.exit(1);
}

async function main() {
  // Docker builds exclude vendor/apps via .dockerignore.
  // In that environment we must keep the prebuilt bundle.
  if (!(await exists(A2UI_RENDERER_DIR)) || !(await exists(A2UI_APP_DIR))) {
    console.log("A2UI sources missing; keeping prebuilt bundle.");
    process.exit(0);
  }

  const inputPaths = [
    path.join(ROOT_DIR, "package.json"),
    path.join(ROOT_DIR, "pnpm-lock.yaml"),
    A2UI_RENDERER_DIR,
    A2UI_APP_DIR,
  ];

  const currentHash = await computeHash(inputPaths);

  if (await exists(HASH_FILE)) {
    const previousHash = (await fs.readFile(HASH_FILE, "utf-8")).trim();
    if (previousHash === currentHash && (await exists(OUTPUT_FILE))) {
      console.log("A2UI bundle up to date; skipping.");
      process.exit(0);
    }
  }

  try {
    console.log("Compiling A2UI TypeScript...");
    execSync(`pnpm -s exec tsc -p "${A2UI_RENDERER_DIR}/tsconfig.json"`, {
      cwd: ROOT_DIR,
      stdio: "inherit",
    });

    console.log("Bundling A2UI with rolldown...");
    execSync(`rolldown -c "${A2UI_APP_DIR}/rolldown.config.mjs"`, {
      cwd: ROOT_DIR,
      stdio: "inherit",
    });

    await fs.writeFile(HASH_FILE, currentHash);
    console.log("A2UI bundle complete.");
  } catch (err) {
    onError(err.message);
  }
}

main().catch(onError);

