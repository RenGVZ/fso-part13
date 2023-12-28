const router = require("express").Router()
const { Blog } = require("../models")

const { blogFinder } = require("../utils/middleware")

router.get("/", async (req, res, next) => {
  try {
    const blogs = await Blog.findAll()
    res.json(blogs)
  } catch (error) {
    next(error)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const newBlog = await Blog.create(req.body)
    res.status(201).json(newBlog)
  } catch (error) {
    next(error)
  }
})

router.get("/:id", blogFinder, (req, res, next) => {
  if (req.blog) {
    res.json(req.blog)
  } else {
    next()
  }
})

router.put("/:id", blogFinder, async (req, res, next) => {
  if (req.blog && req.body.likes) {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
  } else {
    next("isPut")
  }
})

router.delete("/:id", blogFinder, async (req, res, next) => {
  if (req.blog) {
    await req.blog.destroy()
    res.status(204).end()
  } else {
    next()
  }
})

module.exports = router
