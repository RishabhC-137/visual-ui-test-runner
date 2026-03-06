"use client";

import { useState } from "react";

type TestResult = {
  message: string;
  diffPercent?: number;
  testName?: string;
  timestamp?: string;
};

export default function Home() {
  const [url, setUrl] = useState("");
  const [testName, setTestName] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<TestResult[]>([]);

  const runTest = async () => {
    if (!url || !testName) return;

    setLoading(true);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/run-test`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
        testName,
      }),
    });

    const data = await res.json();

    const newResult = {
      ...data,
      timestamp: new Date().toLocaleString(),
    };

    setHistory((prev) => [newResult, ...prev]);

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-6">
      {/* Form */}

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border">
        <h1 className="text-2xl font-semibold mb-6 text-slate-800">
          Visual UI Test Runner
        </h1>

        <div className="space-y-4">
          <input
            className="border border-slate-200 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Test Name"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
          />

          <input
            className="border border-slate-200 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Website URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <button
            onClick={runTest}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md transition disabled:opacity-50"
          >
            {loading ? "Running visual test..." : "Run Test"}
          </button>
        </div>
      </div>

      {/* History */}

      <div className="max-w-3xl mx-auto mt-10">
        <h2 className="text-xl font-semibold mb-5 text-slate-700">
          Test History
        </h2>

        {history.length === 0 && (
          <p className="text-slate-500 text-sm">No tests run yet.</p>
        )}

        {history.map((test, index) => (
          <div
            key={index}
            className="bg-white border rounded-xl p-6 mb-5 shadow-sm"
          >
            <div className="flex justify-between items-center mb-3">
              <p className="font-semibold text-slate-800">{test.testName}</p>

              {test.diffPercent !== undefined && (
                <span className="text-sm px-3 py-1 bg-indigo-50 text-indigo-600 rounded">
                  Diff {test.diffPercent.toFixed(2)}%
                </span>
              )}
            </div>

            {test.diffPercent !== undefined && (
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}/screenshots/${test.testName}/diff.png`}
                className="border rounded-md mt-2"
                alt="visual diff"
              />
            )}

            <p className="text-xs text-slate-500 mt-3">{test.timestamp}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
