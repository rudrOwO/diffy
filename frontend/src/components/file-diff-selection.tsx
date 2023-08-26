import { createSignal, type Component, onMount, createEffect } from "solid-js"
import { GetFileDiff } from "../../wailsjs/go/app/App"
import FilePathInput from "./ui/file-path-input"
import Box from "./ui/box"
import Button from "./ui/button"
import { setToastErrorMessage } from "./ui/error-toast"
import { AiFillDiff } from "solid-icons/ai"
import { useNavigate } from "@solidjs/router"

const FileDiffSelection: Component = () => {
  const navigate = useNavigate()
  const [firstFilePath, setFirstFilePath] = createSignal("")
  const [secondFilePath, setSecondFilePath] = createSignal("")
  const isDiffLinkDisabled = () => firstFilePath() === "" || secondFilePath() === ""

  createEffect(async () => {
    try {
      const diffString = await GetFileDiff(firstFilePath(), secondFilePath())
      // TODO set diff string to some global signal
    } catch (_) {
      setToastErrorMessage("Error diffing files")
      setFirstFilePath("")
      setSecondFilePath("")
    }
  })

  return (
    <Box title="Chose two PHP files to diff them">
      <div class="flex justify-center items-center gap-4">
        <FilePathInput setFilePath={setFirstFilePath} title="Chose File" />
        <FilePathInput setFilePath={setSecondFilePath} title="Chose File" />
      </div>
      <Button
        title="Show Diff"
        isDisabled={isDiffLinkDisabled()}
        icon={<AiFillDiff size="1rem" />}
        onClick={() => {
          navigate("/diff")
        }}
      />
    </Box>
  )
}

export default FileDiffSelection
