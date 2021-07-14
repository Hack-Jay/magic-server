/**
 * @description 封装 mongoose ，连接 mongodb
 */

const mongoose = require('mongoose')
const { mongodbConf } = require('../config/index')
const { isPrd } = require('../utils/env')

const { host, port, dbName, username, password } = mongodbConf

// 拼接连接字符串
let url
if (username && password) {
    url = `mongodb+srv://${username}:${password}@cluster0.e3q6m.mongodb.net/${dbName}?retryWrites=true&w=majority`
} else {
    url = `mongodb://${host}:${port}`
}

mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

// 开始连接（ 使用用户名和密码时，需要 `?authSource=admin` ）
mongoose.connect(`${url}/${dbName}?authSource=admin`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// 连接对象
const db = mongoose.connection

db.on('error', err => {
    console.error('mongoose connect error', err)
})

// // 演示注释掉即可
db.once('open', () => {
    // 用以测试数据库连接是否成功
    console.log('mongoose connect success')
})

module.exports = mongoose
