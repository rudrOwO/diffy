import "diff2html/bundles/css/diff2html.min.css"
import * as Diff2Html from "diff2html"
import { Component, createSignal } from "solid-js"
import Button from "./ui/button"
import { IoArrowBackCircleSharp } from "solid-icons/io"
import { useNavigate } from "@solidjs/router"

const [diffString, setDiffString] = createSignal("")

const DiffRenderer: Component<{}> = () => {
  const navigate = useNavigate()

  const addDiffHtml = (element: HTMLDivElement) => {
    var diffHtml = Diff2Html.html(diffString(), {
      drawFileList: true,
      matching: "lines",
      outputFormat: "side-by-side",
    })
    element.innerHTML = diffHtml
  }

  return (
    <div class="bg-[#fafafa]">
      <div class="flex flex-col justify-evenly relative m-3">
        <div class="sticky left-2 top-2 my-2">
          <Button
            title="Menu"
            onClick={() => navigate("/")}
            icon={<IoArrowBackCircleSharp size="1.25rem" />}
          />
        </div>
        <div ref={addDiffHtml} />
      </div>
    </div>
  )
}

export default DiffRenderer
export { setDiffString }
