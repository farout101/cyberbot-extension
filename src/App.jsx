"use client"

import { useState } from "react"
import { MessageCircle, Shield, Eye, Network } from "lucide-react"
import Chatbot from "./components/Chatbot"
import WebsiteScanner from "./components/WebsiteScanner"
import NetworkMonitor from "./components/NetworkMonitor"
import "./App.css"

export default function App() {
  const [activeTab, setActiveTab] = useState ("chat")

  const tabs = [
    { id: "chat", label: "AI Chat", icon: MessageCircle, description: "Cybersecurity expert assistant" },
    { id: "security", label: "Security Scan", icon: Shield, description: "Website security analysis" },
    { id: "network_monitor", label: "Network Monitor", icon: Network, description: "Website network traffic" },
  ]

  return (
    <div className=" bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 h-screen">
      <div className="w-full h-screen mx-auto flex flex-col">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-t-2xl border border-white/20 p-6">
          {/* <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">CyberSec AI</h1>
              <p className="text-slate-300 text-sm">Complete cybersecurity analysis platform</p>
            </div>
          </div> */}

          {/* Tab Navigation */}
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={` cursor-pointer flex-1 p-4 rounded-xl transition-all duration-200 ${activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </div>
                {/* <p className="text-xs opacity-80">{tab.description}</p> */}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-black/30 backdrop-blur-lg border-x border-b border-white/20 rounded-b-2xl flex-1 flex flex-col min-h-0">
          {activeTab === "chat" && <Chatbot />}
          {activeTab === "security" && <WebsiteScanner />}
          {activeTab === "network_monitor" && <NetworkMonitor />}

        </div>

        {/* Footer */}
        <div className="mt-4 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Powered by Gemini AI • Secure & Private</span>
          </div>
        </div>
      </div>
    </div>
  )
}
