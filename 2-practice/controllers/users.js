const router = require("express").Router()
const { User, Blog } = require("../models")

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
  const user = await User.findByPk(req.params.id)
  if (user) {
    res.status(200).json(user)
  } else {
    res.status(400).json({ error: "no user found" }).end()
  }
})

module.exports = router
