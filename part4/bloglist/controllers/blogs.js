const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (_request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})


blogsRouter.post('/', async (request, response) => {

  const body = request.body


  const user = await User.findOne({})
  // const blog = new Blog({ ...request.body, user: user.id, likes: request.body.likes || 0 })
  const blog = new Blog({ ...request.body, user: user.id, likes: body.likes || 0 })

  // if(request.body.title === undefined || request.body.url === undefined) {
  //   return response.status(400).json({ error: 'missing blog data' })
  // }
  // below is alternative solution which uses mongoose schema validation


  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (err) {
    response.status(400).json({ error: 'missing blog data' })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (error) {
    response.status(410).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {

  const body = request.body

  const post = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  try {
    const updatedPost = await Blog.findByIdAndUpdate(request.params.id, post, { new: true })
    response.json(updatedPost)
  }
  catch (error) {
    response.status(400).end()
  }
})


module.exports = blogsRouter