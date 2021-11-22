const Sequelize = require('sequelize')

const database = process.env.DATABASE
const username = process.env.USER
const password = process.env.PASSWORD
const host = process.env.HOST
const dialect = process.env.DIALECT
const dbPort = process.env.DBPORT

const connection = new Sequelize(database, username, password, {
    host,
    port,
    dialect
})


module.exports = connection