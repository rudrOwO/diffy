import type { Component, Setter } from "solid-js"
import Button from "./button"
import { PromptForFilePath } from "../../../wailsjs/go/app/App"
import { BsFiletypePhp } from "solid-icons/bs"

const FilePathInput: Component<{
  title: string
  setFilePath: Setter<string>
}> = p => {
  const handleFileSelection = async () => {
    try {
      const filePath = await PromptForFilePath()
      p.setFilePath(filePath)
    } catch (_) {}
  }

  return <Button title={p.title} onClick={handleFileSelection} />
}

export default FilePathInput
