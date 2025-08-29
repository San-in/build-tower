import { Asset } from 'expo-asset'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type Source = number | string
type Options = { auto?: boolean }

export const useAssetPreload = (
  sources: Array<Source>,
  opts: Options = { auto: true }
) => {
  const sourcesKey = useMemo(() => JSON.stringify(sources), [sources])

  const assets = useMemo(() => {
    const seen = new Set<string>()
    const list: Array<Asset> = []
    for (const s of sources) {
      const key = typeof s === 'number' ? `m:${s}` : `u:${s}`
      if (seen.has(key)) {
        continue
      }
      seen.add(key)
      list.push(
        typeof s === 'number' ? Asset.fromModule(s) : Asset.fromURI(String(s))
      )
    }
    return list
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourcesKey])

  const [ready, setReady] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<Error | null>(null)

  const runId = useRef(0)

  const start = useCallback(async (): Promise<void> => {
    const id = ++runId.current
    setReady(false)
    setError(null)
    setProgress(assets.length ? 0 : 1)

    try {
      let done = 0
      // паралельно з прогресом
      await Promise.all(
        assets.map((a) =>
          a
            .downloadAsync()
            .catch(() => {}) // або прокинути помилку якщо хочеш фейлити весь прогін
            .finally(() => {
              if (runId.current !== id) {
                return
              }
              done++
              setProgress(done / assets.length)
            })
        )
      )

      if (runId.current === id) {
        setReady(true)
      }
    } catch (e: unknown) {
      const err = e instanceof Error ? e : new Error(String(e))
      if (runId.current === id) {
        setError(err)
      }
    }
  }, [assets])

  useEffect(() => {
    if (opts.auto) {
      start().then()
    }
  }, [opts.auto, sourcesKey, start])

  useEffect(
    () => () => {
      runId.current++
    },
    []
  )

  return { ready, progress, error, start }
}
