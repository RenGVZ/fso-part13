const router = require("express").Router()
const { User } = require("../models")
const { tokenExtractor } = require("../utils/middleware")
const { ReadingLists } = require("../models")

router.get("/", async (req, res) => {
  const readingLists = await ReadingLists.findAll({})
  if (readingLists) {
    res.status(200).json(readingLists)
  } else {
    res.status(401).json({ error: "readinglists not found" })
  }
})

router.post("/", tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const newReadingList = await ReadingLists.create({
      ...req.body,
      userId: user.id,
    })
    res.status(200).json(newReadingList)
  } catch (error) {
    return res.status(401).json({ error })
  }
})

router.put("/:id", tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const readingList = await ReadingLists.findByPk(req.params.id)
    if (
      user &&
      readingList &&
      user.id === readingList.userId &&
      "read" in req.body
    ) {
      readingList.read = req.body.read
      await readingList.save()
      return res.json(readingList)
    } else {
      throw new Error("User, reading list, or read property not found")
    }
  } catch (error) {
    res.status(400).json({ error }).end()
  }
})

module.exports = router
