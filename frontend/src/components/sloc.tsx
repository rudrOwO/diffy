import { createSignal, type Component, createEffect } from "solid-js"
import { GetSLOC } from "../../wailsjs/go/app/App"
import FilePathInput from "./ui/file-path-input"
import Box from "./ui/box"
import { setToastErrorMessage } from "./ui/error-toast"

const [filePath, setFilePath] = createSignal("")
const [sloc, setSloc] = createSignal("")

const Sloc: Component = () => {
  createEffect(async () => {
    if (filePath() === "") {
      return
    }

    try {
      const sloc = await GetSLOC(filePath())
      setSloc("Chosen file has " + sloc.toString() + " SLOC")
    } catch (_) {
      setToastErrorMessage("Error retrieving SLOC")
      setFilePath("")
    }
  })

  return (
    <Box title="Chose a PHP file to calucate SLOC">
      <FilePathInput setFilePath={setFilePath} title="Chose File" />
      <p class="font-bold">{sloc()}</p>
    </Box>
  )
}

export default Sloc
