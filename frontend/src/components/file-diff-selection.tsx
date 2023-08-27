import { createSignal, type Component, createEffect, onMount } from "solid-js"
import { GetFileDiff } from "../../wailsjs/go/app/App"
import FilePathInput from "./ui/file-path-input"
import Box from "./ui/box"
import Button from "./ui/button"
import { setToastErrorMessage } from "./ui/error-toast"
import { AiFillDiff } from "solid-icons/ai"
import { useNavigate } from "@solidjs/router"
import { setDiffHtml } from "./diff-renderer"

/* NOTE 
  These signals are global to prevent an unnecessary re-render
  when the back button is pressed
*/
const [firstFilePath, setFirstFilePath] = createSignal("")
const [secondFilePath, setSecondFilePath] = createSignal("")
const bothFilesSelected = () => firstFilePath() !== "" && secondFilePath() !== ""

createEffect(() => {
  const diffFiles = async () => {
    try {
      const fileDiff = await GetFileDiff(firstFilePath(), secondFilePath())
      setDiffHtml(fileDiff)
    } catch (_) {
      setToastErrorMessage("Error diffing files")
      setFirstFilePath("")
      setSecondFilePath("")
    }
  }

  if (bothFilesSelected()) {
    diffFiles()
  }
})

const FileDiffSelection: Component = () => {
  const navigate = useNavigate()

  return (
    <Box title="Chose two PHP files to diff them">
      <div class="flex justify-center items-center gap-4">
        <FilePathInput setFilePath={setFirstFilePath} title="Chose File" />
        <FilePathInput setFilePath={setSecondFilePath} title="Chose File" />
      </div>
      <Button
        title="Show Diff"
        isDisabled={!bothFilesSelected()}
        icon={<AiFillDiff size="1rem" />}
        onClick={() => {
          navigate("/diff")
        }}
      />
    </Box>
  )
}

export default FileDiffSelection
export { firstFilePath, secondFilePath }
