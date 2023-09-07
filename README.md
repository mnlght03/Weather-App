# Weather Web App

## Описание

Веб приложение с возможностью просмотра прогноза погоды на неделю в любом городе

# Стэк:
### Frontend
Vue JS, Pinia

Для сохранение сторов был использован плагин pinia-plugin-persistedstate

Для автоматических импортов компонентов была использована зависимость unplugin-vue-components 

Также для более быстрой разработки за основу для стилей был взят готовый шаблон на bootstrap:

https://bootstrapmade.com/maundy-free-coming-soon-bootstrap-theme/

### Backend
Nest JS, Mongo DB

## Реализованный Функционал 
### Frontend
- Поиск любого города на любом языке
- Отображение прогноза на 5 дней вперед
- История поиска с возможностью очистить (хранится локально на клиенте)
- Ограничение на 15 запросов в час для неавторизованных пользователей на клиенте
- Добавление и удаление города в список избранных (хранится на клиенте)

### Backend
- Регистрация и аутентификация пользователя по jwt токенам
- Хранение списка истории поиска и избранных городов пользователя в базе данных
- Управление списком избранных городов пользователя

## Запуск
Для запуска клиента в тестовом режиме из папки /client напишите:

    npm run dev

Для запуска сервера из папки /server напишите:

    npm run start


## Нереализованный Функционал
### Frontend
- Сохранение appState в localStorage для того, чтобы ограничение на количество запросов сохранялось от сессии к сессии
- Оживление окна регистрации и входа
- Pinia Store для данных о пользователе
- Привязка к серверу
- Использование данных об избранных городах и истории поиска пользователя из его профиля, вместо локального стора, если пользователь авторизован
- Автоматическое изменение названия города при поиске ( сейчас, если название города введено неполностью, приложение может найти данные о погоде, но название города будет отображаться так, как его ввел пользователь )
- Модальное окно с предложением авторизоваться или зарегистрироваться, если исчерпан лимит запросов для неваторизованного пользователя ( сейчас просто блокируются запросы и выводится сообщение в консоль )

### Backend
- AuthGuard'ы с проверкой прав пользователя на редактирование данных об избранных городах и истории поиска (чтобы айди редактируемого пользователя соответствовал айди из jwt)
- Возвращение полных данных о пользователе со списком его избранных городов и истории поиска ( сейчас списки избранных городов и история поиска состоят из айди соответствующих записей ) 
