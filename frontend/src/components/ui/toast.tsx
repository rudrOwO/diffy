import { type Component, createEffect } from "solid-js"
import "../../styles/animations.css"
import { TbAlertCircle } from "solid-icons/tb"

const Toast: Component<{ message: string }> = p => {
  return (
    <div class="bg-[#f1f1f1] flex gap-2 absolute bottom-14 right-14 w-auto toast-animation shadow-xl text-sm rounded-lg p-4 m-0">
      <TbAlertCircle color="red" size="1.25rem" />
      {p.message}
    </div>
  )
}

export default Toast
