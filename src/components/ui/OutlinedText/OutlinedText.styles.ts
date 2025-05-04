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
  text: plainText,
})
