import { gradientsMap } from '@components/atoms/Button/gradinentsMap'
import { COLORS } from '@theme'
import { BUTTON_TYPE } from '@types'
import { LinearGradient } from 'expo-linear-gradient'
import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import { styles } from './Button.styles'

const SWEEP_STEP_MS = 50
const SWEEP_EVERY_MS = 10000

const DISABLED_COLORS: [string, string, ...Array<string>] = [
  COLORS.gradientGrey_1,
  COLORS.gradientGrey_2,
  COLORS.gradientGrey_5,
  COLORS.gradientGrey_3,
  COLORS.gradientGrey_2,
]

export type ButtonGradientHandle = { sweep: () => void }

type ButtonGradientProps = { type: BUTTON_TYPE; isDisabled: boolean }

/**
 * Owns the shine sweep so its eight `setState` steps re-render one gradient
 * instead of the whole Button — the title alone is five native `<Text>` layers,
 * and a screen like the Market has seven of these running at once.
 */
const ButtonGradient = forwardRef<ButtonGradientHandle, ButtonGradientProps>(
  ({ type, isDisabled }, ref) => {
    // Typed as a non-empty tuple so `gradients[0]` is a definite fallback under
    // `noUncheckedIndexedAccess`.
    const gradients = gradientsMap[type] as [
      [string, string, ...Array<string>],
      ...Array<[string, string, ...Array<string>]>,
    ]
    const [step, setStep] = useState(0)
    const timersRef = useRef(new Set<ReturnType<typeof setTimeout>>())

    const clearTimers = useCallback(() => {
      timersRef.current.forEach(clearTimeout)
      timersRef.current.clear()
    }, [])

    const sweep = useCallback(() => {
      clearTimers()
      for (let i = 0; i < gradients.length; i += 1) {
        const timerId = setTimeout(() => {
          timersRef.current.delete(timerId)
          setStep(i)
        }, i * SWEEP_STEP_MS)
        timersRef.current.add(timerId)
      }
    }, [clearTimers, gradients.length])

    useImperativeHandle(ref, () => ({ sweep }), [sweep])

    useEffect(() => {
      // Buttons on a screen mount in the same frame, so without a per-instance
      // offset all of their sweeps would fire together in one burst.
      const startDelay = Math.random() * SWEEP_EVERY_MS
      let intervalId: ReturnType<typeof setInterval> | undefined
      const startId = setTimeout(() => {
        sweep()
        intervalId = setInterval(sweep, SWEEP_EVERY_MS)
      }, startDelay)

      return () => {
        clearTimeout(startId)
        if (intervalId !== undefined) {
          clearInterval(intervalId)
        }
        clearTimers()
      }
    }, [clearTimers, sweep])

    return (
      <LinearGradient
        colors={
          isDisabled ? DISABLED_COLORS : (gradients[step] ?? gradients[0])
        }
        end={{ x: 1, y: 0 }}
        start={{ x: 0, y: 0 }}
        style={styles.gradientBackground}
      />
    )
  }
)

ButtonGradient.displayName = 'ButtonGradient'

export default memo(ButtonGradient)
