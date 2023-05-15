const _ = require('lodash')

const dummy = (_blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.map(blog => blog.likes).reduce((sum, likes) => { return sum + likes }, 0)
}

const favoriteBlog = (blogs) => {
  const mostBlogLikes = blogs.map(blog => blog.likes).reduce((highest, current) => { return highest > current ? highest : current }, null)
  const favBlog = blogs.find(blog => blog.likes === mostBlogLikes)
  if (favBlog) {
    const blog = {
      title: favBlog.title,
      author: favBlog.author,
      likes: favBlog.likes
    }
    return blog
  } else {
    return null
  }
}

const mostBlogs = (blogs) => {
  const sorted = _.groupBy(blogs, 'author')

  const blogsByAuthors = {}

  for (const blog in sorted) {
    const grouped = sorted[blog]
    blogsByAuthors[blog] = grouped.length
  }

  const mostBlogs = Object.keys(blogsByAuthors).reduce((most, current) => Math.max(most, blogsByAuthors[current]), null)
  const authorWithMostBlogs = Object.keys(blogsByAuthors).filter(blogs => blogsByAuthors[blogs] === mostBlogs)

  if(mostBlogs !== null) {
    return { author: authorWithMostBlogs[0], blogs: mostBlogs }
  } else {
    return null
  }

}

const mostLikes = (blogs) => {
  const sorted = _.groupBy(blogs, 'author')
  const results = {}

  for (const author in sorted) {
    const authorBlogsArr = sorted[author]
    let likesSum = 0

    authorBlogsArr.forEach(blog => {
      likesSum += blog.likes
    })

    results[author] = likesSum
  }

  const maxLikes = Object.keys(results).reduce((max, curr) => Math.max(max, results[curr]), null)
  const mostLikedAuthor = Object.keys(results).filter(likes => results[likes] === maxLikes)

  if(maxLikes !== null) {
    return { author: mostLikedAuthor[0], likes: maxLikes }
  } else {
    return null
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}