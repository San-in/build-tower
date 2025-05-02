import { StyleSheet, TextStyle } from 'react-native'

const plainText: TextStyle = {
  fontWeight: '900',
  textAlign: 'center',
}
export const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  text: plainText,
  frontText: {
    ...plainText,
    position: 'absolute',
  },
})
