import { useCallback, useState } from 'react'

interface MultipleDisclosure {
  isOpen: (id: string) => boolean
  onOpen: (id: string) => () => void
  onClose: (id: string) => () => void
  onToggle: (id: string) => () => void
}

function useMultipleDisclosure(initialDisclosures: Record<string, any> = {}): MultipleDisclosure {
  const [disclosures, setDisclosures] = useState<Record<string, any>>(initialDisclosures)
  const isOpen = useCallback(
    (disclosureId: string) => disclosureId in disclosures && disclosures[disclosureId] === true,
    [disclosures],
  )
  const onClose = useCallback(
    (disclosureId: string) => () =>
      setDisclosures(v => ({
        ...v,
        [disclosureId]: false,
      })),
    [],
  )
  const onOpen = useCallback(
    (disclosureId: string) => () =>
      setDisclosures(v => ({
        ...v,
        [disclosureId]: true,
      })),
    [],
  )
  const onToggle = useCallback(
    (disclosureId: string) => () =>
      setDisclosures(v => ({
        ...v,
        [disclosureId]: v[disclosureId] === undefined ? true : !v[disclosureId],
      })),
    [],
  )
  return { isOpen, onOpen, onClose, onToggle }
}

export default useMultipleDisclosure
