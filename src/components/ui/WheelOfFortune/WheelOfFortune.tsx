import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
  useMemo,
  useState,
} from 'react'
import {
  View,
  Dimensions,
  Animated,
  StyleSheet,
  Image,
  TextStyle,
  Easing,
  useWindowDimensions,
} from 'react-native'
import Svg, {
  G,
  Path,
  Text as SvgText,
  TSpan,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg'
import * as d3Shape from 'd3-shape'
import * as Haptics from 'expo-haptics'
import { KnobIcon } from '@assets/icons'

interface WheelOfFortuneProps {
  sectors: string[]
  winnerIndex: number
  onFinish: (winner: string, index: number) => void
  colors?: string[]
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

    const wheelPaths = useMemo(() => makeWheel(), [sectors])

    function makeWheel() {
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
    }

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

      let hapticInterval = setInterval(() => {
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
                y1="0%"
                x2="100%"
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
              rotation={(i * oneTurn) / sectors.length + angleOffset}
              origin={`${x}, ${y}`}
            >
              <SvgText
                x={x}
                y={y}
                fill={(textStyle as any).color || '#fff'}
                fontSize={(textStyle as any).fontSize || 24}
                fontWeight={(textStyle as any).fontWeight || '900'}
                textAnchor="middle"
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
          <KnobIcon width={70} height={70} />
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
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            style={{
              borderRadius: size / 2,
              borderWidth,
              borderColor,
            }}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default WheelOfFortune
