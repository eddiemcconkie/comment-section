import React, { useContext, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

import styles from '../styles/Comment.module.scss'
import { UserContext } from './CommentManager'

const NewComment = ({ type, onSubmit, autoFocus = false }) => {
  const currentUser = useContext(UserContext)
  const [comment, setComment] = useState('')

  return (
    <>
      <div
        // onSubmit={() => onSubmit(comment)}
        className={styles.newComment}
      >
        <img className={styles.avatar} src={currentUser.image.png} alt={currentUser.username} />
        <TextareaAutosize
          className={styles.textarea}
          value={comment}
          onInput={(e) => setComment(e.target.value)}
          autoFocus={autoFocus}
        />
        <button className={styles.button} type="submit" onClick={() => onSubmit(comment)}>
          {type}
        </button>
      </div>
    </>
  )
}

export default NewComment
