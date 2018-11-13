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
ESPN_API='http://site.api.espn.com/apis/v2/scoreboard/header?showAirings=true&contentorigin=espn&lang=en&region=us&contentorigin=espn&_ceID=4379198'
```

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

## Postgres RDS Instance

https://us-west-2.console.aws.amazon.com/rds/home?region=us-west-2#dbinstance:id=nbaallstars

## API Deployment

```
sls deploy
```

## Database

https://us-west-2.console.aws.amazon.com/rds/home?region=us-west-2#dbinstance:id=nbaallstars