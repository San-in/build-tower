import { styles } from '@components/wrappers/ShadowWrapper/ShadowWrapper.styles'
import { ShadowWrapperProps } from '@components/wrappers/ShadowWrapper/ShadowWrapper.types'
import { GlobalStyles } from '@theme'
import { MotiView } from 'moti'
import { FC } from 'react'
import { View } from 'react-native'

const ShadowWrapper: FC<ShadowWrapperProps> = ({ modalVisible, children }) => (
  <View style={[GlobalStyles.centeredContainer, styles.container]}>
    <MotiView
      animate={{ opacity: modalVisible ? 1 : 0 }}
      style={[styles.contentContainer]}
      transition={{ type: 'timing', duration: 300, delay: 100 }}
    >
      {children}
    </MotiView>
  </View>
)

export default ShadowWrapper
