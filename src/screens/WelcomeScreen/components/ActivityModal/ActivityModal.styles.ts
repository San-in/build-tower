import { IS_TABLET } from '@constants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  mainModalContainer: { width: IS_TABLET ? '70%' : '90%' },
})
