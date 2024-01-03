const router = require("express").Router()
const jwt = require("jsonwebtoken")

const { SECRET } = require("../utils/config")
const User = require("../models/user")

router.post("/", async (req, res) => {
  const body = req.body

  const user = await User.findOne({
    where: {
      username: body.username,
    },
  })

  const correctPassword = body.password === "secret"

  if (!(user && correctPassword)) {
    return res.status(401).json({ error: "username or password is incorrect" })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  res.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = router
