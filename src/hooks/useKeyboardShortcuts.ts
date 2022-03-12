import {DependencyList, RefObject} from "react"
import useKeyboardInput from "./useKeyboardInput"

interface KeyboardShortcut {
  preventDefault?: boolean
  keys: string[]
  action: (e: KeyboardEvent) => void
}

function useKeyboardShortcuts<T extends HTMLElement>(shortcuts: KeyboardShortcut[], ref?: RefObject<T>, deps?: DependencyList) {
  useKeyboardInput(e => {
    shortcuts.forEach(shortcut => {
      if (
        shortcut.keys.some(key => (key && e.key && key.toLowerCase() === e.key.toLowerCase() || key === e.code))
      ) {
        if (shortcut.preventDefault) {
          e.preventDefault()
        }
        shortcut.action(e)
      }
    })
  }, deps || [], ref)
}

export default useKeyboardShortcuts
