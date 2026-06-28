import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function Admin(){
  const [posts, setPosts] = useState([])
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState('# 新文章')
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [error, setError] = useState('')

  useEffect(()=>{ fetch('/api/posts').then(r=>r.json()).then(setPosts).catch(()=>{}) },[])

  async function login(e){
    e.preventDefault()
    setError('')
    const res = await fetch('/api/admin/login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ password }) })
    if(res.ok){ setAuthed(true); setPassword('') }
    else { setError('登录失败，检查密码') }
  }

  async function create(e){
    e.preventDefault()
    const res = await fetch('/api/posts', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ title, slug, content }) })
    if(res.ok){
      const p = await res.json()
      setPosts([p, ...posts])
      setTitle(''); setSlug(''); setContent('# 新文章')
    } else {
      alert('创建失败')
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: 'auto', padding: 20 }}>
      <h1>管理后台</h1>
      {!authed && (
        <form onSubmit={login} style={{ marginBottom: 20 }}>
          <label>管理员密码（环境变量 ADMIN_PASSWORD）</label><br/>
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" style={{ width: '100%', padding:8 }} />
          <button style={{ marginTop:8 }}>登录</button>
          {error && <div style={{ color:'red' }}>{error}</div>}
        </form>
      )}

      {authed && (
        <section>
          <h2>新文章</h2>
          <form onSubmit={create}>
            <input placeholder="标题" value={title} onChange={e=>setTitle(e.target.value)} style={{ width:'100%', padding:8, marginBottom:8 }} />
            <input placeholder="slug（URL）" value={slug} onChange={e=>setSlug(e.target.value)} style={{ width:'100%', padding:8, marginBottom:8 }} />
            <textarea value={content} onChange={e=>setContent(e.target.value)} rows={10} style={{ width:'100%', padding:8 }} />
            <div style={{ marginTop:8 }}>
              <button>保存并发布</button>
            </div>
          </form>

          <h2 style={{ marginTop: 24 }}>已发布文章</h2>
          <ul>
            {posts.map(p => (
              <li key={p.id}>{p.title} — <small>{p.slug}</small></li>
            ))}
          </ul>
        </section>
      )}

      <div style={{ marginTop: 24 }}>
        <h2>预览</h2>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </div>
  )
}
