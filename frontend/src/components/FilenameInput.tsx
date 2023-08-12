import { createSignal, type Component } from "solid-js"

interface Props {
  setFileName: (fileName: string) => void
}

const FilenameInput: Component<Props> = p => {
  return (
    <input
      type="file"
      class="text-black p-2 border-black border-2 rounded-lg"
      onChange={e => {
        const fileName = e.currentTarget!.files![0].name ?? ""
        p.setFileName("../test/v1/" + fileName)
      }}
    />
  )
}

export default FilenameInput
