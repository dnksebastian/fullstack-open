const mongoose = require('mongoose')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (_request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  if(blogs.length === 0){
    return response.json({ blogs: 'no blogs found' })
    // should probably be a 404 response
  }

  response.json(blogs)
})


blogsRouter.post('/', async (request, response) => {

  const body = request.body

  const user = request.user

  if(!user) {
    return response.status(401).json({ error: 'User unauthorized' })
  }

  // const blog = new Blog({ ...request.body, author: user.name, user: user._id, likes: body.likes || 0 })
  const blog = new Blog({ ...request.body, author: body.author || user.name, user: user._id, likes: body.likes || 0 })

  // if(request.body.title === undefined || request.body.url === undefined) {
  //   return response.status(400).json({ error: 'missing blog data' })
  // }
  // below is alternative solution which uses mongoose schema validation


  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  const resObj = await savedBlog.populate('user', { username: 1, name: 1 })

  response.status(201).json(resObj)

})

blogsRouter.delete('/:id', async (request, response) => {

  const id = request.params.id

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: 'Invalid blog ID' })
  }

  const blog = await Blog.findById(id)

  if(!blog) {
    return response.status(410).end()
  }

  const user = request.user

  if (user && blog.user.toString() === user.id) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'Deleting post not possible - user unauthorized' })
  }


})

blogsRouter.put('/:id', async (request, response) => {

  const body = request.body
  const user = request.user

  const bloguser = request.body.user

  if (!user) {
    return response.status(401).json({ error: 'User unauthorized' })
  }

  const userID = new mongoose.Types.ObjectId(bloguser.id)

  const post = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: userID
  }

  const updatedPost = await Blog.findByIdAndUpdate(request.params.id, post, { new: true })
  const populatedPost = await updatedPost.populate('user', { username: 1, name: 1 })
  response.json(populatedPost)

})

module.exports = blogsRouter