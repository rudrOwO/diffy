import { createSignal, type Component, onMount } from "solid-js"
import { GetFileDiff } from "../../wailsjs/go/app/App"
import FilenameInput from "./FilenameInput"

const FileDiff: Component = () => {
  onMount(() => {
    GetFileDiff("/home/rudro/Dev/diffy/test/v1/test.php", "/home/rudro/Dev/diffy/test/v1/vest.php")
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  })

  return (
    <div class="flex flex-col items-center justify-center p-5 rounded-lg shadow-lgw bg-gray-300 gap-5 w-full"></div>
  )
}

export default FileDiff
