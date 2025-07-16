import { useEffect, useState } from "react"
import { Search, Shield, Clock } from "lucide-react"
import SecurityReport from "./SecurityReport";
import Loader from "./Loader";

// export default function WebsiteScanner() {
//     const [url, setUrl] = useState("")
//     const [scanType, setScanType] = useState("security")
//     const [isScanning, setIsScanning] = useState(false)
//     const [results, setResults] = useState([])

//     async function scanWebsite() {
//         if (!url.trim()) return

//         // Basic URL validation
//         let formattedUrl = url.trim()
//         if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
//             formattedUrl = "https://" + formattedUrl
//         }

//         setIsScanning(true)
//         try {
//             const res = await fetch("/api/scan", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ url: formattedUrl, scanType }),
//             })
//             const data = await res.json()

//             if (!res.ok) throw new Error(data.error || "Scan failed")

//             const newResult = {
//                 url: formattedUrl,
//                 analysis: data.analysis,
//                 timestamp: new Date(),
//                 scanType,
//             }

//             setResults((prev) => [newResult, ...prev])
//             setUrl("")
//         } catch (err) {
//             console.error(err)
//             const errorResult = {
//                 url: formattedUrl,
//                 analysis: "Sorry, the scan failed. Please check the URL and try again.",
//                 timestamp: new Date(),
//                 scanType,
//             }
//             setResults((prev) => [errorResult, ...prev])
//         } finally {
//             setIsScanning(false)
//         }
//     }

//     function handleKeyPress(e) {
//         if (e.key === "Enter") {
//             e.preventDefault()
//             scanWebsite()
//         }
//     }

//     return (
//         <div className="h-full flex flex-col">
//             {/* Scanner Controls */}
//             <div className="p-4 border-b border-white/20">
//                 <div className="space-y-4">

//                     {/* URL Input */}
//                     <div className="flex gap-3">
//                         <input
//                             type="url"
//                             value={url}
//                             onChange={(e) => setUrl(e.target.value)}
//                             onKeyDown={handleKeyPress}
//                             placeholder="Enter website URL (e.g., example.com)"
//                             disabled={isScanning}
//                             className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
//                         />
//                         <button
//                             onClick={scanWebsite}
//                             disabled={!url.trim() || isScanning}
//                             className={`px-6 py-3 rounded-xl text-white font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl ${scanType === "security"
//                                     ? "bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700"
//                                     : "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
//                                 } disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed`}
//                         >
//                             {isScanning ? (
//                                 <div className="flex items-center gap-2">
//                                     <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                                     Scanning...
//                                 </div>
//                             ) : (
//                                 <div className="flex items-center gap-2">
//                                     <Search className="w-4 h-4" />
//                                     Scan
//                                 </div>
//                             )}
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Results */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-4">
//                 {results.length === 0 && !isScanning && (
//                     <div className="text-center py-12">
//                         <div
//                             className={`p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center ${scanType === "security"
//                                     ? "bg-gradient-to-r from-red-500/20 to-orange-600/20"
//                                     : "bg-gradient-to-r from-purple-500/20 to-pink-600/20"
//                                 }`}
//                         >
//                             <Shield className={`w-8 h-8 ${scanType === "security" ? "text-red-400" : "text-purple-400"}`} />
//                         </div>
//                         <p className="text-slate-300 text-lg mb-2">
//                             {scanType === "security" ? "Website Security Scanner" : "Website Privacy Scanner"}
//                         </p>
//                         <p className="text-slate-400 text-sm">
//                             {scanType === "security"
//                                 ? "Enter a website URL to analyze its security posture and vulnerabilities"
//                                 : "Enter a website URL to analyze its privacy practices and data collection"}
//                         </p>
//                     </div>
//                 )}

//                 {results.map((result, index) => (
//                     <div key={index} className="bg-white/10 border border-white/20 rounded-2xl p-6">
//                         <div className="flex items-center justify-between mb-4">
//                             <div className="flex items-center gap-3">
//                                 <div
//                                     className={`p-2 rounded-lg ${result.scanType === "security"
//                                             ? "bg-gradient-to-r from-red-500 to-orange-600"
//                                             : "bg-gradient-to-r from-purple-500 to-pink-600"
//                                         }`}
//                                 >
//                                     <Shield className="w-4 h-4 text-white" />
//                                 </div>
//                                 <div>
//                                     <h3 className="text-white font-medium">{result.url}</h3>
//                                     <p className="text-slate-400 text-sm flex items-center gap-1">
//                                         <Clock className="w-3 h-3" />
//                                         {result.timestamp.toLocaleString()}
//                                     </p>
//                                 </div>
//                             </div>
//                             <span
//                                 className={`px-3 py-1 rounded-full text-xs font-medium ${result.scanType === "security"
//                                         ? "bg-red-500/20 text-red-300 border border-red-500/30"
//                                         : "bg-purple-500/20 text-purple-300 border border-purple-500/30"
//                                     }`}
//                             >
//                                 {result.scanType === "security" ? "Security" : "Privacy"} Scan
//                             </span>
//                         </div>
//                         <div className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">{result.analysis}</div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

export default function WebsiteScanner() {
    const [scanResult, setScanResult] = useState(null);

    useEffect(() => {
        // Listen for scan results
        if (window.chrome && chrome.runtime && chrome.runtime.sendMessage) {
            chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
                if (msg.type === 'SECURITY_SCAN_RESULT') {
                    setScanResult(msg.payload);
                    console.log(msg);
                }
            });

            // Optionally trigger scan again
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    files: ['content.js']
                });
            });
        }
    }, []);

    if (!scanResult) return <div className="text-white w-full flex flex-col items-center justify-center p-10 "><Loader />
        <p className=" animate-pulse">Scanning...</p></div>;

    return (
        <SecurityReport report={scanResult} />
    );
}