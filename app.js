const express = require('express');
const app = express();
const db = require('./db');
const user = require('./controllers/usercontroller');
const game = require('./controllers/gamecontroller');

db.sync()
    .then(() => console.log('Database sync was successful'))
    .catch(err => console.log(err));
app.use(require('body-parser').json());
app.use('/api/auth', user);
app.use(require('./middleware/validate-session'));
app.use('/api/game', game);
app.listen(4000, function () {
    console.log("App is listening on 4000");
});

module.exports = app;
