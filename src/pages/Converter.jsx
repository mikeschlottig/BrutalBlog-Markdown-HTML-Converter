
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Download, Copy, Eye, Code, Palette, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import MarkdownEditor from '../components/converter/MarkdownEditor';
import HTMLPreview from '../components/converter/HTMLPreview';
import StyleSelector from '../components/converter/StyleSelector';
import ExportPanel from '../components/converter/ExportPanel';

const initialMarkdown = `# Welcome to Brutal Markdown Converter! 🔥

This is a **NEO-BRUTALIST** markdown to HTML converter that doesn't mess around.

## Features That Slap Hard

- **Live Preview** - See your markdown transform instantly
- **Style Converter** - Multiple CSS themes to brutalize your content
- **Export Everything** - Download HTML, CSS, the whole package

### Code Blocks Are Supported

\`\`\`javascript
function brutalConverter() {
  console.log("Converting with MAXIMUM BRUTALITY!");
  return "HTML SMASHED!";
}
\`\`\`

### Lists Hit Different

1. First item **BOLD**
2. Second item *italic*
3. Third item ~~strikethrough~~

- Bullet point
- Another one
- And another

### Links and Images

[Check this brutal link](https://example.com)

> This is a blockquote that means business.

---

**Ready to convert some markdown?** Let's get BRUTAL! 💥`;

