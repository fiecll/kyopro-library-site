import fs from 'fs';
import path from 'path';

const LIBRARY_DIR = path.join(process.cwd(), 'library');

function getCppFiles(dir: string, base = ''): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(base, entry.name);

    if (entry.isDirectory()) {
      return getCppFiles(fullPath, relativePath);
    } else if (entry.name.endsWith('.cpp')) {
      return [relativePath];
    } else {
      return [];
    }
  });
}

export default function LibraryPage() {
  const files = getCppFiles(LIBRARY_DIR);

  return (
    <main style={{ padding: '1rem' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
        競プロ ライブラリ
      </h1>
      <ul>
        {files.map((file) => (
          <li key={file}>
            <a href={`/library/view/${file}`}>{file}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}
