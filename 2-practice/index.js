const express = require("express")
const app = express()
const { PORT } = require("./utils/config")
const { connectToDatabase } = require("./utils/db")

const { errorHandler, unknownEndpoint } = require("./utils/middleware")

const BlogsRouter = require("./controllers/blogs")
const UserRouter = require("./controllers/users")
const LoginRouter = require("./controllers/login")
const AuthorRouter = require("./controllers/authors")

app.use(express.json())

app.use("/api/blogs", BlogsRouter)
app.use("/api/users", UserRouter)
app.use("/api/login", LoginRouter)
app.use("/api/authors", AuthorRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
  })
}

start()
