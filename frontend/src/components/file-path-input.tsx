import { onMount, type Component } from "solid-js"
import { PromptForFilePath } from "../../wailsjs/go/app/App"

type Props = {
  title: string
  setFilePath: (fileName: string) => void
}

const FilePathInput: Component<Props> = ({ setFilePath, title }) => {
  return (
    <button
      onClick={async () => {
        try {
          const filePath = await PromptForFilePath()
          setFilePath(filePath)
        } catch (error) {
          console.log(error)
        }
      }}
      class="border-2 border-black rounded-lg p-2 hover:bg-slate-400"
    >
      <span class="font-bold text-black">{title}</span>
    </button>
  )
}

export default FilePathInput
