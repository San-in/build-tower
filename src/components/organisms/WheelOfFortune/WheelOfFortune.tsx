import { KnobIcon } from '@assets/icons'
import { OutlinedText } from '@components/atoms'
import {
  WheelOfFortuneProps,
  WheelOfFortuneRef,
} from '@components/organisms/WheelOfFortune/WheelOfFortune.types'
import { IS_TABLET } from '@constants'
import { COLORS, GlobalStyles } from '@theme'
import {
  formatTabletElementsSize,
  Haptics,
  startLoopSfx,
  stopLoopSfx,
} from '@utils'
import * as d3Shape from 'd3-shape'
import { MotiView } from 'moti'
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Platform, TextStyle, useWindowDimensions, View } from 'react-native'
import Reanimated, {
  Easing,
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import Svg, {
  Defs,
  G,
  LinearGradient,
  Path,
  Stop,
  Text as SvgText,
  TSpan,
} from 'react-native-svg'

import { styles } from './WheelOfFortune.styles'
const SPIN_NUMBER_OF_TURNS = Platform.OS === 'android' ? 5 : 8
const SPIN_DURATION = Platform.OS === 'android' ? 3500 : 3000
// The knob wobble breakpoints below are tuned for an 8-turn spin; scale them
// so the wobble still settles to 0deg at the end on platforms with fewer turns.
const KNOB_WOBBLE_RATIO = SPIN_NUMBER_OF_TURNS / 8

const INITIAL_COLORS = [
  COLORS.gradientPurple_2,
  COLORS.green,
  COLORS.yellow,
  COLORS.lightBlue,
  COLORS.gradientOrange_1,
  COLORS.vividPurple,
  COLORS.gradientRed_1,
  COLORS.lightGreen,
  COLORS.aqua,
  COLORS.collar,
]

const WheelOfFortune = forwardRef<WheelOfFortuneRef, WheelOfFortuneProps>(
  (
    {
      sectors,
      winnerIndex,
      onFinish,
      colors = INITIAL_COLORS,
      borderColor = COLORS.white,
      borderWidth = formatTabletElementsSize(4),
      textStyle = {},
      innerRadius = formatTabletElementsSize(60, 1.5),
      result = false,
    },
    ref
  ) => {
    const { width } = useWindowDimensions()
    const size = width * (IS_TABLET ? 0.6 : 0.8)
    const outerRadius = size / 2
    const angle = useSharedValue(0)
    const oneTurn = 360
    const angleOffset = 360 / Math.max(sectors.length, 1) / 2
    const [winnerSector, setWinnerSector] = useState<number | null>(null)
    const spinIdRef = useRef(0)

    const makeWheel = useCallback(() => {
      const data = Array.from<number>({ length: sectors.length }).fill(1)
      const arcs = d3Shape.pie<number>().value(1)(data)

      return arcs.map((arc, i) => {
        const instance = d3Shape
          .arc<d3Shape.DefaultArcObject>()
          .padAngle(0.01)
          .outerRadius(outerRadius)
          .innerRadius(innerRadius)

        return {
          path: instance({
            startAngle: arc.startAngle,
            endAngle: arc.endAngle,
            innerRadius,
            outerRadius,
          })!,
          color: colors[i % colors.length],
          value: sectors[i],
          centroid: instance.centroid({
            startAngle: arc.startAngle,
            endAngle: arc.endAngle,
            innerRadius,
            outerRadius,
          }),
        }
      })
    }, [colors, innerRadius, outerRadius, sectors])

    const wheelPaths = useMemo(() => makeWheel(), [makeWheel])

    useEffect(() => () => stopLoopSfx('roulette'), [])

    const spin = () => {
      spinIdRef.current += 1
      const spinId = spinIdRef.current
      const sectorAngle = oneTurn / sectors.length

      const finalRotation =
        360 * SPIN_NUMBER_OF_TURNS - (winnerIndex * sectorAngle + angleOffset)
      angle.value = 0
      setWinnerSector(null)
      startLoopSfx('roulette')

      const hapticInterval = setInterval(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)
      }, 300)

      const handleSpinEnd = (finished?: boolean) => {
        clearInterval(hapticInterval)
        if (spinIdRef.current === spinId) {
          stopLoopSfx('roulette')
        }
        if (!finished) {
          return
        }
        void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        setWinnerSector(winnerIndex)
        onFinish(sectors[winnerIndex] ?? '', winnerIndex)
      }

      angle.value = withTiming(
        finalRotation,
        {
          duration: SPIN_DURATION,
          easing: Easing.out(Easing.cubic),
        },
        (finished) => {
          runOnJS(handleSpinEnd)(finished)
        }
      )
    }

    useImperativeHandle(ref, () => ({
      spin,
    }))

    const knobAnimatedStyle = useAnimatedStyle(() => ({
      transform: [
        {
          rotate: `${interpolate(
            angle.value,
            [
              0, 180, 360, 540, 720, 900, 1080, 1260, 1440, 1620, 1800, 1980,
              2100, 2280, 2360, 2540, 2720, 2900,
            ].map((value) => value * KNOB_WOBBLE_RATIO),
            [
              0, -35, 35, -35, 35, -35, 35, -30, 30, -25, 25, -15, 15, -10, 10,
              -5, 5, 0,
            ],
            Extrapolation.CLAMP
          )}deg`,
        },
      ],
    }))

    const wheelAnimatedStyle = useAnimatedStyle(() => ({
      transform: [{ rotate: `${angle.value}deg` }],
    }))

    const renderSectors = () =>
      wheelPaths.map((arc, i) => {
        const [x, y] = arc.centroid
        const label = arc.value?.toString()
        const isWinner = winnerSector === i

        return (
          <G key={`arc-${i}`}>
            <Defs>
              <LinearGradient
                id={`grad-${i}`}
                x1="0%"
                x2="100%"
                y1="0%"
                y2="0%"
              >
                <Stop offset="0%" stopColor={arc.color} stopOpacity="0.7" />
                <Stop offset="10%" stopColor={arc.color} stopOpacity="0.6" />
                <Stop offset="20%" stopColor={arc.color} stopOpacity="0.5" />
                <Stop offset="30%" stopColor={arc.color} stopOpacity="0.3" />
                <Stop offset="40%" stopColor={arc.color} stopOpacity="0.4" />
                <Stop offset="50%" stopColor={arc.color} stopOpacity="0.5" />
                <Stop offset="60%" stopColor={arc.color} stopOpacity="0.6" />
                <Stop offset="100%" stopColor={arc.color} stopOpacity="0.7" />
              </LinearGradient>
            </Defs>
            <Path
              d={arc.path!}
              fill={isWinner ? arc.color : `url(#grad-${i})`}
              stroke={borderColor}
              strokeWidth={2}
            />
            <G
              origin={`${x}, ${y}`}
              rotation={(i * oneTurn) / sectors.length + angleOffset}
            >
              <SvgText
                fill={(textStyle as TextStyle).color || COLORS.white}
                fontSize={
                  (textStyle as TextStyle).fontSize ||
                  formatTabletElementsSize(24, 1.5)
                }
                fontWeight={(textStyle as TextStyle).fontWeight || '900'}
                textAnchor="middle"
                x={x}
                y={y}
              >
                <TSpan>{label}</TSpan>
              </SvgText>
            </G>
          </G>
        )
      })

    return (
      <View style={styles.container}>
        <View
          style={[
            styles.innerCircleContainer,
            {
              top: size / 2,
            },
          ]}
        >
          <MotiView
            animate={{ opacity: result ? 1 : 0 }}
            from={{ opacity: 0 }}
            style={GlobalStyles.centeredContainer}
            transition={{ type: 'timing', duration: 500, delay: 500 }}
          >
            {Boolean(result) && (
              <>
                <OutlinedText
                  fontSize={formatTabletElementsSize(12)}
                  numberOfLines={1}
                  offset={1}
                >
                  Result:
                </OutlinedText>
                <OutlinedText
                  color={COLORS.gradientGold_1}
                  fontSize={formatTabletElementsSize(25)}
                  offset={1}
                  strokeColor={COLORS.gradientBronze_1}
                >
                  {`${result}`}
                </OutlinedText>
              </>
            )}
          </MotiView>
        </View>
        <Reanimated.View style={[styles.knobIconContainer, knobAnimatedStyle]}>
          <KnobIcon
            height={formatTabletElementsSize(70)}
            width={formatTabletElementsSize(70)}
          />
        </Reanimated.View>
        <Reanimated.View
          style={[
            styles.container,
            { width: size, height: size },
            wheelAnimatedStyle,
          ]}
        >
          <Svg
            height={size}
            style={{
              borderRadius: size / 2,
              borderWidth,
              borderColor,
            }}
            viewBox={`0 0 ${size} ${size}`}
            width={size}
          >
            <G x={size / 2} y={size / 2}>
              {renderSectors()}
            </G>
          </Svg>
        </Reanimated.View>
      </View>
    )
  }
)

export default WheelOfFortune
