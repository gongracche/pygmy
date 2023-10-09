module.exports = {
  "development": {
    "username": "pygmy",
    "password": "pygmy",
    "database": "pygmy",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "timezone": "+09:00"
  },
  "test": {
    "username": "pygmy",
    "password": "pygmy",
    "database": "pygmy",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "timezone": "+09:00"
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT,
    "timezone": process.env.DB_TIMEZONE
  }
}
