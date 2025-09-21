import { Z_INDEX_TYPE } from '@constants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  animation: { height: '100%', width: '100%' },
  animationContainer: { flex: 1 },
  container: { flex: 1, zIndex: Z_INDEX_TYPE.extra_high },
})
