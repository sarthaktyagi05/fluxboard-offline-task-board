import { useEffect, useState } from "react"

export function useGlobalTimer() {

  const [time, setTime] = useState(Date.now())

  useEffect(() => {

    const id = setInterval(() => {
      setTime(Date.now())
    }, 10000)

    return () => clearInterval(id)

  }, [])

  return time
}