export default function Home() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
        📘 Kyopro Library
      </h1>
      <p style={{ marginBottom: '1rem' }}>
        競技プログラミングで使用するアルゴリズム・データ構造ライブラリをまとめたサイトです。
      </p>
      <a
        href="/library"
        style={{
          display: 'inline-block',
          padding: '0.5rem 1rem',
          backgroundColor: '#0070f3',
          color: 'white',
          borderRadius: '0.5rem',
          textDecoration: 'none',
        }}
      >
        ライブラリ一覧を見る →
      </a>
    </main>
  );
}
