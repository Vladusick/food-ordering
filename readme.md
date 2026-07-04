# Food Ordering

## Структура проекта

```text
food-ordering/
├── backend/      # NestJS API
├── frontend/     # React приложение
├── .gitignore
└── README.md
```

## Правила работы

### Git

Все Git-команды выполняются **из корня проекта**:

```bash
git status
git add .
git commit -m "..."
git push
```

### Backend

Все команды для NestJS выполняются из папки `backend`:

```bash
cd backend

npm install
npm run start:dev
npm test
```

### Frontend

Все команды React выполняются из папки `frontend`:

```bash
cd frontend

npm install
npm run dev
npm run build
```

## Стек проекта

### Backend

* NestJS
* TypeScript
* PostgreSQL
* TypeORM

### Frontend

* React
* TypeScript
* Vite

## MVP

* Просмотр списка блюд
* Категории блюд упрощенно
* Просмотр информации о блюде
* Добавление блюда в корзину
* Изменение количества блюд в корзине
* Удаление блюда из корзины
* Оформление заказа
* Адаптивный интерфейс только под мобильные устройства
* Стоп лист

---

## Планируется после MVP

* Продвигутые категории (sticky, observer)
* Регистрация и авторизация пользователей
* Личный кабинет
* История заказов
* Статусы заказа
* Панель администратора
* Управление блюдами
* Поиск и фильтрация
* Загрузка изображений
* Отзывы и рейтинг
* Избранные блюда
* Промокоды и скидки
* Онлайн-оплата
* Уведомления
