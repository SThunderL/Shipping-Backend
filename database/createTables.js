const mysql = require("mysql2/promise")
const { Sequelize } = require("sequelize")

async function initialise() {
    try {
        const host = process.env.host,
            port = process.env.PORT,
            user = process.env.dbUser,
            password = process.env.dbPassword,
            database = process.env.database

        var connection = await mysql.createConnection({
            host: host,
            user,
            password,
            // port: port
        })

        await connection.query(`CREATE DATABASE IF NOT EXISTS ${database};`)

        const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' })
        db.ShipmentDetials = require('./shipmentDetails.model')(sequelize)

        await sequelize.sync()
    } catch (err) {
        console.log(err)
    }
}

initialise()

module.exports = db = {}