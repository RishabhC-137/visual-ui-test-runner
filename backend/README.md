# Visual UI Test Runner

A simple visual testing tool that captures screenshots of websites and detects UI changes between runs.

The first time a test runs, it saves a **baseline screenshot**.  
Future runs compare the new screenshot with the baseline and highlight visual differences.

---

## Features

- Capture webpage screenshots using Playwright
- Automatically create a baseline image on the first run
- Compare new screenshots with the baseline
- Detect visual UI changes
- Show diff image highlighting changes
- Simple dashboard to run tests

---

## Tech Stack

Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

Backend
- Node.js
- Express

Automation
- Playwright

Image Comparison
- Pixelmatch
- PNGJS

---

## Project Structure

```
ui-test-runner
│
├ backend
│   ├ src
│   │   ├ controllers
│   │   ├ routes
│   │   ├ runners
│   │   ├ services
│   │   │   └ diff
│   │   └ screenshots
│   │
│   └ index.js
│
└ frontend
    └ Next.js app
```

---

## How It Works

1. User enters a **test name** and **website URL**.
2. The frontend sends a request to the backend API.
3. Backend launches a browser using Playwright.
4. A screenshot of the webpage is taken.

### First Run

If no baseline exists:

```
baseline.png ← screenshot
```

### Next Runs

The system compares:

```
baseline.png
current.png
```

Then generates:

```
diff.png
```

The diff image highlights visual changes.

---

## API Endpoint

### Run Test

```
POST /api/run-test
```

Request Body

```json
{
  "testName": "homepage",
  "url": "https://example.com"
}
```

Response Example

```json
{
  "message": "Comparison complete",
  "diffPercent": 2.14,
  "testName": "homepage"
}
```

---

## Running Locally

### Clone the repository

```
git clone https://github.com/YOUR_USERNAME/visual-ui-test-runner.git
```

---

### Start Backend

```
cd backend
npm install
node index.js
```

Backend runs on

```
http://localhost:4000
```

---

### Start Frontend

```
cd frontend
npm install
npm run dev
```

Open in browser

```
http://localhost:3000
```

---

## Environment Variable

Create this file:

```
frontend/.env.local
```

Add:

```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

---

## Example Screenshot Output

After running tests, screenshots are stored like this:

```
screenshots
│
├ homepage
│   ├ baseline.png
│   ├ current.png
│   └ diff.png
```

Each **test name gets its own folder**.

---

## Possible Improvements

Some ideas for future improvements:

- Store test history in a database
- Schedule automatic tests
- Support testing multiple pages
- Send alerts when UI changes are detected

---

## Author

Rishabh Gupta

GitHub  
https://github.com/RishabhC-137

LinkedIn  
https://www.linkedin.com/in/rishabh-gupta-2281871ab/