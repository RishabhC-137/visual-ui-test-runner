const runTest = require("../runners/playwrightRunner");
const compareImages = require("../services/diff/diffService");
const fs = require("fs");
const path = require("path");

async function runTestController(req, res) {

  const { url, testName } = req.body;

  if (!url || !testName) {
    return res.status(400).json({
      error: "url and testName are required"
    });
  }

  try {

    const testFolder = path.join(
      __dirname,
      `../screenshots/${testName}`
    );

    // create folder if it doesn't exist
    if (!fs.existsSync(testFolder)) {
      fs.mkdirSync(testFolder, { recursive: true });
    }

    const baselinePath = path.join(testFolder, "baseline.png");
    const currentPath = path.join(testFolder, "current.png");
    const diffPath = path.join(testFolder, "diff.png");

    // take screenshot directly into test folder
    await runTest(url, currentPath);

    if (!fs.existsSync(baselinePath)) {

      fs.copyFileSync(currentPath, baselinePath);

      return res.json({
        message: "Baseline created"
      });

    }

    const diffPercent = await compareImages(
      baselinePath,
      currentPath,
      diffPath
    );

   res.json({
  message: "Comparison complete",
  diffPercent,
  testName,
  timestamp: new Date().toISOString()
});

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message
    });

  }

}

module.exports = runTestController;