import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Monitor } from 'lucide-react';

export default function HTMLPreview({ markdown, selectedStyle, styleCSS }) {
  // Removed the custom components that used react-syntax-highlighter

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b-4 border-black bg-pink-500 p-4">
        <div className="flex items-center gap-3">
          <Monitor className="w-6 h-6 text-white" />
          <h3 className="text-xl font-black text-white">LIVE PREVIEW</h3>
          <div className="ml-auto bg-white text-black px-3 py-1 border-2 border-black font-bold text-sm">
            {selectedStyle.toUpperCase()} STYLE
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-auto">
        <style>
          {`
            .preview-content {
              ${styleCSS}
              min-height: 100%;
              border: none !important;
            }
            .preview-content pre {
              white-space: pre-wrap;
              word-wrap: break-word;
            }
          `}
        </style>
        
        <div className="preview-content p-6">
          <ReactMarkdown>
            {markdown}
          </ReactMarkdown>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t-4 border-black bg-green-500 p-3">
        <div className="text-white font-bold text-sm">
          🔥 <strong>PREVIEW MODE:</strong> This is how your brutal markdown looks when converted!
        </div>
      </div>
    </div>
  );
}