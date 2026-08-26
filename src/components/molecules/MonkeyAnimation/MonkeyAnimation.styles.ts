import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: { flex: 1 },
  // shadowColor/shadowOffset used to sit here without shadowOpacity (iOS) or
  // elevation (Android), so nothing was ever drawn — dead style, removed.
  content: {
    transform: [{ scaleX: -1 }],
  },
})
