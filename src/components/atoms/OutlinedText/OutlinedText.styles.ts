import { StyleSheet, TextStyle } from 'react-native'

const plainText: TextStyle = {
  fontWeight: '900',
  textAlign: 'center',
}
export const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  frontText: {
    ...plainText,
    position: 'absolute',
  },
  measure: {
    ...plainText,
    opacity: 0,
    position: 'absolute',
  },
  strokeStretch: {
    left: 0,
    right: 0,
    top: 0,
  },
  text: plainText,
})
