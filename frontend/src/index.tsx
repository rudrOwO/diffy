/* @refresh reload */
import "./styles/global.css"
import { render } from "solid-js/web"
import { Router, Routes, Route } from "@solidjs/router"
import App from "./app"
import ErrorToast from "./components/ui/error-toast"
import DiffRenderer from "./components/diff-renderer"

const root = document.getElementById("root")

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  )
}

render(
  () => (
    <>
      <Router>
        <Routes>
          <Route path="/" component={App} />
          <Route path="/diff" component={DiffRenderer} />
        </Routes>
      </Router>
      <ErrorToast />
    </>
  ),
  root!
)
