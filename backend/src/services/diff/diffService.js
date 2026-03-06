const fs = require("fs");
const { PNG } = require("pngjs");

async function compareImages(baselinePath, currentPath, diffPath) {

  const pixelmatch = (await import("pixelmatch")).default;

  const img1 = PNG.sync.read(fs.readFileSync(baselinePath));
  const img2 = PNG.sync.read(fs.readFileSync(currentPath));

  const { width, height } = img1;

  const diff = new PNG({ width, height });

  const numDiffPixels = pixelmatch(
    img1.data,
    img2.data,
    diff.data,
    width,
    height,
    { threshold: 0.1 }
  );

  fs.writeFileSync(diffPath, PNG.sync.write(diff));

  const diffPercent = (numDiffPixels / (width * height)) * 100;

  return diffPercent;
}

module.exports = compareImages;