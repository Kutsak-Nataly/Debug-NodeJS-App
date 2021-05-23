const express = require('express');
const app = express();
const db = require('./db');
const user = require('./controllers/usercontroller');
const game = require('./controllers/gamecontroller');

const PORT = 4000;
const HOST = 'localhost';

// db.sync({ force: true })
// db.sync({ alter: true })
db.sync()
    .then(() => console.log('Database sync was successful'))
    .catch(err => console.log(err));

app.use(express.json());
app.use('/api/auth', user);
app.use(require('./middleware/validate-session'));
app.use('/api/game', game);

app.listen(PORT, HOST,() => {
    console.log(`App is listening on http://${HOST}:${PORT}`);
});

module.exports = app;
