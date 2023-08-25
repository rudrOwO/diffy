import { type Component, createEffect } from "solid-js"
import "../../styles/animations.css"
import { TbAlertCircle } from "solid-icons/tb"

type Props = {
  message: string
}

const Toast: Component<Props> = props => {
  return (
    <div class="bg-[#f1f1f1] flex gap-2 absolute bottom-14 right-14 w-auto toast-animation shadow-xl text-sm rounded-lg p-4 m-0">
      <TbAlertCircle color="red" size="1.25rem" />
      {props.message}
    </div>
  )
}

export default Toast
