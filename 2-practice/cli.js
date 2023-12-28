const Blog = require("./models/Blog")

const getBlogs = async () => {
  const blogs = await Blog.findAll()
  blogs.forEach((blog) => {
    console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`)
  })
  return blogs
}

getBlogs()
