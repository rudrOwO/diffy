import { Component, JSX } from "solid-js"
import { twMerge } from "tailwind-merge"

type Props = {
  class?: string
  children?: JSX.Element | JSX.Element[]
}

const Box: Component<Props> = ({ class: classProp, children }) => (
  <div
    class={twMerge(
      "flex flex-col items-center justify-center p-6 rounded-lg bg-[#f1f1f1] gap-6 w-full shadow-xl",
      classProp
    )}
  >
    {children}
  </div>
)

export default Box
