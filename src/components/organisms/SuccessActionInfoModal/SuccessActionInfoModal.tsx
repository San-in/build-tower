import confettiAnimation from '@assets/icons/animations/confetti.json'
import winAnimation from '@assets/icons/animations/win.json'
import { BackgroundImg } from '@assets/images'
import { Image } from 'expo-image'
import LottieView from 'lottie-react-native'
import { MotiView } from 'moti'
import React, { FC, useEffect, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

import { styles } from './SuccessActionInfoModal.styles'
import { SuccessActionInfoModalProps } from './SuccessActionInfoModal.types'

const SuccessActionInfoModal: FC<SuccessActionInfoModalProps> = ({
  isVisible,
  onPress,
  children,
}) => {
  const [isBackgroundReady, setIsBackGroundReady] = useState(false)
  const [isConfettiVisible, setIsConfettiVisible] = useState(false)

  useEffect(() => {
    if (isVisible && !isConfettiVisible && isBackgroundReady) {
      setTimeout(() => {
        setIsConfettiVisible(true)
      }, 800)
    }
  }, [isBackgroundReady, isConfettiVisible, isVisible])

  return (
    <MotiView
      animate={{ opacity: isVisible && isBackgroundReady ? 1 : 0 }}
      from={{ opacity: 0 }}
      pointerEvents={isVisible && isBackgroundReady ? 'auto' : 'none'}
      style={styles.container}
      transition={{ type: 'timing', duration: 400 }}
    >
      <Pressable
        onPress={() => {
          if (onPress) {
            setIsConfettiVisible(false)
            onPress()
          }
        }}
        style={styles.pressableContainer}
      >
        <Image
          allowDownscaling
          cachePolicy="memory-disk"
          contentFit="cover"
          onError={() => setIsBackGroundReady(true)}
          onLoadEnd={() => setIsBackGroundReady(true)}
          priority="high"
          source={BackgroundImg}
          style={[StyleSheet.absoluteFill, styles.backgroundContainer]}
          transition={50}
        />
        <View
          pointerEvents={'none'}
          style={[StyleSheet.absoluteFill, styles.winBannerContainer]}
        >
          <LottieView
            autoPlay
            loop
            source={winAnimation}
            style={styles.winBannerAnimation}
          />
        </View>
        <View
          pointerEvents={'none'}
          style={[StyleSheet.absoluteFill, styles.gifContainer]}
        >
          {isConfettiVisible && (
            <LottieView
              autoPlay={true}
              loop={false}
              source={confettiAnimation}
              style={styles.gifAnimation}
            />
          )}
        </View>

        <View style={styles.contentContainer}>{children}</View>
      </Pressable>
    </MotiView>
  )
}

export default SuccessActionInfoModal
