const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

// Helper functions & data

const availableBlogs = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const initialBlogsDB = [{
  title: 'Example Blog',
  author: 'John Doe',
  url: 'http://www.google.com',
  likes: 7
}, {
  title: 'Some other blog',
  author: 'Anna Doe',
  url: 'http://www.bing.com',
  likes: 15
}, {
  title: 'Another Blog',
  author: 'Anonymous Blogger',
  url: 'http://www.web.dev',
  likes: 20
}]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogsDB)
})


describe('reading post data', () => {
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

})

describe('adding new posts', () => {
  test('new post can be added correctly', async () => {

    const newPost = {
      title: 'Test blog',
      author: 'Anonymous Blogger',
      url: 'http://www.google.com',
      likes: 10
    }

    const initialBlogsInDB = await availableBlogs()

    await api
      .post('/api/blogs')
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
      author: 'Anonymous Blogger',
      url: 'http://www.google.com',
    }

    await api
      .post('/api/blogs')
      .send(newPostWithoutLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsInDB = await availableBlogs()
    expect(blogsInDB.at(-1).likes).toBe(0)
  })

  test('if title property is missing from req data backend response is 400 bad request', async () => {
    const newPostWithoutTitle = {
      author: 'Anonymous Blogger',
      url: 'http://www.google.com',
      likes: 8
    }

    await api
      .post('/api/blogs')
      .send(newPostWithoutTitle)
      .expect(400)
      .expect('Content-Type', /application\/json/)

  })

  test('if url property is missing from req data backend response is 400 bad request', async () => {
    const newPostWithoutURL = {
      title: 'Blog without URL',
      author: 'Anonymous Blogger',
      likes: 9
    }

    await api
      .post('/api/blogs')
      .send(newPostWithoutURL)
      .expect(400)
      .expect('Content-Type', /application\/json/)

  })

})


describe('deleting posts', () => {
  test('deleting valid post returns status code 204', async () => {
    const newPostToDelete = {
      title: 'Blog to delete',
      author: 'Jack Sparrow',
      url: 'http://www.google.com',
      likes: 20
    }

    await api.post('/api/blogs').send(newPostToDelete)
    const blogsInDB = await availableBlogs()
    // const addedPost = blogsInDB.at(-1)
    const addedPost = blogsInDB.find(blog => blog.title === 'Blog to delete')

    expect(addedPost).toBeDefined()

    await api.delete(`/api/blogs/${addedPost.id}`).expect(204)

    const blogsAfterDel = await availableBlogs()
    expect(blogsAfterDel.length).toBe(initialBlogsDB.length)
    expect(blogsAfterDel).not.toContain(addedPost)
  })

  test('deleting non-existing post returns status code 410', async () => {
    await api.delete('/api/blogs/invalidID').expect(410)
    const blogsInDB = await availableBlogs()
    expect(blogsInDB.length).toBe(initialBlogsDB.length)
  })

})

describe('updating posts', () => {
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

afterAll(async () => {
  await mongoose.connection.close()
})