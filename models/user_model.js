const { DataTypes } = require("sequelize");
const connection = require('../src/database/connection');




const UserModel = connection.define("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: DataTypes.TEXT,
    first_name: DataTypes.TEXT,
    last_name: DataTypes.TEXT,
    password: DataTypes.TEXT,
    img_avatar: {
        type: DataTypes.TEXT,
        defaultValue: null,
    },
})

module.exports = UserModel



