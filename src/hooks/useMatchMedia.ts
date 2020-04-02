import { useEffect, useState } from 'react'

function useMatchMedia(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query)
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches)

    // Using addListener instead of addEventListener to support Safari
    mediaQueryList.addListener(onChange)
    return () => mediaQueryList.removeListener(onChange)
  }, [query])

  return matches
}

export default useMatchMedia
