import "./index.css"
import { onMount, type Component } from "solid-js"
import Sloc from "./components/Sloc"

import styles from "./App.module.css"

const App: Component = () => {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <Sloc />
      </header>
    </div>
  )
}

export default App
