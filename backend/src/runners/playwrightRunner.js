const { chromium } = require("playwright");
const { execSync } = require("child_process");

let browserReady = false;

async function ensureBrowser() {
  if (browserReady) return;

  try {
    // Check if Chromium can launch
    const browser = await chromium.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"]
    });
    await browser.close();
    browserReady = true;
  } catch (e) {
    // If not, install Chromium
    console.log("Installing Playwright Chromium...");
    execSync("npx playwright install chromium", { stdio: "inherit" });
    browserReady = true;
  }
}

async function runTest(url, screenshotPath) {
  await ensureBrowser();

  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"]
  });

  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });

  await page.screenshot({
    path: screenshotPath,
    fullPage: true
  });

  await browser.close();
}

module.exports = runTest;