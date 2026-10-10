# Колено

SPA-таймер для интервальных и реабилитационных тренировок колена. Данные хранятся в `localStorage`, бэкенд не нужен.

```bash
npm install
npm run dev
```

Откройте приложение на телефоне в том же Wi‑Fi: Vite покажет Network URL в терминале. Экран не гаснет во время тренировки (Screen Wake Lock), фазы озвучиваются через Web Speech API, сигналы идут через Web Audio API.

## GitHub Pages

После пуша в `main` GitHub Action сам собирает проект и публикует его на:

https://logolevel.github.io/knee/

Один раз в репозитории включите Pages: **Settings → Pages → Source → GitHub Actions**.
