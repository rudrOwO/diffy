import { type Component, type Setter } from "solid-js"
import Button from "./button"
import { PromptForFolderPath } from "../../../wailsjs/go/app/App"
import { setToastErrorMessage } from "./error-toast"
import { BsFolderFill } from "solid-icons/bs"
import { globalInteractionLock, setGlobalInteractionLock } from "../../app"

const FolderPathInput: Component<{
  title: string
  setFilePath: Setter<string>
}> = (p) => {
  const handleFolderSelection = async () => {
    setGlobalInteractionLock(true)

    try {
      const filePath = await PromptForFolderPath()
      p.setFilePath(filePath)
    } catch (_) {
      setToastErrorMessage("Error Opening Folder")
    }

    setGlobalInteractionLock(false)
  }

  return (
    <div class="flex gap-2 justify-evenly items-center">
      <Button
        title={p.title}
        icon={<BsFolderFill size="1.25rem" />}
        isDisabled={globalInteractionLock()}
        onClick={handleFolderSelection}
      />
    </div>
  )
}

export default FolderPathInput
