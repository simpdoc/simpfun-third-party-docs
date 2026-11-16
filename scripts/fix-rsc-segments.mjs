import { copyFile, mkdir, readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const SEGMENT_SUFFIX = '.segment.rsc';
const SEGMENTS_DIR_SUFFIX = '.segments';

if (process.platform !== 'win32') {
  process.exit(0);
}

const distDir = path.resolve(process.cwd(), '.next');
const outDir = path.resolve(process.cwd(), 'out');
const appDir = path.join(distDir, 'server', 'app');
const manifestPath = path.join(distDir, 'prerender-manifest.json');

if (!existsSync(manifestPath) || !existsSync(appDir)) {
  process.exit(0);
}

const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));

async function exportSegments(segmentsDir, segmentDirBase, destDir) {
  const entries = await readdir(segmentsDir, { withFileTypes: true });
  await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(segmentsDir, entry.name);

    if (entry.isDirectory()) {
      await exportSegments(entryPath, segmentDirBase, destDir);
      return;
    }
    if (!entry.name.endsWith(SEGMENT_SUFFIX)) {
      return;
    }

    const segmentFileSource = path.relative(segmentDirBase, entryPath);
    const segmentPath = '/' + segmentFileSource.replaceAll('\\', '/').slice(0, -SEGMENT_SUFFIX.length);
    const segmentFilename = `__next${segmentPath.replaceAll('/', '.')}.txt`;
    const segmentFileDest = path.join(destDir, segmentFilename);

    await mkdir(path.dirname(segmentFileDest), { recursive: true });
    await copyFile(entryPath, segmentFileDest);
  }));
}

await Promise.all(Object.keys(manifest.routes).map(async (route) => {
  const segmentsDirName = route === '/' ? 'index' : route;
  const segmentsDir = path.join(appDir, `${segmentsDirName}${SEGMENTS_DIR_SUFFIX}`);
  if (!existsSync(segmentsDir)) {
    return;
  }

  const destDir = route === '/' ? outDir : path.join(outDir, route);
  await mkdir(destDir, { recursive: true });
  await exportSegments(segmentsDir, segmentsDir, destDir);
}));
