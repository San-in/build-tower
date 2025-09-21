import confettiAnimation from '@assets/icons/animations/confetti.json'
import { EdgeGlowOverlay } from '@components/wrappers'
import { EDGE_GLOW_OVERLAY_TYPE } from '@types'
import LottieView from 'lottie-react-native'
import { MotiView } from 'moti'
import React, { FC, useEffect, useRef } from 'react'
import { StyleSheet, View } from 'react-native'

import { YouWinBanner } from '../YouWinBanner'
import { styles } from './LevelFinishedOverlay.styles'
import { LevelFinishedOverlayProps } from './LevelFinishedOverlay.types'

const LevelFinishedOverlay: FC<LevelFinishedOverlayProps> = ({
  handleGoHome,
}) => {
  const confettiRef = useRef<LottieView>(null)

  useEffect(() => {
    confettiRef.current?.reset()
    const timer = setTimeout(() => {
      confettiRef.current?.play()
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      <EdgeGlowOverlay
        onPress={() => {
          handleGoHome()
        }}
        sides={EDGE_GLOW_OVERLAY_TYPE.Sides}
      />
      <YouWinBanner />
      <MotiView
        animate={{ opacity: [1] }}
        from={{ opacity: 0 }}
        style={styles.animationContainer}
        transition={{ type: 'timing', duration: 500, delay: 2750 }}
      >
        <LottieView
          autoPlay={false}
          loop={false}
          ref={confettiRef}
          source={confettiAnimation}
          style={styles.animation}
        />
      </MotiView>
    </View>
  )
}

export default LevelFinishedOverlay
