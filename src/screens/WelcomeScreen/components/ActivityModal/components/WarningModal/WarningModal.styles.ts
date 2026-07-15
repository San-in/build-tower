import { IS_TABLET } from '@constants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  button: { maxWidth: 150, width: '45%' },
  buttonContainer: {
    flexDirection: 'row',
    gap: IS_TABLET ? 50 : 20,
    marginTop: 20,
  },
  modal: { width: IS_TABLET ? '60%' : '90%' },
})
