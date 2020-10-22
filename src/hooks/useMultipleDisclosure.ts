import { useCallback, useState } from 'react'

type MultipleDisclosure<T> = {
  isOpen: (id: T) => boolean
  onOpen: (id: T) => () => void
  onClose: (id: T) => () => void
  onToggle: (id: T) => () => void
}

function useMultipleDisclosure<T extends Record<string, any> = {}>(initialDisclosures:  T): MultipleDisclosure<keyof T> {
  const [disclosures, setDisclosures] = useState<Record<keyof T, any>>(initialDisclosures)
  const isOpen = useCallback(
    (disclosureId: keyof T) => disclosureId in disclosures && disclosures[disclosureId] === true,
    [disclosures],
  )
  const onClose = useCallback(
    (disclosureId: keyof T) => () =>
      setDisclosures(v => ({
        ...v,
        [disclosureId]: false,
      })),
    [],
  )
  const onOpen = useCallback(
    (disclosureId: keyof T) => () =>
      setDisclosures(v => ({
        ...v,
        [disclosureId]: true,
      })),
    [],
  )
  const onToggle = useCallback(
    (disclosureId: keyof T) => () =>
      setDisclosures(v => ({
        ...v,
        [disclosureId]: v[disclosureId] === undefined ? true : !v[disclosureId],
      })),
    [],
  )
  return { isOpen, onOpen, onClose, onToggle }
}

export default useMultipleDisclosure
