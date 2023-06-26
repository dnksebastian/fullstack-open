const listHelper = require('../utils/list_helper')
const blogData = require('./testData')
const { emptyList, listWithOneBlog, manyBlogsList } = blogData

describe('total likes', () => {

  test('empty list returns zero', () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })
  test('list containing one blog returns its likes number', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(listWithOneBlog[0].likes)
  })
  test('bigger list of blogs returns sum of likes', () => {
    const result = listHelper.totalLikes(manyBlogsList)
    let sum = 0
    manyBlogsList.forEach((blog) => {
      sum += blog.likes
    })
    expect(result).toBe(sum)
  })
})