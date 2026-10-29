# Подбор автозапчастей

Клиент для веб-сервиса «Проценка» Favorit Parts. Поиск идёт в два шага: по артикулу показываются производители, после выбора производителя — предложения и аналоги.

## Запуск

```bash
npm install
npm run dev
```

Ключ API берётся из `VITE_FAVORIT_API_KEY`. Если переменная не задана, используется демонстрационный ключ из документации сервиса. Свой ключ можно положить в `.env` по образцу `.env.example`.

## Стек

React, Redux Toolkit, Bootstrap 5, Vite. Без TypeScript.

Слои: `app`, `pages`, `widgets`, `features`, `entities`, `shared`.
