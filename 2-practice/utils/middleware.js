const { Blog, User } = require("../models")
const jwt = require("jsonwebtoken")
const { SECRET } = require("../utils/config")

const tokenExtractor = async (req, res, next) => {
  const auth = req.get("authorization")
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(auth.substring(7), SECRET)
    } catch {
      return res.status(401).json({ error: "token invalid" })
    }
  } else {
    return res.status(401).json({ error: "no token provided" })
  }
  next()
}

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id, {
    include: {
      model: User,
    },
  })
  next()
}

const errorHandler = async (error, req, res, next) => {
  if (error === "isPut") {
    res
      .status(404)
      .json({ error: "Error: blog not found, or likes not present in request" })
      .end()
  } else if (error) {
    return res.status(400).json({ error }).end()
  } else {
    console.log("no error")
    return res.status(400).end()
  }
}

const unknownEndpoint = (req, res) => {
  console.log("in unknown endpoint")
  res.status(404).send({ error: "unknown endpoint" })
}

module.exports = { tokenExtractor, blogFinder, errorHandler, unknownEndpoint }
