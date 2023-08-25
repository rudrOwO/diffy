import { createSignal, type Component } from "solid-js"
import { GetSLOC } from "../../wailsjs/go/app/App"
import FilePathInput from "./ui/file-path-input"
import Box from "./ui/box"
import Button from "./ui/button"
import { setToastErrorMessage } from "./ui/error-toast"
import { FaSolidTerminal } from "solid-icons/fa"

const Sloc: Component = () => {
  const [filePath, setFilePath] = createSignal("")
  const [sloc, setSloc] = createSignal("")
  const isButtonDisabled = () => filePath() === ""

  const handleSLOCRetrieval = async () => {
    try {
      const sloc = await GetSLOC(filePath())
      setSloc("Chosen file has " + sloc.toString() + " SLOC")
    } catch (_) {
      setToastErrorMessage("Error retrieving SLOC")
      setFilePath("")
    }
  }

  return (
    <Box title="Chose a PHP file to calucate SLOC">
      <FilePathInput setFilePath={setFilePath} title="Chose File" />
      <Button
        title="Get SLOC"
        icon={<FaSolidTerminal size="1rem" />}
        isDisabled={isButtonDisabled()}
        onClick={handleSLOCRetrieval}
      />
      <div class="font-bold">{sloc()}</div>
    </Box>
  )
}

export default Sloc
