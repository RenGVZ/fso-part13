const router = require("express").Router()
const { Note } = require("../models")

router.get("/", async (req, res) => {
  const notes = await Note.findAll()
  // console.log('notes:', JSON.stringify(notes));
  res.json(notes)
})

router.post("/", async (req, res) => {
  try {
    const newNote = await Note.create(req.body)
    res.json(newNote)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

const noteFinder = async (req, res, next) => {
  req.note = await Note.findByPk(req.params.id)
  next()
}

router.get("/:id", noteFinder, async (req, res) => {
  if (req.note) {
    res.json(req.note)
  } else {
    res.status(400).end()
  }
})

router.delete("/:id", noteFinder, async (req, res) => {
  if (req.note) {
    await req.note.destroy()
  }
  res.status(204).end()
})

router.put("/:id", noteFinder, async (req, res) => {
  const important = req.body.important
  if (req.note) {
    req.note.important = important
    await req.note.save()
    res.json(req.note)
  } else {
    res.status(404).end()
  }
})

module.exports = router
