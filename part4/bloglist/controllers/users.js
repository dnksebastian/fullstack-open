const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)


  if (!username || !password) {
    return response.status(400).json({ error: 'username and password are required' })
  } else if (username.length < 3 || password.length < 3) {
    return response.status(400).json({ error: 'username and password must have at least 3 characters' })
  }

  const existingUser = await User.find({ username: username })

  if (existingUser) {
    return response.status(400).json({ error: 'user already existing' })
  }

  const user = new User({
    username,
    name,
    passwordHash,
  })

  try {
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch(err) {
    next(err)
  }
})

module.exports = usersRouter