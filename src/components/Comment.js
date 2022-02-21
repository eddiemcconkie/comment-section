import React, { useContext, useEffect, useState } from 'react'
import { useImmer } from 'use-immer'

import styles from '../styles/Comment.module.scss'
import replyIcon from '../icons/icon-reply.svg'
import deleteIcon from '../icons/icon-delete.svg'
import editIcon from '../icons/icon-edit.svg'
import { ReactComponent as PlusIcon } from '../icons/icon-plus.svg'
import { ReactComponent as MinusIcon } from '../icons/icon-minus.svg'
import { UserContext } from './CommentManager'
import NewComment from './NewComment'
import EditComment from './EditComment'
import DeleteModal from './DeleteModal'

const Comment = ({ id, content, createdAt, score, replyingTo, user, replies, setParentData }) => {
  const currentUser = useContext(UserContext)

  const [replyData, setReplyData] = useImmer(replies)
  const [isEditing, setIsEditing] = useState(false)
  const [isReplying, setIsReplying] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    setParentData((data) => {
      data.find((comment) => comment.id === id).replies = replyData
    })
  }, [replyData, id, setParentData])

  const upvote = () => {
    setParentData((data) => {
      data.find((comment) => comment.id === id).score += 1
    })
  }
  const downvote = () => {
    setParentData((data) => {
      data.find((comment) => comment.id === id).score -= 1
    })
  }

  const addReply = (content) => {
    // e.preventDefault()
    setIsReplying(false)
    content = content.trim()
    if (content) {
      setReplyData((data) => {
        data.push({
          id: Math.floor(Math.random() * 1000000),
          content,
          createdAt: new Date().toISOString().slice(0, 10),
          score: 0,
          user: currentUser,
          replyingTo: user.username,
          replies: [],
        })
      })
    }
  }

  const updateComment = (content) => {
    // e.preventDefault()
    setIsEditing(false)
    content = content.trim()
    if (content) {
      setParentData((data) => {
        data.find((comment) => comment.id === id).content = content
      })
    }
  }

  const deleteComment = () => {
    setParentData((data) => {
      data.splice(
        data.findIndex((comment) => comment.id === id),
        1
      )
    })
  }

  return (
    <>
      {isDeleting && <DeleteModal accept={deleteComment} reject={() => setIsDeleting(false)} />}
      <div className={styles.comment}>
        <div className={styles.header}>
          <img className={styles.avatar} src={user.image.png} alt={user.username} />
          <span className={styles.username}>{user.username} </span>
          {currentUser.username === user.username && <span className={styles.you}>you</span>}
          <span className={styles.createdAt}>{createdAt}</span>
        </div>
        <div className={styles.content}>
          {isEditing ? (
            <EditComment onSubmit={updateComment} content={content} />
          ) : (
            <>
              {replyingTo ? <span className={styles.at}>@{replyingTo}</span> : <></>} {content}
            </>
          )}
        </div>
        <div className={styles.score}>
          <button onClick={upvote}>
            <PlusIcon className={styles.btnPlus} />
          </button>
          <div className={styles.scoreNum}>{score}</div>
          <button onClick={downvote}>
            <MinusIcon className={styles.btnMinus} />
          </button>
        </div>
        <div className={styles.actions}>
          {currentUser.username === user.username ? (
            <>
              <button className={styles.btnDelete} onClick={() => setIsDeleting(true)}>
                <img src={deleteIcon} alt="delete" />
                Delete
              </button>
              <button className={styles.btnEdit} onClick={() => setIsEditing(true)}>
                <img src={editIcon} alt="edit" />
                Edit
              </button>
            </>
          ) : (
            <button className={styles.btnReply} onClick={() => setIsReplying(true)}>
              <img src={replyIcon} alt="reply" />
              Reply
            </button>
          )}
        </div>
      </div>
      <div className={styles.replies}>
        {isReplying && <NewComment type="reply" onSubmit={addReply} autoFocus={true} />}
        {replies &&
          replies.map((reply) => (
            <Comment key={reply.id} {...reply} setParentData={setReplyData} />
          ))}
      </div>
    </>
  )
}

export default Comment
