const { chromium } = require("playwright");

async function runTest(url, screenshotPath) {

  const browser = await chromium.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage"
    ]
  });

  const page = await browser.newPage();

  await page.goto(url, {
    waitUntil: "domcontentloaded",
    timeout: 60000
  });

  await page.screenshot({
    path: screenshotPath,
    fullPage: true
  });

  await browser.close();
}

module.exports = runTest;