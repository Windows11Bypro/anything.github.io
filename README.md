# anything.github.io - Blog

这是一个基于 Next.js + SQLite + Prisma 的简单可扩展博客模板，包含：

- 列表页 /
- 文章页 /post/[slug]
- 管理后台 /admin（使用 POST /api/admin/login 登录，环境变量 ADMIN_PASSWORD 和 ADMIN_JWT_SECRET）
- 后端 API /api/posts

快速开始：

1. 克隆仓库并切换到刚才的分支：
   git checkout feature/full-blog-nextjs
2. 安装依赖：
   npm install
3. 生成 Prisma client 并推送 schema：
   npx prisma generate
   npx prisma db push
4. 运行种子数据：
   npm run seed
5. 设置本地环境变量（可选）：
   在 .env.local 中设置 ADMIN_PASSWORD 和 ADMIN_JWT_SECRET
6. 运行开发：
   npm run dev

部署建议：
- 推荐：Vercel。记得在 Vercel 中设置环境变量 ADMIN_PASSWORD 和 ADMIN_JWT_SECRET。部署后，先运行 prisma db push 或使用 Vercel's "Deploy Hook" + migrations（生产请迁移到 PostgreSQL 或 MySQL）。

如需我继续：
- 我可以把管理员登录改成 NextAuth（支持 GitHub 登录）
- 添加图片上传到 GitHub Releases 或第三方存储
- 增加编辑器（像 React-Quill 或 Tiptap）与草稿/分类/标签

