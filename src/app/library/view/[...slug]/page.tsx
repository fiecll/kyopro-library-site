import fs from 'fs';
import path from 'path';
import HighlightedCode from '@/components/HighlightedCode';
import Link from 'next/link'; // ← Next.jsのリンクコンポーネント

interface Props {
  params: { slug: string[] };
}

export default function ViewLibraryFile({ params }: Props) {
  const decodedSegments = params.slug.map(decodeURIComponent);
  const relativePath = decodedSegments.join('/');
  const fullPath = path.join(process.cwd(), 'library', relativePath);

  let code = 'ファイルが見つかりません。';
  try {
    code = fs.readFileSync(fullPath, 'utf8');
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
    </main>
  );
}


