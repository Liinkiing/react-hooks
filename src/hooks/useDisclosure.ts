// https://github.com/chakra-ui/chakra-ui/blob/master/packages/chakra-ui/src/useDisclosure/index.js
import { useCallback, useState } from 'react'

interface Disclosure {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  onToggle: () => void
}

const useDisclosure = (defaultIsOpen?: boolean): Disclosure => {
  const [isOpen, setIsOpen] = useState(Boolean(defaultIsOpen))
  const onClose = useCallback(() => setIsOpen(false), [])
  const onOpen = useCallback(() => setIsOpen(true), [])
  const onToggle = useCallback(() => setIsOpen(prevIsOpen => !prevIsOpen), [])
  return { isOpen, onOpen, onClose, onToggle }
}

export default useDisclosure
