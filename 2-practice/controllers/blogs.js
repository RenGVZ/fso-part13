const router = require("express").Router()
const { Blog, User } = require("../models")
const { Op } = require("sequelize")

const { blogFinder, tokenExtractor } = require("../utils/middleware")
const { sequelize } = require("../utils/db")

router.get("/", async (req, res, next) => {
  let where = {}

  if (req.query.search) {
    where = {
      [Op.or]: [
        { title: { [Op.like]: `%${req.query.search}%` } },
        { author: { [Op.like]: `%${req.query.search}%` } },
      ],
    }
  }

  try {
    const blogs = await Blog.findAll({
      attributes: { exclude: ["userId"] },
      include: { model: User, attributes: ["name", "username"] },
      where,
      order: [["likes", "DESC"]],
    })
    res.json(blogs)
  } catch (error) {
    next(error)
  }
})

router.post("/", tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const newBlog = await Blog.create({
      ...req.body,
      userId: user.id,
      date: new Date(),
    })
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

router.delete("/:id", tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.findByPk(req.params.id)
    if (blog.userId === user.id) {
      await blog.destroy()
      res.status(204).end()
    } else {
      next("no matching user and blog found")
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
