import React from 'react';
import { Download, Copy, FileCode, Palette, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ExportPanel({ markdown, html, css }) {
  const downloadFile = (content, filename, type) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Could add a toast notification here
  };

  const exportHTML = () => {
    downloadFile(html, 'brutal-export.html', 'text/html');
  };

  const exportCSS = () => {
    downloadFile(css, 'brutal-styles.css', 'text/css');
  };

  const exportMarkdown = () => {
    downloadFile(markdown, 'brutal-content.md', 'text/markdown');
  };

  const copyHTML = () => {
    copyToClipboard(html);
  };

  const copyCSS = () => {
    copyToClipboard(css);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="font-black text-lg mr-2">EXPORT:</span>
      
      {/* Download Buttons */}
      <Button
        onClick={exportHTML}
        className="border-4 border-black bg-green-500 text-white font-black
                 shadow-[3px_3px_0px_#000] hover:shadow-[4px_4px_0px_#000]
                 hover:scale-105 transform transition-all duration-200"
      >
        <Globe className="w-4 h-4 mr-2" />
        HTML
      </Button>

      <Button
        onClick={exportCSS}
        className="border-4 border-black bg-blue-500 text-white font-black
                 shadow-[3px_3px_0px_#000] hover:shadow-[4px_4px_0px_#000]
                 hover:scale-105 transform transition-all duration-200"
      >
        <Palette className="w-4 h-4 mr-2" />
        CSS
      </Button>

      <Button
        onClick={exportMarkdown}
        className="border-4 border-black bg-purple-500 text-white font-black
                 shadow-[3px_3px_0px_#000] hover:shadow-[4px_4px_0px_#000]
                 hover:scale-105 transform transition-all duration-200"
      >
        <FileCode className="w-4 h-4 mr-2" />
        MD
      </Button>

      {/* Copy Buttons */}
      <div className="h-6 w-px bg-black mx-2"></div>
      
      <Button
        onClick={copyHTML}
        className="border-4 border-black bg-yellow-400 text-black font-black
                 shadow-[3px_3px_0px_#000] hover:shadow-[4px_4px_0px_#000]
                 hover:scale-105 transform transition-all duration-200"
      >
        <Copy className="w-4 h-4" />
      </Button>

      <Button
        onClick={copyCSS}
        className="border-4 border-black bg-pink-500 text-white font-black
                 shadow-[3px_3px_0px_#000] hover:shadow-[4px_4px_0px_#000]
                 hover:scale-105 transform transition-all duration-200"
      >
        <Copy className="w-4 h-4" />
      </Button>
    </div>
  );
}