import { IS_TABLET } from '@constants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: { width: '100%' },
  resetButton: { alignSelf: 'center', marginTop: 20, maxWidth: '80%' },
  resetButtonContainer: { paddingHorizontal: IS_TABLET ? 20 : 10 },
  soundContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'space-between',
    marginBottom: 10,
    marginRight: IS_TABLET ? 10 : 0,
  },
})
