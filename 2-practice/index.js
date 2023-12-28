require("dotenv").config()
const express = require("express")
const app = express()
app.use(express.json())
const Blog = require("./models/Blog")

app.get("/api/blogs", async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

app.post("/api/blogs", async (req, res) => {
  console.log("req.body", req.body)
  try {
    const newBlog = await Blog.create(req.body)
    return res.status(201).json(newBlog)
  } catch (error) {
    console.log("error:", error)
    return res.status(400).json({ error })
  }
})

app.delete("/api/blogs/:id", async (req, res) => {
  const id = req.params.id
  try {
    await Blog.destroy({
      where: {
        id,
      },
    })
    return res.status(204).end()
  } catch (error) {
    console.log("error:", error)
    return res.status(400).json({ error }).end()
  }
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})
