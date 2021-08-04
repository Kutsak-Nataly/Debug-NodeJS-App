const {DataTypes} = require('sequelize');
const sequelize = require('../db');
const Game = require('./game');

const User = sequelize.define('User', {

        full_name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        }
    },
    {timestamps: false}
);
User.hasMany(Game, {foreignKey: 'owner_id'});

module.exports = User;
