import { Component, JSX } from "solid-js"
import { twMerge } from "tailwind-merge"

type Props = {
  title: string
  class?: string
  children?: JSX.Element | JSX.Element[]
}

const Box: Component<Props> = ({ class: classProp, children, title }) => (
  <div
    class={twMerge(
      "text-black text-md md:text-lg lg:text-xl box-border flex flex-col items-center justify-center p-6 rounded-lg bg-[#f1f1f1] gap-6 w-full shadow-xl",
      classProp
    )}
  >
    <p class="text-center rounded-lg">{title}</p>
    {children}
  </div>
)

export default Box
