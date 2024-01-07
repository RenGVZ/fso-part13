const router = require("express").Router()
const { Blog } = require("../models")
const { sequelize } = require("../utils/db")

router.get("/", async (req, res) => {
  try {
    const authors = await Blog.findAll({
      attributes: [
        "author",
        [sequelize.fn("COUNT", sequelize.col("author")), "article_count"],
        [sequelize.fn("SUM", sequelize.col("likes")), "total_likes"],
      ],
      group: ["author"],
      order: [[sequelize.fn("SUM", sequelize.col("likes")), "DESC"]],
    })
    res.json(authors)
  } catch {
    res.status(400).end()
  }
})

module.exports = router
