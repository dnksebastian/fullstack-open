const listHelper = require('../utils/list_helper')
const blogData = require('./testData')
const { emptyList, listWithOneBlog, manyBlogsList } = blogData

describe('favorite blog', () => {
  test('empty returns null', () => {
    const result = listHelper.favoriteBlog(emptyList)
    expect(result).toBeNull()
  })
  test('list with one blog returns this blog', () => {
    const testObj = {
      title: listWithOneBlog[0].title,
      author: listWithOneBlog[0].author,
      likes: listWithOneBlog[0].likes
    }
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(testObj)
  })
  test('list with many blogs returns blog with highest likes', () => {
    const highestLikes = Math.max(...manyBlogsList.map(blog => blog.likes))
    const mostLikedBlog = manyBlogsList.find(blog => blog.likes === highestLikes)

    const testObj = {
      title: mostLikedBlog.title,
      author: mostLikedBlog.author,
      likes: mostLikedBlog.likes
    }

    const result = listHelper.favoriteBlog(manyBlogsList)
    expect(result).toEqual(testObj)
  })
})