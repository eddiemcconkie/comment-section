import React, { useRef, useState } from 'react'
import { useImmer } from 'use-immer'

import commentData from '../data/data.json'
import Comment from './Comment'
import NewComment from './NewComment'

export const UserContext = React.createContext(null)

const CommentManager = (threadId) => {
  const currentUser = useRef(commentData.currentUser)
  const [data, setData] = useImmer(commentData.comments)
  const [key, setKey] = useState(0) // Reset NewComment when new comment is added

  const addNewComment = (content) => {
    setKey(key + 1)
    content = content.trim()
    if (content) {
      setData((data) => {
        data.push({
          id: Math.floor(Math.random() * 1000000),
          content,
          createdAt: new Date().toISOString().slice(0, 10),
          score: 0,
          user: currentUser.current,
          replyingTo: null,
          replies: [],
        })
      })
    }
  }

  return (
    <UserContext.Provider value={currentUser.current}>
      {data.map((comment) => (
        <Comment key={comment.id} {...comment} setParentData={setData} />
      ))}
      <NewComment type="send" onSubmit={addNewComment} key={key} />
    </UserContext.Provider>
  )
}

export default CommentManager
