// import logo from './logo.svg';
// import './App.css';
import CommentManager from './components/CommentManager'
import styles from './styles/App.module.scss'

function App() {
  return (
    <main className={styles.layout}>
      {/* <Comment /> */}
      {<CommentManager />}
    </main>
  )
}

export default App
