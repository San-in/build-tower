import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    position: 'absolute',
    top: 0,
    transform: [{ translateY: -700 }],
    zIndex: 10,
  },
  image: { height: 200, width: 300 },
})
