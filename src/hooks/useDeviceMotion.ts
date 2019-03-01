import {DependencyList, useCallback, useEffect, useState,} from "react"

const useDeviceMotion = (
  inputs?: DependencyList
): DeviceAcceleration => {
  const [acceleration, setAcceleration] = useState<DeviceAcceleration>({
    x: 0,
    y: 0,
    z: 0,
  })
  const listener = useCallback((e: DeviceMotionEvent) => {
    if (e.accelerationIncludingGravity) {
      setAcceleration(e.accelerationIncludingGravity)
    }
  }, inputs || [])

  useEffect(() => {
    window.addEventListener('devicemotion', listener)

    return () => {
      window.removeEventListener('devicemotion', listener)
    }
  }, inputs)

  return acceleration
}

export default useDeviceMotion
