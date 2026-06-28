import Link from 'next/link'
import React from 'react'

export async function getServerSideProps(){
  const res = await fetch('http://localhost:3000/api/posts')
  const posts = await res.json().catch(()=>[])
  return { props: { posts } }
}

export default function Home({ posts }){
  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
      <header>
        <h1>我的博客</h1>
        <p><Link href="/admin">管理后台</Link></p>
      </header>
      <main>
        {posts.length === 0 && <p>没有文章</p>}
        <ul>
          {posts.map(p => (
            <li key={p.id} style={{ marginBottom: 16 }}>
              <h2><Link href={`/post/${p.slug}`}>{p.title}</Link></h2>
              <small>{new Date(p.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
