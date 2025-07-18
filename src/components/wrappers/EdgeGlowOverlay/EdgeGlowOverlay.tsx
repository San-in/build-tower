import {
  EdgeGlowOverlayProps,
  PulsingGlowProps,
} from '@components/wrappers/EdgeGlowOverlay/EdgeGlowOverlay.types'
import { EMPTY_FUNCTION } from '@constants'
import { COLORS } from '@theme'
import { EDGE_GLOW_OVERLAY_TYPE } from '@types'
import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient'
import React, { FC, useEffect, useRef } from 'react'
import { Animated, Pressable, StyleSheet, View, ViewStyle } from 'react-native'

import { styles } from './EdgeGlowOverlay.styles'

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)

const PulsingGlow: FC<PulsingGlowProps> = ({ children, delay = 0 }) => {
  const opacity = useRef(new Animated.Value(0.6)).current

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1200,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.6,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    )
    loop.start()
    return () => loop.stop()
  }, [delay, opacity])

  return (
    <Animated.View style={[StyleSheet.absoluteFill, { opacity }]}>
      {children}
    </Animated.View>
  )
}

const EdgeGlowOverlay: FC<EdgeGlowOverlayProps> = ({
  sides = EDGE_GLOW_OVERLAY_TYPE.All,
  color = COLORS.yellow80,
  onPress,
}) => {
  const edges: Array<{
    key: string
    style: ViewStyle
    delay?: number
    gradientProps: LinearGradientProps
  }> = [
    ...(sides === EDGE_GLOW_OVERLAY_TYPE.All
      ? [
          {
            key: 'top',
            style: styles.top,
            delay: 0,
            gradientProps: {
              colors: [color, 'transparent'] as const,
            },
          },
          {
            key: 'bottom',
            style: styles.bottom,
            delay: 200,
            gradientProps: {
              colors: ['transparent', color] as const,
            },
          },
        ]
      : []),
    {
      key: 'left',
      style: styles.left,
      delay: 400,
      gradientProps: {
        colors: [color, 'transparent'],
        start: { x: 0, y: 0.5 },
        end: { x: 1, y: 0.5 },
      },
    },
    {
      key: 'right',
      style: styles.right,
      delay: 600,
      gradientProps: {
        colors: [color, 'transparent'],
        start: { x: 1, y: 0.5 },
        end: { x: 0, y: 0.5 },
      },
    },
  ]

  return (
    <Pressable
      onPress={onPress || EMPTY_FUNCTION}
      pointerEvents={onPress ? 'auto' : 'none'}
      style={[StyleSheet.absoluteFill, styles.container]}
    >
      {edges.map(({ key, style, delay, gradientProps }) => (
        <View key={key} style={[styles.edge, style]}>
          <PulsingGlow delay={delay}>
            <AnimatedLinearGradient
              {...gradientProps}
              style={StyleSheet.absoluteFill}
            />
          </PulsingGlow>
        </View>
      ))}
    </Pressable>
  )
}

export default EdgeGlowOverlay
