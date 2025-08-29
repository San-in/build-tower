import { ConfettiGif } from '@assets/gifs'
import { MotiView } from 'moti'
import React, { FC, useEffect, useState } from 'react'
import { Image, ImageBackground, Pressable, View } from 'react-native'

import { styles } from './SuccessActionInfoModal.styles'
import { SuccessActionInfoModalProps } from './SuccessActionInfoModal.types'

const SuccessActionInfoModal: FC<SuccessActionInfoModalProps> = ({
  isVisible,
  onPress,
  children,
}) => {
  const [isConfettiVisible, setIsConfettiVisible] = useState(true)

  useEffect(() => {
    let timerId: number
    if (isConfettiVisible && isVisible) {
      timerId = setTimeout(() => setIsConfettiVisible(false), 3000)
    }
    return () => clearTimeout(timerId)
  }, [isConfettiVisible, isVisible])

  return (
    <MotiView
      animate={{ opacity: isVisible ? 1 : 0 }}
      from={{ opacity: 0 }}
      style={styles.container}
      transition={{ type: 'timing', duration: 500 }}
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
        <ImageBackground
          resizeMode={'cover'}
          source={require('../../../../assets/images/background.webp')}
          style={styles.imageContainer}
        >
          <View style={styles.contentContainer}>{children}</View>
          {isConfettiVisible && isVisible && (
            <Image
              source={ConfettiGif}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                bottom: 0,
              }}
            />
          )}
        </ImageBackground>
      </Pressable>
    </MotiView>
  )
}

export default SuccessActionInfoModal
