const mysql = require('mysql2/promise');
const { mysqlConf } = require('../config/envs/dev')

async function testMysqlConn() {
    try {
        const connection = await mysql.createConnection(mysqlConf)
        console.log('connection', connection)
        const [rows] = await connection.execute('SELECT * FROM magic.user;;')
        return rows
    } catch (error) {
        console.log(error)
    }
}

module.exports = testMysqlConn