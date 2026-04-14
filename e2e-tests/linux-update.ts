import fs from "fs";
import { glob } from "glob";
import path from "path";

const FILE_GLOB = "*/*-actual.png";
const DEST_DIR = path.join(__dirname, "/tests/visuals.spec.ts-snapshots/");

(async () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_node, _file, srcFolder] = process.argv;

  if (!srcFolder) {
    console.error("No source folder given");
    process.exit(1);
  }

  const source = path.join(srcFolder, FILE_GLOB);
  const files = await glob(source, {});

  if (files.length < 1) {
    console.error("No files found");
    process.exit(1);
  }

  for (const file of files) {
    const dirs = path.dirname(file).split("-");
    const browserName = dirs[dirs.length - 1];
    const pageName = path.basename(file, "-actual.png");
    const resultFile = `${pageName}-${browserName}-linux.png`;

    const dest = path.join(DEST_DIR, resultFile);
    fs.copyFileSync(file, dest);
  }
})();
