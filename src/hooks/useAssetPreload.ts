import { Asset } from 'expo-asset'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ImageSourcePropType, ImageURISource } from 'react-native'

type Options = { auto?: boolean }

export const useAssetPreload = (
  sources: ReadonlyArray<ImageSourcePropType>,
  opts: Options = { auto: true }
) => {
  const sourcesKey = useMemo(() => JSON.stringify(sources), [sources])

  const assets = useMemo(() => {
    const seen = new Set<string>()
    const list: Array<Asset> = []

    const pushUnique = (key: string, asset: Asset) => {
      if (seen.has(key)) {
        return
      }
      seen.add(key)
      list.push(asset)
    }

    const fromImageURISource = (s: ImageURISource | null | undefined) => {
      if (!s?.uri) {
        return
      }
      pushUnique(`u:${s.uri}`, Asset.fromURI(String(s.uri)))
    }

    for (const src of sources) {
      if (typeof src === 'number') {
        pushUnique(`m:${src}`, Asset.fromModule(src))
      } else if (Array.isArray(src)) {
        for (const s of src) {
          fromImageURISource(s)
        }
      } else if (src && typeof src === 'object') {
        fromImageURISource(src as ImageURISource)
      }
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
      await Promise.all(
        assets.map((a) =>
          a
            .downloadAsync()
            .catch(() => {})
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
      if (runId.current !== id) {
        return
      }
      setError(e instanceof Error ? e : new Error(String(e)))
    }
  }, [assets])

  useEffect(() => {
    if (opts.auto) {
      start().then()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opts.auto, sourcesKey])

  useEffect(
    () => () => {
      runId.current++
    },
    []
  )

  return { ready, progress, error, start }
}
