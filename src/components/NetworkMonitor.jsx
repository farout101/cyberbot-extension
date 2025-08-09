import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function NetworkMonitor() {
  const [logs, setLogs] = useState([]);
  const [savedLogs, setSavedLogs] = useState([]);
  const [aiSummary, setAiSummary] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get existing logs when popup opens
    chrome.runtime.sendMessage({ type: "GET_NETWORK_LOGS" }, (response) => {
      if (response && response.logs) {
        setLogs(response.logs.reverse());
      }
    });

    // Listen for new logs
    chrome.runtime.onMessage.addListener((msg) => {
      if (msg.type === "NETWORK_LOG_UPDATE") {
        setLogs((prev) => [msg.payload, ...prev.slice(0, 99)]);
      }
    });
  }, []);

  async function summarizeLogs() {
    try {
      if (!savedLogs.length) {
        alert("No saved logs to summarize!");
        return;
      }

      setLoading(true);
      setAiSummary("");

      // Initialize Gemini
      const genAI = new GoogleGenerativeAI(
        process.env.REACT_APP_GEMINI_API_KEY
      );
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

      // Create a clear prompt for Gemini
      const prompt = `
        Here are some browser network logs in JSON format:
        ${JSON.stringify(savedLogs.slice(0, 50), null, 2)}

        Please summarize:
        - Main websites visited
        - Types of requests made (e.g., API calls, image loads, scripts)
        - Any notable patterns or repeated usage
        Respond in concise bullet points.
      `;

      const result = await model.generateContent(prompt);
      setAiSummary(result.response.text());
    } catch (err) {
      console.error(err);
      setAiSummary("Error getting summary.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 text-sm max-h-[500px] overflow-y-scroll bg-black text-white">
      <h2 className="text-lg font-bold mb-2">Network Requests</h2>

      {/* Buttons */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => {
            setSavedLogs(logs);
            alert(`Saved ${logs.length} logs for analysis.`);
          }}
          className="bg-blue-600 px-3 py-1 rounded text-white hover:bg-blue-700"
        >
          Save Logs
        </button>
        <button
          onClick={summarizeLogs}
          className="bg-purple-600 px-3 py-1 rounded text-white hover:bg-purple-700"
        >
          Ask Gemini
        </button>
      </div>

      {/* AI Summary */}
      {loading && <p className="text-yellow-400">Asking Gemini...</p>}
      {aiSummary && (
        <div className="mt-2 p-2 bg-gray-800 rounded text-sm text-slate-200">
          <strong>Gemini Summary:</strong>
          <p>{aiSummary}</p>
        </div>
      )}

      {/* Logs List */}
      <ul className="space-y-1 mt-4">
        {logs.map((log, i) => (
          <li key={i} className="border-b border-gray-600 pb-1">
            <div>
              <span className="text-green-400">{log.method}</span> {log.url}
            </div>
            <div>
              Status: {log.statusCode} | Type: {log.type} | Time:{" "}
              {log.timeStamp}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
