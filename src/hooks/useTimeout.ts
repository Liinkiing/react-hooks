import {useEffect, useRef} from "react"

type Callable = () => void

const useTimeout = (callback: TimerHandler, delay: number) => {
  const savedCallback = useRef<Callable>()

  useEffect(() => {
    savedCallback.current = callback as Callable
  })

  useEffect(() => {
    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current()
      }
    }
    if (delay !== null) {
      const id = setTimeout(tick, delay)

      return () => clearTimeout(id)
    }
  }, [delay])
}

export default useTimeout
