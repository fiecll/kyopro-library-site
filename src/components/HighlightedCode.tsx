'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState } from 'react';

type Props = {
  code: string;
  language?: string;
};

export default function HighlightedCode({ code, language = 'cpp' }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // 1.5秒後に戻す
    } catch (err) {
      console.error('コピー失敗:', err);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={handleCopy}
        style={{
          position: 'absolute',
          top: '0.5rem',
          right: '0.5rem',
          background: '#0070f3',
          color: 'white',
          border: 'none',
          padding: '0.3rem 0.6rem',
          borderRadius: '0.3rem',
          fontSize: '0.8rem',
          cursor: 'pointer',
        }}
      >
        {copied ? '✅ コピー済' : '📋 コピー'}
      </button>
      <SyntaxHighlighter language={language} style={darcula} wrapLongLines>
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
