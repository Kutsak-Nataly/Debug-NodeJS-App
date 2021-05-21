Найденные ошибки компиляции
1. по всем файлам много строк. Заменить var (устаревший) на const или let.
2. по всем файлам много строк. Проставить где надо [;] в конце блоков кода и строк.
3. Строка 39: models\game.js - экспорт функции добавить [module.exports].
4. Строка 5: middleware/validate-session.js - применить строгое сравнение [req.method === 'OPTIONS'] 
5. Строка 116: controllers/gamecontroller.js - [module.exports = router;] Было routers.
6. Строка 5: controllers/usercontroller.js - исправить подключение router на [const router = require('express').Router();]
7. Строка 2: controllers/usercontroller.js - Ошибка подключения bcryptjs. Исправлено на [const bcrypt = require('bcryptjs');]. bcryptjs - является чистым JS, а другой имеет привязки к родной крипто-библиотеке C++.
8. Строка 2: controllers/gamecontroller.js - Исправлен импорт модуля.
9. Строка 6: db.js - Для устранения сообщения об предупреждении про устаревшие параметра. Добавлено [operatorsAliases: false].
Deprecation warning for String based operators

Найденные ошибки логики приложения
1. Строка 7: controllers/gamecontroller.js - Заменить date->game.
[function findSuccess(data) {
                res.status(200).json({
                    games: data,
                    message: "Data fetched."
                })]
2. Строка 4: models\game.js, models\user.js - Внести параметр уникальности (id) в модели user, game.     [id: {
                                                             type: DataTypes.NUMBER,
                                                             primaryKey: true,
                                                         },]
                                                         
3. Строка 38: models\game.js - Описать связанность таблиц данных user->game.
Связь один к многим, у одного user может быть много game [Game.belongsTo(User, {
                                                              foreignKey: 'owner_id',
                                                              sourceKey: User.id,
4. Строка 3: models\game.js - Добавлен импорт  модуля User в модуль Game. В файлах user.js, game.js. В результате созданы таблицы в базе данных.                                                        });]
5. Строка 18: package.json. необходимо обновить версию "pg": "^8.0.3" в файле package.json, чтобы подключиться к базе
6. По всему файлу много строк usercontroller.js. bcrypt.compare - асинхронная функция, возвращает промис. Оформить надо соответсвенно. 
7. Строка 13: app.js. Добавить номер порт [app.listen(4000, function () {
        console.log("App is listening on 4000");
    });]
8. Строка 9: app.js. Для обработки запроса HTTP POST в Express.js версии 4 и выше необходимо установить модуль промежуточного программного
обеспечения под названием body-parser. body-parser извлекает всю основную часть входящего потока запросов и выставляет ее на req.body. исправить на [app.use(require('body-parser').json());]

Рефактор кода
1. Много строк в файлах controllers/usercontroller.js, models/user.js. Переименовали по рекомендации литнера [passwordhash -> passwordHash]
2. Строка 8: db.js. Оформить более компактно и оптимально код
[sequelize
       .authenticate()
       .then(() => console.log("Connected to DB"))
       .catch((err) => console.log(`Error: ${err}`));]
3. Строка 8: app.js. Добавить then, оформить правильно промис
[db.sync()
       .then(result => console.log(result))
       .catch(err => console.log(err));]
5. Много строк: controllers/usercontroller.js. Более локоничное и оптимальное написание вместо функций с названиями в файле. Для game аналогично[.then(user => {
                                                         let token = jwt.sign({id: user.id}, 'lets_play_sum_games_man', {expiresIn: 60 * 60 * 24});
                                                         res.status(200).json({
                                                             user: user,
                                                             token: token
                                                         })
                                                     })
                                                     .catch(err => res.status(500).send(err.message));]]




