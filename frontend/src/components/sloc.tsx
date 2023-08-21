import { createSignal, type Component, Show } from "solid-js"
import { GetSLOC } from "../../wailsjs/go/app/App"
import FilePathInput from "./file-path-input"
import Box from "./layouts/box"

const Sloc: Component = () => {
  const [fileName, setFileName] = createSignal("")
  const [sloc, setSloc] = createSignal("")

  return (
    <Box>
      <span class="text-black rounded-lg p-2">Chose a PHP file to calucate SLOC</span>
      <FilePathInput setFileName={setFileName} />
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
    </Box>
  )
}

export default Sloc
