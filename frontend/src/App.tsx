import "./index.css"
import { onMount, type Component } from "solid-js"
import { Greet, GetSLOC, GetFileDiff } from "../wailsjs/go/main/App"

import logo from "./logo.svg"
import styles from "./App.module.css"

const App: Component = () => {
  const greet = function () {
    // TODO Get name from input DOM Node
    let name = "default name"

    // Call App.Greet(name)
    try {
      Greet(name)
        .then(result => {
          // TODO Update result with data back from App.Greet()
        })
        .catch(err => {
          console.error(err)
        })
    } catch (err) {
      console.error(err)
    }
  }

  onMount(() => {
    // TODO Call App.GetSLOC()
    try {
      GetFileDiff("./fixture/test.php", "./fixture/vest.php")
        .then(result => {
          console.log(result)
        })
        .catch(err => {
          console.error(err)
        })
    } catch (err) {
      console.error(err)
    }
  })

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p class="font-bold text-violet-400">
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        ></a>
      </header>
    </div>
  )
}

export default App
