import { useCallback, useMemo, useRef, useState } from 'react'

export const useAssetsReady = (labels: Array<string>) => {
  const initial = useMemo(() => new Set(labels), [labels])
  const pendingRef = useRef(initial)
  const [, force] = useState(0)
  const done = useCallback((label: string) => {
    if (pendingRef.current.delete(label)) {
      force((x) => x + 1)
    }
  }, [])
  const reset = useCallback(() => {
    pendingRef.current = new Set(labels)
    force((x) => x + 1)
  }, [labels])
  return { ready: pendingRef.current.size === 0, done, reset }
}
