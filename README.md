## Mailfit Test task

## To start the app on your local machine

- Create a firebase web app
- Put all the firebase web app data into firebaseConfig at firebase/index.ts

```
yarn install
yarn dev
```

### To start the app over https

```
docker-compose build
docker-compose run --service-ports nginx
```
