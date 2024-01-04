require("dotenv").config()

module.exports = {
  DATABASE_CONNECTION: process.env.DATABASE_CONNECTION,
  PORT: process.env.PORT || 3001,
  SECRET: process.env.SECRET,
}
