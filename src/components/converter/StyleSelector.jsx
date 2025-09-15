import React from 'react';
import { Palette, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function StyleSelector({ styles, selectedStyle, onStyleChange }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Palette className="w-6 h-6" />
        <span className="font-black text-lg">BRUTAL STYLES:</span>
      </div>
      
      <div className="flex gap-2">
        {Object.entries(styles).map(([key, style]) => (
          <Button
            key={key}
            onClick={() => onStyleChange(key)}
            className={`border-4 border-black font-black transform hover:scale-105 transition-all duration-200 ${
              selectedStyle === key
                ? 'bg-red-500 text-white shadow-[4px_4px_0px_#000] rotate-1'
                : 'bg-white text-black shadow-[2px_2px_0px_#000] hover:shadow-[3px_3px_0px_#000]'
            }`}
          >
            <Zap className="w-4 h-4 mr-2" />
            {style.name.toUpperCase()}
          </Button>
        ))}
      </div>
    </div>
  );
}