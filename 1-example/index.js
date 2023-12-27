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

app.get("/api/notes", async (req, res) => {
  const notes = await Note.findAll()
  res.json(notes)
})

app.post("/api/notes", async (req, res) => {
  console.log("req.body:", req.body)
  try {
    const newNote = await Note.create(req.body)
    return res.json(newNote)
  } catch (error) {
    return res.status(400).json({error})
  }
})

const PORT = process.env.port || 3001

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})
