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

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/run-test`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url,
            testName,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Test failed");
        setLoading(false);
        return;
      }

      const newResult = {
        ...data,
        testName,
        timestamp: new Date().toLocaleString(),
      };

      setHistory((prev) => [newResult, ...prev]);
    } catch {
      alert("Something went wrong running the test");
    }

    setLoading(false);
  };

  // Group history by testName
  const groupedTests: Record<string, TestResult[]> = {};

  history.forEach((test) => {
    const key = test.testName || "Unknown";

    if (!groupedTests[key]) {
      groupedTests[key] = [];
    }

    groupedTests[key].push(test);
  });

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-6 relative">

      {/* Header */}

    

      {/* Form */}

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border">
        <h2 className="text-lg font-semibold mb-6 text-slate-800">
          Run Visual Test
        </h2>

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

      {/* Test History */}

      <div className="max-w-5xl mx-auto mt-12">
        <h2 className="text-xl font-semibold mb-6 text-slate-700">
          Test History
        </h2>

        {history.length === 0 && (
          <p className="text-slate-500 text-sm">No tests run yet.</p>
        )}

        {Object.entries(groupedTests).map(([name, tests]) => (

          <div
            key={name}
            className="bg-white border rounded-xl p-6 mb-8 shadow-sm"
          >

            {/* Test Name */}

            <h3 className="font-semibold text-slate-800 mb-4">
              {name}
            </h3>

            <div className="space-y-6">

              {tests.map((test, index) => (

                <div key={index}>

                  <div className="flex justify-between mb-2">

                    <span className="text-xs text-slate-500">
                      {test.timestamp}
                    </span>

                    {test.diffPercent !== undefined && (
                      <span className="text-xs px-2 py-1 bg-indigo-50 text-indigo-600 rounded">
                        Diff {test.diffPercent.toFixed(2)}%
                      </span>
                    )}

                  </div>

                  {test.diffPercent === undefined ? (

                    <p className="text-sm text-slate-500">
                      Baseline created. Run again to see differences.
                    </p>

                  ) : (

                    <div className="border rounded-md overflow-hidden">
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_URL}/screenshots/${test.testName}/diff.png?t=${Date.now()}`}
                        className="w-full"
                        alt="visual diff"
                      />
                    </div>

                  )}

                </div>

              ))}

            </div>

          </div>

        ))}
      </div>

    </main>
  );
}