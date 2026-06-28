const jwt = require('jsonwebtoken')
const cookie = require('cookie')

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme'
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'devsecret'

export default function handler(req, res){
  if(req.method !== 'POST') return res.status(405).end()
  const { password } = req.body
  if(!password || password !== ADMIN_PASSWORD) return res.status(401).json({ error: 'invalid' })
  const token = jwt.sign({ role: 'admin' }, ADMIN_JWT_SECRET, { expiresIn: '7d' })
  res.setHeader('Set-Cookie', cookie.serialize('admin_token', token, { httpOnly: true, path: '/', maxAge: 60*60*24*7 }))
  res.status(200).json({ ok: true })
}
