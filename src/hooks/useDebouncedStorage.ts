import { useEffect, useRef } from "react"

export function useDebouncedStorage(key: string, state: any) {

  const timer = useRef<any>()

  useEffect(() => {

    clearTimeout(timer.current)

    timer.current = setTimeout(() => {

      try {
        localStorage.setItem(key, JSON.stringify(state))
      } catch {
        localStorage.clear()
      }

    }, 800)

  }, [state])
}