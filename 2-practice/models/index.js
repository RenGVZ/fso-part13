const Blog = require("./blog")
const User = require("./user")
const ReadingLists = require("./reading_lists")

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingLists, as: "to_read" })
Blog.belongsToMany(User, { through: ReadingLists, as: "added_to_users_list"  })

module.exports = { Blog, User, ReadingLists }
