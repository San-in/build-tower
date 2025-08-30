import { ConfettiGif } from '@assets/gifs'
import { BackgroundImg } from '@assets/images'
import { COLORS } from '@theme'
import { Image } from 'expo-image'
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
  const [isConfettiVisible, setIsConfettiVisible] = useState(true)
  const [isBackgroundReady, setIsBackGroundReady] = useState(false)

  useEffect(() => {
    let timerId: number
    if (isConfettiVisible && isVisible) {
      timerId = setTimeout(() => setIsConfettiVisible(false), 3000)
    }
    return () => clearTimeout(timerId)
  }, [isConfettiVisible, isVisible])

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
          setIsConfettiVisible(true)
          if (onPress) {
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
          placeholder={COLORS.backgroundBlue}
          priority="high"
          source={BackgroundImg}
          style={StyleSheet.absoluteFill}
          transition={50}
        />
        <View style={styles.contentContainer}>{children}</View>
        {isConfettiVisible && isVisible && isBackgroundReady && (
          <Image
            recyclingKey={`confetti-${Number(isConfettiVisible)}`}
            source={ConfettiGif}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              bottom: 0,
            }}
            transition={100}
          />
        )}
      </Pressable>
    </MotiView>
  )
}

export default SuccessActionInfoModal
