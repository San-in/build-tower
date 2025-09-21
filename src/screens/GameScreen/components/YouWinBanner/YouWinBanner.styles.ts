import { Z_INDEX_TYPE } from '@constants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    position: 'absolute',
    top: 0,
    transform: [{ translateY: -700 }],
    zIndex: Z_INDEX_TYPE.extra_high,
  },
  image: { height: 200, width: 300 },
})
