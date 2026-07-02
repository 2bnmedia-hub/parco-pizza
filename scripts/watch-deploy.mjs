import chokidar from "chokidar";
import { execSync, spawn } from "child_process";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
let timer = null;
let deploying = false;

const IGNORE = [
  "node_modules", ".next", ".vercel", ".git",
  "scripts", "*.log", "*.lock",
];

function deploy() {
  if (deploying) return;
  deploying = true;
  console.log("\n🚀  שינוי זוהה — מעלה לפרודקשן...\n");
  try {
    execSync("vercel --prod", { stdio: "inherit", cwd: ROOT });
    console.log("\n✅  האתר עודכן בלייב!\n");
  } catch {
    console.error("\n❌  Deploy נכשל — בדוק את הפלט למעלה\n");
  }
  deploying = false;
}

const watcher = chokidar.watch(ROOT, {
  ignored: IGNORE.map(p => `**/${p}/**`).concat(IGNORE.map(p => `**/${p}`)),
  ignoreInitial: true,
  persistent: true,
  awaitWriteFinish: { stabilityThreshold: 800, pollInterval: 100 },
});

watcher.on("all", (event, filePath) => {
  const rel = path.relative(ROOT, filePath);
  console.log(`📝  ${event}: ${rel}`);
  clearTimeout(timer);
  timer = setTimeout(deploy, 2500); // debounce — מחכה 2.5 שניות אחרי שינוי אחרון
});

console.log("👀  Watch-Deploy פעיל — שמור קובץ כדי לעדכן את האתר בלייב\n");
console.log("   Ctrl+C כדי לעצור\n");
