const router = require("express").Router()
const { User } = require("../models")
const { tokenExtractor } = require("../utils/middleware")
const { ReadingList } = require("../models")

router.get("/", async (req, res) => {
  const readingLists = await ReadingList.findAll({})
  if (readingLists) {
    res.status(200).json(readingLists)
  } else {
    res.status(401).json({ error: "readinglists not found" })
  }
})

router.post("/", tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const newReadingList = await ReadingList.create({
      ...req.body,
      userId: user.id
    })
    res.status(200).json(newReadingList)
  } catch (error) {
    return res.status(401).json({ error })
  }
})

module.exports = router
