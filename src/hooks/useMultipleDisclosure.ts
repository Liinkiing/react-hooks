import { useCallback, useState } from 'react'

type MultipleDisclosure<T> = {
  isOpen: (id: T) => boolean
  onOpen: (id: T) => () => void
  onClose: (id: T) => () => void
  onToggle: (id: T) => () => void
}

function useMultipleDisclosure<T extends Record<string, boolean>>(initialDisclosures?: T):
  T extends Record<keyof T, boolean> ? MultipleDisclosure<keyof T> : MultipleDisclosure<string> {
  const [disclosures, setDisclosures] = useState<Record<string, boolean>>(initialDisclosures ?? {})
  const isOpen = useCallback(
    (disclosureId) => disclosureId in disclosures && disclosures[disclosureId] === true,
    [disclosures],
  )
  const onClose = useCallback(
    (disclosureId) => () =>
      setDisclosures(v => ({
        ...v,
        [disclosureId]: false,
      })),
    [],
  )
  const onOpen = useCallback(
    (disclosureId) => () =>
      setDisclosures(v => ({
        ...v,
        [disclosureId]: true,
      })),
    [],
  )
  const onToggle = useCallback(
    (disclosureId) => () =>
      setDisclosures(v => ({
        ...v,
        [disclosureId]: v[disclosureId] === undefined ? true : !v[disclosureId],
      })),
    [],
  )
  return { isOpen, onOpen, onClose, onToggle } as T extends Record<keyof T, boolean> ? MultipleDisclosure<keyof T> : MultipleDisclosure<string>
}

export default useMultipleDisclosure
