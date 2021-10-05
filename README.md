# Todo frontend and backend

## Author: Leonidas Avdelas

### Description

Todo application based on React and Laravel. From Laravel we only use the API.
The idea is that every time you open the website you get a UUID for your session,
which you can use later to come back to the exact same todo list. I also skipped the
due date, because I didn't want to invest more time in it.

### Set Up

```bash
    cd ./frontend
    npm install
    npm start
    cd ../backend
    touch ./database/database.sqlite
    composer update
    php artisan migrate
    php artisan serve
```

### General Remarks

I cheated a bit on the backend, and wrote most of the request code inside the `/routes/api` file,
as understanding how the laravel system works was taking too much time.
