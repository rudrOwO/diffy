import { createSignal, type Component, Show } from "solid-js"
import { GetSLOC } from "../../wailsjs/go/app/App"
import FilePathInput from "./ui/file-path-input"
import Box from "./ui/box"

const Sloc: Component = () => {
  const [filePath, setFilePath] = createSignal("")
  const [sloc, setSloc] = createSignal("")

  const handleSLOCRetrieval = async () => {
    if (filePath() === "") {
      setSloc("Please chose a file first")
      return
    }

    try {
      const sloc = await GetSLOC(filePath())
      setSloc("Chosen file has " + sloc.toString() + " SLOC")
    } catch (_) {}
  }

  return (
    <Box title="Chose a PHP file to calucate SLOC">
      <FilePathInput setFilePath={setFilePath} title="Chose File" />
      <button
        type="button"
        class="text-sm md:text-md lg:text-lg border-2 border-black rounded-lg p-2 hover:bg-slate-300"
        onClick={handleSLOCRetrieval}
      >
        <span class="font-bold">Get SLOC</span>
      </button>
      <div class="font-bold">{sloc()}</div>
    </Box>
  )
}

export default Sloc
