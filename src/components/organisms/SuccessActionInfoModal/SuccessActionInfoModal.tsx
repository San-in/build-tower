import { MotiView } from 'moti'
import React, { FC } from 'react'
import { ImageBackground, Pressable, View } from 'react-native'

import { styles } from './SuccessActionInfoModal.styles'
import { SuccessActionInfoModalProps } from './SuccessActionInfoModal.types'

const SuccessActionInfoModal: FC<SuccessActionInfoModalProps> = ({
  isVisible,
  onPress,
  children,
}) => (
  <MotiView
    animate={{ opacity: isVisible ? 1 : 0 }}
    from={{ opacity: 0 }}
    style={styles.container}
    transition={{ type: 'timing', duration: 500 }}
  >
    <Pressable onPress={onPress} style={styles.pressableContainer}>
      <ImageBackground
        resizeMode={'cover'}
        source={require('../../../../assets/images/background.png')}
        style={styles.imageContainer}
      >
        <View style={styles.contentContainer}>{children}</View>
      </ImageBackground>
    </Pressable>
  </MotiView>
)

export default SuccessActionInfoModal
