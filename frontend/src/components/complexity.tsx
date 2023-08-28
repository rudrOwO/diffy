import { createSignal, type Component, createEffect, Show } from "solid-js"
import { GetComplexity as GetClompexity_Server } from "../../wailsjs/go/app/App"
import FilePathInput from "./ui/file-path-input"
import Box from "./ui/box"
import { setToastErrorMessage } from "./ui/error-toast"

/* NOTE 
  These signals are global to prevent an unnecessary re-render
  when the back button is pressed
*/
const [complexity, setComplexity] = createSignal("")
const [filePath, setFilePath] = createSignal("")

const getSLOC_Client = async () => {
  try {
    const sloc = await GetClompexity_Server(filePath())
    setComplexity(sloc.toString())
  } catch (_) {
    setToastErrorMessage("Error retrieving SLOC")
    setFilePath("")
  }
}

createEffect(() => {
  if (filePath() !== "") {
    getSLOC_Client()
  }
})

const Complexity: Component = () => (
  <Box title="Chose a PHP file to calucate Cyclomatic Complexity">
    <FilePathInput setFilePath={setFilePath} title="Chose File" />
    <Show when={complexity()}>
      <p class="font-bold">{"Chosen file has complexity of " + complexity()}</p>
    </Show>
  </Box>
)

export default Complexity
