import "diff2html/bundles/css/diff2html.min.css"
import * as Diff2Html from "diff2html"
import { Component, createSignal } from "solid-js"
import Button from "./ui/button"
import { IoArrowBackCircleSharp } from "solid-icons/io"

const [diffString, setDiffString] = createSignal("")

const DiffRenderer: Component<{}> = () => {
  const addDiffHtml = (element: HTMLDivElement) => {
    var diffHtml = Diff2Html.html(diffString(), {
      drawFileList: true,
      matching: "lines",
      outputFormat: "side-by-side",
    })
    element.innerHTML = diffHtml
  }

  return (
    <div class="bg-[#fafafa] h-[100vh] w-[100vw]">
      <div class="flex flex-col justify-evenly relative m-3">
        <div class="sticky left-2 top-2 my-2">
          <Button
            title="Go Back"
            onClick={() => window.history.back()}
            icon={<IoArrowBackCircleSharp size="1rem" />}
          />
        </div>
        <div ref={addDiffHtml} />
      </div>
    </div>
  )
}

export default DiffRenderer
export { setDiffString as setDiffHtml }
