const jwt = require('jsonwebtoken')
const prisma = require('../../../lib/prisma')
const cookie = require('cookie')

const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'devsecret'

function isAuthed(req){
  const c = req.headers.cookie
  if(!c) return false
  const parsed = cookie.parse(c || '')
  const token = parsed.admin_token
  if(!token) return false
  try{ jwt.verify(token, ADMIN_JWT_SECRET); return true } catch(e){ return false }
}

export default async function handler(req, res){
  if(req.method === 'GET'){
    const { slug } = req.query
    if(slug){
      const post = await prisma.post.findFirst({ where: { slug } })
      return res.status(200).json(post)
    }
    const posts = await prisma.post.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' } })
    return res.status(200).json(posts)
  }

  if(req.method === 'POST'){
    if(!isAuthed(req)) return res.status(401).json({ error: 'unauthorized' })
    const { title, slug, content } = req.body
    if(!title || !slug) return res.status(400).json({ error: 'missing' })
    try{
      const post = await prisma.post.create({ data: { title, slug, content, published: true } })
      return res.status(201).json(post)
    }catch(e){
      console.error(e)
      return res.status(500).json({ error: 'db' })
    }
  }

  res.setHeader('Allow', 'GET,POST')
  res.status(405).end()
}
