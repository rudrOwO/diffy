import type { Component, JSXElement } from "solid-js"

const Button: Component<{
  title: string
  icon?: JSXElement
  isDisabled?: boolean
  onClick: () => void
}> = p => (
  <button
    type="button"
    disabled={p.isDisabled}
    class={
      "bg-[#f1f1f1] text-sm md:text-md lg:text-lg border-2 border-black rounded-lg p-2 " +
      (p.isDisabled ? "opacity-40" : "hover:bg-slate-300")
    }
    onClick={() => p.onClick()}
  >
    <div class="flex justify-evenly items-center gap-2">
      {p.icon}
      {p.title}
    </div>
  </button>
)

export default Button
