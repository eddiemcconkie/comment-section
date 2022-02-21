import React from 'react'
import styles from '../styles/DeleteModal.module.scss'

const DeleteModal = ({ accept, reject }) => {
  return (
    <div className={styles.overlay}>
      <section className={styles.modal}>
        <h2 className={styles.header}>Delete comment</h2>
        <p className={styles.message}>
          Are you sure you want to delete this comment? This will remove the comment and can't be
          undone.
        </p>
        <div className={styles.buttonSection}>
          <button className={styles.buttonReject} onClick={reject}>
            No, cancel
          </button>
          <button className={styles.buttonAccept} onClick={accept}>
            Yes, delete
          </button>
        </div>
      </section>
    </div>
  )
}

export default DeleteModal
