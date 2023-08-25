import type { Component, Setter } from "solid-js"
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

  return (
    <button
      type="button"
      onClick={handleFileSelection}
      class="text-sm md:text-md lg:text-lg border-2 border-black rounded-lg p-2 hover:bg-slate-300"
    >
      <span class="font-bold">{p.title}</span>
    </button>
  )
}

export default FilePathInput
