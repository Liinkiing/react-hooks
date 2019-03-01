import {useEffect, useRef} from "react"

type Callable = () => void

const useInterval = (callback: TimerHandler, delay: number) => {
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
      const id = setInterval(tick, delay)

      return () => clearInterval(id)
    }
  }, [delay])
}

export default useInterval
