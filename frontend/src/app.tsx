import { type Component, createSignal } from "solid-js"
import Sloc from "./components/sloc"
import FileDiffSelection from "./components/file-diff-selection"

// TODO - Add Go method for Folder dialog
// TODO - Add folder diff panel
// TODO - cycloamtic complexity

export const [globalIteractionLock, setGlobalInteractionLock] = createSignal(false)

const App: Component = () => (
  <div class="bg-[#fafafa] h-[100vh] w-[100vw] grid place-items-center">
    <div class="w-[90%] md:w-[60%] lg:w-[50%] flex flex-col items-center gap-8">
      <Sloc />
      <FileDiffSelection />
    </div>
  </div>
)

export default App
