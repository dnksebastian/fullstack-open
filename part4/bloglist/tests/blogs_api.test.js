const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const app = require('../app')
const api = supertest(app)

const User = require('../models/user')
const Blog = require('../models/blog')


// Helper functions & data

const availableBlogs = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const initialBlogsDB = [{
  title: 'Example Blog',
  url: 'http://www.google.com',
  likes: 7
}, {
  title: 'Some other blog',
  url: 'http://www.bing.com',
  likes: 15
}, {
  title: 'Another Blog',
  url: 'http://www.web.dev',
  likes: 20
}]

const testUser = supertest.agent(app)
let userToken = null

const createTestUser = async () => {

  const testUser = {
    username: 'testuser',
    name: 'Test User',
    password: 'example'
  }

  await api
    .post('/api/users')
    .send(testUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)
}

const loginTestUser = async () => {

  const loggedUser = await testUser
    .post('/api/login')
    .send({ username: 'testuser', password: 'example' })
    .expect(200)
    .expect('Content-Type', /application\/json/)

  userToken = loggedUser.body.token
}

describe('reading post data', () => {

  beforeAll(async () => {
    await createTestUser()
    console.log('test user created')
    await loginTestUser()
    console.log('test user logged in')
    await Blog.insertMany(initialBlogsDB)
  })

  test('api returns blog list as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('uid of blogposts is named id', async () => {
    const response = await api.get('/api/blogs')
    const bloglist = response.body

    //   bloglist.forEach((blog) => {
    //     expect(blog.id).toBeDefined()
    //   })
    // - not sure if this is efficient so below is alternative version

    const firstPost = bloglist[0]
    const lastPost = bloglist[bloglist.length - 1]
    const testArr = [firstPost, lastPost]
    testArr.forEach((blogpost) => {
      expect(blogpost.id).toBeDefined()
    })
  })

  afterAll( async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
  })

})

describe('adding new posts', () => {

  beforeAll(async () => {
    await createTestUser()
    await loginTestUser()
  })

  test('new post can be added correctly', async () => {

    const newPost = {
      title: 'Test blog',
      url: 'http://www.google.com',
      likes: 10
    }

    const initialBlogsInDB = await availableBlogs()

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${userToken}`)
      .send(newPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const updatedBlogsInDB = await availableBlogs()
    expect(updatedBlogsInDB).toHaveLength(initialBlogsInDB.length + 1)
    expect(updatedBlogsInDB.at(-1)).toMatchObject(newPost)

  })


  test('if likes property is missing it defaults to 0', async () => {
    const newPostWithoutLikes = {
      title: 'Blog without likes',
      url: 'http://www.google.com',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${userToken}`)
      .send(newPostWithoutLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsInDB = await availableBlogs()
    expect(blogsInDB.at(-1).likes).toBe(0)
  })

  test('if title property is missing from req data backend response is 400 bad request', async () => {
    const newPostWithoutTitle = {
      url: 'http://www.google.com',
      likes: 8
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${userToken}`)
      .send(newPostWithoutTitle)
      .expect(400)
      .expect('Content-Type', /application\/json/)

  })

  test('if url property is missing from req data backend response is 400 bad request', async () => {
    const newPostWithoutURL = {
      title: 'Blog without URL',
      likes: 9
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${userToken}`)
      .send(newPostWithoutURL)
      .expect(400)
      .expect('Content-Type', /application\/json/)

  })

  test('adding a blog fails with 401 status response if token not provided', async () => {
    const newPost = {
      title: 'Example post',
      url: 'https://www.google.com',
      likes: 20
    }

    await api
      .post('/api/blogs')
      .send(newPost)
      .expect(401)
      .expect('Content-Type', /application\/json/)

  })

  afterAll( async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
  })

})


describe('deleting posts', () => {

  beforeAll(async () => {
    await createTestUser()
    await loginTestUser()
  })

  test('deleting valid post returns status code 204', async () => {
    const newPostToDelete = {
      title: 'Blog to delete',
      url: 'http://www.google.com',
      likes: 20
    }

    await api.post('/api/blogs').set('Authorization', `Bearer ${userToken}`).send(newPostToDelete)
    const blogsInDB = await availableBlogs()
    const addedPost = blogsInDB.find(blog => blog.title === 'Blog to delete')

    expect(addedPost).toBeDefined()

    await api.delete(`/api/blogs/${addedPost.id}`).set('Authorization', `Bearer ${userToken}`).expect(204)

    const blogsAfterDel = await availableBlogs()
    expect(blogsAfterDel.length).toBe(0)
    expect(blogsAfterDel).not.toContain(addedPost)
  })

  test('deleting non-existing post returns status code 404', async () => {
    await api.delete('/api/blogs/invalidID').expect(404)
    const blogsInDB = await availableBlogs()
    expect(blogsInDB.length).toBe(0)
  })

  afterAll( async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
  })

})

describe('updating posts', () => {
  beforeAll(async () => {
    await createTestUser()
    await loginTestUser()
    await Blog.insertMany(initialBlogsDB)
  })

  test('updating likes of a post works', async () => {
    const postsInDB = await availableBlogs()
    const postToUpdate = postsInDB[0]

    const newPost = { ...postToUpdate, likes: postToUpdate.likes + 1 }
    const response = await api.put(`/api/blogs/${postToUpdate.id}`).send(newPost).expect(200)
    const updatedPost = response.body

    expect(updatedPost.likes).toBe(postToUpdate.likes + 1)
    expect(postsInDB.length).toBe(initialBlogsDB.length)
  })

  test('updating missing post returns status code 400', async () => {
    const postsInDB = await availableBlogs()
    await api.put('/api/blogs/invalidBlog').send({}).expect(400)

    expect(postsInDB.length).toBe(initialBlogsDB.length)
  })

})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'johndoe',
      name: 'John Doe',
      password: 'example',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'root',
      name: 'John Doe',
      password: 'anotherexample',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toBe('user already existing')

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

})

describe('adding new user validation', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'John Doe', passwordHash })

    await user.save()
  })

  test('new user is not added if username is missing, returns error 400 and proper message', async () => {

    const usersAtStart = await usersInDb()

    const newUser = {
      username: '',
      name: 'Testing username',
      password: 'example'
    }

    const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)

    expect(result.body.error).toBe('username and password are required')

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('new user is not added if password is missing, returns error 400 and proper message', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'Testing',
      name: 'Testing username',
      password: ''
    }

    const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)

    expect(result.body.error).toBe('username and password are required')

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('username must have at least 3 characters, returns error 400 and proper message', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'Te',
      name: 'Testing username',
      password: 'example'
    }

    const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)

    expect(result.body.error).toBe('username and password must have at least 3 characters')

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('password must have at least 3 characters, returns error 400 and proper message', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'Testing',
      name: 'Testing username',
      password: 'ex'
    }

    const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)

    expect(result.body.error).toBe('username and password must have at least 3 characters')

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('username must be unique, returns error 400 and proper message', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'John Doe',
      name: 'Duplicated user',
      password: 'example'
    }

    const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)

    expect(result.body.error).toBe('user already existing')

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

})

afterAll(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  await mongoose.connection.close()
})