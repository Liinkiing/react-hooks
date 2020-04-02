import React, { useCallback, useEffect } from 'react'

function useClickAway<T extends HTMLElement>(ref: React.RefObject<T>, onClickAway: () => void) {
  const handleClickOutside = useCallback(
    event => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickAway()
      }
    },
    [ref, onClickAway],
  )
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  })
}

export default useClickAway
