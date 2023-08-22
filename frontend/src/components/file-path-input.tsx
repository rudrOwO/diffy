import { onMount, type Component, type Setter } from "solid-js"
import { PromptForFilePath } from "../../wailsjs/go/app/App"
import { BsFiletypePhp } from "solid-icons/bs"

type Props = {
  title: string
  setFilePath: Setter<string>
}

const FilePathInput: Component<Props> = ({ setFilePath, title }) => {
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          const filePath = await PromptForFilePath()
          setFilePath(filePath)
        } catch (error) {
          console.log(error)
        }
      }}
      class="text-sm md:text-md lg:text-lg border-2 border-black rounded-lg p-2 hover:bg-slate-300"
    >
      <span class="font-bold">{title}</span>
    </button>
  )
}

export default FilePathInput
