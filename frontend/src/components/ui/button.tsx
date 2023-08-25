import { Component } from "solid-js"

const Button: Component<{
  title: string
  isDisabled?: Boolean
  onClick: () => void
}> = p => {
  return (
    <button
      type="button"
      disabled={!!p.isDisabled}
      class={
        "text-sm md:text-md lg:text-lg border-2 border-black rounded-lg p-2 " +
        (p.isDisabled ? "opacity-50" : "hover:bg-slate-300")
      }
      onClick={p.onClick}
    >
      {p.title}
    </button>
  )
}

export default Button
