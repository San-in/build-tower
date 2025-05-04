import { KnobIcon } from '@assets/icons'
import * as d3Shape from 'd3-shape'
import * as Haptics from 'expo-haptics'
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  Animated,
  Easing,
  StyleSheet,
  TextStyle,
  useWindowDimensions,
  View,
} from 'react-native'
import Svg, {
  Defs,
  G,
  LinearGradient,
  Path,
  Stop,
  Text as SvgText,
  TSpan,
} from 'react-native-svg'

interface WheelOfFortuneProps {
  sectors: Array<string>
  winnerIndex: number
  onFinish: (winner: string, index: number) => void
  colors?: Array<string>
  borderColor?: string
  borderWidth?: number
  textStyle?: TextStyle
  innerRadius?: number
}

export interface WheelOfFortuneRef {
  spin: () => void
}

const WheelOfFortune = forwardRef<WheelOfFortuneRef, WheelOfFortuneProps>(
  (
    {
      sectors,
      winnerIndex,
      onFinish,
      colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      borderColor = '#fff',
      borderWidth = 4,
      textStyle = {},
      innerRadius = 50,
    },
    ref
  ) => {
    const { width } = useWindowDimensions()
    const size = width * 0.8
    const outerRadius = size / 2
    const angle = useRef(new Animated.Value(0)).current
    const oneTurn = 360
    const angleOffset = 360 / Math.max(sectors.length, 1) / 2
    const [winnerSector, setWinnerSector] = useState<number | null>(null)

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

    function getWinnerIndex(currentAngle: number) {
      const deg = Math.abs(Math.round(currentAngle % oneTurn))
      return (
        (sectors.length - Math.floor(deg / (oneTurn / sectors.length))) %
        sectors.length
      )
    }

    const spin = () => {
      const sectorAngle = oneTurn / sectors.length
      const halfSector = sectorAngle / 2

      const numberOfTurns = 5
      const finalRotation =
        360 * numberOfTurns - (winnerIndex * sectorAngle + halfSector)

      angle.setValue(0)
      setWinnerSector(null)

      const hapticInterval = setInterval(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)
      }, 300)

      Animated.timing(angle, {
        toValue: finalRotation,
        duration: 6000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start(() => {
        clearInterval(hapticInterval)
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        const finalIndex = getWinnerIndex(finalRotation) - 1
        setWinnerSector(finalIndex)
        onFinish(sectors[finalIndex] ?? '', finalIndex)
      })
    }

    useImperativeHandle(ref, () => ({
      spin,
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
                fill={(textStyle as TextStyle).color || '#fff'}
                fontSize={(textStyle as TextStyle).fontSize || 24}
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
        <Animated.View
          style={{
            transform: [
              {
                rotate: angle.interpolate({
                  inputRange: [
                    0, 180, 360, 540, 720, 900, 1080, 1260, 1440, 1620, 1800,
                    1980, 2100,
                  ],
                  outputRange: [
                    '0deg',
                    '-35deg',
                    '35deg',
                    '-30deg',
                    '30deg',
                    '-25deg',
                    '25deg',
                    '-15deg',
                    '15deg',
                    '-10deg',
                    '10deg',
                    '-5deg',

                    '0deg',
                  ],
                  extrapolate: 'clamp',
                }),
              },
            ],
            position: 'absolute',
            top: -35,
            zIndex: 1,
          }}
        >
          <KnobIcon height={70} width={70} />
        </Animated.View>
        <Animated.View
          style={{
            width: size,
            height: size,
            alignItems: 'center',
            justifyContent: 'center',
            transform: [
              {
                rotate: angle.interpolate({
                  inputRange: [-360, 0, 360],
                  outputRange: ['-360deg', '0deg', '360deg'],
                }),
              },
            ],
          }}
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
        </Animated.View>
      </View>
    )
  }
)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default WheelOfFortune
