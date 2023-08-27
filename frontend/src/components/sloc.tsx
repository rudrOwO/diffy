import { createSignal, type Component, createEffect, Show } from "solid-js"
import { GetSLOC as GetSLOC_Server } from "../../wailsjs/go/app/App"
import PathInput from "./ui/path-input"
import Box from "./ui/box"
import { setToastErrorMessage } from "./ui/error-toast"

/* NOTE 
  These signals are global to prevent an unnecessary re-render
  when the back button is pressed
*/
const [sloc, setSloc] = createSignal("")
const [filePath, setFilePath] = createSignal("")

const getSLOC_Client = async () => {
  try {
    const sloc = await GetSLOC_Server(filePath())
    setSloc(sloc.toString())
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

const Sloc: Component = () => (
  <Box title="Chose a PHP file to calucate SLOC">
    <PathInput setFilePath={setFilePath} title="Chose File" />
    <Show when={sloc()}>
      <p class="font-bold">{"Chosen file has " + sloc() + " SLOC"}</p>
    </Show>
  </Box>
)

export default Sloc
