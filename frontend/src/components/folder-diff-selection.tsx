import { createSignal, type Component } from "solid-js"
import { GetFileDiff } from "../../wailsjs/go/source_analysis/SourceAnalysis"
import FilePathInput from "./ui/file-path-input"
import Box from "./ui/box"
import Button from "./ui/button"
import { setToastErrorMessage } from "./ui/error-toast"
import { AiFillDiff } from "solid-icons/ai"
import { useNavigate } from "@solidjs/router"
import { setDiffString } from "./diff-renderer"
import { globalIteractionLock } from "../app"

/* NOTE 
  These signals are global to prevent an unnecessary re-render
  when the back button is pressed
*/
const [firstFilePath, setFirstFilePath] = createSignal("")
const [secondFilePath, setSecondFilePath] = createSignal("")
const bothFilesSelected = () => firstFilePath() !== "" && secondFilePath() !== ""

const getFileDiff_Client = async () => {
  try {
    return await GetFileDiff(firstFilePath(), secondFilePath())
  } catch (_) {
    setToastErrorMessage("Error diffing files")
    setFirstFilePath("")
    setSecondFilePath("")
    return ""
  }
}

const FileDiffSelection: Component = () => {
  const navigate = useNavigate()

  const handleNavigation = async () => {
    if (bothFilesSelected()) {
      const fileDiff = await getFileDiff_Client()
      setDiffString(fileDiff)
      navigate("/diff")
    }
  }

  return (
    <Box title="Chose two PHP files to diff them">
      <div class="flex justify-center items-center gap-4">
        <FilePathInput setFilePath={setFirstFilePath} title="Chose File" />
        <FilePathInput setFilePath={setSecondFilePath} title="Chose File" />
      </div>
      <Button
        title="Show Diff"
        isDisabled={!bothFilesSelected() || globalIteractionLock()}
        icon={<AiFillDiff size="1rem" />}
        onClick={handleNavigation}
      />
    </Box>
  )
}

export default FileDiffSelection
