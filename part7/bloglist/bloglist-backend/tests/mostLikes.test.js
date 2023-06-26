const listHelper = require('../utils/list_helper')
const blogData = require('./testData')
const { emptyList, listWithOneBlog, manyBlogsList } = blogData

describe('most likes', () => {

  test('empty array returns null', () => {
    const result = listHelper.mostLikes(emptyList)
    expect(result).toBeNull()
  })

  test('single item array returns its author data', () => {
    const testObj = {
      author: listWithOneBlog[0].author,
      likes: listWithOneBlog[0].likes
    }

    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual(testObj)
  })

  test('many authors array returns author with highest sum of likes', () => {
    const testObj = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }

    const result = listHelper.mostLikes(manyBlogsList)
    expect(result).toEqual(testObj)
  })
})