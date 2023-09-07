import { createSignal, type Component } from "solid-js"
import { GetFolderDiff } from "../../wailsjs/go/source_analysis/SourceAnalysis"
import FolderPathInput from "./ui/folder-path-input"
import Box from "./ui/box"
import Button from "./ui/button"
import { setToastErrorMessage } from "./ui/error-toast"
import { AiFillDiff } from "solid-icons/ai"
import { useNavigate } from "@solidjs/router"
import { setDiffString } from "./diff-renderer"
import { globalInteractionLock } from "../app"

/* NOTE 
  These signals are global to prevent an unnecessary re-render
  when the back button is pressed
*/
const [firstFolderPath, setFirstFolderPath] = createSignal("")
const [secondFolderPath, setSecondFolderPath] = createSignal("")
const bothFoldersSelected = () =>
  firstFolderPath() !== "" && secondFolderPath() !== ""

const getFileDiff_Client = async () => {
  try {
    return await GetFolderDiff(firstFolderPath(), secondFolderPath())
  } catch (_) {
    setToastErrorMessage("Error diffing files")
    setFirstFolderPath("")
    setSecondFolderPath("")
    return ""
  }
}

const FolderDiffSelection: Component = () => {
  const navigate = useNavigate()

  const handleNavigation = async () => {
    if (bothFoldersSelected()) {
      const fileDiff = await getFileDiff_Client()
      setDiffString(fileDiff)
      navigate("/diff")
    }
  }

  return (
    <Box title="Chose two project folders to diff them">
      <div class="flex justify-center items-center gap-4">
        <FolderPathInput
          setFilePath={setFirstFolderPath}
          title="Chose Folder"
        />
        <FolderPathInput
          setFilePath={setSecondFolderPath}
          title="Chose Folder"
        />
      </div>
      <Button
        title="Show Diff"
        isDisabled={!bothFoldersSelected() || globalInteractionLock()}
        icon={<AiFillDiff size="1rem" />}
        onClick={handleNavigation}
      />
    </Box>
  )
}

export default FolderDiffSelection
