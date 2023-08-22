import { createSignal, type Component, Show } from "solid-js"
import { GetSLOC } from "../../wailsjs/go/app/App"
import FilePathInput from "./file-path-input"
import Box from "./layouts/box"

const Sloc: Component = () => {
  const [filePath, setFilePath] = createSignal("")
  const [sloc, setSloc] = createSignal("")

  return (
    <Box title="Chose a PHP file to calucate SLOC">
      <FilePathInput setFilePath={setFilePath} title="Chose File" />
      <button
        type="button"
        class="text-sm md:text-md lg:text-lg border-2 border-black rounded-lg p-2 hover:bg-slate-300"
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
        <span class="font-bold">Get SLOC</span>
      </button>
      <div class="font-bold">{sloc()}</div>
    </Box>
  )
}

export default Sloc
