require("dotenv").config()
const { Sequelize, Model, DataTypes, BOOLEAN } = require("sequelize")
const express = require("express")
const app = express()
app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL)

class Note extends Model {}
Note.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    important: {
      type: DataTypes.BOOLEAN,
    },
    date: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "note",
  }
)
Note.sync()

app.get("/api/notes", async (req, res) => {
  const notes = await Note.findAll()
  // console.log('notes:', JSON.stringify(notes));
  res.json(notes)
})

app.get("/api/notes/:id", async (req, res) => {
  const id = req.params.id
  const result = await Note.findByPk(id)
  if (result) {
    res.json(result)
  } else {
    res.status(400).end()
  }
})

app.put("/api/notes/:id", async (req, res) => {
  const id = req.params.id
  const important = req.body.important
  const updatedNote = await Note.findByPk(id)
  if(updatedNote) {
    updatedNote.important = important
    await updatedNote.save()
    res.json(updatedNote)
  } else {
    res.status(400).end()
  }
})

app.post("/api/notes", async (req, res) => {
  try {
    const newNote = await Note.create(req.body)
    return res.json(newNote)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

const PORT = process.env.port || 3001

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})
