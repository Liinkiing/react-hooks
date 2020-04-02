import {DependencyList, useEffect} from "react"

function useKeyboardInput<T extends HTMLElement>(listener: (e: KeyboardEvent) => void, deps: DependencyList = [], ref?: React.RefObject<T>) {
  useEffect(() => {
    if (ref && ref.current) {
      ref.current.addEventListener("keydown", listener)
    } else {
      window.addEventListener("keydown", listener)
    }

    return () => {
      if (ref && ref.current) {
        ref.current.removeEventListener("keydown", listener)
      } else {
        window.removeEventListener("keydown", listener)
      }
    }
  }, deps)
}

export default useKeyboardInput
