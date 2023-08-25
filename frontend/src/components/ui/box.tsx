import type { Component, JSX } from "solid-js"
import { twMerge } from "tailwind-merge"

type Props = {
  title: string
  class?: string
  children?: JSX.Element | JSX.Element[]
}

const Box: Component<Props> = props => (
  <div
    class={twMerge(
      "text-black text-md md:text-lg lg:text-xl box-border flex flex-col items-center justify-center p-6 rounded-lg bg-[#f1f1f1] gap-6 w-full shadow-xl",
      props.class
    )}
  >
    <p class="text-center rounded-lg">{props.title}</p>
    {props.children}
  </div>
)

export default Box
