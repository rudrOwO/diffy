import { Component } from "solid-js"

const Button: Component<{
  title: string
  isDisabled: Boolean
  handleClick: () => void
}> = p => {
  return (
    <button
      type="button"
      class={
        "text-sm md:text-md lg:text-lg border-2 border-black rounded-lg p-2 " +
        (p.isDisabled ? "opacity-50" : "hover:bg-slate-300")
      }
      onClick={p.handleClick}
    ></button>
  )
}

export default Button
