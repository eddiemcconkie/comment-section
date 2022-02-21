import React, { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

import styles from '../styles/Comment.module.scss'

const EditComment = ({ onSubmit, content }) => {
  const [comment, setComment] = useState(content)

  return (
    <>
      <div
        // onSubmit={(e) => onSubmit(e, comment)}
        className={styles.editComment}
      >
        <TextareaAutosize
          className={styles.textarea}
          value={comment}
          onInput={(e) => setComment(e.target.value)}
          autoFocus
        />
        <button className={styles.button} type="submit" onClick={() => onSubmit(comment)}>
          update
        </button>
      </div>
    </>
  )
}

export default EditComment
