const router = require('koa-router')()
const packageInfo = require('../../package.json')
const testMysqlConn  = require('../db/test')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2...'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/api/db-check', async (ctx, next) => {
    const mysqlRes = await testMysqlConn()

    ctx.body = {
        errno: 0,
        data: {

            name: 'admin-server OK',
            version: packageInfo.version,
            // ENV, // 测试环境量变量
            mysqlConn: mysqlRes.length > 0,
        },
    }
})

module.exports = router
