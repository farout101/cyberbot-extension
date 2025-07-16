import { useEffect, useState } from "react";

export default function NetworkMonitor() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        // Get existing logs when popup opens
        chrome.runtime.sendMessage(
            { type: "GET_NETWORK_LOGS" },
            (response) => {
                if (response && response.logs) {
                    setLogs(response.logs.reverse());
                }
            }
        );

        // Listen for new logs
        chrome.runtime.onMessage.addListener((msg) => {
            if (msg.type === "NETWORK_LOG_UPDATE") {
                setLogs((prev) => [msg.payload, ...prev.slice(0, 99)]);
            }
        });
    }, []);

    return (
        <div className="p-4 text-sm max-h-[500px] overflow-y-scroll bg-black text-white">
            <h2 className="text-lg font-bold mb-2">Network Requests</h2>
            <ul className="space-y-1">
                {logs.map((log, i) => (
                    <li key={i} className="border-b border-gray-600 pb-1">
                        <div><span className="text-green-400">{log.method}</span> {log.url}</div>
                        <div>Status: {log.statusCode} | Type: {log.type} | Time: {log.timeStamp}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
