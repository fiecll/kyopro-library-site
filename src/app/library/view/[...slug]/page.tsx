import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import Link from 'next/link';
import HighlightedCode from '@/components/HighlightedCode';

export default function ViewLibraryFile({
  params,
}: {
  params: { slug: string[] };
}) {
  const decodedSegments = params.slug.map(decodeURIComponent);
  const relativePath = decodedSegments.join('/');
  const fullPath = path.join(process.cwd(), 'library', relativePath);

  let code = 'ファイルが見つかりません。';
  let markdownHtml = '';
  try {
    code = fs.readFileSync(fullPath, 'utf8');
    const mdPath = fullPath.replace(/\.cpp$/, '.md');
    if (fs.existsSync(mdPath)) {
      const rawMd = fs.readFileSync(mdPath, 'utf8');
      markdownHtml = marked(mdPath);
    }
  } catch (e) {
    console.error(e);
  }

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
