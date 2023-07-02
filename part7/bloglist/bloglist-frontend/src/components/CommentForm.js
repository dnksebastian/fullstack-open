import { useState } from 'react'

const CommentForm = ({ sendComment }) => {
  const [comment, setComment] = useState({
    message: ''
  })

  const addComment = (e) => {
    e.preventDefault()
    sendComment(comment)
    setComment({
      message:''
    })
  }

  return (
    <form onSubmit={addComment}>
      <input id='comment-input' value={comment.message} onChange={(e) => {setComment({ ...comment, message: e.target.value })}}></input>
      <button type='submit'>add comment</button>
    </form>
  )
}

export default CommentForm



