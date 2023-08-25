import { createSignal, type Component, type Setter } from "solid-js"
import Button from "./button"
import { PromptForFilePath } from "../../../wailsjs/go/app/App"
import { setToastErrorMessage } from "./error-toast"
import { BsFiletypePhp } from "solid-icons/bs"

const FilePathInput: Component<{
  title: string
  setFilePath: Setter<string>
}> = p => {
  const [isInputDisabled, setIsInputDisabled] = createSignal(false)

  const handleFileSelection = async () => {
    setIsInputDisabled(true)

    try {
      const filePath = await PromptForFilePath()
      p.setFilePath(filePath)
    } catch (_) {
      setToastErrorMessage("Error reading PHP file")
    }

    setIsInputDisabled(false)
  }

  return <Button title={p.title} isDisabled={isInputDisabled()} onClick={handleFileSelection} />
}

export default FilePathInput
