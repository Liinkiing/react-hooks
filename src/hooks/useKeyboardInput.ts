import {DependencyList, useEffect} from "react"

const useKeyboardInput = (listener: (e: KeyboardEvent) => void, deps: DependencyList = []) => {
  useEffect(() => {
    window.addEventListener('keydown', listener)

    return () => {
      window.removeEventListener('keydown', listener)
    }
  }, deps)
}

export default useKeyboardInput
