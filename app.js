const express = require('express');
const app = express();
const db = require('./db');
const user = require('./router/usercontroller');
const game = require('./router/gamecontroller');

db.sync()
    .then(() => console.log('Database sync was successful'))
    .catch(err => console.log(err));
app.use(require('body-parser'));
app.use('/api/auth', user);
app.use(require('./middleware/validate-session'));
app.use('/api/game', game);
app.listen(function () {
    console.log("App is listening on 4000");
});
