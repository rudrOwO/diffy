import type { Component, JSX } from "solid-js"
import { twMerge } from "tailwind-merge"

type Props = {
  title: string
  class?: string
  children?: JSX.Element | JSX.Element[]
}

const Box: Component<Props> = p => (
  <div
    class={twMerge(
      "text-black text-md md:text-lg lg:text-xl flex flex-col items-center justify-center p-6 rounded-lg bg-[#f1f1f1] gap-6 w-full shadow-xl",
      p.class
    )}
  >
    <p class="text-center rounded-lg">{p.title}</p>
    {p.children}
  </div>
)

export default Box
