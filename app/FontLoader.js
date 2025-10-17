"use client";
import { useEffect } from 'react';
import content from './content';

export default function FontLoader() {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Check if fonts are already loaded
    if (document.getElementById('custom-fonts-style')) return;

    // Generate and inject font-face CSS
    if (content.fonts?.uploadedFonts && content.fonts.uploadedFonts.length > 0) {
      const formatMap = {
        'woff2': 'woff2',
        'woff': 'woff',
        'ttf': 'truetype',
        'otf': 'opentype',
        'eot': 'embedded-opentype'
      };

      const fontFaceCSS = content.fonts.uploadedFonts.map(font => {
        return `
          @font-face {
            font-family: '${font.name}';
            src: url('${font.url}') format('${formatMap[font.format] || font.format}');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
          }
        `;
      }).join('\n');

      const styleElement = document.createElement('style');
      styleElement.id = 'custom-fonts-style';
      styleElement.innerHTML = fontFaceCSS;
      document.head.appendChild(styleElement);
    }
  }, []);

  return null;
}
