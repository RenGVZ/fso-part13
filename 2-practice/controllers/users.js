const router = require("express").Router()
const { User, Blog, ReadingLists } = require("../models")

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ["userId"] },
    },
  })
  res.json(users)
})

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.get("/:id", async (req, res) => {
  const where = {}

  // if req.query.read, display only readingLists that have read = true
  if (req.query.read) {
    if (req.query.read === "true" || req.query.read === "false") {
      where.read = req.query.read === "true"
    } else {
      return res.status(400).json({ error: "invalid query" }).end()
    }
  }

  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: [""] },
    include: {
      model: Blog,
      as: "to_read",
      attributes: {
        exclude: ["userId", "createdAt", "updatedAt"],
      },
      through: {
        model: ReadingLists,
        attributes: ["read", "id"],
        where
      },
    },
  })
  if (user) {
    res.status(200).json(user)
  } else {
    res.status(400).json({ error: "no user found" }).end()
  }
})

module.exports = router
