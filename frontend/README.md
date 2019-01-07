# About GreenHorn

GreenHorn is webapp for HR department.

-----------
## Run GreenHorn
### Requirements
- Node.js v8.9.4 or later
- `yarn`
- MySQL
#### Installation
Go to frontend (and backend) folder and run
 ```sh
yarn install
```
This should install all packages.

### Database setup
Open config folder in backend. It's located in
 ```sh
backend/src/config/config.js
```
It should looks like this
```sh
module.exports = {
  "development": {
    "username": USERNAME,
    "password": PASSWORD,
    "database": DATABASE_NAME,
    "host": DATABASE_HOST,
    "dialect": "mysql"
  },
  "production": {
    "username": USERNAME,
    "password": PASSWORD,
    "database": DATABASE_NAME,
    "host": DATABASE_HOST,
    "dialect": "mysql"
  }
};
```
Edit this file to meet your database settings.
After this in backend root folder run this command.
 ```sh
yarn build
```
This should generate all tables for you.

## Runnig your local version
Go to both frontend and backend root folders. In both run
```sh
yarn
```
and then
```sh
yarn start
```