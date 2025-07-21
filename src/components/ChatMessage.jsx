import React from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

function ChatMessage({ text, sender }) {
  const rawHtml = marked.parse(text);
  const safeHtml = DOMPurify.sanitize(rawHtml);

  return (
    <div
      className={`p-4 rounded-2xl ${
        sender === "You"
          ? "bg-gradient-to-r from-green-500/20 to-emerald-600/20 border border-green-500/30"
          : ""
      }`}
    >
      <div
        className={`text-white text-sm ${
          sender === "You" ? "leading-relaxed" : ""
        } whitespace-pre-wrap`}
        dangerouslySetInnerHTML={{ __html: safeHtml }}
      />
    </div>
  );
}

export default ChatMessage;
