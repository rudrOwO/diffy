import { createSignal, type Component } from "solid-js"

interface Props {
  setFileName: (fileName: string) => void
}

const FilePathInput: Component<Props> = ({ setFileName }) => {
  return (
    <button class="border-2 border-black rounded-lg p-2 hover:bg-slate-400">
      <span class="font-bold text-black">Chose File</span>
    </button>
  )
}

export default FilePathInput
