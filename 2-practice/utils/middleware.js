const { Blog } = require("../models")

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

const errorHandler = async (error, req, res, next) => {
  if (error === "isPut") {
    res.status(404).json({ error: "Error: blog not found, or likes not present in request" }).end()
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

module.exports = { blogFinder, errorHandler, unknownEndpoint }
