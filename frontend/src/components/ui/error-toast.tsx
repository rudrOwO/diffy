import { type Component, createSignal, Show } from "solid-js"
import "../../styles/animations.css"
import { TbAlertCircle } from "solid-icons/tb"

const [toastErrorMessage, setToastErrorMessage] = createSignal("")

const ErrorToast: Component = p => {
  const removeToastOnAnimationEnd = (e: HTMLDivElement) => {
    e.addEventListener("animationend", () => {
      setToastErrorMessage("")
    })
  }

  return (
    <Show when={toastErrorMessage() !== ""}>
      <div
        ref={removeToastOnAnimationEnd}
        class="bg-[#f1f1f1] flex gap-2 absolute bottom-14 right-14 w-auto toast-animation shadow-xl text-sm rounded-lg p-4 m-0"
      >
        <TbAlertCircle color="red" size="1.25rem" />
        {toastErrorMessage()}
      </div>
    </Show>
  )
}

export default ErrorToast
export { setToastErrorMessage }
