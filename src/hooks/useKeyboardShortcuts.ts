import {RefObject} from "react"
import useKeyboardInput from "./useKeyboardInput"

interface KeyboardShortcut {
  preventDefault?: boolean
  keys: string[]
  action: () => void
}

const useKeyboardShortcuts = <T extends HTMLElement>(shortcuts: KeyboardShortcut[], ref?: RefObject<T>) => {
  useKeyboardInput(e => {
    shortcuts.forEach(shortcut => {
      if (
        shortcut.keys.some(key => (key.toLowerCase() === e.key.toLowerCase() || key === e.code))
      ) {
        if (shortcut.preventDefault) {
          e.preventDefault()
        }
        shortcut.action()
      }
    })
  }, [], ref)
}
export default useKeyboardShortcuts
