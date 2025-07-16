import { useState } from "react"
import { Send, Shield, Bot, User } from "lucide-react"
import axios from "axios"
import ChatMessage from "./components/ChatMessage"

export default function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function sendMessage() {
    if (!input.trim()) return

    // Add user's message
    setMessages((prev) => [...prev, { sender: "You", text: input }]);
    setInput('');


    const prompt = `You are a cybersecurity expert. Answer the following question in detail: "${input}"`

    setIsLoading(true)
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // Ensure your API key set in .env file
    try {
      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const reply = res.data.candidates[0].content.parts[0].text;
      setMessages((prev) => [...prev, { sender: 'Bot', text: reply }]);

    } catch (error) {
      console.error("Error fetching response:", error?.response?.data || error.message);
      // setResponse("Error fetching response. Try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyPress(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    // <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 flex items-center justify-center">
      <div className="w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl" >
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-t-2xl border border-white/20 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
            <h1 className="text-2xl font-bold text-white">Woody's CyberAI</h1>
              <p className="text-slate-300 text-sm">Your cybersecurity expert assistant</p>
            </div>
          </div>
        </div>

        {/* Chat */}
        <div className="bg-white/5 backdrop-blur-lg border-x border-white/20 h-96 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <div className="p-4 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Bot className="w-8 h-8 text-blue-400" />
              </div>
              <p className="text-slate-300 text-lg mb-2">Welcome to Woody's CyberAI</p>
              <p className="text-slate-400 text-sm">
                Ask me anything about cybersecurity, threats, best practices, and more!
              </p>
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.sender === "You" ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-3 max-w-[80%] ${m.sender === "You" ? "flex-row-reverse" : "flex-row"}`}>
                <div
                  className={`p-2 rounded-full flex-shrink-0 h-fit ${m.sender === "You"
                    ? "bg-gradient-to-r from-green-500 to-emerald-600"
                    : "bg-gradient-to-r from-blue-500 to-purple-600"
                    }`}
                >
                  {m.sender === "You" ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div
                  className={`p-4 rounded-2xl ${m.sender === "You"
                    ? "bg-gradient-to-r from-green-500/20 to-emerald-600/20 border border-green-500/30"
                    : "bg-white/10 border border-white/20"
                    }`}
                >
                  <ChatMessage text={m.text} />
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start">
            <div className="p-2 rounded-full h-fit bg-gradient-to-r from-blue-500 to-purple-600 flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white/10 border border-white/20 p-4 rounded-2xl">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <span className="text-slate-300 text-sm">Analyzing your question…</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="bg-white/10 backdrop-blur-lg rounded-b-2xl border border-white/20 p-4">
          <div className="flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about cybersecurity threats, best practices, tools…"
              disabled={isLoading}
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Powered by Gemini AI • Secure & Private</span>
          </div>
        </div>
      </div>
    // </div>
  )
}
