import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export async function getServerSideProps({ params }){
  const { slug } = params
  const res = await fetch(`http://localhost:3000/api/posts?slug=${slug}`)
  const post = await res.json().catch(()=>null)
  if(!post) return { notFound: true }
  return { props: { post } }
}

export default function PostPage({ post }){
  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
      <article>
        <h1>{post.title}</h1>
        <small>{new Date(post.createdAt).toLocaleString()}</small>
        <div style={{ marginTop: 20 }}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  )
}
