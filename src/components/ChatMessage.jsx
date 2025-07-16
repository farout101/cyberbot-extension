import React from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

function ChatMessage({ text }) {
    const rawHtml = marked.parse(text);
    const safeHtml = DOMPurify.sanitize(rawHtml);

    return (
        <div
            className="text-white text-sm leading-relaxed whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: safeHtml }}
        />
    );
}

export default ChatMessage;
