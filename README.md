Найденные ошибки компиляции
3. Строка 39: models\game.js - экспорт функции добавить [module.exports].
4. Строка 5: middleware/validate-session.js - применить строгое сравнение [req.method === 'OPTIONS'] 
5. Строка 116: controllers/gamecontroller.js - [module.exports = router;] Было routers.
6. Строка 5: controllers/usercontroller.js - исправить подключение router на [const router = require('express').Router();]
7. Строка 2: controllers/usercontroller.js - Ошибка подключения bcryptjs. Исправлено на [const bcrypt = require('bcryptjs');]. bcryptjs - является чистым JS, а другой имеет привязки к родной крипто-библиотеке C++.
8. Строка 2: controllers/gamecontroller.js - Исправлен импорт модуля.passwordHash
10. Строка 19: package.json. Обновление до свежей версии "sequelize": "^6.6.2" убрало сообщение об ошибкаъ про устаревшие параметры.
Deprecation warning for String based operators

Найденные ошибки логики приложения
1. Строка 7: controllers/gamecontroller.js - Заменить date->game.
[function findSuccess(data) {
                res.status(200).json({
                    games: data,
                    message: "Data fetched."
                })]
2. Строка 25: models\user.js - В модель таблиц добавить связь один к многим (один пользователь может иметь много игр). Связующий ключ owner_id [User.hasMany(Game, {foreignKey: 'owner_id'});]
                                                         
3. Строка 13: user.js passwordHash лолжен соответствовать назвнанию поля Строка 11: usercontroller.js
4. Строка 3: models\game.js - Добавлен импорт  модуля User в модуль Game. В файлах user.js, game.js. В результате созданы таблицы в базе данных.                                                        });]
5. Строка 18: package.json. необходимо обновить версию "pg": "^8.0.3" в файле package.json, чтобы подключиться к базе
6. По всему файлу много строк usercontroller.js. bcrypt.compare - асинхронная функция, возвращает промис. Оформить надо соответсвенно. 
7. Строка 13: app.js. Добавить номер порт [app.listen(4000, function () {
        console.log("App is listening on 4000");
    });]
8. Строка 11: package.json - Удалить строку
Express.js версии 4.16 не требуется устанавливать модуль промежуточного программного обеспечения body-parser.
Строка 9: app.js - app.use(require('body-parser').json()) заменить на app.use(express.json()). Удалить из зависомостей 
bodyParser был снова добавлен в Express в версии 4.16.0, потому что люди хотели, чтобы он был связан с Express, как и раньше.
Это означает, что вам не нужно bodyParser.json() больше использовать, если вы используете последнюю версию.
express.json() Вместо этого можно использовать.
9. Строки 9, ... usercontroller.js. Удалить из req -> user. Должно быть так [full_name: req.body.full_name,
                                                   username: req.body.username,
                                                   passwordhash: bcrypt.hashSync(req.body.password, 10),
                                                   email: req.body.email,
                                                   ....]
10. Строка 11: user.js  -  Добавить  unique: true. Поле username должно быть уникальным,
- потому что тогда можно будет регистрировать бесконечное множество пользователей с одинаковыми данными,
- потому что при авторизации из базы берется один пользователь для сверки с введенными данными по имени User.findOne.
11. Строка 32. usercontroller.js - Исправить req.body [req.body.user.password -> req.body.password]
12. Строки 40 и 43 в моем варианте приложения. В файл gamecontroller.js добавлена функция извлечения User.id из токена сессии, потому что для создания игры User.id в роутах не передаются [app.use('/api/game', game);],
поэтому User.id можно получать расшифровкой токена. Ведь в токен передается id юзера. В файле gamecontroller.js создана функция function userId(token),
которая вызывается в тех роутах, где требуется [owner_id: req.body.user.id].
13. Строка 11: package.json - удалить из зависимостей "body-parser": "^1.19.0"
                                                   
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
4. Много строк: controllers/usercontroller.js. Более локоничное и оптимальное написание вместо функций с названиями в файле. Для game аналогично[.then(user => {
                                                         let token = jwt.sign({id: user.id}, 'lets_play_sum_games_man', {expiresIn: 60 * 60 * 24});
                                                         res.status(200).json({
                                                             user: user,
                                                             token: token
                                                         })
                                                     })
                                                     .catch(err => res.status(500).send(err.message));]]
5. по всем файлам много строк. Заменить var (устаревший) на const или let.
6. по всем файлам много строк. Проставить где надо [;] в конце блоков кода и строк. 
7. Вынести константы и переиспользованные данные в отдельный файл (constant.js). Коды для шифрования = tokenKey,
заменить данной переменой коды в файлах:
controllers/usercontroller.js
controllers/gamecontroller.js
middleware/validate-session.js
 





