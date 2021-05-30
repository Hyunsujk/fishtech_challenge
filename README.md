# Fishtech Challenge

To run the code locally, after `git clone` the repository, follow the steps below

### Environment variable

1. create `.env` file at the root of the project
2. Add your [WhoisXML](https://www.whoisxmlapi.com/) API key to .env file as `API_KEY`

### Client

1. run `cd client`
2. run `npm install`
3. run `npm start`

### Backend

1. run `cd backend`
2. run `npm install`
3. run `npm start`

Once client and backend are running, navigate to [http://localhost:3000](http://localhost:3000)

### Docker

Docker code is in `docker` branch.\
To run the code locally, run `docker-compose up`

The application is available on [http://localhost:3000](http://localhost:3000). But when the user clicks the search button, the user gets `localhost:3000 404 not found` error in console. I believe I need to add additional configuration to support the http call but since this is my first time setting up Docker, I had a hard time figuring out that part. Hence, left the code in docker branch just for a reference.
