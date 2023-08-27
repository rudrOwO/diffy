import { type Component, type Setter } from "solid-js"
import Button from "./button"
import { PromptForFilePath } from "../../../wailsjs/go/app/App"
import { setToastErrorMessage } from "./error-toast"
import { BsFiletypePhp } from "solid-icons/bs"
import { globalIteractionLock, setGlobalInteractionLock } from "../../app"

const PathInput: Component<{
  title: string
  setFilePath: Setter<string>
}> = p => {
  const handleFileSelection = async () => {
    setGlobalInteractionLock(true)

    try {
      const filePath = await PromptForFilePath()
      p.setFilePath(filePath)
    } catch (_) {
      setToastErrorMessage("Error reading PHP file")
    }

    setGlobalInteractionLock(false)
  }

  return (
    <div class="flex gap-2 justify-evenly items-center">
      <Button
        title={p.title}
        icon={<BsFiletypePhp size="1.25rem" />}
        isDisabled={globalIteractionLock()}
        onClick={handleFileSelection}
      />
    </div>
  )
}

export default PathInput
