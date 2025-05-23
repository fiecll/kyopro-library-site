'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function LibraryListPage() {
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    fetch('/library/library-list.json')
      .then((res) => res.json())
      .then(setFiles)
      .catch(() => setFiles([]));
  }, []);

  return (
    <main style={{ padding: '1rem' }}>
      <h1>ライブラリ一覧</h1>
      <ul>
        {files.map((file) => (
          <li key={file}>
            <Link href={`/library/view/${encodeURIComponent(file)}`}>
              {file}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
