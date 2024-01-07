const { Sequelize } = require("sequelize")
const { DATABASE_CONNECTION } = require("./config")
const { Umzug, SequelizeStorage } = require("umzug")

const sequelize = new Sequelize(DATABASE_CONNECTION, {
  dialect: "postgres",
})

const runMigrations = async () => {
  const migrator = new Umzug(migrationConfig)
  const migrations = await migrator.up()
  console.log("migrations are up to date", {
    files: migrations.map((mig) => mig.name),
  })
}

const migrationConfig = {
  migrations: {
    glob: "migrations/*.js",
  },
  storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
  context: sequelize.getQueryInterface(),
  logger: console,
}

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    console.log("connected to the database")
  } catch (err) {
    console.log("failed to connect to the database")
    return process.exit(1)
  }

  return null
}

module.exports = { connectToDatabase, sequelize }
