const listHelper = require('../utils/list_helper')
const blogData = require('./testData')
const { emptyList, listWithOneBlog, manyBlogsList } = blogData

describe('most blogs', () => {
  test('empty list returns null', () => {
    const result = listHelper.mostBlogs(emptyList)
    expect(result).toBeNull()
  })
  test('single item list returns correct data', () => {
    const testObj = {
      author: listWithOneBlog[0].author,
      blogs: 1,
    }
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual(testObj)
  })
  test('many authors list returns author with most blogs', () => {
    const testObj = {
      author: 'Robert C. Martin',
      blogs: 3
    }
    const result = listHelper.mostBlogs(manyBlogsList)
    expect(result).toEqual(testObj)
  })
})