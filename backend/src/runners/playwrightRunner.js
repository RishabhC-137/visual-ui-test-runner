const { chromium } = require("playwright");

async function runTest(url, screenshotPath) {

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(url);

  await page.screenshot({
    path: screenshotPath,
    fullPage: true
  });

  await browser.close();
}

module.exports = runTest;