const stylePresets = {
  brutal: {
    name: 'Pure Brutal',
    css: `
      body { 
        font-family: 'Courier New', monospace; 
        background: #FFFF00; 
        color: #000; 
        border: 4px solid #000;
        margin: 0;
        padding: 20px;
      }
      h1, h2, h3 { 
        border: 4px solid #000; 
        background: #FF0099; 
        color: #FFF; 
        padding: 15px;
        transform: rotate(-1deg);
        box-shadow: 8px 8px 0px #000;
      }
      p { 
        border-left: 6px solid #0099FF;
        padding-left: 15px;
        line-height: 1.6;
      }
      code { 
        background: #000; 
        color: #FFFF00; 
        padding: 4px 8px;
        border: 2px solid #FF0099;
      }
      pre { 
        border: 4px solid #000;
        background: #000;
        padding: 20px;
        overflow-x: auto;
        box-shadow: 6px 6px 0px #FF0099;
      }
      blockquote {
        border: 4px solid #000;
        background: #0099FF;
        color: #FFF;
        padding: 20px;
        margin: 20px 0;
        transform: rotate(1deg);
        box-shadow: -6px 6px 0px #000;
      }
    `
  },
  cyber: {
    name: 'Cyber Punk',
    css: `
      body { 
        font-family: 'Courier New', monospace; 
        background: #000; 
        color: #00FF00; 
        border: 3px solid #00FF00;
        padding: 20px;
      }
      h1, h2, h3 { 
        border: 3px solid #FF0099; 
        background: #001100; 
        color: #00FF00; 
        padding: 12px;
        box-shadow: 5px 5px 0px #FF0099;
        text-transform: uppercase;
      }
      p { 
        border-left: 4px solid #00FFFF;
        padding-left: 12px;
      }
      code { 
        background: #001100; 
        color: #00FFFF; 
        padding: 3px 6px;
        border: 2px solid #00FF00;
      }
      pre { 
        border: 3px solid #00FF00;
        background: #001100;
        padding: 15px;
        box-shadow: 4px 4px 0px #00FFFF;
      }
    `
  },
  neon: {
    name: 'Neon Assault',
    css: `
      body { 
        font-family: 'Arial Black', sans-serif; 
        background: #FF0099; 
        color: #FFFF00; 
        border: 5px solid #000;
        padding: 25px;
      }
      h1, h2, h3 { 
        border: 4px solid #000; 
        background: #00FFFF; 
        color: #000; 
        padding: 18px;
        transform: rotate(-2deg);
        box-shadow: 10px 10px 0px #000;
        text-transform: uppercase;
      }
      p { 
        background: rgba(255, 255, 255, 0.1);
        padding: 15px;
        border: 3px solid #000;
        box-shadow: 3px 3px 0px #FFFF00;
      }
      code { 
        background: #000; 
        color: #00FFFF; 
        padding: 5px 10px;
        border: 3px solid #FFFF00;
      }
    `
  },
  glassmorphism: {
    name: 'Glassmorphism',
    css: `
      body { 
        font-family: 'Inter', -apple-system, sans-serif; 
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: #333;
        padding: 30px;
        backdrop-filter: blur(10px);
      }
      h1, h2, h3 { 
        background: rgba(255, 255, 255, 0.25);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 16px;
        padding: 20px;
        color: #1a1a1a;
        box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
        margin: 20px 0;
      }
      p { 
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(5px);
        border-radius: 12px;
        padding: 16px;
        border: 1px solid rgba(255, 255, 255, 0.15);
        line-height: 1.7;
        margin: 16px 0;
      }
      code { 
        background: rgba(0, 0, 0, 0.2); 
        color: #fff; 
        padding: 4px 8px;
        border-radius: 6px;
        backdrop-filter: blur(5px);
      }
      pre { 
        background: rgba(0, 0, 0, 0.3);
        border-radius: 12px;
        padding: 20px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        overflow-x: auto;
      }
      blockquote {
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(8px);
        border-left: 4px solid rgba(255, 255, 255, 0.5);
        border-radius: 0 12px 12px 0;
        padding: 20px;
        margin: 20px 0;
      }
    `
  },
  neumorphism: {
    name: 'Neumorphism',
    css: `
      body { 
        font-family: 'SF Pro Display', -apple-system, sans-serif; 
        background: #e0e5ec;
        color: #4a4a4a;
        padding: 30px;
      }
      h1, h2, h3 { 
        background: #e0e5ec;
        padding: 20px;
        margin: 20px 0;
        border-radius: 20px;
        box-shadow: 9px 9px 16px #a3b1c6, -9px -9px 16px #ffffff;
        color: #2d3748;
      }
      p { 
        background: #e0e5ec;
        padding: 16px;
        margin: 16px 0;
        border-radius: 12px;
        box-shadow: inset 6px 6px 12px #a3b1c6, inset -6px -6px 12px #ffffff;
        line-height: 1.6;
      }
      code { 
        background: #d1d9e6; 
        color: #2d3748; 
        padding: 4px 8px;
        border-radius: 8px;
        box-shadow: inset 2px 2px 4px #a3b1c6, inset -2px -2px 4px #ffffff;
      }
      pre { 
        background: #e0e5ec;
        border-radius: 16px;
        padding: 20px;
        box-shadow: inset 8px 8px 16px #a3b1c6, inset -8px -8px 16px #ffffff;
        overflow-x: auto;
      }
      blockquote {
        background: #e0e5ec;
        border-radius: 16px;
        padding: 20px;
        margin: 20px 0;
        box-shadow: 6px 6px 12px #a3b1c6, -6px -6px 12px #ffffff;
        border-left: 4px solid #667eea;
      }
    `
  },
  minimalist: {
    name: 'Minimalist',
    css: `
      body { 
        font-family: 'Helvetica Neue', Arial, sans-serif; 
        background: #ffffff;
        color: #333333;
        padding: 60px 40px;
        max-width: 800px;
        margin: 0 auto;
        line-height: 1.8;
      }
      h1, h2, h3 { 
        color: #1a1a1a;
        margin: 40px 0 20px 0;
        font-weight: 300;
        letter-spacing: -0.02em;
      }
      h1 { font-size: 2.5rem; }
      h2 { font-size: 2rem; }
      h3 { font-size: 1.5rem; }
      p { 
        margin: 20px 0;
        color: #555;
        font-size: 1.1rem;
      }
      code { 
        background: #f5f5f5; 
        color: #333; 
        padding: 2px 6px;
        border-radius: 3px;
        font-family: 'Monaco', 'Consolas', monospace;
        font-size: 0.9em;
      }
      pre { 
        background: #f8f8f8;
        border-left: 4px solid #e0e0e0;
        padding: 20px;
        margin: 30px 0;
        overflow-x: auto;
        border-radius: 0;
      }
      blockquote {
        border-left: 3px solid #ddd;
        padding-left: 24px;
        margin: 30px 0;
        color: #666;
        font-style: italic;
      }
    `
  },
  retro: {
    name: 'Retro Vibes',
    css: `
      body { 
        font-family: 'Georgia', serif; 
        background: #f4f1e8;
        color: #3c2e26;
        padding: 30px;
        background-image: radial-gradient(circle, #e8dcc6 1px, transparent 1px);
        background-size: 20px 20px;
      }
      h1, h2, h3 { 
        background: #d4af37;
        color: #2c1810;
        padding: 16px 24px;
        margin: 25px 0;
        border-radius: 0;
        box-shadow: 4px 4px 0px #b8941f;
        text-transform: uppercase;
        letter-spacing: 2px;
        font-weight: bold;
      }
      p { 
        background: #fff8dc;
        padding: 18px;
        margin: 18px 0;
        border: 2px solid #d2b48c;
        box-shadow: 2px 2px 0px #c19a6b;
        line-height: 1.7;
      }
      code { 
        background: #8b4513; 
        color: #ffd700; 
        padding: 4px 8px;
        border-radius: 0;
        font-family: 'Courier New', monospace;
      }
      pre { 
        background: #2f1b14;
        color: #f4a460;
        padding: 20px;
        border: 3px solid #8b4513;
        box-shadow: 3px 3px 0px #654321;
        overflow-x: auto;
        font-family: 'Courier New', monospace;
      }
      blockquote {
        background: #faebd7;
        border-left: 6px solid #cd853f;
        padding: 20px;
        margin: 25px 0;
        box-shadow: 2px 2px 0px #d2b48c;
        font-style: italic;
      }
    `
  },
  corporate: {
    name: 'Corporate Pro',
    css: `
      body { 
        font-family: 'Arial', sans-serif; 
        background: #ffffff;
        color: #2c3e50;
        padding: 40px;
        max-width: 900px;
        margin: 0 auto;
      }
      h1, h2, h3 { 
        color: #1e3a8a;
        margin: 30px 0 15px 0;
        padding: 0 0 10px 0;
        border-bottom: 2px solid #3b82f6;
        font-weight: 600;
      }
      h1 { font-size: 2.2rem; }
      h2 { font-size: 1.8rem; }
      h3 { font-size: 1.4rem; }
      p { 
        margin: 16px 0;
        color: #374151;
        line-height: 1.7;
        text-align: justify;
      }
      code { 
        background: #f1f5f9; 
        color: #1e40af; 
        padding: 3px 6px;
        border-radius: 4px;
        border: 1px solid #e2e8f0;
        font-family: 'Consolas', monospace;
      }
      pre { 
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-left: 4px solid #3b82f6;
        padding: 20px;
        margin: 20px 0;
        overflow-x: auto;
        border-radius: 6px;
      }
      blockquote {
        background: #eff6ff;
        border-left: 4px solid #2563eb;
        padding: 16px 20px;
        margin: 20px 0;
        border-radius: 0 6px 6px 0;
        color: #1e40af;
      }
      ul, ol {
        margin: 16px 0;
        padding-left: 30px;
      }
      li {
        margin: 8px 0;
        line-height: 1.6;
      }
    `
  }
};

