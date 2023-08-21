import { createSignal, type Component, Show } from "solid-js"
import { GetSLOC } from "../../wailsjs/go/app/App"
import FilePathInput from "./file-path-input"
import Box from "./layouts/box"

const Sloc: Component = () => {
  const [filePath, setFilePath] = createSignal("")
  const [sloc, setSloc] = createSignal("")

  return (
    <Box>
      <span class="text-black rounded-lg p-2">Chose a PHP file to calucate SLOC</span>
      <FilePathInput setFilePath={setFilePath} title="Chose File" />
      <button
        class="border-2 border-black rounded-lg p-2 hover:bg-slate-400"
        onClick={async () => {
          if (filePath() === "") {
            setSloc("Please chose a file first")
            return
          }

          try {
            const sloc = await GetSLOC(filePath())
            setSloc("Chosen file has " + sloc.toString() + " SLOC")
          } catch (error) {
            console.error(error)
          }
        }}
      >
        <span class="font-bold text-black">Get SLOC</span>
      </button>
      <div class="font-bold text-black">{sloc()}</div>
    </Box>
  )
}

export default Sloc
