'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import HighlightedCode from '@/components/HighlightedCode';
import { marked } from 'marked';

export default function ViewLibraryFile() {
  const params = useParams();
  const slugArray = Array.isArray(params?.slug)
    ? (params.slug as string[])
    : typeof params?.slug === 'string'
    ? [params.slug]
    : [];

  const decodedSegments = slugArray.map(decodeURIComponent);
  const relativePath = decodedSegments.join('/');
  const fileUrl = `/library/${relativePath}`;

  const [code, setCode] = useState('読み込み中...');
  const [markdownHtml, setMarkdownHtml] = useState('');

  useEffect(() => {
    fetch(fileUrl)
      .then((res) => (res.ok ? res.text() : Promise.reject('読み込み失敗')))
      .then(setCode)
      .catch(() => setCode('ファイルが見つかりません。'));

    const mdUrl = fileUrl.replace(/\.cpp$/, '.md');
    fetch(mdUrl)
      .then((res) => (res.ok ? res.text() : ''))
      .then((md) => {
        if (md) {
          setMarkdownHtml(marked(md));
        }
      });
  }, [fileUrl]);

  return (
    <main style={{ padding: '1rem' }}>
      <Link
        href="/library"
        style={{ color: '#0070f3', textDecoration: 'underline' }}
      >
        ← ライブラリ一覧に戻る
      </Link>

      <h1 style={{ fontSize: '1.25rem', margin: '1rem 0' }}>{relativePath}</h1>

      <HighlightedCode code={code} />

      {markdownHtml && (
        <section style={{ marginTop: '2rem' }}>
          <h2 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>📄 解説</h2>
          <div
            dangerouslySetInnerHTML={{ __html: markdownHtml }}
            style={{
              backgroundColor: '#fefefe',
              padding: '1rem',
              borderRadius: '0.5rem',
            }}
          />
        </section>
      )}
    </main>
  );
}
