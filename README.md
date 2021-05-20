Найденные ошибки компиляции
1. Заменить var (устаревший) на const или let.
2. Проставить где надо [;] в конце блоков кода и строк.
3. models\game.js - экспорт функции сделать [module.exports].
4. Применить строгое сравнение [req.method === 'OPTIONS'] в файле middleware/validate-session.js
5. [module.exports = router;] Было routers. В файле controllers/gamecontroller.js.
6. controllers/usercontroller.js исправить одключение router на [const router = require('express').Router();]
7. установить модуль bcrypt [npm install bcrypt]
8. исправлени импорт модуля в файле controllers/gamecontroller.js
9. добавила параметр [operatorsAliases: false] в файле db.js конфигурация sequelize.
10. необходимо обновить версию "pg": "^8.0.3" в файле package.json, чтобы произошло соединение с базой данных
11. исправлены описания моделей для базы данных, добавлен импорт необходимых модулей. В файлах user.js, game.js. В результате созданы таблицы в базе данных.



Найденные ошибки логики приложения
1. в файле controllers/gamecontroller.js game->date.
function findSuccess(data) {
                res.status(200).json({
                    games: data,
                    message: "Data fetched."
                })

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
5. Разделение API на 3 слоя. services - сервис, repository - обращения к базе данных, route - обработка азпросов http. Переименование папки controller -> router
