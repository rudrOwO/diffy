import { type Component } from "solid-js"
import Sloc from "./components/sloc"
import FileDiffSelection from "./components/file-diff-selection"

// TODO - Add diff render component
// TODO - Add file diff panel

// TODO - Rewrite Go method for calculating folder diffs
// TODO - Add folder diff panel

// TODO - Add Go method for calculating cyclomatic complexity
// TODO - Add cycloamtic complexity panel

const App: Component = () => {
  return (
    <div class="bg-[#fafafa] h-[100vh] w-[100vw] grid place-items-center">
      <div class="w-[90%] md:w-[60%] lg:w-[50%] flex flex-col items-center gap-8">
        <Sloc />
        <FileDiffSelection />
      </div>
    </div>
  )
}

export default App
