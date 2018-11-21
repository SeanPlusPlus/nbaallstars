# All Stars

## Getting Started 

```
git clone
yarn install
yarn validate 
```

Create a `.env` file in the root of the repo and add this line:

```
NODE_ENV=development
PG_USERNAME=allstarsadmin
PG_PASSWORD=nba
PG_DATABASE=nbaallstars
PG_HOST=localhost
```

## Postgres

Make sure you have postgres [installed on your local machine](https://gist.github.com/ibraheem4/ce5ccd3e4d7a65589ce84f2a3b7c23a3).

1. Create an admin account to connect to our database

```
$ createuser -P -s -e allstarsadmin 
```

You will be prompted to create a password here. For the sake of this example, let's go with the password `nba`.

2. Create the database

```
$ psql -d template1
template1=# CREATE DATABASE nbaallstars WITH OWNER = allstarsadmin;
```

3. Create the `users` table for our new database and enter test records

_Open a new terminal here_

```
$ node
> const User = require('./model')
> User.sync()
> const sean = { id: 'foo', username: 'SeanPlusPlus' }
> const kane = { id: 'bar', username: 'Kanestapler' }
> User.findOrCreate({ where: sean })
> User.findOrCreate({ where: kane })
```

4. View the records in our database

_Go back to the terminal with our psql connection_

```
template1=# \c nbaallstars allstarsadmin
nbaallstars=# SELECT * FROM "users";
```

_* Note * If you ever want to drop all the tables in your database and start from scratch_

```
node Models/reset.js
```

Also, if you reset the db and then restart the server the tables will now get re-created.

## Express API

```
yarn server
```

You can now hit the api locally here:

http://localhost:3001/api

## React App

```
yarn start
```

Your browser should open with the React app here:

http://localhost:3000/


## Husky

We are using [husky](https://github.com/typicode/husky) on this project, so make sure that your repo passes the linter and tests before pushing.

## Lambda

https://us-west-2.console.aws.amazon.com/lambda/home?region=us-west-2#/functions/nbaallstars-dev-app?tab=graph

## API Endpoint - Sports

https://o3zt8boj60.execute-api.us-west-2.amazonaws.com/dev/api

## API Endpoint - Users

https://o3zt8boj60.execute-api.us-west-2.amazonaws.com/dev/api/users

## API Endpoint - Players

https://o3zt8boj60.execute-api.us-west-2.amazonaws.com/dev/api/players

## Postgres RDS Instance

https://us-west-2.console.aws.amazon.com/rds/home?region=us-west-2#dbinstance:id=nbaallstars

## API Deployment

```
sls deploy
```

## Adding data to the database 

to add players:

```
node Models/addPlayers.js
```