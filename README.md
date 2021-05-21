Найденные ошибки компиляции
1. Заменить var (устаревший) на const или let.
2. Проставить где надо [;] в конце блоков кода и строк.
3. models\game.js - экспорт функции сделать [module.exports].
4. Применить строгое сравнение [req.method === 'OPTIONS'] в файле middleware/validate-session.js
5. [module.exports = router;] Было routers. В файле controllers/gamecontroller.js.
6. controllers/usercontroller.js исправить подключение router на [const router = require('express').Router();]
7. Ошибка подключения bcryptjs в файле controllers/usercontroller.js. Исправлено на [const bcrypt = require('bcryptjs');]. bcryptjs - является чистым JS, а другой имеет привязки к родной крипто-библиотеке C++.
8. исправлени импорт модуля в файле controllers/gamecontroller.js
9. добавила параметр [operatorsAliases: false] в файле db.js конфигурация sequelize.
10. Добавить номер потра в файле app.js [app.listen(4000, function () {
        console.log("App is listening on 4000");
    });]
11. исправлены описания моделей для базы данных, добавлен импорт необходимых модулей. В файлах user.js, game.js. В результате созданы таблицы в базе данных.
Добавена реализация уникальности строк и связь один к многим (user->game)
12. Для обработки запроса HTTP POST в Express.js версии 4 и выше необходимо установить модуль промежуточного программного обеспечения под названием body-parser.
body-parser извлекает всю основную часть входящего потока запросов и выставляет ее на req.body. В файле app.js исправить на [app.use(require('body-parser').json());]



Найденные ошибки логики приложения
1. в файле controllers/gamecontroller.js заменить date->game.
[function findSuccess(data) {
                res.status(200).json({
                    games: data,
                    message: "Data fetched."
                })]
2. Внести параметр уникальности в модели user, game.     [id: {
                                                             type: DataTypes.NUMBER,
                                                             primaryKey: true,
                                                         },]
                                                         
3. Описать связанность таблиц данных user->game. Связь один к многим, у одного user может быть много game [User.hasMany(Game);]
4. Разделение API на 3 слоя. services - сервис, repository - обращения к базе данных, route - обработка азпросов http. Переименование папки controller -> router
5. Хэширование привести к асинхронному виду в файле usercontroller.js. Исправить [bcrypt.hashSync -> bcrypt.hash]
6. необходимо обновить версию "pg": "^8.0.3" в файле package.json
7. bcrypt.compare - асинхронная функция, возвращает промис. Оформить надо соответсвенно. Исправления в файле usercontroller.js

Рефактор кода
1. Переименовали по рекомендации литнера [passwordhash -> passwordHash]
2. sequelize
       .authenticate()
       .then(() => console.log("Connected to DB"))
       .catch((err) => console.log(`Error: ${err}`));
3. в файел app.js
db.sync()
       .then(result => console.log(result))
       .catch(err => console.log(err));
4. Переименование функции signupFail по рекомендации eslint. -> function signUpFail(err)
5. Более локоничное и оптимальное написание вместо функций с названиями в файле controllers/usercontroller.js . Для game аналогично[        .then(user => {
                                                         let token = jwt.sign({id: user.id}, 'lets_play_sum_games_man', {expiresIn: 60 * 60 * 24});
                                                         res.status(200).json({
                                                             user: user,
                                                             token: token
                                                         })
                                                     })
                                                     .catch(err => res.status(500).send(err.message));]]
5. Для устранения путаницы с bcrypt, переменную переименовать bcrypt ->bcryptjs в файле controllers/usercontroller.js. bcryptjs является чистым JS, а bcrypt имеет привязки к родной крипто-библиотеке C++.
Для приложений на NODEJS оптимальнее выбратьbcryptjsю 





