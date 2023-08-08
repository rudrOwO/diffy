import "./index.css"
import { onMount, type Component } from "solid-js"
import Sloc from "./components/Sloc"

import styles from "./App.module.css"

const App: Component = () => {
  // onMount(() => {
  //   GetFileDiff("./fixture/test.php", "./fixture/vest.php")
  //     .then(result => {
  //       console.log(result)
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  // })

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <Sloc />
      </header>
    </div>
  )
}

export default App
