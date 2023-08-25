import { createSignal, type Component, Show } from "solid-js"
import { GetSLOC } from "../../wailsjs/go/app/App"
import FilePathInput from "./ui/file-path-input"
import Box from "./ui/box"
import Button from "./ui/button"

const Sloc: Component = () => {
  const [isButtonDisabled, setIsButtonDisabled] = createSignal(false)
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
      <Button title="Get SLOC" isDisabled={isButtonDisabled()} onClick={handleSLOCRetrieval} />
      <div class="font-bold">{sloc()}</div>
    </Box>
  )
}

export default Sloc
