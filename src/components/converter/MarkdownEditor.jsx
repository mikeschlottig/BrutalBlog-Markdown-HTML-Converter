import React from 'react';
import { FileText } from 'lucide-react';

export default function MarkdownEditor({ value, onChange }) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b-4 border-black bg-yellow-400 p-4">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6" />
          <h3 className="text-xl font-black">MARKDOWN INPUT</h3>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 p-4">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-full resize-none border-4 border-black p-4 font-mono text-lg
                   focus:outline-none focus:border-pink-500 focus:shadow-[4px_4px_0px_#FF0099]
                   bg-white transition-all duration-200"
          placeholder="# Start typing your BRUTAL markdown here...

## This converter means BUSINESS!

Write your markdown and watch it transform with **MAXIMUM BRUTALITY**!"
          style={{
            fontFamily: 'Courier New, monospace',
            lineHeight: '1.6'
          }}
        />
      </div>

      {/* Footer Tips */}
      <div className="border-t-4 border-black bg-blue-500 p-3">
        <div className="text-white font-bold text-sm">
          💡 <strong>BRUTAL TIPS:</strong> Use ## for headings, **bold**, *italic*, `code`, [links](url), and ```code blocks```
        </div>
      </div>
    </div>
  );
}