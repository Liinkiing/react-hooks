import useKeyboardInput from "./useKeyboardInput"

interface KeyboardShortcut {
  keys: string[]
  action: () => void
}

const useKeyboardShortcuts = (shortcuts: KeyboardShortcut[]) => {
  useKeyboardInput(e => {
    shortcuts.forEach(shortcut => {
      if (
        shortcut.keys.some(key => (key.toLowerCase() === e.key.toLowerCase() || key === e.code))
      ) {
        shortcut.action()
      }
    })
  })
}
export default useKeyboardShortcuts
