const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main(){
  await prisma.post.create({
    data: {
      title: '欢迎来到我的博客',
      slug: 'welcome',
      content: '# 你好\n\n这是示例文章。编辑或删除它来开始你的博客。',
      published: true
    }
  })
  console.log('Seed finished.')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
