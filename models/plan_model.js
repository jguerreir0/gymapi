const { DataTypes } = require("sequelize");
const connection = require('../src/database/connection');




const PlanModel = connection.define("plan", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    url: DataTypes.TEXT,
    user_id: {
        type: DataTypes.INTEGER,
        references: 'users',
        referencesKey: 'id'
    }
})

module.exports = PlanModel



