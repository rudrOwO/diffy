import { createSignal, type Component, Show } from "solid-js"
import { GetSLOC } from "../../wailsjs/go/app/App"
import FilenameInput from "./FilenameInput"

const Sloc: Component = () => {
  const [fileName, setFileName] = createSignal("")
  const [sloc, setSloc] = createSignal("")

  return (
    <div class="flex flex-col items-center justify-center p-5 rounded-lg shadow-lgw bg-gray-300 gap-5 w-full">
      <span class="text-black rounded-lg p-2">Enter PHP File Name to Calucate SLOC</span>
      <FilenameInput setFileName={setFileName} />
      <button
        class="border-2 border-black rounded-lg p-2 hover:bg-slate-400"
        onClick={() => {
          if (fileName() === "") {
            setSloc("Please chose a file first")
            return
          }

          GetSLOC(fileName())
            .then(result => {
              setSloc("Chosen file has " + result.toString() + " SLOC")
            })
            .catch(err => {
              console.error(err)
            })
        }}
      >
        <span class="font-bold text-black">Get SLOC</span>
      </button>
      <div class="font-bold text-black">{sloc()}</div>
    </div>
  )
}

export default Sloc
