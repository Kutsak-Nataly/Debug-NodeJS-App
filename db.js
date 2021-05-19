const Sequelize = require('sequelize');

const sequelize = new Sequelize('gamedb', 'postgres', 'Rovdo-3894127', {
    host: 'localhost',
    dialect: 'postgres',
    port: '5433',
    operatorsAliases: false
});

sequelize
    .authenticate()
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(`Error: ${err}`));

module.exports = sequelize;