export default function Converter() {
  const [markdown, setMarkdown] = useState(initialMarkdown);
  const [selectedStyle, setSelectedStyle] = useState('brutal');
  const [viewMode, setViewMode] = useState('split'); // 'editor', 'preview', 'split'

  const convertedHTML = React.useMemo(() => {
    // Simple markdown to HTML conversion for export
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Brutal Markdown Export</title>
  <style>
    ${stylePresets[selectedStyle].css}
  </style>
</head>
<body>
  ${markdown}
</body>
</html>`;
  }, [markdown, selectedStyle]);

  return (
    <div className="min-h-screen bg-yellow-400 p-6" style={{
      fontFamily: 'Courier New, monospace'
    }}>
      {/* Brutal Header */}
      <div className="border-4 border-black bg-pink-500 p-6 mb-6 transform -rotate-1 shadow-[8px_8px_0px_#000]">
        <h1 className="text-4xl font-black text-white mb-2 transform rotate-1">
          🔥 BRUTAL MARKDOWN CONVERTER 🔥
        </h1>
        <p className="text-white text-xl font-bold">
          Convert your markdown with MAXIMUM BRUTALITY!
        </p>
      </div>

      {/* Control Panel */}
      <div className="border-4 border-black bg-white p-4 mb-6 shadow-[6px_6px_0px_#000]">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <StyleSelector 
            styles={stylePresets}
            selectedStyle={selectedStyle}
            onStyleChange={setSelectedStyle}
          />
          
          <div className="flex gap-3">
            <Button
              onClick={() => setViewMode('editor')}
              className={`border-4 border-black font-black transform hover:scale-105 transition-transform ${
                viewMode === 'editor' 
                  ? 'bg-blue-500 text-white shadow-[4px_4px_0px_#000]' 
                  : 'bg-white text-black shadow-[2px_2px_0px_#000]'
              }`}
            >
              <Code className="w-5 h-5 mr-2" />
              EDITOR
            </Button>
            <Button
              onClick={() => setViewMode('preview')}
              className={`border-4 border-black font-black transform hover:scale-105 transition-transform ${
                viewMode === 'preview' 
                  ? 'bg-blue-500 text-white shadow-[4px_4px_0px_#000]' 
                  : 'bg-white text-black shadow-[2px_2px_0px_#000]'
              }`}
            >
              <Eye className="w-5 h-5 mr-2" />
              PREVIEW
            </Button>
            <Button
              onClick={() => setViewMode('split')}
              className={`border-4 border-black font-black transform hover:scale-105 transition-transform ${
                viewMode === 'split' 
                  ? 'bg-blue-500 text-white shadow-[4px_4px_0px_#000]' 
                  : 'bg-white text-black shadow-[2px_2px_0px_#000]'
              }`}
            >
              <Zap className="w-5 h-5 mr-2" />
              SPLIT
            </Button>
          </div>

          <ExportPanel 
            markdown={markdown}
            html={convertedHTML}
            css={stylePresets[selectedStyle].css}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="border-4 border-black bg-white shadow-[8px_8px_0px_#000]">
        {viewMode === 'split' && (
          <div className="grid lg:grid-cols-2 min-h-[600px]">
            <div className="border-r-4 border-black">
              <MarkdownEditor 
                value={markdown}
                onChange={setMarkdown}
              />
            </div>
            <HTMLPreview 
              markdown={markdown}
              selectedStyle={selectedStyle}
              styleCSS={stylePresets[selectedStyle].css}
            />
          </div>
        )}

        {viewMode === 'editor' && (
          <div className="min-h-[600px]">
            <MarkdownEditor 
              value={markdown}
              onChange={setMarkdown}
            />
          </div>
        )}

        {viewMode === 'preview' && (
          <div className="min-h-[600px]">
            <HTMLPreview 
              markdown={markdown}
              selectedStyle={selectedStyle}
              styleCSS={stylePresets[selectedStyle].css}
            />
          </div>
        )}
      </div>

      {/* Style Showcase */}
      <div className="mt-6 border-4 border-black bg-red-500 p-6 transform rotate-1 shadow-[6px_6px_0px_#000]">
        <h2 className="text-2xl font-black text-white mb-4">
          🎨 STYLE BRUTALITY LEVELS
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {Object.entries(stylePresets).map(([key, preset]) => (
            <div key={key} 
              className="border-3 border-black bg-white p-4 transform hover:scale-105 transition-transform cursor-pointer"
              onClick={() => setSelectedStyle(key)}
            >
              <h3 className="font-black text-lg mb-2">{preset.name}</h3>
              <div className="text-sm font-bold">
                {key === selectedStyle ? '✅ ACTIVE' : '👆 CLICK TO ACTIVATE'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
